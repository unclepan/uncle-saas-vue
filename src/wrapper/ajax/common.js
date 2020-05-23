import request from './basic';

export default function rename(data) {
  return request({
    url: '/api/file/rename',
    method: 'POST',
    data,
  });
}
