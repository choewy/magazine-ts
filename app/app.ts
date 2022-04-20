import 'dotenv/config';

import { setMiddlewares } from './src/modules/app/app.middlware';
import { setControllers } from './src/modules/app/app.controller';

/* EXPRESS APPLICATION */
import express from 'express';
const app = express();

/* APPLICATION SETTING */
setMiddlewares(app);
setControllers(app);

/* EXPORT TO ../bin/www.ts */
export default app;
