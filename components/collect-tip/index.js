Component({
    properties: {},
    data: {
        showTip: 0,
        deviceType: ""
    },
    pageLifetimes: {
        show: function() {
            var e = getApp();
            this.setData({
                deviceType: e.globalData.deviceType
            }), wx.getStorageSync("hide_collect_tip") || this.setData({
                showTip: 1
            });
        },
        hide: function() {},
        resize: function() {}
    },
    methods: {
        onClose: function() {
            wx.setStorageSync("hide_collect_tip", 1), this.setData({
                showTip: 0
            });
        }
    }
});