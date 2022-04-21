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
    UserService.Signup
  );
  router.post('/signin', UserPipe.Email, UserPipe.Password, UserService.Signin);
  router.get('/auth', UserPipe.IsLogin, UserService.Auth);

  return app.use('/api/users', router);
};
