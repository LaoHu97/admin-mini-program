const index = require('./index')

const preUrlPath = 'https://weixin.weupay.com'

const downLoad = 'https://download.weupay.com'

export const websocketUrl = 'wss://weixin.weupay.com/websocket'

export const audioFileUrl = `${preUrlPath}/blank.mp3`

export const loginApp = params => { return index.wxHttp({ url: `${preUrlPath}/pay/api/app/200/1/loginApp`, data: params, method: 'POST' }).then(res => res.data) }

export const queryStoreByName = params => { return index.wxHttp({ url: `${preUrlPath}/pay/api/app/200/1/queryStoreByName`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrder = params => { return index.wxHttp({ url: `${preUrlPath}/pay/api/app/200/1/queryOrder`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderHistory = params => { return index.wxHttp({ url: `${downLoad}/download/api/app/200/1/queryOrderHistory`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderRealtimeDetail = params => { return index.wxHttp({ url: `${preUrlPath}/pay/api/app/200/1/queryOrderDetail`, data: params, method: 'POST' }).then(res => res.data) }

export const queryOrderDetail = params => { return index.wxHttp({ url: `${downLoad}/download/api/app/200/1/queryOrderDetail`, data: params, method: 'POST' }).then(res => res.data) }

export const sendVerCodeT = params => { return index.wxHttp({ url: `${preUrlPath}/admin/api/app/200/sendVerCodeT`, data: params, method: 'POST' }).then(res => res.data) }

export const refund = params => { return index.wxHttp({ url: `${preUrlPath}/admin/api/app/200/1/refund`, data: params, method: 'POST' }).then(res => res.data) }

export const queryEmpByName = params => { return index.wxHttp({ url: `${preUrlPath}/pay/api/app/200/1/queryEmpByName`, data: params, method: 'POST' }).then(res => res.data) }

export const getMiniSession = params => { return index.wxHttp({ url: `${preUrlPath}/admin/getMiniSession`, data: params, method: 'POST' }).then(res => res.data) }

export const getLoginUserInfoList = params => { return index.wxHttp({ url: `${preUrlPath}/admin/mini/getLoginUserInfoList`, data: params, method: 'POST' }).then(res => res.data) }

export const bindRoleAndUser = params => { return index.wxHttp({ url: `${preUrlPath}/admin/mini/bindRoleAndUser`, data: params, method: 'POST' }).then(res => res.data) }

export const getLoginRole = params => { return index.wxHttp({ url: `${preUrlPath}/admin/mini/getLoginRole`, data: params, method: 'POST' }).then(res => res.data) }

export const unbindRoleAndUser = params => { return index.wxHttp({ url: `${preUrlPath}/admin/mini/unbindRoleAndUser`, data: params, method: 'POST' }).then(res => res.data) }

export const isOpenSound = params => { return index.wxHttp({ url: `${preUrlPath}/admin/mini/isOpenSound`, data: params, method: 'POST' }).then(res => res.data)}

export const workOverRecord = params => { return index.wxHttp({ url: `${preUrlPath}/pay/mini/handover/workOverRecord/1`, data: params, method: 'POST' }).then(res => res.data)}

export const handover = params => { return index.wxHttp({ url: `${preUrlPath}/pay/mini/handover/1`, data: params, method: 'POST' }).then(res => res.data)}

export const pagingWorkOver = params => { return index.wxHttp({ url: `${preUrlPath}/pay/mini/handover/pagingWorkOver/1`, data: params, method: 'POST' }).then(res => res.data)}

export const workOver = params => { return index.wxHttp({ url: `${preUrlPath}/pay/mini/handover/workOver/1`, data: params, method: 'POST' }).then(res => res.data)}