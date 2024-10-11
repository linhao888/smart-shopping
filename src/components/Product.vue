<template>
  <div class="box product-box" id="product-box-id" v-if="items.goods_id" @click="$router.push(`/prodetail/${items.goods_id}`)">
    <div class="left">
      <img :src="items.goods_image" alt="">
    </div>
    <div class="right">
      <p class="describe text-ellipsis-2">
        {{ items.goods_name }}
      </p>
      <span class="sold">已售 {{ items.goods_sales }} 份</span>
      <div class="price">
        <span class="now-price">￥ {{ items.goods_price_min }}</span>
        <span class="pre-price">￥ {{ items.goods_price_max }}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  props: {
    items: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  width: 96%;
  height: 140px;
  margin: 6px auto;
  .left {
    height: 140px;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .right {
    padding: 16px 8px 0 8px;
    background-color: #fff;
    .sold {
      display: block;
      margin: 8px 0;
      color: gray;
      font-size: 14px;
    }
    .price {
      .now-price {
        font-size: 18px;
        color: red;
      }
      .pre-price {
        color: gray;
        margin-left: 10px;
        font-size: 15px;
        text-decoration-line: line-through;
      }
    }
  }
}
</style>
