var _store = require("../../../api/plugin/merch/store.js"), _store2 = require("../../../api/plugin/merch/store"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "数据统计",
            color: !0,
            class: "0"
        },
        columns: [ "全部", "今天", "昨天", "最近7天", "最近30天" ],
        column_name: "全部",
        produceValue: "",
        picker_show: !1,
        stat: {
            order_money: 0,
            order_num: 0,
            visit_num: 0,
            collect_num: 0,
            cart_num: 0
        },
        type: 0
    },
    onLoadFun: function() {
        var n = this;
        (0, _store.getStat)({
            type: 0
        }).then(function(t) {
            n.setData({
                stat: t.data
            });
        });
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    pickerType: function() {
        this.setData({
            picker_show: !0
        });
    },
    onPickerConfirm: function(t) {
        var n = this, e = t.detail.index, o = t.detail.value;
        this.setData({
            picker_show: !1,
            column_name: o
        }), (0, _store.getStat)({
            type: e
        }).then(function(t) {
            n.setData({
                stat: t.data
            });
        });
    },
    onPickerCancel: function() {
        this.setData({
            picker_show: !1
        });
    }
});