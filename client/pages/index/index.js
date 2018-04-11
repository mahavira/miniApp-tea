import { api } from '../../api'

Page({
  data: {
    swipers: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    articles: [],
    products: []
  },
  onLoad() {
    this.fetchArticle()
    this.fetchProduct()
    this.fetchSwiper()
  },
  fetchSwiper () {
    api('/acf/v3/swiper').then(res => {
      console.log(res)
      var data = res.map(n => {
        return n.acf
      })
      this.setData({
        swipers: data
      })
    }).catch(res => {
    })    
  },
  fetchProduct() {
    api('/wc/v2/products', {
      per_page: 5,
      type: 'grouped'
    }).then(res => {
      this.setData({
        products: res
      })
    }).catch(res => {
    })
  },
  fetchArticle() {
    api('/wp/v2/posts', {
      per_page: 5,
      context: 'embed'
    }).then(res => {
      this.setData({
        articles: res
      })
    }).catch(res => {
    })
  },
  navigator (e) {
    var data = e.target.dataset.target
    var id = data.ID
    var type = data.post_type == 'post' ? 'article' : 'product'
    var url = `/pages/${type}-detail/${type}-detail?id=${id}`
    wx.navigateTo({
      url
    })
  }
})
