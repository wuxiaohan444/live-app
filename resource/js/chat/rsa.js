module.exports = function() {
    function r() {
        this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, 
        this.dmq1 = null, this.coeff = null;
    }
    r.prototype.doPublic = function(t) {
        return t.modPowInt(this.e, this.n);
    }, r.prototype.setPublic = function(t, i) {
        null != t && null != i && 0 < t.length && 0 < i.length ? (this.n = new B(t, 16), 
        this.e = parseInt(i, 16)) : uv_alert("Invalid RSA public key");
    }, r.prototype.encrypt = function(t) {
        var i = function(t, i) {
            if (i < t.length + 11) return uv_alert("Message too long for RSA"), null;
            for (var s = new Array(), o = t.length - 1; 0 <= o && 0 < i; ) {
                var r = t.charCodeAt(o--);
                s[--i] = r;
            }
            s[--i] = 0;
            for (var h = new v(), n = new Array(); 2 < i; ) {
                for (n[0] = 0; 0 == n[0]; ) h.nextBytes(n);
                s[--i] = n[0];
            }
            return s[--i] = 2, s[--i] = 0, new B(s);
        }(t, this.n.bitLength() + 7 >> 3);
        if (null == i) return null;
        var s = this.doPublic(i);
        if (null == s) return null;
        var o = s.toString(16);
        return 0 == (1 & o.length) ? o : "0" + o;
    };
    function B(t, i, s) {
        null != t && ("number" == typeof t ? this.fromNumber(t, i, s) : null == i && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, i));
    }
    function d() {
        return new B(null);
    }
    B.prototype.am = function(t, i, s, o, r, h) {
        for (var n = 16383 & i, e = i >> 14; 0 <= --h; ) {
            var u = 16383 & this[t], f = this[t++] >> 14, p = e * u + f * n;
            r = ((u = n * u + ((16383 & p) << 14) + s[o] + r) >> 28) + (p >> 14) + e * f, s[o++] = 268435455 & u;
        }
        return r;
    }, B.prototype.DB = 28, B.prototype.DM = 268435455, B.prototype.DV = 1 << 28;
    B.prototype.FV = Math.pow(2, 52), B.prototype.F1 = 24, B.prototype.F2 = 4;
    var t, i, s, o, h, n = "0123456789abcdefghijklmnopqrstuvwxyz", f = new Array();
    for (t = "0".charCodeAt(0), i = 0; i <= 9; ++i) f[t++] = i;
    for (t = "a".charCodeAt(0), i = 10; i < 36; ++i) f[t++] = i;
    for (t = "A".charCodeAt(0), i = 10; i < 36; ++i) f[t++] = i;
    function u(t) {
        return n.charAt(t);
    }
    function e(t) {
        var i = d();
        return i.fromInt(t), i;
    }
    function A(t) {
        var i, s = 1;
        return 0 != (i = t >>> 16) && (t = i, s += 16), 0 != (i = t >> 8) && (t = i, s += 8), 
        0 != (i = t >> 4) && (t = i, s += 4), 0 != (i = t >> 2) && (t = i, s += 2), 0 != (i = t >> 1) && (t = i, 
        s += 1), s;
    }
    function p(t) {
        this.m = t;
    }
    function a(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, 
        this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
    }
    function l() {
        var t;
        t = new Date().getTime(), o[h++] ^= 255 & t, o[h++] ^= t >> 8 & 255, o[h++] ^= t >> 16 & 255, 
        o[h++] ^= t >> 24 & 255, D <= h && (h -= D);
    }
    if (p.prototype.convert = function(t) {
        return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t;
    }, p.prototype.revert = function(t) {
        return t;
    }, p.prototype.reduce = function(t) {
        t.divRemTo(this.m, null, t);
    }, p.prototype.mulTo = function(t, i, s) {
        t.multiplyTo(i, s), this.reduce(s);
    }, p.prototype.sqrTo = function(t, i) {
        t.squareTo(i), this.reduce(i);
    }, a.prototype.convert = function(t) {
        var i = d();
        return t.abs().dlShiftTo(this.m.t, i), i.divRemTo(this.m, null, i), t.s < 0 && 0 < i.compareTo(B.ZERO) && this.m.subTo(i, i), 
        i;
    }, a.prototype.revert = function(t) {
        var i = d();
        return t.copyTo(i), this.reduce(i), i;
    }, a.prototype.reduce = function(t) {
        for (;t.t <= this.mt2; ) t[t.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
            var s = 32767 & t[i], o = s * this.mpl + ((s * this.mph + (t[i] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (t[s = i + this.m.t] += this.m.am(0, o, t, i, 0, this.m.t); t[s] >= t.DV; ) t[s] -= t.DV, 
            t[++s]++;
        }
        t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t);
    }, a.prototype.mulTo = function(t, i, s) {
        t.multiplyTo(i, s), this.reduce(s);
    }, a.prototype.sqrTo = function(t, i) {
        t.squareTo(i), this.reduce(i);
    }, B.prototype.copyTo = function(t) {
        for (var i = this.t - 1; 0 <= i; --i) t[i] = this[i];
        t.t = this.t, t.s = this.s;
    }, B.prototype.fromInt = function(t) {
        this.t = 1, this.s = t < 0 ? -1 : 0, 0 < t ? this[0] = t : t < -1 ? this[0] = t + DV : this.t = 0;
    }, B.prototype.fromString = function(t, i) {
        var s;
        if (16 == i) s = 4; else if (8 == i) s = 3; else if (256 == i) s = 8; else if (2 == i) s = 1; else if (32 == i) s = 5; else {
            if (4 != i) return void this.fromRadix(t, i);
            s = 2;
        }
        this.t = 0, this.s = 0;
        for (var o, r, h = t.length, n = !1, e = 0; 0 <= --h; ) {
            var u = 8 == s ? 255 & t[h] : (o = h, null == (r = f[t.charCodeAt(o)]) ? -1 : r);
            u < 0 ? "-" == t.charAt(h) && (n = !0) : (n = !1, 0 == e ? this[this.t++] = u : e + s > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - e) - 1) << e, 
            this[this.t++] = u >> this.DB - e) : this[this.t - 1] |= u << e, (e += s) >= this.DB && (e -= this.DB));
        }
        8 == s && 0 != (128 & t[0]) && (this.s = -1, 0 < e && (this[this.t - 1] |= (1 << this.DB - e) - 1 << e)), 
        this.clamp(), n && B.ZERO.subTo(this, this);
    }, B.prototype.clamp = function() {
        for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; ) --this.t;
    }, B.prototype.dlShiftTo = function(t, i) {
        var s;
        for (s = this.t - 1; 0 <= s; --s) i[s + t] = this[s];
        for (s = t - 1; 0 <= s; --s) i[s] = 0;
        i.t = this.t + t, i.s = this.s;
    }, B.prototype.drShiftTo = function(t, i) {
        for (var s = t; s < this.t; ++s) i[s - t] = this[s];
        i.t = Math.max(this.t - t, 0), i.s = this.s;
    }, B.prototype.lShiftTo = function(t, i) {
        var s, o = t % this.DB, r = this.DB - o, h = (1 << r) - 1, n = Math.floor(t / this.DB), e = this.s << o & this.DM;
        for (s = this.t - 1; 0 <= s; --s) i[s + n + 1] = this[s] >> r | e, e = (this[s] & h) << o;
        for (s = n - 1; 0 <= s; --s) i[s] = 0;
        i[n] = e, i.t = this.t + n + 1, i.s = this.s, i.clamp();
    }, B.prototype.rShiftTo = function(t, i) {
        i.s = this.s;
        var s = Math.floor(t / this.DB);
        if (s >= this.t) i.t = 0; else {
            var o = t % this.DB, r = this.DB - o, h = (1 << o) - 1;
            i[0] = this[s] >> o;
            for (var n = s + 1; n < this.t; ++n) i[n - s - 1] |= (this[n] & h) << r, i[n - s] = this[n] >> o;
            0 < o && (i[this.t - s - 1] |= (this.s & h) << r), i.t = this.t - s, i.clamp();
        }
    }, B.prototype.subTo = function(t, i) {
        for (var s = 0, o = 0, r = Math.min(t.t, this.t); s < r; ) o += this[s] - t[s], 
        i[s++] = o & this.DM, o >>= this.DB;
        if (t.t < this.t) {
            for (o -= t.s; s < this.t; ) o += this[s], i[s++] = o & this.DM, o >>= this.DB;
            o += this.s;
        } else {
            for (o += this.s; s < t.t; ) o -= t[s], i[s++] = o & this.DM, o >>= this.DB;
            o -= t.s;
        }
        i.s = o < 0 ? -1 : 0, o < -1 ? i[s++] = this.DV + o : 0 < o && (i[s++] = o), i.t = s, 
        i.clamp();
    }, B.prototype.multiplyTo = function(t, i) {
        var s = this.abs(), o = t.abs(), r = s.t;
        for (i.t = r + o.t; 0 <= --r; ) i[r] = 0;
        for (r = 0; r < o.t; ++r) i[r + s.t] = s.am(0, o[r], i, r, 0, s.t);
        i.s = 0, i.clamp(), this.s != t.s && B.ZERO.subTo(i, i);
    }, B.prototype.squareTo = function(t) {
        for (var i = this.abs(), s = t.t = 2 * i.t; 0 <= --s; ) t[s] = 0;
        for (s = 0; s < i.t - 1; ++s) {
            var o = i.am(s, i[s], t, 2 * s, 0, 1);
            (t[s + i.t] += i.am(s + 1, 2 * i[s], t, 2 * s + 1, o, i.t - s - 1)) >= i.DV && (t[s + i.t] -= i.DV, 
            t[s + i.t + 1] = 1);
        }
        0 < t.t && (t[t.t - 1] += i.am(s, i[s], t, 2 * s, 0, 1)), t.s = 0, t.clamp();
    }, B.prototype.divRemTo = function(t, i, s) {
        var o = t.abs();
        if (!(o.t <= 0)) {
            var r = this.abs();
            if (r.t < o.t) return null != i && i.fromInt(0), void (null != s && this.copyTo(s));
            null == s && (s = d());
            var h = d(), n = this.s, e = t.s, u = this.DB - A(o[o.t - 1]);
            0 < u ? (o.lShiftTo(u, h), r.lShiftTo(u, s)) : (o.copyTo(h), r.copyTo(s));
            var f = h.t, p = h[f - 1];
            if (0 != p) {
                var a = p * (1 << this.F1) + (1 < f ? h[f - 2] >> this.F2 : 0), l = this.FV / a, c = (1 << this.F1) / a, m = 1 << this.F2, v = s.t, y = v - f, D = null == i ? d() : i;
                for (h.dlShiftTo(y, D), 0 <= s.compareTo(D) && (s[s.t++] = 1, s.subTo(D, s)), B.ONE.dlShiftTo(f, D), 
                D.subTo(h, h); h.t < f; ) h[h.t++] = 0;
                for (;0 <= --y; ) {
                    var T = s[--v] == p ? this.DM : Math.floor(s[v] * l + (s[v - 1] + m) * c);
                    if ((s[v] += h.am(0, T, s, y, 0, f)) < T) for (h.dlShiftTo(y, D), s.subTo(D, s); s[v] < --T; ) s.subTo(D, s);
                }
                null != i && (s.drShiftTo(f, i), n != e && B.ZERO.subTo(i, i)), s.t = f, s.clamp(), 
                0 < u && s.rShiftTo(u, s), n < 0 && B.ZERO.subTo(s, s);
            }
        }
    }, B.prototype.invDigit = function() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var i = 3 & t;
        return 0 < (i = (i = (i = (i = i * (2 - (15 & t) * i) & 15) * (2 - (255 & t) * i) & 255) * (2 - ((65535 & t) * i & 65535)) & 65535) * (2 - t * i % this.DV) % this.DV) ? this.DV - i : -i;
    }, B.prototype.isEven = function() {
        return 0 == (0 < this.t ? 1 & this[0] : this.s);
    }, B.prototype.exp = function(t, i) {
        if (4294967295 < t || t < 1) return B.ONE;
        var s = d(), o = d(), r = i.convert(this), h = A(t) - 1;
        for (r.copyTo(s); 0 <= --h; ) if (i.sqrTo(s, o), 0 < (t & 1 << h)) i.mulTo(o, r, s); else {
            var n = s;
            s = o, o = n;
        }
        return i.revert(s);
    }, B.prototype.toString = function(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var i;
        if (16 == t) i = 4; else if (8 == t) i = 3; else if (2 == t) i = 1; else if (32 == t) i = 5; else {
            if (4 != t) return this.toRadix(t);
            i = 2;
        }
        var s, o = (1 << i) - 1, r = !1, h = "", n = this.t, e = this.DB - n * this.DB % i;
        if (0 < n--) for (e < this.DB && 0 < (s = this[n] >> e) && (r = !0, h = u(s)); 0 <= n; ) e < i ? (s = (this[n] & (1 << e) - 1) << i - e, 
        s |= this[--n] >> (e += this.DB - i)) : (s = this[n] >> (e -= i) & o, e <= 0 && (e += this.DB, 
        --n)), 0 < s && (r = !0), r && (h += u(s));
        return r ? h : "0";
    }, B.prototype.negate = function() {
        var t = d();
        return B.ZERO.subTo(this, t), t;
    }, B.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this;
    }, B.prototype.compareTo = function(t) {
        var i = this.s - t.s;
        if (0 != i) return i;
        var s = this.t;
        if (0 != (i = s - t.t)) return i;
        for (;0 <= --s; ) if (0 != (i = this[s] - t[s])) return i;
        return 0;
    }, B.prototype.bitLength = function() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + A(this[this.t - 1] ^ this.s & this.DM);
    }, B.prototype.mod = function(t) {
        var i = d();
        return this.abs().divRemTo(t, null, i), this.s < 0 && 0 < i.compareTo(B.ZERO) && t.subTo(i, i), 
        i;
    }, B.prototype.modPowInt = function(t, i) {
        var s;
        return s = t < 256 || i.isEven() ? new p(i) : new a(i), this.exp(t, s);
    }, B.ZERO = e(0), B.ONE = e(1), null == o) {
        var c;
        for (o = new Array(), h = 0; h < D; ) c = Math.floor(65536 * Math.random()), o[h++] = c >>> 8, 
        o[h++] = 255 & c;
        h = 0, l();
    }
    function m() {
        if (null == s) {
            for (l(), (s = new y()).init(o), h = 0; h < o.length; ++h) o[h] = 0;
            h = 0;
        }
        return s.next();
    }
    function v() {}
    function y() {
        this.i = 0, this.j = 0, this.S = new Array();
    }
    v.prototype.nextBytes = function(t) {
        var i;
        for (i = 0; i < t.length; ++i) t[i] = m();
    }, y.prototype.init = function(t) {
        var i, s, o;
        for (i = 0; i < 256; ++i) this.S[i] = i;
        for (i = s = 0; i < 256; ++i) s = s + this.S[i] + t[i % t.length] & 255, o = this.S[i], 
        this.S[i] = this.S[s], this.S[s] = o;
        this.i = 0, this.j = 0;
    }, y.prototype.next = function() {
        var t;
        return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], 
        this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
    };
    var D = 256;
    return {
        encrypt: function(t, i, s) {
            i = i || "F20CE00BAE5361F8FA3AE9CEFA495362FF7DA1BA628F64A347F0A8C012BF0B254A30CD92ABFFE7A6EE0DC424CB6166F8819EFA5BCCB20EDFB4AD02E412CCF579B1CA711D55B8B0B3AEB60153D5E0693A2A86F3167D7847A0CB8B00004716A9095D9BADC977CBB804DBDCBA6029A9710869A453F27DFDDF83C016D928B3CBF4C7", 
            s = s || "3";
            var o = new r();
            return o.setPublic(i, s), o.encrypt(t);
        }
    };
}();