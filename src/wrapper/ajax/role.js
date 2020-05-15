import request from './basic';

export function role(params) {
  return request({
    url: '/api/role',
    method: 'GET',
    params,
  });
}

export function del(id) {
  return request({
    url: `/api/role/${id}`,
    method: 'DELETE',
  });
}
