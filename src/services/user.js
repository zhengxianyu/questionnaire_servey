import request from '../utils/request';
import qs from 'qs';

export async function queryUser(params) {
  return request(`/user/${params.id}?${qs.stringify(params)}`);
}

export async function updateUser(params) {
  return request(`/user/update`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}


export async function updatePassword(params) {
  console.log("user-service-params-password==============:")
  console.log(params)
  return request(`/user/update`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}