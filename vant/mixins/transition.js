Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transition = void 0;

var _utils = require("../common/utils"), getClassNames = function(e) {
    return {
        enter: "van-" + e + "-enter van-" + e + "-enter-active enter-class enter-active-class",
        "enter-to": "van-" + e + "-enter-to van-" + e + "-enter-active enter-to-class enter-active-class",
        leave: "van-" + e + "-leave van-" + e + "-leave-active leave-class leave-active-class",
        "leave-to": "van-" + e + "-leave-to van-" + e + "-leave-active leave-to-class leave-active-class"
    };
}, nextTick = function() {
    return new Promise(function(e) {
        return setTimeout(e, 1e3 / 30);
    });
}, transition = exports.transition = function(e) {
    return Behavior({
        properties: {
            customStyle: String,
            show: {
                type: Boolean,
                value: e,
                observer: "observeShow"
            },
            duration: {
                type: null,
                value: 300,
                observer: "observeDuration"
            },
            name: {
                type: String,
                value: "fade"
            }
        },
        data: {
            type: "",
            inited: !1,
            display: !1
        },
        attached: function() {
            this.data.show && this.enter();
        },
        methods: {
            observeShow: function(e) {
                e ? this.enter() : this.leave();
            },
            enter: function() {
                var e = this, t = this.data, n = t.duration, a = t.name, s = getClassNames(a), i = (0, 
                _utils.isObj)(n) ? n.enter : n;
                this.status = "enter", this.$emit("before-enter"), Promise.resolve().then(nextTick).then(function() {
                    e.checkStatus("enter"), e.$emit("enter"), e.setData({
                        inited: !0,
                        display: !0,
                        classes: s.enter,
                        currentDuration: i
                    });
                }).then(nextTick).then(function() {
                    e.checkStatus("enter"), e.transitionEnded = !1, e.setData({
                        classes: s["enter-to"]
                    });
                }).catch(function() {});
            },
            leave: function() {
                var e = this;
                if (this.data.display) {
                    var t = this.data, n = t.duration, a = t.name, s = getClassNames(a), i = (0, _utils.isObj)(n) ? n.leave : n;
                    this.status = "leave", this.$emit("before-leave"), Promise.resolve().then(nextTick).then(function() {
                        e.checkStatus("leave"), e.$emit("leave"), e.setData({
                            classes: s.leave,
                            currentDuration: i
                        });
                    }).then(nextTick).then(function() {
                        e.checkStatus("leave"), e.transitionEnded = !1, setTimeout(function() {
                            return e.onTransitionEnd();
                        }, i), e.setData({
                            classes: s["leave-to"]
                        });
                    }).catch(function() {});
                }
            },
            checkStatus: function(e) {
                if (e !== this.status) throw new Error("incongruent status: " + e);
            },
            onTransitionEnd: function() {
                if (!this.transitionEnded) {
                    this.transitionEnded = !0, this.$emit("after-" + this.status);
                    var e = this.data, t = e.show, n = e.display;
                    !t && n && this.setData({
                        display: !1
                    });
                }
            }
        }
    });
};