import db from '../app/app.models';
import { UserDefaltDto } from './dto/user-default.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { DefaultOptions } from '../../commons/options';
import { UserAttrs } from '../../commons/attributes';

export class UserRepository extends db.User {
  public static findUserByEmail = async (
    email: string
  ): Promise<UserDefaltDto | null> => {
    return await this.findOne({
      ...DefaultOptions,
      where: { email },
      attributes: UserAttrs.default,
    });
  };

  protected static findPassword = async (
    email: string
  ): Promise<UserPasswordDto | null> => {
    return await this.findOne({
      ...DefaultOptions,
      where: { email },
      attributes: UserAttrs.password,
    });
  };

  protected static createUser = async (
    userSignupDto: UserSignupDto
  ): Promise<void> => {
    await this.create(userSignupDto);
  };
}
