var _user = require("../../api/user.js"), _api = require("../../api/api.js"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "添加地址",
            color: !0,
            class: "red"
        },
        region: [ "省", "市", "区" ],
        cartId: "",
        pinkId: 0,
        couponId: 0,
        id: 0,
        userAddress: {
            is_default: !1
        }
    },
    onLoad:function(){
        this.getUserAddress();
    },
    onLoadFun: function() {
        this.getUserAddress();
    },
    onLoad: function(t) {
        this.setData({
            cartId: t.cartId || "",
            pinkId: t.pinkId || 0,
            couponId: t.couponId || 0,
            id: t.id || 0,
            "parameter.title": t.id ? "修改地址" : "添加地址"
        });
    },
    bindRegionChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            region: t.detail.value
        });
    },
    getUserAddress: function() {
        if (!this.data.id) return !1;
        var e = this;
        (0, _user.getAddressDetail)(this.data.id).then(function(t) {
            var a = [ t.data.province, t.data.city, t.data.district ];
            e.setData({
                userAddress: t.data,
                region: a
            });
        });
    },
    getWxAddress: function() {
        var d = this;
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
                        }).then(function(i) {
                            return setTimeout(function() {
                                if (d.data.cartId) {
                                    var t = d.data.cartId, a = d.data.pinkId, e = d.data.couponId;
                                    d.setData({
                                        cartId: "",
                                        pinkId: "",
                                        couponId: ""
                                    }), wx.navigateTo({
                                        url: "/order/pages/order_confirm/index?cartId=" + t + "&addressId=" + (d.data.id ? d.data.id : i.data.id) + "&pinkId=" + a + "&couponId=" + e
                                    });
                                } else wx.navigateBack({
                                    delta: 1
                                });
                            }, 1e3), app.Tips({
                                title: "添加成功",
                                icon: "success"
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
    formSubmit: function(t) {
        var s = this, a = t.detail.value, e = t.detail.formId;
        return a.realname ? a.mobile ? /^1(3|4|5|7|8|9|6)\d{9}$/i.test(a.mobile) ? "省" == s.data.region[0] ? app.Tips({
            title: "请选择所在地区"
        }) : a.address_info ? (a.id = s.data.id, a.address = {
            province: s.data.region[0],
            city: s.data.region[1],
            district: s.data.region[2]
        }, a.is_default = s.data.userAddress.is_default ? 1 : 0, (0, _api.setFormId)(e), 
        void (0, _user.editAddress)(a).then(function(d) {
            s.data.id ? app.Tips({
                title: "修改成功",
                icon: "success"
            }) : app.Tips({
                title: "添加成功",
                icon: "success"
            }), s.data.id || (s.data.id = d.data.id), setTimeout(function() {
                if (s.data.cartId) {
                    var t = s.data.cartId, a = s.data.pinkId, e = s.data.couponId;
                    s.setData({
                        cartId: "",
                        pinkId: "",
                        couponId: ""
                    });
                    var i = "/order/pages/order_confirm/index?cartId=" + t + "&addressId=" + (s.data.id ? s.data.id : d.data.id) + "&pinkId=" + a + "&couponId=" + e;
                    wx.navigateTo({
                        url: i
                    });
                } else wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        })) : app.Tips({
            title: "请填写详细地址"
        }) : app.Tips({
            title: "请输入正确的手机号码"
        }) : app.Tips({
            title: "请填写联系电话"
        }) : app.Tips({
            title: "请填写收货人姓名"
        });
    },
    ChangeIsDefault: function(t) {
        this.setData({
            "userAddress.is_default": !this.data.userAddress.is_default
        });
    }
});