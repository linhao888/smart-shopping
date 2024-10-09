import { getCartList, changeCartCount, clearCartGoods } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, list) {
      state.cartList = list
    },
    changeCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isCheck = !goods.isCheck
    },
    setAllCheck (state, isAllCheck) {
      state.cartList.forEach(item => {
        item.isCheck = !isAllCheck
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartList (context) {
      const res = await getCartList()
      res.data.list.forEach(item => {
        item.isCheck = true
      })
      context.commit('setCartList', res.data.list)
    },
    async changeCartCount (context, { goodsId, goodsNum, goodsSkuId }) {
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCartCount(goodsId, goodsNum, goodsSkuId)
    },
    async clearCartGoods (context) {
      const selList = context.getters.getSelList
      const cartIds = selList.map(item => item.id)
      await clearCartGoods(cartIds)
      context.dispatch('getCartList')

      setTimeout(() => {
        Toast('删除成功')
      }, 0)
    }
  },
  getters: {
    // 求购物车总商品数
    getTotal (state) {
      return state.cartList.reduce((pre, item) => pre + item.goods_num, 0)
    },

    // 获得选中的商品
    getSelList (state) {
      return state.cartList.filter(item => item.isCheck)
    },
    // 获得选中的商品数
    getSelTotal (state, getters) {
      return getters.getSelList.reduce((pre, item) => pre + item.goods_num, 0)
    },

    // 获得选中的总价
    getSelPrice (state, getters) {
      return getters.getSelList.reduce((pre, item) => {
        return pre + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },

    // 获取全选状态
    isAllCheck (state) {
      return state.cartList.every(item => item.isCheck)
    }

  }
}
