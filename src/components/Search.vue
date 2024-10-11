<template>
  <div class="search">
    <span class="iconfont">&#xe749;</span>
    <input
      type="text"
      placeholder="请在此输入关键字"
      v-model="searchValue"
      @change="changeValue"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchView',
  data () {
    return {
      searchValue: ''
    }
  },
  props: ['searchName'],
  methods: {
    changeValue () {
      this.$emit('getSearch', this.searchValue)
      this.searchValue = ''
    }
  },
  created () {
    if (this.searchName) {
      this.searchValue = this.searchName
    }
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: "iconfont";
  src: url("@/lib/fonts/iconfont.ttf?t=1727402773992") format("truetype");
}
.search {
    margin: 1vh 0;
    position: relative;
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 3.5vh;
      font-style: normal;
      position: absolute;
      left: 3vh;
      top: 2vh;
      color: #5558;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    input {
      width: 100%;
      height: 8vh;
      border-radius: 8vh;
      border: none;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
      padding: 0 8vh;
      font-size: 3vh;
    }
  }
</style>
