import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { collectRequestData } from '../utils';
import { users } from './users.controller';
import { validateUserBody, requiredFields } from './validation';
import { User } from './types';

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

export const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url.split('/')[2];
  const user = users.find(({ id }) => id === userId);

  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.end('id must be valid uuid');
    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.end('There is no user with such id');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user));
};

export const createtUser = (req: IncomingMessage, res: ServerResponse) => {
  collectRequestData(req, res, (body: User) => {
    const error = validateUserBody(req.method, body);

    if (error) {
      res.statusCode = 400;
      res.end(error);
      return;
    }

    const newUser = requiredFields.reduce((acc, field) => {
      acc[field] = body[field];

      return acc;
    }, {} as User);

    newUser.id = uuidv4();
    users.push(newUser);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url.split('/')[2];
  const user = users.find(({ id }) => id === userId);

  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.end('id must be valid uuid');
    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.end('There is no user with such id');
    return;
  }

  collectRequestData(req, res, (body: User) => {
    const error = validateUserBody(req.method, body);

    if (error) {
      res.statusCode = 400;
      res.end(error);
      return;
    }

    requiredFields.forEach((field) => {
      if (body[field]) {
        user[field] = body[field];
      }
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  });
};

export const deleteUserById = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url.split('/')[2];
  const user = users.find(({ id }) => id === userId);

  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.end('id must be valid uuid');
    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.end('There is no user with such id');
    return;
  }

  const userIndex = users.findIndex(({ id }) => id === userId);
  users.splice(userIndex, 1);

  res.statusCode = 204;
  res.end();
};
