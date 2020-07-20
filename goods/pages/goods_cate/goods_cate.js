var _goods = require("../../../api/goods.js"), _api = require("../../../api/api.js"), app = getApp();

Page({
    data: {
        navlist: [],
        categoryList: [],
        parentList: [],
        navActive: 0,
        parameter: {
            navbar: "1",
            return: "1",
            title: "产品分类"
        },
        navH: "",
        loading: !0,
        number: ""
    },
    onLoad: function(t) {
        var a = this;
        this.getCategorys(0), this.setData({
            navH: app.globalData.navHeight
        }), wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    height: t.windowHeight * (750 / t.windowWidth) - 98 - app.globalData.navHeight
                });
            }
        });
    },
    tap: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index;
        this.getCategorys(a), this.setData({
            navActive: e,
            loading: !0
        });
    },
    getCategorys: function(a) {
        var e = this;
        (0, _goods.getCategoryList)(a).then(function(t) {
            0 == a ? (e.setData({
                parentList: t.data
            }), e.getCategorys(t.data[0].id)) : e.setData({
                categoryList: t.data,
                loading: !1
            });
        });
    },
    scroll: function(t) {
        for (var a = t.detail.scrollTop, e = this.data.hightArr, i = 0; i < e.length; i++) 0 <= a && a < e[1] - e[0] ? this.setData({
            navActive: 0,
            lastActive: 0
        }) : a >= e[i] - e[0] && a < e[i + 1] - e[0] ? (console.log(e[1] - e[0]), this.setData({
            navActive: i
        })) : a >= e[e.length - 1] - e[0] && this.setData({
            navActive: e.length - 1
        });
    },
    searchSubmitValue: function(t) {
        if ((0, _api.setFormId)(t.detail.formId).then(function(t) {}).catch(function(t) {}), 
        !(0 < t.detail.value.length)) return app.Tips({
            title: "请填写要搜索的产品信息"
        });
        wx.navigateTo({
            url: "/goods/pages/goods_list/goods_list?searchValue=" + t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {}
});