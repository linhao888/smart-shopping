const INFO_KEY = 'hm-shopping-info'
const HISTORY_KEY = 'hm-shopping-history-list'

// 获取用户凭证
export const getInfo = () => {
  const nullInfo = { token: '', userId: '' }
  const localInfo = localStorage.getItem(INFO_KEY)
  // 本地有凭证时获取本地凭证, 否则为空
  return localInfo ? JSON.parse(localInfo) : nullInfo
}

// 设置用户凭证
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除用户凭证
export const remove = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  if (!localStorage.getItem(HISTORY_KEY)) {
    return []
  }
  return JSON.parse(localStorage.getItem(HISTORY_KEY))
}

// 设置搜索历史
export const setHistoryList = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}
