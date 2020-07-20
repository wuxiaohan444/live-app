var _slicedToArray = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var n = [], i = !0, r = !1, s = void 0;
        try {
            for (var c, a = e[Symbol.iterator](); !(i = (c = a.next()).done) && (n.push(c.value), 
            !t || n.length !== t); i = !0) ;
        } catch (e) {
            r = !0, s = e;
        } finally {
            try {
                !i && a.return && a.return();
            } finally {
                if (r) throw s;
            }
        }
        return n;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), _shared = require("../picker/shared"), COLUMNSPLACEHOLDERCODE = "000000";

(0, _component.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign(Object.assign({}, _shared.pickerProps), {
        value: {
            type: String,
            observer: function(e) {
                this.code = e, this.setValues();
            }
        },
        areaList: {
            type: Object,
            value: {},
            observer: "setValues"
        },
        columnsNum: {
            type: null,
            value: 3,
            observer: function(e) {
                this.setData({
                    displayColumns: this.data.columns.slice(0, +e)
                });
            }
        },
        columnsPlaceholder: {
            type: Array,
            observer: function(e) {
                this.setData({
                    typeToColumnsPlaceholder: {
                        province: e[0] || "",
                        city: e[1] || "",
                        county: e[2] || ""
                    }
                });
            }
        }
    }),
    data: {
        columns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ],
        displayColumns: [ {
            values: []
        }, {
            values: []
        }, {
            values: []
        } ],
        typeToColumnsPlaceholder: {}
    },
    mounted: function() {
        var e = this;
        setTimeout(function() {
            e.setValues();
        }, 0);
    },
    methods: {
        getPicker: function() {
            return null == this.picker && (this.picker = this.selectComponent(".van-area__picker")), 
            this.picker;
        },
        onCancel: function(e) {
            this.emit("cancel", e.detail);
        },
        onConfirm: function(e) {
            var t = e.detail.index, n = e.detail.value;
            n = this.parseOutputValues(n), this.emit("confirm", {
                value: n,
                index: t
            });
        },
        emit: function(e, t) {
            t.values = t.value, delete t.value, this.$emit(e, t);
        },
        parseOutputValues: function(e) {
            var n = this.data.columnsPlaceholder;
            return e.map(function(e, t) {
                return e && ((e = JSON.parse(JSON.stringify(e))).code && e.name !== n[t] || (e.code = "", 
                e.name = "")), e;
            });
        },
        onChange: function(e) {
            var t = this, n = e.detail, i = n.index, r = n.picker, s = n.value;
            this.code = s[i].code, this.setValues().then(function() {
                t.$emit("change", {
                    picker: r,
                    values: t.parseOutputValues(r.getValues()),
                    index: i
                });
            });
        },
        getConfig: function(e) {
            var t = this.data.areaList;
            return t && t[e + "_list"] || {};
        },
        getList: function(e, t) {
            var n = this.data.typeToColumnsPlaceholder, i = [];
            if ("province" !== e && !t) return i;
            var r = this.getConfig(e);
            if (i = Object.keys(r).map(function(e) {
                return {
                    code: e,
                    name: r[e]
                };
            }), t && ("9" === t[0] && "city" === e && (t = "9"), i = i.filter(function(e) {
                return 0 === e.code.indexOf(t);
            })), n[e] && i.length) {
                var s = "province" === e ? "" : "city" === e ? COLUMNSPLACEHOLDERCODE.slice(2, 4) : COLUMNSPLACEHOLDERCODE.slice(4, 6);
                i.unshift({
                    code: "" + t + s,
                    name: n[e]
                });
            }
            return i;
        },
        getIndex: function(e, t) {
            var n = "province" === e ? 2 : "city" === e ? 4 : 6, i = this.getList(e, t.slice(0, n - 2));
            "9" === t[0] && "province" === e && (n = 1), t = t.slice(0, n);
            for (var r = 0; r < i.length; r++) if (i[r].code.slice(0, n) === t) return r;
            return 0;
        },
        setValues: function() {
            var e = this, t = this.getConfig("county"), n = this.code;
            n || (n = this.data.columnsPlaceholder.length ? COLUMNSPLACEHOLDERCODE : Object.keys(t)[0] ? Object.keys(t)[0] : "");
            var i = this.getList("province"), r = this.getList("city", n.slice(0, 2)), s = this.getPicker();
            if (s) {
                var c = [];
                if (c.push(s.setColumnValues(0, i, !1)), c.push(s.setColumnValues(1, r, !1)), r.length && "00" === n.slice(2, 4)) {
                    var a = _slicedToArray(r, 1);
                    n = a[0].code;
                }
                return c.push(s.setColumnValues(2, this.getList("county", n.slice(0, 4)), !1)), 
                Promise.all(c).catch(function() {}).then(function() {
                    return s.setIndexes([ e.getIndex("province", n), e.getIndex("city", n), e.getIndex("county", n) ]);
                }).catch(function() {});
            }
        },
        getValues: function() {
            var e = this.getPicker();
            return e ? e.getValues().filter(function(e) {
                return !!e;
            }) : [];
        },
        getDetail: function() {
            var e = this.getValues(), t = {
                code: "",
                country: "",
                province: "",
                city: "",
                county: ""
            };
            if (!e.length) return t;
            var n = e.map(function(e) {
                return e.name;
            });
            return t.code = e[e.length - 1].code, "9" === t.code[0] ? (t.country = n[1] || "", 
            t.province = n[2] || "") : (t.province = n[0] || "", t.city = n[1] || "", t.county = n[2] || ""), 
            t;
        },
        reset: function(e) {
            return this.code = e || "", this.setValues();
        }
    }
});