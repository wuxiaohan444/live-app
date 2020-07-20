var _user = require("../../api/user.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "佣金明细",
            color: !0,
            class: "0"
        },
        name: "",
        type: 0,
        page: 0,
        limit: 8,
        recordList: [],
        recordType: 0,
        recordCount: 0,
        status: !1
    },
    onLoad: function(t) {
        this.setData({
            type: t.type
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.data.type;
        1 == t ? this.setData({
            "parameter.title": "提现记录",
            name: "提现总额",
            recordType: 4
        }) : 2 == t ? this.setData({
            "parameter.title": "佣金记录",
            name: "佣金明细",
            recordType: 3
        }) : wx.showToast({
            title: "参数错误",
            icon: "none",
            duration: 1e3,
            mask: !0,
            success: function(t) {
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1200);
            }
        }), this.getRecordList(), this.getRecordListCount();
    },
    getRecordList: function() {
        var o = this, n = o.data.page, s = o.data.limit, t = o.data.status, e = o.data.recordType, r = o.data.recordList, i = [];
        1 != t && (0, _user.spreadCommission)(e, {
            page: n,
            limit: s
        }).then(function(t) {
            var e = t.data.length, a = t.data;
            i = r.concat(a), console.log(1111, a), console.log(1111, i), o.setData({
                status: e < s,
                page: s + n,
                recordList: i
            });
        });
    },
    getRecordListCount: function() {
        var e = this;
        (0, _user.spreadCount)(e.data.recordType).then(function(t) {
            e.setData({
                recordCount: t.data.count
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getRecordList();
    },
    onShareAppMessage: function() {}
});