import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;
