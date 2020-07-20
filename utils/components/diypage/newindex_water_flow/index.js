var app = getApp();

Component({
    properties: {
        page: {
            type: Object,
            value: {}
        }
    },
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        swiperCurrent: 0
    },
    attached: function() {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    methods: {
        catchTouchMove: function(t) {
            return !1;
        }
    }
});