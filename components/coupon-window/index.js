var app = getApp();

Component({
    properties: {
        window: {
            type: Boolean,
            value: !1
        },
        couponList: {
            type: Array,
            value: []
        }
    },
    data: {},
    attached: function() {},
    methods: {
        close: function() {
            this.triggerEvent("onColse");
        }
    }
});