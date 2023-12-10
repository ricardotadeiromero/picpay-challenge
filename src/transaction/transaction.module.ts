import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from 'src/user/user.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService],
  imports: [UserModule, NotificationModule],
})
export class TransactionModule {}
