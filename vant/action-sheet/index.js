var _component = require("../common/component");

(0, _component.VantComponent)({
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: !0
        },
        closeOnClickAction: {
            type: Boolean,
            value: !0
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    },
    methods: {
        onSelect: function(e) {
            var o = e.currentTarget.dataset.index, t = this.data.actions[o];
            !t || t.disabled || t.loading || (this.$emit("select", t), this.data.closeOnClickAction && this.onClose());
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onClose: function() {
            this.$emit("close");
        },
        onClickOverlay: function() {
            this.$emit("click-overlay"), this.onClose();
        }
    }
});