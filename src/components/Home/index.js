import React from 'react';
import { Layout } from 'antd';
import Converse from '../Converse';
import InputArea from '../InputArea';
import RoomSetting from '../RoomSetting';
import PageHeader from '../Header';
import SiderGroup from '../SiderGroup';
import styles from './style.less';

const { Content } = Layout;

class Home extends React.Component {
  getConverseList = () => {
    return this.props.room.converseList.map(item => <Converse key={item.moment} {...item} />)
  }
  render() {
    return (
      <Layout className={styles['main-layout']}>
        <SiderGroup />
        <Layout>
          <PageHeader />
          <Content className={styles['right-box']}>
            <div className={styles['converse-box']}>
              <div className={styles.content}>
                {this.getConverseList()}
              </div>
              <InputArea {...this.props} />
            </div>
            <RoomSetting {...this.props} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Home;
