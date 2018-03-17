import React from 'react';
import { Card, Button, Avatar, Collapse, Tooltip } from 'antd';
import AddUser from './AddUser';
import styles from './style.less';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
class RoomSetting extends React.Component {

  onUserAdd = () => {

  }
  render() {
    return (
      <div style={{ flex:1 }}>
        <Collapse bordered={false} defaultActiveKey={['1']} style={{ flex: 1 }}>
          <Panel header="群内公告" key="1" style={{border: 0}}>
            {text}
          </Panel>
        </Collapse>
        <AddUser />
        <Card title="在线人数" extra={<Button onClick={this.onUserAdd}>ADD</Button>}>
          <Tooltip placement="topLeft" title="Prompt Text">
            <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }}/>
          </Tooltip>
          
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }}/>
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }}/>
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{ marginBottom: '10px' }}/>
        </Card>
      </div>
    );
  }
}
export default RoomSetting;
