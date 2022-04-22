import { Request, Response, Express } from 'express';
import path from 'path';

export const publicPath = path.join(__dirname, '../../../public');
export const AppController = (app: Express) => {
  app.get('/', (_: Request, res: Response) => {
    return res.sendFile(publicPath + '/index.html');
  });
};
