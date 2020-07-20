var _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        name: "tabbar-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e), e.parent = this, e.updateFromParent();
        },
        unlinked: function(t) {
            this.children = this.children.filter(function(e) {
                return e !== t;
            }), this.updateChildren();
        }
    },
    data: {
        deviceType: ""
    },
    props: {
        active: {
            type: null,
            observer: "updateChildren"
        },
        activeColor: {
            type: String,
            observer: "updateChildren"
        },
        inactiveColor: {
            type: String,
            observer: "updateChildren"
        },
        fixed: {
            type: Boolean,
            value: !0
        },
        border: {
            type: Boolean,
            value: !0
        },
        zIndex: {
            type: Number,
            value: 1
        },
        deviceType: {
            type: String,
            observer: ""
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: !0
        }
    },
    beforeCreate: function() {
        this.children = [];
    },
    methods: {
        updateChildren: function() {
            var e = this.children;
            return Array.isArray(e) && e.length ? Promise.all(e.map(function(e) {
                return e.updateFromParent();
            })) : Promise.resolve();
        },
        onChange: function(e) {
            var t = this.children.indexOf(e), n = e.data.name || t;
            n !== this.data.active && this.$emit("change", n);
        }
    }
});