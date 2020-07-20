Component({
    behaviors: [],
    externalClasses: [],
    properties: {
        topShow: {
            type: Boolean,
            value: !1
        },
        rootStyle: {
            type: String,
            value: ""
        }
    },
    data: {
        img: ""
    },
    lifetimes: {
        attached: function() {
            var o = getApp().getDomain() + "/addons/shimmer_liveshop/static/wxapp/common/goTop.jpeg";
            this.setData({
                img: o
            });
        },
        moved: function() {},
        detached: function() {}
    },
    methods: {
        goTop: function() {
            wx.pageScrollTo({
                scrollTop: 0
            });
        }
    }
});