Component({
    properties: {
        modalInfo: {
            type: Object,
            value: {
                showModal: !1,
                modalTitle: null,
                modalTxt: "",
                confirmTxt: "确定",
                cancelTxt: "取消",
                showCancel: !0,
                showConfirm: !0,
                share: !1,
                rootClass: "address"
            },
            observer: function() {}
        },
        confirmBtnStyle: {
            type: String,
            value: ""
        },
        rootStyle: {
            type: String,
            value: ""
        },
        titleStyle: {
            type: String,
            value: ""
        },
        contentStyle: {
            type: String,
            value: ""
        },
        maskClose: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        closeModal: function() {
            this.setData({
                "modalInfo.showModal": !1
            }), this.triggerEvent("closeModal");
        },
        prevent: function() {},
        preventTouchMove: function() {},
        cancel: function() {
            this.closeModal(), this.triggerEvent("cancelModal");
        },
        confirm: function() {
            this.closeModal(), this.triggerEvent("confirmModal");
        }
    }
});