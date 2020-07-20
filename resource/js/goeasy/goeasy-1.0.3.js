var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, e) {
    "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? exports.GoEasy = e() : t.GoEasy = e();
}(void 0, function() {
    return function(n) {
        function o(t) {
            if (i[t]) return i[t].exports;
            var e = i[t] = {
                exports: {},
                id: t,
                loaded: !1
            };
            return n[t].call(e.exports, e, e.exports, o), e.loaded = !0, e.exports;
        }
        var i = {};
        return o.m = n, o.c = i, o.p = "", o(0);
    }([ function(t, e, n) {
        var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, i = n(1), r = n(35), s = function() {
            this.currentNumber = this.initialCurrentNumber();
        };
        s.prototype = {
            maxNumber: parseInt("10"),
            number: function() {
                return this.currentNumber;
            },
            initialCurrentNumber: function() {
                var t = this;
                return f() || h() ? t.currentNumber || (t.currentNumber = p(1, parseInt("10"))) : t.currentNumber = parseInt(c("goeasyNode")), 
                0 < t.currentNumber && t.currentNumber < this.maxNumber ? t.currentNumber = t.currentNumber + 1 : t.currentNumber == this.maxNumber ? t.currentNumber = 1 : t.currentNumber = Math.floor(Math.random() * this.maxNumber + 1), 
                f() || h() || a("goeasyNode", t.currentNumber), t.currentNumber;
            }
        };
        var c = function(t) {
            return window.localStorage ? window.localStorage.getItem(t) : (n = new RegExp("(^| )" + t + "=([^;]*)(;|$)"), 
            (e = document.cookie.match(n)) ? unescape(e[2]) : null);
            var e, n;
        }, a = function(t, e) {
            var n, o, i;
            window.localStorage ? window.localStorage.setItem(t, e) : (n = t, o = e, (i = new Date()).setTime(i.getTime() + 2592e6), 
            document.cookie = n + "=" + escape(o) + ";expires=" + i.toGMTString());
        }, u = function() {
            Array.apply(this);
        }, p = function(t, e) {
            return Math.floor(Math.random() * (t - e) + e);
        }, h = function() {
            return !("undefined" == typeof wx || !wx.getLocation || "function" == typeof WebSocket && "function" == typeof XMLHttpRequest);
        }, f = function() {
            return "undefined" != typeof navigator && "ReactNative" == navigator.product;
        }, l = new s(), d = function(t) {
            if (JSON.stringify(t), this._isEmpty(t.appkey)) void 0 !== t.onConnectFailed && t.onConnectFailed({
                code: 400,
                content: "appkey is required"
            }); else if (this._copyConfig(t), void 0 !== t.host) {
                var e = "://" + l.number() + t.host, n = "";
                h() || f() ? (n = "object" === ("undefined" == typeof uni ? "undefined" : o(uni)) && uni.getSystemInfo ? "https://wx-" + t.host + ":443" : h() ? "https://wx-" + t.host + ":443" : t.forceTLS ? "https" + e + ":443" : "http" + e + ":80", 
                this.socket = i(n, {
                    transports: [ "websocket" ],
                    timeout: 1500
                })) : (n = t.forceTLS ? "https" + e + ":443" : "http" + e + ":80", this.socket = i.connect(n, {
                    transports: [ "polling", "websocket" ],
                    timeout: 1500
                })), this._callbackEvents(t);
            } else t.onConnectFailed({
                code: 400,
                content: "host is required"
            });
        };
        d.goEasyDomainNumber = l, (d.isWx = h)() ? wx._GoEasy_ = d : window._GoEasy_ = d, 
        Date.prototype.formatDate = function(t) {
            var e = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds()
            };
            for (var n in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))), 
            e) e.hasOwnProperty(n) && new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[n] : ("00" + e[n]).substr(("" + e[n]).length)));
            return t;
        }, (u.prototype = new Array()).indexOfGuid = function(t) {
            for (var e = 0; e < this.length; e++) if (this[e] == t) return e;
            return -1;
        }, d.prototype = {
            debug: !(u.prototype.unshiftGuid = function(t) {
                var e = !1, n = this.indexOfGuid(t);
                for (-1 < n && (e = !0, this.splice(n, 1)), this.unshift(t); 300 < this.length; ) this.pop();
                return e;
            }),
            socket: null,
            authorizeResult: null,
            channels: [],
            networkStatus: "initial",
            subscribeBuffer: [],
            maxRetries: 3,
            _manualConnect: !1,
            _manualDisconnectStatus: "initial",
            authorizeStatus: "initial",
            receivedGuids: new u(),
            _copyConfig: function(t) {
                this._appkey = t.appkey, this._otp = t.otp, this._isEmpty(t.userId) ? (this._userId = "anonymous-" + Math.floor(1e5 * Math.random() + 1), 
                t.userId = this._userId) : this._userId = this._trim(t.userId), this._isEmpty(t.userData) ? this._userData = "" : this._userData = this._trim(t.userData), 
                1 == t.debug && (this.debug = !0);
            },
            subscribe: function(t) {
                if (JSON.stringify(t), this._isEmpty(t.channel)) void 0 !== t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                }); else {
                    this.subscribeBuffer[t.channel] = t, JSON.stringify(this.subscribeBuffer[t.channel]);
                    null != this.authorizeResult && "connected" == this.networkStatus && (t.checking = !0, 
                    this.doSubscribeAndCheckAck(t));
                }
            },
            doSubscribe: function(e) {
                JSON.stringify(e);
                var n = this;
                if (200 == n.authorizeResult.code) if (this._isEmpty(e.channel)) n.sendlogs(), e.finish = !0; else {
                    var t = {
                        channel: e.channel,
                        sid: n.authorizeResult.sid
                    };
                    JSON.stringify(t), n.socket.emit("subscribe", t, function(t) {
                        JSON.stringify(t), 1 != e.finish && (e.finish = !0, delete n.subscribeBuffer[e.channel], 
                        JSON.stringify(e), 200 == t.resultCode ? void 0 !== (n.channels[e.channel] = e).onSuccess && e.onSuccess() : void 0 !== e.onFailed && e.onFailed({
                            code: t.resultCode,
                            content: t.content
                        }));
                    });
                } else n.authorizeResult.code;
            },
            doSubscribeAndCheckAck: function(t) {
                JSON.stringify(t), t.finish = !1;
                var e = this;
                e.doSubscribe(t);
                var n = setInterval(function() {
                    t.finish || "connected" != e.networkStatus ? (JSON.stringify(t), t.checking = !1, 
                    clearInterval(n)) : (JSON.stringify(t), e.doSubscribe(t));
                }, 1300);
            },
            subscribePresence: function(t) {
                return this._isEmpty(t.channel) ? void (void 0 !== t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                })) : (t.channel = t.channel + "_presence", void this.subscribe(t));
            },
            unsubscribe: function(e) {
                function n() {
                    200 == o.authorizeResult.code ? o.socket.emit("unsubscribe", {
                        sid: o.authorizeResult.sid,
                        channel: e.channel
                    }, function(t) {
                        i = !0, 200 == t.resultCode ? (delete o.channels[e.channel], JSON.stringify(e), 
                        void 0 !== e.onSuccess && e.onSuccess()) : void 0 !== e.onFailed && e.onFailed({
                            code: t.resultCode,
                            content: t.content
                        });
                    }) : (i = !0, void 0 !== e.onFailed && e.onFailed({
                        code: o.authorizeResult.code,
                        content: o.authorizeResult.content
                    }));
                }
                function t() {
                    n();
                    var t = setInterval(function() {
                        !i && "connected" == o.networkStatus && r < 0 ? (r++, n()) : r == o.maxRetries ? (clearInterval(t), 
                        void 0 !== e.onFailed && e.onFailed({
                            code: 408,
                            content: "Server unreachable or timeout"
                        })) : clearInterval(t);
                    }, 1e3);
                }
                if (this._isEmpty(e.channel)) return this.log("'channel' is required."), void (void 0 !== e.onFailed && e.onFailed({
                    code: 400,
                    content: "channel is required"
                }));
                if (void 0 === this.channels[e.channel]) return this.log("'channel' is not subscribed."), 
                void (void 0 !== e.onFailed && e.onFailed({
                    code: 400,
                    content: "channel[" + e.channel + "] is not subscribed"
                }));
                var o = this, i = !1, r = 0;
                if (null != this.authorizeResult && "connected" == o.networkStatus) t(); else var s = setInterval(function() {
                    null != o.authorizeResult && "connected" == o.networkStatus ? (clearInterval(s), 
                    t()) : ++r == o.maxRetries && (clearInterval(s), void 0 !== e.onFailed && e.onFailed({
                        code: 408,
                        content: "Server unreachable or timeout"
                    }));
                }, 1e3);
            },
            unsubscribePresence: function(t) {
                return this._isEmpty(t.channel) ? void (void 0 !== t.onFailed && t.onFailed({
                    code: 400,
                    content: "channel is required"
                })) : (t.channel = t.channel + "_presence", void this.unsubscribe(t));
            },
            publish: function(n) {
                function o(t) {
                    200 == i.authorizeResult.code ? i.socket.emit("publish", {
                        sid: i.authorizeResult.sid,
                        channel: n.channel,
                        content: n.message,
                        guid: t,
                        retried: s
                    }, function(t) {
                        r = !0, 200 == t.resultCode ? void 0 !== n.onSuccess && n.onSuccess() : void 0 !== n.onFailed && n.onFailed({
                            code: t.resultCode,
                            content: t.content
                        });
                    }) : (r = !0, void 0 !== n.onFailed && n.onFailed({
                        code: i.authorizeResult.code,
                        content: i.authorizeResult.content
                    }));
                }
                function t() {
                    var t = i.uuid_goeasy();
                    o(t);
                    var e = setInterval(function() {
                        !r && s < i.maxRetries ? (s++, o(t)) : s == i.maxRetries ? (clearInterval(e), void 0 !== n.onFailed && n.onFailed({
                            code: 408,
                            content: "Server unreachable or timeout"
                        })) : clearInterval(e);
                    }, 1e3);
                }
                if (this._isEmpty(n.channel)) return this.log("'channel' is required."), void (void 0 !== n.onFailed && n.onFailed({
                    code: 400,
                    content: "channel is required"
                }));
                if (this._isEmpty(n.message)) return this.log("'message' is required."), void (void 0 !== n.onFailed && n.onFailed({
                    code: 400,
                    content: "message is required"
                }));
                var i = this, r = !1, s = 0;
                if (null != this.authorizeResult && "connected" == i.networkStatus) t(); else var e = setInterval(function() {
                    null != i.authorizeResult && "connected" == i.networkStatus ? (clearInterval(e), 
                    t()) : ++s == i.maxRetries && (clearInterval(e), void 0 !== n.onFailed && n.onFailed({
                        code: 408,
                        content: "Server unreachable or timeout"
                    }));
                }, 1e3);
            },
            hereNow: function(t, e) {
                var n = {
                    channels: [],
                    includeUsers: !1,
                    distinct: !1
                };
                "undefined" !== t.channels && (n.channels = t.channels), 1 == t.includeUsers && (n.includeUsers = !0), 
                1 == t.distinct && (n.distinct = !0), this.socket.emit("hereNow", n, function(t) {
                    void 0 !== e && e(t);
                });
            },
            history: function(t, e) {
                return this._isEmpty(t.channel) ? void (void 0 !== e && e({
                    code: 400,
                    content: "channel is required"
                })) : void this.socket.emit("historyMessages", t, function(t) {
                    void 0 !== e && e(t);
                });
            },
            disconnect: function() {
                var t = this;
                if (this._manualDisconnectStatus = "disconnecting", "connected" === this.networkStatus && "authorized" === this.authorizeStatus && 200 === this.authorizeResult.code) {
                    t.tryEmit("manualDisconnect", null, function() {
                        t.socket.disconnect();
                    }, function() {
                        t._manualDisconnectStatus = "disconnected";
                    });
                } else this.socket.disconnect();
            },
            reconnect: function() {
                this._manualConnect = !0, this.socket.connect();
            },
            tryEmit: function(t, e, n, o) {
                function i() {
                    r.socket.emit(t, e, function(t) {
                        s = !0, void 0 !== o && o(t);
                    });
                }
                var r = this, s = !1, c = 0;
                i();
                var a = setInterval(function() {
                    var t = c === r.maxRetries;
                    s || t ? (clearInterval(a), t && void 0 !== n && n()) : (c++, i());
                }, 1e3);
            },
            _callbackEvents: function(i) {
                var r = this;
                this.socket.on("message", function(t, e) {
                    var n = JSON.parse(t);
                    r.receivedGuids.unshiftGuid(n.i) || (n.a && r.socket.emit("ack", {
                        publishGuid: n.i
                    }), r._endWith(n.n, "presence") ? void 0 !== r.channels[n.n].onPresence && r.channels[n.n].onPresence(JSON.parse(n.c)) : void 0 !== r.channels[n.n].onMessage && r.channels[n.n].onMessage({
                        time: n.t,
                        channel: n.n,
                        content: n.c
                    }));
                }), this.socket.on("connect", function() {
                    function t() {
                        JSON.stringify(e), r._isEmpty(e.artifactVersion) && r.sendlogs(), r.socket.emit("authorize", e, function(t) {
                            if (JSON.stringify(t), !o) if (o = !0, r.authorizeStatus = "authorized", r._manualDisconnectStatus = "initial", 
                            null == r.authorizeResult && (r.authorizeResult = {}), r.authorizeResult.code = t.resultCode, 
                            r.authorizeResult.content = t.content, 200 == t.resultCode) {
                                if (null == r.authorizeResult.sid) r.authorizeResult.sid = t.sid; else if (r.authorizeResult.sid != t.sid) for (var e in r.authorizeResult.sid = t.sid, 
                                r.channels) r.channels.hasOwnProperty(e) && (JSON.stringify(r.channels[e]), r.doSubscribeAndCheckAck(r.channels[e]));
                                for (var n in r.subscribeBuffer) r.subscribeBuffer.hasOwnProperty(n) && (JSON.stringify(r.subscribeBuffer[n]), 
                                r.doSubscribeAndCheckAck(r.subscribeBuffer[n]));
                                void 0 !== i.onConnected && i.onConnected();
                            } else void 0 !== i.onConnectFailed && i.onConnectFailed({
                                code: t.resultCode,
                                content: t.content
                            });
                        });
                    }
                    if ("disconnecting" !== r._manualDisconnectStatus && "disconnected" !== r._manualDisconnectStatus || r._manualConnect) {
                        r.authorizeStatus = "authorizing", r.networkStatus = "connected";
                        var e = {
                            appkey: r._appkey,
                            userId: r._userId,
                            userData: r._userData,
                            otp: r._otp,
                            artifactVersion: "1.0.3",
                            manual: r._manualConnect
                        };
                        null != r.authorizeResult && (e.sid = r.authorizeResult.sid);
                        var o = !1;
                        t();
                        var n = setInterval(function() {
                            o || "connected" != r.networkStatus ? clearInterval(n) : t();
                        }, 1300);
                    }
                }), this.socket.on("connect_error", function(t) {
                    void 0 !== i.onConnectFailed && i.onConnectFailed({
                        code: 408,
                        content: t
                    });
                }), this.socket.on("disconnect", function() {
                    r.networkStatus = "disconnected", r.authorizeStatus = "initial", r._manualConnect = !1, 
                    null == r.authorizeResult && (r.authorizeResult = {}), r.authorizeResult.code = 408, 
                    r.authorizeResult.content = "Server unreachable or timeout", void 0 !== i.onDisconnected && i.onDisconnected();
                });
            },
            _isEmpty: function(t) {
                return void 0 === t || null == t || 0 == this._trim(t).length;
            },
            _trim: function(t) {
                return t.replace(/(^\s*)|(\s*$)/g, "");
            },
            _endWith: function(t, e) {
                return new RegExp(e + "$").test(t);
            },
            log: function(t) {
                window.console && this.debug && console.log(t);
            },
            uuid_goeasy: function() {
                return r();
            },
            sendlogs: function() {}
        };
        var y, m = function(t) {
            return y || (y = new d(t)), y;
        };
        t.exports = m;
    }, function(t, e, n) {
        function o(t, e) {
            "object" === (void 0 === t ? "undefined" : a(t)) && (e = t, t = void 0), e = e || {};
            var n, o = u(t), i = o.source, r = o.id, s = o.path, c = h[r] && s in h[r].nsps;
            return e.forceNew || e["force new connection"] || !1 === e.multiplex || c ? n = p(i, e) : (h[r] || (h[r] = p(i, e)), 
            n = h[r]), o.query && !e.query && (e.query = o.query), n.socket(o.path, e);
        }
        var a = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, u = n(2), i = n(5), p = n(8);
        n(4)("socket.io-client"), t.exports = e = o;
        var h = e.managers = {};
        e.protocol = i.protocol, e.connect = o, e.Manager = n(8), e.Socket = n(30);
    }, function(t, e, n) {
        var i = n(3);
        n(4)("socket.io-client:url"), t.exports = function(t, e) {
            var n = t;
            e = e || "undefined" != typeof location && location, null == t && (t = e.protocol + "//" + e.host), 
            "string" == typeof t && ("/" === t.charAt(0) && (t = "/" === t.charAt(1) ? e.protocol + t : e.host + t), 
            /^(https?|wss?):\/\//.test(t) || (t = void 0 !== e ? e.protocol + "//" + t : "https://" + t), 
            n = i(t)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), 
            n.path = n.path || "/";
            var o = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
            return n.id = n.protocol + "://" + o + ":" + n.port, n.href = n.protocol + "://" + o + (e && e.port === n.port ? "" : ":" + n.port), 
            n;
        };
    }, function(t, e) {
        var c = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, a = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
        t.exports = function(t) {
            var e = t, n = t.indexOf("["), o = t.indexOf("]");
            -1 != n && -1 != o && (t = t.substring(0, n) + t.substring(n, o).replace(/:/g, ";") + t.substring(o, t.length));
            for (var i = c.exec(t || ""), r = {}, s = 14; s--; ) r[a[s]] = i[s] || "";
            return -1 != n && -1 != o && (r.source = e, r.host = r.host.substring(1, r.host.length - 1).replace(/;/g, ":"), 
            r.authority = r.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
            r.ipv6uri = !0), r;
        };
    }, function(t, e) {
        t.exports = function() {
            return function() {};
        };
    }, function(t, c, e) {
        function n() {}
        function o(t) {
            var e = "" + t.type;
            if (c.BINARY_EVENT !== t.type && c.BINARY_ACK !== t.type || (e += t.attachments + "-"), 
            t.nsp && "/" !== t.nsp && (e += t.nsp + ","), null != t.id && (e += t.id), null != t.data) {
                var n = function(t) {
                    try {
                        return JSON.stringify(t);
                    } catch (t) {
                        return !1;
                    }
                }(t.data);
                if (!1 === n) return p;
                e += n;
            }
            return e;
        }
        function i() {
            this.reconstructor = null;
        }
        function r(t) {
            var e = 0, n = {
                type: Number(t.charAt(0))
            };
            if (null == c.types[n.type]) return a("unknown packet type " + n.type);
            if (c.BINARY_EVENT === n.type || c.BINARY_ACK === n.type) {
                for (var o = ""; "-" !== t.charAt(++e) && (o += t.charAt(e), e != t.length); ) ;
                if (o != Number(o) || "-" !== t.charAt(e)) throw new Error("Illegal attachments");
                n.attachments = Number(o);
            }
            if ("/" === t.charAt(e + 1)) for (n.nsp = ""; ++e; ) {
                if ("," === (r = t.charAt(e))) break;
                if (n.nsp += r, e === t.length) break;
            } else n.nsp = "/";
            var i = t.charAt(e + 1);
            if ("" !== i && Number(i) == i) {
                for (n.id = ""; ++e; ) {
                    var r;
                    if (null == (r = t.charAt(e)) || Number(r) != r) {
                        --e;
                        break;
                    }
                    if (n.id += t.charAt(e), e === t.length) break;
                }
                n.id = Number(n.id);
            }
            if (t.charAt(++e)) {
                var s = function(t) {
                    try {
                        return JSON.parse(t);
                    } catch (t) {
                        return !1;
                    }
                }(t.substr(e));
                if (!(!1 !== s && (n.type === c.ERROR || u(s)))) return a("invalid payload");
                n.data = s;
            }
            return n;
        }
        function a(t) {
            return {
                type: c.ERROR,
                data: "parser error: " + t
            };
        }
        var s = (e(4)("socket.io-parser"), e(6)), u = e(7);
        c.protocol = 4, c.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
        c.CONNECT = 0, c.DISCONNECT = 1, c.EVENT = 2, c.ACK = 3, c.ERROR = 4, c.BINARY_EVENT = 5, 
        c.BINARY_ACK = 6, c.Encoder = n, c.Decoder = i;
        var p = c.ERROR + '"encode error"';
        n.prototype.encode = function(t, e) {
            e([ o(t) ]);
        }, s(i.prototype), i.prototype.add = function(t) {
            var e;
            if ("string" != typeof t) throw new Error("Unknown type: " + t);
            e = r(t), this.emit("decoded", e);
        }, i.prototype.destroy = function() {
            this.reconstructor && this.reconstructor.finishedReconstruction();
        };
    }, function(t, e, n) {
        function o(t) {
            if (t) return function(t) {
                for (var e in o.prototype) t[e] = o.prototype[e];
                return t;
            }(t);
        }
        (t.exports = o).prototype.on = o.prototype.addEventListener = function(t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), 
            this;
        }, o.prototype.once = function(t, e) {
            function n() {
                this.off(t, n), e.apply(this, arguments);
            }
            return n.fn = e, this.on(t, n), this;
        }, o.prototype.off = o.prototype.removeListener = o.prototype.removeAllListeners = o.prototype.removeEventListener = function(t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var n = this._callbacks["$" + t];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + t], this;
            for (var o, i = 0; i < n.length; i++) if ((o = n[i]) === e || o.fn === e) {
                n.splice(i, 1);
                break;
            }
            return this;
        }, o.prototype.emit = function(t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1), n = this._callbacks["$" + t];
            if (n) for (var o = 0, i = (n = n.slice(0)).length; o < i; ++o) n[o].apply(this, e);
            return this;
        }, o.prototype.listeners = function(t) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
        }, o.prototype.hasListeners = function(t) {
            return !!this.listeners(t).length;
        };
    }, function(t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == n.call(t);
        };
    }, function(t, e, n) {
        function o(t, e) {
            if (!(this instanceof o)) return new o(t, e);
            t && "object" === (void 0 === t ? "undefined" : i(t)) && (e = t, t = void 0), (e = e || {}).path = e.path || "/socket.io", 
            this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(!1 !== e.reconnection), 
            this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3), 
            this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5), 
            this.backoff = new f({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", 
            this.uri = t, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
            var n = e.parser || c;
            this.encoder = new n.Encoder(), this.decoder = new n.Decoder(), this.autoConnect = !1 !== e.autoConnect, 
            this.autoConnect && this.open();
        }
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, u = n(9), r = n(30), s = n(6), c = n(5), p = n(32), a = n(33), h = (n(4)("socket.io-client:manager"), 
        n(29)), f = n(34), l = Object.prototype.hasOwnProperty;
        (t.exports = o).prototype.emitAll = function() {
            for (var t in this.emit.apply(this, arguments), this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
        }, o.prototype.updateSocketIds = function() {
            for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
        }, o.prototype.generateId = function(t) {
            return ("/" === t ? "" : t + "#") + this.engine.id;
        }, s(o.prototype), o.prototype.reconnection = function(t) {
            return arguments.length ? (this._reconnection = !!t, this) : this._reconnection;
        }, o.prototype.reconnectionAttempts = function(t) {
            return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts;
        }, o.prototype.reconnectionDelay = function(t) {
            return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), 
            this) : this._reconnectionDelay;
        }, o.prototype.randomizationFactor = function(t) {
            return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), 
            this) : this._randomizationFactor;
        }, o.prototype.reconnectionDelayMax = function(t) {
            return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), 
            this) : this._reconnectionDelayMax;
        }, o.prototype.timeout = function(t) {
            return arguments.length ? (this._timeout = t, this) : this._timeout;
        }, o.prototype.maybeReconnectOnOpen = function() {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
        }, o.prototype.open = o.prototype.connect = function(i, t) {
            if (~this.readyState.indexOf("open")) return this;
            this.engine = u(this.uri, this.opts);
            var e = this.engine, r = this;
            this.readyState = "opening", this.skipReconnect = !1;
            var n = p(e, "open", function() {
                r.onopen(), i && i();
            }), s = window, o = p(e, "error", function(t) {
                if (s) {
                    var e = parseInt(r.uri.match(/[1-9][0-9]*/g)[0]), n = s._GoEasy_.goEasyDomainNumber.initialCurrentNumber();
                    r.uri = r.uri.replace(e, n);
                }
                if (r.cleanup(), r.readyState = "closed", r.emitAll("connect_error", t), i) {
                    var o = new Error("Connection error");
                    o.data = t, i(o);
                } else r.maybeReconnectOnOpen();
            });
            if (!1 !== this._timeout) {
                var c = this._timeout, a = setTimeout(function() {
                    n.destroy(), e.close(), e.emit("error", "timeout"), r.emitAll("connect_timeout", c);
                }, c);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(a);
                    }
                });
            }
            return this.subs.push(n), this.subs.push(o), this;
        }, o.prototype.onopen = function() {
            this.cleanup(), this.readyState = "open", this.emit("open");
            var t = this.engine;
            this.subs.push(p(t, "data", a(this, "ondata"))), this.subs.push(p(t, "ping", a(this, "onping"))), 
            this.subs.push(p(t, "pong", a(this, "onpong"))), this.subs.push(p(t, "error", a(this, "onerror"))), 
            this.subs.push(p(t, "close", a(this, "onclose"))), this.subs.push(p(this.decoder, "decoded", a(this, "ondecoded")));
        }, o.prototype.onping = function() {
            this.lastPing = new Date(), this.emitAll("ping");
        }, o.prototype.onpong = function() {
            this.emitAll("pong", new Date() - this.lastPing);
        }, o.prototype.ondata = function(t) {
            this.decoder.add(t);
        }, o.prototype.ondecoded = function(t) {
            this.emit("packet", t);
        }, o.prototype.onerror = function(t) {
            this.emitAll("error", t);
        }, o.prototype.socket = function(t, e) {
            function n() {
                ~h(i.connecting, o) || i.connecting.push(o);
            }
            var o = this.nsps[t];
            if (!o) {
                o = new r(this, t, e), this.nsps[t] = o;
                var i = this;
                o.on("connecting", n), o.on("connect", function() {
                    o.id = i.generateId(t);
                }), this.autoConnect && n();
            }
            return o;
        }, o.prototype.destroy = function(t) {
            var e = h(this.connecting, t);
            ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
        }, o.prototype.packet = function(n) {
            var o = this;
            n.query && 0 === n.type && (n.nsp += "?" + n.query), o.encoding ? o.packetBuffer.push(n) : (o.encoding = !0, 
            this.encoder.encode(n, function(t) {
                for (var e = 0; e < t.length; e++) o.engine.write(t[e], n.options);
                o.encoding = !1, o.processPacketQueue();
            }));
        }, o.prototype.processPacketQueue = function() {
            if (0 < this.packetBuffer.length && !this.encoding) {
                var t = this.packetBuffer.shift();
                this.packet(t);
            }
        }, o.prototype.cleanup = function() {
            for (var t = this.subs.length, e = 0; e < t; e++) {
                this.subs.shift().destroy();
            }
            this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
        }, o.prototype.close = o.prototype.disconnect = function() {
            this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), 
            this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
        }, o.prototype.onclose = function(t) {
            this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), 
            this._reconnection && !this.skipReconnect && this.reconnect();
        }, o.prototype.reconnect = function() {
            if (this.reconnecting || this.skipReconnect) return this;
            var e = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitAll("reconnect_failed"), 
            this.reconnecting = !1; else {
                var t = this.backoff.duration();
                this.reconnecting = !0;
                var n = setTimeout(function() {
                    e.skipReconnect || (e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), 
                    e.skipReconnect || e.open(function(t) {
                        t ? (e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : e.onreconnect();
                    }));
                }, t);
                this.subs.push({
                    destroy: function() {
                        clearTimeout(n);
                    }
                });
            }
        }, o.prototype.onreconnect = function() {
            var t = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t);
        };
    }, function(t, e, n) {
        t.exports = n(10), t.exports.parser = n(15);
    }, function(t, e, n) {
        function h(t, e) {
            return this instanceof h ? (e = e || {}, t && "object" === (void 0 === t ? "undefined" : o(t)) && (e = t, 
            t = null), t ? (t = a(t), e.hostname = t.host, e.secure = "https" === t.protocol || "wss" === t.protocol, 
            e.port = t.port, t.query && (e.query = t.query)) : e.host && (e.hostname = a(e.host).host), 
            this.secure = null != e.secure ? e.secure : "undefined" != typeof location && "https:" === location.protocol, 
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"), this.agent = e.agent || !1, 
            this.hostname = e.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), 
            this.port = e.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), 
            this.query = e.query || {}, "string" == typeof this.query && (this.query = u.decode(this.query)), 
            this.upgrade = !1 !== e.upgrade, this.path = (e.path || "/engine.io").replace(/\/$/, "") + "/", 
            this.forceJSONP = !!e.forceJSONP, this.jsonp = !1 !== e.jsonp, this.forceBase64 = !!e.forceBase64, 
            this.enablesXDR = !!e.enablesXDR, this.timestampParam = e.timestampParam || "t", 
            this.timestampRequests = e.timestampRequests, this.transports = e.transports || [ "polling", "websocket" ], 
            this.transportOptions = e.transportOptions || {}, this.readyState = "", this.writeBuffer = [], 
            this.prevBufferLen = 0, this.policyPort = e.policyPort || 843, this.rememberUpgrade = e.rememberUpgrade || !1, 
            this.binaryType = null, this.onlyBinaryUpgrades = e.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {}), 
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), 
            this.pfx = e.pfx || null, this.key = e.key || null, this.passphrase = e.passphrase || null, 
            this.cert = e.cert || null, this.ca = e.ca || null, this.ciphers = e.ciphers || null, 
            this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized, 
            this.forceNode = !!e.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), 
            ("undefined" == typeof self || this.isReactNative) && (e.extraHeaders && 0 < Object.keys(e.extraHeaders).length && (this.extraHeaders = e.extraHeaders), 
            e.localAddress && (this.localAddress = e.localAddress)), this.id = null, this.upgrades = null, 
            this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
            this.pingTimeoutTimer = null, void this.open()) : new h(t, e);
        }
        var o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, i = n(11), r = n(6), s = (n(4)("engine.io-client:socket"), n(29)), c = n(15), a = n(3), u = n(22);
        (t.exports = h).priorWebsocketSuccess = !1, r(h.prototype), h.protocol = c.protocol, 
        (h.Socket = h).Transport = n(14), h.transports = n(11), h.parser = n(15), h.prototype.createTransport = function(t) {
            var e = function(t) {
                var e = {};
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                return e;
            }(this.query);
            e.EIO = c.protocol, e.transport = t;
            var n = this.transportOptions[t] || {};
            return this.id && (e.sid = this.id), new i[t]({
                query: e,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0,
                isReactNative: this.isReactNative
            });
        }, h.prototype.open = function() {
            var t;
            if (this.rememberUpgrade && h.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) t = "websocket"; else {
                if (0 === this.transports.length) {
                    var e = this;
                    return void setTimeout(function() {
                        e.emit("error", "No transports available");
                    }, 0);
                }
                t = this.transports[0];
            }
            this.readyState = "opening";
            try {
                t = this.createTransport(t);
            } catch (t) {
                return this.transports.shift(), void this.open();
            }
            t.open(), this.setTransport(t);
        }, h.prototype.setTransport = function(t) {
            var e = this;
            this.transport && this.transport.removeAllListeners(), (this.transport = t).on("drain", function() {
                e.onDrain();
            }).on("packet", function(t) {
                e.onPacket(t);
            }).on("error", function(t) {
                e.onError(t);
            }).on("close", function() {
                e.onClose("transport close");
            });
        }, h.prototype.probe = function(t) {
            function e() {
                if (p.onlyBinaryUpgrades) {
                    var t = !this.supportsBinary && p.transport.supportsBinary;
                    u = u || t;
                }
                u || (a.send([ {
                    type: "ping",
                    data: "probe"
                } ]), a.once("packet", function(t) {
                    if (!u) if ("pong" === t.type && "probe" === t.data) {
                        if (p.upgrading = !0, p.emit("upgrading", a), !a) return;
                        h.priorWebsocketSuccess = "websocket" === a.name, p.transport.pause(function() {
                            u || "closed" !== p.readyState && (c(), p.setTransport(a), a.send([ {
                                type: "upgrade"
                            } ]), p.emit("upgrade", a), a = null, p.upgrading = !1, p.flush());
                        });
                    } else {
                        var e = new Error("probe error");
                        e.transport = a.name, p.emit("upgradeError", e);
                    }
                }));
            }
            function n() {
                u || (u = !0, c(), a.close(), a = null);
            }
            function o(t) {
                var e = new Error("probe error: " + t);
                e.transport = a.name, n(), p.emit("upgradeError", e);
            }
            function i() {
                o("transport closed");
            }
            function r() {
                o("socket closed");
            }
            function s(t) {
                a && t.name !== a.name && n();
            }
            function c() {
                a.removeListener("open", e), a.removeListener("error", o), a.removeListener("close", i), 
                p.removeListener("close", r), p.removeListener("upgrading", s);
            }
            var a = this.createTransport(t, {
                probe: 1
            }), u = !1, p = this;
            h.priorWebsocketSuccess = !1, a.once("open", e), a.once("error", o), a.once("close", i), 
            this.once("close", r), this.once("upgrading", s), a.open();
        }, h.prototype.onOpen = function() {
            if (this.readyState = "open", h.priorWebsocketSuccess = "websocket" === this.transport.name, 
            this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
        }, h.prototype.onPacket = function(t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (this.emit("packet", t), 
            this.emit("heartbeat"), t.type) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;

              case "pong":
                this.setPing(), this.emit("pong");
                break;

              case "error":
                var e = new Error("server error");
                e.code = t.data, this.onError(e);
                break;

              case "message":
                this.emit("data", t.data), this.emit("message", t.data);
            }
        }, h.prototype.onHandshake = function(t) {
            this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(t.upgrades), 
            this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), 
            "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), 
            this.on("heartbeat", this.onHeartbeat));
        }, h.prototype.onHeartbeat = function(t) {
            clearTimeout(this.pingTimeoutTimer);
            var e = this;
            e.pingTimeoutTimer = setTimeout(function() {
                "closed" !== e.readyState && e.onClose("ping timeout");
            }, t || e.pingInterval + e.pingTimeout);
        }, h.prototype.setPing = function() {
            var t = this;
            clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
                t.ping(), t.onHeartbeat(t.pingTimeout);
            }, t.pingInterval);
        }, h.prototype.ping = function() {
            var t = this;
            this.sendPacket("ping", function() {
                t.emit("ping");
            });
        }, h.prototype.onDrain = function() {
            this.writeBuffer.splice(0, this.prevBufferLen), (this.prevBufferLen = 0) === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }, h.prototype.flush = function() {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (this.transport.send(this.writeBuffer), 
            this.prevBufferLen = this.writeBuffer.length, this.emit("flush"));
        }, h.prototype.write = h.prototype.send = function(t, e, n) {
            return this.sendPacket("message", t, e, n), this;
        }, h.prototype.sendPacket = function(t, e, n, o) {
            if ("function" == typeof e && (o = e, e = void 0), "function" == typeof n && (o = n, 
            n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                (n = n || {}).compress = !1 !== n.compress;
                var i = {
                    type: t,
                    data: e,
                    options: n
                };
                this.emit("packetCreate", i), this.writeBuffer.push(i), o && this.once("flush", o), 
                this.flush();
            }
        }, h.prototype.close = function() {
            function t() {
                o.onClose("forced close"), o.transport.close();
            }
            function e() {
                o.removeListener("upgrade", e), o.removeListener("upgradeError", e), t();
            }
            function n() {
                o.once("upgrade", e), o.once("upgradeError", e);
            }
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var o = this;
                this.writeBuffer.length ? this.once("drain", function() {
                    this.upgrading ? n() : t();
                }) : this.upgrading ? n() : t();
            }
            return this;
        }, h.prototype.onError = function(t) {
            h.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t);
        }, h.prototype.onClose = function(t, e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
                this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
                this.id = null, this.emit("close", t, e), this.writeBuffer = [], this.prevBufferLen = 0;
            }
        }, h.prototype.filterUpgrades = function(t) {
            for (var e = [], n = 0, o = t.length; n < o; n++) ~s(this.transports, t[n]) && e.push(t[n]);
            return e;
        };
    }, function(t, e, n) {
        var r = n(12), o = n(27);
        e.polling = function(t) {
            var e = !1, n = !1;
            if (t.jsonp, "undefined" != typeof location) {
                var o = "https:" === location.protocol, i = location.port;
                i || (i = o ? 443 : 80), e = t.hostname !== location.hostname || i !== t.port, n = t.secure !== o;
            }
            return t.xdomain = e, t.xscheme = n, new r(t);
        }, e.websocket = o;
    }, function(n, t, c) {
        (function(o) {
            function i() {}
            function t(t) {
                if (r.call(this, t), this.query = this.query || {}, !s) {
                    var e = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== o ? o : {};
                    s = e.___eio = e.___eio || [];
                }
                this.index = s.length;
                var n = this;
                s.push(function(t) {
                    n.onData(t);
                }), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function() {
                    n.script && (n.script.onerror = i);
                }, !1);
            }
            var r = c(13), e = c(23);
            n.exports = t;
            var s, u = /\n/g, p = /\\n/g;
            e(t, r), t.prototype.supportsBinary = !1, t.prototype.doClose = function() {
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
                this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), 
                r.prototype.doClose.call(this);
            }, t.prototype.doPoll = function() {
                var e = this, t = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
                t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                    e.onError("jsonp poll error", t);
                };
                var n = document.getElementsByTagName("script")[0];
                n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), 
                this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout(function() {
                    var t = document.createElement("iframe");
                    document.body.appendChild(t), document.body.removeChild(t);
                }, 100);
            }, t.prototype.doWrite = function(t, e) {
                function n() {
                    o(), e();
                }
                function o() {
                    if (i.iframe) try {
                        i.form.removeChild(i.iframe);
                    } catch (t) {
                        i.onError("jsonp polling iframe removal error", t);
                    }
                    try {
                        var t = '<iframe src="javascript:0" name="' + i.iframeId + '">';
                        r = document.createElement(t);
                    } catch (t) {
                        (r = document.createElement("iframe")).name = i.iframeId, r.src = "javascript:0";
                    }
                    r.id = i.iframeId, i.form.appendChild(r), i.iframe = r;
                }
                var i = this;
                if (!this.form) {
                    var r, s = document.createElement("form"), c = document.createElement("textarea"), a = this.iframeId = "eio_iframe_" + this.index;
                    s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", 
                    s.style.left = "-1000px", s.target = a, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), 
                    c.name = "d", s.appendChild(c), document.body.appendChild(s), this.form = s, this.area = c;
                }
                this.form.action = this.uri(), o(), t = t.replace(p, "\\\n"), this.area.value = t.replace(u, "\\n");
                try {
                    this.form.submit();
                } catch (t) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                    "complete" === i.iframe.readyState && n();
                } : this.iframe.onload = n;
            };
        }).call(t, function() {
            return this;
        }());
    }, function(t, e, n) {
        function o(t) {
            var e = t && t.forceBase64;
            u && !e || (this.supportsBinary = !1), i.call(this, t);
        }
        var i = n(14), r = n(22), s = n(15), c = n(23), a = n(24);
        n(4)("engine.io-client:polling"), t.exports = o;
        var u = null != new (n(25))({
            xdomain: !1
        }).responseType;
        c(o, i), o.prototype.name = "polling", o.prototype.doOpen = function() {
            this.poll();
        }, o.prototype.pause = function(t) {
            function e() {
                n.readyState = "paused", t();
            }
            var n = this;
            if (this.readyState = "pausing", this.polling || !this.writable) {
                var o = 0;
                this.polling && (o++, this.once("pollComplete", function() {
                    --o || e();
                })), this.writable || (o++, this.once("drain", function() {
                    --o || e();
                }));
            } else e();
        }, o.prototype.poll = function() {
            this.polling = !0, this.doPoll(), this.emit("poll");
        }, o.prototype.onData = function(t) {
            var o = this;
            s.decodePayload(t, this.socket.binaryType, function(t, e, n) {
                return "opening" === o.readyState && o.onOpen(), "close" === t.type ? (o.onClose(), 
                !1) : void o.onPacket(t);
            }), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), 
            "open" === this.readyState && this.poll());
        }, o.prototype.doClose = function() {
            function t() {
                e.write([ {
                    type: "close"
                } ]);
            }
            var e = this;
            "open" === this.readyState ? t() : this.once("open", t);
        }, o.prototype.write = function(t) {
            var e = this;
            this.writable = !1;
            var n = function() {
                e.writable = !0, e.emit("drain");
            };
            s.encodePayload(t, this.supportsBinary, function(t) {
                e.doWrite(t, n);
            });
        }, o.prototype.uri = function() {
            var t = this.query || {}, e = this.secure ? "https" : "http", n = "";
            return !1 !== this.timestampRequests && (t[this.timestampParam] = a()), this.supportsBinary || t.sid || (t.b64 = 1), 
            t = r.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) && (n = ":" + this.port), 
            t.length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;
        };
    }, function(t, e, n) {
        function o(t) {
            this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, 
            this.query = t.query, this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, 
            this.readyState = "", this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, 
            this.pfx = t.pfx, this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, 
            this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized = t.rejectUnauthorized, 
            this.forceNode = t.forceNode, this.isReactNative = t.isReactNative, this.extraHeaders = t.extraHeaders, 
            this.localAddress = t.localAddress;
        }
        var i = n(15);
        n(6)((t.exports = o).prototype), o.prototype.onError = function(t, e) {
            var n = new Error(t);
            return n.type = "TransportError", n.description = e, this.emit("error", n), this;
        }, o.prototype.open = function() {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
            this.doOpen()), this;
        }, o.prototype.close = function() {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
            this.onClose()), this;
        }, o.prototype.send = function(t) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(t);
        }, o.prototype.onOpen = function() {
            this.readyState = "open", this.writable = !0, this.emit("open");
        }, o.prototype.onData = function(t) {
            var e = i.decodePacket(t, this.socket.binaryType);
            this.onPacket(e);
        }, o.prototype.onPacket = function(t) {
            this.emit("packet", t);
        }, o.prototype.onClose = function() {
            this.readyState = "closed", this.emit("close");
        };
    }, function(t, p, e) {
        var n = e(16), i = e(17), c = e(19), r = e(20);
        "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), 
        p.protocol = 3;
        var s = p.packets = {
            open: 0,
            close: 1,
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
        }, a = n(s), h = {
            type: "error",
            data: "parser error"
        }, u = e(21);
        p.encodePacket = function(t, e, n, o) {
            "function" == typeof e && (o = e, e = !1), "function" == typeof n && (o = n, n = null);
            var i = (void 0 === t.data || (t.data.buffer || t.data), s[t.type]);
            return void 0 !== t.data && (i += n ? r.encode(String(t.data), {
                strict: !1
            }) : String(t.data)), o("" + i);
        }, p.decodePacket = function(t, e, n) {
            if (void 0 === t) return h;
            if ("string" == typeof t) {
                if (n && !1 === (t = function(t) {
                    try {
                        t = r.decode(t, {
                            strict: !1
                        });
                    } catch (t) {
                        return !1;
                    }
                    return t;
                }(t))) return h;
                var o = t.charAt(0);
                return Number(o) == o && a[o] ? 1 < t.length ? {
                    type: a[o],
                    data: t.substring(1)
                } : {
                    type: a[o]
                } : h;
            }
            o = new Uint8Array(t)[0];
            var i = sliceBuffer(t, 1);
            return u && "blob" === e && (i = new u([ i ])), {
                type: a[o],
                data: i
            };
        }, p.encodePayload = function(t, e, n) {
            "function" == typeof e && (n = e, e = null);
            var o = i(t);
            return t.length ? void function(t, e, n) {
                for (var i = new Array(t.length), o = c(t.length, n), r = function(n, t, o) {
                    e(t, function(t, e) {
                        i[n] = e, o(t, i);
                    });
                }, s = 0; s < t.length; s++) r(s, t[s], o);
            }(t, function(t, n) {
                p.encodePacket(t, !!o && e, !1, function(t) {
                    var e;
                    n(null, (e = t).length + ":" + e);
                });
            }, function(t, e) {
                return n(e.join(""));
            }) : n("0:");
        }, p.decodePayload = function(t, e, n) {
            var o;
            if ("function" == typeof e && (n = e, e = null), "" === t) return n(h, 0, 1);
            for (var i, r, s = "", c = 0, a = t.length; c < a; c++) {
                var u = t.charAt(c);
                if (":" === u) {
                    if ("" === s || s != (i = Number(s))) return n(h, 0, 1);
                    if (s != (r = t.substr(c + 1, i)).length) return n(h, 0, 1);
                    if (r.length) {
                        if (o = p.decodePacket(r, e, !1), h.type === o.type && h.data === o.data) return n(h, 0, 1);
                        if (!1 === n(o, c + i, a)) return;
                    }
                    c += i, s = "";
                } else s += u;
            }
            return "" !== s ? n(h, 0, 1) : void 0;
        };
    }, function(t, e) {
        t.exports = Object.keys || function(t) {
            var e = [], n = Object.prototype.hasOwnProperty;
            for (var o in t) n.call(t, o) && e.push(o);
            return e;
        };
    }, function(t, e, n) {
        var r = n(18), o = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob), c = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        t.exports = function t(e) {
            if (!e || "object" != (void 0 === e ? "undefined" : _typeof(e))) return !1;
            if (r(e)) {
                for (var n = 0, o = e.length; n < o; n++) if (t(e[n])) return !0;
                return !1;
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || s && e instanceof Blob || c && e instanceof File) return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return t(e.toJSON(), !0);
            for (var i in e) if (Object.prototype.hasOwnProperty.call(e, i) && t(e[i])) return !0;
            return !1;
        };
    }, function(t, e) {
        var n = {}.toString;
        t.exports = Array.isArray || function(t) {
            return "[object Array]" == n.call(t);
        };
    }, function(t, e) {
        function s() {}
        t.exports = function(t, n, o) {
            function i(t, e) {
                if (i.count <= 0) throw new Error("after called too many times");
                --i.count, t ? (r = !0, n(t), n = o) : 0 !== i.count || r || n(null, e);
            }
            var r = !1;
            return o = o || s, 0 === (i.count = t) ? n() : i;
        };
    }, function(t, e) {
        function c(t) {
            for (var e, n, o = [], i = 0, r = t.length; i < r; ) 55296 <= (e = t.charCodeAt(i++)) && e <= 56319 && i < r ? 56320 == (64512 & (n = t.charCodeAt(i++))) ? o.push(((1023 & e) << 10) + (1023 & n) + 65536) : (o.push(e), 
            i--) : o.push(e);
            return o;
        }
        function o(t, e) {
            if (55296 <= t && t <= 57343) {
                if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
                return !1;
            }
            return !0;
        }
        function i(t, e) {
            return f(t >> e & 63 | 128);
        }
        function a(t, e) {
            if (0 == (4294967168 & t)) return f(t);
            var n = "";
            return 0 == (4294965248 & t) ? n = f(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (o(t, e) || (t = 65533), 
            n = f(t >> 12 & 15 | 224), n += i(t, 6)) : 0 == (4292870144 & t) && (n = f(t >> 18 & 7 | 240), 
            n += i(t, 12), n += i(t, 6)), n + f(63 & t | 128);
        }
        function r() {
            if (p <= h) throw Error("Invalid byte index");
            var t = 255 & u[h];
            if (h++, 128 == (192 & t)) return 63 & t;
            throw Error("Invalid continuation byte");
        }
        function s(t) {
            var e, n;
            if (p < h) throw Error("Invalid byte index");
            if (h == p) return !1;
            if (e = 255 & u[h], h++, 0 == (128 & e)) return e;
            if (192 == (224 & e)) {
                if (128 <= (n = (31 & e) << 6 | r())) return n;
                throw Error("Invalid continuation byte");
            }
            if (224 == (240 & e)) {
                if (2048 <= (n = (15 & e) << 12 | r() << 6 | r())) return o(n, t) ? n : 65533;
                throw Error("Invalid continuation byte");
            }
            if (240 == (248 & e) && (65536 <= (n = (7 & e) << 18 | r() << 12 | r() << 6 | r()) && n <= 1114111)) return n;
            throw Error("Invalid UTF-8 detected");
        }
        var u, p, h, f = String.fromCharCode;
        t.exports = {
            version: "2.1.2",
            encode: function(t, e) {
                for (var n = !1 !== (e = e || {}).strict, o = c(t), i = o.length, r = -1, s = ""; ++r < i; ) s += a(o[r], n);
                return s;
            },
            decode: function(t, e) {
                var n = !1 !== (e = e || {}).strict;
                u = c(t), p = u.length, h = 0;
                for (var o, i = []; !1 !== (o = s(n)); ) i.push(o);
                return function(t) {
                    for (var e, n = t.length, o = -1, i = ""; ++o < n; ) 65535 < (e = t[o]) && (i += f((e -= 65536) >>> 10 & 1023 | 55296), 
                    e = 56320 | 1023 & e), i += f(e);
                    return i;
                }(i);
            }
        };
    }, function(t, e) {
        function o(t) {
            return t.map(function(t) {
                if (t.buffer instanceof ArrayBuffer) {
                    var e = t.buffer;
                    if (t.byteLength !== e.byteLength) {
                        var n = new Uint8Array(t.byteLength);
                        n.set(new Uint8Array(e, t.byteOffset, t.byteLength)), e = n.buffer;
                    }
                    return e;
                }
                return t;
            });
        }
        function n(t, e) {
            e = e || {};
            var n = new r();
            return o(t).forEach(function(t) {
                n.append(t);
            }), e.type ? n.getBlob(e.type) : n.getBlob();
        }
        function i(t, e) {
            return new Blob(o(t), e || {});
        }
        var r = void 0 !== r ? r : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder, s = function() {
            try {
                return 2 === new Blob([ "hi" ]).size;
            } catch (t) {
                return !1;
            }
        }(), c = s && function() {
            try {
                return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
            } catch (t) {
                return !1;
            }
        }(), a = r && r.prototype.append && r.prototype.getBlob;
        "undefined" != typeof Blob && (n.prototype = Blob.prototype, i.prototype = Blob.prototype), 
        t.exports = s ? c ? Blob : i : a ? n : void 0;
    }, function(t, e) {
        e.encode = function(t) {
            var e = "";
            for (var n in t) t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
            return e;
        }, e.decode = function(t) {
            for (var e = {}, n = t.split("&"), o = 0, i = n.length; o < i; o++) {
                var r = n[o].split("=");
                e[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
            }
            return e;
        };
    }, function(t, e) {
        t.exports = function(t, e) {
            var n = function() {};
            n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
        };
    }, function(t, e) {
        function n(t) {
            for (var e = ""; e = r[t % s] + e, 0 < (t = Math.floor(t / s)); ) ;
            return e;
        }
        function o() {
            var t = n(+new Date());
            return t !== i ? (a = 0, i = t) : t + "." + n(a++);
        }
        for (var i, r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), s = 64, c = {}, a = 0, u = 0; u < s; u++) c[r[u]] = u;
        o.encode = n, o.decode = function(t) {
            var e = 0;
            for (u = 0; u < t.length; u++) e = e * s + c[t.charAt(u)];
            return e;
        }, t.exports = o;
    }, function(t, e, n) {
        var i = n(26);
        t.exports = function(t) {
            var e = t.xdomain, n = t.xscheme, o = t.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!e || i)) return new XMLHttpRequest();
            } catch (t) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest();
            } catch (t) {}
            if (!e) try {
                return new (self[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
            } catch (t) {}
        };
    }, function(t, e) {
        try {
            t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest();
        } catch (e) {
            t.exports = !1;
        }
    }, function(t, e, n) {
        function o(t) {
            t && t.forceBase64 && (this.supportsBinary = !1), "undefined" != typeof wx && "undefined" == typeof WebSocket || (this.perMessageDeflate = t.perMessageDeflate, 
            this.usingBrowserWebSocket = i && !t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (h = r)), 
            s.call(this, t);
        }
        var i, r, s = n(14), c = n(15), a = n(22), u = n(23), p = n(24);
        if (n(4)("engine.io-client:websocket"), "undefined" == typeof wx || "undefined" != typeof WebSocket) if ("undefined" != typeof WebSocket) i = WebSocket; else if ("undefined" != typeof self) i = self.WebSocket || self.MozWebSocket; else try {
            r = n(28);
        } catch (t) {}
        var h = i || r;
        "undefined" != typeof wx && "undefined" == typeof WebSocket && (h = function(t) {
            var e = this;
            e.onopen = function() {}, e.onclose = function() {}, e.onmessage = function(t) {}, 
            e.onerror = function(t) {}, e.send = function(t) {
                wx.sendSocketMessage({
                    data: t
                });
            }, e.close = function() {
                wx.closeSocket();
            }, wx.onSocketOpen(function(t) {
                e.onopen();
            }), wx.onSocketError(function(t) {
                e.onerror(t);
            }), wx.onSocketMessage(function(t) {
                e.onmessage(t);
            }), wx.onSocketClose(function(t) {
                e.onclose();
            }), wx.connectSocket({
                url: t
            });
        }), u(t.exports = o, s), o.prototype.name = "websocket", o.prototype.supportsBinary = !1, 
        o.prototype.doOpen = function() {
            if (this.check()) {
                var t, e, n = this.uri();
                "undefined" != typeof wx && "undefined" == typeof WebSocket || (t = this.protocols), 
                (e = "undefined" != typeof wx && "undefined" == typeof WebSocket ? {
                    agent: this.agent
                } : {
                    agent: this.agent,
                    perMessageDeflate: this.perMessageDeflate
                }).pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, 
                e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, 
                this.extraHeaders && (e.headers = this.extraHeaders), this.localAddress && (e.localAddress = this.localAddress);
                try {
                    "undefined" != typeof wx && "undefined" == typeof WebSocket ? this.ws = new h(n) : this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new h(n, t) : new h(n) : new h(n, t, e);
                } catch (t) {
                    return this.emit("error", t);
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, 
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
            }
        }, o.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen();
            }, this.ws.onclose = function() {
                e.onClose();
            }, this.ws.onmessage = function(t) {
                e.onData(t.data);
            }, this.ws.onerror = function(t) {
                e.onError("websocket error", t);
            };
        }, o.prototype.write = function(t) {
            var o = this;
            this.writable = !1;
            for (var i = t.length, e = 0, n = i; e < n; e++) !function(n) {
                c.encodePacket(n, o.supportsBinary, function(t) {
                    if ("undefined" != typeof wx && "undefined" == typeof WebSocket) try {
                        o.ws.send(t);
                    } catch (t) {} else {
                        if (!o.usingBrowserWebSocket) {
                            var e = {};
                            if (n.options && (e.compress = n.options.compress), o.perMessageDeflate) ("string" == typeof t ? Buffer.byteLength(t) : t.length) < o.perMessageDeflate.threshold && (e.compress = !1);
                        }
                        try {
                            o.usingBrowserWebSocket ? o.ws.send(t) : o.ws.send(t, e);
                        } catch (t) {}
                    }
                    --i || (o.emit("flush"), setTimeout(function() {
                        o.writable = !0, o.emit("drain");
                    }, 0));
                });
            }(t[e]);
        }, o.prototype.onClose = function() {
            s.prototype.onClose.call(this);
        }, o.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close();
        }, o.prototype.uri = function() {
            var t = this.query || {}, e = this.secure ? "wss" : "ws", n = "";
            return this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (n = ":" + this.port), 
            this.timestampRequests && (t[this.timestampParam] = p()), this.supportsBinary || (t.b64 = 1), 
            (t = a.encode(t)).length && (t = "?" + t), e + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + n + this.path + t;
        }, o.prototype.check = function() {
            return !(!h || "__initialize" in h && this.name === o.prototype.name);
        };
    }, function(t, e) {}, function(t, e) {
        var o = [].indexOf;
        t.exports = function(t, e) {
            if (o) return t.indexOf(e);
            for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
            return -1;
        };
    }, function(t, e, n) {
        function o(t, e, n) {
            this.io = t, this.nsp = e, (this.json = this).ids = 0, this.acks = {}, this.receiveBuffer = [], 
            this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, 
            n && n.query && (this.query = n.query), this.io.autoConnect && this.open();
        }
        var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : _typeof(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : _typeof(t);
        }, r = n(5), s = n(6), c = n(31), a = n(32), u = n(33), p = (n(4)("socket.io-client:socket"), 
        n(22)), h = n(17);
        t.exports = o;
        var f = {
            connect: 1,
            connect_error: 1,
            connect_timeout: 1,
            connecting: 1,
            disconnect: 1,
            error: 1,
            reconnect: 1,
            reconnect_attempt: 1,
            reconnect_failed: 1,
            reconnect_error: 1,
            reconnecting: 1,
            ping: 1,
            pong: 1
        }, l = s.prototype.emit;
        s(o.prototype), o.prototype.subEvents = function() {
            if (!this.subs) {
                var t = this.io;
                this.subs = [ a(t, "open", u(this, "onopen")), a(t, "packet", u(this, "onpacket")), a(t, "close", u(this, "onclose")) ];
            }
        }, o.prototype.open = o.prototype.connect = function() {
            return this.connected || (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), 
            this.emit("connecting")), this;
        }, o.prototype.send = function() {
            var t = c(arguments);
            return t.unshift("message"), this.emit.apply(this, t), this;
        }, o.prototype.emit = function(t) {
            if (f.hasOwnProperty(t)) return l.apply(this, arguments), this;
            var e = c(arguments), n = {
                type: (void 0 !== this.flags.binary ? this.flags.binary : h(e)) ? r.BINARY_EVENT : r.EVENT,
                data: e,
                options: {}
            };
            return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e.length - 1] && (this.acks[this.ids] = e.pop(), 
            n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, 
            this;
        }, o.prototype.packet = function(t) {
            t.nsp = this.nsp, this.io.packet(t);
        }, o.prototype.onopen = function() {
            if ("/" !== this.nsp) if (this.query) {
                var t = "object" === i(this.query) ? p.encode(this.query) : this.query;
                this.packet({
                    type: r.CONNECT,
                    query: t
                });
            } else this.packet({
                type: r.CONNECT
            });
        }, o.prototype.onclose = function(t) {
            this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t);
        }, o.prototype.onpacket = function(t) {
            var e = t.nsp === this.nsp, n = t.type === r.ERROR && "/" === t.nsp;
            if (e || n) switch (t.type) {
              case r.CONNECT:
                this.onconnect();
                break;

              case r.EVENT:
              case r.BINARY_EVENT:
                this.onevent(t);
                break;

              case r.ACK:
              case r.BINARY_ACK:
                this.onack(t);
                break;

              case r.DISCONNECT:
                this.ondisconnect();
                break;

              case r.ERROR:
                this.emit("error", t.data);
            }
        }, o.prototype.onevent = function(t) {
            var e = t.data || [];
            null != t.id && e.push(this.ack(t.id)), this.connected ? l.apply(this, e) : this.receiveBuffer.push(e);
        }, o.prototype.ack = function(e) {
            var n = this, o = !1;
            return function() {
                if (!o) {
                    o = !0;
                    var t = c(arguments);
                    n.packet({
                        type: h(t) ? r.BINARY_ACK : r.ACK,
                        id: e,
                        data: t
                    });
                }
            };
        }, o.prototype.onack = function(t) {
            var e = this.acks[t.id];
            "function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id]);
        }, o.prototype.onconnect = function() {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered();
        }, o.prototype.emitBuffered = function() {
            var t;
            for (t = 0; t < this.receiveBuffer.length; t++) l.apply(this, this.receiveBuffer[t]);
            for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
            this.sendBuffer = [];
        }, o.prototype.ondisconnect = function() {
            this.destroy(), this.onclose("io server disconnect");
        }, o.prototype.destroy = function() {
            if (this.subs) {
                for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
                this.subs = null;
            }
            this.io.destroy(this);
        }, o.prototype.close = o.prototype.disconnect = function() {
            return this.connected && this.packet({
                type: r.DISCONNECT
            }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
        }, o.prototype.compress = function(t) {
            return this.flags.compress = t, this;
        }, o.prototype.binary = function(t) {
            return this.flags.binary = t, this;
        };
    }, function(t, e) {
        t.exports = function(t, e) {
            for (var n = [], o = (e = e || 0) || 0; o < t.length; o++) n[o - e] = t[o];
            return n;
        };
    }, function(t, e) {
        t.exports = function(t, e, n) {
            return t.on(e, n), {
                destroy: function() {
                    t.removeListener(e, n);
                }
            };
        };
    }, function(t, e) {
        var o = [].slice;
        t.exports = function(t, e) {
            if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
            var n = o.call(arguments, 2);
            return function() {
                return e.apply(t, n.concat(o.call(arguments)));
            };
        };
    }, function(t, e) {
        function n(t) {
            t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, 
            this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
        }
        (t.exports = n).prototype.duration = function() {
            var t = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var e = Math.random(), n = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
            }
            return 0 | Math.min(t, this.max);
        }, n.prototype.reset = function() {
            this.attempts = 0;
        }, n.prototype.setMin = function(t) {
            this.ms = t;
        }, n.prototype.setMax = function(t) {
            this.max = t;
        }, n.prototype.setJitter = function(t) {
            this.jitter = t;
        };
    }, function(t, e, n) {
        var d, y, m = n(36), v = n(37), g = 0, b = 0;
        t.exports = function(t, e, n) {
            var o = e && n || 0, i = e || [], r = (t = t || {}).node || d, s = void 0 !== t.clockseq ? t.clockseq : y;
            if (null == r || null == s) {
                var c = m();
                null == r && (r = d = [ 1 | c[0], c[1], c[2], c[3], c[4], c[5] ]), null == s && (s = y = 16383 & (c[6] << 8 | c[7]));
            }
            var a = void 0 !== t.msecs ? t.msecs : new Date().getTime(), u = void 0 !== t.nsecs ? t.nsecs : b + 1, p = a - g + (u - b) / 1e4;
            if (p < 0 && void 0 === t.clockseq && (s = s + 1 & 16383), (p < 0 || g < a) && void 0 === t.nsecs && (u = 0), 
            1e4 <= u) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            g = a, y = s;
            var h = (1e4 * (268435455 & (a += 122192928e5)) + (b = u)) % 4294967296;
            i[o++] = h >>> 24 & 255, i[o++] = h >>> 16 & 255, i[o++] = h >>> 8 & 255, i[o++] = 255 & h;
            var f = a / 4294967296 * 1e4 & 268435455;
            i[o++] = f >>> 8 & 255, i[o++] = 255 & f, i[o++] = f >>> 24 & 15 | 16, i[o++] = f >>> 16 & 255, 
            i[o++] = s >>> 8 | 128, i[o++] = 255 & s;
            for (var l = 0; l < 6; ++l) i[o + l] = r[l];
            return e || v(i);
        };
    }, function(t, e) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var o = new Uint8Array(16);
            t.exports = function() {
                return n(o), o;
            };
        } else {
            var i = new Array(16);
            t.exports = function() {
                for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), 
                i[e] = t >>> ((3 & e) << 3) & 255;
                return i;
            };
        }
    }, function(t, e) {
        for (var i = [], n = 0; n < 256; ++n) i[n] = (n + 256).toString(16).substr(1);
        t.exports = function(t, e) {
            var n = e || 0, o = i;
            return [ o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], "-", o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]], o[t[n++]] ].join("");
        };
    } ]);
});