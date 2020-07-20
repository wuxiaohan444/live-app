var _api = require("../../api/api.js");

function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var app = getApp();

Component({
    properties: {
        coupon: {
            type: Object,
            value: {
                list: [],
                statusTile: ""
            }
        },
        openType: {
            type: Number,
            value: 0
        }
    },
    data: {},
    attached: function() {},
    methods: {
        close: function() {
            this.triggerEvent("ChangCouponsClone");
        },
        getCouponUser: function(e) {
            var t = this, n = e.currentTarget.dataset.id, a = e.currentTarget.dataset.index, i = t.data.coupon.list;
            if (1 == i[a].is_use && 0 == this.data.openType) return !0;
            switch (this.data.openType) {
              case 0:
                (0, _api.setCouponReceive)(n).then(function(e) {
                    i[a].is_use = !0, t.setData(_defineProperty({}, "coupon.list", i)), app.Tips({
                        title: "领取成功"
                    }), t.triggerEvent("ChangCoupons", i[a]);
                });
                break;

              case 1:
                t.triggerEvent("ChangCoupons", a);
            }
        }
    }
});