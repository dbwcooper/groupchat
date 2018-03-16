import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Converse from "../Converse";
import InputArea from "../InputArea";
import RoomSetting from "../RoomSetting";
import styles from './style.less';

const { Header, Content, Footer, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout className={styles['main-layout']}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="user" />
              <span>group one</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>group two</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header />
          <Content className={styles['right-box']}>
            {/* 让对话div 的高度固定 700px(需要计算) overflow:auto; 内容超出出现滚动条. */}
            <div className={styles['converse-box']}>
              <div className={styles.content}>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
                <Converse/>
              </div>
              <InputArea />
            </div>
            <RoomSetting />
          </Content>
         
        </Layout>
      </Layout>
    );
  }
}
export default Home;
