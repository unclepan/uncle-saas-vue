import request from './basic';

export function get(params) {
  return request({
    url: '/api/module',
    method: 'GET',
    params,
  });
}
export function getModuleFunctive(params) {
  return request({
    url: '/api/module/functive/state',
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

export function getGeneralList(id, params, data) {
  return request({
    url: `api/module/general/get/${id}`,
    method: 'POST',
    params,
    data,
  });
}

export function getGeneralModule(id) {
  return request({
    url: `api/module/general/${id}/module`,
    method: 'GET',
  });
}

export function createModuleGeneral(id, data) {
  return request({
    url: `api/module/general/${id}`,
    method: 'POST',
    data,
  });
}

export function getModuleGeneralById(id, vid) {
  return request({
    url: `api/module/general/${id}/${vid}`,
    method: 'GET',
  });
}

export function updateModuleGeneral(id, vid, data) {
  return request({
    url: `api/module/general/${id}/${vid}`,
    method: 'PATCH',
    data,
  });
}
