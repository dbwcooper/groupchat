import { notification } from 'antd';

const Notification = (type, description) => {
  notification[type]({
    message: type,
    description,
  });
};

const FormatTime = (moment) => {
  if (moment > 0) {
    let date = new Date(moment * 1);
    return date.getFullYear() + '/' + (date.getMonth() + 1 + '/') + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes();
  }
  return moment;
}

export {
  FormatTime,
  Notification,
}
