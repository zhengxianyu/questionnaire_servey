import request from '../utils/request';
import qs from 'qs';

export async function querySurveys(params) {
  console.log("service-params:")
  console.log(params)
  return request(`/survey/${params.id}?${qs.stringify(params)}`);
}

export async function queryUser(params) {
  return request(`/user/${params.id}?${qs.stringify(params)}`);
}

export async function addQuestionnaire(params) {
  return request(`/survey`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request(`/survey`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`/survey/${params.id}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function publish(params) {
  return request(`/survey/${params.id}/${params.status}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}
