<template>
  <div class="category-box">
    <!-- navbar -->
    <header>
      <div class="header">分类</div>
    </header>

        <!-- 搜索 -->
    <div @click="$router.push('/search')">
      <SearchVue></SearchVue>
    </div>

    <!-- 分类主体内容 -->
    <div class="main" >
      <!-- 左侧导航栏 -->
      <ul class="left-nav">
        <li
          v-for="item in categoryList"
          :key="item.category_id"
          :id="item.sort"
          @click="activeNav"

        >{{ item.name }}</li>
      </ul>

      <!-- 右侧内容 -->
      <ul
        class="right-items"
        v-if="this.contentList"
      >
        <li
          v-for="item in contentList"
          :key="item.category_id"
          @click="toGoodsList(item.name)"
        >
          <img :src="item.image.external_url" alt="">
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import SearchVue from '@/components/Search.vue'
import { getCategoryData } from '@/api/category.js'

export default {
  name: 'CategoryIndex',
  data () {
    return {
      categoryList: [],
      contentId: 0
    }
  },
  components: {
    SearchVue
  },
  async created () {
    const res = await getCategoryData()

    this.categoryList = res.data.list
  },
  methods: {
    activeNav (e) {
      this.contentId = e.target.id - 1
    },
    toGoodsList (name) {
      this.$router.push(`/searchlist?search=${name}`)
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    contentList () {
      if (this.categoryList.length > 0) {
        return this.categoryList[this.contentId].children
      }
      // 检查 categoryList 是否为空以及当前 contentId 对应的元素是否存在
    }
  }
}
</script>

<style lang="less" scoped>
.category-box {
  .header {
    height: 46px;
    background-color: rgb(158, 204, 222);
    text-align: center;
    line-height: 46px;
  }
  .main {
    display: flex;
    .left-nav {
      height: 523px;
      width: 100px;
      overflow: auto;
      li {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #fff;
        border-bottom: 0.5px solid gray;
      }
    }
    .right-items {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      width: 275px;
      height: 523px;
      overflow: auto;
      li {
        width: 80px;
        height: 120px;
        margin: 5px;
        img {
          display: block;
          width: 80px;
          height: 80px;
        }
        span {
          display: block;
          width: 100%;
          text-align: center;
        }
      }

    }
  }
}
</style>
