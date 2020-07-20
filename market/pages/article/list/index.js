var _market = require("../../../../api/market"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: 0,
            title: "精选文章",
            color: !1
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        page: 1,
        limit: 3,
        list: []
    },
    onLoad: function(a) {
        this.getList();
    },
    getList: function() {
        var n = this;
        n.data.loadend || n.data.loading || (n.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _market.getArticleList)(1, {
            page: n.data.page,
            limit: n.data.limit
        }).then(function(a) {
            if (a.data.data) {
                var t = a.data.data, i = t.length < n.data.limit;
                n.data.list = app.SplitArray(t, n.data.list), n.setData({
                    list: n.data.list,
                    loading: !1,
                    loadend: i,
                    loadTitle: i ? "拉到底了哦" : "加载更多",
                    page: n.data.page + 1
                });
            }
        }).catch(function(a) {
            console.log(88888888888), console.log(a), n.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onDetails: function() {
        wx.navigateTo({
            url: "../../component/pages/magazineDetails/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getList();
    },
    onShareAppMessage: function() {}
});