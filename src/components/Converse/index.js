import React from 'react';
import { Avatar } from 'antd';
import ReactMarkdown from 'react-markdown';
import { FormatTime } from '../../utils/util';
import styles from './style.less';

class Converse extends React.Component {
  state = {
    name: this.props.avatar[0],
    color: this.props.avatar[1],
  }
  render() {
    return (
      <div className={styles['flex-r'] + ' ' + styles['converse-item']}>
        <Avatar shape="square" style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
          {this.state.name}
        </Avatar>
        <div className={styles['chat-content']}>
          <div className={styles['chat-title']}>
            <span>{this.props.userName}</span>
            <span>{FormatTime(this.props.moment)}</span>
          </div>
          {
            this.props.md
            ? <ReactMarkdown source={this.props.content} />
            : (<p> {this.props.content} </p>)
          }
        </div>
      </div>
    );
  }
}
export default Converse;
