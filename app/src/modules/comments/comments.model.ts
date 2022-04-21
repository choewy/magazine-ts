import { DataTypes, Model, Sequelize } from 'sequelize';

export interface Comment {
  comment_id: number;
  content: string;
  user_id: number;
  post_id: number;
}

type CommentCreateInterface = Pick<Comment, 'content'>;

export class CommentModel
  extends Model<Comment, CommentCreateInterface>
  implements Comment
{
  public comment_id!: number;
  public post_id!: number;
  public user_id!: number;
  public content!: string;

  public readonly deletedAt!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize): typeof CommentModel => {
  CommentModel.init(
    {
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
      timestamps: true,
      paranoid: true,
    }
  );

  return CommentModel;
};
