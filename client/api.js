const base64 = require('./utils/base64.js')
const BASE_URL = 'https://app.toworks.cn/'
const USERNAME = 'ck_e56559a87557332cae32494540329002b793db82'
const PASSWORD = 'cs_c978f6b0bab031fef539411344b0be8976c953c4'
const Authorization = "Basic " + base64.encoder(USERNAME + ":" + PASSWORD)
function api(url, params = {}) {
  return new Promise((resolve, reject) => {
    // params.rest_route = url
    wx.request({
      url: BASE_URL + 'wp-json' + url, //仅为示例，并非真实的接口地址
      data: params,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      success: function (res) {
        resolve(res.data)
      },
      error: function (res){
        alert(res)
        reject(res)
      }
    })
  })
}
module.exports = { api}