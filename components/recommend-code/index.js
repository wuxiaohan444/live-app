Page({
    data: {
        codeData: "",
        shopDialog: !1
    },
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    getCode: function(o) {
        this.setData({
            codeData: o.detail.value
        });
    },
    onBang: function() {
        this.setData({
            shopDialog: !0
        });
    },
    quxiao: function() {
        this.setData({
            shopDialog: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});