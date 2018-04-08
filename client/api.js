const base64 = require('./utils/base64.js')
const BASE_URL = 'https://ajmz7nov.qcloud.la/'
const USERNAME = 'ck_594a4d4da38c0ab8eea71d0815507fe3afd2c98c'
const PASSWORD = 'cs_ac542d5e7e34e20127c248325677713bc207f497'
const Authorization = "Basic " + base64.encoder(USERNAME + ":" + PASSWORD)
function api(url, params) {
  return new Promise((resolve, reject) => {
    params.rest_route = url
    wx.request({
      url: BASE_URL, //仅为示例，并非真实的接口地址
      data: params,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': Authorization
      },
      success: function (res) {
        resolve(res)
      },
      error: function (res){
        alert(res)
        reject(res)
      }
    })
  })
}
module.exports = { api}