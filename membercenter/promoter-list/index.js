var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "推广人列表",
            color: !0,
            class: "0"
        },
        childLists: [],
        parent: {},
        commissionInfo: {},
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        limit: 20,
        page: 1,
        level: 0,
        config: {}
    },
    onChange: function(t) {
        this.setData({
            activeName: t.detail
        });
    },
    onLoadFun: function(t) {
        this.userSpreadList();
    },
    onLoad: function(t) {},
    onReady: function() {},
    changeLevel: function(t) {
        this.setData({
            level: t.detail.index + 1
        }), this.getLevelLists();
    },
    onShow: function() {
        this.data.is_show && this.userSpreadList();
    },
    getLevelLists: function() {
        var a = this;
        a.setData({
            childLists: []
        }), wx.showLoading(), (0, _user.getLevelLists)(this.data.level, {}).then(function(t) {
            a.setData({
                childLists: t.data.childLists
            }), wx.hideLoading();
        });
    },
    userSpreadList: function() {
        var e = this;
        e.data.loadend || e.data.loading || (e.setData({
            loading: !0,
            loadTitle: ""
        }), wx.showLoading(), (0, _user.spreadPeople)({
            page: e.data.page
        }).then(function(t) {
            var a = t.data.childLists || [], i = a.length < t.data.limit;
            e.data.childLists = app.SplitArray(a, e.data.childLists), e.setData({
                config: t.data.config,
                parent: t.data.parent,
                commissionInfo: t.data.commissionInfo,
                childLists: e.data.childLists,
                loadend: i,
                limit: t.data.limit,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: e.data.page + 1
            }), wx.hideLoading();
        }));
    },
    onHide: function() {
        this.setData({
            is_show: !0
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.userSpreadList();
    }
});