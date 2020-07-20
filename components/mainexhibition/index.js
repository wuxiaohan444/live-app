Component({
    properties: {
        tag: {
            type: Object,
            value: []
        }
    },
    data: {
        showTip: 0
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    },
    methods: {
        goToGoodsPage: function(t) {
            var e = t.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/goods/pages/goods_details/index?id=" + e
            });
        },
        jumpMainExhibitionDetail: function(t) {
            var e = t.currentTarget.dataset.id;
            wx.navigateTo({
                url: "/goods/pages/tag-goods/index?tag=" + e
            });
        }
    }
});