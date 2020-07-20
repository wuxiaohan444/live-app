var _Page, _goods = require("../../../../api/plugin/merch/goods.js"), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, o, e) {
    return o in t ? Object.defineProperty(t, o, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[o] = e, t;
}

var app = getApp();

Page((_defineProperty(_Page = {
    data: {
        static_url: app.globalData.static_url,
        parameter: {
            title: "店铺分类",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        list: [],
        showAdd: !1,
        showEdit: !1,
        showEditSort: !1,
        name: "",
        sort: 0
    },
    onLoad: function(t) {},
    onLoadFun: function() {
        var o = this;
        this.onCloseCategory(), (0, _goods.goodsCategoryList)().then(function(t) {
            o.setData({
                list: t.data
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
    onCloseCategory: function() {
        this.setData({
            showAdd: !1,
            showEdit: !1,
            showEditSort: !1,
            name: "",
            id: 0,
            sort: 0
        });
    },
    onAdd: function() {
        this.setData({
            showAdd: !0
        });
    },
    onUpdate: function(t) {
        this.setData({
            id: t.target.dataset.id,
            showEdit: !0
        });
    },
    onEditSort: function(t) {
        this.setData({
            id: t.target.dataset.id,
            showEditSort: !0
        });
    },
    onDelete: function(t) {
        var o = this, e = t.target.dataset.id;
        _dialog2.default.confirm({
            message: "确定删除该分类吗?"
        }).then(function() {
            (0, _goods.goodsCategoryDelete)(e).then(function(t) {
                wx.hideLoading(), o.onLoadFun();
            }).catch(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            });
        }).catch(function() {});
    },
    formDataChange: function(t) {
        var o = {};
        o[t.currentTarget.dataset.column] = t.detail.value, this.setData(o);
    },
    onSubmitAddCategory: function() {
        var o = this;
        wx.showLoading();
        var t = this.data.name;
        if (t) {
            var e = {
                name: t
            };
            (0, _goods.goodsCategoryAdd)(e).then(function(t) {
                wx.hideLoading(), o.onLoadFun();
            }).catch(function(t) {
                wx.hideLoading(), wx.showToast({
                    title: t,
                    icon: "none",
                    duration: 2e3
                });
            });
        } else wx.showToast({
            title: "分类名称不能为空",
            icon: "none"
        });
    }
}, "formDataChange", function(t) {
    var o = {};
    o[t.currentTarget.dataset.column] = t.detail.value, this.setData(o);
}), _defineProperty(_Page, "onSubmitEditCategory", function() {
    var o = this;
    wx.showLoading();
    var t = this.data.id, e = this.data.name;
    if (t) if (e) {
        var a = {
            name: e
        };
        (0, _goods.goodsCategoryUpdate)(t, a).then(function(t) {
            wx.hideLoading(), o.onLoadFun();
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    } else wx.showToast({
        title: "分类名称不能为空",
        icon: "none"
    }); else wx.showToast({
        title: "id错误",
        icon: "none"
    });
}), _defineProperty(_Page, "onSubmitSortCategory", function() {
    var o = this;
    wx.showLoading();
    var t = this.data.id, e = this.data.sort;
    if (t) if (e) {
        var a = {
            sort: e
        };
        (0, _goods.goodsCategoryUpdate)(t, a).then(function(t) {
            wx.hideLoading(), o.onLoadFun();
        }).catch(function(t) {
            wx.hideLoading(), wx.showToast({
                title: t,
                icon: "none",
                duration: 2e3
            });
        });
    } else wx.showToast({
        title: "排序值不能为空",
        icon: "none"
    }); else wx.showToast({
        title: "id错误",
        icon: "none"
    });
}), _defineProperty(_Page, "selectCategory", function(t) {
    var o = t.currentTarget.dataset.id, e = t.currentTarget.dataset.name, a = _util2.default.getCache("merchGoodsFormData", {});
    a.store_category_id = o, a.store_category_name = e, _util2.default.setCache("merchGoodsFormData", a, 600), 
    wx.navigateBack();
}), _Page));