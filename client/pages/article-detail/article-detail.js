import { api } from '../../api'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.fetch()
  },

  fetch() {
    api('/wp/v2/posts/' + this.id).then(res => {
      this.setData({
        article: res
      })
      wx.setNavigationBarTitle({
        title: res.title.rendered
      })
      WxParse.wxParse('content', 'html', res.content.rendered, this, 15);
    }).catch(res => {
    })
  },
})