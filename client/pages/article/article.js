import { api } from '../../api'
Page({
  data: {
    articles: [],
    isMore: true,
    loading: false,
    filterDefault: {
      page: 1,
      per_page: 5,
      context: 'embed'
    },
    filter: {
      page: 1,
      per_page: 5,
      context: 'embed'
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.fetch()
  },
  onPullDownRefresh() {
    var filter = this.data.filter
    filter.page = 1
    this.setData({
      filter
    })
    this.fetch().then(e => {
      wx.stopPullDownRefresh()
    })
  },
  fetch() {
    this.setData({
      loading: true
    })
    return api('/wp/v2/posts', this.data.filter).then(res => {
      var articles = []
      if (this.data.filter.page === 1) {
        articles = res
      } else {
        articles = [...this.data.articles, ...res]
      }

      var isMore = res.length === this.data.filter.per_page
      this.setData({
        articles,
        loading: false,
        isMore
      })
    }).catch(res => {
      this.setData({
        loading: false
      })
    })
  },
  loadMore() {
    if (!this.data.isMore) return
    this.data.filter.page++
    this.setData({
      filter: this.data.filter
    })
    this.fetch()
  },
  bindConfirm (e) {
    this.setData({
      filter: Object.assign({}, this.data.filterDefault, {
        search: e.detail.value
      })
    })
    this.fetch()
  }
})
