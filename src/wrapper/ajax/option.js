import request from './basic';

// 公共选项接口
export function optionSelect(ename, params) {
  return request({
    url: `/api/option/select/${ename}`,
    method: 'GET',
    params,
  });
}

export function option(params) {
  return request({
    url: '/api/option',
    method: 'GET',
    params,
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

export function optionValue(params, id) {
  return request({
    url: `/api/option/value/${id}`,
    method: 'GET',
    params,
  });
}

export function postValue(data, id) {
  return request({
    url: `/api/option/value/${id}`,
    method: 'POST',
    data,
  });
}

export function patchValue(data, id, vid) {
  return request({
    url: `/api/option/value/${id}/${vid}`,
    method: 'PATCH',
    data,
  });
}
