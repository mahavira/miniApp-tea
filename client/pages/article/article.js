import { api } from '../../api'
Page({
  data: {
    articles: [],
    images: {},
    isMore: true,
    loading: false,
    search: '',
    filterDefault: {
      page: 1,
      per_page: 2,
      context: 'embed'
    },
    filter: {
      page: 1,
      per_page: 2,
      context: 'embed'
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.fetch()
  },
  fetch() {
    this.setData({
      loading: true
    })
    api('/wp/v2/posts', this.data.filter).then(res => {
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

      var prs = []
      res.forEach(n => {
        if (!n.featured_media || this.data.images[n.id]) return
        prs.push(api('/wp/v2/media/' + n.featured_media))
      })
      return Promise.all(prs)
    }).then(res=>{
      console.log(res)
      var images = this.data.images
      res.forEach(n=>{
        images[n.post] = n.source_url
      })
      this.setData({
        images
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
  bindInput (e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchSubmit(e) {
    this.setData({
      filter: Object.assign({}, this.data.filterDefault, {
        search: this.data.search
      })
    })
    this.fetch()
  }
})
