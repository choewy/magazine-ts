import express, { Express } from 'express';
import Swagger from './app.swagger';
import morgan from 'morgan';
import cors from 'cors';
import { uploadPath } from '../../configs/multer.config';

export const setMiddlewares = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(Swagger.url, Swagger.serve, Swagger.setup);
  app.use(morgan('dev'));
  app.use(cors());
  app.use('/image', express.static(uploadPath));
};
