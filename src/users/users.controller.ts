import { IncomingMessage, ServerResponse } from 'http';
import { RequestInfo } from '../types';
import * as usersService from './users.service';
import { User } from './types';

export const users: User[] = [];

const userController = new Map<
  RequestInfo,
  (req: IncomingMessage, res: ServerResponse) => User[] | User | void
>([
  [{ method: 'GET', path: '/users' }, usersService.getAllUsers],
  [{ method: 'GET', path: '/users/:id' }, usersService.getUserById],
  [{ method: 'POST', path: '/users' }, usersService.createtUser],
  [{ method: 'PUT', path: '/users/:id' }, usersService.updateUser],
  [{ method: 'DELETE', path: '/users/:id' }, usersService.deleteUserById],
]);

export default userController;
