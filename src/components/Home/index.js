import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import Converse from "../Converse";
import InputArea from "../InputArea";
import RoomSetting from "../RoomSetting";
import PageHeader from '../Header';
import SiderGroup from '../SiderGroup';
import styles from './style.less';

const { Content, Sider } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    console.log(this.props);
    return (
      <Layout className={styles['main-layout']}>
        <SiderGroup />
        <Layout>
          <PageHeader />
          <Content className={styles['right-box']}>
            <div className={styles['converse-box']}>
              <div className={styles.content}>
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
