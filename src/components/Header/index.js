import { Icon, Avatar, Menu, Dropdown} from 'antd';
import React from 'react';
import styles from './style.less';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">个人资料</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">注销</a>
        </Menu.Item>
    </Menu>
);
class PageHeader extends React.Component {
    render() {
        return (
          <div className={styles['page-header']}>
            <div className={styles['room-info']}>
              <Icon type="ant-design" />
              <span className={styles['title']}>ant-design/ant-design</span>
              <span>一个设计语言&前端框架</span>
            </div>
            <div className={styles['page-setting']}>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Avatar shape="square" size="large" icon="user" />
                </Dropdown>
            </div>
          </div>
        );
    }
}

export default PageHeader;