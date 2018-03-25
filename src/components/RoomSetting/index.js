import React from 'react';
import { Card, Icon, Collapse } from 'antd';
import ModalUsers from './ModalUser';
import MyAvatar from '../Avatar';
import styles from './style.less';

const { Panel } = Collapse;

class RoomSetting extends React.Component {
  state = {
    visible: false,
  }

  onUserAdd = () => {
    this.setState({ visible: true })
  }
  closeModal = () => {
    this.setState({ visible: false })
  }
  render() {
    return (
      <div style={{ flex: 1 }}>
        <Collapse bordered={false} defaultActiveKey={['1']} style={{ flex: 1 }}>
          <Panel header="群内公告" key="1" style={{ border: 0 }}>
            {this.props.room.annoucement}
          </Panel>
        </Collapse>
        <ModalUsers {...this.props} visible={this.state.visible} closeModal={this.closeModal} />
        <Card title="在线人数" className={styles.avatar}>
          {this.props.room.onlineList.map(item => (<MyAvatar avatar={item} key={item.userName} />))}
          <Icon type="plus-circle-o" onClick={this.onUserAdd} />
        </Card>
      </div>
    );
  }
}
export default RoomSetting;
