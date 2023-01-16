import { IncomingMessage, ServerResponse } from 'http';
import { Routing } from './types';
import usersController from './users/users.controller';

const routing: Routing = {
  users: usersController,
};

const router = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url.replace('/api', '');
  const method = req.method;

  const baseRoute = url.split('/')[1];
  const controller = routing[baseRoute];

  if (!controller) {
    res.statusCode = 404;
    return;
  }

  controller.forEach((handler, key) => {
    if (
      key.method === method &&
      (key.path === url || url.split('/').length === key.path.split('/').length)
    ) {
      try {
        handler(req, res);
      } catch (error) {
        res.statusCode = 500;
        res.end('Unexpected server error');
      }
    }
  });
};

export default router;
