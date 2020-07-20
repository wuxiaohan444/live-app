var _component = require("../common/component"), _utils = require("./utils");

function simpleTick(t) {
    return setTimeout(t, 30);
}

(0, _component.VantComponent)({
    props: {
        useSlot: Boolean,
        millisecond: Boolean,
        time: {
            type: Number,
            observer: "reset"
        },
        format: {
            type: String,
            value: "HH:mm:ss"
        },
        autoStart: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        timeData: (0, _utils.parseTimeData)(0),
        formattedTime: "0"
    },
    destroyed: function() {
        clearTimeout(this.tid), this.tid = null;
    },
    methods: {
        start: function() {
            this.counting || (this.counting = !0, this.endTime = Date.now() + this.remain, this.tick());
        },
        pause: function() {
            this.counting = !1, clearTimeout(this.tid);
        },
        reset: function() {
            this.pause(), this.remain = this.data.time, this.setRemain(this.remain), this.data.autoStart && this.start();
        },
        tick: function() {
            this.data.millisecond ? this.microTick() : this.macroTick();
        },
        microTick: function() {
            var t = this;
            this.tid = simpleTick(function() {
                t.setRemain(t.getRemain()), 0 !== t.remain && t.microTick();
            });
        },
        macroTick: function() {
            var i = this;
            this.tid = simpleTick(function() {
                var t = i.getRemain();
                (0, _utils.isSameSecond)(t, i.remain) && 0 !== t || i.setRemain(t), 0 !== i.remain && i.macroTick();
            });
        },
        getRemain: function() {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain: function(t) {
            this.remain = t;
            var i = (0, _utils.parseTimeData)(t);
            this.data.useSlot && this.$emit("change", i), this.setData({
                formattedTime: (0, _utils.parseFormat)(this.data.format, i)
            }), 0 === t && (this.pause(), this.$emit("finish"));
        }
    }
});