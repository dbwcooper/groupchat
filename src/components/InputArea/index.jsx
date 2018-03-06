import React from 'react';
import { Input, Avatar, Icon } from 'antd';
import styles from './style.less';
const { TextArea } = Input;

class Converse extends React.Component {
  render() {
    return (
      <div className={styles['flex-r'] + ' ' + styles['input-area']}>
        <Avatar icon="user" shape="square" size="large" />
        <TextArea rows={2} />
        <div className={`icon-settings ${styles['flex-c']}`}>
          <Icon type="arrow-up" />
          <Icon type="file-markdown" />
        </div>
      </div>
    );
  }
}
export default Converse;
