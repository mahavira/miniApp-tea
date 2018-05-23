import { api } from '../../api'

Page({
  data: {
    swipers: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    homelist: [],
    products: {}
  },
  onLoad() {
    this.fetchHomelist()
    this.fetchSwiper()
  },
  onPullDownRefresh() {
    this.fetchHomelist()
    this.fetchSwiper()
  },
  fetchSwiper() {
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
      var data = []
      var products = []
      res.forEach(n => {
        if (!n.acf) return
        var acf = n.acf
        if (!acf.target ||
          Object.prototype.toString.call(acf.target) != '[object Array]' ||
          !acf.target.length) return

        var target = acf.target[0]
        if (n.title.rendered) {
          target.post_title = n.title.rendered
        }
        var image = acf.image
        target.image = image.url
        if (target.post_type == 'product') {
          products.push(target)
          if (products.length > 1) {
            data.push({
              post_type: 'multi-product',
              products
            })
            products = []
          }
          this.fetchProduct(target.ID)
        } else if (target.post_type == 'post') {
          if (products.length) {
            data.push(products[0])
            products = []
          }
          data.push(target)
        }
      })
      console.log(data)
      this.setData({
        homelist: data
      })
    }).catch(res => {
    })
  },
  fetchProduct (id) {
    api('/wc/v2/products/' + id).then(res => {
      var products = this.data.products
      res.description = res.description.replace(/<[^>]+>/g, "").slice(0, 30)
      products[id] = res
      this.setData({
        products: products
      })
      console.log(products)
    }).catch(res => {
    })
  },
  navToDetail(e) {
    var data = e.target.dataset.target
    var id = data.ID
    var type = data.post_type == 'post' ? 'article' : 'product'
    var url = `/pages/${type}-detail/${type}-detail?id=${id}`
    wx.navigateTo({
      url
    })
  }
})
