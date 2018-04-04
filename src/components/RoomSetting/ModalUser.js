import React from 'react';
import { Modal, Select, Spin } from 'antd';

const { Option } = Select;

// 设置搜索延迟
const debounce = (fn, delay) => {
  let timer;
  let args = arguments;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
class ModalUsers extends React.Component {
  constructor(params) {
    super(params);
    this.fetchUser = debounce(this.fetchUser, 800);
  }
  state = {
    value: [],
  }
  // 得到搜索用户列表
  fetchUser = (value) => {
    this.props.dispatch({ type: 'room/e_getSearchUserList', payload: value })
  }
  handleChange = (value) => {
    this.setState({ value });
  }
  // 添加用户
  inviteUsers = () => {
    this.props.dispatch({
      type: 'room/e_inviteUsers',
      payload: this.state.value
    })
  }
  render() {
    const { value } = this.state;
    return (
      <Modal
        title="Add user"
        visible={this.props.visible}
        onOk={this.inviteUsers}
        onCancel={this.props.closeModal}
      >
        <Select
          mode="multiple"
          labelInValue
          value={value}
          placeholder="Select users"
          notFoundContent={this.props.room.userAddLoading ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {this.props.room.searchUserList.map(d => <Option key={d.userName}>{d.userName}</Option>)}
        </Select>
      </Modal>
    );
  }
}
export default ModalUsers;
