import React from 'react';
import { Layout, Spin } from 'antd';
import * as Scroll from 'react-scroll';
import Converse from '../Converse';
import InputArea from '../InputArea';
import RoomSetting from '../RoomSetting';
import PageHeader from '../Header';
import SiderGroup from '../SiderGroup';
import styles from './style.less';

const { Content } = Layout;
// const scroll = Scroll.animateScroll;
const { Element, scroller } = Scroll;
class Home extends React.Component {
  componentDidMount = () => {
    // Events.scrollEvent.register('begin', (to, element) => {
    //   console.log('begin', element);
    // });
    // Events.scrollEvent.register('end', (to, element) => {
    //   console.log('end', element);
    // });
    scroller.scrollTo('bottomEle', {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'containerEle',
      offset: 300000, // Scrolls to element + 50 pixels down the page
    })
  }

  componentWillReceiveProps = () => {
    scroller.scrollTo('bottomEle', {
      duration: 1000,
      delay: 100,
      smooth: true,
      containerId: 'containerEle',
      offset: 300000, // Scrolls to element + 50 pixels down the page
    })
  }

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
                <Element
                  id="containerEle"
                  className={styles.content}
                  ref={(e) => { this.chatContent = e; }}
                >
                  {this.getConverseList(converseList)}
                  <Element name="bottomEle" />
                </Element>
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
