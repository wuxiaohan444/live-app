var _component = require("../common/component"), _utils = require("../common/utils");

function emit(e, t) {
    e.$emit("input", t), e.$emit("change", t);
}

(0, _component.VantComponent)({
    field: !0,
    relation: {
        name: "checkbox-group",
        type: "ancestor",
        linked: function(e) {
            this.parent = e;
        },
        unlinked: function() {
            this.parent = null;
        }
    },
    classes: [ "icon-class", "label-class" ],
    props: {
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: "round"
        },
        iconSize: {
            type: null,
            observer: "setSizeWithUnit"
        }
    },
    data: {
        sizeWithUnit: "20px"
    },
    methods: {
        emitChange: function(e) {
            this.parent ? this.setParentValue(this.parent, e) : emit(this, e);
        },
        toggle: function() {
            var e = this.data, t = e.disabled, i = e.value;
            t || this.emitChange(!i);
        },
        onClickLabel: function() {
            var e = this.data, t = e.labelDisabled, i = e.disabled, n = e.value;
            i || t || this.emitChange(!n);
        },
        setParentValue: function(e, t) {
            var i = e.data.value.slice(), n = this.data.name, a = e.data.max;
            if (t) {
                if (a && i.length >= a) return;
                -1 === i.indexOf(n) && (i.push(n), emit(e, i));
            } else {
                var l = i.indexOf(n);
                -1 !== l && (i.splice(l, 1), emit(e, i));
            }
        },
        setSizeWithUnit: function(e) {
            this.set({
                sizeWithUnit: (0, _utils.addUnit)(e)
            });
        }
    }
});