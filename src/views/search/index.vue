<template>
  <div class="search-box">
    <!-- nav区域 -->
    <HeadNavVue></HeadNavVue>
    <!-- 搜索框 -->
    <SearchVue @getSearch="getValue"></SearchVue>

    <!-- 搜索历史 -->
    <div class="search-history">
      <span class="left">搜索历史</span>
      <span class="right" @click="deleteHistory"><van-icon name="delete-o" size="20px"/></span>
    </div>
    <div class="search-list">
      <ul>
        <li @click="changeInput" v-for="(item, index) in searchList" :key="index"> {{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchVue from '@/components/Search.vue'
import { getHistoryList, setHistoryList } from '@/utils/storage'
import HeadNavVue from '@/components/HeadNav.vue'
export default {
  name: 'SearchIndex',
  components: {
    SearchVue,
    HeadNavVue
  },
  data () {
    return {
      searchContent: '',
      searchList: [
        '小米手机',
        '华为手机',
        'oppo手机',
        '苹果手机',
        'vivo手机',
        '三星手机'
      ]
    }
  },
  methods: {
    // 点击搜索历史中的项
    changeInput (e) {
      this.searchContent = e.target.innerHTML.trim()
      this.setHistoryMethod()
      this.$router.push(`/searchlist?search=${this.searchContent}`)
    },

    // 从组件中获取输入框内容, 并保存至搜索历史
    getValue (value) {
      if (value.trim() === '') {
        this.$toast('输入内容不能为空')
        return
      }
      this.searchContent = value.trim()
      this.setHistoryMethod()
      this.$router.push(`/searchlist?search=${this.searchContent}`)
    },

    // 删除搜索历史
    deleteHistory () {
      this.searchList = []
    },

    // 设置最新的搜索历史，并将该项移至最前
    setHistoryMethod () {
      this.searchList = this.searchList.filter(item => this.searchContent !== item)
      this.searchList.unshift(this.searchContent)
      setHistoryList(this.searchList) // 保存至本地
    }
  },
  created () {
    this.searchList = getHistoryList() // 获取本地搜索记录数据
  }
}
</script>

<style lang="less" scoped>
.search-box {
  .search-history {
    margin: 3vh 0 1vh 0;
    display: flex;
    justify-content: space-between;
    .left {
      margin-left: 2vh;
    }
    .right {
      margin-right: 2vh;
      color: gray;
    }
  }
  .search-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        cursor: pointer;
        padding: 1vh 1.5vh;
        margin: 2vh 0 0 1.5vh;
        background-color: #ddd;
        border-radius: 2vh;
      }
    }
  }
}
</style>
