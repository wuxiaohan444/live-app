Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

function isDef(t) {
    return null != t;
}

function isObj(t) {
    var e = void 0 === t ? "undefined" : _typeof(t);
    return null !== t && ("object" === e || "function" === e);
}

function isNumber(t) {
    return /^\d+(\.\d+)?$/.test(t);
}

function range(t, e, n) {
    return Math.min(Math.max(t, e), n);
}

function nextTick(t) {
    setTimeout(function() {
        t();
    }, 1e3 / 30);
}

exports.isDef = isDef, exports.isObj = isObj, exports.isNumber = isNumber, exports.range = range, 
exports.nextTick = nextTick, exports.getSystemInfoSync = getSystemInfoSync, exports.addUnit = addUnit;

var systemInfo = null;

function getSystemInfoSync() {
    return null == systemInfo && (systemInfo = wx.getSystemInfoSync()), systemInfo;
}

function addUnit(t) {
    if (isDef(t)) return isNumber(t = String(t)) ? t + "px" : t;
}