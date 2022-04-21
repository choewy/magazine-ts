import { NextFunction, Request, Response } from 'express';
import { UserPipeError } from './error/user.pipe.error';
import { PipePromise } from '../../commons/interfaces';
import { Exception } from '../../commons/exceptions';
import { AppUtils } from '../app/app.utils';
import { UserEmail } from './validation/user-email.validation';
import { UserNickname } from './validation/user-nickname.validation';
import { UserPassword } from './validation/user-password.validation';
import { UserService } from './users.service';
import { UserServiceError } from './error/user.service.error';

export interface UserNewDto {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

export class UserPipe {
  public static async Email(
    req: Request<UserNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { email } = req.body;
      await UserEmail().validateAsync(email);
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async Nickname(
    req: Request<UserNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { nickname } = req.body;
      await UserNickname().validateAsync(nickname);
      return next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async Password(
    req: Request<UserNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { password } = req.body;
      await UserPassword().validateAsync(password);
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async NicknameInPwd(
    req: Request<UserNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { nickname, password } = req.body;
      const isInclude = password.includes(nickname);
      if (isInclude) throw new UserPipeError.NicknameInPassword();
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async ConfirmPassword(
    req: Request<UserNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { password, confirmPassword } = req.body;
      await UserPassword().validateAsync(confirmPassword);
      const isEqual = password === confirmPassword;
      if (!isEqual) throw new UserPipeError.NotEqualPassword();
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async isLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const authorization = req.headers.authorization || '';
      const [prefix, token] = authorization.split(' ');
      if (prefix !== 'Bearer') throw new UserPipeError.InvalidToken();

      const payload = AppUtils.CheckToken(token);
      if (!payload) throw new UserPipeError.InvalidToken();

      const { email } = payload;
      const user = await UserService.findUserByEmail(email);
      if (!user) throw new UserServiceError.NotFound();

      res.locals.user = user;
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }
}
