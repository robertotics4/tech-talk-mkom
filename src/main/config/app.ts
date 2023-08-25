import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import '@/infrastructure/injection-container';
import { routes } from '../routes';
import { errorHandler } from '../middlewares';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

export { app };
