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

export function searchRoom(roomName) {
  console.log(roomName);
  return {
    code: 200,
    msg: 'success',
    data: [{ roomName: 'Nodejs 交流群', roomId: '1' },
      { roomName: 'Koa 交流群', roomId: '2' },
      { roomName: 'Express 交流群', roomId: '3' },
      { roomName: 'Egg 交流群', roomId: '4' },
      { roomName: 'Hapi 交流群', roomId: '5' }],
  };
}
/**
 * @export
 * @param {any} roomId 聊天室名
 * @returns 聊天室内的消息记录
 */
export function getConverse(roomId) {
  console.log(roomId);
  return request('https://randomuser.me/api/?results=10');
}

/**
 * 用户注册接口 POST
 * @export
 * @param {any} body {userName, pwd, rpwd}
 * 返回一个data {code: 200, msg: '', token: '12312ssd'}
 */
export function register(body) {
  console.log(body)
  return {
    code: 200,
    msg: '注册成功',
    data: {
      token: 'das1231dad',
      avatar: { alif: 'C', color: '#f56a00' },
      roomList: [{ roomName: 'Nodejs 交流群', roomId: '1' }, { roomName: 'Koa 交流群', roomId: '2' }],
    }
  };
}

/**
 * 用户登陆接口 POST
 * @export
 * @param {any} body {userName, pwd}
 * @returns data {code: 200, msg: '', token: '12312ssd'}
 */
export function login(body) {
  console.log(body)
  return {
    code: 200,
    msg: '登录成功',
    data: {
      token: 'das1231dad',
      avatar: { alif: 'C', color: '#f56a00' },
      roomList: [{ roomName: 'Nodejs 交流群', roomId: '1' }, { roomName: 'Koa 交流群', roomId: '2' }],
    }
  };
}

/**
 * 用户注销接口 POST x-access-token 放在header中
 * @export
 * @returns data {code: 200, msg: ''}
 */
export function logout() {
  return { code: 200, msg: '' }
}
