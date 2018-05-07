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
    const { content } = this.state;
    const { dispatch } = this.props;
    if (!content) return;
    let value = {
      content: content,
      moment: new Date().getTime()
    }
    this.setState({ content: '' })
    dispatch({ type: 'room/e_createComment', payload: value })
  }
  onEnterM = (content) => {
    const { dispatch } = this.props;
    this.setState({ visible: false })
    dispatch({ type: 'room/e_createComment', payload: content })
  }
  onChangeHandle = (e) => {
    this.setState({ content: e.target.value })
  }
  onMarkDown = (flag) => {
    this.setState({ visible: flag })
  }
  render() {
    const { avatar, disable } = this.props;
    const { content, visible } = this.state;
    return (
      <div
        className={styles['flex-r'] + ' ' + styles['input-area']}
      >
        <div className={disable ? 'component-disable' : ''} />
        <MyAvatar
          avatar={avatar}
        />
        <TextArea
          value={content}
          rows={2}
          onChange={this.onChangeHandle}
        />
        <div className={`icon-settings ${styles['flex-c']}`}>
          <Icon
            type="arrow-up"
            style={{ color: '#1890ff' }}
            onClick={this.onEnter}
          />
          <Icon
            type="file-markdown"
            onClick={this.onMarkDown.bind(this, true)}
          />
        </div>
        <MarkDownModal
          visible={visible}
          onMarkDown={this.onMarkDown}
          onEnter={this.onEnterM}
        />
      </div>
    );
  }
}
export default Converse;
