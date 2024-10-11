<template>
  <div class="layout-box">
    <router-view></router-view>
    <!-- <van-tabbar route v-model="active" class="layout-index-box" style="font-size=10px">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="list-switch">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item> -->
    <!-- </van-tabbar> -->
    <ul class="layout-index-box">
      <li @click="changePage" :class="{ active: activePage === 'home' }" name="home"><van-icon size="3.5vh" name="home-o" /><span>首页</span></li>
      <li @click="changePage" :class="{ active: activePage === 'category' }" name="category"><van-icon size="3.5vh" name="list-switch" /><span>分类</span></li>
      <li @click="changePage" :class="{ active: activePage === 'cart' }" name="cart"><van-icon size="3.5vh" name="shopping-cart-o" /><span>购物车</span></li>
      <li @click="changePage" :class="{ active: activePage === 'user' }" name="user"><van-icon size="3.5vh" name="user-o" /><span>我的</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0,
      activePage: 'home'
    }
  },
  methods: {
    changePage (e) {
      const name = e.currentTarget.getAttribute('name')
      this.activePage = name
      this.$router.push(`/${name}`)
    }
  },
  created () {
    this.activePage = this.$route.path.replace('/', '')
  }
}
</script>

<style lang="less" scoped>
.layout-index-box {
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  height: 8vh;
  padding-top: 1vh;
  background-color: #fff;
  bottom: 0;
  li {
    cursor: pointer;
    width: 25%;
    text-align: center;
    span {
      display: block;
      font-size: 2vh;
    }
  }
}
.active {
  color: rgb(44, 160, 255);
}
</style>
