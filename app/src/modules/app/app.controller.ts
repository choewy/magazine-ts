import { Express } from 'express';
import { PostController } from '../posts/posts.controller';
import { UserController } from '../users/users.controller';

export const setControllers = (app: Express) => {
  UserController(app);
  PostController(app);
};
