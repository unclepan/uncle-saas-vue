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
