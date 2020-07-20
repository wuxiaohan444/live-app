var _live = require("../../../api/live.js"),
    _user = require("../../../api/user.js"),
    _common = require("../../../api/common.js"),
    _wxParse = require("../../../lib/wxParse/wxParse"),
    _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var template = require("../../../common/template/template.js"), app = getApp();

Page({
    data: _defineProperty({
        sitepath: app.getDomain(),
        parameter: {
            title: "",
            navbar: "1",
            return: "0",
            color: !0,
            class: "red"
        },
        loading: !1,
        loadend: !1,
        loadTitle: "加载更多",
        limit: 0,
        page: 1,
        lives: [],
        banners: [],
        isScorll: !1,
        navH: 0,
        deviceType: "iPhone-X",
        style: 1,
        indicatorDots: !1,
        circular: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 500,
        examineKeywords: {},
        searchroomNum: "",
        searchKeywords: "",
        dealerLive: [
            {
                icon1: '../../../images/month-icon1.png',
                icon2: '../../../images/month-icon2.png',
                text: '一个月会员'
            },
            {
                icon1: '../../../images/period-icon1.png',
                icon2: '../../../images/period-icon2.png',
                text: '三个月会员'
            },
            {
                icon1: '../../../images/year-icon1.png',
                icon2: '../../../images/year-icon2.png',
                text: '十二个月会员'
            },
        ],
        dealerLiveIndex: 0,
        isGoIndex: !1,
        iShidden: !0,
        isAuto: !0,
        liveTab: [
            {
                name: '推荐直播',
                id: 0
            }, {
                name: '经销商直播',
                id: 1
            },
            {
                name: '企业直播',
                id: 2
            }
        ],
        liveTabIndex: 0,
        channel_type: 0,
        is_member: 0,
        dealerShow: true,
        liveShow: false,
        type: '',//购买类型
        money: '',
    }, "navH", ""),
    onPageScroll: function (e) {
        150 < e.scrollTop ? this.setData({
            isScorll: !0
        }) : this.setData({
            isScorll: !1
        });
    },
    onLoadFun: function () {
        this.getUserInfo();
    },
    getUserInfo: function () {
        var t = this;
        (0, _user.getUserInfo)().then(function (e) {
            t.setData({
                is_member: e.data.is_member
            })
        }).catch(function (e) {
            return app.Tips({
                title: e
            });
        });
    },
    onLoad: function (e) {
        this.getUserInfo()
        e.spid && (app.globalData.spid = e.spid), e.scene && (app.globalData.code = decodeURIComponent(e.scene)),
            template.tabbar("tabBar", 1, this), this.waterfallLiveLists(), this.getExamineKeywords(),
            this.setData({
                navH: app.globalData.navHeight
            });
    },
    searchRoom: function (e) {
        var a = e.detail.value;
        this.setData({
            lives: [],
            page: 1,
            loadend: !1,
            loading: !1,
            searchKeywords: a
        }), this.waterfallLiveLists();
    },
    getExamineKeywords: function () {
        var a = this;
        (0, _common.getExamineKeywords)().then(function (e) {
            a.setData({
                examineKeywords: e.data,
                "parameter.title": e.data.keywords_live
            }), _wxParse2.default.wxParse("page_content", "html", e.data.page_content, a, 0);
        }).catch(function (e) {
        });
    },
    waterfallLiveLists: function () {
        var i = this;
        i.data.loadend || i.data.loading || (i.setData({
            loading: !0,
            loadTitle: ""
        }), (0, _live.waterfallLiveLists)({
            page: i.data.page,
            keywords: i.data.searchKeywords,
            channel_type: i.data.channel_type
        }).then(function (e) {
            var a = e.data.lists || [], t = a.length < e.data.limit;
            i.data.lives = app.SplitArray(a, i.data.lives), i.setData({
                lives: i.data.lives,
                loadend: t,
                limit: e.data.limit,
                banners: e.data.banners,
                loading: !1,
                loadTitle: t ? "拉到底了哦" : "加载更多",
                page: i.data.page + 1
            });
        }).catch(function (e) {
            i.setData({
                loading: !1,
                loadTitle: "加载更多"
            });
        }));
    },
    onReachBottom: function () {
        this.waterfallLiveLists();
    },
    goRoom: function (e) {
        var a = e.currentTarget.dataset.liveid;
        1 == e.currentTarget.dataset.livestatus ? wx.redirectTo({
            url: "/live/pages/live_nostart/index?live_id=" + a
        }) : wx.redirectTo({
            url: "/live/pages/live_room3/index?live_id=" + a
        });
    },
    clickTab: function (e) {
        if (console.log(11111, e), this.data.currentTab === e.target.dataset.current) return !1;
        this.getCatetoryLives(e.target.dataset.current);
    },
    onReady: function () {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    onHide: function () {
        this.setData({
            isClose: !0
        });
    },
    onUnload: function () {
    },
    onPullDownRefresh: function () {
    },
    onShareAppMessage: function () {
        return {
            title: this.data.examineKeywords.keywords_live + "购物新体验，万千好货等你选",
            path: "/live/pages/live_list1/index?spid=" + getApp().globalData.userInfo.id + "&mid=" + getApp().globalData.userInfo.id
        };
    },
    changePrice: function (e) {
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let money = e.currentTarget.dataset.money;
        this.setData({
            dealerLiveIndex: index,
            type: type,
            money: money
        })
    },
    getCombo() {
        var t = this;
        (0, _live.getCombo)().then(function (e) {
            let data = e.data.list;
            let newData = t.data.dealerLive.map((item, index) => {
                return Object.assign(item, data[index])
            })
            t.setData({
                dealerLive: newData,
                type: data[0].type,
                money: data[0].price
            })
        }).catch(function (e) {
            console.log(e);
        })
    },
    changeLiveType: function (e) {
        let index = e.currentTarget.dataset.index;
        let id = e.currentTarget.dataset.id;
        this.setData({
            liveTabIndex: index,
            channel_type: id
        });
        this.setData({
            lives: [],
            page: 1,
            loadend: !1,
            loading: !1,
        });
        console.log(this.data.is_member);
        if (this.data.is_member == 0 && index == 2) {
            this.setData({
                dealerShow: false,
                liveShow: true
            })
            this.getCombo()
        } else {
            this.setData({
                dealerShow: true,
                liveShow: false
            })
            this.waterfallLiveLists();
        }
    },
    //支付
    submitSub: function (e) {
        // 参数
        let a = this;
        wx.showLoading({title: "正在支付"}), (0, _user.purchaseCombo)({
            money: this.data.money,
            type: this.data.type
        }).then(function (e) {
            wx.hideLoading();
            var t = e.data.jsConfig;
            wx.requestPayment({
                timeStamp: t.timestamp,
                nonceStr: t.nonceStr,
                package: t.package,
                signType: t.signType,
                paySign: t.paySign,
                success: function (e) {
                    a.refurbish()
                },
                fail: function () {
                    return app.Tips({title: "支付失败"})
                },
                complete: function (e) {
                    if ("requestPayment:cancel" == e.errMsg) return app.Tips({title: "取消支付"})
                }
            })
        }).catch(function (e) {
            return wx.hideLoading(), app.Tips({title: e})
        })
    },
    // 刷新页面
    refurbish: function () {
        this.getUserInfo();
        this.setData({
            lives: [],
            page: 1,
            loadend: !1,
            loading: !1,
            dealerShow: true,
            liveShow: false
        });
        this.waterfallLiveLists();
    }
});