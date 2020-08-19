import { Router } from 'express';

import biddersRouter from '@modules/bidders/infra/http/routes/bidders.routes';

import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';

import idendityRolesRouter from '@modules/identity/infra/http/routes/identityRoles.routes';
import idendityUserRolesRouter from '@modules/identity/infra/http/routes/identityUserRoles.routes';

import tempFilesRouter from '@modules/tempfiles/infra/http/routes/temFiles.routes';

import approveCandidatesRouter from '@modules/users/infra/http/routes/approveCandidates.routes';
import repproveCandidatesRouter from '@modules/users/infra/http/routes/repproveCandidates.routes';
import candidatesRouter from '@modules/users/infra/http/routes/candidates.routes';
import validatorsRouter from '@modules/users/infra/http/routes/validators.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/bidders', biddersRouter);

routes.use('/clients', clientsRouter);

routes.use('/identity/roles', idendityRolesRouter);
routes.use('/identity/user-roles', idendityUserRolesRouter);

routes.use('/tempfiles', tempFilesRouter);

routes.use('/candidates/approve', approveCandidatesRouter);
routes.use('/candidates/repprove', repproveCandidatesRouter);
routes.use('/candidates', candidatesRouter);
routes.use('/validators', validatorsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
