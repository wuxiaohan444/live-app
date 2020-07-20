var _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        name: "sidebar-item",
        type: "descendant",
        linked: function(e) {
            this.children.push(e), this.setActive(this.data.activeKey);
        },
        unlinked: function(t) {
            this.items = this.children.filter(function(e) {
                return e !== t;
            }), this.setActive(this.data.activeKey);
        }
    },
    props: {
        activeKey: {
            type: Number,
            value: 0,
            observer: "setActive"
        }
    },
    beforeCreate: function() {
        this.children = [], this.currentActive = -1;
    },
    methods: {
        setActive: function(e) {
            var t = this.children, i = this.currentActive;
            if (!t.length) return Promise.resolve();
            var n = [];
            return i !== (this.currentActive = e) && t[i] && n.push(t[i].setActive(!1)), t[e] && n.push(t[e].setActive(!0)), 
            Promise.all(n);
        }
    }
});