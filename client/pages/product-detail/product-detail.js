import { api } from '../../api'
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {},
    products: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id
    this.fetch()
  },

  fetch() {
    api('/wc/v2/products/' + this.id).then(res => {
      this.setData({
        product: res
      })
      WxParse.wxParse('content', 'html', res.description, this, 15);

      if (res.type === 'grouped') {
        res.grouped_products.map(n=>{
          this.fetchSimple(n)
        })
      }
    }).catch(res => {
    })
  },
  fetchSimple(id){
    return api('/wc/v2/products/' + id).then(res=>{
      var products = this.data.products
      products.push(res)
      this.setData({ products})
    })
  }
})