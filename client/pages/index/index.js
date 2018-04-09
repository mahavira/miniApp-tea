import { api } from '../../api'
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

Page({
  data: {
    swipers: swipers,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    articles: [],
    articleImages: {},
    products: []
  },
  onLoad() {
    this.fetchArticle()
    this.fetchProduct()
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

      var prs = []
      res.forEach(n => {
        if (!n.featured_media || this.data.articleImages[n.id]) return
        prs.push(api('/wp/v2/media/' + n.featured_media))
      })

      return Promise.all(prs)
    }).then(res => {
      var images = this.data.articleImages
      res.forEach(n => {
        images[n.post] = n.source_url
      })
      this.setData({
        articleImages: images
      })
    }).catch(res => {
    })
  }
})
