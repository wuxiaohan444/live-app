var _slicedToArray = function(e, t) {
    if (Array.isArray(e)) return e;
    if (Symbol.iterator in Object(e)) return function(e, t) {
        var r = [], n = !0, a = !1, o = void 0;
        try {
            for (var i, u = e[Symbol.iterator](); !(n = (i = u.next()).done) && (r.push(i.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (a) throw o;
            }
        }
        return r;
    }(e, t);
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

function _defineProperty(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var formatTime = function(e) {
    var t = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), a = e.getHours(), o = e.getMinutes(), i = e.getSeconds();
    return [ t, r, n ].map(formatNumber).join("/") + " " + [ a, o, i ].map(formatNumber).join(":");
}, $h = {
    Div: function(e, t) {
        e = parseFloat(e), t = parseFloat(t);
        var r, n, a = 0, o = 0;
        try {
            a = e.toString().split(".")[1].length;
        } catch (e) {}
        try {
            o = t.toString().split(".")[1].length;
        } catch (e) {}
        return r = Number(e.toString().replace(".", "")), n = Number(t.toString().replace(".", "")), 
        this.Mul(r / n, Math.pow(10, o - a));
    },
    Add: function(e, t) {
        var r, n, a;
        t = parseFloat(t);
        try {
            r = e.toString().split(".")[1].length;
        } catch (e) {
            r = 0;
        }
        try {
            n = t.toString().split(".")[1].length;
        } catch (e) {
            n = 0;
        }
        return a = Math.pow(100, Math.max(r, n)), (this.Mul(e, a) + this.Mul(t, a)) / a;
    },
    Sub: function(e, t) {
        var r, n, a, o;
        e = parseFloat(e), t = parseFloat(t);
        try {
            r = e.toString().split(".")[1].length;
        } catch (e) {
            r = 0;
        }
        try {
            n = t.toString().split(".")[1].length;
        } catch (e) {
            n = 0;
        }
        return a = Math.pow(10, Math.max(r, n)), o = n <= r ? r : n, ((this.Mul(e, a) - this.Mul(t, a)) / a).toFixed(o);
    },
    Mul: function(e, t) {
        e = parseFloat(e), t = parseFloat(t);
        var r = 0, n = e.toString(), a = t.toString();
        try {
            r += n.split(".")[1].length;
        } catch (e) {}
        try {
            r += a.split(".")[1].length;
        } catch (e) {}
        return Number(n.replace(".", "")) * Number(a.replace(".", "")) / Math.pow(10, r);
    }
}, formatNumber = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}, getUrlParams = function(e, t, r) {
    if ("string" != typeof e) return {};
    t = t || "&", r = r || "=";
    var n = {};
    if (-1 !== e.indexOf(t)) for (var a in e = e.split(t)) {
        if (-1 !== e[a].indexOf(r)) n[(o = e[a].split(r))[0]] = o[1];
    } else {
        if (-1 === e.indexOf(r)) return e;
        var o;
        n[(o = e.split(r))[0]] = o[1];
    }
    return n;
}, wxgetUserInfo = function() {
    return new Promise(function(t, r) {
        wx.getUserInfo({
            lang: "zh_CN",
            success: function(e) {
                t(e);
            },
            fail: function(e) {
                r(e);
            }
        });
    });
}, checkLogin = function() {
    var e = !!getApp().globalData.token, t = getApp().globalData.isLog, r = e && t;
    if (r) {
        var n = Math.round(new Date() / 1e3);
        if (getApp().globalData.expiresTime < n) return !1;
    }
    return r;
}, logout = function() {
    getApp().globalData.token = "", getApp().globalData.isLog = !1;
}, chekWxLogin = function() {
    return new Promise(function(r, n) {
        wx.getSetting({
            success: function(e) {
                if (!e.authSetting["scope.userInfo"]) return n({
                    authSetting: !1
                });
                wx.getStorage({
                    key: "cache_key",
                    success: function(t) {
                        if (checkLogin()) return r({
                            userinfo: getApp().globalData.userInfo,
                            isLogin: !0
                        });
                        wxgetUserInfo().then(function(e) {
                            return e.cache_key = t.data, r({
                                userInfo: e,
                                isLogin: !1
                            });
                        }).catch(function(e) {
                            return n(e);
                        });
                    },
                    fail: function() {
                        getCodeLogin(function(t) {
                            wxgetUserInfo().then(function(e) {
                                return e.code = t, r({
                                    userInfo: e,
                                    isLogin: !1
                                });
                            }).catch(function(e) {
                                return n(e);
                            });
                        });
                    }
                });
            },
            fail: function(e) {
                return n(e);
            }
        });
    });
}, autoLogin = function() {
    return new Promise(function(r, n) {
        wx.getStorage({
            key: "cache_key",
            success: function(t) {
                wxgetUserInfo().then(function(e) {
                    return e.cache_key = t.data, r(e);
                }).catch(function(e) {
                    return n(e);
                });
            },
            fail: function() {
                getCodeLogin(function(t) {
                    wxgetUserInfo().then(function(e) {
                        return e.code = t, r(e);
                    }).catch(function(e) {
                        return n(e);
                    });
                });
            }
        });
    });
}, getCodeLogin = function(t) {
    wx.login({
        success: function(e) {
            t(e);
        }
    });
}, compareVersion = function(e, t) {
    e = e.split("."), t = t.split(".");
    for (var r = Math.max(e.length, t.length); e.length < r; ) e.push("0");
    for (;t.length < r; ) t.push("0");
    for (var n = 0; n < r; n++) {
        var a = parseInt(e[n]), o = parseInt(t[n]);
        if (o < a) return 1;
        if (a < o) return -1;
    }
    return 0;
}, getDomain = function(e) {
    return e ? e.split("app/index.php")[0] : "";
}, SplitArray = function(e, t) {
    if ("object" != (void 0 === e ? "undefined" : _typeof(e))) return [];
    void 0 === t && (t = []);
    for (var r = 0; r < e.length; r++) t.push(e[r]);
    return t;
}, Tips = function(e, t) {
    "string" == typeof e && (t = e, e = {});
    var r = e.title || "", n = e.icon || "none", a = e.endtime || 2e3;
    if (r && wx.showToast({
        title: r,
        icon: n,
        duration: a
    }), null != t) if ("object" == (void 0 === t ? "undefined" : _typeof(t))) {
        var o = t.tab || 1, i = t.url || "";
        switch (o) {
          case 1:
            setTimeout(function() {
                wx.reLaunch({
                    url: i
                });
            }, a);
            break;

          case 2:
            setTimeout(function() {
                wx.navigateTo({
                    url: i
                });
            }, a);
            break;

          case 3:
            setTimeout(function() {
                wx.navigateBack({
                    delta: parseInt(i)
                });
            }, a);
            break;

          case 4:
            setTimeout(function() {
                wx.reLaunch({
                    url: i
                });
            }, a);
            break;

          case 5:
            setTimeout(function() {
                wx.redirectTo({
                    url: i
                });
            }, a);
        }
    } else "function" == typeof t ? setTimeout(function() {
        t && t();
    }, a) : setTimeout(function() {
        wx.navigateTo({
            url: t
        });
    }, r ? a : 0);
}, uploadImageOne = function(e, r, n) {
    if ("string" == typeof e) {
        var t = e;
        (e = {}).url = t;
    }
    var a = e.count || 1, o = e.sizeType || [ "compressed" ], i = e.sourceType || [ "album", "camera" ], u = (e.is_load, 
    e.url || ""), s = e.name || "image";
    wx.chooseImage({
        count: a,
        sizeType: o,
        sourceType: i,
        success: function(e) {
            wx.showLoading({
                title: "图片上传中"
            }), wx.uploadFile({
                url: getApp().globalData.url + "/" + u,
                filePath: e.tempFilePaths[0],
                name: s,
                formData: {
                    filename: s
                },
                header: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + getApp().globalData.token
                },
                success: function(e) {
                    if (wx.hideLoading(), 403 == e.statusCode) Tips({
                        title: e.data
                    }); else {
                        var t = e.data ? JSON.parse(e.data) : {};
                        200 == t.status ? r && r(t) : (n && n(t), Tips({
                            title: t.msg
                        }));
                    }
                },
                fail: function(e) {
                    wx.hideLoading(), Tips({
                        title: "上传图片失败"
                    });
                }
            });
        }
    });
}, ArrayRemove = function(e, t, r) {
    var n = [];
    if (e instanceof Array) for (var a = 0; a < e.length; a++) "number" == typeof t && e[t] != a ? n.push(e[a]) : "string" == typeof t && e[a][t] != r && n.push(e[a]);
    return n;
}, textByteLength = function(e, t) {
    for (var r = 0, n = 1, a = 0, o = [], i = 0; i < e.length; i++) 255 < e.charCodeAt(i) ? n * t < (r += 2) && (r++, 
    o.push(e.slice(a, i)), a = i, n++) : n * t < ++r && (o.push(e.slice(a, i)), a = i, 
    n++);
    return o.push(e.slice(a, e.length)), [ r, o, n ];
}, PosterCanvas = function(g, l, f, p) {
    wx.showLoading({
        title: "海报生成中",
        mask: !0
    });
    var h = wx.createCanvasContext("myCanvas");
    h.clearRect(0, 0, 0, 0), wx.getImageInfo({
        src: g[0],
        success: function(e) {
            var t = e.width, r = e.height;
            h.drawImage(g[0], 0, 0, t, r), h.drawImage(g[1], 0, 0, t, t), h.save();
            var n = t / 2 - 70;
            h.arc(n + 90, 1060, 90, 0, 2 * Math.PI), h.clip(), h.drawImage(g[2], n, 970, 180, 180), 
            h.restore();
            var a = textByteLength(l, 40), o = _slicedToArray(a, 3), i = (o[0], o[1]), u = o[2];
            if (2 < u) {
                u = 2;
                var s = i.slice(0, 2);
                s[s.length - 1] += "……", i = s;
            }
            h.setTextAlign("center"), h.setFontSize(32);
            for (var c = 0; c < i.length; c++) h.fillText(i[c], t / 2, 820 + 41.6 * c);
            h.setTextAlign("center"), h.setFontSize(48), h.setFillStyle("red"), f && h.fillText("￥" + f, t / 2, 931.6), 
            h.draw(!0, function() {
                wx.canvasToTempFilePath({
                    canvasId: "myCanvas",
                    fileType: "png",
                    destWidth: t,
                    destHeight: r,
                    success: function(e) {
                        wx.hideLoading(), p && p(e.tempFilePath);
                    }
                });
            });
        },
        fail: function() {
            wx.hideLoading(), Tips({
                title: "无法获取图片信息"
            });
        }
    });
}, AnimationNumber = function(t, e, r, n) {
    for (var a = $h.Sub(e, t), o = Math.abs(a), i = o < 6 ? o : 6, u = o < 6 ? 1 : Math.floor(a / 6), s = 0; s < i; s += 1) !function(e) {
        setTimeout(function() {
            r.setData(_defineProperty({}, n, $h.Add(t, u))), e == i - 1 && r.setData(_defineProperty({}, n, $h.Add(t, a)));
        }, 100 * (e + 1));
    }(s);
}, setCache = function(e, t, r) {
    var n = "_deadtime";
    wx.setStorageSync(e, t);
    var a = parseInt(r);
    if (0 < a) {
        var o = Date.parse(new Date());
        o = o / 1e3 + a, wx.setStorageSync(e + n, o + "");
    } else wx.removeStorageSync(e + n);
}, getCache = function(e, t) {
    var r = parseInt(wx.getStorageSync(e + "_deadtime"));
    if (r && parseInt(r) < Date.parse(new Date()) / 1e3) return t || void 0;
    var n = wx.getStorageSync(e);
    return n || t;
}, removeCache = function(e) {
    return wx.removeStorageSync(e), wx.removeStorageSync(e + "_deadtime"), !0;
}, getCurrentPageUrl = function() {
    var e = getCurrentPages();
    return e[e.length - 1].route;
}, getCurrentPageUrlWithArgs = function() {
    var e = getCurrentPages(), t = e[e.length - 1], r = t.route, n = t.options, a = r + "?";
    for (var o in n) {
        a += o + "=" + n[o] + "&";
    }
    return a = a.substring(0, a.length - 1);
}, parseURL = function(e) {
    for (var t = e.replace(/\?/, "&").split("&"), r = t[0], n = [], a = {}, o = [], i = 1; i < t.length; i++) a[(n = t[i].split("="))[0]] = n[1], 
    o.push(a);
    return {
        path: r,
        params: o
    };
};

function isIdCardNo(e) {
    if (e = e.toUpperCase(), !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(e)) return !1;
    var t, r;
    if (null == {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }[parseInt(e.substr(0, 2))]) return !1;
    if (15 == (t = e.length)) {
        r = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var n = e.match(r);
        if ((u = new Date("19" + n[2] + "/" + n[3] + "/" + n[4])).getYear() == Number(n[2]) && u.getMonth() + 1 == Number(n[3]) && u.getDate() == Number(n[4])) {
            var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), o = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), i = 0;
            for (e = e.substr(0, 6) + "19" + e.substr(6, e.length - 6), s = 0; s < 17; s++) i += e.substr(s, 1) * a[s];
            return e += o[i % 11], !0;
        }
        return !1;
    }
    if (18 == t) {
        r = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var u;
        n = e.match(r);
        if ((u = new Date(n[2] + "/" + n[3] + "/" + n[4])).getFullYear() == Number(n[2]) && u.getMonth() + 1 == Number(n[3]) && u.getDate() == Number(n[4])) {
            var s;
            a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), o = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), 
            i = 0;
            for (s = 0; s < 17; s++) i += e.substr(s, 1) * a[s];
            return o[i % 11] == e.substr(17, 1);
        }
        return !1;
    }
    return !1;
}

module.exports = {
    formatTime: formatTime,
    $h: $h,
    Tips: Tips,
    uploadImageOne: uploadImageOne,
    SplitArray: SplitArray,
    getDomain: getDomain,
    ArrayRemove: ArrayRemove,
    PosterCanvas: PosterCanvas,
    AnimationNumber: AnimationNumber,
    getUrlParams: getUrlParams,
    chekWxLogin: chekWxLogin,
    getCodeLogin: getCodeLogin,
    logout: logout,
    checkLogin: checkLogin,
    wxgetUserInfo: wxgetUserInfo,
    autoLogin: autoLogin,
    setCache: setCache,
    getCache: getCache,
    removeCache: removeCache,
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
    parseURL: parseURL,
    compareVersion: compareVersion,
    isIdCardNo: isIdCardNo
};