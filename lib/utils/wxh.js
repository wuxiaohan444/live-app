var carmin = function(t) {
    var n = t.data.num;
    1 < n && n--;
    var a = n <= 1 ? "disabled" : "normal";
    t.setData({
        num: n,
        minusStatus: a
    });
}, home = function(t, n) {
    n.touches[0].clientY < 500 && 0 < n.touches[0].clientY && t.setData({
        top: n.touches[0].clientY
    });
}, carjia = function(t) {
    var n = t.data.num, a = ++n < 1 ? "disabled" : "normal";
    t.setData({
        num: n,
        minusStatus: a
    });
}, time = function(t, i) {
    var u = null, c = t - Date.parse(new Date()) / 1e3;
    u = setInterval(function() {
        var t = c, n = Math.floor(t / 3600), a = n.toString();
        1 == a.length && (a = "0" + a);
        var o = Math.floor((t - 3600 * n) / 60), e = o.toString();
        1 == e.length && (e = "0" + e);
        var r = (t - 3600 * n - 60 * o).toString();
        1 == r.length && (r = "0" + r), i.setData({
            countDownHour: a,
            countDownMinute: e,
            countDownSecond: r
        }), --c <= 0 && (clearInterval(u), wx.showToast({
            title: "活动已结束",
            icon: "none",
            duration: 1e3,
            mask: !0
        }), i.setData({
            countDownHour: "00",
            countDownMinute: "00",
            countDownSecond: "00"
        }));
    }.bind(i), 1e3), i.setData({
        interval: u
    });
}, time2 = function(t, c) {
    var s = t - Date.parse(new Date()) / 1e3, l = setInterval(function() {
        var t = s, n = Math.floor(t / 3600 / 24), a = n.toString();
        1 == a.length && (a = "0" + a);
        var o = Math.floor((t - 3600 * n * 24) / 3600), e = o.toString();
        1 == e.length && (e = "0" + e);
        var r = Math.floor((t - 3600 * n * 24 - 3600 * o) / 60), i = r.toString();
        1 == i.length && (i = "0" + i);
        var u = Math.floor(t - 3600 * n * 24 - 3600 * o - 60 * r).toString();
        1 == u.length && (u = "0" + u), c.setData({
            countDownDay: a,
            countDownHour: e,
            countDownMinute: i,
            countDownSecond: u
        }), --s <= 0 && (clearInterval(l), wx.showToast({
            title: "活动已结束"
        }), c.setData({
            countDownDay: "00",
            countDownHour: "00",
            countDownMinute: "00",
            countDownSecond: "00"
        }));
    }.bind(c), 1e3);
    c.setData({
        interval: l
    });
}, footan = function(t) {
    t.setData({
        prostatus: !0,
        show: !1
    });
}, tapsize = function(t, n) {
    var a = n.target.dataset.indexs, o = n.target.dataset.index;
    t.setData({
        taberindexs: a,
        taberindex: o
    });
};

module.exports = {
    carmin: carmin,
    carjia: carjia,
    time: time,
    footan: footan,
    tapsize: tapsize,
    home: home,
    time2: time2
};