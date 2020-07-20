var base64 = require("base64.js"), __key = "", __pos = 0, __plain = [], __prePlain = [], __cryptPos = 0, __preCryptPos = 0, __out = [], __cipher = [], __header = !0;

function __rand() {
    return Math.round(4294967295 * Math.random());
}

function __getUInt(_, r, t) {
    (!t || 4 < t) && (t = 4);
    for (var e = 0, n = r; n < r + t; n++) e <<= 8, e |= _[n];
    return (4294967295 & e) >>> 0;
}

function __intToBytes(_, r, t) {
    _[r + 3] = t >> 0 & 255, _[r + 2] = t >> 8 & 255, _[r + 1] = t >> 16 & 255, _[r + 0] = t >> 24 & 255;
}

function __bytesInStr(_) {
    if (!_) return "";
    for (var r = "", t = 0; t < _.length; t++) {
        var e = Number(_[t]).toString(16);
        1 == e.length && (e = "0" + e), r += e;
    }
    return r;
}

function __bytesToStr(_) {
    for (var r = "", t = 0; t < _.length; t += 2) r += String.fromCharCode(parseInt(_.substr(t, 2), 16));
    return r;
}

function __strToBytes(_, r) {
    if (!_) return "";
    r && (_ = utf16ToUtf8(_));
    for (var t = [], e = 0; e < _.length; e++) t[e] = _.charCodeAt(e);
    return __bytesInStr(t);
}

function utf16ToUtf8(_) {
    var r, t, e = [], n = _.length;
    for (r = 0; r < n; r++) 0 < (t = _.charCodeAt(r)) && t <= 127 ? e.push(_.charAt(r)) : 128 <= t && t <= 2047 ? e.push(String.fromCharCode(192 | t >> 6 & 31), String.fromCharCode(128 | 63 & t)) : 2048 <= t && t <= 65535 && e.push(String.fromCharCode(224 | t >> 12 & 15), String.fromCharCode(128 | t >> 6 & 63), String.fromCharCode(128 | 63 & t));
    return e.join("");
}

function __encrypt(_) {
    __plain = new Array(8), __prePlain = new Array(8), __cryptPos = __preCryptPos = 0, 
    __header = !0, __pos = 0;
    var r = _.length, t = 0;
    0 != (__pos = (r + 10) % 8) && (__pos = 8 - __pos), __out = new Array(r + __pos + 10), 
    __plain[0] = 255 & (248 & __rand() | __pos);
    for (var e = 1; e <= __pos; e++) __plain[e] = 255 & __rand();
    __pos++;
    for (e = 0; e < 8; e++) __prePlain[e] = 0;
    for (t = 1; t <= 2; ) __pos < 8 && (__plain[__pos++] = 255 & __rand(), t++), 8 == __pos && __encrypt8bytes();
    for (e = 0; 0 < r; ) __pos < 8 && (__plain[__pos++] = _[e++], r--), 8 == __pos && __encrypt8bytes();
    for (t = 1; t <= 7; ) __pos < 8 && (__plain[__pos++] = 0, t++), 8 == __pos && __encrypt8bytes();
    return __out;
}

function __decrypt(_) {
    var r = 0, t = new Array(8), e = _.length;
    if (__cipher = _, e % 8 != 0 || e < 16) return null;
    if (__prePlain = __decipher(_), (r = e - (__pos = 7 & __prePlain[0]) - 10) < 0) return null;
    for (var n = 0; n < t.length; n++) t[n] = 0;
    __out = new Array(r), __preCryptPos = 0, __cryptPos = 8, __pos++;
    for (var o = 1; o <= 2; ) if (__pos < 8 && (__pos++, o++), 8 == __pos && (t = _, 
    !__decrypt8Bytes())) return null;
    for (n = 0; 0 != r; ) if (__pos < 8 && (__out[n] = 255 & (t[__preCryptPos + __pos] ^ __prePlain[__pos]), 
    n++, r--, __pos++), 8 == __pos && (t = _, __preCryptPos = __cryptPos - 8, !__decrypt8Bytes())) return null;
    for (o = 1; o < 8; o++) {
        if (__pos < 8) {
            if (0 != (t[__preCryptPos + __pos] ^ __prePlain[__pos])) return null;
            __pos++;
        }
        if (8 == __pos && (t = _, __preCryptPos = __cryptPos, !__decrypt8Bytes())) return null;
    }
    return __out;
}

function __encrypt8bytes() {
    for (var _ = 0; _ < 8; _++) __plain[_] ^= __header ? __prePlain[_] : __out[__preCryptPos + _];
    var r = __encipher(__plain);
    for (_ = 0; _ < 8; _++) __out[__cryptPos + _] = r[_] ^ __prePlain[_], __prePlain[_] = __plain[_];
    __preCryptPos = __cryptPos, __cryptPos += 8, __pos = 0, __header = !1;
}

function __encipher(_) {
    for (var r = 16, t = __getUInt(_, 0, 4), e = __getUInt(_, 4, 4), n = __getUInt(__key, 0, 4), o = __getUInt(__key, 4, 4), p = __getUInt(__key, 8, 4), a = __getUInt(__key, 12, 4), s = 0; 0 < r--; ) e = (4294967295 & (e += ((t = (4294967295 & (t += (e << 4) + n ^ e + (s = (4294967295 & (s += 2654435769)) >>> 0) ^ (e >>> 5) + o)) >>> 0) << 4) + p ^ t + s ^ (t >>> 5) + a)) >>> 0;
    var i = new Array(8);
    return __intToBytes(i, 0, t), __intToBytes(i, 4, e), i;
}

function __decipher(_) {
    for (var r = 16, t = __getUInt(_, 0, 4), e = __getUInt(_, 4, 4), n = __getUInt(__key, 0, 4), o = __getUInt(__key, 4, 4), p = __getUInt(__key, 8, 4), a = __getUInt(__key, 12, 4), s = 3816266640; 0 < r--; ) t = (4294967295 & (t -= ((e = (4294967295 & (e -= (t << 4) + p ^ t + s ^ (t >>> 5) + a)) >>> 0) << 4) + n ^ e + s ^ (e >>> 5) + o)) >>> 0, 
    s = (4294967295 & (s -= 2654435769)) >>> 0;
    var i = new Array(8);
    return __intToBytes(i, 0, t), __intToBytes(i, 4, e), i;
}

function __decrypt8Bytes() {
    __cipher.length;
    for (var _ = 0; _ < 8; _++) __prePlain[_] ^= __cipher[__cryptPos + _];
    return __prePlain = __decipher(__prePlain), __cryptPos += 8, !(__pos = 0);
}

function __dataFromStr(_, r) {
    var t = [];
    if (r) for (var e = 0; e < _.length; e++) t[e] = 255 & _.charCodeAt(e); else {
        var n = 0;
        for (e = 0; e < _.length; e += 2) t[n++] = parseInt(_.substr(e, 2), 16);
    }
    return t;
}

var TEA = {
    encrypt: function(_, r) {
        return __bytesInStr(__encrypt(__dataFromStr(_, r)));
    },
    enAsBase64: function(_, r) {
        for (var t = __encrypt(__dataFromStr(_, r)), e = "", n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
        return base64.encode(e);
    },
    decrypt: function(_) {
        return __bytesInStr(__decrypt(__dataFromStr(_, !1)));
    },
    initkey: function(_, r) {
        __key = __dataFromStr(_, r);
    },
    bytesToStr: __bytesToStr,
    strToBytes: __strToBytes,
    bytesInStr: __bytesInStr,
    dataFromStr: __dataFromStr
};

base64 = {
    PADCHAR: "=",
    ALPHA: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    getbyte: function(_, r) {
        var t = _.charCodeAt(r);
        if (255 < t) throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        return t;
    },
    encode: function(_) {
        if (1 != arguments.length) throw "SyntaxError: Not enough arguments";
        var r, t, e = base64.PADCHAR, n = base64.ALPHA, o = base64.getbyte, p = [], a = (_ = "" + _).length - _.length % 3;
        if (0 == _.length) return _;
        for (r = 0; r < a; r += 3) t = o(_, r) << 16 | o(_, r + 1) << 8 | o(_, r + 2), p.push(n.charAt(t >> 18)), 
        p.push(n.charAt(t >> 12 & 63)), p.push(n.charAt(t >> 6 & 63)), p.push(n.charAt(63 & t));
        switch (_.length - a) {
          case 1:
            t = o(_, r) << 16, p.push(n.charAt(t >> 18) + n.charAt(t >> 12 & 63) + e + e);
            break;

          case 2:
            t = o(_, r) << 16 | o(_, r + 1) << 8, p.push(n.charAt(t >> 18) + n.charAt(t >> 12 & 63) + n.charAt(t >> 6 & 63) + e);
        }
        return p.join("");
    }
};

module.exports = TEA;