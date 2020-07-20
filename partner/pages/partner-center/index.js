var a = require("../../../api/plugin/partner/partner"), t = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./haibaoyi.js")), n = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "我的团队",
            color: !0,
            class: "red"
        },
        currentIndex: 0,
        partnerInfo: {},
        apply_config: {},
        commission_total: 0,
        ini_anchors_nums: 0,
        ini_partner_nums: 0,
        can_cash_apply: 0,
        can_give_anchors: 0,
        partner_group_nums: 0,
        commission: [],
        anchors: [],
        partners: [],
        achievement: [],
        loading: !1,
        loadend: !1,
        page: 1,
        limit: 10,
        template: {},
        userInfo: {},
        qrcode: "",
        shopImage: !1
    },
    onLoadFun: function(t) {
        var e = this;
        wx.showLoading(), (0, a.partnerCenter)().then(function(a) {
            wx.hideLoading(), e.setData({
                userInfo: a.data.userInfo,
                partnerInfo: a.data.partnerInfo,
                apply_config: a.data.apply_config,
                commission_total: a.data.commission_total,
                ini_anchors_nums: a.data.ini_anchors_nums,
                ini_partner_nums: a.data.ini_partner_nums,
                partner_group_nums: a.data.partner_group_nums,
                can_cash_apply: a.data.can_cash_apply,
                can_give_anchors: a.data.can_give_anchors
            }), e.commission();
        }).catch(function(a) {
            wx.hideLoading(), n.Tips({
                title: a
            }, "/common/pages/loading/loading");
        }), this.getQrcode();
    },
    onLoad: function(a) {},
    onImgOK: function(a) {
        this.imagePath = a.detail.path, this.setData({
            image: this.imagePath,
            shopImage: !0
        }), wx.hideLoading();
    },
    onImageHide: function() {
        this.setData({
            shopImage: !1
        });
    },
    saveImage: function() {
        console.log(this.imagePath), wx.saveImageToPhotosAlbum({
            filePath: this.imagePath
        });
    },
    setDomain: function(a) {
        return (a = a ? a.toString() : "").indexOf("https://") > -1 ? a : a.replace("http://", "https://");
    },
    getQrcode: function() {
        var t = this;
        (0, a.getQrcode)().then(function(a) {
            t.setData({
                qrcode: t.setDomain(a.data.code)
            });
        }).catch(function(a) {
            t.setData({
                PromotionCode: ""
            });
        });
    },
    drawPic: function() {
        if (this.data.sharePath) return this.setData({
            visible: !0
        }), void this.triggerEvent("initData");
        wx.showLoading({
            title: "生成中"
        });
        var a = this.data.apply_config.local_share_img, n = this.data.qrcode, e = this.data.userInfo.avatar, i = this.data.apply_config.share_title, o = this.data.userInfo.nickname;
        this.setData({
            template: new t.default().palette(a, n, e, o, i)
        });
    },
    onReady: function() {},
    onShow: function() {},
    gopages: function(a) {
        console.log(11111, a), a.currentTarget.dataset.url && wx.redirectTo({
            url: a.currentTarget.dataset.url
        });
    },
    pagechange: function(a) {
        var t = a.detail.current;
        this.setData({
            currentIndex: t
        });
    },
    titleClick: function(a) {
        var t = a.currentTarget.dataset.idx;
        this.setData({
            loading: !1,
            loadend: !1,
            page: 1,
            limit: 10,
            commission: [],
            anchors: [],
            partners: [],
            achievement: []
        }), 0 == t && this.commission(), 1 == t && this.ownAnchors(), 2 == t && this.ownPartners(), 
        3 == t && this.achievement(), this.setData({
            currentIndex: a.currentTarget.dataset.idx
        });
    },
    achievement: function() {
        var t = this;
        t.data.loadend || t.data.loading || (t.setData({
            loading: !0,
            loadTitle: ""
        }), (0, a.achievement)({
            page: t.data.page
        }).then(function(a) {
            var e = a.data.achievement || [], i = e.length < t.data.limit;
            t.data.achievement = n.SplitArray(e, t.data.achievement), t.setData({
                achievement: t.data.achievement,
                limit: t.data.limit,
                loadend: i,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: t.data.page + 1
            });
        }).catch(function(a) {
            n.Tips({
                title: a
            });
        }));
    },
    ownPartners: function() {
        var t = this;
        t.data.loadend || t.data.loading || (t.setData({
            loading: !0,
            loadTitle: ""
        }), (0, a.ownPartners)({
            page: t.data.page
        }).then(function(a) {
            var e = a.data.partners || [], i = e.length < t.data.limit;
            t.data.partners = n.SplitArray(e, t.data.partners), t.setData({
                partners: t.data.partners,
                limit: t.data.limit,
                loadend: i,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: t.data.page + 1
            });
        }).catch(function(a) {
            n.Tips({
                title: a
            });
        }));
    },
    ownAnchors: function() {
        var t = this;
        t.data.loadend || t.data.loading || (t.setData({
            loading: !0,
            loadTitle: ""
        }), (0, a.ownAnchors)({
            page: t.data.page
        }).then(function(a) {
            var e = a.data.anchors || [], i = e.length < t.data.limit;
            t.data.anchors = n.SplitArray(e, t.data.anchors), t.setData({
                anchors: t.data.anchors,
                limit: t.data.limit,
                loadend: i,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: t.data.page + 1
            });
        }).catch(function(a) {
            n.Tips({
                title: a
            });
        }));
    },
    commission: function() {
        var t = this;
        t.data.loadend || t.data.loading || (t.setData({
            loading: !0,
            loadTitle: ""
        }), (0, a.commission)({
            page: t.data.page
        }).then(function(a) {
            var e = a.data.commission || [], i = e.length < t.data.limit;
            t.data.commission = n.SplitArray(e, t.data.commission), t.setData({
                commission: t.data.commission,
                limit: t.data.limit,
                loadend: i,
                loading: !1,
                loadTitle: i ? "拉到底了哦" : "加载更多",
                page: t.data.page + 1
            });
        }).catch(function(a) {
            n.Tips({
                title: a
            });
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        0 == this.data.currentIndex && this.commission(), 1 == this.data.currentIndex && this.ownAnchors(), 
        2 == this.data.currentIndex && this.ownPartners(), 3 == this.data.currentIndex && this.achievement();
    },
    onShareAppMessage: function() {}
});