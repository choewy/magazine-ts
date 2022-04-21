import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { AppUtils } from '../app/app.utils';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserServiceError } from './error/user.service.error';
import { UserRepository } from './users.repository';

export class UserService extends UserRepository {
  public static Signup = async (
    req: Request<UserSignupDto>,
    res: Response
  ): Promise<Response> => {
    try {
      /* Step #0 : DTO */
      const userSignupDto: UserSignupDto = req.body;
      const { email, nickname, password } = userSignupDto;

      /* Step #1 : 이메일 존재 여부 확인 */
      const userExistance = await this.findUserByEmail(email);
      if (userExistance) throw new UserServiceError.AleadyExist();

      /* Step #2 : 비밀번호 암호화 처리 */
      userSignupDto.password = AppUtils.PasswordHash(password);

      /* Step #3 : 회원가입 진행 */
      await this.createUser(userSignupDto);

      /* Step #4 : 토큰 발급 */
      const userPayload = { email, nickname };
      const accessToken = AppUtils.GenToken(userPayload);

      /* Step #5 : 응답 */
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
      /* Step #0 : DTO */
      const userSigninDto: UserSigninDto = req.body;
      const { email, password } = userSigninDto;

      /* Step #1 : email에 해당하는 비밀번호 존재 여부 확인 */
      const userPasswordDto = await this.findPassword(password);
      if (!userPasswordDto) throw new UserServiceError.NotFound();

      /* Step #2 : 비밀번호 일치 여부 확인 */
      const validPassword = AppUtils.ComparePassword(userPasswordDto, password);
      if (!validPassword) throw new UserServiceError.WrongEmailOrPasswd();

      /* Step #3 : 토큰 발급*/
      const userPayload = { email, nickname: userPasswordDto.nickname };
      const accessToken = AppUtils.GenToken(userPayload);

      /* Step #5 : 응답 */
      res.cookie('token', accessToken);
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static Auth = async (_: Request, res: Response): Promise<Response> => {
    try {
      /* Step #0 : email */
      const { email } = res.locals.payload;

      /* Step #1 : email에 해당하는 사용자 존재 여부 확인 */
      const user = await this.findUserByEmail(email);
      if (!user) throw new UserServiceError.NotFound();

      /* Step #2 : 응답 */
      return res.status(200).send({
        ok: true,
        user,
      });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };
}
