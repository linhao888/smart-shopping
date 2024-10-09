import request from '@/utils/request.js'

export const getProductDetail = (goodsId) => {
  return request.get('/goods/detail', { params: { goodsId } })
}

export const getDiscussData = (goodsId, limit) => {
  return request.get('/comment/listRows', { params: { goodsId, limit } })
}
