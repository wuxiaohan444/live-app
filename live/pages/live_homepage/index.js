var _live = require("../../../api/live.js");

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
            title: "",
            bgcolor: "transparent",
            topFixed: !0,
            textColor: "#fff"
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
        price: 0,
        stock: 0,
        live_id: 0,
        nows: !1,
        modalHidden: true,
        store: '',
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
        viewers: [],
        live: [],
        goods: [],
        livelogs: [],
        page_0: 1,
        page_1: 1,
        page_2: 1,
        page_3: 1,
        swiperCurrent: 0
    },
    onLoadFun: function (t) {
        this.anchorCenter(), this.getAnchorCenterGoods();
    },
    onLoad: function (t) {
        var a, i = this;
        t.live_id ? (this.setData((_defineProperty(a = {
            live_id: t.live_id || ""
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
            url: "/common/pages/user/user"
        });
    },
    goRoom: function (t) {
        var a = t.currentTarget.dataset.id;
        a && wx.redirectTo({
            url: "/live/pages/live_playback/index?playback=" + a
        });
    },
    swiperChange: function (t) {
        this.setData({
            swiperCurrent: t.detail.current
        });
    },
    anchorCenter: function () {
        var a = this;
        (0, _live.anchorCenter)(this.data.live_id).then(function (t) {
            console.log(t);
            a.setData({
                banners: t.data.banners,
                live: t.data.live,
                store: t.data.store,
                total_nums: t.data.total_nums,
                viewers: t.data.viewers,
                "parameter.title": t.data.live.title
            });
        }).catch(function (t) {
            return app.Tips({
                title: t
            }, {
                tab: 5,
                url: "/common/pages/user/user"
            });
        });
    },
    getAnchorCenterGoods: function () {
        var i = this;
        i.data.loadend_0 || i.data.loading_0 || (i.setData({
            loading_0: !0,
            loadTitle_0: ""
        }), (0, _live.getAnchorCenterGoods)(this.data.live_id, {
            page: i.data.page_0
        }).then(function (t) {
            var a = t.data.goods || [], e = a.length < t.data.limit;
            i.data.goods = app.SplitArray(a, i.data.goods), i.setData({
                goods: i.data.goods,
                loadend_0: e,
                limit: t.data.limit,
                loading_0: !1,
                loadTitle_0: e ? "拉到底了哦" : "加载更多",
                page_0: i.data.page_0 + 1
            });
        }).catch(function (t) {
            i.setData({
                loading_0: !1,
                loadTitle_0: "加载更多"
            });
        }));
    },
    getAnchorLiveLogs: function () {
        var i = this;
        i.data.loadend_2 || i.data.loading_2 || (i.setData({
            loading_2: !0,
            loadTitle_2: ""
        }), (0, _live.getAnchorLiveLogs)(this.data.live_id, {
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
        }));
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
        }), 2 == t.target.dataset.current && this.getAnchorLiveLogs();
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
                return wx.navigateBack({
                    delta: 1
                });

            case "2":
                0 == this.data.price ? this.data.price = 1 : 1 == this.data.price ? this.data.price = 2 : 2 == this.data.price && (this.data.price = 0),
                    this.setData({
                        price: this.data.price,
                        stock: 0
                    });
                break;

            case "3":
                0 == this.data.stock ? this.data.stock = 1 : 1 == this.data.stock ? this.data.stock = 2 : 2 == this.data.stock && (this.data.stock = 0),
                    this.setData({
                        stock: this.data.stock,
                        price: 0
                    });
                break;

            case "4":
                this.setData({
                    nows: !this.data.nows
                });
        }
        this.setData(_defineProperty({
            loadend: !1
        }, "where.page", 1)), this.get_product_list(!0);
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
            title: this.data.live.title || "",
            path: "/live/pages/live_room3/index?live_id=" + this.data.live_id + "&spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    },
    onReachBottom: function () {
        0 == this.data.currentTab ? this.getAnchorCenterGoods() : 2 == this.data.currentTab && this.getAnchorLiveLogs();
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