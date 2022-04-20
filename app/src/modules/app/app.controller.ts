import { Express } from 'express';
import { UserController } from '../users/users.controller';

export const setControllers = (app: Express) => {
  UserController(app);
};
