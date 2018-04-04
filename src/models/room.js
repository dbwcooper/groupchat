import * as Service from '../services';
import { Notification } from '../utils/util';

export default {
  namespace: 'room',
  state: {
    name: 'ant-design',
    title: '一个设计语言&前端框架',
    // 群内公告
    annoucement: '本群仅用于程序员之间的信息交流，请大家维护一个良好的网络环境。',
    userAddLoading: false,
    roomSearchLoading: false,
    converseLoading: false,
    onlineList: [{ color: '#1890ff', alif: 'C', userName: 'cooperduan' },
      { color: '#1890ff', alif: 'C', userName: 'cooperduans' },
      { pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', userName: 'cooperduan3' }],
    searchUserList: [],
    searchRoomList: [],
    roomList: [{ roomName: 'Nodejss 交流群', roomId: '1' }, { roomName: 'Koa 交流群', roomId: '2' }],
    defaultRoomId: '1',
    converseList: [{
      userName: 'George James', avatar: { color: '#1890ff', alif: 'C' }, moment: 1521300207000, content: '<span style="color: red">12321332</span>', md: true
    }, {
      userName: 'George Jamess', avatar: { color: '#f56a00', alif: 'G' }, moment: 1521300208000, content: '### 代码markdown', md: true
    }]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log(history, dispatch);
    },
  },
  effects: {
    *e_increaseRemark({ payload }, { select, put }) {
      try {
        let user = yield select(state => state.user);
        if (!user.userName) {
          Notification('error', '请重新登陆');
          return;
        }
        payload.userName = user.userName;
        let data = yield Service.addConverse(payload);
        if (data.code === 200) {
          // 插入content 的 converseList列表中
          payload.avatar = user.avatar;
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
        yield put({ type: 'r_saveUserAddLoading', payload: true });
        let { data, msg } = yield call(Service.getUser, action.payload);
        if (data) {
          yield put({ type: 'r_saveSearchUserList', payload: data });
        } else {
          Notification('error', msg);
        }
        yield put({ type: 'r_saveUserAddLoading', payload: false });
      } catch (error) {
        Notification('error', error.TypeError);
        yield put({ type: 'r_saveUserAddLoading', payload: false });
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
    *e_getConverseByRoomId(action, { put, call }) {
      try {
        yield put({ type: 'r_saveConverseLoading', payload: true });
        let { code, data, msg } = yield call(Service.getConverse, action.payload);
        if (code === 200) {
          yield put({ type: 'r_save', converseList: data })
          Notification('success', msg);
        }
        yield put({ type: 'r_saveConverseLoading', payload: false })
      } catch (error) {
        yield put({ type: 'r_saveConverseLoading', payload: false })
        Notification('error', '错误');
      }
    },
    // 创建一个聊天室
    *e_createRoom(action, { put, call }) {
      try {
        yield put({ type: 'r_saveConverseLoading', payload: true });
        let { code, data, msg } = yield call(Service.getConverse, action.payload);
        if (code === 200) {
          yield put({ type: 'r_save', converseList: data })
          Notification('success', msg);
        }
        yield put({ type: 'r_saveConverseLoading', payload: false })
      } catch (error) {
        yield put({ type: 'r_saveConverseLoading', payload: false })
        Notification('error', '错误');
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
    // save userAddLoading
    r_saveUserAddLoading(state, { payload }) {
      return { ...state, userAddLoading: payload }
    },
    // save roomSearchLoading
    r_saveRoomSearchLoading(state, { payload }) {
      return { ...state, roomSearchLoading: payload }
    },
    // save roomSearchLoading
    r_saveConverseLoading(state, { payload }) {
      return { ...state, converseLoading: payload }
    },
  },
};
