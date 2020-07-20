var _goods = require("../../api/goods.js"), app = getApp();

Component({
    properties: {},
    data: {
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        list: [],
        page: 1,
        limit: 5
    },
    attached: function() {
        this.getHostProduct();
    },
    methods: {
        getHostProduct: function() {
            var o = this;
            o.data.loadend || o.data.loading || (o.setData({
                loading: !0,
                loadTitle: ""
            }), (0, _goods.getHotGoods)(o.data.page, o.data.limit).then(function(t) {
                var a = t.data || [], d = a.length < o.data.limit;
                o.data.list = app.SplitArray(a, o.data.list), o.setData({
                    list: o.data.list,
                    loadend: d,
                    loading: !1,
                    loadTitle: d ? "拉到底了哦" : "加载更多",
                    page: o.data.page + 1
                });
            }).catch(function(t) {
                o.setData({
                    loading: !1,
                    loadTitle: "加载更多"
                });
            }));
        }
    }
});