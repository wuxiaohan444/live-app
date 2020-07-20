var _component = require("../common/component"), _utils = require("../common/utils"), DEFAULT_DURATION = 200;

(0, _component.VantComponent)({
    classes: [ "active-class" ],
    props: {
        valueKey: String,
        className: String,
        itemHeight: Number,
        visibleItemCount: Number,
        initialOptions: {
            type: Array,
            value: []
        },
        defaultIndex: {
            type: Number,
            value: 0
        }
    },
    data: {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        options: [],
        currentIndex: 0
    },
    created: function() {
        var t = this, e = this.data, n = e.defaultIndex, i = e.initialOptions;
        this.set({
            currentIndex: n,
            options: i
        }).then(function() {
            t.setIndex(n);
        });
    },
    watch: {
        defaultIndex: function(t) {
            this.setIndex(t);
        }
    },
    methods: {
        getCount: function() {
            return this.data.options.length;
        },
        onTouchStart: function(t) {
            this.setData({
                startY: t.touches[0].clientY,
                startOffset: this.data.offset,
                duration: 0
            });
        },
        onTouchMove: function(t) {
            var e = this.data, n = t.touches[0].clientY - e.startY;
            this.setData({
                offset: (0, _utils.range)(e.startOffset + n, -this.getCount() * e.itemHeight, e.itemHeight)
            });
        },
        onTouchEnd: function() {
            var t = this.data;
            if (t.offset !== t.startOffset) {
                this.setData({
                    duration: DEFAULT_DURATION
                });
                var e = (0, _utils.range)(Math.round(-t.offset / t.itemHeight), 0, this.getCount() - 1);
                this.setIndex(e, !0);
            }
        },
        onClickItem: function(t) {
            var e = t.currentTarget.dataset.index;
            this.setIndex(e, !0);
        },
        adjustIndex: function(t) {
            for (var e = this.data, n = this.getCount(), i = t = (0, _utils.range)(t, 0, n); i < n; i++) if (!this.isDisabled(e.options[i])) return i;
            for (var s = t - 1; 0 <= s; s--) if (!this.isDisabled(e.options[s])) return s;
        },
        isDisabled: function(t) {
            return (0, _utils.isObj)(t) && t.disabled;
        },
        getOptionText: function(t) {
            var e = this.data;
            return (0, _utils.isObj)(t) && e.valueKey in t ? t[e.valueKey] : t;
        },
        setIndex: function(t, e) {
            var n = this, i = this.data, s = -(t = this.adjustIndex(t) || 0) * i.itemHeight;
            return t !== i.currentIndex ? this.set({
                offset: s,
                currentIndex: t
            }).then(function() {
                e && n.$emit("change", t);
            }) : this.set({
                offset: s
            });
        },
        setValue: function(t) {
            for (var e = this.data.options, n = 0; n < e.length; n++) if (this.getOptionText(e[n]) === t) return this.setIndex(n);
            return Promise.resolve();
        },
        getValue: function() {
            var t = this.data;
            return t.options[t.currentIndex];
        }
    }
});