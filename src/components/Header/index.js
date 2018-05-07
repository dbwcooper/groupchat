import { Icon, Menu, Avatar, Dropdown, Button } from 'antd';
import React from 'react';
import PersonInfo from './PersonInfo';
import styles from './style.less';

class PageHeader extends React.Component {
  state = {
    visible: false,
  }
  onVisibleChange = () => {
    this.setState({ visible: !this.state.visible })
  }
  getOverlay = (avatar) => {
    const menuLogout = (
      <Menu>
        <Menu.Item>
          <Button onClick={this.onVisibleChange}> 切换用户 </Button>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={this.logout}>注销</Button>
        </Menu.Item>
      </Menu>
    );
    const menuLogout2 = (
      <Menu>
        <Menu.Item>
          <Button onClick={this.onVisibleChange}>登陆</Button>
        </Menu.Item>
      </Menu>
    );
    if (avatar) return menuLogout
    return menuLogout2;
  }
  logout = () => {
    // 注销登陆
    this.props.dispatch({
      type: 'user/e_logout',
    })
  }
  render() {
    const { avatar } = this.props.user;
    return (
      <div className={styles['page-header']}>
        <div className={styles['room-info']}>
          <Icon type="ant-design" />
          <span className={styles['title']}>{this.props.room.roomLink}</span>
          <span>{this.props.room.title}</span>
        </div>
        <div className={styles['page-setting']}>
          <Dropdown overlay={this.getOverlay(avatar)} placement="bottomLeft">
            {
            avatar
            ? (<Avatar shape="square" size="large" className={styles['avatar-color']} style={{ backgroundColor: avatar.color }}>{avatar.alif}</Avatar>)
            : <Avatar shape="square" size="large" icon="user" />
          }

          </Dropdown>
        </div>
        <PersonInfo
          {...this.props}
          visible={this.state.visible}
          onVisibleChange={this.onVisibleChange}
        />
      </div>
    );
  }
}

export default PageHeader;
