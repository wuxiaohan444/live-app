var _extends = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, _live = require("../../../api/live.js"), _common = require("../../../api/common"), _wxParse = require("../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse), _dialog = require("../../../vant/dialog/dialog"), _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "",
            color: !0,
            class: "red"
        },
        formData: {
            title: "",
            cover: "",
            start_at: "",
            limit_type: "0",
            intro: ""
        },
        fileList: [],
        data_show: !1,
        examineKeywords: {},
        minData: new Date().getTime(),
        shopTextarea: !0
    },
    onLoad: function(t) {
        var a = this.data.formData;
        a.start_at = this.timeTransform(this.data.minData), this.setData({
            formData: a
        }), this.getExamineKeywords();
    },
    getExamineKeywords: function() {
        var a = this;
        (0, _common.getExamineKeywords)().then(function(t) {
            a.setData({
                examineKeywords: t.data,
                "parameter.title": t.data.keywords_live_start + t.data.keywords_live_notice
            }), _wxParse2.default.wxParse("page_content", "html", t.data.page_content, a, 0);
        }).catch(function(t) {});
    },
    getNameValue: function(t) {
        var a = this.data.formData;
        a.title = t.detail.value, this.setData({
            formData: a
        });
    },
    getIntroValue: function(t) {
        var a = this.data.formData;
        a.intro = t.detail.value, this.setData({
            formData: a
        });
    },
    onDataShow: function(t) {
        this.setData({
            data_show: !this.data.data_show
        });
    },
    onDataClose: function() {
        this.setData({
            data_show: !1
        });
    },
    onData: function(t) {},
    timeTransform: function(t) {
        var a = new Date(t);
        return a.getFullYear() + "-" + ((a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "-") + ((a.getDate() < 10 ? "0" + a.getDate() : a.getDate()) + " ") + ((a.getHours() < 10 ? "0" + a.getHours() : a.getHours()) + ":") + (a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes());
    },
    onConfirmDate: function(t) {
        var a = this.timeTransform(t.detail), e = this.data.formData;
        e.start_at = a, this.setData({
            data_show: !this.data.data_show,
            formData: e
        });
    },
    afterRead: function(t) {
        var r = this, n = t.detail.file;
        wx.uploadFile({
            url: app.globalData.url + "/common/upload/image",
            filePath: n.path,
            name: "image",
            formData: {
                filename: "image"
            },
            success: function(t) {
                var a = JSON.parse(t.data), e = r.data.formData, i = r.data.fileList, o = void 0 === i ? [] : i;
                o.push(_extends({}, n, {
                    url: a.url
                })), e.cover = a.data.url, console.log(111111, a), console.log(111111, e), r.setData({
                    fileList: o,
                    formData: e
                });
            }
        });
    },
    onDeleteImg: function(t) {
        var a = this.data.fileList;
        console.log(111111, a), console.log(111111, t.detail.index);
        for (var e = 0; e < a.length; e++) e == t.detail.index && a.splice(e, 1);
        this.setData({
            fileList: a
        });
    },
    onChange: function(t) {
        var a = t.detail;
        a.picker, a.value, a.index;
    },
    onPickerConfirm: function(t) {
        var a = t.detail, e = (a.picker, a.value), i = (a.index, this.data.value);
        i[this.data.current_index].value = e, i[this.data.current_index].err_msg = this.inputErrMsg(i[this.data.current_index]), 
        this.setData({
            value: i,
            current_index: "",
            picker_show: !this.data.picker_show
        }), this.doSetFormData();
    },
    onDateClose: function() {
        this.setData({
            data_show: !this.data.data_show
        });
    },
    onCancelDate: function() {
        this.setData({
            data_show: !this.data.data_show
        });
    },
    submit_notice: function(t) {
        var a = this;
        return this.data.formData.title ? this.data.formData.cover ? this.data.formData.start_at ? this.data.formData.intro ? void (0, 
        _live.createLiveNotice)(this.data.formData).then(function(t) {
            a.setData({
                shopTextarea: !1
            }), _dialog2.default.confirm({
                title: "温馨提示",
                message: t.msg,
                cancelButtonText: "逛逛商城",
                confirmButtonText: "去添加商品"
            }).then(function() {
                wx.redirectTo({
                    url: "/live/pages/anchor-goods/index"
                });
            }).catch(function() {
                wx.redirectTo({
                    url: "/common/pages/loading/loading"
                });
            });
        }).catch(function(t) {
            return app.Tips({
                title: t
            });
        }) : app.Tips({
            title: "请填写" + this.data.examineKeywords.keywords_live_notice + "简介"
        }) : app.Tips({
            title: "请选择时间"
        }) : app.Tips({
            title: "请上传" + this.data.examineKeywords.keywords_live_notice + "封面"
        }) : app.Tips({
            title: "请填写" + this.data.examineKeywords.keywords_live_notice + "标题"
        });
    },
    gopages: function() {
        wx.redirectTo({
            url: "/live/pages/anchor-goods/index"
        });
    },
    onChangeLimitType: function(t) {
        var a = this.data.formData;
        a.limit_type = t.detail, this.setData({
            formData: a
        });
    }
});