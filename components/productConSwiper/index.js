var app = getApp();

Component({
    properties: {
        imgUrls: {
            type: Object,
            value: []
        },
        imageUrl: {
            type: String,
            value: ""
        },
        videoUrl: {
            type: String,
            value: ""
        }
    },
    data: {
        indicatorDots: !1,
        circular: !0,
        autoplay: !1,
        interval: 3e3,
        duration: 500,
        showVideoIcon: !0,
        videoSound: !0,
        videoPlaying: !1,
        staticUrl: app.globalData.static_url,
        currents: "1"
    },
    attached: function() {},
    methods: {
        onLoad: function() {},
        change: function(t) {
            0 == t.detail.current ? this.setData({
                showVideoIcon: !0
            }) : this.setData({
                showVideoIcon: !1
            }), this.setData({
                currents: t.detail.current + 1
            });
        },
        preview: function() {
            wx.previewImage({
                current: this.data.currents,
                urls: this.data.imgUrls
            });
        },
        videoPlay: function() {
            wx.createVideoContext("myVideo").play(), this.setData({
                videoPlaying: !0
            });
        },
        bindended: function() {
            this.setData({
                videoPlaying: !1
            });
        },
        binderror: function() {
            this.setData({
                videoPlaying: !1
            });
        },
        showpic: function() {
            wx.createVideoContext("myVideo").stop(), this.setData({
                videoPlaying: !1
            });
        },
        changevoice: function() {
            this.setData({
                videoSound: !this.data.videoSound
            });
        }
    }
});