import { Sequelize, Op } from 'sequelize';
import SequelizeConfig from '../../configs/sequelize.config';
import PostModel from '../posts/posts.model';
import UserModel from '../users/users.model';
import LikeModel from '../likes/likes.model';

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
};

db.User.hasMany(db.Post, { foreignKey: 'user_id', as: 'post' });
db.Post.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

db.User.belongsToMany(db.Post, {
  foreignKey: 'user_id',
  through: db.Like,
  as: 'likes',
});

db.Post.belongsToMany(db.User, {
  foreignKey: 'post_id',
  through: db.Like,
  as: 'likes',
});

export default db;
