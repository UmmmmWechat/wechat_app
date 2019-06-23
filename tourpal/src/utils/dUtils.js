function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return `${formatDateTime(date)} ${formatNumber(hour)}:${formatNumber(minute)}`
}

export function formatDateTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}/${formatNumber(month)}/${formatNumber(day)}`
}

export function formatDate (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

/**
 * 校验身份证
 * @param code
 * @returns {boolean}
 */
export function validIdcard (code) {
  if (code) {
    code = code.toString();
    const city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外 '
    };

    let tip = ''
    let pass = true

    // 验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = '身份证号格式错误'
      pass = false
    } else if (!city[code.substr(0, 2)]) {
      tip = '地址编码错误'
      pass = false
    } else {
      // 18位身份证需要验证最后一位校验位
      if (code.length === 18) {
        code = code.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = code[i]
          wi = factor[i]
          sum += ai * wi
        }
        if (parity[sum % 11] !== code[17]) {
          tip = '校验位错误'
          pass = false
        }
      }
    }

    if (!pass) {
      console.log('idcard invalid: ' + tip);
    }

    return pass;
  } else {
    console.log('idcard invalid: ' + code);
    return false;
  }
}

export function validTel (tel) {
  if (tel) {
    tel = tel.toString();
    return /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel) ||
      /^(\d{7,8})(-(\d{3,}))?$/.test(tel) ||
      /^1([358]\d|4[57])\d{8}$/.test(tel)
    ;
  } else {
    return false;
  }
}
