import axios from 'axios';

const methods = [
  'get',
  'post',
  'put',
  'delete'
];

const axiosWrapper = {};

const queryStringBuilder = query => Object.keys(query).length ? '?' + Object.keys(query).map(k => `${k}=${query[k]}`).join('&') : '';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

console.log(import.meta.env.VITE_APP_API_URL)

for (const method of methods) {
  axiosWrapper[method] = async function (route, body, query = {}, complete = false) {
    try {
      const url = `${route}${queryStringBuilder(query)}`;

      const request = await instance({
        method,
        url,
        data: body
      });

      return complete ? request : request.data;
    } catch (err) {
      console.error(err);
      return Promise.reject(err.response);
    }
  }
}

export default axiosWrapper;
