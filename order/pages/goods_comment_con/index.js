var _order = require("../../../api/order.js"), _util = require("../../../lib/utils/util.js"), _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var app = getApp();

Page({
    data: {
        parameter: {
            navbar: "1",
            return: "1",
            title: "商品评价",
            color: !1
        },
        scoreList: [ {
            name: "商品质量",
            stars: 0
        }, {
            name: "服务态度",
            stars: 0
        } ],
        pics: [],
        orderId: "",
        unique: "",
        productInfo: {},
        cart_num: 0,
        startTexts: {
            1: "很差",
            2: "一般",
            3: "满意",
            4: "非常满意",
            5: "无可挑剔"
        }
    },
    onLoadFun: function() {
        this.getorderGoods();
    },
    onLoad: function(t) {
        if (!t.unique || !t.uni) return app.Tips({
            title: "缺少参数"
        }, {
            tab: 3,
            url: 1
        });
        this.setData({
            unique: t.unique,
            orderId: t.uni
        });
    },
    getorderGoods: function() {
        var a = this;
        (0, _order.orderGoods)(a.data.unique).then(function(t) {
            a.setData({
                productInfo: t.data.productInfo,
                cart_num: t.data.cart_num
            });
        });
    },
    stars: function(t) {
        var a = t.target.dataset.index, e = t.target.dataset.indexw;
        this.data.scoreList[e].stars = a, this.setData({
            scoreList: this.data.scoreList
        });
    },
    DelPic: function(t) {
        var a = t.target.dataset.index, e = this;
        this.data.pics[a];
        e.data.pics.splice(a, 1), e.setData({
            pics: e.data.pics
        });
    },
    uploadpic: function() {
        var a = this;
        _util2.default.uploadImageOne("common/upload/image", function(t) {
            console.log(t), a.data.pics.push(t.data.url), a.setData({
                pics: a.data.pics
            });
        });
    },
    formSubmit: function(t) {
        t.detail.formId;
        var a = t.detail.value, e = this, i = e.data.scoreList[0].stars, r = e.data.scoreList[1].stars;
        if (!a.comment) return app.Tips({
            title: "请填写你对宝贝的心得！"
        });
        a.product_score = i, a.service_score = r, a.pics = e.data.pics, a.unique = e.data.unique, 
        wx.showLoading({
            title: "正在评论……"
        }), (0, _order.orderComment)(a).then(function(t) {
            return wx.hideLoading(), app.Tips({
                title: "感谢您的评价!",
                icon: "success"
            }, "/order/pages/order_details/index?order_id=" + e.data.orderId);
        }).catch(function(t) {
            return wx.hideLoading(), app.Tips({
                title: t
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});