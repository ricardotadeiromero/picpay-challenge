import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [UserModule],
  exports: [NotificationService],
})
export class NotificationModule {}
