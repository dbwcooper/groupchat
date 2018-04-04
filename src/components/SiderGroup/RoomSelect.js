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
    fetchRoom = (value) => {
      this.props.dispatch({ type: 'room/e_getSearchRoomList', payload: value })
    }
    handleChange = (label) => {
      console.log('value', label);
      this.setState({ value: [label] });
    }
    render() {
      const { searchRoomList, roomSearchLoading } = this.props.room;
      return (
        <Select
          mode="multiple"
          value={this.state.value}
          placeholder="Select Room"
          notFoundContent={roomSearchLoading ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchRoom}
          onChange={this.handleChange}
          size="large"
          className={styles['search-room']}
        >
          {searchRoomList.map(d => <Select.Option key={d.roomId}>{d.roomName}</Select.Option>)}
        </Select>
      );
    }
}

export default RoomSelect;
