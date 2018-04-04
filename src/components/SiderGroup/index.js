import React from 'react';
import { Layout, Button } from 'antd';
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
      return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo}>
            <RoomSelect {...this.props} />
            <Button icon="plus" onClick={this.onVisible.bind(this, true)}>ADD A ROOM</Button>
          </div>
          <RoomAdd visible={this.state.visible} onVisible={this.onVisible.bind(this, false)} />
          <RoomMenu {...this.props} />
        </Sider>
      )
    }
}

export default SiderGroup;
