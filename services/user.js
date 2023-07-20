import { UserType } from 'types';

import { fetcher } from './fetcher';

export const getUserProfile = async (accessToken) => {
  return fetcher.get(`/v3/users/me`, {
    accessToken: accessToken,
  });
};

export const getUsers = async (accessToken) => {
  return fetcher.get(`/v3/users/`, {
    accessToken: accessToken,
  });
};

export const getUserById = async (
  userId,
  accessToken
) => {
  return fetcher.get(`/v3/users/${userId}`, {
    accessToken: accessToken,
  });
};

const validateUser = user => {
  if (user.name.length < 5) {
    throw Error('Name is too short');
  }
  if (user.email.length < 5) {
    throw Error('Email is required');
  }
};

export const createUser = async (
  user,
  accessToken
) => {
  if (user.id) {
    throw Error('User has an id. Did you mean to update the user instead?');
  }
  validateUser(user);

  return fetcher.post(`/v3/users`, user, {
    accessToken: accessToken,
  });
};

export const updateUser = async (
  user,
  accessToken
) => {
  if (!user.id) {
    throw Error('Missing user id.');
  }
  validateUser(user);

  return fetcher.put(`/v3/users/${user.id}`, user, {
    accessToken: accessToken,
  });
};