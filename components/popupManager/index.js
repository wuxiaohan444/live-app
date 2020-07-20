Component({
    properties: {
        live: {
            type: Object,
            value: []
        }
    },
    data: {
        showType: "coupon"
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    },
    methods: {
        closePopup: function() {
            this.setData({
                showType: ""
            });
        }
    }
});