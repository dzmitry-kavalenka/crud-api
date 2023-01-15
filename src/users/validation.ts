import { User } from './types';

export const requiredFields = ['username', 'age', 'hobbies'];

export const validateUserBody = (
  method: string,
  body?: User,
): string | undefined => {
  if (!body) {
    return 'request body does not contain required fields';
  }

  let areAllRequiredFieldsExist: boolean;

  if (method === 'POST') {
    areAllRequiredFieldsExist = requiredFields.every((field) =>
      Object.keys(body).includes(field),
    );
  } else {
    areAllRequiredFieldsExist = requiredFields.some((field) =>
      Object.keys(body).includes(field),
    );
  }

  if (!areAllRequiredFieldsExist) {
    return 'request body does not contain required fields';
  }

  if (body.hobbies && !Array.isArray(body.hobbies)) {
    return 'hobbies must be an array';
  }

  if (body.age && typeof body.age !== 'number') {
    return 'age must be a number';
  }

  if (body.username && typeof body.username !== 'string') {
    return 'username must be a string';
  }
};
