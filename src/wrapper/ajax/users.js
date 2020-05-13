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

export function userVerify(data) {
  return request({
    url: '/users/verify',
    method: 'POST',
    data,
  });
}

export function create(data) {
  return request({
    url: '/users',
    method: 'POST',
    data,
  });
}

export function usersWhetherName(params) {
  return request({
    url: '/users/whether/name',
    method: 'GET',
    params,
  });
}
