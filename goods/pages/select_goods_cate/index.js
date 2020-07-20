var _goods = require("../../../api/goods.js"), _api = require("../../../api/api.js"), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        navlist: [],
        categoryList: [],
        parentList: [],
        navActive: 0,
        parameter: {
            navbar: "1",
            return: "1",
            title: "选择分类"
        },
        navH: "",
        loading: !0,
        number: ""
    },
    onLoad: function(t) {
        var e = this;
        this.getCategorys(0), this.setData({
            navH: app.globalData.navHeight,
            from: t.from
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    height: t.windowHeight * (750 / t.windowWidth) - 98 - app.globalData.navHeight
                });
            }
        });
    },
    tap: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        this.getCategorys(e), this.setData({
            navActive: a,
            loading: !0
        });
    },
    getCategorys: function(e) {
        var a = this;
        (0, _goods.getCategoryList)(e).then(function(t) {
            0 == e ? (a.setData({
                parentList: t.data
            }), a.getCategorys(t.data[0].id)) : a.setData({
                categoryList: t.data,
                loading: !1
            });
        });
    },
    scroll: function(t) {
        for (var e = t.detail.scrollTop, a = this.data.hightArr, i = 0; i < a.length; i++) 0 <= e && e < a[1] - a[0] ? this.setData({
            navActive: 0,
            lastActive: 0
        }) : e >= a[i] - a[0] && e < a[i + 1] - a[0] ? (console.log(a[1] - a[0]), this.setData({
            navActive: i
        })) : e >= a[a.length - 1] - a[0] && this.setData({
            navActive: a.length - 1
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
    onPullDownRefresh: function() {},
    selectCategory: function(t) {
        var e = this.data.from, a = t.currentTarget.dataset.id, i = t.currentTarget.dataset.name;
        switch (e) {
          case "merch_add_goods":
            var r = _util2.default.getCache("merchGoodsFormData", {});
            r.category_id = a, r.category_name = i, _util2.default.setCache("merchGoodsFormData", r, 600), 
            r.id ? wx.redirectTo({
                url: "/merch/pages/goods/edit/index?id=" + r.id
            }) : wx.redirectTo({
                url: "/merch/pages/goods/add/index"
            });
            break;

          case "merch_edit_store":
            var o = _util2.default.getCache("merchStoreFormData", {});
            o.category_id = a, o.category_name = i, _util2.default.setCache("merchStoreFormData", o, 600), 
            wx.redirectTo({
                url: "/merch/pages/store/edit_info/index"
            });
        }
    }
});