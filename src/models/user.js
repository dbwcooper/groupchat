import * as Service from '../services';
import { Notification, setCookie, delCookieByName, randomAvatar } from '../utils/util';

export default {
  namespace: 'user',
  state: {
    // userName: 'George James ',
    // avatar: { alif: '段', color: '#f56a00' }
    searchUserList: [],
    userAddLoading: false,
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
        yield put({ type: 'r_save', payload: { userName: payload.userName, avatar: payload.avatar } });
        delete data.token;
        yield put({ type: 'room/r_save', payload: data });
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
        yield put({ type: 'room/r_save', payload: { roomList: data.roomList } });
        delete data.token;
        delete data.roomList;
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
    // 根据用户名模糊查询用户列表
    *e_getUserList({ payload }, { put, call }) {
      try {
        yield put({ type: 'r_save', payload: { userAddLoading: true } });
        let { code, msg, data } = yield call(Service.getUserList, payload);
        if (code === 200) {
          yield put({ type: 'r_save', payload: { searchUserList: data } });
        } else {
          Notification('error', msg);
        }
        yield put({ type: 'r_save', payload: { userAddLoading: false } });
      } catch (error) {
        Notification('error', error.TypeError);
        yield put({ type: 'r_save', payload: { userAddLoading: false } });
      }
    },
    *e_inviteUser({ payload }, { select, call }) {
      try {
        debugger;
        if (!payload || payload.length === 0) {
          return;
        }
        // 获取当前所在聊天室
        let roomLink = yield select(state => state.room.roomLink);
        let { code, msg } = yield call(Service.inviteUser, { roomLink, userName: payload });
        if (code === 200) {
          Notification('success', msg);
        } else {
          Notification('error', msg);
        }
      } catch (error) {
        Notification('error', '错误');
      }
    }
  },
  reducers: {
    r_save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
