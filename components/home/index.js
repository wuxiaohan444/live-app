Page({
    data: {
        homeActive: !1
    },
    onLoad: function(n) {},
    setTouchMove: function(n) {
        n.touches[0].clientY < 400 && 66 < n.touches[0].clientY && this.setData({
            top: n.touches[0].clientY
        });
    },
    open: function() {
        this.setData({
            homeActive: !this.data.homeActive
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});