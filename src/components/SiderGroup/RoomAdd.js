import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class RoomAddForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'room/e_createRoom',
          payload: values
        })
        this.props.onVisible();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="创建聊天室"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onVisible}
        okText="提交"
        cancelText="取消"
      >
        <Form>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入你的聊天室描述信息' }],
            })(<Input placeholder="用一句话概括你的聊天室" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('roomLink', {
              rules: [{
                  required: true,
                  message: '请输入你的聊天室名(仅限英文字符)',
                  pattern: new RegExp(/^[a-zA-Z]+$/g)
                }],
            })(<Input addonBefore="https://groupchat.duanbowen.com/" placeholder="聊天室名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('annoucement', {
            })(<TextArea placeholder="聊天室公告" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const RoomAdd = Form.create()(RoomAddForm);
export default RoomAdd;
