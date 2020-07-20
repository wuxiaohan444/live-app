var _goods = require("../../../../api/plugin/merch/goods.js"), _util = require("../../../../lib/utils/util"),
    _util2 = _interopRequireDefault(_util), _dialog = require("../../../../vant/dialog/dialog"),
    _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "发布商品",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        loading: !1,
        formData: {},
        navH: app.globalData.navHeight,
    },
    onLoad: function (a) {
    },
    onReady: function () {
    },
    onShow: function () {
        var a = _util2.default.getCache("merchGoodsFormData");
        this.setData({
            deviceType: app.globalData.deviceType,
            formData: a
        });
    },
    onHide: function () {
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onReachBottom: function () {
    },
    onShareAppMessage: function () {
    },
    returnBack: function () {
        var a = _util2.default.getCache("merchGoodsFormData", {});
        0 < Object.keys(a).length ? _dialog2.default.confirm({
            title: "",
            message: "是否放弃已编辑的内容?",
            confirmButtonText: "继续编辑",
            cancelButtonText: "放弃并返回"
        }).then(function () {
        }).catch(function () {
            _util2.default.removeCache("merchGoodsFormData"), wx.navigateBack();
        }) : wx.navigateBack();
    },
    formDataChange: function (a) {
        var t = _util2.default.getCache("merchGoodsFormData", {});
        t[a.currentTarget.dataset.column] = a.detail.value, this.setData({
            formData: t
        }), _util2.default.setCache("merchGoodsFormData", t, 600);
    },
    uploadThumbs: function (a) {
        var i = this, t = a.detail.file;
        wx.showLoading({
            title: "图片上传中"
        }), wx.uploadFile({
            url: app.globalData.url + "/common/upload/image",
            filePath: t.path,
            name: "image",
            formData: {
                filename: "image"
            },
            header: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + app.globalData.token
            },
            success: function (a) {
                var t = (a.data ? JSON.parse(a.data) : {}).data.url;
                wx.hideLoading();
                var e = {
                    url: t,
                    name: "图片",
                    isImage: !0
                }, o = _util2.default.getCache("merchGoodsFormData", {});
                null != o.thumbs && 0 < o.thumbs.length ? o.thumbs.push(e) : o.thumbs = [e], _util2.default.setCache("merchGoodsFormData", o, 600),
                    i.setData({
                        formData: o
                    });
            },
            fail: function (a) {
                return app.Tips({
                    title: a.errMsg
                });
            }
        });
    },
    deleteThumbs: function (a) {
        var t = a.detail.index, e = _util2.default.getCache("merchGoodsFormData", {});
        e.thumbs.splice(t - 1, 1), this.setData({
            formData: e
        }), _util2.default.setCache("merchGoodsFormData", e, 600);
    },
    uploadVideo: function (a) {
        var i = this, t = a.detail.file;
        wx.showLoading({
            title: "视频上传中"
        }), wx.uploadFile({
            url: app.globalData.url + "/common/upload/video",
            filePath: t.path,
            name: "video",
            formData: {
                filename: "video"
            },
            header: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + app.globalData.token
            },
            success: function (a) {
                var t = (a.data ? JSON.parse(a.data) : {}).data.url;
                wx.hideLoading();
                var e = {
                    url: t,
                    name: "视频",
                    isImage: !1
                }, o = _util2.default.getCache("merchGoodsFormData", {});
                o.video = [e], _util2.default.setCache("merchGoodsFormData", o, 600), i.setData({
                    formData: o
                });
            }
        });
    },
    deleteVideo: function (a) {
        a.detail.index;
        var t = _util2.default.getCache("merchGoodsFormData", {});
        t.video = [], this.setData({
            formData: t
        }), _util2.default.setCache("merchGoodsFormData", t, 600);
    },
    goodsSumit: function (a) {
        var t = this, e = _util2.default.getCache("merchGoodsFormData", {});
        return e.state = a.currentTarget.dataset.state, this.data.loading ? app.Tips({
            title: "请勿重复提交"
        }) : e.title ? !e.thumbs || e.thumbs.length <= 0 ? app.Tips({
            title: "最少上传一张商品图片"
        }) : !e.marketprice || e.marketprice <= 0 ? app.Tips({
            title: "商品价格填写错误"
        }) : !e.stock || e.stock <= 0 ? app.Tips({
            title: "请填写商品库存"
        }) : (wx.showLoading(), t.setData({
            loading: !0
        }), void (0, _goods.addGoods)(e).then(function (a) {
            return wx.hideLoading(), t.setData({
                loading: !1
            }), _util2.default.removeCache("merchGoodsFormData"), app.Tips({
                title: a.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/merch/pages/store/center/index"
            });
        }).catch(function (a) {
            t.setData({
                loading: !1
            }), wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none",
                duration: 2e3
            });
        })) : app.Tips({
            title: "请填写商品名称"
        });
    }
});