var app = getApp();

Component({
    properties: {
        reply: {
            type: Object,
            value: []
        }
    },
    data: {},
    attached: function() {},
    methods: {
        getpreviewImage: function(e) {
            var t = e.currentTarget.dataset;
            wx.previewImage({
                urls: this.data.reply[t.index].pics,
                current: this.data.reply[t.index].pics[t.pic_index]
            });
        }
    }
});