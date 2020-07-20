var _component = require("../common/component"), _button = require("../mixins/button"), _openType = require("../mixins/open-type");

(0, _component.VantComponent)({
    mixins: [ _button.button, _openType.openType ],
    classes: [ "hover-class", "loading-class" ],
    data: {
        style: ""
    },
    props: {
        icon: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: "circular"
        },
        type: {
            type: String,
            value: "default"
        },
        size: {
            type: String,
            value: "normal"
        },
        loadingSize: {
            type: String,
            value: "20px"
        },
        color: {
            type: String,
            observer: function(e) {
                var o = "";
                e && (o += "color: " + (this.data.plain ? e : "white") + ";", this.data.plain || (o += "background: " + e + ";"), 
                -1 !== e.indexOf("gradient") ? o += "border: 0;" : o += "border-color: " + e + ";"), 
                o !== this.data.style && this.setData({
                    style: o
                });
            }
        }
    },
    methods: {
        onClick: function() {
            this.data.disabled || this.data.loading || this.$emit("click");
        }
    }
});