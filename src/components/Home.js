import React from 'react';
import { Layout, Menu, Icon, Avatar } from 'antd';
import Converse from "./Converse";
import styles from './Home.css';
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
      <Layout style={{ minHeight: '100vh' }}>
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
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '16px', height: '100%',display: 'flex', flexDirection:'row'}}>
            {/* 让对话div 的高度固定 700px(需要计算) overflow:auto; 内容超出出现滚动条. */}
            <div style={{ padding: 24, background: '#fff',height: '100%',width:'80%'}}>
              <div style={{overflow: 'auto', minHeight: '350px', maxHeight: '700px'}}>
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
              <div style={{ background:'red', height: '80px', marginTop: '16px' }}></div>
            </div>
            <div style={{height:'100%',width:'20%', background: 'green',padding: 24}}>
              群内在线人数
            </div>
          </Content>
         
        </Layout>
      </Layout>
    );
  }
}
export default Home;
