import { Express, Request, Response } from 'express';
import { PostController } from '../posts/posts.controller';
import { UserController } from '../users/users.controller';
import { LikeController } from '../likes/likes.controller';
import { CommentController } from '../comments/comments.controller';
import { AppController } from './app.public';

export const setControllers = (app: Express) => {
  UserController(app);
  PostController(app);
  LikeController(app);
  CommentController(app);
  AppController(app);
};
