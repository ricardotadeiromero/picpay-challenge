import { User } from 'src/user/entities/user';

export interface AuthRequest extends Request {
  user: User;
}
