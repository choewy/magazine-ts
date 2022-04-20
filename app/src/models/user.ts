import { DataTypes, Model, Sequelize } from 'sequelize';

export interface User {
  user_id: number;
  email: string;
  nickname: string;
  password: string;
  role: 0;
}

type UserCreateInterface = Pick<User, 'email'>;

export class UserModel
  extends Model<User, UserCreateInterface>
  implements User
{
  public user_id!: number;
  public email!: string;
  public nickname!: string;
  public password!: string;
  public role!: 0;

  public readonly deletedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize): typeof UserModel => {
  UserModel.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.TINYINT,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
    }
  );

  return UserModel;
};
