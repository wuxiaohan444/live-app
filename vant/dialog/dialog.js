Object.defineProperty(exports, "__esModule", {
    value: !0
});

var queue = [];

function getContext() {
    var e = getCurrentPages();
    return e[e.length - 1];
}

var Dialog = function e(n) {
    return n = Object.assign(Object.assign({}, e.currentOptions), n), new Promise(function(e, t) {
        var o = (n.context || getContext()).selectComponent(n.selector);
        delete n.context, delete n.selector, o ? (o.setData(Object.assign({
            onCancel: t,
            onConfirm: e
        }, n)), queue.push(o)) : console.warn("未找到 van-dialog 节点，请确认 selector 及 context 是否正确");
    });
};

Dialog.defaultOptions = {
    show: !0,
    title: "",
    width: null,
    message: "",
    zIndex: 100,
    overlay: !0,
    selector: "#van-dialog",
    className: "",
    asyncClose: !1,
    transition: "scale",
    customStyle: "",
    messageAlign: "",
    overlayStyle: "",
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    showConfirmButton: !0,
    showCancelButton: !1,
    closeOnClickOverlay: !1,
    confirmButtonOpenType: ""
}, (Dialog.alert = Dialog).confirm = function(e) {
    return Dialog(Object.assign({
        showCancelButton: !0
    }, e));
}, Dialog.close = function() {
    queue.forEach(function(e) {
        e.close();
    }), queue = [];
}, Dialog.stopLoading = function() {
    queue.forEach(function(e) {
        e.stopLoading();
    });
}, Dialog.setDefaultOptions = function(e) {
    Object.assign(Dialog.currentOptions, e);
}, Dialog.resetDefaultOptions = function() {
    Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);
}, Dialog.resetDefaultOptions(), exports.default = Dialog;