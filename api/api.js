const index = require('./index')

const preUrlPath = 'https://dev.weupay.com'

// const downLoad = 'https://download.weupay.com'

export const loginApp = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/loginApp`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryStoreByName = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryStoreByName`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryOrder = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryOrder`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryOrderHistory = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryOrder`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryOrderRealtimeDetail = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryOrderDetail`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryOrderDetail = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryOrderDetail`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}


export const sendVerCodeT = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/sendVerCodeT`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const refund = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/refund`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const queryEmpByName = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/api/app/200/1/queryEmpByName`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const getMiniSession = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/getMiniSession`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const getLoginUserInfoList = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/mini/getLoginUserInfoList`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const bindRoleAndUser = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/mini/bindRoleAndUser`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const getLoginRole = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/mini/getLoginRole`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}

export const unbindRoleAndUser = params => {
  return index.wxHttp({
    url: `${preUrlPath}/admin/mini/unbindRoleAndUser`,
    data: params,
    method: 'POST'
  }).then(res => res.data)
}