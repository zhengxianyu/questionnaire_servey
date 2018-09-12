import request from '../utils/request';
import qs from 'qs';

export async function querySurvey(params) {
  return request(`/survey/detail/${params.id}?${qs.stringify(params)}`);
}

export async function addQuestion(params) {
  return request(`/question/${params.survey_id}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function changeType(params) {
  return request(`/survey/${params.survey_id}/${params.status}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function update(params) {
  return request(`/question/${params.question_id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}

export async function remove(params) {
  return request(`/question/${params.question_id}`, {
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

export async function submit(params) {
  console.log("submit-params:")
  console.log(params)
  return request(`/option/submit`, {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  });
}