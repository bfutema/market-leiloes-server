import { Router } from 'express';

const routes = Router();

routes.post('/', (request, response) => response.json({ ok: true }));

export default routes;
