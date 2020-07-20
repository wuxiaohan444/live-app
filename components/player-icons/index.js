Component({
    properties: {
        hidden: Boolean
    },
    data: {},
    ready: function() {},
    lifetimes: {
        attached: function() {},
        detached: function() {}
    },
    pageLifetimes: {
        hide: function() {
            clearInterval(this.longTapBubbleTimer);
        }
    },
    computed: function() {},
    methods: {
        onTouchLike: function() {
            var e = this;
            this.setData({
                hoverLike: !0
            });
            var t = function() {
                e.triggerEvent("showBubble", {});
            };
            t(), clearInterval(this.longTapBubbleTimer), this.longTapBubbleTimer = setInterval(t, 150);
        },
        onCancelTouchLike: function() {
            this.setData({
                hoverLike: !1
            }), clearInterval(this.longTapBubbleTimer);
        }
    }
});