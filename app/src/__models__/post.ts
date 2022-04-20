import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Post {
  post_id: number;
  content: string;
  image_url: string;
}

type PostCreateInterface = Pick<Post, 'content'>;

export class PostModel
  extends Model<Post, PostCreateInterface>
  implements Post
{
  public post_id!: number;
  public content!: string;
  public image_url!: string;

  public readonly deletedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize): typeof PostModel => {
  PostModel.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      image_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true,
      paranoid: true,
    }
  );

  return PostModel;
};
