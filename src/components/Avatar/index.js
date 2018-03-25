import React from 'react';
import { Avatar, Tooltip } from 'antd';
import styles from './style.less'

/**
 * 封装一个头像组件，传入参数是{ color: '', alif: '', userName:''} 颜色和首字母 /或者 { userName: '', pic: ''}
 * @class myAvatar
 * @extends {React.Component}
 */
class myAvatar extends React.Component {
  static defaultProps = {
    avatar: {
      userName: '',
      pic: '',
    }
  }
  getAvatar = (avatar) => {
    if (avatar.alif) {
      // 传入为首字母和颜色
      return (
        <Avatar shape="square" size="large" className={styles['avatar-color']} style={{ backgroundColor: avatar.color }}>
          {avatar.alif}
        </Avatar>
      )
    } else {
      return (<Avatar size="large" shape="square" className={styles['avatar-pic']} src={avatar.pic} />)
    }
  }
  render() {
    console.log(this.props);
    return (
      <Tooltip placement="topLeft" title={this.props.avatar.userName}>
        {this.getAvatar(this.props.avatar)}
      </Tooltip>
    )
  }
}

export default myAvatar;
