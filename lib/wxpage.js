module.exports = function(n) {
    var r = {};
    function o(e) {
        if (r[e]) return r[e].exports;
        var t = r[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return n[e].call(t.exports, t, t.exports, o), t.l = !0, t.exports;
    }
    return o.m = n, o.c = r, o.i = function(e) {
        return e;
    }, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, o.p = "", o(o.s = 7);
}([ function(e, t, n) {
    function a(e, t) {
        return e && e.hasOwnProperty && e.hasOwnProperty(t);
    }
    var u = {
        type: function(e) {
            if (null === e) return "null";
            if (void 0 === e) return "undefined";
            var t = /\[object (\w+)\]/.exec(Object.prototype.toString.call(e));
            return t ? t[1].toLowerCase() : "";
        },
        extend: function(e) {
            if ("object" != u.type(e) && "function" != u.type(e)) return e;
            for (var t, n, r = 1, o = arguments.length; r < o; r++) for (n in t = arguments[r]) a(t, n) && (e[n] = t[n]);
            return e;
        },
        objEach: function(e, t) {
            if (e) for (var n in e) if (a(e, n) && !1 === t(n, e[n])) break;
        },
        nextTick: function() {
            var e = this;
            return function() {
                return setTimeout.apply(e, arguments);
            };
        }(),
        lock: function(t) {
            var n;
            return function() {
                if (!n) {
                    n = !0;
                    var e = [].slice.call(arguments, 0);
                    return e.unshift(function() {
                        n = !1;
                    }), t.apply(this, e);
                }
            };
        },
        queue: function(e, a) {
            var i = [], c = a = a || 1;
            return function() {
                if (i.push([ e, this, [].slice.call(arguments, 0) ]), c) return function e() {
                    var t = i.shift();
                    if (t) {
                        c--;
                        var n = t[0], r = t[1], o = t[2];
                        o.unshift(function() {
                            c++, e.apply(this, arguments);
                        }), u.nextTick(function() {
                            return n.apply(r, o);
                        });
                    } else c = a;
                }();
            };
        },
        delegator: function(t) {
            var r, o = [];
            return function(e) {
                if (r) return o.push(e);
                r = !0, t.call(this, function() {
                    r = !1;
                    var t = this, n = arguments;
                    e && e.apply(t, n), o.forEach(function(e) {
                        e && e.apply(t, n);
                    });
                });
            };
        },
        once: function(e) {
            var t, n = arguments;
            return function() {
                if (!t && e) return t = !0, e.apply(2 <= n.length ? n[1] : null, arguments);
            };
        },
        queryParse: function(e, t) {
            if (!e) return {};
            t = t || "&";
            var n = e.replace(/^\?/, ""), r = {}, o = n ? n.split(t) : null;
            return o && 0 < o.length && o.forEach(function(e) {
                var t = (e = e.split("=")).splice(0, 1), n = e.join("=");
                r[t] = n;
            }), r;
        },
        queryJoin: function(e, t, n) {
            var r, o = u.queryStringify(t, "&", n);
            return o ? (r = /[\?&]$/.test(e) ? "" : ~e.indexOf("?") ? "&" : "?", e + r + o) : e;
        },
        queryStringify: function(n, e, r) {
            return n ? Object.keys(n).map(function(e) {
                var t = n[e];
                return e + "=" + (r ? t : encodeURIComponent(t));
            }).join(e || "&") : "";
        },
        wrapFun: function(e, t) {
            return function() {
                try {
                    t && t.apply(this, arguments);
                } finally {
                    e && e.apply(this, arguments);
                }
            };
        }
    };
    e.exports = u;
}, function(e, t, n) {
    var c = n(0), r = +new Date(), o = "session_";
    console.log("[Session] Current ssid:", r);
    var a = {
        session: {
            set: function(e, t, n) {
                return a.set(o + e, t, -1 * r, n);
            },
            get: function(e, t) {
                return a.get(o + e, t);
            }
        },
        set: function(t, e, n, r) {
            "function" == c.type(n) ? (r = n, n = 0) : r && "function" != c.type(r) && (r = u);
            var o, a = {
                expr: 0,
                data: e
            };
            if (!0 === n) {
                var i = wx.getStorageSync("_cache_" + t);
                if (!i) return;
                a.expr = i.expr || 0, o = 1;
            }
            if (!o) {
                if (0 < (n = n || 0)) n += +new Date();
                a.expr = +n;
            }
            r ? wx.setStorage({
                key: "_cache_" + t,
                data: a,
                success: function() {
                    r();
                },
                fail: function(e) {
                    r(e || 'set "' + t + '" fail');
                }
            }) : wx.setStorageSync("_cache_" + t, a);
        },
        get: function(t, n) {
            if (!n) return i(t, wx.getStorageSync("_cache_" + t));
            "function" != c.type(n) && (n = u);
            var r = 'get "' + t + '" fail';
            wx.getStorage({
                key: "_cache_" + t,
                success: function(e) {
                    e && e.data ? n(null, i(t, e.data)) : n(e && e.errMsg || r);
                },
                fail: function(e) {
                    n(e || r);
                }
            });
        }
    };
    function i(e, t) {
        return t ? t.expr ? t.expr < 0 && -1 * t.expr == r ? t.data : 0 < t.expr && new Date() < t.expr ? t.data : (wx.removeStorage({
            key: e
        }), null) : t.data : null;
    }
    function u() {}
    e.exports = a;
}, function(e, t, n) {
    var a = n(0), i = {
        nameResolve: function() {}
    };
    e.exports = {
        set: function(e, t) {
            switch (e) {
              case "resolvePath":
                "function" == a.type(t) && (i.customRouteResolve = t);
                break;

              case "route":
                var n = a.type(t);
                if ("string" == n || "array" == n) {
                    var o = "string" == n ? [ t ] : t, r = o[0];
                    o = o.map(function(e) {
                        return new RegExp("^" + e.replace(/^\/?/, "/?").replace(/[\.]/g, "\\.").replace("$page", "([\\w\\-]+)"));
                    }), i.routeResolve = function(e) {
                        return r.replace("$page", e);
                    }, i.nameResolve = function(n) {
                        var r = "";
                        return o.some(function(e) {
                            var t = e.exec(n);
                            if (t) return r = t[1], !0;
                        }), r;
                    };
                } else console.error("Illegal routes option:", t);
                break;

              default:
                i[e] = t;
            }
        },
        get: function(e) {
            return i[e];
        }
    };
}, function(e, t, n) {
    function r() {
        this._evtObjs = {};
    }
    r.prototype.on = function(e, t, n) {
        this._evtObjs[e] || (this._evtObjs[e] = []), this._evtObjs[e].push({
            handler: t,
            once: n
        });
        var r = this;
        return function() {
            r.off(e, t);
        };
    }, r.prototype.off = function(e, r) {
        var t;
        t = e ? [ e ] : Object.keys(this._evtObjs);
        var o = this;
        return t.forEach(function(e) {
            if (r) {
                var t = o._evtObjs[e] || [], n = [];
                t.forEach(function(e) {
                    e.handler !== r && n.push(e);
                }), o._evtObjs[e] = n;
            } else o._evtObjs[e] = [];
        }), this;
    }, r.prototype.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        (this._evtObjs[e] || []).forEach(function(e) {
            if (!e.once || !e.called) {
                e.called = !0;
                try {
                    e.handler && e.handler.apply(null, t);
                } catch (e) {
                    console.error(e.stack || e.message || e);
                }
            }
        });
    }, r.prototype.assign = function(n) {
        var r = this;
        [ "on", "off", "emit", "assign" ].forEach(function(e) {
            var t = r[e];
            n[e] = function() {
                return t.apply(r, arguments);
            };
        });
    }, new r().assign(r), e.exports = r;
}, function(e, t, n) {
    var r, o, a, i = n(3), c = e.exports = new i();
    function u(e, t, n) {
        if (!a) return a = !0, clearTimeout(r), clearTimeout(o), r = setTimeout(function() {
            a = !1;
        }, 2e3), c.emit("navigateTo", t.url), wx[e] ? wx[e].apply(wx, n) : void 0;
    }
    c.on("page:ready", function() {
        o = setTimeout(function() {
            a = !1;
        }, 100);
    }), c.navigateTo = function(e) {
        return u("navigateTo", e, arguments);
    }, c.redirectTo = function(e) {
        return u("redirectTo", e, arguments);
    }, c.switchTab = function(e) {
        return u("switchTab", e, arguments);
    }, c.reLaunch = function(e) {
        return u("reLaunch", e, arguments);
    }, c.navigateBack = function() {
        return wx.navigateBack.apply(wx, arguments);
    };
}, function(e, t, n) {
    var r, a, o = n(1), i = n(4), c = n(2), u = n(0), f = $({
        type: "navigateTo"
    }), s = $({
        type: "redirectTo"
    }), p = $({
        type: "switchTab"
    }), l = $({
        type: "reLaunch"
    }), h = {
        navigate: f,
        redirect: s,
        switchTab: p,
        reLaunch: l
    }, g = m("navigate"), v = m("redirect"), d = m("switchTab"), y = m("reLaunch"), w = {};
    function $(e) {
        var o = e.type;
        return function(e, t) {
            var n = e.split(/\?/), r = n[0];
            if (/^[\w\-]+$/.test(r) && (r = (c.get("customRouteResolve") || c.get("routeResolve"))(r)), 
            !r) throw new Error("Invalid path:", r);
            (t = t || {}).url = r + (n[1] ? "?" + n[1] : ""), i[o](t);
        };
    }
    function m(e) {
        var i = h[e];
        return function(e) {
            if (e) {
                var t = e.currentTarget.dataset, n = t.before, r = t.after, o = t.url, a = this;
                try {
                    a && n && a[n] && a[n].call(a, e);
                } finally {
                    if (!o) return;
                    i(o), a && r && a[r] && a[r].call(a, e);
                }
            }
        };
    }
    function x(e) {
        wx.navigateBack({
            delta: e || 1
        });
    }
    function b(e) {
        var t = T(e);
        t && r && r.emit("preload:" + t, e, u.queryParse(e.split("?")[1]));
    }
    function _() {
        return getCurrentPages().slice(0).pop();
    }
    function T(e) {
        var t = /^[\w\-]+(?=\?|$)/.exec(e);
        return t ? t[0] : c.get("nameResolve")(e);
    }
    function P() {
        var e = _().route;
        return e ? T(e) : "";
    }
    function j(e, t) {
        return w[e] = t, this;
    }
    function k(e) {
        var t = w[e];
        return w[e] = null, t;
    }
    e.exports = {
        channel: w,
        dispatcher: function(e) {
            r = e;
        },
        ref: function(e) {
            a = e;
        },
        mount: function(e) {
            var t = e.detail;
            switch (t.type) {
              case "attached":
                var n = a && a(t.id);
                if (!n) return;
                var r = n._$ref;
                r && this.$refs && (this.$refs[r] = n), n._$attached(this);
                break;

              case "event:call":
                var o = this[t.method];
                o && o.apply(this, t.args);
            }
        },
        redirectDelegate: function(e, r) {
            [ "navigateTo", "redirectTo", "switchTab", "reLaunch" ].forEach(function(n) {
                e.on(n, function(e) {
                    var t = T(e);
                    t && r.emit(n + ":" + t, e, u.queryParse(e.split("?")[1]));
                });
            });
        },
        methods: function(e) {
            e.$cache = o, e.$session = o.session, e.$put = j, e.$take = k, e.$refs = {}, e.$route = e.$navigate = f, 
            e.$redirect = s, e.$switch = p, e.$launch = l, e.$back = x, e.$preload = b, e.$bindRoute = e.$bindNavigate = g, 
            e.$bindRedirect = v, e.$bindSwitch = d, e.$bindReLaunch = y, e.$curPage = _, e.$curPageName = P;
        },
        getPageName: T
    };
}, function(e, t, n) {
    var r, o = n(0), a = n(5), i = n(1), c = n(2), u = n(4), f = n(3), s = {
        fns: o,
        redirector: u,
        cache: i,
        message: f,
        dispatcher: r,
        channel: a.channel
    }, p = {}, l = 0;
    function h(e) {
        e || (console.error("Illegal component options."), e = {});
        var t = c.get("extendComponentBefore");
        t && t(e, s), e.created = o.wrapFun(e.created, function() {
            a.methods(this, r);
        }), e.attached = o.wrapFun(e.attached, function() {
            var e = ++l;
            this.$id = e, (p[e] = this)._$ref = this.properties.ref || this.properties._ref, 
            this.triggerEvent("ing", {
                id: this.$id,
                type: "attached"
            });
        }), e.detached = o.wrapFun(e.detached, function() {
            delete p[this.$id];
            var e = this.$parent && this.$parent.$refs, t = this._$ref;
            t && e && delete e[t], this.$parent = null;
        }), e.properties = o.extend({}, e.properties, {
            ref: {
                type: String,
                value: "",
                observer: function(e) {
                    if (this._$ref !== e) {
                        var t = this.$parent && this.$parent.$refs;
                        if (t) {
                            var n = t[this._$ref];
                            delete t[this._$ref], this._$ref = e, n && e && t[e];
                        }
                    }
                }
            }
        }), e.methods = o.extend({}, e.methods, {
            $set: function() {
                return this.setData.apply(this, arguments);
            },
            $data: function() {
                return this.data;
            },
            $emit: function() {
                if (r) return r.emit.apply(r, arguments);
            },
            $on: function() {
                return r ? r.on.apply(r, arguments) : function() {};
            },
            $off: function() {
                if (r) return r.off.apply(r, arguments);
            },
            $call: function(e) {
                var t = [].slice.call(arguments, 1);
                this.triggerEvent("ing", {
                    id: this.$id,
                    type: "event:call",
                    method: e,
                    args: t
                });
            },
            _$attached: function(e) {
                this.$root = e.$root || e, this.$parent = e;
            },
            $: a.mount
        }), Component(e);
    }
    h.getRef = function(e) {
        return p[e];
    }, a.ref(h.getRef), h.dispatcher = function(e) {
        r = e;
    }, Component.C = h, e.exports = h;
}, function(e, t, n) {
    var i = n(0), c = n(3), u = n(4), r = n(1), o = n(6), f = n(5), s = n(2), p = new c(), l = 0, h = 0, a = 0, g = 0, v = {
        fns: i,
        redirector: u,
        cache: r,
        message: c,
        dispatcher: p,
        channel: f.channel
    };
    function d(e, n) {
        "object" == i.type(e) && (e = (n = e).name || "_unknow");
        var t = new c(), r = s.get("extendPageBefore");
        if (r && r(e, n, v), n.onNavigate) {
            var o = function(e, t) {
                n.onNavigate({
                    url: e,
                    query: t
                });
            };
            p.on("navigateTo:" + e, o), p.on("redirectTo:" + e, o), p.on("switchTab:" + e, o), 
            p.on("reLaunch:" + e, o);
        }
        n.onPreload && p.on("preload:" + e, function(e, t) {
            n.onPreload({
                url: e,
                query: t
            });
        }), n.$state = {
            firstOpen: !1
        }, n.$emitter = t, f.methods(n), n.$on = function() {
            return p.on.apply(p, arguments);
        }, n.$emit = function() {
            return p.emit.apply(p, arguments);
        }, n.$off = function() {
            return p.off.apply(p, arguments);
        }, n.$ = f.mount, n.$setData = function(n, e) {
            if ("string" == i.type(n)) {
                var r = {};
                return i.objEach(e, function(e, t) {
                    r[n + "." + e] = t;
                }), this.setData(r);
            }
            if ("object" == i.type(n)) return this.setData(n);
        }, n.onLoad = i.wrapFun(n.onLoad, function() {
            var t = this;
            (n.onAwake && c.on("app:sleep", function(e) {
                n.onAwake.call(t, e);
            }), l) || (l = !0, this.$state.firstOpen = !0);
        }), n.onReady = i.wrapFun(n.onReady, function() {
            u.emit("page:ready");
        }), n.onPageLaunch && n.onPageLaunch(), n.onAppLaunch && (h ? n.onAppLaunch.apply(n, h) : p.on("app:launch", function(e) {
            n.onAppLaunch.apply(n, e);
        })), n.onAppShow && (h ? n.onAppShow.apply(n, h) : p.on("app:show", function(e) {
            n.onAppShow.apply(n, e);
        }));
        var a = s.get("extendPageAfter");
        return a && a(e, n, v), Page(n), n;
    }
    function y(t) {
        if (!t.config || !t.config.route || !t.config.route.length) throw new Error("config.route is necessary !");
        t.config && d.config(t.config);
        var n = t;
        t.onShow = t.onShow ? i.wrapFun(t.onShow, $) : $, t.onHide = t.onHide ? i.wrapFun(t.onHide, m) : m, 
        t.onLaunch = t.onLaunch ? i.wrapFun(t.onLaunch, w) : w, t.onLaunch = i.wrapFun(t.onLaunch, function() {
            n = this;
        }), t.onAwake && c.on("app:sleep", function(e) {
            t.onAwake.call(n, e);
        }), App(t);
    }
    function w() {
        h = [].slice.call(arguments), c.emit("app:launch", h);
    }
    function $() {
        try {
            a || (a = [].slice.call(arguments), c.emit("app:show", a));
        } finally {
            if (!g) return;
            var e = g;
            g = 0, c.emit("app:sleep", new Date() - e);
        }
    }
    function m() {
        g = new Date();
    }
    f.ref(o.getRef), f.dispatcher(p), o.dispatcher(p), f.redirectDelegate(u, p), Page.P = d, 
    Page.C = Component.C = d.C = d.Comp = d.Component = o, Page.A = App.A = d.A = d.App = d.Application = y, 
    d.redirector = u, d.message = c, d.cache = r, d.fns = i, d.getPageName = f.getPageName, 
    d.config = function(e, t) {
        return "object" == i.type(e) ? i.objEach(e, function(e, t) {
            s.set(e, t);
        }) : s.set(e, t), this;
    }, c.assign(d), c.assign(o), c.assign(y), e.exports = d;
} ]);