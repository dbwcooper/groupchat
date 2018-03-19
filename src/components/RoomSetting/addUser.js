import React from 'react';
import { Modal, Select, Spin } from 'antd';

const { Option } = Select;

class ModalUsers extends React.Component {
  state = {
    value: '',
    data: [],
    fetching: false,
  }
  fetchUser = () => {

  }
  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  }
  render() {
    return (
      <Modal
        title="Add user"
        visible={this.props.visible}
        onOk={this.props.closeModal}
        onCancel={this.props.closeModal}
      >
        <Select
          mode="multiple"
          value={this.state.value}
          placeholder="Select users"
          notFoundContent={this.state.fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={{ width: '100%' }}
        >
          {this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)}
        </Select>
      </Modal>
    );
  }
}
export default ModalUsers;
