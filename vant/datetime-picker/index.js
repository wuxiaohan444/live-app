var _slicedToArray = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var a = [], n = !0, r = !1, u = void 0;
        try {
            for (var i, o = e[Symbol.iterator](); !(n = (i = o.next()).done) && (a.push(i.value), 
            !t || a.length !== t); n = !0) ;
        } catch (e) {
            r = !0, u = e;
        } finally {
            try {
                !n && o.return && o.return();
            } finally {
                if (r) throw u;
            }
        }
        return a;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _component = require("../common/component"), _utils = require("../common/utils"), _shared = require("../picker/shared");

function _defineProperty(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var currentYear = new Date().getFullYear();

function isValidDate(e) {
    return (0, _utils.isDef)(e) && !isNaN(new Date(e).getTime());
}

function range(e, t, a) {
    return Math.min(Math.max(e, t), a);
}

function padZero(e) {
    return ("00" + e).slice(-2);
}

function times(e, t) {
    for (var a = -1, n = Array(e < 0 ? 0 : e); ++a < e; ) n[a] = t(a);
    return n;
}

function getTrueValue(e) {
    if (e) {
        for (;isNaN(parseInt(e, 10)); ) e = e.slice(1);
        return parseInt(e, 10);
    }
}

function getMonthEndDay(e, t) {
    return 32 - new Date(e, t - 1, 32).getDate();
}

var defaultFormatter = function(e, t) {
    return t;
};

(0, _component.VantComponent)({
    classes: [ "active-class", "toolbar-class", "column-class" ],
    props: Object.assign(Object.assign({}, _shared.pickerProps), {
        value: null,
        filter: null,
        type: {
            type: String,
            value: "datetime"
        },
        showToolbar: {
            type: Boolean,
            value: !0
        },
        formatter: {
            type: null,
            value: defaultFormatter
        },
        minDate: {
            type: Number,
            value: new Date(currentYear - 10, 0, 1).getTime()
        },
        maxDate: {
            type: Number,
            value: new Date(currentYear + 10, 11, 31).getTime()
        },
        minHour: {
            type: Number,
            value: 0
        },
        maxHour: {
            type: Number,
            value: 23
        },
        minMinute: {
            type: Number,
            value: 0
        },
        maxMinute: {
            type: Number,
            value: 59
        }
    }),
    data: {
        innerValue: Date.now(),
        columns: []
    },
    watch: {
        value: "updateValue",
        type: "updateValue",
        minDate: "updateValue",
        maxDate: "updateValue",
        minHour: "updateValue",
        maxHour: "updateValue",
        minMinute: "updateValue",
        maxMinute: "updateValue"
    },
    methods: {
        updateValue: function() {
            var e = this, t = this.data, a = this.correctValue(this.data.value);
            a === t.innerValue ? this.updateColumns() : this.updateColumnValue(a).then(function() {
                e.$emit("input", a);
            });
        },
        getPicker: function() {
            if (null == this.picker) {
                this.picker = this.selectComponent(".van-datetime-picker");
                var n = this.picker, r = n.setColumnValues;
                n.setColumnValues = function() {
                    for (var e = arguments.length, t = Array(e), a = 0; a < e; a++) t[a] = arguments[a];
                    return r.apply(n, [].concat(t, [ !1 ]));
                };
            }
            return this.picker;
        },
        updateColumns: function() {
            var e = this.data.formatter, a = void 0 === e ? defaultFormatter : e, t = this.getOriginColumns().map(function(t) {
                return {
                    values: t.values.map(function(e) {
                        return a(t.type, e);
                    })
                };
            });
            return this.set({
                columns: t
            });
        },
        getOriginColumns: function() {
            var r = this.data.filter;
            return this.getRanges().map(function(e) {
                var a = e.type, n = e.range, t = times(n[1] - n[0] + 1, function(e) {
                    var t = n[0] + e;
                    return t = "year" === a ? "" + t : padZero(t);
                });
                return r && (t = r(a, t)), {
                    type: a,
                    values: t
                };
            });
        },
        getRanges: function() {
            var e = this.data;
            if ("time" === e.type) return [ {
                type: "hour",
                range: [ e.minHour, e.maxHour ]
            }, {
                type: "minute",
                range: [ e.minMinute, e.maxMinute ]
            } ];
            var t = this.getBoundary("max", e.innerValue), a = t.maxYear, n = t.maxDate, r = t.maxMonth, u = t.maxHour, i = t.maxMinute, o = this.getBoundary("min", e.innerValue), l = o.minYear, s = o.minDate, m = [ {
                type: "year",
                range: [ l, a ]
            }, {
                type: "month",
                range: [ o.minMonth, r ]
            }, {
                type: "day",
                range: [ s, n ]
            }, {
                type: "hour",
                range: [ o.minHour, u ]
            }, {
                type: "minute",
                range: [ o.minMinute, i ]
            } ];
            return "date" === e.type && m.splice(3, 2), "year-month" === e.type && m.splice(2, 3), 
            m;
        },
        correctValue: function(e) {
            var t = this.data, a = "time" !== t.type;
            if (a && !isValidDate(e)) e = t.minDate; else if (!a && !e) {
                e = padZero(t.minHour) + ":00";
            }
            if (!a) {
                var n = e.split(":"), r = _slicedToArray(n, 2), u = r[0], i = r[1];
                return (u = padZero(range(u, t.minHour, t.maxHour))) + ":" + (i = padZero(range(i, t.minMinute, t.maxMinute)));
            }
            return e = Math.max(e, t.minDate), e = Math.min(e, t.maxDate);
        },
        getBoundary: function(e, t) {
            var a, n = new Date(t), r = new Date(this.data[e + "Date"]), u = r.getFullYear(), i = 1, o = 1, l = 0, s = 0;
            return "max" === e && (i = 12, o = getMonthEndDay(n.getFullYear(), n.getMonth() + 1), 
            l = 23, s = 59), n.getFullYear() === u && (i = r.getMonth() + 1, n.getMonth() + 1 === i && (o = r.getDate(), 
            n.getDate() === o && (l = r.getHours(), n.getHours() === l && (s = r.getMinutes())))), 
            _defineProperty(a = {}, e + "Year", u), _defineProperty(a, e + "Month", i), _defineProperty(a, e + "Date", o), 
            _defineProperty(a, e + "Hour", l), _defineProperty(a, e + "Minute", s), a;
        },
        onCancel: function() {
            this.$emit("cancel");
        },
        onConfirm: function() {
            this.$emit("confirm", this.data.innerValue);
        },
        onChange: function() {
            var e = this, t = this.data, a = void 0, n = this.getPicker();
            if ("time" === t.type) {
                var r = n.getIndexes();
                a = +t.columns[0].values[r[0]] + ":" + +t.columns[1].values[r[1]];
            } else {
                var u = n.getValues(), i = getTrueValue(u[0]), o = getTrueValue(u[1]), l = getMonthEndDay(i, o), s = getTrueValue(u[2]);
                "year-month" === t.type && (s = 1), s = l < s ? l : s;
                var m = 0, p = 0;
                "datetime" === t.type && (m = getTrueValue(u[3]), p = getTrueValue(u[4])), a = new Date(i, o - 1, s, m, p);
            }
            a = this.correctValue(a), this.updateColumnValue(a).then(function() {
                e.$emit("input", a), e.$emit("change", n);
            });
        },
        updateColumnValue: function(e) {
            var t = this, a = [], n = this.data, r = n.type, u = n.formatter, i = void 0 === u ? defaultFormatter : u, o = this.getPicker();
            if ("time" === r) {
                var l = e.split(":");
                a = [ i("hour", l[0]), i("minute", l[1]) ];
            } else {
                var s = new Date(e);
                a = [ i("year", "" + s.getFullYear()), i("month", padZero(s.getMonth() + 1)) ], 
                "date" === r && a.push(i("day", padZero(s.getDate()))), "datetime" === r && a.push(i("day", padZero(s.getDate())), i("hour", padZero(s.getHours())), i("minute", padZero(s.getMinutes())));
            }
            return this.set({
                innerValue: e
            }).then(function() {
                return t.updateColumns();
            }).then(function() {
                return o.setValues(a);
            });
        }
    },
    created: function() {
        var e = this, t = this.correctValue(this.data.value);
        this.updateColumnValue(t).then(function() {
            e.$emit("input", t);
        });
    }
});