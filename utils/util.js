const formatTime = date => {
  const newdate = new Date(date)
  const year = newdate.getFullYear()
  const month = newdate.getMonth() + 1
  const day = newdate.getDate()
  const hour = newdate.getHours()
  const minute = newdate.getMinutes()
  const second = newdate.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateFormat = function (source, ignore_minute, type) {
  var myDate;
  var separate = type || '-';
  var minute = '';
  if (source === void(0)) {
    source = new Date();
  }
  if (source) {
    if (source.split) {
      source = source.replace(/\-/g, '/');
    } else if (isNaN(parseInt(source))) {
      source = source.toString().replace(/\-/g, '/');
    } else {
      source = new Date(source);
    }

    if (new Date(source) && (new Date(source)).getDate) {
      myDate = new Date(source);
      if (!ignore_minute) {
        minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
      }
      return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
    } else {
      return source.slice(0, 16);
    }
  } else {
    return source
  }
}

const formatPayment = function (data) {
  return data === 'WX' ? '微信' : data === 'ALI' ? '支付宝' : data === 'DEBIT' ? '借记卡' : data === 'CREDIT' ? '贷记卡' : data === 'BEST' ? '翼支付' : data === 'UNIONPAY' ? '银联二维码' : data === 'BANK' ? '银行卡' : '其它';
}

module.exports = {
  dateFormat: dateFormat,
  formatPayment: formatPayment,
  formatTime: formatTime
}
