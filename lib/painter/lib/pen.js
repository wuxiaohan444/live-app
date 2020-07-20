Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function i(t, s) {
        for (var e = 0; e < s.length; e++) {
            var i = s[e];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(t, s, e) {
        return s && i(t.prototype, s), e && i(t, e), t;
    };
}();

function _toConsumableArray(t) {
    if (Array.isArray(t)) {
        for (var s = 0, e = Array(t.length); s < t.length; s++) e[s] = t[s];
        return e;
    }
    return Array.from(t);
}

function _classCallCheck(t, s) {
    if (!(t instanceof s)) throw new TypeError("Cannot call a class as a function");
}

var QR = require("./qrcode.js"), Painter = function() {
    function e(t, s) {
        _classCallCheck(this, e), this.ctx = t, this.data = s;
    }
    return _createClass(e, [ {
        key: "paint",
        value: function(t) {
            this.style = {
                width: this.data.width.toPx(),
                height: this.data.height.toPx()
            }, this._background();
            var s = !0, e = !1, i = void 0;
            try {
                for (var r, c = this.data.views[Symbol.iterator](); !(s = (r = c.next()).done); s = !0) {
                    var a = r.value;
                    this._drawAbsolute(a);
                }
            } catch (t) {
                e = !0, i = t;
            } finally {
                try {
                    !s && c.return && c.return();
                } finally {
                    if (e) throw i;
                }
            }
            this.ctx.draw(!1, function() {
                t();
            });
        }
    }, {
        key: "_background",
        value: function() {
            this.ctx.save();
            var t = this.style, s = t.width, e = t.height, i = this.data.background;
            this.ctx.translate(s / 2, e / 2), this._doClip(this.data.borderRadius, s, e), i ? i.startsWith("#") || i.startsWith("rgba") || "transparent" === i.toLowerCase() ? (this.ctx.fillStyle = i, 
            this.ctx.fillRect(-s / 2, -e / 2, s, e)) : this.ctx.drawImage(i, -s / 2, -e / 2, s, e) : (this.ctx.fillStyle = "#fff", 
            this.ctx.fillRect(-s / 2, -e / 2, s, e)), this.ctx.restore();
        }
    }, {
        key: "_drawAbsolute",
        value: function(t) {
            switch (t.css && t.css.length && (t.css = Object.assign.apply(Object, _toConsumableArray(t.css))), 
            t.type) {
              case "image":
                this._drawAbsImage(t);
                break;

              case "text":
                this._fillAbsText(t);
                break;

              case "rect":
                this._drawAbsRect(t);
                break;

              case "qrcode":
                this._drawQRCode(t);
            }
        }
    }, {
        key: "_doClip",
        value: function(t, s, e) {
            if (t && s && e) {
                var i = Math.min(t.toPx(), s / 2, e / 2);
                this.ctx.globalAlpha = 0, this.ctx.fillStyle = "white", this.ctx.beginPath(), this.ctx.arc(-s / 2 + i, -e / 2 + i, i, 1 * Math.PI, 1.5 * Math.PI), 
                this.ctx.lineTo(s / 2 - i, -e / 2), this.ctx.arc(s / 2 - i, -e / 2 + i, i, 1.5 * Math.PI, 2 * Math.PI), 
                this.ctx.lineTo(s / 2, e / 2 - i), this.ctx.arc(s / 2 - i, e / 2 - i, i, 0, .5 * Math.PI), 
                this.ctx.lineTo(-s / 2 + i, e / 2), this.ctx.arc(-s / 2 + i, e / 2 - i, i, .5 * Math.PI, 1 * Math.PI), 
                this.ctx.closePath(), this.ctx.fill(), getApp().systemInfo && getApp().systemInfo.version <= "6.6.6" && "ios" === getApp().systemInfo.platform || this.ctx.clip(), 
                this.ctx.globalAlpha = 1;
            }
        }
    }, {
        key: "_doBorder",
        value: function(t, s, e) {
            if (t.css) {
                var i = t.css, r = i.borderRadius, c = i.borderWidth, a = i.borderColor;
                if (c) {
                    this.ctx.save(), this._preProcess(t, !0);
                    var h = void 0;
                    h = r ? Math.min(r.toPx(), s / 2, e / 2) : 0;
                    var o = c.toPx();
                    this.ctx.lineWidth = o, this.ctx.strokeStyle = a || "black", this.ctx.beginPath(), 
                    this.ctx.arc(-s / 2 + h, -e / 2 + h, h + o / 2, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(s / 2 - h, -e / 2 - o / 2), 
                    this.ctx.arc(s / 2 - h, -e / 2 + h, h + o / 2, 1.5 * Math.PI, 2 * Math.PI), this.ctx.lineTo(s / 2 + o / 2, e / 2 - h), 
                    this.ctx.arc(s / 2 - h, e / 2 - h, h + o / 2, 0, .5 * Math.PI), this.ctx.lineTo(-s / 2 + h, e / 2 + o / 2), 
                    this.ctx.arc(-s / 2 + h, e / 2 - h, h + o / 2, .5 * Math.PI, 1 * Math.PI), this.ctx.closePath(), 
                    this.ctx.stroke(), this.ctx.restore();
                }
            }
        }
    }, {
        key: "_preProcess",
        value: function(t, s) {
            var e = void 0, i = void 0, r = void 0;
            switch (t.type) {
              case "text":
                var c = "bold" === t.css.fontWeight ? "bold" : "normal";
                t.css.fontSize = t.css.fontSize ? t.css.fontSize : "20rpx", this.ctx.font = "normal " + c + " " + t.css.fontSize.toPx() + "px sans-serif";
                var a = this.ctx.measureText(t.text).width;
                e = t.css.width ? t.css.width.toPx() : a;
                var h = Math.ceil(a / e), o = t.css.maxLines < h ? t.css.maxLines : h, n = t.css.lineHeight ? t.css.lineHeight.toPx() : t.css.fontSize.toPx();
                i = n * o, r = {
                    lines: o,
                    lineHeight: n
                };
                break;

              case "image":
                var l = getApp().systemInfo.pixelRatio ? getApp().systemInfo.pixelRatio : 2;
                e = t.css && t.css.width ? t.css.width.toPx() : Math.round(t.sWidth / l), i = t.css && t.css.height ? t.css.height.toPx() : Math.round(t.sHeight / l);
                break;

              default:
                if (!t.css.width || !t.css.height) return void console.error("You should set width and height");
                e = t.css.width.toPx(), i = t.css.height.toPx();
            }
            var x = t.css && t.css.right ? this.style.width - t.css.right.toPx(!0) : t.css && t.css.left ? t.css.left.toPx(!0) : 0, d = t.css && t.css.bottom ? this.style.height - i - t.css.bottom.toPx(!0) : t.css && t.css.top ? t.css.top.toPx(!0) : 0, u = t.css && t.css.rotate ? this._getAngle(t.css.rotate) : 0;
            switch (t.css && t.css.align ? t.css.align : t.css && t.css.right ? "right" : "left") {
              case "center":
                this.ctx.translate(x, d + i / 2);
                break;

              case "right":
                this.ctx.translate(x - e / 2, d + i / 2);
                break;

              default:
                this.ctx.translate(x + e / 2, d + i / 2);
            }
            return this.ctx.rotate(u), !s && t.css && t.css.borderRadius && this._doClip(t.css.borderRadius, e, i), 
            {
                width: e,
                height: i,
                x: x,
                y: d,
                extra: r
            };
        }
    }, {
        key: "_drawQRCode",
        value: function(t) {
            this.ctx.save();
            var s = this._preProcess(t), e = s.width, i = s.height;
            QR.api.draw(t.content, this.ctx, -e / 2, -i / 2, e, i, t.css.background, t.css.color), 
            this.ctx.restore(), this._doBorder(t, e, i);
        }
    }, {
        key: "_drawAbsImage",
        value: function(t) {
            if (t.url) {
                this.ctx.save();
                var s = this._preProcess(t), e = s.width, i = s.height, r = void 0, c = void 0, a = 0, h = 0;
                i < e ? (c = Math.round(t.sWidth / e * i), r = t.sWidth) : (r = Math.round(t.sHeight / i * e), 
                c = t.sHeight), t.sWidth > r && (a = Math.round((t.sWidth - r) / 2)), t.sHeight > c && (h = Math.round((t.sHeight - c) / 2)), 
                t.css && "scaleToFill" === t.css.mode ? this.ctx.drawImage(t.url, -e / 2, -i / 2, e, i) : this.ctx.drawImage(t.url, a, h, r, c, -e / 2, -i / 2, e, i), 
                this.ctx.restore(), this._doBorder(t, e, i);
            }
        }
    }, {
        key: "_fillAbsText",
        value: function(t) {
            if (t.text) {
                this.ctx.save();
                var s = this._preProcess(t), e = s.width, i = s.height, r = s.extra;
                this.ctx.fillStyle = t.css.color || "black";
                for (var c = r.lines, a = r.lineHeight, h = Math.round(t.text.length / c), o = 0, n = 0, l = 0; l < c; ++l) {
                    n = h;
                    for (var x = t.text.substr(o, n), d = this.ctx.measureText(x).width; o + n <= t.text.length && (e - d > t.css.fontSize.toPx() || e < d); ) {
                        if (d < e) x = t.text.substr(o, ++n); else {
                            if (x.length <= 1) break;
                            x = t.text.substr(o, --n);
                        }
                        d = this.ctx.measureText(x).width;
                    }
                    if (o += x.length, l === c - 1 && o < t.text.length) {
                        for (;this.ctx.measureText(x + "...").width > e && !(x.length <= 1); ) x = x.substring(0, x.length - 1);
                        x += "...", d = this.ctx.measureText(x).width;
                    }
                    this.ctx.setTextAlign(t.css.align ? t.css.align : "left");
                    var u = void 0;
                    switch (t.css.align) {
                      case "center":
                        u = 0;
                        break;

                      case "right":
                        u = e / 2;
                        break;

                      default:
                        u = -e / 2;
                    }
                    var f = -i / 2 + (0 === l ? t.css.fontSize.toPx() : t.css.fontSize.toPx() + l * a);
                    "stroke" === t.css.textStyle ? this.ctx.strokeText(x, u, f, d) : this.ctx.fillText(x, u, f, d);
                    var g = t.css.fontSize.toPx();
                    t.css.textDecoration && (this.ctx.beginPath(), /\bunderline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(u, f), 
                    this.ctx.lineTo(u + d, f)), /\boverline\b/.test(t.css.textDecoration) && (this.ctx.moveTo(u, f - g), 
                    this.ctx.lineTo(u + d, f - g)), /\bline-through\b/.test(t.css.textDecoration) && (this.ctx.moveTo(u, f - g / 3), 
                    this.ctx.lineTo(u + d, f - g / 3)), this.ctx.closePath(), this.ctx.strokeStyle = t.css.color, 
                    this.ctx.stroke());
                }
                this.ctx.restore(), this._doBorder(t, e, i);
            }
        }
    }, {
        key: "_drawAbsRect",
        value: function(t) {
            this.ctx.save();
            var s = this._preProcess(t), e = s.width, i = s.height;
            this.ctx.fillStyle = t.css.color, this.ctx.fillRect(-e / 2, -i / 2, e, i), this.ctx.restore(), 
            this._doBorder(t, e, i);
        }
    }, {
        key: "_getAngle",
        value: function(t) {
            return Number(t) * Math.PI / 180;
        }
    } ]), e;
}();

exports.default = Painter;