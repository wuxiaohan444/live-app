Component({
    properties: {
        page: {
            type: Object,
            value: {}
        }
    },
    data: {
        swiperCurrent: 0
    },
    methods: {
        swiperChange: function(e) {
            this.setData({
                swiperCurrent: e.detail.current
            });
        }
    }
});