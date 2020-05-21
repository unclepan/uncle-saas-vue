import request from './basic';

export function get(params) {
  return request({
    url: '/api/module',
    method: 'GET',
    params,
  });
}

export function getById(id) {
  return request({
    url: `/api/module/${id}`,
    method: 'GET',
  });
}

export function post(data) {
  return request({
    url: '/api/module',
    method: 'POST',
    data,
  });
}

export function patch(data, id) {
  return request({
    url: `/api/module/${id}`,
    method: 'PATCH',
    data,
  });
}


export function del(id) {
  return request({
    url: `/api/module/delete/${id}`,
    method: 'DELETE',
  });
}
