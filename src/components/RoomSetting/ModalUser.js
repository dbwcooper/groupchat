import React from 'react';
import { Modal, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const { Option } = Select;

class ModalUsers extends React.Component {
  constructor(params) {
    super(params);
    this.onSearchUserList = debounce(this.onSearchUserList, 800);
  }
  state = {
    value: '',
  }
  // 得到搜索用户列表
  onSearchUserList = (value) => {
    const { dispatch } = this.props;
    if (value) {
      dispatch({ type: 'user/e_getUserList', payload: value })
    }
  }
  onChange = (value) => {
    this.setState({ value })
  }
  // 添加用户
  inviteUsers = () => {
    const { value } = this.state;
    const { dispatch, closeModal } = this.props;
    if (value) {
      dispatch({
        type: 'user/e_inviteUser',
        payload: value
      });
      closeModal();
    }
  }
  render() {
    const { visible, closeModal } = this.props;
    const { userAddLoading, searchUserList } = this.props.user;
    return (
      <Modal
        title="Add user"
        visible={visible}
        onOk={this.inviteUsers}
        onCancel={closeModal}
      >
        <Select
          mode="combobox"
          placeholder="Select users"
          notFoundContent={userAddLoading ? <Spin size="small" /> : '暂无数据'}
          onSearch={this.onSearchUserList}
          onChange={this.onChange}
          style={{ width: '100%' }}
        >
          {searchUserList.map(d => <Option key={d.userName}>{d.userName}</Option>)}
        </Select>
      </Modal>
    );
  }
}
export default ModalUsers;
