import * as Service from '../services';
import { Notification } from '../utils/util';

export default {
  namespace: 'room',
  state: {
    name: 'roomName',
    title: '房间描述',
    annoucement: '本群仅用于程序员之间的信息交流，严禁一切反党，反社会的言论，请大家维护一个良好的网络环境。',
    onlineList: [{ userName: 'George James', avatar: ['G', '#f56a00'] }],
    converseList: [{
      userName: 'George James', avatar: ['G', '#f56a00'], moment: 1521300207000, content: '<span style="color: red">12321332</span>', md: true
    }, {
      userName: 'George James', avatar: ['G', '#f56a00'], moment: 1521300208000, content: '### 代码markdown', md: true
    }]
  },
  subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) { // eslint-disable-line
      yield put({ type: 'save' });
    },
    *addContent({ payload }, { select, put }) {
      let user = yield select(state => state.user);
      if (!user.userName) return;
      payload.userName = user.userName;
      let data = yield Service.addConverse(payload);
      if (data.code === 200) {
        // 插入content 的 converseList列表中
        payload.avatar = user.avatar;
        yield put({ type: 'saveContent', payload });
        Notification('success', 'success');
      } else {
        Notification('error', '评论失败');
      }
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveContent(state, { payload }) {
      let converseList = [...state.converseList];
      converseList.push(payload);
      return { ...state, converseList }
    }
  },
};
