import React from 'react';
// import ReactMarkdown from 'react-markdown';
import { formatTime } from '../../utils/util';
import MyAvatar from '../Avatar';
import styles from './style.less';

class Converse extends React.Component {
  render() {
    const {
      md,
      userName,
      moment,
      avatar,
      content
    } = this.props;
    return (
      <div className={styles['flex-r'] + ' ' + styles['converse-item']}>
        <MyAvatar avatar={avatar} />
        <div className={styles['chat-content']}>
          <div className={styles['chat-title']}>
            <span>{userName}</span>
            <span>{formatTime(moment)}</span>
          </div>
          {
            md
            ? <pre><code>{content}</code></pre>
            : (<p> {content} </p>)
          }
        </div>
      </div>
    );
  }
}
export default Converse;
