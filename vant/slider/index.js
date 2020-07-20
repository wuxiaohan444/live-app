var _component = require("../common/component"), _touch = require("../mixins/touch"), _utils = require("../common/utils");

(0, _component.VantComponent)({
    mixins: [ _touch.touch ],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0,
            observer: function(t) {
                this.updateValue(t, !1);
            }
        },
        barHeight: {
            type: null,
            value: "2px"
        }
    },
    created: function() {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart: function(t) {
            this.data.disabled || (this.touchStart(t), this.startValue = this.format(this.data.value), 
            this.dragStatus = "start");
        },
        onTouchMove: function(t) {
            var e = this;
            this.data.disabled || ("start" === this.dragStatus && this.$emit("drag-start"), 
            this.touchMove(t), this.dragStatus = "draging", this.getRect(".van-slider").then(function(t) {
                var a = e.deltaX / t.width * 100;
                e.newValue = e.startValue + a, e.updateValue(e.newValue, !1, !0);
            }));
        },
        onTouchEnd: function() {
            this.data.disabled || "draging" === this.dragStatus && (this.updateValue(this.newValue, !0), 
            this.$emit("drag-end"));
        },
        onClick: function(e) {
            var i = this;
            if (!this.data.disabled) {
                var n = this.data.min;
                this.getRect(".van-slider").then(function(t) {
                    var a = (e.detail.x - t.left) / t.width * i.getRange() + n;
                    i.updateValue(a, !0);
                });
            }
        },
        updateValue: function(t, a, e) {
            t = this.format(t);
            var i = this.data, n = i.barHeight, u = 100 * (t - i.min) / this.getRange() + "%";
            this.setData({
                value: t,
                barStyle: "\n          width: " + u + ";\n          height: " + (0, _utils.addUnit)(n) + ";\n          " + (e ? "transition: none;" : "") + "\n        "
            }), e && this.$emit("drag", {
                value: t
            }), a && this.$emit("change", t);
        },
        getRange: function() {
            var t = this.data;
            return t.max - t.min;
        },
        format: function(t) {
            var a = this.data, e = a.max, i = a.min, n = a.step;
            return Math.round(Math.max(i, Math.min(t, e)) / n) * n;
        }
    }
});