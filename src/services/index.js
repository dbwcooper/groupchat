import request from '../utils/request'; // eslint-disable-line

const Api = 'http://localhost:8001/api/';


/**
 * 增加一条用户聊天消息
 * @export
 * @param {any} body
 * @returns
 */
export function createComment(body) {
  return request(`${Api}comment/${body.roomLink}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
export function getUser() {
  return request('https://randomuser.me/api/?results=10');
}

export function inviteUsers() {
  return request('https://randomuser.me/api/?results=10');
}

/**
 * 根据输入的群组title 查找群组列表
 * @export
 * @param {any} title
 * @returns []
 */
export function searchRoom(title) {
  return request(`${Api}chatroom/list/${title}`, {
    method: 'GET'
  });
}
/**
 * @export
 * @param {any} roomId 聊天室名
 * @returns 聊天室内的消息记录
 */
export function getRoomDetail(roomLink) {
  return request(`${Api}chatroom/${roomLink}`, {
    method: 'GET'
  });
}

/**
 * 用户注册接口 POST
 * @export
 * @param {any} body {userName, pwd, rpwd}
 * 返回一个data {code: 200, msg: '', token: '12312ssd'}
 */
/**
 * 注册一个用户
 * @param {*用户信息} user
 */
export function register(user) {
  return request(`${Api}user/register`, {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

/**
 * 用户登陆接口 POST
 * @export
 * @param {any} body {userName, pwd}
 * @returns data {code: 200, msg: '', token: '12312ssd'}
 */
export function login(body) {
  return request(`${Api}user/login`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function createRoom(body) {
  return request(`${Api}chatroom/create`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
/**
 * 获取roomMenu
 * @export
 * @returns
 */
export function getRoomMenu() {
  return request(`${Api}chatroom/roomMenu`, {
    method: 'GET'
  });
}

/**
 * 用户注销接口 POST x-access-token 放在header中
 * @export
 * @returns data {code: 200, msg: ''}
 */
export function logout() {
  return { code: 200, msg: '' }
}
