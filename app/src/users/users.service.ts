import { Request, Response } from 'express';
import { ServiceErrorResponse } from '../__globals__/ErrorResponse';
import { GenToken } from '../__globals__/utils';
import { UserSignupDto, UserSigninDto } from './users.dto';
import { UserRepository } from './users.repository';

export class UserService {
  public static userSignup = async (
    req: Request<UserSignupDto>,
    res: Response
  ): Promise<Response> => {
    try {
      const userSignupDto: UserSignupDto = req.body;
      const userPayload = await UserRepository.userSignup(userSignupDto);
      const accessToken = GenToken(userPayload);
      res.cookie('token', accessToken);
      return res.status(201).send({ ok: true });
    } catch (error) {
      const { code, body } = new ServiceErrorResponse(error);
      return res.status(code).send(body);
    }
  };

  public static userSignin = async (
    req: Request<UserSigninDto>,
    res: Response
  ): Promise<Response> => {
    try {
      const userSigninDto: UserSigninDto = req.body;
      await UserRepository.userSignin(userSigninDto);
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new ServiceErrorResponse(error);
      return res.status(code).send(body);
    }
  };
}

export const UserIsLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let user = {};
  if (res.locals.user) user = { ...res.locals.user };
  return res.status(200).send({ ok: true, user });
};
