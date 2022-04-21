import db from '../app/app.models';
import { UserDefaltDto } from './dto/user-default.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { DBErrors } from '../../commons/errors';
import { DefaultOptions } from '../../commons/options';
import { UserAttrs } from '../../commons/attributes';

const Errors = DBErrors('UserRepository');

export class UserRepository extends db.User {
  public static findUserByEmail = async (
    email: string
  ): Promise<UserDefaltDto | null> => {
    try {
      return await this.findOne({
        ...DefaultOptions,
        where: { email },
        attributes: UserAttrs.default,
      });
    } catch (error) {
      throw new Errors.find(error);
    }
  };

  protected static findPassword = async (
    email: string
  ): Promise<UserPasswordDto | null> => {
    try {
      return await this.findOne({
        ...DefaultOptions,
        where: { email },
        attributes: UserAttrs.password,
      });
    } catch (error) {
      throw new Errors.find(error);
    }
  };

  protected static createUser = async (
    userSignupDto: UserSignupDto
  ): Promise<void> => {
    try {
      await this.create(userSignupDto);
    } catch (error) {
      throw new Errors.create(error);
    }
  };
}
