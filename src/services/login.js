import request from '../utils/request';
import qs from 'qs';

export async function searchUser(params) {
  return request(`/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });

}
