import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import styles from './style.less';

class RoomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetchRoom = debounce(this.fetchRoom, 800);
  }
    state = {
      value: [],
    }
    onSelect = (key, option) => {
      if (key) {
        this.props.dispatch({ type: 'room/e_getRoomDetail', payload: { roomLink: key, title: option.props.children } });
      }
    }
    fetchRoom = (value) => {
      this.props.dispatch({ type: 'room/e_getSearchRoomList', payload: value })
    }
    handleChange = (key, option) => {
      this.setState({ value: [option.props.children] });
    }
    render() {
      const { searchRoomList, roomSearchLoading } = this.props.room;
      return (
        <Select
          mode="combobox"
          value={this.state.value}
          placeholder="Select Room"
          notFoundContent={roomSearchLoading ? <Spin size="small" /> : null}
          onSearch={this.fetchRoom}
          onChange={this.handleChange}
          onSelect={this.onSelect}
          size="large"
          className={styles['search-room']}
        >
          {searchRoomList.map(d =>
            <Select.Option key={d.roomLink}>{d.title}</Select.Option>)}
        </Select>
      );
    }
}

export default RoomSelect;
