import request from '../utils/request'; // eslint-disable-line
export function addConverse(converse) { // eslint-disable-line
  return { code: 200 };
}
export function getUser() {
  return request('https://randomuser.me/api/?results=10');
}

export function inviteUsers() {
  return request('https://randomuser.me/api/?results=10');
}
