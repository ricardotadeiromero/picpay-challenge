import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { UserService } from '../user/user.service';
import { Transaction } from './entities/transaction.entity';
import { NotificationService } from '../notification/notification.service';
import { PrismaService } from '../database/prisma.service';

const mockTransactions: Transaction[] = [];
@Injectable()
export class TransactionService {
  constructor(
    private readonly userService: UserService,
    private readonly notificationService: NotificationService,
    private readonly prisma: PrismaService,
  ) {}

  async authorizateTransaction(sender: number, amount: number) {
    const authorizateResponse = await fetch(
      'https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc',
    );
    const responseData = await authorizateResponse.json();
    const hasBalanceEnough = await this.userService.checkSenderTransaction(
      sender,
      amount,
    );
    if (!hasBalanceEnough) {
      throw new Error('Saldo insuficiente!');
    }
    if (
      authorizateResponse.status !== 200 ||
      responseData.message !== 'Autorizado'
    ) {
      throw new Error('Transação não autorizada!');
    }
    return;
  }

  async create(dto: CreateTransactionDto) {
    try {
      await this.authorizateTransaction(dto.sender, dto.amount);
      await this.userService.updateBalance(
        dto.receiver,
        dto.sender,
        dto.amount,
      );
      const [sender, receiver] = await this.userService.findUsersTransactions(
        dto.sender,
        dto.receiver,
      );
      const transaction = await this.prisma.transaction.create({
        data: {
          timestamp: new Date(),
          sender: {
            connect: {
              id: sender.id,
            },
          },
          receiver: {
            connect: {
              id: receiver.id,
            },
          },
          amount: dto.amount,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
      await this.notificationService.sendNotification(
        dto.sender,
        'Transação realizada com sucesso!',
      );
      await this.notificationService.sendNotification(
        dto.receiver,
        'Transação realizada com sucesso!',
      );
      return transaction;
    } catch (error) {
      await this.notificationService.sendNotification(
        dto.sender,
        'Transação falhou!',
      );
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
