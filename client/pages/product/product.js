import { api } from '../../api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    visibleFilter: false,
    isMore: true,
    loading: false,
    search: '',
    filterDefault: {
      page: 1,
      per_page: 10,
      type: 'simple'
    },
    filter: {
      page: 1,
      per_page: 10,
      type: 'simple'
    },
    attributes: {
      'pa_new': {
        name: '',
        options: []
      },
      'pa_craft': {
        name: '',
        options: []
      },
      'price': {
        name: '价格',
        options: [{
          id: 150,
          name: 150
        }, {
          id: 300,
          name: 300
        }, {
          id: 500,
          name: 500
        }, {
          id: 1000,
          name: 1000
        }, {
          id: 2000,
          name: 2000
        }, {
          id: 5000,
          name: 5000
        }]
      },
      'pa_series': {
        name: '',
        options: []
      },
      'pa_area': {
        name: '',
        options: []
      },
      'pa_year-age': {
        name: '',
        options: []
      }
    },
    attributesSelected: {
      key: '',
      value: ''
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
    this.getAttributes()
  },

  toggleFilter() {
    this.setData({
      visibleFilter: !this.data.visibleFilter
    })
  },
  fetch() {
    this.setData({
      loading: true
    })
    api('/wc/v2/products', this.data.filter).then(res => {
      var products = []
      if (this.data.filter.page === 1) {
        products = res
      } else {
        products = [...this.data.products, ...res]
      }
      var isMore = res.length === this.data.filter.per_page
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
  loadMore() {
    if (!this.data.isMore) return
    this.data.filter.page++
    this.setData({
      filter: this.data.filter
    })
    this.fetch()
  },
  getAttributes() {
    var attributes = {}
    api('/wc/v2/products/attributes').then(res => {
      attributes = this.data.attributes
      var prs = res.map(n => {
        if (!attributes[n.slug]) attributes[n.slug] = {}
        attributes[n.slug] = Object.assign(attributes[n.slug], n)
        return api('/wc/v2/products/attributes/' + n.id + '/terms').then(res => {
          attributes[n.slug].options = res
        })
      })
      return Promise.all(prs)
    }).then(res => {
      this.setData({ attributes })
    }).catch(res => {
    })
  },
  handleAttr(e) {
    var data = e.target.dataset
    this.setData({
      attributesSelected: {
        key: data.attr,
        value: data.id
      }
    })
    if (data.attr === 'price') this.filterPrice(data)
    else this.filterAttr(data)
    this.fetch()
  },
  filterPrice(data) {
    var filter = Object.assign({}, this.data.filterDefault)
    filter.page = 1
    filter.max_price = data.name
    this.setData({
      filter,
      visibleFilter: false
    })
  },
  filterAttr(data) {
    var filter = Object.assign({}, this.data.filterDefault)
    filter.page = 1
    filter.attribute = data.attr
    filter.attribute_term = data.id
    this.setData({
      filter,
      visibleFilter: false
    })
  },
  resetFilter () {
    this.setData({
      attributesSelected: {
        key: '',
        value: ''
      },
      visibleFilter: false,
      filter: Object.assign({}, this.data.filterDefault)
    })
    this.fetch()
  },
  bindInput: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchSubmit (e) {
    this.setData({
      attributesSelected: {
        key: '',
        value: ''
      },
      filter: Object.assign({}, this.data.filterDefault, {
        search: this.data.search
      })
    })
    this.fetch()
  }
})