import request from './basic';

export function role(params) {
  return request({
    url: '/api/role',
    method: 'GET',
    params,
  });
}

export function get(id) {
  return request({
    url: `/api/role/${id}`,
    method: 'GET',
  });
}

export function post(data) {
  return request({
    url: '/api/role',
    method: 'POST',
    data,
  });
}

export function patch(data, id) {
  return request({
    url: `/api/role/${id}`,
    method: 'PATCH',
    data,
  });
}

export function getRoleBindUser(id) {
  return request({
    url: `/api/role/${id}/bind/user`,
    method: 'GET',
  });
}

export function addRoleBindUser(id, data) {
  return request({
    url: `/api/role/${id}/bind/user`,
    method: 'POST',
    data,
  });
}

export function removeRoleBindUser(id, data) {
  return request({
    url: `/api/role/${id}/remove/bind/user`,
    method: 'POST',
    data,
  });
}
