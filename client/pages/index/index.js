//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app = getApp()
let winWidth = 0
wx.getSystemInfo({
  success: res => {
    winWidth = res.windowWidth
  }
})

var swipers = [{
  id: 0,
  src: 'https://gdp.alicdn.com/imgextra/i1/2429209411/TB24qEJc3MPMeJjy1XbXXcwxVXa_!!2429209411.jpg',
}, {
  id: 0,
  src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  }, {
    id: 0,
    src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  }]

var news = [{
  id: 0,
  src: 'http://www.shuiyunpu.com/data/afficheimg/1363305521165308401.jpg',
}, {
  id: 0,
  src: 'http://www.shuiyunpu.com/data/afficheimg/1363305481883537386.jpg',
}, {
  id: 0,
  src: 'http://www.shuiyunpu.com/data/afficheimg/1363305537575471029.jpg',
}, {
  id: 0,
  src: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
}]
Page({
  data: {
    swipers: [],
    news: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad(){
    qcloud.setLoginUrl(config.service.loginUrl)

    this.setData({
      swipers: swipers,
      news: news
    })
    this.loadList(this.data.swipers, res => {
      this.setData({
        swipers: res
      })
    })
    this.loadList(this.data.news, res => {
      this.setData({
        news: res
      })
    })
    // this.login()
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return

    util.showBusy('正在登录')
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          that.setData({
            userInfo: result,
            logged: true
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true
              })
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },
  loadList (images, clb) {
    var imagePromise = images.map((n, i) => {
      return this.loadImageInfo(n)
    })
    Promise.all(imagePromise).then(clb)
  },
  loadImageInfo (image) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: image.src,
        success: (res) => {
          if (res.width) {
            let width = winWidth
            image.width = width
            image.height = res.height / res.width * width
          }
          resolve(image)
        },
        error: res => resolve(image)
      })
    })
  }
})
