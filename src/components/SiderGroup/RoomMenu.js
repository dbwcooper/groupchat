import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import styles from './style.less';

const MenuItem = Menu.Item;
export default class RoomMenu extends Component {
  onSelect = (item) => {
    this.props.dispatch({ type: 'room/e_getConverseByRoomId', payload: item.key })
  }
  getMenuList = (roomList) => {
    return roomList.map(item => (<MenuItem key={item.roomId}> <Icon type="github" /> <span>{item.roomName}</span> </MenuItem>))
  }
  render() {
    return (
      <Menu
        className={styles['room-menu']}
        theme="dark"
        defaultSelectedKeys={[this.props.room.defaultRoomId]}
        mode="inline"
        onSelect={this.onSelect}
      >
        {this.getMenuList(this.props.room.roomList)}
      </Menu>
    )
  }
}
