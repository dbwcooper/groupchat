import fetch from 'dva/fetch';
import { getCookieByName } from './util';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
async function request(url, options = {}) {
  const opts = {
    mode: 'cors',
    cache: 'default',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': getCookieByName()
    },
  };
  const response = await fetch(url, { ...options, ...opts });
  checkStatus(response);
  const data = await response.json();
  return data;
}
export default request;
