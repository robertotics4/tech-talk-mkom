import './config/module-alias';
import { app } from '@/main/config/app';
import { env } from '@/main/config/env';

app.get('/', (request, response) => {
  return response.json({
    appName: 'template-cleanarch-typescript',
    version: '1.0.0',
  });
});

app.listen(env.port, () =>
  console.log(`Server running at http://localhost:${env.port}`),
);
