var _component = require("../common/component"), _utils = require("./utils");

(0, _component.VantComponent)({
    props: {
        disabled: Boolean,
        multiple: Boolean,
        uploadText: String,
        useBeforeRead: Boolean,
        previewSize: {
            type: null,
            value: 90
        },
        name: {
            type: [ Number, String ],
            value: ""
        },
        accept: {
            type: String,
            value: "image"
        },
        sizeType: {
            type: Array,
            value: [ "original", "compressed" ]
        },
        capture: {
            type: Array,
            value: [ "album", "camera" ]
        },
        fileList: {
            type: Array,
            value: [],
            observer: "formatFileList"
        },
        maxSize: {
            type: Number,
            value: Number.MAX_VALUE
        },
        maxCount: {
            type: Number,
            value: 100
        },
        deletable: {
            type: Boolean,
            value: !0
        },
        previewImage: {
            type: Boolean,
            value: !0
        },
        previewFullImage: {
            type: Boolean,
            value: !0
        },
        imageFit: {
            type: String,
            value: "scaleToFill"
        },
        camera: {
            type: String,
            value: "back"
        },
        compressed: {
            type: Boolean,
            value: !0
        },
        maxDuration: {
            type: Number,
            value: 60
        }
    },
    data: {
        lists: [],
        computedPreviewSize: "",
        isInCount: !0
    },
    methods: {
        formatFileList: function() {
            var e = this.data, t = e.fileList, a = void 0 === t ? [] : t, i = e.maxCount, n = a.map(function(e) {
                return Object.assign(Object.assign({}, e), {
                    isImage: void 0 === e.isImage ? (0, _utils.isImageFile)(e) : e.isImage
                });
            });
            this.setData({
                lists: n,
                isInCount: n.length < i
            });
        },
        startUpload: function() {
            var a = this;
            if (!this.data.disabled) {
                var e = this.data, t = e.name, i = void 0 === t ? "" : t, n = e.capture, r = e.maxCount, s = e.multiple, o = e.maxSize, l = e.accept, u = e.sizeType, m = e.lists, c = e.camera, p = e.compressed, d = e.maxDuration, v = e.useBeforeRead, f = void 0 !== v && v, g = r - m.length;
                ("image" === l ? new Promise(function(e, t) {
                    wx.chooseImage({
                        count: s ? 9 < g ? 9 : g : 1,
                        sourceType: n,
                        sizeType: u,
                        success: e,
                        fail: t
                    });
                }) : "video" === l ? new Promise(function(e, t) {
                    wx.chooseVideo({
                        sourceType: n,
                        compressed: p,
                        maxDuration: d,
                        camera: c,
                        success: e,
                        fail: t
                    });
                }) : new Promise(function(e, t) {
                    wx.chooseMessageFile({
                        count: s ? g : 1,
                        type: "file",
                        success: e,
                        fail: t
                    });
                })).then(function(e) {
                    var t = null;
                    if ((t = (0, _utils.isVideo)(e, l) ? Object.assign({
                        path: e.tempFilePath
                    }, e) : s ? e.tempFiles : e.tempFiles[0]) instanceof Array) {
                        if (!t.every(function(e) {
                            return e.size <= o;
                        })) return void a.$emit("oversize", {
                            name: i
                        });
                    } else if (t.size > o) return void a.$emit("oversize", {
                        name: i
                    });
                    f ? a.$emit("before-read", {
                        file: t,
                        name: i,
                        callback: function(e) {
                            e && a.$emit("after-read", {
                                file: t,
                                name: i
                            });
                        }
                    }) : a.$emit("after-read", {
                        file: t,
                        name: i
                    });
                }).catch(function(e) {
                    a.$emit("error", e);
                });
            }
        },
        deleteItem: function(e) {
            var t = e.currentTarget.dataset.index;
            this.$emit("delete", {
                index: t,
                name: this.data.name
            });
        },
        doPreviewImage: function(e) {
            if (this.data.previewFullImage) {
                var t = e.currentTarget.dataset.url, a = this.data.lists.filter(function(e) {
                    return e.isImage;
                }).map(function(e) {
                    return e.url || e.path;
                });
                this.$emit("click-preview", {
                    url: t,
                    name: this.data.name
                }), wx.previewImage({
                    urls: a,
                    current: t,
                    fail: function() {
                        wx.showToast({
                            title: "预览图片失败",
                            icon: "none"
                        });
                    }
                });
            }
        }
    }
});