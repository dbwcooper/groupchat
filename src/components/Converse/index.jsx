import React from 'react';
import { Avatar } from 'antd';
import styles from './style.less';
class Converse extends React.Component {
  render() {
    return (
      <div className={styles['flex-r']}>
        <Avatar shape="square" size="large" icon="user" />
        <div className={styles['chat-content']}>
          <div className={styles['chat-title']}>
            <span>George James @ 回复的人</span>
            <span>Feb 27 18:48</span>
          </div>
          <p className={styles['chat-words']}>
            Antd is not compatible with Less 3.x, and will cause an error "Cannot read property 'length' of undefined
            " in antd\lib\style\color\bezierEasing.less, Is this a bug from Less or Antd?</p>
        </div>
      </div>
    );
  }
}
export default Converse;
