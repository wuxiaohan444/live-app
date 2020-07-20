var encrypt = require("encrypt.js"), sdkappid = 10001;

function anologin(t) {
    wx.request({
        url: "https://tls.qcloud.com/anologin",
        data: {
            passwd: encrypt.getRSAH1(),
            url: "https://tls.qcloud.com/demo.html",
            sdkappid: sdkappid
        },
        method: "GET",
        header: {},
        success: function(i) {
            var e = i.data.match(/tlsAnoLogin\((.*?)\)/), s = JSON.parse(e[1]);
            login({
                TmpSig: s.TmpSig,
                Identifier: s.Identifier,
                success: t
            });
        }
    });
}

function login(t) {
    wx.request({
        url: "https://tls.qcloud.com/getUserSig",
        data: {
            tmpsig: t.TmpSig,
            identifier: t.Identifier,
            sdkappid: sdkappid
        },
        method: "GET",
        header: {},
        success: function(i) {
            var e = i.data.match(/tlsGetUserSig\((.*?)\)/), s = JSON.parse(e[1]).UserSig;
            t.success && t.success({
                Identifier: t.Identifier,
                UserSig: s
            });
        },
        fail: function(i) {
            t.error && t.error(i);
        }
    });
}

module.exports = {
    init: function(i) {
        sdkappid = i.sdkappid;
    },
    anologin: anologin,
    login: login
};