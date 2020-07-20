var _component = require("../common/component"), _utils = require("../common/utils");

(0, _component.VantComponent)({
    props: {
        dot: Boolean,
        info: null,
        size: {
            type: null,
            observer: "setSizeWithUnit"
        },
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: "van-icon"
        },
        name: {
            type: String,
            observer: function(t) {
                this.setData({
                    isImageName: -1 !== t.indexOf("/")
                });
            }
        }
    },
    data: {
        sizeWithUnit: null
    },
    methods: {
        onClick: function() {
            this.$emit("click");
        },
        setSizeWithUnit: function(t) {
            this.setData({
                sizeWithUnit: (0, _utils.addUnit)(t)
            });
        }
    }
});