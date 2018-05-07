import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import styles from './style.less';

const MenuItem = Menu.Item;
export default class RoomMenu extends Component {
  onSelect = (item) => {
    const { dispatch } = this.props;
    dispatch({ type: 'room/e_getRoomDetail', payload: item.key })
  }
  getMenuList = (roomList = []) => {
    return roomList.map(roomLink => (<MenuItem key={roomLink}> <Icon type="github" /> <span>{roomLink}</span> </MenuItem>))
  }
  render() {
    const { roomLink, roomList } = this.props;
    return (
      <Menu
        className={styles['room-menu']}
        theme="dark"
        selectedKeys={[roomLink]}
        mode="inline"
        onSelect={this.onSelect}
      >
        {this.getMenuList(roomList)}
      </Menu>
    )
  }
}
