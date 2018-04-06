import React from 'react';
import { Input, Icon } from 'antd';
import MarkDownModal from './markdown';
import MyAvatar from '../Avatar';
import styles from './style.less';

const { TextArea } = Input;

class Converse extends React.Component {
  state = {
    content: '',
    visible: false
  }
  onEnter = () => {
    if (!this.state.content) return;
    let value = {
      content: this.state.content,
      moment: new Date().getTime()
    }
    this.setState({ content: '' })
    this.props.dispatch({ type: 'room/e_createComment', payload: value })
  }
  onEnterM = (content) => {
    this.setState({ visible: false })
    this.props.dispatch({ type: 'room/e_createComment', payload: content })
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
        <MyAvatar avatar={this.props.user.avatar} />
        <TextArea value={this.state.content} rows={2} onChange={this.onChangeHandle} />
        <div className={`icon-settings ${styles['flex-c']}`}>
          <Icon type="arrow-up" style={{ color: '#1890ff' }} onClick={this.onEnter} />
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
