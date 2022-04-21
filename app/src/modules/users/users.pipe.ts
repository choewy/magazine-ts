import { NextFunction, Request, Response } from 'express';
import { UserPipeError } from './error/user.pipe.error';
import { PipePromise } from '../../commons/interfaces';
import { Exception } from '../../commons/exceptions';
import { AppUtils } from '../app/app.utils';
import { UserEmail } from './validation/user-email.validation';
import { UserNickname } from './validation/user-nickname.validation';
import { UserPassword } from './validation/user-password.validation';

export class UserPipe {
  public static Email = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
    try {
      const { email } = req.body;
      await UserEmail().validateAsync(email);
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Nickname = async (
    req: Request<{ nickname: string }>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
    try {
      const { nickname } = req.body;
      await UserNickname().validateAsync(nickname);
      return next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Password = async (
    req: Request<{ password: string }>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
    try {
      const { password } = req.body;
      await UserPassword().validateAsync(password);
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static NicknameInPwd = async (
    req: Request<{ password: string }>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
    try {
      const { nickname, password } = req.body;
      const isInclude = password.includes(nickname);
      if (isInclude) throw new UserPipeError.NicknameInPassword();
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static ConfirmPassword = async (
    req: Request<{ password: string; confirmPassword: string }>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
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
  };

  public static isLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> => {
    try {
      const authorization = req.headers.authorization || '';
      const [prefix, token] = authorization.split(' ');
      if (prefix !== 'Bearer') throw new UserPipeError.InvalidToken();

      const payload = AppUtils.CheckToken(token);
      if (!payload) throw new UserPipeError.InvalidToken();

      res.locals.payload = payload;
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };
}
