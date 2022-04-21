import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface PayloadDto {
  email: string;
  nickname: string;
}

const secret = String(process.env.SECRET || 'SECRET');
const rounds = Number(process.env.ROUNDS || 10);

export class AppUtils {
  public static PasswordHash = (password: string): string => {
    const slatKey = bcrpyt.genSaltSync(rounds);
    const hashPassword = bcrpyt.hashSync(password, slatKey);
    return hashPassword;
  };

  public static GenToken = (userPayload: PayloadDto): string => {
    return jwt.sign(userPayload, secret);
  };

  public static ComparePassword = (
    user: { password: string },
    password: string
  ): boolean => {
    return bcrpyt.compareSync(password, user.password);
  };

  public static CheckToken = (token: string): PayloadDto | false => {
    const payload = jwt.verify(token, secret);
    return payload ? Object(payload) : false;
  };
}
