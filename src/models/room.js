import * as Service from '../services';
import { Notification } from '../utils/util';

export default {
  namespace: 'room',
  state: {
    roomLink: 'nodejs',
    title: '一个Javascript运行环境',
    // 群内公告
    annoucement: '',
    userAddLoading: false,
    roomSearchLoading: false,
    converseLoading: false,
    menuLoading: false,
    onlineList: [],
    searchUserList: [],
    searchRoomList: [],
    roomList: [],
    converseList: []
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'e_getRoomMenu' }); // 获取左边的menu
      dispatch({ type: 'e_getRoomDetail' }); // 获取左边的menu
    },
  },
  effects: {
    *e_createComment({ payload }, { select, put }) {
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
        let data = yield Service.createComment(payload);
        if (data.code === 200) {
          // 插入content 的 converseList列表中
          yield put({ type: 'r_saveConverse', payload });
          Notification('success', 'success');
        } else {
          Notification('error', '评论失败');
        }
      } catch (error) {
        Notification('error', error);
      }
    },
    // 根据输入的用户名查找用户
    *e_getSearchUserList(action, { put, call }) {
      try {
        yield put({ type: 'r_save', payload: { userAddLoading: true } });
        let { data, msg } = yield call(Service.getUser, action.payload);
        if (data) {
          yield put({ type: 'r_saveSearchUserList', payload: data });
        } else {
          Notification('error', msg);
        }
        yield put({ type: 'r_save', payload: { userAddLoading: false } });
      } catch (error) {
        Notification('error', error.TypeError);
        yield put({ type: 'r_save', payload: { userAddLoading: false } });
      }
    },
    // 邀请用户
    *e_inviteUsers(action, { put, call, select }) {
      try {
        let { code, data, msg } = yield call(Service.inviteUsers, action.payload);
        if (code !== 200) {
          let onlineList = yield select(state => state.room.onlineList);
          onlineList.push(data);
          yield put({ type: 'r_save', onlineList })
          Notification('success', msg);
        }
      } catch (error) {
        Notification('error', '错误');
      }
    },
    // 搜索群组
    *e_getSearchRoomList(action, { put, call }) {
      try {
        yield put({ type: 'r_save', payload: { roomSearchLoading: true } })
        let { code, data, msg } = yield call(Service.searchRoom, action.payload);
        if (code === 200) {
          yield put({ type: 'r_save', payload: { searchRoomList: data } })
        } else {
          Notification('error', msg);
        }
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
        let result = {};
        let roomState = yield select(state => state.room);
        // 从搜索 select进入
        if (typeof payload === 'object') {
          result = {
            roomList: roomState.roomList,
            roomLink: payload.roomLink
          }
          // 先检查左边的roomMenu是否存在此roomLink
          let existLink = result.roomList.some(item => item.roomLink === payload.roomLink);
          if (!existLink) result.roomList.push(payload);
        } else if (payload) {
          // 左边menu的点击事件
          let room = roomState.roomList.find(item => item.roomLink === payload);
          result.title = room.title;
          result.roomLink = room.roomLink;
        } else {
          // 首次进入页面
          result.roomLink = roomState.roomLink;
        }
        // 首次根据roomLink获取comment 列表对话信息
        let { code, data, msg } = yield call(Service.getRoomDetail, result.roomLink);
        if (code === 200) {
          yield put({ type: 'r_save', payload: data });
          Notification('success', msg);
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
        payload.onlineList = [user.avatar]
        let { code, msg } = yield call(Service.createRoom, payload);
        if (code === 200) {
          // 将新创建的聊天室写入聊天室列表
          let roomState = yield select(state => state.room);
          payload.roomList = roomState.roomList;
          payload.roomList.push({
            roomLink: payload.roomLink,
            title: payload.title,
            annoucement: payload.annoucement
          });
          yield put({ type: 'r_save', payload: payload });
          Notification('success', msg);
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
        yield put({ type: 'r_save', payload: { converseLoading: true, menuLoading: true } });
        let { code, data, msg } = yield call(Service.getRoomMenu);
        if (code === 200 && data.length !== 0) {
          yield put({ type: 'r_save', payload: { roomList: data } })
        } else {
          Notification('error', msg);
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
    r_saveConverse(state, { payload }) {
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
