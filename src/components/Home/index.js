import React from 'react';
import { Layout, Spin } from 'antd';
import Converse from '../Converse';
import InputArea from '../InputArea';
import RoomSetting from '../RoomSetting';
import PageHeader from '../Header';
import SiderGroup from '../SiderGroup';
import styles from './style.less';

const { Content } = Layout;

class Home extends React.Component {
  getConverseList = (converseList) => {
    return converseList.map(item => <Converse key={item.moment} {...item} />)
  }
  render() {
    const { converseLoading, converseList } = this.props.room;
    return (
      <Layout className={styles['main-layout']}>
        <SiderGroup {...this.props} />
        <Spin spinning={converseLoading}>
          <Layout>
            <PageHeader {...this.props} />
            <Content className={styles['right-box']}>
              <div className={styles['converse-box']}>
                <div className={styles.content}>
                  {this.getConverseList(converseList)}
                </div>
                <InputArea {...this.props} />
              </div>
              <RoomSetting {...this.props} />
            </Content>
          </Layout>
        </Spin>
      </Layout>
    );
  }
}
export default Home;
