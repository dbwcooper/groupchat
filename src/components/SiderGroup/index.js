import React from 'react';
import { Layout, Button, Spin } from 'antd';
import RoomSelect from './RoomSelect';
import RoomMenu from './RoomMenu';
import RoomAdd from './RoomAdd';
import styles from './style.less';

const { Sider } = Layout;
class SiderGroup extends React.Component {
    state = {
      collapsed: false,
      visible: false,
    };
    onCollapse = (collapsed) => {
      this.setState({ collapsed });
    }
    onVisible = (visible) => {
      this.setState({ visible })
    }
    render() {
      const { dispatch } = this.props;
      const {
        searchRoomList,
        roomSearchLoading,
        menuLoading,
        roomLink,
        roomList
      } = this.props.room;
      const { collapsed, visible } = this.state;
      return (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo}>
            <RoomSelect
              searchRoomList={searchRoomList}
              roomSearchLoading={roomSearchLoading}
              dispatch={dispatch}
            />
            <Button
              icon="plus"
              onClick={this.onVisible.bind(this, true)}
            >
              创建聊天室
            </Button>
          </div>
          <Spin spinning={menuLoading} style={{ height: 400 }}>
            <RoomAdd
              visible={visible}
              dispatch={dispatch}
              onVisible={this.onVisible.bind(this, false)}
            />
            <RoomMenu
              roomLink={roomLink}
              roomList={roomList}
              dispatch={dispatch}
            />
          </Spin>
        </Sider>
      )
    }
}

export default SiderGroup;
