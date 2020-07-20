var app = getApp();

Component({
    properties: {
        sharePacket: {
            type: Object,
            value: {
                isState: !0,
                priceName: ""
            }
        }
    },
    data: {},
    attached: function() {},
    methods: {
        closeShare: function() {
            this.setData({
                "sharePacket.isState": !0
            });
        },
        goShare: function() {
            this.triggerEvent("listenerActionSheet");
        }
    }
});