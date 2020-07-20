var app = getApp();

Component({
    properties: {
        page: {
            type: Object,
            value: {}
        }
    },
    data: {
        navH: ""
    },
    attached: function() {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    methods: {
        setGoodsSearch: function() {
            wx.navigateTo({
                url: "/goods/pages/goods_search/index"
            });
        }
    }
});