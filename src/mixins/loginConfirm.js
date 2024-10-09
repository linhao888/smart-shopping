export default {
  data () {
    return {
      dodoti: 'mixins, hi'
    }
  },
  methods: {
    isToken (token) {
      if (!token) {
        this.$dialog
          .confirm({
            title: '登录提醒',
            message: '您还未登陆账号, 请前往登录',
            confirmButtonText: '前往登陆'
          })
          .then(() => {
            // on confirm
            this.$router.push({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      }
    }

  }
}
