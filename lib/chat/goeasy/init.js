var GoEasy = require("../../../resource/js/goeasy/goeasy-1.0.3"), init = function(t, e, n, o) {
    var a = Math.round(4294967296 * Math.random()), i = {
        content: t.nickname + "来了",
        content_type: 99,
        nickname: t.nickname,
        user_id: t.id,
        random: a
    };
    getApp().globalData.goEasy = new GoEasy({
        host: "" + e.host,
        userId: "" + t.id,
        userData: JSON.stringify(t),
        appkey: "" + e.common_key,
        onConnected: function() {
            getApp().globalData.goEasy.publish({
                channel: "" + e.chat_id,
                message: JSON.stringify(i)
            });
        },
        onDisconnected: function() {
            console.log("连接断开！");
        },
        onConnectFailed: function(t) {
            console.log("连接失败或错误！", t);
        }
    }), getApp().globalData.goEasy.subscribe({
        channel: "" + n,
        onMessage: function(t) {
            o.receiveMsgs(t);
        }
    });
}, receiveMsgs = function(t) {
    var e = JSON.parse(t.content), n = {};
    return n.content = e.content, n.nickname = e.nickname, n.random = e.random, n.live_id = t.channel, 
    n.user_id = e.user_id, 4 == e.content_type && (n.avatar = e.avatar, n.gift_id = e.gift_id, 
    n.gift_img = e.gift_img, n.gift_num = e.gift_num), 2 == e.content_type && (n.reward_title = e.reward_title, 
    n.reward_logo = e.reward_logo, n.reward_text = e.reward_text, n.reward_amount = e.reward_amount, 
    n.reward_bottom_text = e.reward_bottom_text), 5 == e.content_type && (n.follower_num = e.follower_num), 
    6 == e.content_type && (n.avatar = e.avatar, n.fic_num = e.fic_num), 7 == e.content_type && (n.avatar = e.avatar, 
    n.relation_id = e.relation_id, n.content_type = e.content_type, n.id = e.id, n.user_id = e.user_id), 
    n.content_type = e.content_type, n;
}, sendMsg = function(t, e) {
    getApp().globalData.goEasy.publish({
        channel: "" + e.chat_id,
        message: JSON.stringify(t)
    });
}, logout = function(t) {
    getApp().globalData.goEasy.unsubscribe({
        channel: "" + t.chat_id,
        onSuccess: function(t) {}
    });
}, disconnect = function(t) {
    getApp().globalData.goEasy.disconnect({
        channel: "" + t.chat_id,
        onSuccess: function(t) {
            console.log(111111, "我退出了");
        }
    });
};

module.exports = {
    init: init,
    receiveMsgs: receiveMsgs,
    sendMsg: sendMsg,
    logout: logout
};