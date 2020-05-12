import request from './basic';

export function login(data) {
  return request({
    url: '/users/login',
    method: 'POST',
    data,
  });
}

export function logout(data = {}) {
  return request({
    url: '/users/logout',
    method: 'POST',
    data,
  });
}

export function userInfo() {
  return request({
    url: '/users/info',
    method: 'GET',
  });
}
