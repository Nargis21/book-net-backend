import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();
import routes from './app/routes';

import globalErrorHandler from './app/middlewares/globalErrorHandler';

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes
app.use('/api/v1/', routes);

//global error handler -- this is for synchronous api request
app.use(globalErrorHandler);

export default app;
