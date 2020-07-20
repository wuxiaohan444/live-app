function padZero(e) {
    for (var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2, o = e + ""; o.length < r; ) o = "0" + o;
    return o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.parseTimeData = parseTimeData, exports.parseFormat = parseFormat, exports.isSameSecond = isSameSecond;

var SECOND = 1e3, MINUTE = 60 * SECOND, HOUR = 60 * MINUTE, DAY = 24 * HOUR;

function parseTimeData(e) {
    return {
        days: Math.floor(e / DAY),
        hours: Math.floor(e % DAY / HOUR),
        minutes: Math.floor(e % HOUR / MINUTE),
        seconds: Math.floor(e % MINUTE / SECOND),
        milliseconds: Math.floor(e % SECOND)
    };
}

function parseFormat(e, r) {
    var o = r.days, a = r.hours, s = r.minutes, t = r.seconds, n = r.milliseconds;
    return -1 === e.indexOf("DD") ? a += 24 * o : e = e.replace("DD", padZero(o)), -1 === e.indexOf("HH") ? s += 60 * a : e = e.replace("HH", padZero(a)), 
    -1 === e.indexOf("mm") ? t += 60 * s : e = e.replace("mm", padZero(s)), -1 === e.indexOf("ss") ? n += 1e3 * t : e = e.replace("ss", padZero(t)), 
    e.replace("SSS", padZero(n, 3));
}

function isSameSecond(e, r) {
    return Math.floor(e / 1e3) === Math.floor(r / 1e3);
}