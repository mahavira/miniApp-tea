import { api } from '../../api'

Page({
  data: {
    swipers: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    homelist: []
  },
  onLoad() {
    this.fetchHomelist()
    this.fetchSwiper()
  },
  onPullDownRefresh() {
    this.fetchHomelist()
    this.fetchSwiper()
  },
  fetchSwiper () {
    api('/acf/v3/swiper').then(res => {
      var data = res.map(n => {
        return n.acf
      })
      this.setData({
        swipers: data
      })
    }).catch(res => {
    })    
  },
  fetchHomelist() {
    api('/wp/v2/homelist', {
      per_page: 10,
      type: 'grouped'
    }).then(res => {
      var data = res.map(n => {
        return n.acf
      })
      this.setData({
        homelist: data
      })
    }).catch(res => {
    })
  },
  navToDetail (e) {
    var data = e.target.dataset.target
    console.log(data)
    var id = data.ID
    var type = data.post_type == 'post' ? 'article' : 'product'
    var url = `/pages/${type}-detail/${type}-detail?id=${id}`
    wx.navigateTo({
      url
    })
  }
})
