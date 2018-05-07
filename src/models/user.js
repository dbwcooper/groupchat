import * as Service from '../services';
import {
  Notification,
  setCookie,
  delCookieByName,
  randomAvatar
} from '../utils/util';

export default {
  namespace: 'user',
  state: {
    // userName: 'George James ',
    // avatar: { alif: '段', color: '#f56a00' }
    // userName: '',
    // avatar: {
    //   alif: '',
    //   color: '',
    // },
    searchUserList: [],
    userAddLoading: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      // 从cookie中获取userName, avatar
    },
  },
  effects: {
    // 验证token是否过期
    *e_verification(action, { call, put }) {
      const { code, msg, data } = yield call(Service.verification);
      if (code === 200) {
        yield put({ type: 'r_save', payload: data });
        yield put({ type: 'room/r_save', payload: data });
        return;
      }
      Notification('error', msg);
    },
    *e_register({ payload }, { call, put }) {
      // 随机生成用户头像
      payload.avatar = randomAvatar(payload.userName);
      const { code, msg, data } = yield call(Service.register, payload);
      if (code === 200) {
        yield setCookie('token', data.token, 7);
        yield put({ type: 'r_save', payload: { userName: payload.userName, avatar: payload.avatar } });
        delete data.token;
        yield put({ type: 'room/r_save', payload: data });
      } else {
        Notification('error', msg);
      }
    },
    *e_login({ payload }, { call, put }) {
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
    *e_inviteUser({ payload }, { select, call, put }) {
      try {
        // 获取当前所在聊天室
        let roomLink = yield select(state => state.room.roomLink);
        let { code, msg, data } = yield call(Service.inviteUser, { roomLink, userName: payload });
        if (code === 200) {
          yield put({ type: 'room/r_save', payload: data });
          return Notification('success', '邀请成功!');
        }
        Notification('error', msg);
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
