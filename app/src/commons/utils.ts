import bcrpyt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserPayload } from './interfaces';

const secret = String(process.env.SECRET || 'SECRET');
const rounds = Number(process.env.ROUNDS || 10);

export const PasswordHash = (password: string): string => {
  const slatKey = bcrpyt.genSaltSync(rounds);
  const hashPassword = bcrpyt.hashSync(password, slatKey);
  return hashPassword;
};

export const GenToken = (userPayload: UserPayload): string => {
  return jwt.sign(userPayload, secret);
};

export const ComparePassword = (
  user: { password: string },
  password: string
): boolean => {
  return bcrpyt.compareSync(password, user.password);
};

export const CheckToken = (authorization: string | undefined) => {
  const [PREFIX, token] = (authorization || '').split(' ');
  if (PREFIX !== 'Bearer' || !token) return false;
  try {
    const payload = jwt.verify(token, secret);
    return payload ? payload : false;
  } catch (error) {
    return false;
  }
};
