import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { GenToken } from '../../commons/utils';
import { UserSignupDto, UserSigninDto } from './users.dto';
import { UserRepository } from './users.repository';

export class UserService {
  public static Signup = async (
    req: Request<UserSignupDto>,
    res: Response
  ): Promise<Response> => {
    try {
      const userSignupDto: UserSignupDto = req.body;
      const userPayload = await UserRepository.Signup(userSignupDto);
      const accessToken = GenToken(userPayload);
      res.cookie('token', accessToken);
      return res.status(201).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Signin = async (
    req: Request<UserSigninDto>,
    res: Response
  ): Promise<Response> => {
    try {
      const userSigninDto: UserSigninDto = req.body;
      const userPayload = await UserRepository.Signin(userSigninDto);
      const accessToken = GenToken(userPayload);
      res.cookie('token', accessToken);
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Auth = async (_: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      ok: true,
      user: res.locals.user,
    });
  };
}
