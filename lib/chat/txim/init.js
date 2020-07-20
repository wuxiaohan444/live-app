var webim = require("../../../resource/js/chat/webim.js"), webimhandler = require("../../../resource/js/chat/webim_handler.js"), tls = require("../../../resource/js/chat/tls.js"), init = function(e, i, t, n) {
    tls.init({
        sdkappid: i.sdk_appid
    }), this.initIM(e, i, t, n);
}, initIM = function(e, i, t, n) {
    webimhandler.init({
        accountMode: 1,
        accountType: "",
        sdkAppID: i.sdk_appid,
        avChatRoomId: i.chat_id,
        selType: webim.SESSION_TYPE.GROUP,
        selToID: i.chat_id,
        selSess: null
    });
    var o = {
        sdkAppID: i.sdk_appid,
        appIDAt3rd: i.sdk_appid,
        accountType: "",
        identifier: i.identifier,
        identifierNick: e.nickname,
        avatar: e.avatar,
        user_id: e.id,
        userSig: i.usersig,
        live_id: t,
        content_type: 0,
        random: 0
    }, r = (webimhandler.onDestoryGroupNotify, webimhandler.onRevokeGroupNotify, webimhandler.onCustomGroupNotify, 
    {
        onConnNotify: function(e) {
            switch (e.ErrorCode) {
              case webim.CONNECTION_STATUS.ON:
                break;

              case webim.CONNECTION_STATUS.OFF:
                webim.Log.warn("连接已断开，无法收到新消息，请检查下你的网络是否正常");
                break;

              default:
                webim.Log.error("未知连接状态,status=" + e.ErrorCode);
            }
        },
        onBigGroupMsgNotify: function(e) {
            webimhandler.onBigGroupMsgNotify(e, function(e) {
                n.receiveMsgs(e);
            });
        },
        onMsgNotify: webimhandler.onMsgNotify,
        onGroupSystemNotifys: webimhandler.onGroupSystemNotifys,
        onGroupInfoChangeNotify: webimhandler.onGroupInfoChangeNotify
    });
    webimhandler.sdkLogin(o, r, {
        isAccessFormalEnv: !0,
        isLogOn: !1
    }, i.chat_id);
}, receiveMsgs = function(e) {
    var i = e.content.match(/data\=(.*?)\,\s+desc\=(.*?)\,\s+ext\=(.*)/i);
    if (i) {
        var t = i[3], n = (t = JSON.parse(t)).random, o = t.nickname, r = t.user_id, a = t.live_id, s = {};
        return s.content = i[1], s.nickname = o, s.random = n, s.live_id = a, s.user_id = r, 
        s.content_type = t.content_type, 4 == t.content_type && (s.avatar = t.avatar, s.gift_id = t.gift_id, 
        s.gift_img = t.gift_img, s.gift_num = t.gift_num), 2 == t.content_type && (s.reward_title = t.reward_title, 
        s.reward_logo = t.reward_logo, s.reward_text = t.reward_text, s.reward_amount = t.reward_amount, 
        s.reward_bottom_text = t.reward_bottom_text), 6 == t.content_type && (s.avatar = t.avatar, 
        s.fic_num = t.fic_num), s;
    }
}, sendMsg = function(e) {
    webimhandler.onSendMsg(e, function() {});
}, logout = function() {
    webimhandler.logout();
};

module.exports = {
    init: init,
    initIM: initIM,
    receiveMsgs: receiveMsgs,
    sendMsg: sendMsg,
    logout: logout
};