function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var r = e[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, o, r) {
        return o && t(e.prototype, o), r && t(e, r), e;
    };
}(), o = function() {
    function o() {
        t(this, o);
    }
    return e(o, [ {
        key: "palette",
        value: function(t, e, o, r, i) {
            return {
                width: "750px",
                height: "1167px",
                background: "#fff",
                views: [ {
                    type: "image",
                    url: t,
                    css: {
                        width: "750px",
                        height: "900px",
                        top: "0px",
                        left: "0px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "0 NaN NaN undefined",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "image",
                    url: o,
                    css: {
                        width: "100px",
                        height: "100px",
                        top: "1020px",
                        left: "40px",
                        rotate: "0",
                        borderRadius: "100px",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "10 10 10 #888888",
                        mode: "scaleToFill"
                    }
                }, {
                    type: "text",
                    text: i,
                    css: {
                        color: "#333",
                        background: "rgba(0,0,0,0)",
                        width: "350px",
                        height: "40px",
                        top: "950px",
                        left: "40px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "44px",
                        fontWeight: "700",
                        maxLines: "2",
                        lineHeight: "46.17600000000001px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "text",
                    text: r,
                    css: {
                        color: "#333",
                        background: "rgba(0,0,0,0)",
                        width: "200px",
                        height: "40px",
                        top: "1050px",
                        left: "150px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "28px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "40.40400000000001px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "left"
                    }
                }, {
                    type: "image",
                    url: e,
                    css: {
                        color: "#000000",
                        background: "#ffffff",
                        width: "200px",
                        height: "200px",
                        top: "910px",
                        right: "50px",
                        rotate: "0"
                    }
                }, {
                    type: "text",
                    text: "长按图片识别开通",
                    css: {
                        color: "#666",
                        background: "rgba(0,0,0,0)",
                        width: "200px",
                        height: "20.02px",
                        top: "1120px",
                        right: "5px",
                        rotate: "0",
                        borderRadius: "",
                        borderWidth: "",
                        borderColor: "#000000",
                        shadow: "",
                        padding: "0px",
                        fontSize: "14px",
                        fontWeight: "normal",
                        maxLines: "2",
                        lineHeight: "20.202000000000005px",
                        textStyle: "fill",
                        textDecoration: "none",
                        fontFamily: "",
                        textAlign: "center"
                    }
                } ]
            };
        }
    } ]), o;
}();

exports.default = o;