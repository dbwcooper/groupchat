import { notification } from 'antd';

const colors = ['#f56a00', '#eee', '#f5f5f5'];
const Notification = (type, description) => {
  notification[type]({
    message: type,
    description,
  });
};

const formatTime = (moment) => {
  if (moment > 0) {
    let date = new Date(moment * 1);
    return date.getFullYear() + '/' + (date.getMonth() + 1 + '/') + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
  }
  return moment;
}

// cookie 的保存方式 key=value; key1=value; key2=value;
const getCookieByName = (name = 'token') => {
  let startIndex = document.cookie.indexOf(' ' + name + '=') + (name.length + 2);
  let endIndex = (document.cookie).substr(startIndex).indexOf('; ');
  let cookie = (document.cookie).substr(startIndex, endIndex);
  return cookie;
}

const setCookie = (name = 'token', value, days = 7) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toGMTString();
}

const delCookieByName = (name = 'token') => {
  setCookie(name, '', -1);
}


const randomAvatar = (userName) => {
  let index = Math.floor(Math.random() * colors.length);
  return {
    alif: userName.substr(0, 1),
    color: colors[index]
  }
}
export {
  formatTime,
  Notification,
  setCookie,
  getCookieByName,
  delCookieByName,
  randomAvatar
}
