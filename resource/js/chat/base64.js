var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    var t = "object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && exports, o = "object" == ("undefined" == typeof module ? "undefined" : _typeof(module)) && module && module.exports == t && module, r = "object" == ("undefined" == typeof global ? "undefined" : _typeof(global)) && global;
    r.global !== r && r.window !== r || (e = r);
    var n = function(e) {
        this.message = e;
    };
    (n.prototype = new Error()).name = "InvalidCharacterError";
    var i = function(e) {
        throw new n(e);
    }, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = /[\t\n\f\r ]/g, a = {
        encode: function(e) {
            e = String(e), /[^\0-\xFF]/.test(e) && i("The string to be encoded contains characters outside of the Latin1 range.");
            for (var t, o, r, n, a = e.length % 3, c = "", d = -1, f = e.length - a; ++d < f; ) t = e.charCodeAt(d) << 16, 
            o = e.charCodeAt(++d) << 8, r = e.charCodeAt(++d), c += l.charAt((n = t + o + r) >> 18 & 63) + l.charAt(n >> 12 & 63) + l.charAt(n >> 6 & 63) + l.charAt(63 & n);
            return 2 == a ? (t = e.charCodeAt(d) << 8, o = e.charCodeAt(++d), c += l.charAt((n = t + o) >> 10) + l.charAt(n >> 4 & 63) + l.charAt(n << 2 & 63) + "=") : 1 == a && (n = e.charCodeAt(d), 
            c += l.charAt(n >> 2) + l.charAt(n << 4 & 63) + "=="), c;
        },
        decode: function(e) {
            var t = (e = String(e).replace(d, "")).length;
            t % 4 == 0 && (t = (e = e.replace(/==?$/, "")).length), (t % 4 == 1 || /[^+a-zA-Z0-9/]/.test(e)) && i("Invalid character: the string to be decoded is not correctly encoded.");
            for (var o, r, n = 0, a = "", c = -1; ++c < t; ) r = l.indexOf(e.charAt(c)), o = n % 4 ? 64 * o + r : r, 
            n++ % 4 && (a += String.fromCharCode(255 & o >> (-2 * n & 6)));
            return a;
        },
        version: "0.1.0"
    };
    if ("function" == typeof define && "object" == _typeof(define.amd) && define.amd) define(function() {
        return a;
    }); else if (t && !t.nodeType) if (o) o.exports = a; else for (var c in a) a.hasOwnProperty(c) && (t[c] = a[c]); else e.base64 = a;
}(void 0);