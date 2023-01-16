import { IncomingMessage, ServerResponse } from 'http';
import { Routing } from './types';
import usersController from './users/users.controller';

const routing: Routing = {
  users: usersController,
};

const router = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url.replace('/api', '');
  const method = req.method;

  console.log({ url });

  const baseRoute = url.split('/')[1];
  const controller = routing[baseRoute];

  if (!controller) {
    res.statusCode = 404;
    res.end('Resource not found');
  }

  controller.forEach((handler, key) => {
    if (
      key.method === method &&
      (key.path === url || url.split('/').length === key.path.split('/').length)
    ) {
      try {
        console.log('handler');
        handler(req, res);
      } catch (error) {
        res.statusCode = 500;
        res.end('Unexpected server error');
      }
    } else {
      res.statusCode = 404;
      res.end('Resource not found');
    }
  });

  return;
};

export default router;
