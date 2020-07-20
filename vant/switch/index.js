var _component = require("../common/component"), _color = require("../common/color");

(0, _component.VantComponent)({
    field: !0,
    classes: [ "node-class" ],
    props: {
        checked: {
            type: null,
            observer: function(e) {
                var o = this.getLoadingColor(e);
                this.setData({
                    value: e,
                    loadingColor: o
                });
            }
        },
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: "30px"
        },
        activeValue: {
            type: null,
            value: !0
        },
        inactiveValue: {
            type: null,
            value: !1
        }
    },
    created: function() {
        var e = this.data.checked, o = this.getLoadingColor(e);
        this.setData({
            value: e,
            loadingColor: o
        });
    },
    methods: {
        getLoadingColor: function(e) {
            var o = this.data, t = o.activeColor, a = o.inactiveColor;
            return e ? t || _color.BLUE : a || _color.GRAY_DARK;
        },
        onClick: function() {
            var e = this.data, o = e.activeValue, t = e.inactiveValue;
            if (!this.data.disabled && !this.data.loading) {
                var a = this.data.checked === o ? t : o;
                this.$emit("input", a), this.$emit("change", a);
            }
        }
    }
});