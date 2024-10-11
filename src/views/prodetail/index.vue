<template>
  <div class="detail-box">
    <!-- nav区域 -->
    <HeadNavVue></HeadNavVue>

    <!-- 底部购物车栏 -->
    <div class="bottom-nav" id="prodetail-bottom-nav">
      <div @click="$router.push('/home')">
        <van-icon name="wap-home-o" size="30px" />
        <span class="title">首页</span>
      </div>
      <div @click="$router.push('/cart')">
        <!-- 购物车小图标 -->
        <span class="num" v-if="cartTotalGoods > 0"> {{ cartTotalGoods }}</span>
        <van-icon name="cart-o" size="30px" />
        <span class="title">购物车</span>
      </div>
      <span class="left" @click="pushCart()">加入购物车</span>
      <span class="right" @click="pushBuy()">立即购买</span>
    </div>

    <!-- 购物车与购买弹出框 -->
    <van-action-sheet v-model="show" :title="showTitle">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="goodsList.goods_image" alt="" />
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ goodsList.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ goodsList.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <CountBoxVue v-model="goodsCount"></CountBoxVue>
        </div>
        <div class="showbtn" v-if="goodsList.stock_total > 0">
          <div class="btn" v-if="showTitle === '加入购物车'" @click="addCart">
            加入购物车
          </div>
          <div class="btn now" v-else @click="buyNow">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>

    <!-- 轮播图 -->
    <div class="swipe" v-if="goodsList">
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item
          v-for="item in goodsList.goods_images"
          :key="item.file_id"
        >
          <img :src="item.external_url" alt="" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 价格与销量栏 -->
    <div class="price">
      <span class="now-price">￥{{ goodsList.goods_price_min }}</span>
      <span class="pre-price">￥{{ goodsList.goods_price_min }}</span>
      <span class="sales">已售 {{ goodsList.goods_sales }} 件</span>
    </div>

    <!-- 标题内容栏 -->
    <div class="content text-ellipsis-2">
      <p>
        {{ goodsList.goods_name }}
      </p>
    </div>

    <!-- 商品保障描述 -->
    <div class="promise">
      <span><van-icon name="passed" color="red" /></span>
      <span>七天无理由退货</span>
      <span><van-icon name="passed" color="red" /></span>
      <span>48小时发货</span>
      <span class="right"><van-icon name="arrow" /></span>
    </div>

    <!-- 评论 -->
    <div class="discuss" v-if="discussList">
      <!-- 顶部导航 -->
      <div class="discuss-nav">
        <span>商品评论({{ limit }}条)</span>
        <span>查看更多<van-icon name="arrow" /></span>
      </div>
      <!-- 内容区域 -->
      <ul class="discuss-content">
        <li class="items" v-for="item in discussList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="" />
            <span>{{ item.user.nick_name }}</span>
            <van-rate :value="item.score / 2" color="#ffd700" size="18px" />
          </div>
          <p class="text-ellipsis-2">
            {{ item.content }}
          </p>
          <div class="bottom">
            <span>{{ item.create_time }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="goodsList.content"></div>
    <!-- 底部留白 -->
    <div class="page-bottom"></div>
  </div>
</template>

<script>
import { getProductDetail, getDiscussData } from '@/api/product.js'
import defaultImg from '@/assets/default-avatar.png'
import CountBoxVue from '@/components/CountBox.vue'
import { getCartData } from '@/api/cart.js'
import loginConfirm from '@/mixins/loginConfirm.js'
import HeadNavVue from '@/components/HeadNav.vue'

export default {
  name: 'ProdetailIndex',
  mixins: [loginConfirm],
  data () {
    return {
      rate: 5,
      goodsList: {},
      limit: 5, // 评论显示的数量
      discussList: [],
      defaultImg,
      show: false, // 购物车弹出框是否弹出
      showTitle: '加入购物车',
      goodsCount: 1, // 默认购物车1个商品
      cartTotalGoods: 0
    }
  },
  components: {
    CountBoxVue,
    HeadNavVue
  },
  async created () {
    const goodsId = this.$route.params.id
    const res = await getProductDetail(goodsId)
    this.goodsList = res.data.detail
    const discussRes = await getDiscussData(goodsId, this.limit)
    this.discussList = discussRes.data.list
    console.log(this.goodsList)
  },
  methods: {
    // 点击加入购物车弹出框
    pushCart () {
      this.showTitle = '加入购物车'
      this.show = true
    },
    // 点击加入购买弹出框
    pushBuy () {
      this.showTitle = '立即购买'
      this.show = true
    },

    // 加入购物车
    async addCart () {
      const token = this.$store.state.user.userInfo.token
      if (!token) {
        this.isToken(token)
      } else {
        const goodsId = this.$route.params.id
        const goodsSku = this.goodsList.skuList[0].goods_sku_id
        const res = await getCartData(goodsId, this.goodsCount, goodsSku)
        this.cartTotalGoods = res.data.cartTotal > 99 ? '99+' : res.data.cartTotal
        this.$toast('加入购物车成功')
        this.show = false
      }
    },

    // 立即购买
    async buyNow () {
      const token = this.$store.state.user.userInfo.token
      if (!token) {
        this.isToken(token)
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsList.goods_id,
          goodsSkuId: 0,
          goodsNum: this.goodsCount
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.detail-box {
  .bottom-nav {
    position: fixed;
    display: flex;
    z-index: 999;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #fff;
    div {
      width: 15%;
      text-align: center;
      position: relative;
      .num {
        position: absolute;
        text-align: center;
        width: 25px;
        background-color: #f00;
        color: #eee;
        border-radius: 8px;
        right: 0;
        top: -5px;
        z-index: 999;
      }
      .title {
        display: block;
      }
    }
    > span {
      display: block;
      width: 35%;
      text-align: center;
      line-height: 50px;
      font-size: 18px;
      border-radius: 60px;
    }
    .left {
      background-color: orange;
    }
    .right {
      background-color: rgb(255, 55, 55);
    }
  }
  .product {
    .product-title {
      display: flex;
      .left {
        img {
          width: 90px;
          height: 90px;
        }
        margin: 10px;
      }
      .right {
        flex: 1;
        padding: 10px;
        .price {
          font-size: 14px;
          color: #fe560a;
          .nowprice {
            font-size: 24px;
            margin: 0 5px;
          }
        }
      }
    }
    .num-box {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
    }
    .btn,
    .btn-none {
      height: 40px;
      line-height: 40px;
      margin: 20px;
      border-radius: 20px;
      text-align: center;
      color: rgb(255, 255, 255);
      background-color: rgb(255, 148, 2);
    }
    .btn.now {
      background-color: #fe5630;
    }
    .btn-none {
      background-color: #cccccc;
    }
  }
  .swipe {
    ::v-deep .van-swipe__indicators {
      bottom: 3vh;
    }
    ::v-deep .van-swipe__indicator {
      height: 1.5vh;
      width: 1.5vh;
    }
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 3vh;
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
  .price {
    height: 5vh;
    line-height: 5vh;
    .now-price {
      color: red;
      font-size: 4vh;
      margin-right: 1vh;
      margin-left: 1vh;
    }
    .pre-price {
      text-decoration-line: line-through;
      font-size: 2.5vh;
    }
    .sales {
      float: right;
      color: gray;
      margin-right: 1vh;
      font-size: 2vh;
      height: 100%;
    }
  }
  .content {
    font-size: 2.5vh;
  }
  .promise {
    height: 6vh;
    line-height: 6vh;
    background-color: #eee;
    margin-top: 1vh;
    span {
      margin: 0 0.5vh;
    }
    .right {
      float: right;
    }
  }
  .discuss {
    .discuss-nav {
      display: flex;
      justify-content: space-between;
      padding: 1vh;
    }
    .items {
      padding: 1vh;
      .top {
        height: 4.5vh;
        img {
          height: 3vh;
        }
        span {
          font-size: 2.5vh;
          margin: 0 1vh;
        }
      }
      .bottom {
        margin-top: 1vh;
        span {
          color: gray;
        }
      }
    }
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }
  .page-bottom {
    height: 50px;
  }
}
</style>
