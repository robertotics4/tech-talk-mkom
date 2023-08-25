import { Router } from 'express';
import { taskRoutes } from './task.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    appName: 'Tech Talk Example',
    version: '1.0.0',
  });
});

routes.use('/tasks', taskRoutes);

export { routes };
