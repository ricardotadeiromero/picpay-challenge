import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserType } from './entities/user';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/createUserDto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findByEmail(email: string): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findEmail(id: number): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user.email;
  }

  async updateBalance(receiverId: number, senderId: number, value: number) {
    const receiver = await this.prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });
    if (!receiver) throw new Error('Usuário não encontrado!');
    const sender = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
    });
    await this.prisma.user.update({
      where: {
        id: senderId,
      },
      data: {
        balance: {
          decrement: value, // Decrementa o valor do saldo
        },
      },
    });
    await this.prisma.user.update({
      where: {
        id: receiverId,
      },
      data: {
        balance: {
          increment: value, // Decrementa o valor do saldo
        },
      },
    });
  }

  async checkSenderTransaction(senderId: number, value: number) {
    const sender = await this.prisma.user.findUnique({
      where: {
        id: senderId,
      },
    });
    const newBalance = sender.balance - value;
    if (newBalance < 0) {
      return false;
    }
    return true;
  }

  async create(dto: CreateUserDto): Promise<User> {
    console.log(dto);
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: hashPassword,
      },
    });
    return newUser;
  }

  async findUsersTransactions(senderId: number, receiverId: number) {
    const users = await this.prisma.user.findMany({
      where: {
        OR: [{ id: senderId }, { id: receiverId }],
      },
    });

    const sender = users.find((user) => user.id === senderId);
    const receiver = users.find((user) => user.id === receiverId);

    if (!sender || !receiver) {
      const notFoundUser = !sender ? 'Sender' : 'Receiver';
      throw new BadRequestException(`Usuário ${notFoundUser} não encontrado!`);
    }

    return [sender, receiver];
  }

  async addBalance(id: number, value: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException('Usuário não encontrado!');
    const newBalance = user.balance + value;
    const newUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        balance: newBalance,
      },
    });
    return newUser;
  }
}
