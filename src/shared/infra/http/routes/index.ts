import { Router } from 'express';

import tempFilesRouter from '@modules/tempfiles/infra/http/routes/temFiles.routes';

import validatorsRouter from '@modules/users/infra/http/routes/validators.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/tempfiles', tempFilesRouter);

routes.use('/validators', validatorsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
