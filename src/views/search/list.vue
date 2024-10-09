<template>
  <div class="searchlist-box">
      <!-- nav区域 -->
      <van-nav-bar
        title="搜索结果"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />

      <!-- 搜索框 -->
      <div class="nav-box">
        <div class="nav-input">
          <SearchVue :searchName='searchName'></SearchVue>
        </div>
        <div class="right-icon">
          <van-icon name="list-switching" size="35px" />
        </div>
      </div>

      <!-- 排序 -->
      <div class="rant">
        <ul>
          <li @click="goodsRant('all')">综合</li>
          <li @click="goodsRant('sales')">销量</li>
          <li @click="goodsRant('price')">价格</li>
        </ul>
      </div>

      <!-- 商品列表 -->
      <div v-if="istrue">
        <ProductVue
          v-for="item in goodsList"
          :key="item.goods_id"
          :items="item">
        </ProductVue>
      </div>

      <!-- 没有结果时显示 -->
      <div class="goodsNone" v-else>
        <span>--没有该商品的搜索结果--</span>
      </div>
  </div>
</template>

<script>
import SearchVue from '@/components/Search.vue'
import { getSearchData } from '@/api/search'
import ProductVue from '@/components/Product.vue'

export default {
  name: 'SearchList',
  data () {
    return {
      searchName: '',
      goodsList: [],
      istrue: true
    }
  },
  components: {
    SearchVue,
    ProductVue
  },
  methods: {
    async goodsRant (type) {
      const res = await getSearchData({ goodsName: this.searchName, sortType: type })
      const list = res.data.list.data
      this.goodsList = list
    }
  },
  async created () {
    this.searchName = this.$route.query.search
    const res = await getSearchData({ goodsName: this.searchName })
    const list = res.data.list.data
    if (list.length === 0) {
      this.istrue = false
      return
    }
    this.goodsList = list
  }
}
</script>

<style lang="less" scoped>
.searchlist-box {
  .nav-box {
    display: flex;
    .nav-input {
      width: 90%;
    }
    .right-icon {
      width: 10%;
      padding-top: 8px;
    }
  }
  .rant {
    ul {
      display: flex;
      justify-content: space-evenly;
      background-color: #fff;
      li {
        height: 40px;
        width: 33%;
        text-align: center;
        line-height: 40px;
      }
    }
  }
  .goodsNone {
    text-align: center;
    padding: 10px;
  }
}
</style>
