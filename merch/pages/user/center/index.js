var _user = require("../../../../api/plugin/merch/user.js"), _live = require("../../../../api/live.js");

function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: ""
        },
        currentTab: 0,
        where: {
            sid: 0,
            keyword: "",
            priceOrder: "",
            salesOrder: "",
            news: 0,
            page: 1,
            limit: 10,
            cid: 0
        },
        modalHidden: true,
        price: 0,
        stock: 0,
        live_id: 0,
        nows: !1,
        loadend_0: !1,
        loading_0: !1,
        loadend_1: !1,
        loading_1: !1,
        loadend_2: !1,
        loading_2: !1,
        loadend_3: !1,
        loading_3: !1,
        loadTitle_0: "加载更多",
        loadTitle_2: "加载更多",
        navTop: "",
        headTop: "",
        navFexid: !1,
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        total_nums: 0,
        images: [],
        banners: [],
        goodsList: [],
        livelogs: [],
        page_0: 1,
        page_1: 1,
        page_2: 1,
        page_3: 1,
        is_default: !0
    },
    onLoadFun: function (t) {
        this.getStoreDetail(), this.storeVisit(), this.getGoodsList();
    },
    getGoodsList: function (t) {
        var s = this;
        this.setWhere(), s.data.loading_0 || s.data.loadend_0 || (!0 === t && s.setData({
            goodsList: []
        }), s.setData({
            loading_0: !0,
            loadTitle_0: ""
        }), (0, _user.getGoodsList)(this.data.id, s.data.where).then(function (t) {
            var a = t.data, e = app.SplitArray(a, s.data.goodsList), i = a.length < s.data.where.limit;
            s.setData(_defineProperty({
                loadend_0: i,
                loading_0: !1,
                loadTitle_0: i ? "已全部加载" : "加载更多",
                goodsList: e
            }, "where.page", s.data.where.page + 1));
        }).catch(function (t) {
            s.setData({
                loading_0: !1,
                loadTitle_0: "加载更多"
            });
        }));
    },
    onLoad: function (t) {
        var a, i = this;
        t.id ? (this.setData((_defineProperty(a = {
            id: t.id
        }, "where.keyword", t.searchValue || ""), _defineProperty(a, "navH", app.globalData.navHeight),
            a)), wx.getSystemInfo({
            success: function (t) {
                var a = .48 * t.windowWidth, e = t.windowHeight;
                i.setData({
                    scrollH: e,
                    imgWidth: a
                });
            }
        })) : wx.redirectTo({
            url: "/common/pages/loading/loading"
        });
    },
    goRoom: function (t) {
        var a = t.currentTarget.dataset.id;
        a && wx.redirectTo({
            url: "/live/pages/live_playback/index?playback=" + a
        });
    },
    getStoreDetail: function () {
        var a = this;
        (0, _user.getStoreDetail)(this.data.id).then(function (t) {
            a.setData({
                store: t.data,
                banners: t.data.banners,
                "parameter.title": t.data.name
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            }, {
                tab: 5,
                url: "/common/pages/loading/loading"
            });
        });
    },
    collect: function () {
        var a = this, e = this;
        (0, _user.storeCollect)(this.data.id).then(function (t) {
            e.setData({
                "store.is_collect": !a.data.store.is_collect
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            });
        });
    },
    storeVisit: function () {
        (0, _user.storeVisit)(this.data.id).then(function (t) {
        }).catch(function (t) {
        });
    },
    getAnchorLiveLogs: function () {
        var i = this;
        if (!i.data.loadend_2 && !i.data.loading_2) {
            i.setData({
                loading_2: !0,
                loadTitle_2: ""
            });
            var t = this.data.store.live.id;
            (0, _live.getAnchorLiveLogs)(t, {
                page: i.data.page_2
            }).then(function (t) {
                var a = t.data.livelogs || [], e = a.length < t.data.limit;
                i.data.livelogs = app.SplitArray(a, i.data.livelogs), i.setData({
                    livelogs: i.data.livelogs,
                    loadend_2: e,
                    limit: t.data.limit,
                    loading_2: !1,
                    loadTitle_2: e ? "拉到底了哦" : "加载更多",
                    page_2: i.data.page_2 + 1
                });
            }).catch(function (t) {
                i.setData({
                    loading_2: !1,
                    loadTitle_2: "加载更多"
                });
            });
        }
    },
    gopages: function (t) {
        t.target.dataset.url && wx.redirectTo({
            url: t.target.dataset.url
        });
    },
    onReady: function () {
        var a = this;
        this.setData({
            navH: app.globalData.navHeight,
            winH: app.globalData.winHeight,
            winW: app.globalData.winWidth,
            screenTotalH: app.globalData.screenTotalH,
            bgsrc: app.globalData.static_url + "end-bg-min.jpg"
        }), wx.createSelectorQuery().selectAll(".home-page-nav").boundingClientRect(function (t) {
            console.log(t), a.setData({
                navTop: t[0].top
            });
        }).exec(), wx.createSelectorQuery().selectAll(".home-page-img").boundingClientRect(function (t) {
            console.log(t), a.setData({
                headTop: t[0].top
            });
        }).exec();
    },
    clickTab: function (t) {
        if (this.data.currentTab === t.target.dataset.current) return !1;
        this.setData({
            currentTab: t.target.dataset.current
        }), 0 == t.target.dataset.current && this.getGoodsList(), 2 == t.target.dataset.current && this.getAnchorLiveLogs();
    },
    onPageScroll: function (t) {
        t.scrollTop > this.data.navTop - this.data.headTop ? this.setData({
            navFexid: !0
        }) : this.setData({
            navFexid: !1
        });
    },
    set_where: function (t) {
        switch (t.target.dataset.type) {
            case "1":
                this.setData({
                    is_default: !0,
                    price: 0,
                    stock: 0,
                    nows: 0
                });
                break;

            case "2":
                0 == this.data.price ? this.data.price = 1 : 1 == this.data.price ? this.data.price = 2 : 2 == this.data.price && (this.data.price = 0),
                    this.setData({
                        price: this.data.price,
                        stock: 0,
                        nows: 0,
                        is_default: !1
                    });
                break;

            case "3":
                0 == this.data.stock ? this.data.stock = 1 : 1 == this.data.stock ? this.data.stock = 2 : 2 == this.data.stock && (this.data.stock = 0),
                    this.setData({
                        stock: this.data.stock,
                        price: 0,
                        nows: 0,
                        is_default: !1
                    });
                break;

            case "4":
                this.setData({
                    nows: 1,
                    stock: 0,
                    price: 0,
                    is_default: !1
                });
        }
        this.setData(_defineProperty({
            loadend_0: !1
        }, "where.page", 1)), this.getGoodsList(!0);
    },
    setWhere: function () {
        0 == this.data.price ? this.data.where.priceOrder = "" : 1 == this.data.price ? this.data.where.priceOrder = "desc" : 2 == this.data.price && (this.data.where.priceOrder = "asc"),
            0 == this.data.stock ? this.data.where.salesOrder = "" : 1 == this.data.stock ? this.data.where.salesOrder = "desc" : 2 == this.data.stock && (this.data.where.salesOrder = "asc"),
            this.data.where.news = this.data.nows ? 1 : 0, this.setData({
            where: this.data.where
        });
    },
    onShow: function () {
    },
    onHide: function () {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
        this.anchorCenter(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function () {
        return {
            title: this.data.parameter.title,
            path: "/merch/pages/user/center/index?id=" + this.data.id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    },
    onReachBottom: function () {
        0 == this.data.currentTab ? this.getGoodsList() : 2 == this.data.currentTab && this.getAnchorLiveLogs();
    },
    freeTell(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        })
    },
    checkQr() {
        this.setData({
            modalHidden: false,
        })
    },
    confirm() {
        this.setData({
            modalHidden: true,
        })
    }
});