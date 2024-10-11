<template>
  <div>
    <!-- nav区域 -->
    <HeadNavVue></HeadNavVue>
    <!-- 内容区域 -->
    <div class="main">
      <!-- 标题 -->
      <div class="login-title">
        <h1>手机号登录</h1>
        <span>手机号未注册将自动注册</span>
      </div>
      <!-- 表单区域 -->
      <van-form >
        <van-field
          v-model="phoneNum"
          name="phone-num"
          placeholder="请输入手机号"
          style="height: 52px; line-height: 32px"
          :rules="[{ pattern: phonevali, message: '请填写手机号' }]"
        />
        <!-- 图形验证码 -->
        <van-field
          v-model="imgCode"
          name="image-code"
          center
          clearable
          style="height: 52px; line-height: 32px"
          placeholder="请输入短信验证码"
        >
          <template #right-icon>
            <img v-show="imgCodeUrl" :src="imgCodeUrl" @click="getImgCode()" alt="icon"
            style="width: 77px; height: 32px; vertical-align: middle" />
          </template>
        </van-field>
        <!-- 短信验证码 -->
        <van-field
          v-model="sms"
          name="sms"
          center
          clearable
          style="height: 52px; line-height: 32px"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary"
            :disabled="smsBtnState"
            @click="getSmsCode()"
            >{{ totalSecon === nowSecon ? '发送验证码' : `${nowSecon}秒后再次获取`}}</van-button>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" @click="login()"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>

import { getImgCodeApi, getSmsCodeApi, loginApi } from '@/api/login.js'
import HeadNavVue from '@/components/HeadNav.vue'

export default {
  name: 'LoginIndex',
  data () {
    return {
      // 手机号码
      phoneNum: '', // 手机号码
      phonevali: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, // 手机号校检

      // 图形验证码
      imgCode: '', // 图形验证码
      imgCodeUrl: '', // 图形验证码显示图片
      imgCodeKey: '', // 图形验证码key

      // 短信验证码
      sms: '', // 短信验证码
      totalSecon: 30, // 验证码总时长
      nowSecon: 30, // 验证码当前等待时长
      smsBtnState: false, // 获取验证码button禁用属性
      intervalId: null // 验证码计时器
    }
  },
  components: {
    HeadNavVue
  },
  created () {
    this.getImgCode()
  },
  destroyed () {
    clearInterval(this.intervalId)
  },
  methods: {
    // 校检输入内容
    validator () {
      if (!this.phonevali.test(this.phoneNum)) {
        this.$toast('请填写正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.imgCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取图形验证码函数
    async getImgCode () {
      const { data: { base64, key } } = await getImgCodeApi()
      this.imgCodeUrl = base64
      this.imgCodeKey = key
    },

    // 获取短信验证码
    async getSmsCode () {
      if (!this.validator()) return

      // 发起获取请求
      const res = await getSmsCodeApi(this.imgCode, this.imgCodeKey, this.phoneNum)
      this.$toast('后端暂未开通该服务，验证码统一为246810')
      console.log('getsms', res)

      // 短信获取成功
      this.nowSecon--
      this.smsBtnState = true
      this.intervalId = setInterval(() => {
        this.nowSecon--
        if (this.nowSecon <= 0) {
          clearInterval(this.intervalId)
          this.intervalId = null
          this.nowSecon = this.totalSecon
          this.smsBtnState = false
        }
      }, 1000)
    },

    // 登录请求
    async login () {
      if (!this.validator()) return
      if (!/^\d{6}$/.test(this.sms)) {
        this.$toast('验证码格式有误')
        return
      }
      try {
        const res = await loginApi(this.phoneNum, this.sms)
        this.$store.commit('user/setUserInfo', res.data)
        this.$toast.success('登录成功')
        const url = this.$route.query.backUrl || '/'
        this.$router.replace(url)
      } catch (error) {
        this.$dialog.alert({
          title: '提示',
          message: '手机号请使用13488888888'
        }).then(() => {
          // on close
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-title {
  margin: 4vh 0;
  padding-left: 1vh;
  h1 {
    font-family: "Roboto", sans-serif;
    font-weight: normal;
    font-size: 5vh;
  }
  span {
    color: #999;
  }
}
</style>>
