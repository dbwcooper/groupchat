
export default {
    namespace: 'room',
    state: {
        name:'roomName',
        title: '房间描述',
        annoucement: '群内公告',
        onlineList: [{ userName: 'George James', avatar: ['G', '#f56a00'] }],
        converseList: [
            { userName: 'George James', avatar: ['G', '#f56a00'], moment: '1521300207', content: '这是第一条评论内容' , md: true }]
    },
    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line
        },
    },
    effects: {
        *fetch({ payload }, { call, put }) {  // eslint-disable-line
            yield put({ type: 'save' });
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
