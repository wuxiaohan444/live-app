var _link = require("../mixins/link"), _component = require("../common/component");

(0, _component.VantComponent)({
    relation: {
        name: "grid",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    mixins: [ _link.link ],
    props: {
        icon: String,
        dot: Boolean,
        info: null,
        text: String,
        useSlot: Boolean
    },
    mounted: function() {
        this.updateStyle();
    },
    methods: {
        updateStyle: function() {
            if (this.parent) {
                var t = this.parent, n = t.data, i = t.children, e = n.columnNum, o = n.border, r = n.square, a = n.gutter, s = n.clickable, p = n.center, u = 100 / e + "%", c = [];
                if (c.push("width: " + u), r && c.push("padding-top: " + u), a) c.push("padding-right: " + a + "px"), 
                e <= i.indexOf(this) && c.push("margin-top: " + a + "px");
                this.setData({
                    style: c.join("; "),
                    center: p,
                    border: o,
                    square: r,
                    gutter: a,
                    clickable: s
                });
            }
        },
        onClick: function() {
            this.$emit("click"), this.jumpLink();
        }
    }
});