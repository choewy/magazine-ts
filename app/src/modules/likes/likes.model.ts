import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Like {
  user_id: number;
  post_id: number;
}

export class LikeModel extends Model<Like, {}> implements Like {
  public user_id!: number;
  public post_id!: number;
}
export default (sequelize: Sequelize): typeof LikeModel => {
  LikeModel.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Like',
      tableName: 'likes',
      timestamps: false,
      paranoid: false,
    }
  );

  LikeModel.removeAttribute('id');
  return LikeModel;
};
