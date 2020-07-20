var _goods = require("../../../../api/plugin/merch/goods"), _util = require("../../../../lib/utils/util"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        sitepath: app.getDomain(),
        parameter: {
            title: "商品描述",
            navbar: "1",
            return: "1",
            color: !0,
            class: "red"
        },
        formData: {},
        formats: {},
        readOnly: !1,
        placeholder: "开始输入...",
        editorHeight: 300,
        keyboardHeight: 0,
        isIOS: !1
    },
    onLoad: function(t) {
        var e = "ios" === wx.getSystemInfoSync().platform;
        this.setData({
            isIOS: e
        });
        var o = this;
        this.updatePosition(0);
        var a = 0;
        wx.onKeyboardHeightChange(function(t) {
            if (t.height !== a) {
                var e = 0 < t.height ? 1e3 * t.duration : 0;
                a = t.height, setTimeout(function() {
                    wx.pageScrollTo({
                        scrollTop: 0,
                        success: function() {
                            o.updatePosition(a), o.editorCtx.scrollIntoView();
                        }
                    });
                }, e);
            }
        });
    },
    onLoadFun: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    readOnlyChange: function() {
        this.setData({
            readOnly: !this.data.readOnly
        });
    },
    updatePosition: function(t) {
        var e = wx.getSystemInfoSync(), o = e.windowHeight, a = (e.platform, 0 < t ? o - t - 50 : o - app.globalData.navHeight);
        this.setData({
            editorHeight: a,
            keyboardHeight: t
        });
    },
    calNavigationBarAndStatusBar: function() {
        var t = wx.getSystemInfoSync();
        return t.statusBarHeight + ("ios" === t.platform ? 44 : 48);
    },
    onEditorReady: function() {
        var o = this;
        wx.createSelectorQuery().select("#editor").context(function(t) {
            o.editorCtx = t.context;
            var e = _util2.default.getCache("merchGoodsFormData", {});
            o.editorCtx.setContents({
                html: e.description
            });
        }).exec();
    },
    blur: function() {
        this.editorCtx.blur();
    },
    format: function(t) {
        var e = t.target.dataset, o = e.name, a = e.value;
        o && this.editorCtx.format(o, a);
    },
    onStatusChange: function(t) {
        var e = t.detail;
        this.setData({
            formats: e
        });
    },
    insertDivider: function() {
        this.editorCtx.insertDivider({
            success: function() {
                console.log("insert divider success");
            }
        });
    },
    clear: function() {
        this.editorCtx.clear({
            success: function(t) {
                console.log("clear success");
            }
        });
    },
    removeFormat: function() {
        this.editorCtx.removeFormat();
    },
    insertDate: function() {
        var t = new Date(), e = t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate();
        this.editorCtx.insertText({
            text: e
        });
    },
    insertImage: function() {
        var o = this;
        _util2.default.uploadImageOne("common/upload/image", function(t) {
            var e = t.data.url;
            o.editorCtx.insertImage({
                src: e,
                data: {
                    id: "abcd",
                    role: "god"
                },
                width: "80%",
                success: function() {
                    console.log("insert image success");
                }
            });
        });
    },
    formChange: function(t) {
        var e = _util2.default.getCache("merchGoodsFormData", {});
        e.description = t.detail.html, this.setData({
            formData: e
        }), _util2.default.setCache("merchGoodsFormData", e, 600);
    }
});