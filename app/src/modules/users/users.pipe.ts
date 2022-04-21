import { NextFunction, Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { UserValidation } from '../../commons/validations';
import { UserPipeError } from './error/user.pipe.error';
import { AppUtils } from '../app/app.utils';

type ValidationPromise = void | Response;

export class UserPipe {
  public static Email = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ): Promise<ValidationPromise> => {
    try {
      const { email } = req.body;
      await UserValidation.Email().validateAsync(email);
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
  ): Promise<ValidationPromise> => {
    try {
      const { nickname } = req.body;
      await UserValidation.Nickname().validateAsync(nickname);
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
  ): Promise<ValidationPromise> => {
    try {
      const { password } = req.body;
      await UserValidation.Password().validateAsync(password);
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
  ): Promise<ValidationPromise> => {
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

  public static isLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ValidationPromise> => {
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
