import React, { PureComponent } from 'react';
import { Form, Input, Icon, Button, Modal } from 'antd';

const FormItem = Form.Item;
class NormalLoginForm extends PureComponent {
  state = {
    isRegister: false,
    confirmDirty: false,
  }
  // 每次用户在确认密码框输入时都会进行一次判断, 判断当前框内是否有值
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  // 判断两次输入的密码是否一致
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('pwd')) {
      callback('两次输入的密码不一致 !');
    } else {
      callback();
    }
  }
  // 用户输入密码时判断输入的密码是否与resetpassowrd框内的密码一致
  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['rpwd'], { force: true });
    }
    callback();
  }

  // 处理用户提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let types = this.state.isRegister ? 'user/e_register' : 'user/e_login';
        this.props.dispatch({ type: types, payload: values });
        // 关闭modal
        this.props.onVisibleChange();
      }
    });
  }
  // 用户注册
  register = (e) => {
    e.preventDefault();
    this.setState({
      isRegister: !this.state.isRegister,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="用户信息"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        okText={this.state.isRegister ? '注册' : '登录'}
        cancelText="取消"
        onCancel={this.props.onVisibleChange}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名 !' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: '请输入你的密码 !' },
              {
                validator: this.checkConfirm,
              }],
            })(<Input prefix={<Icon type="lock" />} type="password" placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {this.state.isRegister ? getFieldDecorator('rpwd', {
              rules: [{
                required: true, message: '请再次输入你的密码 !',
              }, {
                validator: this.checkPassword,
              }],
            })(<Input prefix={<Icon type="lock" />} type="password" placeholder="确认密码" onBlur={this.handleConfirmBlur} />) : null}
          </FormItem>
          <Button onClick={this.register}>
            {this.state.isRegister ? '已有账户' : '还没有账户'}
          </Button>
        </Form>
      </Modal>
    );
  }
}

const Person = Form.create()(NormalLoginForm);

export default Person;
