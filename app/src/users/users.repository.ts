import { UserPayload } from '../__globals__/interfaces';
import { ComparePassword, PasswordHash } from '../__globals__/utils';
import { UserSigninDto, UserSignupDto } from './users.dto';
import db from '../__models__';
import {
  UserAleadyExistError,
  UserNotFoundError,
  UserWrongEmailOrPassword,
} from '../__globals__/CustomError';
import { User } from '../__models__/user';

export class UserRepository {
  public static userFindByPayload = async (
    payload: UserPayload
  ): Promise<User | null> => {
    const { email } = payload;
    return await db.User.findOne({
      where: {
        [db.Op.or]: [{ email }],
      },
    });
  };

  /* 이메일로 사용자 정보 조회 */
  public static userFindByEmail = async (
    email: string
  ): Promise<User | null> => {
    return await db.User.findOne({
      where: {
        [db.Op.or]: [{ email }],
      },
    });
  };

  /* 사용자 회원가입 */
  public static userSignup = async (
    userSignupDto: UserSignupDto
  ): Promise<never | UserPayload> => {
    const { email, nickname, password } = userSignupDto;

    /* 이메일 계정이 존재하는 경우 409 Conflict */
    const user = await this.userFindByEmail(email);
    if (user) throw new UserAleadyExistError();

    /* 비밀번호 암호화 후 저장 */
    userSignupDto.password = PasswordHash(password);
    await db.User.create(userSignupDto);

    /* UserService로 토큰에 저장할 정보를 넘김 */
    return { email, nickname };
  };

  /* 사용자 로그인 */
  public static userSignin = async (
    userSigninDto: UserSigninDto
  ): Promise<never | UserPayload> => {
    const { email, password } = userSigninDto;

    /* 이메일 계정이 존재하지 않는 경우 404 Not Found */
    const user = await this.userFindByEmail(email);
    if (!user) throw new UserNotFoundError();

    /* 비밀번호 일치 여부 확인 */
    let verify = false;
    if (user) verify = ComparePassword(user, password);

    /* 비밀번호가 틀린 경우 402 Unauthorized */
    if (!verify) throw new UserWrongEmailOrPassword();

    /* UserService로 토큰에 저장할 정보를 넘김 */
    return { email, nickname: user.nickname };
  };
}
