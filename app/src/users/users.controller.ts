import { Router, Express } from 'express';
import { UserPipe } from './users.pipe';
import { UserService } from './users.service';

export const UserController = (app: Express) => {
  const router = Router();
  router.post(
    '/signup',
    UserPipe.Email,
    UserPipe.Nickname,
    UserPipe.Password,
    UserPipe.NicknameInPwd,
    UserService.userSignup
  );

  router.post(
    '/signin',
    UserPipe.Email,
    UserPipe.Password,
    UserService.userSignin
  );

  return app.use('/api/users', router);
};
