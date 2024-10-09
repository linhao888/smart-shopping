import request from '@/utils/request.js'

export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
