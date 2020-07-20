var app = getApp();

Component({
    properties: {
        imgUrls: {
            type: Object,
            value: []
        }
    },
    data: {
        circular: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        currentSwiper: 0
    },
    attached: function() {
        console.log(this.data.imgUrls);
    },
    methods: {
        swiperChange: function(t) {
            this.setData({
                currentSwiper: t.detail.current
            });
        }
    }
});