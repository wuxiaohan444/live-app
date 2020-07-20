var _user = require("../../api/user.js"), _util = require("../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

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
            title: "地址管理",
            color: !0,
            class: "red"
        },
        addressList: [],
        cartId: "",
        pinkId: 0,
        couponId: 0,
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        page: 1,
        limit: 8
    },
    onLoad: function(t) {
        this.setData({
            cartId: t.cartId || "",
            pinkId: t.pinkId || 0,
            couponId: t.couponId || 0
        });
    },
    onShow: function() {
        app.globalData.isLog && this.getAddressList(!0);
    },
    onLoadFun: function() {
        this.getAddressList();
    },
    getWxAddress: function() {
        var e = this;
        wx.authorize({
            scope: "scope.address",
            success: function(t) {
                wx.chooseAddress({
                    success: function(t) {
                        var a = {};
                        a.province = t.provinceName, a.city = t.cityName, a.district = t.countyName, (0, 
                        _user.editAddress)({
                            address: a,
                            is_default: 1,
                            realname: t.userName,
                            postal_code: t.postalCode,
                            mobile: t.telNumber,
                            address_info: t.detailInfo,
                            id: 0
                        }).then(function(t) {
                            app.Tips({
                                title: "添加成功",
                                icon: "success"
                            }, function() {
                                e.getAddressList(!0);
                            });
                        }).catch(function(t) {
                            return app.Tips({
                                title: t
                            });
                        });
                    },
                    fail: function(t) {
                        if ("chooseAddress:cancel" == t.errMsg) return app.Tips({
                            title: "取消选择"
                        });
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    title: "您已拒绝导入微信地址权限",
                    content: "是否进入权限管理，调整授权？",
                    success: function(t) {
                        if (t.confirm) wx.openSetting({
                            success: function(t) {
                                console.log(t.authSetting);
                            }
                        }); else if (t.cancel) return app.Tips({
                            title: "已取消！"
                        });
                    }
                });
            }
        });
    },
    getAddressList: function(t) {
        var s = this;
        t && s.setData({
            loadend: !1,
            page: 1,
            addressList: []
        }), s.data.loading || s.data.loadend || (s.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _user.getAddressList)({
            page: s.data.page
        }).then(function(t) {
            var a = t.data, e = a.length < s.data.limit;
            s.data.addressList = _util2.default.SplitArray(a, s.data.addressList), s.setData({
                addressList: s.data.addressList,
                loadend: e,
                loadTitle: e ? "拉到底了哦" : "加载更多",
                page: s.data.page + 1,
                loading: !1
            });
        }).catch(function(t) {
            s.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    radioChange: function(t) {
        var s = parseInt(t.detail.value), d = this, a = this.data.addressList[s];
        if (null == a) return app.Tips({
            title: "您设置的默认地址不存在!"
        });
        (0, _user.setAddressDefault)(a.id).then(function(t) {
            for (var a = 0, e = d.data.addressList.length; a < e; a++) d.data.addressList[a].is_default = a == s;
            app.Tips({
                title: "设置成功",
                icon: "success"
            }, function() {
                d.setData({
                    addressList: d.data.addressList
                });
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    editAddress: function(t) {
        var a = this.data.cartId, e = this.data.pinkId, s = this.data.couponId;
        this.setData({
            cartId: "",
            pinkId: "",
            couponId: ""
        }), wx.navigateTo({
            url: "/membercenter/user_address/index?id=" + t.currentTarget.dataset.id + "&cartId=" + a + "&pinkId=" + e + "&couponId=" + s
        });
    },
    delAddress: function(t) {
        var a = t.currentTarget.dataset.index, e = this, s = this.data.addressList[a];
        if (null == s) return app.Tips({
            title: "您删除的地址不存在!"
        });
        (0, _user.delAddress)(s.id).then(function(t) {
            app.Tips({
                title: "删除成功",
                icon: "success"
            }, function() {
                e.data.addressList.splice(a, 1), e.setData({
                    addressList: e.data.addressList
                });
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    addAddress: function() {
        var t = this.data.cartId, a = this.data.pinkId, e = this.data.couponId;
        this.setData({
            cartId: "",
            pinkId: "",
            couponId: ""
        });
        wx.navigateTo({
            url: "/membercenter/user_address/index?cartId=" + t + "&pinkId=" + a + "&couponId=" + e
        });
    },
    goOrder: function(t) {
        var a = t.currentTarget.dataset.id, e = "", s = "", d = "";
        this.data.cartId && a && (e = this.data.cartId, s = this.data.pinkId, d = this.data.couponId, 
        this.setData({
            cartId: "",
            pinkId: "",
            couponId: ""
        }), wx.redirectTo({
            url: "/order/pages/order_confirm/index?is_address=1&cartId=" + e + "&addressId=" + a + "&pinkId=" + s + "&couponId=" + d
        }));
    },
    onReachBottom: function() {
        this.getAddressList();
    }
});