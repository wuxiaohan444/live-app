var app = getApp();

Component({
    properties: {
        tabdata: {
            type: null,
            observer: function(t, e) {
                this.setData({
                    college: t
                });
            }
        },
        navbgcolor: {
            type: null,
            value: []
        },
        scrollTop: {
            type: null,
            observer: function(t, e) {
                this.setData({
                    scrollTop: t
                });
            }
        },
        scrollH: {
            type: null,
            observer: function(t, e) {
                this.setData({
                    scrollH: t
                });
            }
        }
    },
    data: {
        navH: app.globalData.navHeight,
        college: [],
        collegeCur: 0,
        catid: 0,
        showList: !1,
        scrollTop: 0,
        scrollH: 0
    },
    methods: {
        showlist: function() {
            var t = this;
            t.data.showList ? t.setData({
                showList: !1
            }) : t.setData({
                showList: !0
            });
        },
        collegeSelect: function(t) {
            this.setData({
                collegeCur: t.currentTarget.dataset.id - 1,
                scrollLeft: 150 * (t.currentTarget.dataset.id - 2),
                showList: !1,
                catid: t.currentTarget.dataset.catid
            }), this.getList();
        },
        getList: function() {
            var t = this;
            t.triggerEvent("tabtap", {
                collegeCur: t.data.collegeCur,
                catid: t.data.catid
            });
        }
    }
});