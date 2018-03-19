import React from 'react';
import { Card, Button, Avatar, Collapse, Tooltip } from 'antd';
import ModalUsers from './addUser';

const { Panel } = Collapse;

class RoomSetting extends React.Component {
  state = {
    visible: false,
  }
  onUserAdd = () => {
    this.setState({ visible: true }, () => {
      console.log(this.state.visible);
    })
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
        <ModalUsers visible={this.state.visible} closeModal={this.closeModal} />
        <Card title="在线人数" extra={<Button onClick={this.onUserAdd}>ADD</Button>}>
          <Tooltip placement="topLeft" title="Prompt Text">
            <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }} />
          </Tooltip>
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }} />
        </Card>
      </div>
    );
  }
}
export default RoomSetting;
