import db from '../app/app.models';
import { UserDefaltDto } from './dto/user-default.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { UserRepositoryError } from './error/user.repository.error';

const Options = { raw: true, nest: true };
const UserDefaultAttributes = ['user_id', 'email', 'nickname', 'role'];
const UserPasswdAttributes = ['nickname, password'];

export class UserRepository extends db.User {
  public static findUserByEmail = async (
    email: string
  ): Promise<UserDefaltDto | null> => {
    try {
      return await this.findOne({
        ...Options,
        where: { email },
        attributes: UserDefaultAttributes,
      });
    } catch (error) {
      throw new UserRepositoryError.find(error);
    }
  };

  protected static findPassword = async (
    email: string
  ): Promise<UserPasswordDto | null> => {
    try {
      return await this.findOne({
        ...Options,
        where: { email },
        attributes: UserPasswdAttributes,
      });
    } catch (error) {
      throw new UserRepositoryError.find(error);
    }
  };

  protected static createUser = async (
    userSignupDto: UserSignupDto
  ): Promise<void> => {
    try {
      await this.create(userSignupDto);
    } catch (error) {
      throw new UserRepositoryError.create(error);
    }
  };
}
