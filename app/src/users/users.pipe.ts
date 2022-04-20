import { NextFunction, Request, Response } from 'express';
import { PipeErrorResponse } from '../__globals__/ErrorResponse';
import {
  NicknameInPasswordError,
  UserNotFoundError,
  UserTokenError,
} from '../__globals__/CustomError';
import {
  EmailValidation,
  NicknameValidation,
  PasswordValidation,
} from './users.validation';
import { CheckToken } from '../__globals__/utils';
import { UserRepository } from './users.repository';

type ValidationPromise = void | Response;

export class UserPipe {
  public static Email = async (
    req: Request<{ email: string }>,
    res: Response,
    next: NextFunction
  ): Promise<ValidationPromise> => {
    try {
      const { email } = req.body;
      await EmailValidation.validateAsync(email);
      next();
    } catch (error) {
      const { code, body } = new PipeErrorResponse(error);
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
      await NicknameValidation.validateAsync(nickname);
      return next();
    } catch (error) {
      const { code, body } = new PipeErrorResponse(error);
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
      await PasswordValidation.validateAsync(password);
      next();
    } catch (error) {
      const { code, body } = new PipeErrorResponse(error);
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
      if (isInclude) throw new NicknameInPasswordError();
      next();
    } catch (error) {
      const { code, body } = new PipeErrorResponse(error);
      return res.status(code).send(body);
    }
  };

  public static isLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ValidationPromise> => {
    try {
      const authorization = req.headers.authorization;
      const payload = CheckToken(authorization);
      if (!payload) throw new UserTokenError();
      const user = await UserRepository.userFindByPayload(payload);
      if (!user) throw new UserNotFoundError();
      res.locals.user = user;
      next();
    } catch (error) {
      const { code, body } = new PipeErrorResponse(error);
      return res.status(code).send(body);
    }
  };
}
