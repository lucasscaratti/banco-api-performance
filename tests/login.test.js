import http from 'k6/http';

import { sleep, check } from 'k6';
import { pegarBaseURL } from '../utils/variaveis.js';

const postLogin = JSON.parse(open('../fixtures/postLogin.json'))

export const options = {
  iterations: 1,
  thresholds: {
    http_req_duration: ['p(90)<10', 'max<9'],
    http_req_failed: ['rate<0.01'] //rate = porcentagem
  }
};

export default function () {
  const url = pegarBaseURL() + '/login';
  const payload = JSON.stringify(postLogin);

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


const res = http.post(url, payload, params);

if (res.status !== 200) {
    console.log(`Status recebido: ${res.status}`);
    console.log(`Corpo retornado: ${res.body}`);
  }

check(res, {
  'Validar que o Status e 200': (r) => r.status === 200,
  'Validar que o Token e String': (r) => typeof(r.json().token) == 'string'
})

sleep(1);
}