var _user = require("../../api/user.js"), app = getApp();

Component({
    properties: {
        pagesUrl: {
            type: String,
            value: ""
        },
        address: {
            type: Object,
            value: {
                address: !0,
                addressId: 0
            }
        },
        isLog: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        active: 0,
        addressList: [],
        is_loading: !0
    },
    attached: function() {},
    methods: {
        tapAddress: function(t) {
            this.setData({
                active: t.currentTarget.dataset.id
            }), this.triggerEvent("OnChangeAddress", t.currentTarget.dataset.addressid);
        },
        close: function() {
            this.setData({
                "address.address": !1
            }), this.triggerEvent("changeTextareaStatus");
        },
        goAddressPages: function() {
            this.setData({
                "address.address": !1
            }), this.triggerEvent("changeTextareaStatus"), wx.navigateTo({
                url: this.data.pagesUrl
            });
        },
        getAddressList: function() {
            var d = this;
            (0, _user.getAddressList)({
                page: 1,
                limit: 5
            }).then(function(t) {
                for (var e = t.data, s = 0, a = e.length; s < a; s++) e[s].id == d.data.address.addressId && d.setData({
                    active: s
                });
                d.setData({
                    addressList: e,
                    is_loading: !1
                });
            });
        }
    }
});