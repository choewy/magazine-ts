import { Express } from 'express';
import { UserController } from './src/users/users.controller';

export const setControllers = (app: Express) => {
  UserController(app);
};
