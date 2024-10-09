<template>
  <div class="home-body">
    <!-- navbar -->
    <header>
      <div class="header">智慧商城</div>
    </header>

    <!-- 搜索 -->
    <div @click="$router.push('/search')">
      <SearchVue></SearchVue>
    </div>

    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in swipeList" :key="item.imgUrl">
          <img :src="item.imgUrl" alt="" class="swipe-img">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 分类导航 -->
    <div class="nav">
      <ul class="nav-content">
        <li class="nav-item" @click="$router.push('/category')"
          v-for="item in navList" :key="item.imgUrl"
        ><div><img :src="item.imgUrl" alt=""></div><span>{{ item.text }}</span></li>
      </ul>
    </div>

    <!-- 商品推荐 -->
    <div class="product-title"><span>— — 猜你喜欢 — —</span></div>
    <Product v-for="item in productList" :key="item.goods_id" :items="item">
    </Product>
    <div class="bottom-brank">
      <span class="bottom-font">已经到底了哦~~</span>
    </div>
  </div>
</template>

<script>
import { getHomeData } from '@/api/home.js'
import Product from '@/components/Product.vue'
import SearchVue from '@/components/Search.vue'

export default {
  name: 'HomeIndex',
  data () {
    return {
      swipeList: [],
      navList: [],
      productList: []
    }
  },
  async created () {
    const { data: { pageData: { items } } } = await getHomeData()
    this.swipeList = items[1].data
    this.navList = items[3].data
    this.productList = items[6].data
    console.log(items)
  },
  components: {
    Product,
    SearchVue
  }
}
</script>

<style lang="less" scoped>

.home-body {
  .header {
    height: 46px;
    background-color: rgb(158, 204, 222);
    text-align: center;
    line-height: 46px;
  }
  .swipe {
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
      .swipe-img {
        width: 100%;
        object-fit: cover;
        display: block;
      }
    }
  }
  .nav {
    .nav-content {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .nav-item {
        background-color: #fff;
        font-size: 15px;
        width: 18%;
        margin: 5px 0;
        border-radius: 10px;
        img {
          width: 90%;
        }
      }
    }
  }
  .product-title {
    width: 100%;
    text-align: center;
    margin: 10px 0;
  }
  .bottom-brank {
    width: 100%;
    height: 100px;
    text-align: center;
    .bottom-font {
      color: gray;
    }
  }
}
</style>>
