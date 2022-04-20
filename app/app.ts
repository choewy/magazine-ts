import 'dotenv/config';

/* Express App */
import express from 'express';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Third-party Middlewares */
import Swagger from './src/swagger';
import morgan from 'morgan';
import cors from 'cors';
app.use(Swagger.url, Swagger.serve, Swagger.setup);
app.use(morgan('dev'));
app.use(cors());

/* Controller Middlewares */
import UserController from './src/users/users.controller';
app.use('/api/users', UserController);

export default app;
