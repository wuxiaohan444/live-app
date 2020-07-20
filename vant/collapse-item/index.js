var _component = require("../common/component"), nextTick = function() {
    return new Promise(function(t) {
        return setTimeout(t, 20);
    });
};

(0, _component.VantComponent)({
    classes: [ "title-class", "content-class" ],
    relation: {
        name: "collapse",
        type: "ancestor",
        linked: function(t) {
            this.parent = t;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        clickable: Boolean,
        border: {
            type: Boolean,
            value: !0
        },
        isLink: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        contentHeight: 0,
        expanded: !1,
        transition: !1
    },
    mounted: function() {
        var n = this;
        this.updateExpanded().then(nextTick).then(function() {
            var t = {
                transition: !0
            };
            n.data.expanded && (t.contentHeight = "auto"), n.setData(t);
        });
    },
    methods: {
        updateExpanded: function() {
            if (!this.parent) return Promise.resolve();
            var t = this.parent.data, n = t.value, e = t.accordion, i = this.parent.children, a = void 0 === i ? [] : i, o = this.data.name, s = a.indexOf(this), r = null == o ? s : o, c = e ? n === r : (n || []).some(function(t) {
                return t === r;
            }), d = [];
            return c !== this.data.expanded && d.push(this.updateStyle(c)), d.push(this.set({
                index: s,
                expanded: c
            })), Promise.all(d);
        },
        updateStyle: function(n) {
            var e = this;
            return this.getRect(".van-collapse-item__content").then(function(t) {
                return t.height;
            }).then(function(t) {
                return n ? e.set({
                    contentHeight: t ? t + "px" : "auto"
                }) : e.set({
                    contentHeight: t + "px"
                }).then(nextTick).then(function() {
                    return e.set({
                        contentHeight: 0
                    });
                });
            });
        },
        onClick: function() {
            if (!this.data.disabled) {
                var t = this.data, n = t.name, e = t.expanded, i = this.parent.children.indexOf(this), a = null == n ? i : n;
                this.parent.switch(a, !e);
            }
        },
        onTransitionEnd: function() {
            this.data.expanded && this.setData({
                contentHeight: "auto"
            });
        }
    }
});