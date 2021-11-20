import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/pcuser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/pcuser/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/pcuser/logout',
    method: 'post'
  })
}
