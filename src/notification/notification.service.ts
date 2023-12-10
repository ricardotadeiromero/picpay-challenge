import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class NotificationService {
  constructor(private readonly userService: UserService) {}

  async sendNotification(id: number, message: string) {
    const email = await this.userService.findEmail(id);
    const url = 'https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6';
    const notificationBody = {
      email,
      message,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationBody),
    };
    const response = await fetch(url, fetchOptions);
    if (response.status !== 200) {
      throw new Error('Erro ao enviar notificação');
    }
  }
}
