var _pen = require("./lib/pen"), _pen2 = _interopRequireDefault(_pen), _downloader = require("./lib/downloader"), _downloader2 = _interopRequireDefault(_downloader);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var util = require("./lib/util"), downloader = new _downloader2.default(), MAX_PAINT_COUNT = 5;

Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    paintCount: 0,
    properties: {
        customStyle: {
            type: String
        },
        palette: {
            type: Object,
            observer: function(t, e) {
                this.isNeedRefresh(t, e) && (this.paintCount = 0, this.startPaint());
            }
        },
        dirty: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        picURL: "",
        showCanvas: !0,
        painterStyle: ""
    },
    attached: function() {
        setStringPrototype();
    },
    methods: {
        isEmpty: function(t) {
            for (var e in t) return !1;
            return !0;
        },
        isNeedRefresh: function(t, e) {
            return !(!t || this.isEmpty(t) || this.data.dirty && util.equal(t, e));
        },
        startPaint: function() {
            var r = this;
            if (!this.isEmpty(this.properties.palette)) {
                if (!getApp().systemInfo || !getApp().systemInfo.screenWidth) try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (t) {
                    var e = "Painter get system info failed, " + JSON.stringify(t);
                    return that.triggerEvent("imgErr", {
                        error: e
                    }), void console.log(e);
                }
                screenK = getApp().systemInfo.screenWidth / 750, this.downloadImages().then(function(t) {
                    var e = t.width, n = t.height;
                    if (r.canvasWidthInPx = e.toPx(), r.canvasHeightInPx = n.toPx(), e && n) {
                        r.setData({
                            painterStyle: "width:" + e + ";height:" + n + ";"
                        });
                        var i = wx.createCanvasContext("k-canvas", r);
                        new _pen2.default(i, t).paint(function() {
                            r.saveImgToLocal();
                        });
                    } else console.log("You should set width and height correctly for painter, width: " + e + ", height: " + n);
                });
            }
        },
        downloadImages: function() {
            var g = this;
            return new Promise(function(s, t) {
                var l = 0, c = 0, u = JSON.parse(JSON.stringify(g.properties.palette));
                u.background && (l++, downloader.download(u.background).then(function(t) {
                    u.background = t, l === ++c && s(u);
                }, function() {
                    l === ++c && s(u);
                })), u.views && function() {
                    var n = g, t = !0, e = !1, i = void 0;
                    try {
                        for (var r, o = function() {
                            var e = r.value;
                            e && "image" === e.type && e.url && (l++, downloader.download(e.url).then(function(t) {
                                e.url = t, wx.getImageInfo({
                                    src: e.url,
                                    success: function(t) {
                                        e.sWidth = t.width, e.sHeight = t.height;
                                    },
                                    fail: function(t) {
                                        console.log("imgDownloadErr failed, " + JSON.stringify(t)), n.triggerEvent("imgDownloadErr", {
                                            error: t
                                        });
                                    },
                                    complete: function() {
                                        l === ++c && s(u);
                                    }
                                });
                            }, function() {
                                l === ++c && s(u);
                            }));
                        }, a = u.views[Symbol.iterator](); !(t = (r = a.next()).done); t = !0) o();
                    } catch (t) {
                        e = !0, i = t;
                    } finally {
                        try {
                            !t && a.return && a.return();
                        } finally {
                            if (e) throw i;
                        }
                    }
                }(), 0 === l && s(u);
            });
        },
        saveImgToLocal: function() {
            var t = this, e = this;
            setTimeout(function() {
                wx.canvasToTempFilePath({
                    canvasId: "k-canvas",
                    success: function(t) {
                        e.getImageInfo(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.log("canvasToTempFilePath failed, " + JSON.stringify(t)), e.triggerEvent("imgErr", {
                            error: t
                        });
                    }
                }, t);
            }, 300);
        },
        getImageInfo: function(n) {
            var i = this;
            wx.getImageInfo({
                src: n,
                success: function(t) {
                    if (i.paintCount > MAX_PAINT_COUNT) {
                        var e = "The result is always fault, even we tried " + MAX_PAINT_COUNT + " times";
                        return console.log(e), void i.triggerEvent("imgErr", {
                            error: e
                        });
                    }
                    Math.abs((t.width * i.canvasHeightInPx - i.canvasWidthInPx * t.height) / (t.height * i.canvasHeightInPx)) < .01 ? i.triggerEvent("imgOK", {
                        path: n
                    }) : i.startPaint(), i.paintCount++;
                },
                fail: function(t) {
                    console.log("getImageInfo failed, " + JSON.stringify(t)), i.triggerEvent("imgErr", {
                        error: t
                    });
                }
            });
        }
    }
});

var screenK = .5;

function setStringPrototype() {
    String.prototype.toPx = function(t) {
        var e = (t ? /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g : /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g).exec(this);
        if (!this || !e) return console.log("The size: " + this + " is illegal"), 0;
        var n = e[2], i = parseFloat(this), r = 0;
        return "rpx" === n ? r = Math.round(i * screenK) : "px" === n && (r = i), r;
    };
}