import { IncomingMessage, ServerResponse } from 'http';
import usersController from './users/users.controller';

const routing = {
  users: usersController,
};

const router = (client: { req: IncomingMessage; res: ServerResponse }) => {
  const url = client.req.url;
  const method = client.req.method;

  const baseRoute = url.split('/')[1];
  const controller = routing[baseRoute];

  if (!controller) {
    client.res.statusCode = 404;
    return;
  }

  controller.forEach((handler, req) => {
    if (
      req.method === method &&
      (req.path === url || url.split('/').length === req.path.split('/').length)
    ) {
      try {
        handler(client.req, client.res);
      } catch (error) {
        client.res.statusCode = 500;
        client.res.end('Unexpected server error');
      }
    }
  });
};

export default router;
