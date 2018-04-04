import React from 'react';
import ReactMarkdown from 'react-markdown';
import { formatTime } from '../../utils/util';
import MyAvatar from '../Avatar';
import styles from './style.less';

class Converse extends React.Component {
  render() {
    return (
      <div className={styles['flex-r'] + ' ' + styles['converse-item']}>
        <MyAvatar avatar={this.props.avatar} />
        <div className={styles['chat-content']}>
          <div className={styles['chat-title']}>
            <span>{this.props.userName}</span>
            <span>{formatTime(this.props.moment)}</span>
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
