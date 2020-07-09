import axios from 'axios';
import Qs from 'qs';
import { Message } from 'element-ui';

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 300000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// request 拦截器
service.interceptors.request.use(
  (config) => {
    const tc = config;
    if (tc.contentType) {
      tc.headers['Content-Type'] = tc.contentType;
    }
    if (typeof tc.url !== 'string') {
      tc.url = `/api/${tc.url.join('/')}`;
    }
    // 是一个负责 `params` 序列化的函数
    tc.paramsSerializer = (params) => Qs.stringify(params);
    tc.headers.Authorization = localStorage.getItem('userToken');
    return tc;
  },
  (error) => {
    // 这里处理一些请求出错的情况
    Message({
      showClose: true,
      message: error,
      type: 'error',
    });
    Promise.reject(error);
  },
);

// response 拦截器
service.interceptors.response.use(
  (response) => response, // 这里处理一些response 正常返回时的逻辑
  (error) => { // 这里处理一些response 出错时的逻辑
    if (error.response) {
      // 请求已接受，但服务器响应的状态码不在 2xx 范围内
      Message({
        showClose: true,
        message: error.response.data.message,
        type: 'error',
      });
    } else {
      Message({
        showClose: true,
        message: error,
        type: 'error',
      });
    }
    return Promise.reject(error);
  },

);

export default service;
