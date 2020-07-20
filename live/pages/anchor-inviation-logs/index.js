var _user = require("../../../api/user.js"), _common = require("../../../api/common"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "推广人订单",
            color: !0,
            class: "0"
        },
        page: 0,
        status: !1,
        recordList: [],
        examineKeywords: {},
        recordCount: 0
    },
    onLoad: function(e) {
        this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var t = this;
        (0, _common.getExamineKeywords)().then(function(e) {
            t.setData({
                examineKeywords: e.data
            });
        }).catch(function(e) {});
    },
    onReady: function() {},
    onShow: function() {
        this.getRecordOrderList();
    },
    getRecordOrderList: function() {
        var t = this, e = t.data.page;
        1 != t.data.status && (0, _user.spreadAnchorOrder)({
            page: e
        }).then(function(e) {
            t.setData({
                recordCount: e.data.count || 0,
                recordList: e.data.list
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});