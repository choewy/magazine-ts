import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { AppUtils } from '../app/app.utils';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserServiceError } from './error/user.service.error';
import { UserRepository } from './users.repository';

export class UserService extends UserRepository {
  public static Signup = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const userSignupDto: UserSignupDto = req.body;
      const { email, nickname, password } = userSignupDto;

      const userExistance = await this.findUserByEmail(email);
      if (userExistance) throw new UserServiceError.AleadyExist();

      userSignupDto.password = AppUtils.PasswordHash(password);
      await this.createUser(userSignupDto);
      const userPayload = { email, nickname };
      const accessToken = AppUtils.GenToken(userPayload);
      res.setHeader('Set-Cookie', accessToken)
      res.cookie('token', accessToken);
      return res.status(201).send({ ok: true, token: accessToken });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Signin = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const userSigninDto: UserSigninDto = req.body;
      const { email, password } = userSigninDto;

      const userPasswordDto = await this.findPassword(email);
      if (!userPasswordDto) throw new UserServiceError.NotFound();

      const validPassword = AppUtils.ComparePassword(userPasswordDto, password);
      if (!validPassword) throw new UserServiceError.WrongEmailOrPasswd();

      const userPayload = { email, nickname: userPasswordDto.nickname };
      const accessToken = AppUtils.GenToken(userPayload);
      res.setHeader('Set-Cookie', accessToken)
      res.cookie('token', accessToken);
      return res.status(200).send({ ok: true, token: accessToken });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Auth = async (_: Request, res: Response): Promise<Response> => {
    const user = res.locals.user;
    return res.status(200).send({
      ok: true,
      user,
    });
  };
}
