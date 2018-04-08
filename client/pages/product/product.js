import {api} from '../../api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    visibleFilter: false,
    isMore: true,
    loading: false,
    filter: {
      page: 1,
      per_page: 6
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.fetch()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toggleFilter (){
    this.setData({
      visibleFilter: !this.data.visibleFilter
    })
  },
  fetch () {
    this.setData({
      loading: true
    })
    api('/wc/v2/products', this.data.filter).then(res => {
      var products = [...this.data.products, ...res.data]
      var isMore = res.data.length === this.data.filter.per_page
      this.setData({
        products: products,
        loading: false,
        isMore: isMore
      })
    }).catch(res => {
      this.setData({
        loading: false
      })
    })
  },
  loadMore(){
    if (!this.data.isMore) return
    this.data.filter.page++
    this.setData({
      filter: this.data.filter
    })
    this.fetch()
  }
})