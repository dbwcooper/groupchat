import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import styles from './style.less';

class RoomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetchRoom = debounce(this.fetchRoom, 800);
  }
  onSelect = (key) => {
    if (key) {
      this.props.dispatch({ type: 'room/e_getRoomDetail', payload: { roomLink: key } });
    }
  }
  fetchRoom = (value) => {
    this.props.dispatch({ type: 'room/e_getSearchRoomList', payload: value })
  }
  render() {
    const { searchRoomList, roomSearchLoading } = this.props.room;
    return (
      <Select
        mode="combobox"
        placeholder="Select Room"
        notFoundContent={roomSearchLoading ? <Spin size="small" /> : '无数据'}
        onSearch={this.fetchRoom}
        onSelect={this.onSelect}
        size="large"
        className={styles['search-room']}
      >
        {searchRoomList.map(d =>
          <Select.Option key={d.roomLink}>{d.roomLink}</Select.Option>)}
      </Select>
    );
  }
}

export default RoomSelect;
