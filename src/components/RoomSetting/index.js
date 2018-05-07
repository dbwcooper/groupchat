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
    const { onlineList, annoucement, isUserExist } = this.props.room;
    const { visible } = this.state;
    console.log('onlineList', onlineList)
    return (
      <div style={{ flex: 1 }}>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          style={{ flex: 1 }}
        >
          <Panel
            header="群内公告"
            key="1"
            style={{ border: 0 }}
          >
            {annoucement}
          </Panel>
        </Collapse>
        <ModalUsers
          {...this.props}
          visible={visible}
          closeModal={this.closeModal}
        />
        <Card
          title={`在线人数(${onlineList.length})`}
          className={styles.avatar}
        >
          {onlineList.map(item =>
            (<MyAvatar
              avatar={item.avatar}
              userName={item.userName}
              key={item.userName}
            />))}
          { isUserExist && <Icon
            type="plus-circle-o"
            onClick={this.onUserAdd}
          />
          }
        </Card>
      </div>
    );
  }
}
export default RoomSetting;
