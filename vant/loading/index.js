var _component = require("../common/component"), _utils = require("../common/utils");

(0, _component.VantComponent)({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: "circular"
        },
        size: {
            type: String,
            observer: "setSizeWithUnit"
        },
        textSize: {
            type: String,
            observer: "setTextSizeWithUnit"
        }
    },
    methods: {
        setSizeWithUnit: function(t) {
            this.setData({
                sizeWithUnit: (0, _utils.addUnit)(t)
            });
        },
        setTextSizeWithUnit: function(t) {
            this.set({
                textSizeWithUnit: (0, _utils.addUnit)(t)
            });
        }
    }
});