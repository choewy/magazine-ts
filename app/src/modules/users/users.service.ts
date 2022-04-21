import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { GenToken } from '../../commons/utils';
import { UserSignupDto, UserSigninDto } from './users.dto';
import { UserRepository } from './users.repository';

/* Service에는 특정 기능에 대한 비즈니스 로직을 구현하는 방향으로 수정할 것 */
/*
  - [ ] : Signup
    - [ ] : Repository.findByEmail
    - [ ] : 이메일 존재 여부 확인 및 분기 처리
    - [ ] : 비밀번호 암호화 처리
    - [ ] : Repository.createUser
    - [ ] : 토큰 발급 및 응답

  - [ ] : Signin
    - [ ] : Repository.findByEmail
    - [ ] : 이메일 존재 여부 확인 및 1차 분기 처리
    - [ ] : 비밀번호 일치 여부 확인 및 2차 분기 처리
    - [ ] : 토큰 발급 및 응답

  - [ ] : Auth
    - [ ] : Repository.findByPayload
    - [ ] : 이메일 존재 여부 확인 및 1차 분기 처리
    - [ ] : 사용자 정보 필터 및 응답
*/

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
