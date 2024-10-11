<template>
  <div class="header-nav-components" id="header-nav-components">

    <div class="left" @click="$router.go(-1)">
      <van-icon name="arrow-left" size="4vh" color="gray" />
      <span>返回</span>
    </div>
    <span class="mid-title">搜索</span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

.header-nav-components {
  display: flex;
  height: 7vh;

  line-height: 7vh;
  padding-left: 0.5vh;
  .left {
    cursor: pointer;
  }
  span {
    font-size: 3vh;
    color: #333;
  }
  .mid-title {
    margin-left: 14vh;
  }
}
</style>
