import request from './basic';

export function option(params) {
  return request({
    url: '/api/option',
    method: 'GET',
    params,
  });
}

export function get(id) {
  return request({
    url: `/api/option/${id}`,
    method: 'GET',
  });
}

export function post(data) {
  return request({
    url: '/api/option',
    method: 'POST',
    data,
  });
}

export function patch(data, id) {
  return request({
    url: `/api/option/${id}`,
    method: 'PATCH',
    data,
  });
}
