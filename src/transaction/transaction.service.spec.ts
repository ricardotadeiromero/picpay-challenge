import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { User, UserType } from '../user/entities/user';
import { Transaction } from './entities/transaction.entity';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { NotificationService } from '../notification/notification.service';

describe('TransactionService', () => {
  const fakeUsers: User[] = [
    {
      id: 1,
      firstName: 'Ricardo',
      lastName: 'Tadei Romero',
      document: '48435478831',
      balance: 50,
      type: UserType.commom,
      email: 'rtromero.sp@gmail.com',
      password: 'fon',
    },
    {
      id: 2,
      firstName: 'Rafael',
      lastName: 'Tadei Romero',
      document: 'nao sei',
      balance: 20,
      type: UserType.commom,
      email: 'rafael.sp@gmail.com',
      password: 'fon',
    },
    {
      id: 3,
      firstName: 'Mario',
      lastName: 'Tadei Romero',
      document: 'nao sei',
      balance: 100,
      type: UserType.marchant,
      email: 'mario.sp@gmail.com',
      password: 'fon',
    },
  ];
  const userServiceMock = {
    findByEmail: jest.fn().mockReturnValue(fakeUsers[0]),
    updateBalance: jest.fn().mockResolvedValue(undefined),
    checkSenderTransaction: jest.fn().mockResolvedValue(true),
    findUsersTransactions: jest
      .fn()
      .mockResolvedValue([fakeUsers[0], fakeUsers[1]]),
  };
  const mockTransactions: Transaction[] = [
    {
      id: 1,
      timestamp: new Date(),
      sender: fakeUsers[0],
      receiver: fakeUsers[1],
      amount: 10,
    },
    {
      id: 2,
      timestamp: new Date(),
      sender: fakeUsers[0],
      receiver: fakeUsers[1],
      amount: 10,
    },
  ];
  const prismaMock = {
    transaction: {
      create: jest.fn().mockResolvedValue(mockTransactions[0]),
    },
  };
  const notificationServiceMock = {
    sendNotification: jest.fn().mockResolvedValue(undefined),
  };
  let service: TransactionService;
  let userService: UserService;
  let prismaService: PrismaService;
  let notificationService: NotificationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    notificationService = module.get<NotificationService>(NotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should create a transaction', () => {
    it('should create a transaction', async () => {
      const transaction = await service.create({
        sender: 1,
        receiver: 2,
        amount: 10,
      });
      expect(userService.checkSenderTransaction).toHaveBeenCalledTimes(1);
      expect(userService.checkSenderTransaction).toHaveBeenCalledWith(1, 10);
      expect(userService.updateBalance).toHaveBeenCalledTimes(1);
      expect(userService.updateBalance).toHaveBeenCalledWith(2, 1, 10);
      expect(transaction).toEqual({
        ...mockTransactions[0],
        timestamp: expect.any(Date),
      });
      expect(prismaService.transaction.create).toHaveBeenCalledTimes(1);
      expect(notificationService.sendNotification).toHaveBeenCalledTimes(2);
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        1,
        'Transação realizada com sucesso!',
      );
    });
  });

  describe('should not create a transaction', () => {
    it('should not create a transaction', async () => {
      jest
        .spyOn(userService, 'checkSenderTransaction')
        .mockResolvedValue(false);
      try {
        await service.create({
          sender: 1,
          receiver: 2,
          amount: 10,
        });
      } catch (error) {
        expect(error).toEqual(new BadRequestException('Saldo insuficiente!'));
      }
    });
  });
});
