import React from 'react';
import { Layout, Menu, Icon, Select  } from 'antd';
import styles from './style.less';

const { Sider } = Layout;
class SiderGroup extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render(){
        return (
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className={styles.logo}> CHAT Together</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>Nodejs 讨论群</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>蚂蚁金服UE讨论组</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SiderGroup;