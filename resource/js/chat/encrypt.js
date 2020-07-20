module.exports = function() {
    var f = 1, n = 8, i = 32, g = require("tea.js"), h = require("rsa.js"), a = require("base64.js");
    function s(e) {
        return t(c(r(a = e), a.length * n));
        var a;
    }
    function c(e, a) {
        e[a >> 5] |= 128 << a % 32, e[14 + (a + 64 >>> 9 << 4)] = a;
        for (var c = 1732584193, r = -271733879, f = -1732584194, n = 271733878, t = 0; t < e.length; t += 16) {
            var d = c, b = r, u = f, o = n;
            r = y(r = y(r = y(r = y(r = p(r = p(r = p(r = p(r = v(r = v(r = v(r = v(r = l(r = l(r = l(r = l(r, f = l(f, n = l(n, c = l(c, r, f, n, e[t + 0], 7, -680876936), r, f, e[t + 1], 12, -389564586), c, r, e[t + 2], 17, 606105819), n, c, e[t + 3], 22, -1044525330), f = l(f, n = l(n, c = l(c, r, f, n, e[t + 4], 7, -176418897), r, f, e[t + 5], 12, 1200080426), c, r, e[t + 6], 17, -1473231341), n, c, e[t + 7], 22, -45705983), f = l(f, n = l(n, c = l(c, r, f, n, e[t + 8], 7, 1770035416), r, f, e[t + 9], 12, -1958414417), c, r, e[t + 10], 17, -42063), n, c, e[t + 11], 22, -1990404162), f = l(f, n = l(n, c = l(c, r, f, n, e[t + 12], 7, 1804603682), r, f, e[t + 13], 12, -40341101), c, r, e[t + 14], 17, -1502002290), n, c, e[t + 15], 22, 1236535329), f = v(f, n = v(n, c = v(c, r, f, n, e[t + 1], 5, -165796510), r, f, e[t + 6], 9, -1069501632), c, r, e[t + 11], 14, 643717713), n, c, e[t + 0], 20, -373897302), f = v(f, n = v(n, c = v(c, r, f, n, e[t + 5], 5, -701558691), r, f, e[t + 10], 9, 38016083), c, r, e[t + 15], 14, -660478335), n, c, e[t + 4], 20, -405537848), f = v(f, n = v(n, c = v(c, r, f, n, e[t + 9], 5, 568446438), r, f, e[t + 14], 9, -1019803690), c, r, e[t + 3], 14, -187363961), n, c, e[t + 8], 20, 1163531501), f = v(f, n = v(n, c = v(c, r, f, n, e[t + 13], 5, -1444681467), r, f, e[t + 2], 9, -51403784), c, r, e[t + 7], 14, 1735328473), n, c, e[t + 12], 20, -1926607734), f = p(f, n = p(n, c = p(c, r, f, n, e[t + 5], 4, -378558), r, f, e[t + 8], 11, -2022574463), c, r, e[t + 11], 16, 1839030562), n, c, e[t + 14], 23, -35309556), f = p(f, n = p(n, c = p(c, r, f, n, e[t + 1], 4, -1530992060), r, f, e[t + 4], 11, 1272893353), c, r, e[t + 7], 16, -155497632), n, c, e[t + 10], 23, -1094730640), f = p(f, n = p(n, c = p(c, r, f, n, e[t + 13], 4, 681279174), r, f, e[t + 0], 11, -358537222), c, r, e[t + 3], 16, -722521979), n, c, e[t + 6], 23, 76029189), f = p(f, n = p(n, c = p(c, r, f, n, e[t + 9], 4, -640364487), r, f, e[t + 12], 11, -421815835), c, r, e[t + 15], 16, 530742520), n, c, e[t + 2], 23, -995338651), f = y(f, n = y(n, c = y(c, r, f, n, e[t + 0], 6, -198630844), r, f, e[t + 7], 10, 1126891415), c, r, e[t + 14], 15, -1416354905), n, c, e[t + 5], 21, -57434055), f = y(f, n = y(n, c = y(c, r, f, n, e[t + 12], 6, 1700485571), r, f, e[t + 3], 10, -1894986606), c, r, e[t + 10], 15, -1051523), n, c, e[t + 1], 21, -2054922799), f = y(f, n = y(n, c = y(c, r, f, n, e[t + 8], 6, 1873313359), r, f, e[t + 15], 10, -30611744), c, r, e[t + 6], 15, -1560198380), n, c, e[t + 13], 21, 1309151649), f = y(f, n = y(n, c = y(c, r, f, n, e[t + 4], 6, -145523070), r, f, e[t + 11], 10, -1120210379), c, r, e[t + 2], 15, 718787259), n, c, e[t + 9], 21, -343485551), 
            c = A(c, d), r = A(r, b), f = A(f, u), n = A(n, o);
        }
        return 16 == i ? Array(r, f) : Array(c, r, f, n);
    }
    function d(e, a, c, r, f, n) {
        return A((t = A(A(a, e), A(r, n))) << (d = f) | t >>> 32 - d, c);
        var t, d;
    }
    function l(e, a, c, r, f, n, t) {
        return d(a & c | ~a & r, e, a, f, n, t);
    }
    function v(e, a, c, r, f, n, t) {
        return d(a & r | c & ~r, e, a, f, n, t);
    }
    function p(e, a, c, r, f, n, t) {
        return d(a ^ c ^ r, e, a, f, n, t);
    }
    function y(e, a, c, r, f, n, t) {
        return d(c ^ (a | ~r), e, a, f, n, t);
    }
    function A(e, a) {
        var c = (65535 & e) + (65535 & a);
        return (e >> 16) + (a >> 16) + (c >> 16) << 16 | 65535 & c;
    }
    function r(e) {
        for (var a = Array(), c = (1 << n) - 1, r = 0; r < e.length * n; r += n) a[r >> 5] |= (e.charCodeAt(r / n) & c) << r % 32;
        return a;
    }
    function t(e) {
        for (var a = f ? "0123456789ABCDEF" : "0123456789abcdef", c = "", r = 0; r < 4 * e.length; r++) c += a.charAt(e[r >> 2] >> r % 4 * 8 + 4 & 15) + a.charAt(e[r >> 2] >> r % 4 * 8 & 15);
        return c;
    }
    function m(e) {
        for (var a = [], c = 0; c < e.length; c += 2) a.push(String.fromCharCode(parseInt(e.substr(c, 2), 16)));
        return a.join("");
    }
    function S(e) {
        return (e = a.encode(m(e))).replace(/[\/\+=]/g, function(e) {
            return {
                "/": "-",
                "+": "*",
                "=": "_"
            }[e];
        });
    }
    return {
        getEncPwd: function(e) {
            for (var a = e.vcode || "", c = s(e.pwd || ""), r = s(m(c) + e.salt), f = g.strToBytes(a.toUpperCase(), !0), n = Number(f.length / 2).toString(16), t = g.strToBytes(e.id), d = Number(t.length / 2).toString(16), b = Number(e.sdkAppid).toString(16), u = Number(0).toString(16); n.length < 4; ) n = "0" + n;
            for (;d.length < 4; ) d = "0" + d;
            for (;b.length < 8; ) b = "0" + b;
            for (;u.length < 8; ) u = "0" + u;
            g.initkey(r);
            var o = g.encrypt(c + d + t + b + u + n + f);
            return g.initkey(""), S(h.encrypt(m(o), "00988f6fe99e3d7c72b8b8a1cc9563e9750f5815316de064b531a0bfaa4dd5c2a5ea1f0e9b6e87bbcd19f445a13afada991a8ef60b812c628019741e4337933fb68438d93b62a538da25884627d3d46e6c62a5a41d30a7167a3a1ce5f6ecc3353db98b14a04ce2f777f335223134a900caa74fa79d9ab2c20ce19aaac9c24a82c847fa2eed0704553f75e030d93aa721186576cf5c344015ddc384b6b37add7139531af060548be8060a4bb075cc842bb190343c7f5e0e0b03fe1ca46c29b0df0bec7345888028df47f71fe44a0bd9cb8aed6282c095a75c57b6a604600886744b2965138730b27cf7d173381f0e53523aa1ced6864c09f7cc4135d45c5d4cfcbd", "10001"));
        },
        getRSAH1: function(e) {
            var a = s(e = e || function() {
                for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", a = "", c = 0; c < 16; c++) a += e[Math.round(1e3 * Math.random()) % e.length];
                return a;
            }());
            return S(h.encrypt(m(a), "00ccaa91239f0a10fae03522fe6fdc6194007809732b07cb89e04dee9b4fdb9186787659fdf308be6efbc8aa147ffd8b5e4d61aba8a7e40e08af759751e1acc207a3988ce381cca6dfac4c75af1acda8bb3c09dce7a3d43fc23c95eecf56ca0c0c7a7eaeb019c912877757fe23ab28ac7060ee5409da3f0b5f079901475b11ac7d6c5cea1e7bd26a324674878cc31094b62eb407247f3e7f2070bb76a919883eaa114b0a40ea1341bf99dfd131d77343fd113f3a294fc0e19d9cc06989b98a0c14677e589ac41dd414283a3cf7685089d92770e7fde43c6aa443f2822c52fdbba309ea819bea8e4c2f1fac03930081ffd5189de9f025e15c4a1c466b761ba8e7f3", "10001"));
        },
        md5: s
    };
}();