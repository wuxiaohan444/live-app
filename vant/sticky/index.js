var _component = require("../common/component"), ROOT_ELEMENT = ".van-sticky";

(0, _component.VantComponent)({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: "observeContent"
        },
        disabled: {
            type: Boolean,
            observer: function(e) {
                this.mounted && (e ? this.disconnectObserver() : this.initObserver());
            }
        },
        container: {
            type: null,
            observer: function(e) {
                "function" == typeof e && this.data.height && this.observeContainer();
            }
        }
    },
    data: {
        wrapStyle: "",
        containerStyle: ""
    },
    methods: {
        setStyle: function() {
            var e = this.data, t = e.offsetTop, n = e.height, i = e.fixed, o = e.zIndex;
            i ? this.setData({
                wrapStyle: "top: " + t + "px;",
                containerStyle: "height: " + n + "px; z-index: " + o + ";"
            }) : this.setData({
                wrapStyle: "",
                containerStyle: ""
            });
        },
        getContainerRect: function() {
            var t = this.data.container();
            return new Promise(function(e) {
                return t.boundingClientRect(e).exec();
            });
        },
        initObserver: function() {
            var t = this;
            this.disconnectObserver(), this.getRect(ROOT_ELEMENT).then(function(e) {
                t.setData({
                    height: e.height
                }), wx.nextTick(function() {
                    t.observeContent(), t.observeContainer();
                });
            });
        },
        disconnectObserver: function(e) {
            if (e) {
                var t = this[e];
                t && t.disconnect();
            } else this.contentObserver && this.contentObserver.disconnect(), this.containerObserver && this.containerObserver.disconnect();
        },
        observeContent: function() {
            var t = this, e = this.data.offsetTop;
            this.disconnectObserver("contentObserver");
            var n = this.createIntersectionObserver({
                thresholds: [ 0, 1 ]
            });
            (this.contentObserver = n).relativeToViewport({
                top: -e
            }), n.observe(ROOT_ELEMENT, function(e) {
                t.data.disabled || t.setFixed(e.boundingClientRect.top);
            });
        },
        observeContainer: function() {
            var n = this;
            if ("function" == typeof this.data.container) {
                var i = this.data.height;
                this.getContainerRect().then(function(e) {
                    n.containerHeight = e.height, n.disconnectObserver("containerObserver");
                    var t = n.createIntersectionObserver({
                        thresholds: [ 0, 1 ]
                    });
                    (n.containerObserver = t).relativeToViewport({
                        top: n.containerHeight - i
                    }), t.observe(ROOT_ELEMENT, function(e) {
                        n.data.disabled || n.setFixed(e.boundingClientRect.top);
                    });
                });
            }
        },
        setFixed: function(e) {
            var t = this, n = this.data, i = n.offsetTop, o = n.height, r = this.containerHeight, s = r && o ? o - r < e && e < i : e < i;
            this.$emit("scroll", {
                scrollTop: e,
                isFixed: s
            }), this.setData({
                fixed: s
            }), wx.nextTick(function() {
                t.setStyle();
            });
        }
    },
    mounted: function() {
        this.mounted = !0, this.data.disabled || this.initObserver();
    },
    destroyed: function() {
        this.disconnectObserver();
    }
});