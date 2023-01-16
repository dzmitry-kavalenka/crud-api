import server from '../../index';
import * as supertest from 'supertest';
import { User } from '../types';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('123'),
  validate: jest.fn().mockReturnValue(true),
}));

describe('User Service', () => {
  let request: supertest.SuperTest<supertest.Test>;
  const newUser: Omit<User, 'id'> = {
    username: 'name',
    age: 15,
    hobbies: [],
  };

  beforeEach(() => {
    request = supertest(server);
  });

  it('should return an empty array for GET /users', async () => {
    const response = await request.get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return newly created user for POST /users', async () => {
    const response = await request.post('/users').send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      ...newUser,
      id: '123',
    });
  });

  it('should return user by id for GET /users/{userId}', async () => {
    const postResponse = await request.post('/users').send(newUser);
    const getResponse = await request.get(`/users/${postResponse.body.id}`);

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body).toEqual({
      ...newUser,
      id: '123',
    });
  });

  it('should return updated user for PUT /users/{userId}', async () => {
    const postResponse = await request.post('/users').send(newUser);
    const putResponse = await request
      .put(`/users/${postResponse.body.id}`)
      .send({ age: 21 });

    expect(putResponse.statusCode).toBe(200);
    expect(putResponse.body).toEqual({
      username: 'name',
      age: 21,
      hobbies: [],
      id: postResponse.body.id,
    });
  });
});
