import Validate from 'async-validator'

function isEmptyValue(value) {
  if (value === undefined || value === null) {
    return true;
  }
  if (Array.isArray(value) && !value.length) {
    return true;
  }
  if (typeof value === 'string' && !value) {
    return true;
  }
  return false;
}

const checkData = (rules = {}, data = {}, showTips = true) => {
  return new Promise((resolve, reject) => {
    const Schema = new Validate(rules);
    Schema.validate(data, (errors) => {
      if (errors) {
        reject(errors);
        if (showTips) {
          wx.showToast({
            title: errors[0].message,
            icon: 'success',
            duration: 2000
          })
        }
      } else {
        resolve()
      }
    });
  })
};

const pattern = {
  //校验手机号
  checkMobile: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
  //短信验证码
  //checkCode: /^[0-9]{4}$/,
  //4位图形验证
  checkVerCode: /^[a-zA-Z0-9]{4}$/,
  //身份证号
  checkIdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  //校验用户名
  checkUserName: /^[a-zA-Z0-9]+$/,
  //校验密码
  checkPassword: /^[a-zA-Z0-9#]{6,20}$/,
  //校验金额
  checkMoney: /^(0|[1-9]\d*)$/,
  //校验是有为汉字
  checkChineseCharacters: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
  //校验银行卡
  checkBankCard: /^\d{16,19}$/
};

//登录页面验证规则配置
const loginRules = {
  username: [
    {required: true, message: '账号不能为空'},
    {min: 5, max: 20, message: '账号长度为5~20位，请重新输入'},
    {type: 'pattern', pattern: pattern.checkUserName, message: '账号只能为字母或者数字'}
  ],
  password: [
    {required: true, message: '密码不能为空'},
    {min: 3, max: 20, message: '密码长度3~20位，请重新输入'},
    // {type: 'pattern', pattern: pattern.checkPassword, message: '密码只能为字母、数字、特殊字符'}
  ],
  code_token_value: [
    {required: true, message: '验证码不能为空'},
    {type: 'pattern', pattern: pattern.checkVerCode, message: '验证码长为4位，请重新输入'}
  ]
};


export function checkLogin(data) {
  return checkData(loginRules, data)
}



