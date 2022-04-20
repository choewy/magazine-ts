import { Sequelize, Op } from 'sequelize';
import SequelizeConfig from './config';
import PostModel from './post';
import UserModel from './user';

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
};

db.User.hasMany(db.Post, { foreignKey: 'user_id', as: 'post' });
db.Post.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });

export default db;
