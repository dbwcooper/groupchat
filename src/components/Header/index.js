import { Icon, Avatar, Menu, Dropdown } from 'antd';
import React from 'react';
import styles from './style.less';

const menuLogout = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://example.com" onClick={this.showProfile}>个人资料</a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://example.com" onClick={this.logout} >注销</a>
    </Menu.Item>
  </Menu>
);
class PageHeader extends React.Component {
  showProfile = (e) => {
    // 个人信息
    e.preventDefault();
    e.stopPropagation();
    console.log('profile');
  }
  logout = () => {
    // 注销登陆
  }
  render() {
    return (
      <div className={styles['page-header']}>
        <div className={styles['room-info']}>
          <Icon type="ant-design" />
          <span className={styles['title']}>ant-design/ant-design</span>
          <span>一个设计语言&前端框架</span>
        </div>
        <div className={styles['page-setting']}>
          <Dropdown overlay={menuLogout} placement="bottomLeft">
            <Avatar shape="square" size="large" icon="user" />
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default PageHeader;
