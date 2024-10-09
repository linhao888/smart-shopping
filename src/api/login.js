import request from '@/utils/request.js'

// 创建获取图形验证码的请求函数
export const getImgCodeApi = () => {
  return request.get('/captcha/image')
}

// 创建获取短信验证码的请求函数
export const getSmsCodeApi = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const loginApi = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
