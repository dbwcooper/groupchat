import * as Service from '../services';
import { Notification, setCookie, delCookieByName, randomAvatar } from '../utils/util';

export default {
  namespace: 'user',
  state: {
    // userName: 'George James ',
    // avatar: { alif: '段', color: '#f56a00' }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *e_register({ payload }, { call, put }) {
      // 随机生成用户头像
      payload.avatar = randomAvatar(payload.userName);
      const { code, msg, data } = yield call(Service.register, payload);
      if (code === 200) {
        yield setCookie('token', data.token, 7);
        data.userName = payload.userName;
        data.avatar = payload.avatar;
        yield put({ type: 'r_save', payload: data });

        yield put({ type: 'e_getRoomMenu' });
        Notification('success', msg);
      } else {
        Notification('error', msg);
      }
    },
    *e_login({ payload }, { call, put }) {
      // 随机生成用户头像
      const { code, msg, data } = yield call(Service.login, payload);
      if (code === 200) {
        yield setCookie('token', data.token, 7);
        data.userName = payload.userName;
        // 如果返回了roomList才执行 roomList的保存
        if (data.roomList && data.roomList.length !== 0) {
          yield put({ type: 'room/r_save', payload: { roomList: data.roomList } })
        }
        // 保存用户信息
        yield setCookie('token', data.token, 7);
        yield put({ type: 'r_save', payload: data });
        Notification('success', msg);
      } else {
        Notification('error', msg);
      }
    },
    *e_logout(action, { call, select, put }) {
      const { code, msg } = yield call(Service.logout);
      if (code === 200) {
        let userName = yield select(state => state.user.userName);
        yield delCookieByName(userName);
        yield put({ type: 'r_save', payload: { userName: null, avatar: null } })
        Notification('success', msg);
      } else {
        Notification('error', msg);
      }
    },
  },
  reducers: {
    r_save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
