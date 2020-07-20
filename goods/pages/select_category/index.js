var _goods = require("../../../api/goods.js"), _util = require("../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Page({
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            navbar: "1",
            return: "1",
            title: "选择类目"
        },
        category: 0,
        from: "",
        list: []
    },
    onLoad: function(e) {
        var t = this, a = e.category, o = e.level;
        this.setData({
            from: e.from,
            category: a,
            level: o
        }), (0, _goods.getCategoryList)(a).then(function(e) {
            t.setData({
                list: e.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onChild: function(e) {
        var t = this.data.from, a = e.target.dataset.pid, o = this.data.level, r = e.target.dataset.id, i = e.target.dataset.name;
        if (0 == a && 1 != o) wx.redirectTo({
            url: "/goods/pages/select_category/index?from=" + t + "&category=" + r
        }); else switch (t) {
          case "merch_add_goods":
            var d = _util2.default.getCache("merchGoodsFormData", {});
            d.category_id = r, d.category_name = i, _util2.default.setCache("merchGoodsFormData", d, 600), 
            d.id ? wx.redirectTo({
                url: "/merch/pages/goods/edit/index?id=" + d.id
            }) : wx.redirectTo({
                url: "/merch/pages/goods/add/index"
            });
            break;

          case "merch_edit_store":
            var n = _util2.default.getCache("merchStoreFormData", {});
            n.category_id = r, n.category_name = i, _util2.default.setCache("merchStoreFormData", n, 600), 
            wx.redirectTo({
                url: "/merch/pages/store/edit_info/index"
            });
        }
    }
});