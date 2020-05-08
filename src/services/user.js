import request from '@/utils/request';
const BASE_URL = 'http://localhost:8080/api/';
export async function login(params) {
  return request(BASE_URL + "login", {
    method: 'POST',
    data: params,
  });
}

export async function register(params) {
  return request(BASE_URL + 'register', {
    method: 'POST',
    data: params,
  });
}

export async function detailUser(params) {
  return request(BASE_URL + 'detail_user', {
    method: 'POST',
    data: params,
  });
}
