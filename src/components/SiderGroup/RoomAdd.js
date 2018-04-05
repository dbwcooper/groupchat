import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
class RoomAddForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
        title="Create Community"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.props.onVisible}
      >
        <Form>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your community name' }],
            })(<Input placeholder="your community description " />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('roomLink', {
              rules: [{
                  required: true,
                  message: 'Please input your community link name (only letters)',
                  pattern: new RegExp(/^[a-zA-Z]+$/g)
                }],
            })(<Input addonBefore="https://groupchat.duanbowen.com/" placeholder="community link name" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('annoucement', {
            })(<TextArea placeholder="room annoucement" />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const RoomAdd = Form.create()(RoomAddForm);
export default RoomAdd;
