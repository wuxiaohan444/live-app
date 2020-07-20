var loginInfo, accountMode, accountType, sdkAppID, avChatRoomId, selType, selToID, selSess, selSessHeadUrl, webim = require("webim.js");

function onBigGroupMsgNotify(o, e) {
    for (var i = o.length - 1; 0 <= i; i--) {
        var n = o[i];
        webim.Log.warn("receive a new avchatroom group msg: " + n.getFromAccountNick()), 
        e(showMsg(n));
    }
}

function onMsgNotify(o) {
    for (var e in o) handlderMsg(o[e]);
}

function handlderMsg(o) {
    var e, i, n, t, r;
    switch ((e = o.getFromAccount()) || (e = ""), (i = o.getFromAccountNick()) || (i = e), 
    n = o.getSession().type(), t = o.getSubType(), n) {
      case webim.SESSION_TYPE.C2C:
        switch (t) {
          case webim.C2C_MSG_SUB_TYPE.COMMON:
            r = convertMsgtoHtml(o), webim.Log.warn("receive a new c2c msg: fromAccountNick=" + i + ", content=" + r);
            var s = {
                To_Account: e,
                LastedMsgTime: o.getTime()
            };
            webim.c2CMsgReaded(s), console.error("收到一条c2c消息(好友消息或者全员推送消息): 发送人=" + i + ", 内容=" + r);
        }
        break;

      case webim.SESSION_TYPE.GROUP:
    }
}

function sdkLogin(e, o, i, n) {
    webim.login(e, o, i, function(o) {
        console.debug(o), setProfilePortrait({
            ProfileItem: [ {
                Tag: "Tag_Profile_IM_Nick",
                Value: (loginInfo = e).identifierNick
            } ]
        }, function() {
            applyJoinBigGroup(n);
        }), onSendMsg({
            content: loginInfo.identifierNick + "进入房间",
            nickname: e.identifierNick,
            user_id: e.user_id,
            content_type: 99
        }, function() {});
    }, function(o) {
        console.error(o.ErrorInfo);
    });
}

function setProfilePortrait(o, e) {
    webim.setProfilePortrait(o, function(o) {
        webim.Log.info("修改昵称成功"), e && e();
    }, function() {});
}

function applyJoinBigGroup(e) {
    var o = {
        GroupId: e
    };
    webim.applyJoinBigGroup(o, function(o) {
        o.JoinedStatus && "JoinedSuccess" == o.JoinedStatus ? (webim.Log.info("进群成功"), selToID = e) : console.error("进群失败");
    }, function(o) {
        console.error(o.ErrorInfo);
    });
}

function showMsg(o) {
    var e, i;
    o.getFromAccount(), (e = o.getFromAccountNick()) || (e = "未知用户"), o.getSession().type(), 
    i = o.getSubType(), o.getIsSend();
    var n = "";
    switch (i) {
      case webim.GROUP_MSG_SUB_TYPE.COMMON:
        n = convertMsgtoHtml(o);
        break;

      case webim.GROUP_MSG_SUB_TYPE.REDPACKET:
        n = "[群红包消息]" + convertMsgtoHtml(o);
        break;

      case webim.GROUP_MSG_SUB_TYPE.LOVEMSG:
        n = "[群点赞消息]" + convertMsgtoHtml(o), showLoveMsgAnimation();
        break;

      case webim.GROUP_MSG_SUB_TYPE.TIP:
        n = "[群提示消息]" + convertMsgtoHtml(o);
    }
    return {
        fromAccountNick: e,
        content: n
    };
}

function convertMsgtoHtml(o) {
    var e, i, n, t, r = "";
    for (var s in e = o.getElems()) switch (n = (i = e[s]).getType(), t = i.getContent(), 
    n) {
      case webim.MSG_ELEMENT_TYPE.TEXT:
        r += convertTextMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.FACE:
        r += convertFaceMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.IMAGE:
        r += convertImageMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.SOUND:
        r += convertSoundMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.FILE:
        r += convertFileMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.LOCATION:
        break;

      case webim.MSG_ELEMENT_TYPE.CUSTOM:
        r += convertCustomMsgToHtml(t);
        break;

      case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
        r += convertGroupTipMsgToHtml(t);
        break;

      default:
        webim.Log.error("未知消息元素类型: elemType=" + n);
    }
    return webim.Tool.formatHtml2Text(r);
}

function convertTextMsgToHtml(o) {
    return o.getText();
}

function convertFaceMsgToHtml(o) {
    return o.getData();
}

function convertImageMsgToHtml(o) {
    var e = o.getImage(webim.IMAGE_TYPE.SMALL), i = o.getImage(webim.IMAGE_TYPE.LARGE), n = o.getImage(webim.IMAGE_TYPE.ORIGIN);
    return i || (i = e), n || (n = e), "<img src='" + e.getUrl() + "#" + i.getUrl() + "#" + n.getUrl() + "' style='CURSOR: hand' id='" + o.getImageId() + "' bigImgUrl='" + i.getUrl() + "' onclick='imageClick(this)' />";
}

function convertSoundMsgToHtml(o) {
    o.getSecond();
    var e = o.getDownUrl();
    return "ie" == webim.BROWSER_INFO.type && parseInt(webim.BROWSER_INFO.ver) <= 8 ? "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" + e : '<audio src="' + e + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
}

function convertFileMsgToHtml(o) {
    var e = Math.round(o.getSize() / 1024);
    return '<a href="' + o.getDownUrl() + '" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + o.getName() + "(" + e + "KB)</i></a>";
}

function convertLocationMsgToHtml(o) {
    return "经度=" + o.getLongitude() + ",纬度=" + o.getLatitude() + ",描述=" + o.getDesc();
}

function convertCustomMsgToHtml(o) {
    return "data=" + o.getData() + ", desc=" + o.getDesc() + ", ext=" + o.getExt();
}

function convertGroupTipMsgToHtml(o) {
    var e, i, n, t, r = "";
    switch (e = o.getOpType(), i = o.getOpUserId(), e) {
      case webim.GROUP_TIP_TYPE.JOIN:
        for (var s in n = o.getUserIdList()) if (r += n[s] + ",", 10 < n.length && 9 == s) {
            r += "等" + n.length + "人";
            break;
        }
        r = r.substring(0, r.length - 1), r += "进入房间", t = parseInt(t) + 1;
        break;

      case webim.GROUP_TIP_TYPE.QUIT:
        r += i + "离开房间", 0 < t && (t = parseInt(t) - 1);
        break;

      case webim.GROUP_TIP_TYPE.KICK:
        for (var s in r += i + "将", n = o.getUserIdList()) if (r += n[s] + ",", 10 < n.length && 9 == s) {
            r += "等" + n.length + "人";
            break;
        }
        r += "踢出该群";
        break;

      case webim.GROUP_TIP_TYPE.SET_ADMIN:
        for (var s in r += i + "将", n = o.getUserIdList()) if (r += n[s] + ",", 10 < n.length && 9 == s) {
            r += "等" + n.length + "人";
            break;
        }
        r += "设为管理员";
        break;

      case webim.GROUP_TIP_TYPE.CANCEL_ADMIN:
        for (var s in r += i + "取消", n = o.getUserIdList()) if (r += n[s] + ",", 10 < n.length && 9 == s) {
            r += "等" + n.length + "人";
            break;
        }
        r += "的管理员资格";
        break;

      case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO:
        r += i + "修改了群资料：";
        var c, u, a = o.getGroupInfoList();
        for (var s in a) switch (c = a[s].getType(), u = a[s].getValue(), c) {
          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
            r += "群头像为" + u + "; ";
            break;

          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
            r += "群名称为" + u + "; ";
            break;

          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
            r += "群主为" + u + "; ";
            break;

          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
            r += "群公告为" + u + "; ";
            break;

          case webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
            r += "群简介为" + u + "; ";
            break;

          default:
            r += "未知信息为:type=" + c + ",value=" + u + "; ";
        }
        break;

      case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO:
        r += i + "修改了群成员资料:";
        var g, m = o.getMemberInfoList();
        for (var s in m) if (r += m[s].getUserId() + ": ", r += null != (g = m[s].getShutupTime()) && void 0 !== g ? 0 == g ? "取消禁言; " : "禁言" + g + "秒; " : " shutupTime为空", 
        10 < m.length && 9 == s) {
            r += "等" + m.length + "人";
            break;
        }
        break;

      default:
        r += "未知群提示消息类型：type=" + e;
    }
    return r;
}

function tlsLogin() {
    console.warn("tlslogin need rewrite");
}

function tlsGetUserSig(o) {
    if (o.ErrorCode == webim.TLS_ERROR_CODE.OK) {
        loginInfo.identifier = webim.Tool.getQueryString("identifier"), loginInfo.userSig = o.UserSig, 
        loginInfo.sdkAppID = loginInfo.appIDAt3rd = Number(webim.Tool.getQueryString("sdkappid"));
        var e = webim.Tool.getCookie("accountType");
        e ? (loginInfo.accountType = e, sdkLogin()) : location.href = location.href.replace(/\?.*$/gi, "");
    } else o.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION ? tlsLogin() : console.error("[" + o.ErrorCode + "]" + o.ErrorInfo);
}

function imageClick(o) {
    var e = o.src.split("#"), i = e[0], n = e[1], t = e[2];
    webim.Log.info("小图url:" + i), webim.Log.info("大图url:" + n), webim.Log.info("原图url:" + t);
}

function onChangePlayAudio(o) {
    curPlayAudio ? curPlayAudio != o && (curPlayAudio.currentTime = 0, curPlayAudio.pause(), 
    curPlayAudio = o) : curPlayAudio = o;
}

function smsPicClick() {
    loginInfo.identifier ? (hideDiscussTool(), showDiscussForm()) : 1 == accountMode ? (webim.Tool.setCookie("accountType", loginInfo.accountType, 86400), 
    tlsLogin()) : console.error("请填写帐号和票据");
}

function onSendMsg(o, e) {
    if (loginInfo.identifier) if (selToID) {
        var i, n, t = o.content, r = webim.Tool.getStrBytes(t);
        if (t.length < 1) console.error("发送的消息不能为空!"); else if (i = selType == webim.SESSION_TYPE.GROUP ? webim.MSG_MAX_LENGTH.GROUP : webim.MSG_MAX_LENGTH.C2C, 
        n = "消息长度超出限制(最多" + Math.round(i / 3) + "汉字)", i < r) console.error(n); else {
            selSess || (selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1e3)));
            var s, c = Math.round(4294967296 * Math.random()), u = Math.round(new Date().getTime() / 1e3);
            s = selType == webim.SESSION_TYPE.GROUP ? webim.GROUP_MSG_SUB_TYPE.COMMON : webim.C2C_MSG_SUB_TYPE.COMMON;
            var a = new webim.Msg(selSess, !0, -1, c, u, loginInfo.identifier, s, loginInfo.identifierNick);
            loginInfo.identifierNick;
            /进入房间/gi.test(t) && (a.content_type = 99, "系统消息");
            var g = {
                avatar: loginInfo.avatar,
                content: t,
                live_id: loginInfo.live_id,
                nickname: o.nickname,
                content_type: o.content_type,
                user_id: loginInfo.user_id,
                random: o.random
            };
            4 == o.content_type && (g.gift_id = o.gift_id, g.gift_img = o.gift_img, g.gift_num = o.gift_num), 
            2 == o.content_type && (g.reward_title = o.reward_title, g.reward_logo = o.reward_logo, 
            g.reward_text = o.reward_text, g.reward_amount = o.reward_amount, g.reward_bottom_text = o.reward_bottom_text), 
            5 == o.content_type && (g.follower_num = o.follower_num), 6 == o.content_type && (g.avatar = o.avatar, 
            g.fic_num = o.fic_num);
            var m = new webim.Msg.Elem.Custom(t, "", JSON.stringify(g));
            a.addCustom(m), webim.sendMsg(a, function(o) {
                selType == webim.SESSION_TYPE.C2C && showMsg(a), webim.Log.info("发消息成功"), e && e();
            }, function(o) {
                webim.Log.error("发消息失败:" + o.ErrorInfo), console.error("发消息失败:" + o.ErrorInfo);
            });
        }
    } else console.error("您还没有进入房间，暂不能聊天"); else 1 == accountMode ? (webim.Tool.setCookie("accountType", loginInfo.accountType, 86400), 
    tlsLogin()) : console.error("请填写帐号和票据");
}

function sendGroupLoveMsg() {
    if (loginInfo.identifier) if (selToID) {
        selSess || (selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1e3)));
        var o = Math.round(4294967296 * Math.random()), e = Math.round(new Date().getTime() / 1e3), i = webim.GROUP_MSG_SUB_TYPE.LOVEMSG, n = new webim.Msg(selSess, !0, -1, o, e, loginInfo.identifier, i, loginInfo.identifierNick), t = new webim.Msg.Elem.Text("love_msg");
        n.addText(t), webim.sendMsg(n, function(o) {
            selType == webim.SESSION_TYPE.C2C && showMsg(n), webim.Log.info("点赞成功");
        }, function(o) {
            webim.Log.error("发送点赞消息失败:" + o.ErrorInfo), console.error("发送点赞消息失败:" + o.ErrorInfo);
        });
    } else console.error("您还没有进入房间，暂不能点赞"); else 1 == accountMode ? (webim.Tool.setCookie("accountType", loginInfo.accountType, 86400), 
    tlsLogin()) : console.error("请填写帐号和票据");
}

function hideDiscussForm() {}

function showDiscussForm() {}

function hideDiscussTool() {}

function showDiscussTool() {}

function hideDiscussEmotion() {}

function showDiscussEmotion() {}

function showLoveMsgAnimation() {}

function initEmotionUL() {}

function showEmotionDialog() {
    openEmotionFlag ? (openEmotionFlag = !1, hideDiscussEmotion()) : (openEmotionFlag = !0, 
    showDiscussEmotion());
}

function selectEmotionImg(o) {
    $("#send_msg_text").val($("#send_msg_text").val() + o.id);
}

function quitBigGroup() {
    var o = {
        GroupId: avChatRoomId
    };
    webim.quitBigGroup(o, function(o) {
        webim.Log.info("退群成功"), selSess = null;
    }, function(o) {
        console.error(o.ErrorInfo);
    });
}

function logout() {
    webim.logout(function(o) {
        webim.Log.info("登出成功"), selSess = null, loginInfo.identifier = null, loginInfo.identifier = null, 
        loginInfo.userSig = null;
    });
}

function onApplyJoinGroupRequestNotify(o) {
    webim.Log.warn("执行 加群申请 回调：" + JSON.stringify(o));
    var e = o.MsgTime, i = o.Operator_Account + "申请加入你的群";
    showGroupSystemMsg(o.ReportType, "[申请加群]", o.GroupId, o.GroupName, i, e);
}

function onApplyJoinGroupAcceptNotify(o) {
    webim.Log.warn("执行 申请加群被同意 回调：" + JSON.stringify(o));
    var e = o.Operator_Account + "同意你的加群申请，附言：" + o.RemarkInfo;
    showGroupSystemMsg(o.ReportType, "[申请加群被同意]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onApplyJoinGroupRefuseNotify(o) {
    webim.Log.warn("执行 申请加群被拒绝 回调：" + JSON.stringify(o));
    var e = o.Operator_Account + "拒绝了你的加群申请，附言：" + o.RemarkInfo;
    showGroupSystemMsg(o.ReportType, "[申请加群被拒绝]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onKickedGroupNotify(o) {
    webim.Log.warn("执行 被踢出群  回调：" + JSON.stringify(o));
    var e = "你被管理员" + o.Operator_Account + "踢出该群";
    showGroupSystemMsg(o.ReportType, "[被踢出群]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onDestoryGroupNotify(o) {
    webim.Log.warn("执行 解散群 回调：" + JSON.stringify(o));
    var e = "群主" + o.Operator_Account + "已解散该群";
    showGroupSystemMsg(o.ReportType, "[群被解散]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onCreateGroupNotify(o) {
    webim.Log.warn("执行 创建群 回调：" + JSON.stringify(o));
    showGroupSystemMsg(o.ReportType, "[创建群]", o.GroupId, o.GroupName, "你创建了该群", o.MsgTime);
}

function onInvitedJoinGroupNotify(o) {
    webim.Log.warn("执行 被邀请加群  回调: " + JSON.stringify(o));
    var e = "你被管理员" + o.Operator_Account + "邀请加入该群";
    showGroupSystemMsg(o.ReportType, "[被邀请加群]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onQuitGroupNotify(o) {
    webim.Log.warn("执行 主动退群  回调： " + JSON.stringify(o));
    showGroupSystemMsg(o.ReportType, "[主动退群]", o.GroupId, o.GroupName, "你退出了该群", o.MsgTime);
}

function onSetedGroupAdminNotify(o) {
    webim.Log.warn("执行 被设置为管理员  回调：" + JSON.stringify(o));
    var e = "你被群主" + o.Operator_Account + "设置为管理员";
    showGroupSystemMsg(o.ReportType, "[被设置为管理员]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onCanceledGroupAdminNotify(o) {
    webim.Log.warn("执行 被取消管理员 回调：" + JSON.stringify(o));
    var e = "你被群主" + o.Operator_Account + "取消了管理员资格";
    showGroupSystemMsg(o.ReportType, "[被取消管理员]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onRevokeGroupNotify(o) {
    webim.Log.warn("执行 群被回收 回调：" + JSON.stringify(o));
    showGroupSystemMsg(o.ReportType, "[群被回收]", o.GroupId, o.GroupName, "该群已被回收", o.MsgTime);
}

function onCustomGroupNotify(o) {
    webim.Log.warn("执行 用户自定义系统消息 回调：" + JSON.stringify(o));
    var e = o.UserDefinedField;
    showGroupSystemMsg(o.ReportType, "[用户自定义系统消息]", o.GroupId, o.GroupName, e, o.MsgTime);
}

function onGroupInfoChangeNotify(o) {
    webim.Log.warn("执行 群资料变化 回调： " + JSON.stringify(o));
    var e = o.GroupId, i = (o.GroupFaceUrl, o.GroupName);
    o.OwnerAccount, o.GroupNotification, o.GroupIntroduction;
    i && webim.Log.warn("群id=" + e + "的新名称为：" + i);
}

function showGroupSystemMsg(o, e, i, n, t, r) {
    var s = "收到一条群系统消息: type=" + o + ", typeCh=" + e + ",群ID=" + i + ", 群名称=" + n + ", 内容=" + t + ", 时间=" + webim.Tool.formatTimeStamp(r);
    webim.Log.warn(s), console.error(s);
}

function init(o) {
    accountMode = o.accountMode, accountType = o.accountType, sdkAppID = o.sdkAppID, 
    avChatRoomId = o.avChatRoomId, selType = o.selType, selToID = o.selToID, console.log("avChatRoomId", avChatRoomId);
}

module.exports = {
    init: init,
    onBigGroupMsgNotify: onBigGroupMsgNotify,
    onMsgNotify: onMsgNotify,
    handlderMsg: handlderMsg,
    sdkLogin: sdkLogin,
    applyJoinBigGroup: applyJoinBigGroup,
    showMsg: showMsg,
    convertMsgtoHtml: convertMsgtoHtml,
    convertTextMsgToHtml: convertTextMsgToHtml,
    convertFaceMsgToHtml: convertFaceMsgToHtml,
    convertImageMsgToHtml: convertImageMsgToHtml,
    convertSoundMsgToHtml: convertSoundMsgToHtml,
    convertFileMsgToHtml: convertFileMsgToHtml,
    convertLocationMsgToHtml: convertLocationMsgToHtml,
    convertCustomMsgToHtml: convertCustomMsgToHtml,
    convertGroupTipMsgToHtml: convertGroupTipMsgToHtml,
    tlsLogin: tlsLogin,
    tlsGetUserSig: tlsGetUserSig,
    imageClick: imageClick,
    onChangePlayAudio: onChangePlayAudio,
    smsPicClick: smsPicClick,
    onSendMsg: onSendMsg,
    sendGroupLoveMsg: sendGroupLoveMsg,
    hideDiscussForm: hideDiscussForm,
    showDiscussForm: showDiscussForm,
    hideDiscussTool: hideDiscussTool,
    showDiscussTool: showDiscussTool,
    hideDiscussEmotion: hideDiscussEmotion,
    showDiscussEmotion: showDiscussEmotion,
    showLoveMsgAnimation: showLoveMsgAnimation,
    initEmotionUL: initEmotionUL,
    showEmotionDialog: showEmotionDialog,
    selectEmotionImg: selectEmotionImg,
    quitBigGroup: quitBigGroup,
    logout: logout,
    onApplyJoinGroupRequestNotify: onApplyJoinGroupRequestNotify,
    onApplyJoinGroupAcceptNotify: onApplyJoinGroupAcceptNotify,
    onApplyJoinGroupRefuseNotify: onApplyJoinGroupRefuseNotify,
    onKickedGroupNotify: onKickedGroupNotify,
    onDestoryGroupNotify: onDestoryGroupNotify,
    onCreateGroupNotify: onCreateGroupNotify,
    onInvitedJoinGroupNotify: onInvitedJoinGroupNotify,
    onQuitGroupNotify: onQuitGroupNotify,
    onSetedGroupAdminNotify: onSetedGroupAdminNotify,
    onCanceledGroupAdminNotify: onCanceledGroupAdminNotify,
    onRevokeGroupNotify: onRevokeGroupNotify,
    onCustomGroupNotify: onCustomGroupNotify,
    onGroupInfoChangeNotify: onGroupInfoChangeNotify,
    showGroupSystemMsg: showGroupSystemMsg
};