import http from 'k6/http';
import { group, sleep, check } from 'k6';

export const options = {
  // rps: 1000,
  vus: 150,
  duration: '15s',
};

export default function () {
  let sku = (Math.floor(Math.random()*1000000 + 9000000));
  const res = http.get(`http://localhost:3004/api/games/${sku}/oneBySku/`);
  sleep(.1);
  const checkRes = check(res, {
    'status is 200': (r) => r.status === 200,
  });
}