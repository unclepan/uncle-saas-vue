import request from './basic';

export function tree(params) {
  return request({
    url: '/api/functive/tree',
    method: 'GET',
    params,
  });
}

export function post(data) {
  return request({
    url: '/api/functive',
    method: 'POST',
    data,
  });
}

export function patch(data, id) {
  return request({
    url: `/api/functive/${id}`,
    method: 'PATCH',
    data,
  });
}


export function del(id) {
  return request({
    url: `/api/functive/delete/${id}`,
    method: 'DELETE',
  });
}
