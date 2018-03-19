import React from 'react';
import { Input, Avatar, Icon } from 'antd';
import MarkDownModal from './markdown';
import styles from './style.less';

const { TextArea } = Input;

class Converse extends React.Component {
  state = {
    content: '',
    visible: false
  }
  onEnter = () => {
    let value = {
      content: this.state.content,
      moment: new Date().getTime()
    }
    this.props.dispatch({ type: 'room/addContent', payload: value })
  }
  onEnterM = (content) => {
    this.setState({ visible: false })
    this.props.dispatch({ type: 'room/addContent', payload: content })
  }
  onChangeHandle = (e) => {
    this.setState({ content: e.target.value })
  }
  onMarkDown = (flag) => {
    this.setState({ visible: flag })
  }
  render() {
    return (
      <div className={styles['flex-r'] + ' ' + styles['input-area']}>
        <Avatar icon="user" shape="square" size="large" />
        <TextArea rows={2} onChange={this.onChangeHandle} />
        <div className={`icon-settings ${styles['flex-c']}`}>
          <Icon type="arrow-up" onClick={this.onEnter} />
          <Icon type="file-markdown" onClick={this.onMarkDown.bind(this, true)} />
        </div>
        <MarkDownModal
          visible={this.state.visible}
          onMarkDown={this.onMarkDown}
          onEnter={this.onEnterM}
        />
      </div>
    );
  }
}
export default Converse;
