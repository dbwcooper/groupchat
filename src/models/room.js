import * as Service from '../services';
import { Notification, getCookieByName } from '../utils/util';

export default {
  namespace: 'room',
  state: {
    roomLink: 'groupchat',
    title: '',
    annoucement: '', // 群内公告
    roomSearchLoading: false,
    converseLoading: false,
    menuLoading: false,
    onlineList: [],
    searchRoomList: [],
    roomList: ['groupchat'], // roomList['nodejs', 'groupchat']
    converseList: [],
    isUserExist: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      window.dispatch = dispatch; // 保存dispatch到window对象
      dispatch({ type: 'e_getRoomMenu' });
      dispatch({ type: 'e_getRoomDetail' });
    },
  },
  effects: {
    *e_createComment({ payload }, { select }) {
      try {
        let userState = yield select(state => state.user);
        let roomLink = yield select(state => state.room.roomLink);
        if (!userState.userName) {
          Notification('error', '请重新登陆');
          return;
        }
        payload.userName = userState.userName;
        payload.avatar = userState.avatar;
        payload.roomLink = roomLink;
        payload.moment = new Date().toISOString(); // 带时区格式的时间。
        yield Service.updateComment(payload); // 这里使用websocket 来发送消息，websocket 直接调用r_saveComment方法
      } catch (error) {
        Notification('error', error);
      }
    },
    // 搜索群组
    *e_getSearchRoomList({ payload }, { put, call }) {
      try {
        if (!payload) return;
        yield put({ type: 'r_save', payload: { roomSearchLoading: true } })
        let { code, data, msg } = yield call(Service.searchRoom, payload);
        if (code === 200) {
          return yield put({ type: 'r_save', payload: { searchRoomList: data } })
        }
        Notification('error', msg);
        yield put({ type: 'r_save', payload: { roomSearchLoading: false } })
      } catch (error) {
        yield put({ type: 'r_save', payload: { roomSearchLoading: false } })
        Notification('error', '错误');
      }
    },
    // 根据用户选择的room 获取对应的聊天室内的对话信息
    *e_getRoomDetail({ payload }, { put, call, select }) {
      try {
        yield put({ type: 'r_save', payload: { converseLoading: true } });
        let { roomList, roomLink } = yield select(state => state.room);
        if (typeof payload === 'object') { // 从搜索 select进入
          // 先检查左边的roomMenu是否存在此roomLink
          let existLink = roomList.some(item => item === payload.roomLink);
          if (!existLink) {
            roomList.push(payload.roomLink);
            yield put({ type: 'r_save', payload: { roomList } })
          }
          roomLink = payload.roomLink; // eslint-disable-line
        } else if (payload) {
          // 左边menu的点击事件
          roomLink = payload;
        }
        let userName = yield select(state => state.user.userName);
        if (!userName) {
          yield put({ type: 'user/e_verification' });
        }
        let { code, data, msg } = yield call(Service.getRoomDetail, roomLink);
        if (code === 200) {
          userName = yield select(state => state.user.userName);
          data.isUserExist = data.onlineList.some(element => element.userName === userName);
          yield put({ type: 'r_save', payload: data });
        } else {
          Notification('error', msg);
        }
        yield put({ type: 'r_save', payload: { converseLoading: false } });
      } catch (error) {
        yield put({ type: 'r_save', payload: { converseLoading: false } });
        Notification('error', '错误');
      }
    },
    // 创建一个聊天室
    *e_createRoom({ payload }, { put, call, select }) {
      try {
        yield put({ type: 'r_save', payload: { converseLoading: true } });
        let user = yield select(state => state.user);
        let model = { ...payload, onlineList: [{ ...user }] };
        let { code, msg } = yield call(Service.createRoom, model);
        if (code === 200) {
          // 将新创建的聊天室写入聊天室列表
          let roomState = yield select(state => state.room);
          payload.roomList = roomState.roomList;
          payload.roomList.push(payload.roomLink);
          let onlineList = [{ avatar: user.avatar, userName: user.userName }];
          payload.onlineList = onlineList;
          payload.converseList = [];
          yield put({ type: 'r_save', payload: payload });
        } else {
          Notification('error', msg);
        }
        yield put({ type: 'r_save', payload: { converseLoading: false } });
      } catch (error) {
        yield put({ type: 'r_save', payload: { converseLoading: false } });
        Notification('error', '错误');
      }
    },
    // 得到roomMenu
    *e_getRoomMenu(action, { put, call }) {
      try {
        let token = yield getCookieByName('token');
        if (!token) {
          return;
        }
        yield put({ type: 'r_save', payload: { converseLoading: true, menuLoading: true } });
        let { code, data } = yield call(Service.getRoomMenu);
        //  && data.length !== 0
        if (code === 200) {
          yield put({ type: 'r_save', payload: { roomList: data } })
        }
        yield put({ type: 'r_save', payload: { converseLoading: false, menuLoading: false } });
      } catch (error) {
        yield put({ type: 'r_save', payload: { converseLoading: false, menuLoading: false } });
        Notification('error', '请求错误');
      }
    }
  },
  reducers: {
    r_save(state, { payload }) {
      return { ...state, ...payload }
    },
    // 保存用户发言的内容
    r_saveComment(state, { payload }) {
      let converseList = [...state.converseList];
      converseList.push(payload);
      return { ...state, converseList }
    },
    // 保存查找的用户列表
    r_saveSearchUserList(state, { payload }) {
      console.log(payload);
      return { ...state, searchUserList: [{ userName: 'George James', avatar: ['G', '#f56a00'] }] }
    },
    // save roomSearchLoading
    r_saveConverseLoading(state, { payload }) {
      return { ...state, converseLoading: payload }
    },
  },
};
