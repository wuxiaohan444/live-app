var _component = require("../common/component"), _button = require("../mixins/button"), _openType = require("../mixins/open-type"), _utils = require("../common/utils"), _color = require("../common/color");

function _defineProperty(t, n, o) {
    return n in t ? Object.defineProperty(t, n, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[n] = o, t;
}

(0, _component.VantComponent)({
    mixins: [ _button.button, _openType.openType ],
    props: {
        show: Boolean,
        title: String,
        message: String,
        useSlot: Boolean,
        className: String,
        customStyle: String,
        asyncClose: Boolean,
        messageAlign: String,
        overlayStyle: String,
        useTitleSlot: Boolean,
        showCancelButton: Boolean,
        closeOnClickOverlay: Boolean,
        confirmButtonOpenType: String,
        width: {
            type: null,
            observer: "setWidthWithUnit"
        },
        zIndex: {
            type: Number,
            value: 2e3
        },
        confirmButtonText: {
            type: String,
            value: "确认"
        },
        cancelButtonText: {
            type: String,
            value: "取消"
        },
        confirmButtonColor: {
            type: String,
            value: _color.BLUE
        },
        cancelButtonColor: {
            type: String,
            value: _color.GRAY
        },
        showConfirmButton: {
            type: Boolean,
            value: !0
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        transition: {
            type: String,
            value: "scale"
        }
    },
    data: {
        loading: {
            confirm: !1,
            cancel: !1
        }
    },
    watch: {
        show: function(t) {
            !t && this.stopLoading();
        }
    },
    methods: {
        onConfirm: function() {
            this.handleAction("confirm");
        },
        onCancel: function() {
            this.handleAction("cancel");
        },
        onClickOverlay: function() {
            this.onClose("overlay");
        },
        handleAction: function(t) {
            this.data.asyncClose && this.setData(_defineProperty({}, "loading." + t, !0)), this.onClose(t);
        },
        close: function() {
            this.setData({
                show: !1
            });
        },
        stopLoading: function() {
            this.setData({
                loading: {
                    confirm: !1,
                    cancel: !1
                }
            });
        },
        onClose: function(t) {
            this.data.asyncClose || this.close(), this.$emit("close", t), this.$emit(t, {
                dialog: this
            });
            var n = this.data["confirm" === t ? "onConfirm" : "onCancel"];
            n && n(this);
        },
        setWidthWithUnit: function(t) {
            this.setData({
                widthWithUnit: (0, _utils.addUnit)(t)
            });
        }
    }
});