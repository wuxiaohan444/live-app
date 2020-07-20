var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var i = arguments[a];
        for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && (t[e] = i[e]);
    }
    return t;
}, _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse), _common = require("../../../api/common"), _live = require("../../../api/live"), _user = require("../../../api/user");

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的回放",
            color: !0,
            class: "0"
        },
        delBtnWidth: 160,
        data: [ {
            content: "1",
            right: 0
        }, {
            content: "2",
            right: 0
        }, {
            content: "3",
            right: 0
        }, {
            content: "4",
            right: 0
        }, {
            content: "5",
            right: 0
        }, {
            content: "6",
            right: 0
        }, {
            content: "7",
            right: 0
        }, {
            content: "8",
            right: 0
        }, {
            content: "9",
            right: 0
        }, {
            content: "10",
            right: 0
        } ],
        isScroll: !0,
        windowHeight: 0,
        loadTitle: "加载更多",
        loading: !1,
        loadend: !1,
        list: [],
        limit: 8,
        page: 1
    },
    onLoad: function(t) {
        this.setData({
            live_id: t.live_id
        });
    },
    onLoadFun: function(t) {
        this.getList(), this.getExamineKeywords();
    },
    getList: function() {
        var r = this;
        this.data.loading || this.data.loadend || (r.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.getLiveLogs)({
            page: r.data.page,
            limit: r.data.limit
        }).then(function(t) {
            var a = t.data, i = a.length < r.data.limit;
            r.data.list = app.SplitArray(a, r.data.list);
            for (var e = [], n = 0; n < r.data.list.length; n++) {
                var s = r.data.list[n], o = _extends({}, s, {
                    right: 0
                });
                e.push(o);
            }
            r.setData({
                list: e,
                loadend: i,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: r.data.page + 1,
                loading: !1
            });
        }).catch(function(t) {
            r.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    delLog: function(t) {
        var a = t.target.dataset.id, i = this, e = t.target.dataset.index;
        (0, _live.delLiveLog)(a).then(function(t) {
            return app.Tips({
                title: "删除成功",
                icon: "success"
            }, function() {
                i.data.list.splice(e, 1), i.setData({
                    list: i.data.list
                });
            });
        });
    },
    getExamineKeywords: function() {
        var a = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            a.setData({
                examineKeywords: t.data
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, a, 0);
        }).catch(function(t) {});
    },
    onReady: function() {},
    drawStart: function(t) {
        console.log("drawStart");
        var a = t.touches[0];
        for (var i in this.data.list) {
            this.data.list[i].right = 0;
        }
        this.setData({
            list: this.data.list,
            startX: a.clientX
        });
    },
    drawMove: function(t) {
        var a = t.touches[0], i = this.data.list[t.currentTarget.dataset.index], e = this.data.startX - a.clientX;
        20 <= e ? (e > this.data.delBtnWidth && (e = this.data.delBtnWidth), i.right = e, 
        this.setData({
            isScroll: !1,
            list: this.data.list
        })) : (i.right = 0, this.setData({
            isScroll: !0,
            list: this.data.list
        }));
    },
    drawEnd: function(t) {
        var a = this.data.list[t.currentTarget.dataset.index];
        a.right >= this.data.delBtnWidth / 2 ? a.right = this.data.delBtnWidth : a.right = 0, 
        this.setData({
            isScroll: !0,
            list: this.data.list
        });
    },
    delItem: function(t) {
        console.log(t);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getList();
    },
    onShareAppMessage: function() {}
});