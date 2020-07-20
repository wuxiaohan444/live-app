var _component = require("../common/component");

(0, _component.VantComponent)({
    props: {
        info: null,
        name: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: "tabbar",
        type: "ancestor"
    },
    data: {
        active: !1
    },
    methods: {
        onClick: function() {
            this.parent && this.parent.onChange(this), this.$emit("click");
        },
        updateFromParent: function() {
            var t = this.parent;
            if (t) {
                var e = t.children.indexOf(this), o = t.data, n = this.data, i = (n.name || e) === o.active, a = {};
                return i !== n.active && (a.active = i), o.activeColor !== n.activeColor && (a.activeColor = o.activeColor), 
                o.inactiveColor !== n.inactiveColor && (a.inactiveColor = o.inactiveColor), 0 < Object.keys(a).length ? this.set(a) : Promise.resolve();
            }
        }
    }
});