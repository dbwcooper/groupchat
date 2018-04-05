import { notification } from 'antd';

const colors = ['#1C1C1C', '#000000', '#0000CD', '#006400', '#f56a00', '#00008B', '#8B0000', '#1C1C1C', '#551A8B', '#8B4500'];
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
  let cookie;
  if (endIndex <= 0) cookie = (document.cookie).substr(startIndex);
  else cookie = (document.cookie).substr(startIndex, endIndex);
  return cookie;
}

const setCookie = (name = 'token', value, days = 7) => {
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toGMTString() + ';path=/';
}

const delCookieByName = (name = 'token') => {
  setCookie(name, '', -1);
}


const randomAvatar = (userName) => {
  let index = Math.floor(Math.random() * colors.length);
  return {
    alif: (userName.substr(0, 1)).toUpperCase(),
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
