var app = getApp();

Component({
    properties: {
        page: {
            type: Object,
            value: {}
        }
    },
    data: {
        navH: ""
    },
    attached: function() {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    methods: {
        showlist: function() {
            this.setData({
                showList: !this.data.showList
            });
        }
    }
});