var _extends = Object.assign || function (t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
}, _util = require("../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp(), area = require("area.js");

Component({
    behaviors: ["wx://form-field"],
    properties: {
        fields: {
            type: Object,
            value: []
        }
    },
    data: {
        extend: "_value",
        picker_show: !1,
        current_index: "",
        columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
        fileListZ: [],
        fileListB: [],
        indexZ: 0,
        indexB: 1,
        timer_show: !1,
        minHour: 10,
        maxHour: 20,
        minDate: new Date().getTime(),
        maxDate: new Date(2029, 10, 1).getTime(),
        currentDate: new Date().getTime(),
        range_min_data_show: !1,
        range_max_data_show: !1,
        maxMinDate: new Date().getTime(),
        maxMaxDate: new Date(2029, 10, 1).getTime(),
        range_min_timer_show: !1,
        range_max_timer_show: !1,
        maxMinTimer: 0,
        maxMaxTimer: 23,
        maxMinMinuteTimer: 0,
        maxMaxMinuteTimer: 59,
        areaList: area.default,
        area_show: !1,
        areaText: "",
        value: [],
        img: '../../images/addshop.png'
    },
    attached: function () {
        var t = [];
        for (var a in this.data.fields) {
            var e = {
                name: a,
                max_value: this.data.fields[a].max_value,
                min_value: this.data.fields[a].min_value,
                tp_name: this.data.fields[a].tp_name,
                tp_max: this.data.fields[a].tp_max,
                tp_text: this.changeFormText(this.data.fields[a]),
                value: this.data.fields[a].value,
                tp_must: this.data.fields[a].tp_must,
                data_type: this.data.fields[a].data_type,
                tp_is_default: this.data.fields[a].tp_is_default,
                tp_default: this.data.fields[a].tp_default,
                err_msg: this.inputErrMsg(this.data.fields[a])
            };
            t.push(e);
        }
        this.setData({
            value: t
        });
    },
    ready: function () {
        this.doSetFormData(), console.log(JSON.stringify(this.data.fields));
    },
    methods: {
        doSetFormData: function () {
            this.triggerEvent("getDiyFormData", {
                extends: this.data.value
            });
        },
        changeFormText: function (t) {
            if (3 == t.data_type) {
                for (var a = [], e = 0; e < t.tp_text.length; e++) a.push({
                    name: t.tp_text[e],
                    checked: !1
                });
                return a;
            }
            return t.tp_text;
        },
        inputErrMsg: function (t) {
            var a = "";
            return 8 == t.data_type || 12 == t.data_type ? 1 != t.tp_must || t.min_value && t.max_value || (a += t.tp_name + "请填写完整") : 1 != t.tp_must || t.value || (a += t.tp_name + "不能为空"),
            6 != t.data_type || _util2.default.isIdCardNo(t.value) || (a += t.tp_name + "不正确"),
                a;
        },
        getInput0Value: function (t) {
            var a = t.currentTarget.dataset.index, e = this.data.value;
            e[a].value = t.detail.value, e[a].err_msg = this.inputErrMsg(e[a]), this.setData({
                value: e
            }), this.doSetFormData();
        },
        getInput1Value: function (t) {
            var a = t.currentTarget.dataset.index, e = this.data.value;
            e[a].value = t.detail.value, e[a].err_msg = this.inputErrMsg(e[a]), this.setData({
                value: e
            }), this.doSetFormData();
        },
        getInput6Value: function (t) {
            var a = t.currentTarget.dataset.index, e = this.data.value;
            e[a].value = t.detail.value, e[a].err_msg = this.inputErrMsg(e[a]), this.setData({
                value: e
            }), this.doSetFormData();
        },
        checkboxChange: function (t) {
            for (var a = t.currentTarget.dataset.index, e = this.data.value, i = 0; i < e[a].tp_text.length; i++) for (var n = 0; n < t.detail.value.length; n++) e[a].tp_text[i].name == t.detail.value[n] && (e[a].tp_text[i].checked = !0);
            e[a].value = t.detail.value, e[a].err_msg = this.inputErrMsg(e[a]), this.setData({
                value: e
            }), this.doSetFormData();
        },
        onAreaShow: function (t) {
            this.setData({
                area_show: !this.data.area_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onAreaClose: function () {
            this.setData({
                area_show: !this.data.area_show,
                current_index: ""
            });
        },
        areaConfirm: function (t) {
            for (var a = "", e = 0; e < t.detail.values.length; e++) e != t.detail.values.length - 1 ? a += t.detail.values[e].name + "/" : a += t.detail.values[e].name;
            var i = this.data.value;
            i[this.data.current_index].value = a, i[this.data.current_index].err_msg = this.inputErrMsg(i[this.data.current_index]),
                this.setData({
                    value: i,
                    area_show: !this.data.area_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onDataShow: function (t) {
            this.setData({
                data_show: !this.data.data_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onDataClose: function () {
            this.setData({
                data_show: !1
            });
        },
        onData: function (t) {
        },
        onConfirmDate: function (t) {
            var a = this.timeTransform(t.detail, 2);
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            console.log(111111, this.data.current_index), e[this.data.current_index].value = a,
                e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    data_show: !this.data.data_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onMinDataShow: function (t) {
            this.setData({
                range_min_data_show: !this.data.range_min_data_show,
                current_index: t.currentTarget.dataset.index,
                maxMinDate: new Date().getTime()
            });
        },
        onMinDataClose: function () {
            this.setData({
                range_min_data_show: !this.data.range_min_data_show,
                current_index: ""
            });
        },
        onMinData: function (t) {
            var a = this.timeTransform(t.detail, 2);
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            e[this.data.current_index].min_value = a, e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    newMinDate: e,
                    maxMinDate: t.detail,
                    range_min_data_show: !this.data.range_min_data_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onMaxDataShow: function (t) {
            this.setData({
                range_max_data_show: !this.data.range_max_data_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onMaxDataClose: function () {
            this.setData({
                range_max_data_show: !this.data.range_max_data_show,
                current_index: ""
            });
        },
        onMaxData: function (t) {
            var a = this.timeTransform(t.detail, 2);
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            e[this.data.current_index].max_value = a, e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    newMaxDate: e,
                    maxMaxDate: t.detail,
                    range_max_data_show: !this.data.range_max_data_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onTimerShow: function (t) {
            this.setData({
                timer_show: !this.data.timer_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onTimerClose: function () {
            this.setData({
                timer_show: !this.data.timer_show,
                current_index: ""
            });
        },
        onConfirmTime: function (t) {
            var a = this.timeTransform(t.detail, 1);
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            e[this.data.current_index].value = a, e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    timer_show: !this.data.timer_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onMinTimerShow: function (t) {
            this.setData({
                range_min_timer_show: !this.data.range_min_timer_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onMinTimerClose: function () {
            this.setData({
                range_min_timer_show: !this.data.range_min_timer_show,
                current_index: ""
            });
        },
        onMinTimer: function (t) {
            var a = t.detail.split(":");
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            e[this.data.current_index].min_value = t.detail, e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    maxMinTimer: a[0],
                    range_min_timer_show: !this.data.range_min_timer_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        onMaxTimerShow: function (t) {
            this.setData({
                range_max_timer_show: !this.data.range_max_timer_show,
                current_index: t.currentTarget.dataset.index
            });
        },
        onMaxTimerClose: function () {
            this.setData({
                range_max_timer_show: !this.data.range_max_timer_show,
                current_index: ""
            });
        },
        onMaxTimer: function (t) {
            var a = t.detail.split(":");
            if (!this.data.current_index) return !1;
            var e = this.data.value;
            e[this.data.current_index].max_value = t.detail, e[this.data.current_index].err_msg = this.inputErrMsg(e[this.data.current_index]),
                this.setData({
                    value: e,
                    maxMinTimer: a[0],
                    range_max_timer_show: !this.data.range_max_timer_show,
                    current_index: ""
                }), this.doSetFormData();
        },
        timeTransform: function (t, a) {
            var e = "", i = new Date(t), n = i.getFullYear() + "-",
                r = (i.getMonth() + 1 < 10 ? "0" + (i.getMonth() + 1) : i.getMonth() + 1) + "-",
                s = (i.getDate() < 10 ? "0" + i.getDate() : i.getDate()) + " ",
                d = (i.getHours() < 10 ? "0" + i.getHours() : i.getHours()) + ":",
                u = (i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes()) + ":",
                o = i.getSeconds() < 10 ? "0" + i.getSeconds() : i.getSeconds();
            return 1 == a ? e = n + r + s + d + u + o : 2 == a ? e = n + r + s : 3 == a && (e = d + u + o),
                e;
        },
        afterRead: function (d) {
            var u = this, o = d.detail.file;
            let index = d.currentTarget.dataset.index;
            if (this.data.fileListZ.length < index) {
                this.data.fileListZ.length = index;
            }
            wx.uploadFile({
                url: app.globalData.url + "/common/upload/image",
                filePath: o.path,
                name: "image",
                formData: {
                    filename: "image"
                },
                success: function (t) {
                    var a = JSON.parse(t.data), e = u.data.fileList, i = void 0 === e ? [] : e;
                    i.push(_extends({}, o, {
                        url: a.data.url
                    }));
                    u.data.fileListZ[index] = ({...o, url: a.data.url});
                    u.data.fileListZ[index] = Array.of(u.data.fileListZ[index]);
                    u.setData({
                        fileListZ: u.data.fileListZ
                    });

                    var n = d.currentTarget.dataset.index, r = u.data.value, s = r[n].value ? r[n].value : [];
                    s.push({
                        url: a.data.url
                    }), r[n].value = s, r[n].err_msg = u.inputErrMsg(r[n]), 0 === n ? u.setData({
                        value: r,
                        fileListZ: [i[0]]
                    }) : 1 === n && u.setData({
                        value: r,
                        fileListB: [i[0]]
                    }), u.doSetFormData();
                }
            });
            console.log(this.data.fileListZ);
        },
        onDeleteImg: function (t) {
            let index = t.currentTarget.dataset.index;
            this.data.fileList;
            var a = t.currentTarget.dataset.index, e = this.data.value;
            e[a].value = '';
            this.data.fileListZ[index] = [];
            this.setData({
                fileListZ: this.data.fileListZ,
                value: e
            }) ,
                this.doSetFormData();

        },
        close: function () {
            this.setData({
                pay_close: !this.data.pay_close
            });
        },
        onChange: function (t) {
            var a = t.detail;
            a.picker, a.value, a.index;
        },
        onPickerConfirm: function (t) {
            var a = t.detail, e = (a.picker, a.value), i = (a.index, this.data.value);
            i[this.data.current_index].value = e, i[this.data.current_index].err_msg = this.inputErrMsg(i[this.data.current_index]),
                this.setData({
                    value: i,
                    current_index: "",
                    picker_show: !this.data.picker_show
                }), this.doSetFormData();
        },

        selectPicker: function (t) {
            this.setData({
                picker_show: !this.data.picker_show,
                columns: t.currentTarget.dataset.data,
                current_index: t.currentTarget.dataset.index
            });
        },
        onPickerCancel: function () {
            this.setData({
                picker_show: !this.data.picker_show
            });
        },
        onPickerClose: function () {
            this.setData({
                picker_show: !this.data.picker_show
            });
        },
        onDateClose: function () {
            this.setData({
                data_show: !this.data.data_show
            });
        },
        onCancelDate: function () {
            this.setData({
                data_show: !this.data.data_show
            });
        },
        onCancelMinData: function () {
            this.setData({
                range_min_data_show: !this.data.range_min_data_show
            });
        },
        onCancelMaxData: function () {
            this.setData({
                range_max_data_show: !this.data.range_max_data_show
            });
        },
        onCancelTime: function () {
            this.setData({
                timer_show: !this.data.timer_show
            });
        },
        onCancelMinTimer: function () {
            this.setData({
                range_min_timer_show: !this.data.range_min_timer_show
            });
        },
        onCancelMaxTimer: function () {
            this.setData({
                range_max_timer_show: !this.data.range_max_timer_show
            });
        },
        onCancelArea: function () {
            this.setData({
                area_show: !this.data.area_show
            });
        },

    }
});