import request from '@/utils/request'

export const getPayData = () => {
  return request.get('/address/list')
}

export const getPayGoodsData = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const toPayOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj
  })
}
