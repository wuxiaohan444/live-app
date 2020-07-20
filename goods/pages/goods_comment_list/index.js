var _order = require("../../../api/order.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "商品评论",
            color: !1
        },
        replyData: {},
        product_id: 0,
        reply: [],
        type: 0,
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        page: 1,
        limit: 8
    },
    onLoadFun: function() {
        this.getGppdsReplyCount(), this.getGppdsReplyList();
    },
    onLoad: function(t) {
        if (!t.product_id) return app.Tips({
            title: "缺少参数"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            product_id: t.product_id
        });
    },
    getGppdsReplyCount: function() {
        var a = this;
        (0, _order.getReplyConfig)(a.data.product_id).then(function(t) {
            a.setData({
                replyData: t.data
            });
        });
    },
    getGppdsReplyList: function() {
        var p = this;
        p.data.loadend || p.data.loading || (p.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _order.getReplyList)(p.data.product_id, {
            page: p.data.page,
            limit: p.data.limit,
            type: p.data.type
        }).then(function(t) {
            var a = t.data, e = a.length < p.data.limit;
            p.data.reply = app.SplitArray(a, p.data.reply), p.setData({
                reply: p.data.reply,
                loading: !1,
                loadend: e,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: p.data.page + 1
            });
        }).catch(function(t) {
            p.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    changeType: function(t) {
        var a = t.target.dataset.type;
        (a = parseInt(a)) != this.data.type && (this.setData({
            type: a,
            page: 1,
            loadend: !1,
            reply: []
        }), this.getGppdsReplyList());
    },
    onReachBottom: function() {
        this.getGppdsReplyList();
    }
});