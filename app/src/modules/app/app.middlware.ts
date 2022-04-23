import express, { Express } from 'express';
import Swagger from './app.swagger';
import morgan from 'morgan';
import cors from 'cors';
import { uploadPath } from '../../configs/multer.config';
import { publicPath } from './app.public';

export const setMiddlewares = (app: Express) => {
  app.use(cors({ 
    origin: [
    "http://59.5.243.37",
    "http://localhost:3000",
    ], 
    allowedHeaders: [
      "http://59.5.243.37",
      "http://localhost:3000",
    ], 
    exposedHeaders: [
      'authorization'
    ], 
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(Swagger.url, Swagger.serve, Swagger.setup);
  app.use(morgan('dev'));
  app.use('/image', express.static(uploadPath));
  app.use('/', express.static(publicPath));
};
