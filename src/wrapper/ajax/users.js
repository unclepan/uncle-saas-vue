import request from './basic';

export function login(data) {
  return request({
    url: '/api/users/login',
    method: 'POST',
    data,
  });
}

export function logout(data = {}) {
  return request({
    url: '/api/users/logout',
    method: 'POST',
    data,
  });
}

export function userInfo() {
  return request({
    url: '/api/users/info',
    method: 'GET',
  });
}

export function userVerify(data) {
  return request({
    url: '/api/users/verify',
    method: 'POST',
    data,
  });
}

export function create(data) {
  return request({
    url: '/api/users',
    method: 'POST',
    data,
  });
}


export function usersWhetherName(params) {
  return request({
    url: '/api/users/whether/name',
    method: 'GET',
    params,
  });
}

export function fileCropAvatar(data, userId) {
  return request({
    url: `/api/users/${userId}/update/avatar`,
    method: 'POST',
    data,
  });
}
