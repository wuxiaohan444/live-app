var _slicedToArray = function(t, e) {
    if (Array.isArray(t)) return t;
    if (Symbol.iterator in Object(t)) return function(t, e) {
        var n = [], i = !0, r = !1, a = void 0;
        try {
            for (var s, o = t[Symbol.iterator](); !(i = (s = o.next()).done) && (n.push(s.value), 
            !e || n.length !== e); i = !0) ;
        } catch (t) {
            r = !0, a = t;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (r) throw a;
            }
        }
        return n;
    }(t, e);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), _touch = require("../mixins/touch"), _utils = require("../common/utils");

(0, _component.VantComponent)({
    mixins: [ _touch.touch ],
    classes: [ "nav-class", "tab-class", "tab-active-class", "line-class" ],
    relation: {
        name: "tab",
        type: "descendant",
        linked: function(t) {
            t.index = this.children.length, this.children.push(t), this.updateTabs();
        },
        unlinked: function(e) {
            this.children = this.children.filter(function(t) {
                return t !== e;
            }).map(function(t, e) {
                return t.index = e, t;
            }), this.updateTabs();
        }
    },
    props: {
        color: {
            type: String,
            observer: "setLine"
        },
        sticky: Boolean,
        animated: {
            type: Boolean,
            observer: "setTrack"
        },
        swipeable: Boolean,
        lineWidth: {
            type: [ String, Number ],
            value: -1,
            observer: "setLine"
        },
        lineHeight: {
            type: [ String, Number ],
            value: -1,
            observer: "setLine"
        },
        titleActiveColor: String,
        titleInactiveColor: String,
        active: {
            type: [ String, Number ],
            value: 0,
            observer: function(t) {
                t !== this.getCurrentName() && this.setCurrentIndexByName(t);
            }
        },
        type: {
            type: String,
            value: "line"
        },
        border: {
            type: Boolean,
            value: !0
        },
        ellipsis: {
            type: Boolean,
            value: !0
        },
        duration: {
            type: Number,
            value: .3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4,
            observer: function(t) {
                this.setData({
                    scrollable: this.children.length > t || !this.data.ellipsis
                });
            }
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        lazyRender: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        tabs: [],
        lineStyle: "",
        scrollLeft: 0,
        scrollable: !1,
        trackStyle: "",
        currentIndex: null,
        container: null
    },
    beforeCreate: function() {
        this.children = [];
    },
    mounted: function() {
        var t = this;
        this.setData({
            container: function() {
                return t.createSelectorQuery().select(".van-tabs");
            }
        }), this.setLine(!0), this.setTrack(), this.scrollIntoView();
    },
    methods: {
        updateTabs: function() {
            var t = this.children, e = void 0 === t ? [] : t, n = this.data;
            this.setData({
                tabs: e.map(function(t) {
                    return t.data;
                }),
                scrollable: this.children.length > n.swipeThreshold || !n.ellipsis
            }), this.setCurrentIndexByName(this.getCurrentName() || n.active);
        },
        trigger: function(t) {
            var e = this.data.currentIndex, n = this.children[e];
            this.$emit(t, {
                index: e,
                name: n ? n.getComputedName() : "",
                title: n ? n.data.title : ""
            });
        },
        onTap: function(t) {
            var e = this, n = t.currentTarget.dataset.index;
            this.children[n].data.disabled ? this.trigger("disabled") : (this.setCurrentIndex(n), 
            wx.nextTick(function() {
                e.trigger("click");
            }));
        },
        setCurrentIndexByName: function(e) {
            var t = this.children, n = void 0 === t ? [] : t, i = n.filter(function(t) {
                return t.getComputedName() === e;
            }), r = (n[0] || {}).index || 0;
            this.setCurrentIndex(i.length ? i[0].index : r);
        },
        setCurrentIndex: function(i) {
            var r = this, t = this.data, e = this.children, n = void 0 === e ? [] : e;
            if (!(!(0, _utils.isDef)(i) || i >= n.length || i < 0)) {
                var a = null !== t.currentIndex;
                this.setData({
                    currentIndex: i
                }), n.forEach(function(t, e) {
                    var n = e === i;
                    n === t.data.active && t.inited || t.updateRender(n, r);
                }), wx.nextTick(function() {
                    r.setLine(), r.setTrack(), r.scrollIntoView(), r.trigger("input"), a && r.trigger("change");
                });
            }
        },
        getCurrentName: function() {
            var t = this.children[this.data.currentIndex];
            if (t) return t.getComputedName();
        },
        setLine: function(s) {
            var o = this;
            if ("line" === this.data.type) {
                var t = this.data, l = t.color, u = t.duration, c = t.currentIndex, d = t.lineWidth, h = t.lineHeight;
                this.getRect(".van-tab", !0).then(function() {
                    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], e = t[c];
                    if (null != e) {
                        var n = -1 !== d ? d : e.width / 2, i = -1 !== h ? "height: " + (0, _utils.addUnit)(h) + "; border-radius: " + (0, 
                        _utils.addUnit)(h) + ";" : "", r = t.slice(0, c).reduce(function(t, e) {
                            return t + e.width;
                        }, 0);
                        r += (e.width - n) / 2;
                        var a = s ? "" : "transition-duration: " + u + "s; -webkit-transition-duration: " + u + "s;";
                        o.setData({
                            lineStyle: "\n            " + i + "\n            width: " + (0, _utils.addUnit)(n) + ";\n            background-color: " + l + ";\n            -webkit-transform: translateX(" + r + "px);\n            transform: translateX(" + r + "px);\n            " + a + "\n          "
                        });
                    }
                });
            }
        },
        setTrack: function() {
            var t = this.data, e = t.animated, n = t.duration, i = t.currentIndex;
            this.setData({
                trackStyle: "\n          transform: translate3d(" + -100 * i + "%, 0, 0);\n          -webkit-transition-duration: " + (e ? n : 0) + "s;\n          transition-duration: " + (e ? n : 0) + "s;\n        "
            });
        },
        scrollIntoView: function() {
            var s = this, t = this.data, o = t.currentIndex;
            t.scrollable && Promise.all([ this.getRect(".van-tab", !0), this.getRect(".van-tabs__nav") ]).then(function(t) {
                var e = _slicedToArray(t, 2), n = e[0], i = e[1], r = n[o], a = n.slice(0, o).reduce(function(t, e) {
                    return t + e.width;
                }, 0);
                s.setData({
                    scrollLeft: a - (i.width - r.width) / 2
                });
            });
        },
        onTouchScroll: function(t) {
            this.$emit("scroll", t.detail);
        },
        onTouchStart: function(t) {
            this.data.swipeable && this.touchStart(t);
        },
        onTouchMove: function(t) {
            this.data.swipeable && this.touchMove(t);
        },
        onTouchEnd: function() {
            if (this.data.swipeable) {
                var t = this.data, e = t.tabs, n = t.currentIndex, i = this.direction, r = this.deltaX, a = this.offsetX;
                "horizontal" === i && 50 <= a && (0 < r && 0 !== n ? this.setCurrentIndex(n - 1) : r < 0 && n !== e.length - 1 && this.setCurrentIndex(n + 1));
            }
        }
    }
});