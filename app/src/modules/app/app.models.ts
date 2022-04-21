import { Sequelize, Op } from 'sequelize';
import SequelizeConfig from '../../configs/sequelize.config';
import PostModel from '../posts/posts.model';
import UserModel from '../users/users.model';
import LikeModel from '../likes/likes.model';
import CommentModel from '../comments/comments.model';

const env: string = process.env.NODE_ENV || 'development';
const config = SequelizeConfig(env);

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
});

const db = {
  Sequelize,
  sequelize,
  Op,
  User: UserModel(sequelize),
  Post: PostModel(sequelize),
  Like: LikeModel(sequelize),
  Comment: CommentModel(sequelize),
};

db.User.hasMany(db.Post, { foreignKey: 'user_id', as: 'post' });
db.User.hasMany(db.Like, { foreignKey: 'user_id', as: 'likes' });
db.User.hasMany(db.Comment, { foreignKey: 'user_id', as: 'comment' });

db.Post.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Post.hasMany(db.Like, { foreignKey: 'post_id', as: 'likes' });
db.Post.hasMany(db.Comment, { foreignKey: 'post_id', as: 'comment' });

db.Like.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Like.belongsTo(db.Post, { foreignKey: 'post_id', as: 'post' });

db.Comment.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.Comment.belongsTo(db.Post, { foreignKey: 'post_id', as: 'post' });

export default db;
