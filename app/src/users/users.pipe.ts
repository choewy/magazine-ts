import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import {
  EmailValidation,
  NicknameValidation,
  PasswordValidation,
} from './users.validation';

type ValidationPromise = void | Response;

export const EmailPipe = async (
  req: Request<{ email: string }>,
  res: Response,
  next: NextFunction
): Promise<ValidationPromise> => {
  try {
    const { email } = req.body;
    await EmailValidation.validateAsync(email)
      .then(() => {
        next();
      })
      .catch((error: ValidationError) => {
        throw error.details[0].message;
      });
  } catch (error) {
    return res.status(400).send(String(error));
  }
};

export const NicknamePipe = async (
  req: Request<{ nickname: string }>,
  res: Response,
  next: NextFunction
): Promise<ValidationPromise> => {
  try {
    const { nickname } = req.body;
    await NicknameValidation.validateAsync(nickname)
      .then(() => {
        return next();
      })
      .catch((error: ValidationError) => {
        throw error.details[0].message;
      });
  } catch (error) {
    return res.status(400).send(String(error));
  }
};

export const PasswordPipe = async (
  req: Request<{ password: string }>,
  res: Response,
  next: NextFunction
): Promise<ValidationPromise> => {
  try {
    const { password } = req.body;
    await PasswordValidation.validateAsync(password).catch(
      (error: ValidationError) => {
        throw error.details[0].message;
      }
    );
  } catch (error) {
    return res.status(400).send(String(error));
  }

  try {
    const { nickname, password } = req.body;
    if (password.includes(nickname))
      throw '비밀번호에 닉네임이 포함되어 있습니다.';
    next();
  } catch (error) {
    return res.status(400).send(String(error));
  }
};
