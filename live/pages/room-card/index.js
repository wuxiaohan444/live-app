var _live = require("../../../api/live.js"), _live2 = require("../../../api/live"), app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "直播间信息卡",
            color: !0,
            loading: !1,
            loadend: !1,
            loadTitle: "加载更多",
            class: "red"
        },
        itemActive: 0,
        itemData: []
    },
    onLoad: function(t) {},
    onLoadFun: function(t) {
        var a = this;
        (0, _live.liveCard)().then(function(t) {
            console.log(11111, t.data.content), a.setData({
                itemData: t.data.content
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    bindTitle: function(t) {
        this.data.itemData[t.target.dataset.itemactive].title = t.detail.value, this.setData({
            itemData: this.data.itemData
        });
    },
    bindText: function(t) {
        this.data.itemData[t.target.dataset.itemactive].text = t.detail.value, this.setData({
            itemData: this.data.itemData
        });
    },
    onItem: function(t) {
        this.setData({
            itemActive: t.target.dataset.index
        });
    },
    onAdd: function() {
        if (3 <= this.data.itemData.length) return wx.showToast({
            title: "最多三个",
            icon: "none"
        }), !1;
        var t = {
            name: "标题" + (this.data.itemData.length + 1),
            tip: "说明" + (this.data.itemData.length + 1),
            title: "",
            text: ""
        };
        this.data.itemData.push(t), this.setData({
            itemData: this.data.itemData,
            itemActive: this.data.itemData.length - 1
        });
    },
    onDelete: function(t) {
        this.data.itemData.splice(t.currentTarget.dataset.index, 1), this.setData({
            itemData: this.data.itemData,
            itemActive: this.data.itemData.length - 1
        });
    },
    onBao: function() {
        (0, _live.liveCardStore)({
            content: this.data.itemData
        }).then(function(t) {
            return console.log(111111, t), app.Tips({
                title: t.msg,
                icon: "success"
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});