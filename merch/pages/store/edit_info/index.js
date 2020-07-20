var _store = require("../../../../api/plugin/merch/store.js"), _goods = require("../../../../api/goods.js"), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util), _dialog = require("../../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog);

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
            title: "店铺编辑",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        loading: !1,
        isChange: !1,
        formData: {},
        store: {},
        categorys: [],
        navH: app.globalData.navHeight
    },
    onLoad: function(a) {},
    onReady: function() {},
    onLoadFun: function() {
        var n = this, l = this, a = _util2.default.getCache("merchStoreFormData");
        console.log(a);
        this.getCategoryList(), a ? l.setData({
            formData: a
        }) : (wx.showLoading(), (0, _store.getInfo)().then(function(a) {
            wx.hideLoading();
            var t = a.data;
            t.id = a.data.id;
            var e = [];
            if (t.banners) {
                for (var o in t.banners) {
                    var i = {
                        url: t.banners[o],
                        name: "图片",
                        isImage: !0
                    };
                    e.push(i);
                }
                t.banners = e;
            }
            if (t.logo && (t.logo = [ {
                url: t.logo,
                name: "图片",
                isImage: !0
            } ]), 0 < t.category_id) {
                var r = n.data.categorys;
                for (var o in r) if (r[o].id == t.category_id) {
                    t.category_index = o, t.category_name = r[o].name;
                    break;
                }
            }
            l.setData({
                formData: t
            }), _util2.default.setCache("merchStoreFormData", t, 600);
        }).catch(function(a) {
            return app.Tips({
                title: a,
                icon: "none"
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        }));
    },
    getCategoryList: function() {
        var t = this;
        (0, _goods.getCategoryList)().then(function(a) {
            t.setData({
                categorys: a.data
            });
        });
    },
    onShow: function(a) {
        var t = _util2.default.getCache("merchStoreFormData");
        this.setData({
            formData: t
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    returnBack: function() {
        _util2.default.getCache("merchStoreFormData", {});
        this.data.isChange ? _dialog2.default.confirm({
            title: "",
            message: "是否放弃已编辑的内容?",
            confirmButtonText: "继续编辑",
            cancelButtonText: "放弃并返回"
        }).then(function() {}).catch(function() {
            _util2.default.removeCache("merchStoreFormData"), wx.navigateBack();
        }) : wx.navigateBack();
    },
    formDataChange: function(a) {
        var t = _util2.default.getCache("merchStoreFormData", {}), e = a.currentTarget.dataset.column;
        if ("region" == e) {
            var o = {
                province: a.detail.value[0],
                city: a.detail.value[1],
                district: a.detail.value[2]
            };
            t[e] = o;
        } else if ("category_index" == e) {
            var i = this.data.categorys;
            t.category_index = a.detail.value, t.category_id = i[a.detail.value].id, t.category_name = i[a.detail.value].name;
        } else t[e] = a.detail.value;
        this.setData({
            formData: t,
            isChange: !0
        }), _util2.default.setCache("merchStoreFormData", t, 600);
    },
    uploadBanners: function(a) {
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
            success: function(a) {
                var t = (a.data ? JSON.parse(a.data) : {}).data.url;
                wx.hideLoading();
                var e = {
                    url: t,
                    name: "图片",
                    isImage: !0
                }, o = _util2.default.getCache("merchStoreFormData", {});
                null != o.banners && 0 < o.banners.length ? o.banners.push(e) : o.banners = [ e ], 
                _util2.default.setCache("merchStoreFormData", o, 600), i.setData({
                    formData: o
                });
            },
            fail: function(a) {
                return app.Tips({
                    title: a.errMsg
                });
            }
        });
    },
    deleteBanners: function(a) {
        var t = a.detail.index, e = _util2.default.getCache("merchStoreFormData", {});
        e.banners.splice(t - 1, 1), this.setData({
            formData: e
        }), _util2.default.setCache("merchStoreFormData", e, 600);
    },
    uploadLogo: function(a) {
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
            success: function(a) {
                var t = (a.data ? JSON.parse(a.data) : {}).data.url;
                wx.hideLoading();
                var e = {
                    url: t,
                    name: "图片",
                    isImage: !0
                }, o = _util2.default.getCache("merchStoreFormData", {});
                o.logo = [ e ], _util2.default.setCache("merchStoreFormData", o, 600), i.setData({
                    formData: o
                });
            },
            fail: function(a) {
                return app.Tips({
                    title: a.errMsg
                });
            }
        });
    },
    deleteLogo: function(a) {
        a.detail.index;
        var t = _util2.default.getCache("merchStoreFormData", {});
        t.logo = [], this.setData({
            formData: t
        }), _util2.default.setCache("merchStoreFormData", t, 600);
    },
    uploadVideo: function(a) {
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
            success: function(a) {
                var t = (a.data ? JSON.parse(a.data) : {}).data.url;
                wx.hideLoading();
                var e = {
                    url: t,
                    name: "视频",
                    isImage: !1
                }, o = _util2.default.getCache("merchStoreFormData", {});
                o.video = [ e ], _util2.default.setCache("merchStoreFormData", o, 600), i.setData({
                    formData: o
                });
            }
        });
    },
    deleteVideo: function(a) {
        a.detail.index;
        var t = _util2.default.getCache("merchStoreFormData", {});
        t.video = [], this.setData({
            formData: t
        }), _util2.default.setCache("merchStoreFormData", t, 600);
    },
    storeSumit: function(a) {
        var t = this, e = _util2.default.getCache("merchStoreFormData", {});
        return e.state = a.currentTarget.dataset.state, this.data.loading ? app.Tips({
            title: "请勿重复提交"
        }) : e.name ? !e.logo || e.logo.length <= 0 ? app.Tips({
            title: "请上传店铺logo"
        }) : e.salecate ? e.category_id ? e.realname ? e.mobile ? !e.banners || e.banners.length <= 0 ? app.Tips({
            title: "最少上传一张宣传图片"
        }) : (wx.showLoading(), t.setData({
            loading: !0
        }), void (0, _store.updateStore)(e).then(function(a) {
            return wx.hideLoading(), t.setData({
                loading: !1
            }), _util2.default.removeCache("merchStoreFormData"), app.Tips({
                title: a.msg,
                icon: "success"
            }, {
                tab: 5,
                url: "/merch/pages/store/center/index"
            });
        }).catch(function(a) {
            t.setData({
                loading: !1
            }), wx.hideLoading(), wx.showToast({
                title: a,
                icon: "none",
                duration: 2e3
            });
        })) : app.Tips({
            title: "请选择店铺联系电话"
        }) : app.Tips({
            title: "请选择店铺联系人"
        }) : app.Tips({
            title: "请选择店铺分类"
        }) : app.Tips({
            title: "请填写店铺主营业务"
        }) : app.Tips({
            title: "请填写店铺名称"
        });
    }
});