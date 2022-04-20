import { Router } from 'express';
import { EmailPipe, NicknamePipe, PasswordPipe } from './users.pipe';
import { UserSignup } from './users.service';

const UserController = Router();

UserController.post(
  '/signup',
  EmailPipe,
  NicknamePipe,
  PasswordPipe,
  UserSignup
);

export default UserController;
