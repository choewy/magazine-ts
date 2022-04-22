import { Request, Response, Express } from 'express';
import path from 'path';
import { uploadPath } from '../../configs/multer.config';

export const publicPath = path.join(__dirname, '../../../public');
export const AppController = (app: Express) => {
  app.get('/', (_: Request, res: Response) => {
    return res.sendFile(publicPath + '/index.html');
  });
  app.get('/image/:image_url', (req: Request, res: Response) => {
    const { image_url } = req.params;
    return res.sendFile(uploadPath + `/${image_url}`);
  });
};
