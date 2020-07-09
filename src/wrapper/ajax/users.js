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

export function patch(data, userId) {
  return request({
    url: `/api/users/${userId}`,
    method: 'PATCH',
    data,
  });
}

export function users(params) {
  return request({
    // url: '/api/users',
    url: ['users'],
    method: 'GET',
    params,
  });
}


export function getUserBindRole(id) {
  return request({
    // url: `/api/users/${id}/bind/role`,
    url: ['users', id, 'bind', 'role'],
    method: 'GET',
  });
}

export function addUserBindRole(id, data) {
  return request({
    url: `/api/users/${id}/bind/role`,
    method: 'POST',
    data,
  });
}

export function removeUserBindRole(id, data) {
  return request({
    url: `/api/users/${id}/remove/bind/role`,
    method: 'POST',
    data,
  });
}
