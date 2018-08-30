const index = require('./index')

const preUrlPath = 'https://dev.weupay.com/pay'

const downLoad = 'http://test.weupay.com:8080/'

export const loginApp = params => { return index.wxHttp({ url: `${preUrlPath}/api/app/200/1/loginApp`, data: params, method: 'POST' }).then(res => res.data) }

export const queryStoreByName = params => { return index.wxHttp({ url: `${preUrlPath}/api/app/200/1/queryStoreByName`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrder = params => { return index.wxHttp({ url: `${preUrlPath}/api/app/200/1/queryOrder`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderHistory = params => { return index.wxHttp({ url: `${downLoad}/download/api/app/200/1/queryOrderHistory`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderRealtimeDetail = params => { return index.wxHttp({ url: `${preUrlPath}/api/app/200/1/queryOrderDetail`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderDetail = params => { return index.wxHttp({ url: `${downLoad}/download/api/app/200/1/queryOrderDetail`, data: params, method: 'POST' }).then(res => res.data) }