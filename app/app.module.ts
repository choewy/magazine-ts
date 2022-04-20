import 'dotenv/config';
import { setMiddlewares } from './app.middlware';
import { setControllers } from './app.controller';

/* EXPRESS APPLICATION */
import express from 'express';
const app = express();

/* APPLICATION SETTING */
setMiddlewares(app);
setControllers(app);

/* EXPORT TO ../bin/www.ts */
export default app;
