import request from '../utils/request';
import qs from 'qs';

export async function queryHome(params) {
  return request(`/home/${params.id}?${qs.stringify(params)}`);
}

export async function queryStatus(params) {
  return request(`/home/status/${params.id}?${qs.stringify(params)}`);
}
