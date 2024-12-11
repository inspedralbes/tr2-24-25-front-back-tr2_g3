import apiService from './apiService';

export const login = (email, password) => {
  return apiService.post('/auth/login', { email, password });
};

export const register = (username, email, password) => {
  return apiService.post('/auth/register', { username, email, password });
};
