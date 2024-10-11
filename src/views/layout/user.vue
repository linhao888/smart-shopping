<template>
  <div class="user">
    <div class="head-page" v-if="isLogin">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o" />
          普通会员
        </div>
      </div>
    </div>
    <div v-else class="head-page" @click="$router.push('/login')">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">未登录</div>
        <div class="words">点击登录账号</div>
      </div>
    </div>
    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>{{ detail.pay_money || 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>积分</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div
        class="order-navbar-item"
        @click="$router.push('/myorder?dataType=all')"
      >
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/myorder?dataType=payment')"
      >
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/myorder?dataType=delivery')"
      >
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div
        class="order-navbar-item"
        @click="$router.push('/myorder?dataType=received')"
      >
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>
    <div class="service">
      <div class="title">我的服务</div>
      <div class="content">
        <div class="content-item">
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>
    <div class="logout-btn" @click="logout">
      <button>退出登录</button>
    </div>
  </div>
</template>
<script>
import { getUserInfoDetail } from '@/api/user.js'
export default {
  name: 'UserPage',
  data () {
    return {
      detail: {}
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    async getUserInfoDetail () {
      const {
        data: { userInfo }
      } = await getUserInfoDetail()
      this.detail = userInfo
      console.log(this.detail)
    },
    logout () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '你确认要退出么？'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .catch(() => {
        })
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 10vh;
}
.head-page {
  height: 15vh;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  background-size: cover;
  display: flex;
  align-items: center;
  .head-img {
    width: 8vh;
    height: 8vh;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 2vh;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.info {
  .mobile {
    margin-bottom: 1vh;
    color: #c59a46;
    font-size: 3vh;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 0.5vh 0.5vh;
    border-radius: 1vh;
    color: #e0d3b6;
    font-size: 2vh;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}
.my-asset {
  display: flex;
  padding: 3vh 0;
  font-size: 2vh;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-around;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 1vh;
        color: #ff0000;
        font-size: 3vh;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 5vh;
        margin-bottom: 1vh;
      }
    }
  }
}
.order-navbar {
  display: flex;
  padding: 2vh 0;
  margin: 1.5vh;
  font-size: 2vh;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 4vh;
      margin-bottom: 1vh;
    }
  }
}
.service {
  font-size: 2vh;
  background-color: #fff;
  border-radius: 1vh;
  margin: 1.5vh;
  .title {
    height: 8vh;
    line-height: 8vh;
    padding: 0 2vh;
    font-size: 3vh;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 2vh;
    background-color: #fff;
    border-radius: 1vh;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 3vh;
      .van-icon {
        font-size: 4vh;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}
.logout-btn {
  button {
    width: 40vh;
    margin: 2vh auto;
    display: block;
    font-size: 2vh;
    color: #616161;
    border-radius: 2vh;
    border: 1px solid #dcdcdc;
    padding: 1vh 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
