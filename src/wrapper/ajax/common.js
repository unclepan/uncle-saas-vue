import request from './basic';

export default function rename(data) {
  return request({
    // url: '/api/file/rename',
    url: ['file', 'rename'],
    method: 'POST',
    data,
  });
}
