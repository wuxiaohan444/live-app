var txim = require("./txim/init.js"), goeasyim = require("./goeasy/init.js"), init = function(e, i, t, s) {
    1 == i.type && txim.init(e, i, t, s), 2 == i.type && goeasyim.init(e, i, t, s);
}, receiveMsgs = function(e, i, t) {
    var s = {};
    return 1 == t.type && (s = txim.receiveMsgs(e)), 2 == t.type && (s = goeasyim.receiveMsgs(e)), 
    s;
}, sendMsg = function(e, i, t) {
    1 == t.type && txim.sendMsg(e), 2 == t.type && goeasyim.sendMsg(e, t);
}, logout = function(e) {
    1 == e.type && txim.logout(), 2 == e.type && goeasyim.logout(e);
};

module.exports = {
    init: init,
    receiveMsgs: receiveMsgs,
    sendMsg: sendMsg,
    logout: logout
};