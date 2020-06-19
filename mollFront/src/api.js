import axios from 'axios'
import Vue from 'vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
})

// 封装axios的get请求，get请求一样
export function get(url) {
  return new Promise((resolve, reject) => {
    axios.post(url)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

// 封装axios的post请求，get请求一样
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export default {
  $http(url) { //$http会被调用的方法名,可以按自己喜好命名
    return get(url, params);
  },
  $http(url, params) { //$http会被调用的方法名,可以按自己喜好命名
    return post(url, params);
  }
}
