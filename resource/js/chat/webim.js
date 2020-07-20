function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

module.exports = function() {
    var je = {}, e = {
        login: function(e, t, n) {},
        syncMsgs: function(e, t) {},
        getC2CHistoryMsgs: function(e, t, n) {},
        syncGroupMsgs: function(e, t, n) {},
        sendMsg: function(e, t, n) {},
        logout: function(e, t) {},
        setAutoRead: function(e, t, n) {},
        getProfilePortrait: function(e, t, n) {},
        setProfilePortrait: function(e, t, n) {},
        applyAddFriend: function(e, t, n) {},
        getPendency: function(e, t, n) {},
        deletePendency: function(e, t, n) {},
        responseFriend: function(e, t, n) {},
        getAllFriend: function(e, t, n) {},
        deleteFriend: function(e, t, n) {},
        addBlackList: function(e, t, n) {},
        getBlackList: function(e, t, n) {},
        deleteBlackList: function(e, t, n) {},
        uploadPic: function(e, t, n) {},
        createGroup: function(e, t, n) {},
        applyJoinGroup: function(e, t, n) {},
        handleApplyJoinGroup: function(e, t, n) {},
        deleteApplyJoinGroupPendency: function(e, t, n) {},
        quitGroup: function(e, t, n) {},
        getGroupPublicInfo: function(e, t, n) {},
        getGroupInfo: function(e, t, n) {},
        modifyGroupBaseInfo: function(e, t, n) {},
        destroyGroup: function(e, t, n) {},
        getJoinedGroupListHigh: function(e, t, n) {},
        getGroupMemberInfo: function(e, t, n) {},
        addGroupMember: function(e, t, n) {},
        modifyGroupMember: function(e, t, n) {},
        forbidSendMsg: function(e, t, n) {},
        deleteGroupMember: function(e, t, n) {},
        getPendencyGroup: function(e, t, n) {},
        getPendencyReport: function(e, t, n) {},
        getPendencyGroupRead: function(e, t, n) {},
        sendCustomGroupNotify: function(e, t, n) {},
        Msg: function(e, t, n, o, r, i, s, a) {},
        MsgStore: {
            sessMap: function() {
                return {};
            },
            sessCount: function() {
                return 0;
            },
            sessByTypeId: function(e, t) {
                return {};
            },
            delSessByTypeId: function(e, t) {
                return !0;
            },
            resetCookieAndSyncFlag: function() {},
            downloadMap: {}
        }
    };
    return function(t) {
        var c = "1.7.0", s = "537048168", w = !0, a = {
            FORMAL: {
                COMMON: "https://webim.tim.qq.com",
                PIC: "https://pic.tim.qq.com"
            },
            TEST: {
                COMMON: "https://test.tim.qq.com",
                PIC: "https://pic.tim.qq.com"
            }
        }, e = {}, k = "openim", q = "group_open_http_svc", u = "sns", l = "profile", p = "recentcontact", d = "openpic", g = "group_open_http_noauth_svc", x = "group_open_long_polling_http_noauth_svc", o = "imopenstat", f = "recentcontact", m = _defineProperty({
            openim: "v4",
            group_open_http_svc: "v4",
            sns: "v4",
            profile: "v4",
            recentcontact: "v4",
            openpic: "v4",
            group_open_http_noauth_svc: "v1",
            group_open_long_polling_http_noauth_svc: "v1",
            imopenstat: "v4"
        }, "recentcontact", "v4"), I = {
            login: 1,
            pic_up: 3,
            apply_join_group: 9,
            create_group: 10,
            longpolling: 18,
            send_group_msg: 19,
            sendmsg: 20
        }, B = {
            C2C: "C2C",
            GROUP: "GROUP"
        }, K = "OK", J = "FAIL", z = {
            TEXT: "TIMTextElem",
            FACE: "TIMFaceElem",
            IMAGE: "TIMImageElem",
            CUSTOM: "TIMCustomElem",
            SOUND: "TIMSoundElem",
            FILE: "TIMFileElem",
            LOCATION: "TIMLocationElem",
            GROUP_TIP: "TIMGroupTipElem"
        }, r = {
            ORIGIN: 1,
            LARGE: 2,
            SMALL: 3
        }, n = {
            JPG: 1,
            JPEG: 1,
            GIF: 2,
            PNG: 3,
            BMP: 4,
            UNKNOWN: 255
        }, M = {
            RAW_DATA: 0,
            BASE64_DATA: 1
        }, y = "10001", _ = 2106, i = 2107, h = {
            IMAGE: 1,
            FILE: 2,
            SHORT_VIDEO: 3,
            SOUND: 4
        }, E = {
            APP_VERSION: "2.1",
            SERVER_VERSION: 1
        }, H = 1, V = 3, Y = 4, X = 5, Q = 6, W = 7, j = 8, $ = 9, Z = 10, ee = 92, te = 96, ne = {
            COMMON: 0,
            LOVEMSG: 1,
            TIP: 2,
            REDPACKET: 3
        }, oe = 1, re = 3, ie = {
            JOIN: 1,
            QUIT: 2,
            KICK: 3,
            SET_ADMIN: 4,
            CANCEL_ADMIN: 5,
            MODIFY_GROUP_INFO: 6,
            MODIFY_MEMBER_INFO: 7
        }, se = {
            FACE_URL: 1,
            NAME: 2,
            OWNER: 3,
            NOTIFICATION: 4,
            INTRODUCTION: 5
        }, ae = {
            JOIN_GROUP_REQUEST: 1,
            JOIN_GROUP_ACCEPT: 2,
            JOIN_GROUP_REFUSE: 3,
            KICK: 4,
            DESTORY: 5,
            CREATE: 6,
            INVITED_JOIN_GROUP_REQUEST: 7,
            QUIT: 8,
            SET_ADMIN: 9,
            CANCEL_ADMIN: 10,
            REVOKE: 11,
            READED: 15,
            CUSTOM: 255,
            INVITED_JOIN_GROUP_REQUEST_AGREE: 12
        }, ue = {
            FRIEND_ADD: 1,
            FRIEND_DELETE: 2,
            PENDENCY_ADD: 3,
            PENDENCY_DELETE: 4,
            BLACK_LIST_ADD: 5,
            BLACK_LIST_DELETE: 6,
            PENDENCY_REPORT: 7,
            FRIEND_UPDATE: 8
        }, ce = 1, le = {
            INIT: -1,
            ON: 0,
            RECONNECT: 1,
            OFF: 9999
        }, pe = 14, de = le.INIT, ge = !1, fe = 0, me = 6e4, Ie = 60008, Me = null, ye = 0, T = 0, C = 0, _e = [], he = null, Ee = {
            sdkAppID: null,
            appIDAt3rd: null,
            accountType: null,
            identifier: null,
            tinyid: null,
            identifierNick: null,
            userSig: null,
            a2: null,
            contentType: "json",
            apn: 1
        }, A = {}, S = 0, v = {}, F = 0, Te = [], Ce = [], G = [], b = {
            downloadMap: {}
        }, R = {
            "[惊讶]": 0,
            "[撇嘴]": 1,
            "[色]": 2,
            "[发呆]": 3,
            "[得意]": 4,
            "[流泪]": 5,
            "[害羞]": 6,
            "[闭嘴]": 7,
            "[睡]": 8,
            "[大哭]": 9,
            "[尴尬]": 10,
            "[发怒]": 11,
            "[调皮]": 12,
            "[龇牙]": 13,
            "[微笑]": 14,
            "[难过]": 15,
            "[酷]": 16,
            "[冷汗]": 17,
            "[抓狂]": 18,
            "[吐]": 19,
            "[偷笑]": 20,
            "[可爱]": 21,
            "[白眼]": 22,
            "[傲慢]": 23,
            "[饿]": 24,
            "[困]": 25,
            "[惊恐]": 26,
            "[流汗]": 27,
            "[憨笑]": 28,
            "[大兵]": 29,
            "[奋斗]": 30,
            "[咒骂]": 31,
            "[疑问]": 32,
            "[嘘]": 33,
            "[晕]": 34
        }, N = {}, Ae = new function() {
            this.formatTimeStamp = function(e, t) {
                if (!e) return 0;
                var n;
                t = t || "yyyy-MM-dd hh:mm:ss";
                var o = new Date(1e3 * e), r = {
                    "M+": o.getMonth() + 1,
                    "d+": o.getDate(),
                    "h+": o.getHours(),
                    "m+": o.getMinutes(),
                    "s+": o.getSeconds()
                };
                for (var i in n = /(y+)/.test(t) ? t.replace(RegExp.$1, (o.getFullYear() + "").substr(4 - RegExp.$1.length)) : t, 
                r) new RegExp("(" + i + ")").test(n) && (n = n.replace(RegExp.$1, 1 == RegExp.$1.length ? r[i] : ("00" + r[i]).substr(("" + r[i]).length)));
                return n;
            }, this.groupTypeEn2Ch = function(e) {
                var t = null;
                switch (e) {
                  case "Public":
                    t = "公开群";
                    break;

                  case "ChatRoom":
                    t = "聊天室";
                    break;

                  case "Private":
                    t = "私有群";
                    break;

                  case "AVChatRoom":
                    t = "聊天室";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.groupTypeCh2En = function(e) {
                var t = null;
                switch (e) {
                  case "公开群":
                    t = "Public";
                    break;

                  case "聊天室":
                    t = "ChatRoom";
                    break;

                  case "私有群":
                    t = "Private";
                    break;

                  case "聊天室":
                    t = "AVChatRoom";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.groupRoleEn2Ch = function(e) {
                var t = null;
                switch (e) {
                  case "Member":
                    t = "成员";
                    break;

                  case "Admin":
                    t = "管理员";
                    break;

                  case "Owner":
                    t = "群主";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.groupRoleCh2En = function(e) {
                var t = null;
                switch (e) {
                  case "成员":
                    t = "Member";
                    break;

                  case "管理员":
                    t = "Admin";
                    break;

                  case "群主":
                    t = "Owner";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.groupMsgFlagEn2Ch = function(e) {
                var t = null;
                switch (e) {
                  case "AcceptAndNotify":
                    t = "接收并提示";
                    break;

                  case "AcceptNotNotify":
                    t = "接收不提示";
                    break;

                  case "Discard":
                    t = "屏蔽";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.groupMsgFlagCh2En = function(e) {
                var t = null;
                switch (e) {
                  case "接收并提示":
                    t = "AcceptAndNotify";
                    break;

                  case "接收不提示":
                    t = "AcceptNotNotify";
                    break;

                  case "屏蔽":
                    t = "Discard";
                    break;

                  default:
                    t = e;
                }
                return t;
            }, this.formatText2Html = function(e) {
                var t = e;
                return t && (t = (t = (t = this.xssFilter(t)).replace(/ /g, "&nbsp;")).replace(/\n/g, "<br/>")), 
                t;
            }, this.formatHtml2Text = function(e) {
                var t = e;
                return t && (t = (t = t.replace(/&nbsp;/g, " ")).replace(/<br\/>/g, "\n")), t;
            }, this.getStrBytes = function(e) {
                if (null == e || void 0 === e) return 0;
                if ("string" != typeof e) return 0;
                var t, n, o, r = 0;
                for (n = 0, o = e.length; n < o; n++) r += (t = e.charCodeAt(n)) <= 127 ? 1 : t <= 2047 ? 2 : t <= 65535 ? 3 : 4;
                return r;
            }, this.xssFilter = function(e) {
                return e = (e = (e = (e = e.toString()).replace(/[<]/g, "&lt;")).replace(/[>]/g, "&gt;")).replace(/"/g, "&quot;");
            }, this.trimStr = function(e) {
                return e ? (e = e.toString()).replace(/(^\s*)|(\s*$)/g, "") : "";
            }, this.validNumber = function(e) {
                return (e = e.toString()).match(/(^\d{1,8}$)/g);
            }, this.getReturnError = function(e, t) {
                return t || (t = -100), {
                    ActionStatus: J,
                    ErrorCode: t,
                    ErrorInfo: e + "[" + t + "]"
                };
            }, this.setCookie = function(e, t, n, o, r) {}, this.getCookie = function(e) {
                return null;
            }, this.delCookie = function(e) {
                var t = new Date();
                t.setTime(t.getTime() - 1);
                var n = this.getCookie(e);
                null != n && (document.cookie = e + "=" + escape(n) + ";expires=" + t.toGMTString());
            }, this.getQueryString = function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"), n = location.search.substr(1).match(t);
                return null != n ? unescape(n[2]) : null;
            };
        }(), Se = new function() {
            var t = !0;
            this.setOn = function(e) {
                t = e;
            }, this.getOn = function() {
                return t;
            }, this.error = function(e) {
                try {
                    t && console.error(e);
                } catch (e) {}
            }, this.warn = function(e) {
                try {
                    t && console.warn(e);
                } catch (e) {}
            }, this.info = function(e) {
                try {
                    t && console.info(e);
                } catch (e) {}
            }, this.debug = function(e) {
                try {
                    t && console.debug(e);
                } catch (e) {}
            };
        }(), O = function(e) {
            return e || (e = new Date()), Math.round(e.getTime() / 1e3);
        }, L = function() {
            return F ? F += 1 : F = Math.round(1e7 * Math.random()), F;
        }, P = function() {
            return Math.round(4294967296 * Math.random());
        }, D = function(e, t, n, o, r, i, s) {
            var a, u, c, l, p;
            a = e, u = t, c = JSON.stringify(n), l = function(e) {
                var t = null;
                e && (t = e), i && i(t);
            }, p = s, wx.request({
                url: u,
                data: c,
                dataType: "json",
                method: a,
                header: {
                    "Content-Type": "application/json"
                },
                success: function(e) {
                    fe = ye = 0, l && l(e.data);
                },
                fail: function(e) {
                    setTimeout(function() {
                        var e = Ae.getReturnError("请求服务器失败,请检查你的网络是否正常", -2);
                        p && p(e);
                    }, 16);
                }
            });
        }, U = function() {
            return Ee.sdkAppID && Ee.identifier;
        }, ve = function(e, t) {
            if (!U()) {
                if (t) {
                    var n = Ae.getReturnError("请登录", -4);
                    e && e(n);
                }
                return !1;
            }
            return !0;
        }, Fe = function() {
            return w;
        }, Ge = function(e, t, n, o) {
            var r = a;
            r = Fe() ? a.FORMAL.COMMON : a.TEST.COMMON, e == d && (r = Fe() ? a.FORMAL.PIC : a.TEST.PIC);
            var i = r + "/" + m[e] + "/" + e + "/" + t + "?websdkappid=" + s + "&v=" + c;
            if (U()) {
                if ("login" == t) i += "&identifier=" + encodeURIComponent(Ee.identifier) + "&usersig=" + Ee.userSig; else if (Ee.tinyid && Ee.a2) i += "&tinyid=" + Ee.tinyid + "&a2=" + Ee.a2; else if (o) return Se.error("tinyid或a2为空[" + e + "][" + t + "]"), 
                o(Ae.getReturnError("tinyid或a2为空[" + e + "][" + t + "]", -5)), !1;
                i += "&contenttype=" + Ee.contentType;
            }
            return i += "&sdkappid=" + Ee.sdkAppID + "&accounttype=" + Ee.accountType + "&apn=" + Ee.apn + "&reqtime=" + O();
        }, be = function(e, t, n) {
            var o = null;
            return he && _e[0] ? o = "http://" + _e[0] + "/asn.com/stddownload_common_file?authkey=" + he + "&bid=" + y + "&subbid=" + Ee.sdkAppID + "&fileid=" + e + "&filetype=" + i + "&openid=" + t + "&ver=0&filename=" + encodeURIComponent(n) : Se.error("拼接文件下载url不报错：ip或者authkey为空"), 
            b.downloadMap["uuid_" + e] = o;
        }, Re = function(e, t, n, o, r, i, s) {
            var a = {
                From_Account: t,
                To_Account: r,
                os_platform: 10,
                Timestamp: O().toString(),
                Random: P().toString(),
                request_info: [ {
                    busi_id: i,
                    download_flag: o,
                    type: s,
                    uuid: e,
                    version: E.SERVER_VERSION,
                    auth_key: he,
                    ip: _e[0]
                } ]
            };
            Je(a, function(e) {
                0 == e.error_code && e.response_info && (b.downloadMap["uuid_" + a.uuid] = e.response_info.url), 
                onAppliedDownloadUrl && onAppliedDownloadUrl({
                    uuid: a.uuid,
                    url: e.response_info.url,
                    maps: b.downloadMap
                });
            }, function(e) {
                Se.error("获取下载地址失败", a.uuid);
            });
        }, Ne = function() {
            !function() {
                for (var e in v) {
                    var t = v[e];
                    t && (t.abort(), v[S] = null);
                }
                S = 0, v = {};
            }(), Ee = {
                sdkAppID: null,
                appIDAt3rd: null,
                accountType: null,
                identifier: null,
                identifierNick: null,
                userSig: null,
                contentType: "json",
                apn: 1
            }, A = {}, F = 0, null, G = [], Qe.clear(), Me = null;
        }, Oe = function(e, t, n) {
            if ("longpolling" != e || t != Ie && 91101 != t) {
                var o = I[e];
                if (o) {
                    var r = O(), i = null, s = {
                        Code: t,
                        ErrMsg: n
                    };
                    if (Ee.a2 ? i = Ee.a2.substring(0, 10) + "_" + r + "_" + P() : Ee.userSig && (i = Ee.userSig.substring(0, 10) + "_" + r + "_" + P()), 
                    i) {
                        var a = {
                            UniqKey: i,
                            EventId: o,
                            ReportTime: r,
                            MsgCmdErrorCode: s
                        };
                        if ("login" == e) {
                            var u = [];
                            u.push(a), Be({
                                EvtItems: u,
                                MainVersion: c,
                                Version: "0"
                            }, function(e) {
                                u = null;
                            }, function(e) {
                                u = null;
                            });
                        } else {
                            if (G.push(a), 20 <= G.length) Be({
                                EvtItems: G,
                                MainVersion: c,
                                Version: "0"
                            }, function(e) {
                                G = [];
                            }, function(e) {
                                G = [];
                            });
                        }
                    }
                }
            }
        }, Le = function(i, n) {
            ze.apiCall(k, "login", {
                State: "Online"
            }, function(e) {
                if (e.TinyId) Ee.tinyid = e.TinyId; else if (n) return void n(Ae.getReturnError("TinyId is empty", -10));
                if (e.A2Key) Ee.a2 = e.A2Key; else if (n) return void n(Ae.getReturnError("A2Key is empty", -11));
                var t = {
                    From_Account: Ee.identifier,
                    To_Account: [ Ee.identifier ],
                    LastStandardSequence: 0,
                    TagList: [ "Tag_Profile_IM_Nick", "Tag_Profile_IM_Image" ]
                };
                qe(t, function(e) {
                    if (e.UserProfileItem && 0 < e.UserProfileItem.length) for (var t in e.UserProfileItem) for (var n in e.UserProfileItem[t].ProfileItem) switch (e.UserProfileItem[t].ProfileItem[n].Tag) {
                      case "Tag_Profile_IM_Nick":
                        var o;
                        (o = e.UserProfileItem[t].ProfileItem[n].Value) && (Ee.identifierNick = o);
                        break;

                      case "Tag_Profile_IM_Image":
                        var r = e.UserProfileItem[t].ProfileItem[n].Value;
                        r && (Ee.headurl = r);
                    }
                    i && i(Ee.identifierNick, Ee.headurl);
                }, n);
            }, n);
        }, Pe = function(e, t, n) {
            if (!ve(n, !1)) return Ne(), void (t && t({
                ActionStatus: K,
                ErrorCode: 0,
                ErrorInfo: "logout success"
            }));
            "all" == e ? ze.apiCall(k, "logout", {}, function(e) {
                Ne(), t && t(e);
            }, n) : ze.apiCall(k, "longpollinglogout", {
                LongPollingId: Me
            }, function(e) {
                Ne(), t && t(e);
            }, n);
        }, De = function(e, t, n, o) {
            if (ve(o, !0)) {
                var r = [];
                for (var i in t) {
                    var s = {
                        To_Account: t[i].toAccount,
                        LastedMsgTime: t[i].lastedMsgTime
                    };
                    r.push(s);
                }
                ze.apiCall(k, "msgreaded", {
                    C2CMsgReaded: {
                        Cookie: e,
                        C2CMsgReadedItem: r
                    }
                }, n, o);
            }
        }, Ue = function(e, t, n) {
            ve(n, !0) && ze.apiCall(q, "get_joined_group_list", {
                Member_Account: e.Member_Account,
                Limit: e.Limit,
                Offset: e.Offset,
                GroupType: e.GroupType,
                ResponseFilter: {
                    GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                    SelfInfoFilter: e.SelfInfoFilter
                }
            }, t, n);
        }, we = function(e, t, n) {
            ve(n, !0) && ze.apiCall(q, "msg_read_report", {
                GroupId: e.GroupId,
                MsgReadedSeq: e.MsgReadedSeq
            }, t, n);
        }, ke = function(e) {
            var t = [];
            if (e.Fail_Account && e.Fail_Account.length && (t = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var n in e.Invalid_Account) t.push(e.Invalid_Account[n]);
            if (t.length) for (var o in e.ActionStatus = J, e.ErrorCode = 99999, e.ErrorInfo = "", 
            t) {
                var r = t[o];
                for (var i in e.ResultItem) if (e.ResultItem[i].To_Account == r) {
                    var s = e.ResultItem[i].ResultCode;
                    e.ResultItem[i].ResultInfo = "[" + s + "]" + e.ResultItem[i].ResultInfo, e.ErrorInfo += e.ResultItem[i].ResultInfo + "\n";
                    break;
                }
            }
            return e;
        }, qe = function(e, a, u) {
            100 < e.To_Account.length && (e.To_Account.length = 100, Se.error("获取用户资料人数不能超过100人")), 
            ve(u, !0) && ze.apiCall(l, "portrait_get", {
                From_Account: Ee.identifier,
                To_Account: e.To_Account,
                TagList: e.TagList
            }, function(e) {
                var t = [];
                if (e.Fail_Account && e.Fail_Account.length && (t = e.Fail_Account), e.Invalid_Account && e.Invalid_Account.length) for (var n in e.Invalid_Account) t.push(e.Invalid_Account[n]);
                if (t.length) for (var o in e.ActionStatus = J, e.ErrorCode = 99999, e.ErrorInfo = "", 
                t) {
                    var r = t[o];
                    for (var i in e.UserProfileItem) if (e.UserProfileItem[i].To_Account == r) {
                        var s = e.UserProfileItem[i].ResultCode;
                        e.UserProfileItem[i].ResultInfo = "[" + s + "]" + e.UserProfileItem[i].ResultInfo, 
                        e.ErrorInfo += "账号:" + r + "," + e.UserProfileItem[i].ResultInfo + "\n";
                        break;
                    }
                }
                e.ActionStatus == J ? u && u(e) : a && a(e);
            }, u);
        }, xe = function(e, t, n) {
            var o;
            ve(n, !0) && (o = Fe() ? "pic_up" : "pic_up_test", ze.apiCall(d, o, {
                App_Version: E.APP_VERSION,
                From_Account: Ee.identifier,
                To_Account: e.To_Account,
                Seq: e.Seq,
                Timestamp: e.Timestamp,
                Random: e.Random,
                File_Str_Md5: e.File_Str_Md5,
                File_Size: e.File_Size,
                File_Type: e.File_Type,
                Server_Ver: E.SERVER_VERSION,
                Auth_Key: he,
                Busi_Id: e.Busi_Id,
                PkgFlag: e.PkgFlag,
                Slice_Offset: e.Slice_Offset,
                Slice_Size: e.Slice_Size,
                Slice_Data: e.Slice_Data
            }, t, n));
        }, Be = function(e, t, n) {
            ve(n, !0) && ze.apiCall(o, "web_report", e, t, n);
        }, Ke = function(e, t, n) {
            ve(n, !0) && ze.apiCall(k, "getlongpollingid", {}, function(e) {
                t && t(e);
            }, n);
        }, Je = function(e, t, n) {
            ze.apiCall(d, "apply_download", e, t, n);
        };
        e = "wechat";
        var ze = new function() {
            var o = null;
            this.init = function(e, t, n) {
                e && (o = e);
            }, this.callBack = function(e) {
                o && o(e);
            }, this.clear = function() {
                o = null;
            }, this.apiCall = function(r, i, s, a, u, e, t) {
                var c = Ge(r, i, 0, u);
                0 != c && D("POST", c, s, 0, 0, function(e) {
                    var t = null, n = "";
                    "pic_up" == i && (s.Slice_Data = "");
                    var o = "\n request url: \n" + c + "\n request body: \n" + JSON.stringify(s) + "\n response: \n" + JSON.stringify(e);
                    e.ActionStatus == K ? (Se.info("[" + r + "][" + i + "]success: " + o), a && a(e), 
                    t = 0, n = "") : (t = e.ErrorCode, n = e.ErrorInfo, u && (e.SrcErrorInfo = e.ErrorInfo, 
                    e.ErrorInfo = "[" + r + "][" + i + "]failed: " + o, "longpolling" == i && e.ErrorCode == Ie || Se.error(e.ErrorInfo), 
                    u(e))), Oe(i, t, n);
                }, function(e) {
                    u && u(e), Oe(i, e.ErrorCode, e.ErrorInfo);
                });
            };
        }(), He = function e(t, n, o, r, i, s) {
            this._impl = {
                skey: e.skey(t, n),
                type: t,
                id: n,
                name: o,
                icon: r,
                unread: 0,
                isAutoRead: !1,
                time: 0 <= i ? i : 0,
                curMaxMsgSeq: 0 <= s ? s : 0,
                msgs: [],
                isFinished: 1
            };
        };
        He.skey = function(e, t) {
            return e + t;
        }, He.prototype.type = function() {
            return this._impl.type;
        }, He.prototype.id = function() {
            return this._impl.id;
        }, He.prototype.name = function() {
            return this._impl.name;
        }, He.prototype.icon = function() {
            return this._impl.icon;
        }, He.prototype.unread = function(e) {
            if (void 0 === e) return this._impl.unread;
            this._impl.unread = e;
        }, He.prototype.isFinished = function(e) {
            if (void 0 === e) return this._impl.isFinished;
            this._impl.isFinished = e;
        }, He.prototype.time = function() {
            return this._impl.time;
        }, He.prototype.curMaxMsgSeq = function(e) {
            if (void 0 === e) return this._impl.curMaxMsgSeq;
            this._impl.curMaxMsgSeq = e;
        }, He.prototype.msgCount = function() {
            return this._impl.msgs.length;
        }, He.prototype.msg = function(e) {
            return this._impl.msgs[e];
        }, He.prototype.msgs = function() {
            return this._impl.msgs;
        }, He.prototype._impl_addMsg = function(e) {
            this._impl.msgs.push(e), e.time > this._impl.time && (this._impl.time = e.time), 
            e.seq > this._impl.curMaxMsgSeq && (this._impl.curMaxMsgSeq = e.seq), e.isSend || this._impl.isAutoRead || this._impl.unread++;
        };
        var Ve = function(e, t) {
            this.toAccount = e, this.lastedMsgTime = t;
        }, Ye = function(e, t, n, o, r, i, s, a) {
            this.sess = e, this.subType = 0 <= s ? s : 0, this.fromAccount = i, this.fromAccountNick = a || i, 
            this.isSend = Boolean(t), this.seq = 0 <= n ? n : L(), this.random = 0 <= o ? o : P(), 
            this.time = 0 <= r ? r : O(), this.elems = [];
        };
        Ye.prototype.getSession = function() {
            return this.sess;
        }, Ye.prototype.getType = function() {
            return this.subType;
        }, Ye.prototype.getSubType = function() {
            return this.subType;
        }, Ye.prototype.getFromAccount = function() {
            return this.fromAccount;
        }, Ye.prototype.getFromAccountNick = function() {
            return this.fromAccountNick;
        }, Ye.prototype.getIsSend = function() {
            return this.isSend;
        }, Ye.prototype.getSeq = function() {
            return this.seq;
        }, Ye.prototype.getTime = function() {
            return this.time;
        }, Ye.prototype.getRandom = function() {
            return this.random;
        }, Ye.prototype.getElems = function() {
            return this.elems;
        }, Ye.prototype.addText = function(e) {
            this.addElem(new t.Msg.Elem(z.TEXT, e));
        }, Ye.prototype.addFace = function(e) {
            this.addElem(new t.Msg.Elem(z.FACE, e));
        }, Ye.prototype.addImage = function(e) {
            this.addElem(new t.Msg.Elem(z.IMAGE, e));
        }, Ye.prototype.addLocation = function(e) {
            this.addElem(new t.Msg.Elem(z.LOCATION, e));
        }, Ye.prototype.addFile = function(e) {
            this.addElem(new t.Msg.Elem(z.FILE, e));
        }, Ye.prototype.addCustom = function(e) {
            this.addElem(new t.Msg.Elem(z.CUSTOM, e));
        }, Ye.prototype.addElem = function(e) {
            this.elems.push(e);
        }, Ye.prototype.toHtml = function() {
            var e = "";
            for (var t in this.elems) {
                e += this.elems[t].toHtml();
            }
            return e;
        }, (Ye.Elem = function(e, t) {
            this.type = e, this.content = t;
        }).prototype.getType = function() {
            return this.type;
        }, Ye.Elem.prototype.getContent = function() {
            return this.content;
        }, Ye.Elem.prototype.toHtml = function() {
            return this.content.toHtml();
        }, Ye.Elem.Text = function(e) {
            this.text = Ae.xssFilter(e);
        }, Ye.Elem.Text.prototype.getText = function() {
            return this.text;
        }, Ye.Elem.Text.prototype.toHtml = function() {
            return this.text;
        }, Ye.Elem.Face = function(e, t) {
            this.index = e, this.data = t;
        }, Ye.Elem.Face.prototype.getIndex = function() {
            return this.index;
        }, Ye.Elem.Face.prototype.getData = function() {
            return this.data;
        }, Ye.Elem.Face.prototype.toHtml = function() {
            var e = null, t = R[this.data], n = N[t];
            return n && n[1] && (e = n[1]), e ? "<img src='" + e + "'/>" : this.data;
        }, Ye.Elem.Location = function(e, t, n) {
            this.latitude = t, this.longitude = e, this.desc = n;
        }, Ye.Elem.Location.prototype.getLatitude = function() {
            return this.latitude;
        }, Ye.Elem.Location.prototype.getLongitude = function() {
            return this.longitude;
        }, Ye.Elem.Location.prototype.getDesc = function() {
            return this.desc;
        }, Ye.Elem.Location.prototype.toHtml = function() {
            return "经度=" + this.longitude + ",纬度=" + this.latitude + ",描述=" + this.desc;
        }, Ye.Elem.Images = function(e, t) {
            this.UUID = e, "number" != typeof t && (t = parseInt(n[t] || n.UNKNOWN, 10)), this.ImageFormat = t, 
            this.ImageInfoArray = [];
        }, Ye.Elem.Images.prototype.addImage = function(e) {
            this.ImageInfoArray.push(e);
        }, Ye.Elem.Images.prototype.toHtml = function() {
            var e = this.getImage(r.SMALL), t = this.getImage(r.LARGE), n = this.getImage(r.ORIGIN);
            return t || (t = e), n || (n = e), "<img src='" + e.getUrl() + "#" + t.getUrl() + "#" + n.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + t.getUrl() + "' onclick='imageClick(this)' />";
        }, Ye.Elem.Images.prototype.getImageId = function() {
            return this.UUID;
        }, Ye.Elem.Images.prototype.getImageFormat = function() {
            return this.ImageFormat;
        }, Ye.Elem.Images.prototype.getImage = function(e) {
            for (var t in this.ImageInfoArray) if (this.ImageInfoArray[t].getType() == e) return this.ImageInfoArray[t];
            return null;
        }, Ye.Elem.Images.Image = function(e, t, n, o, r) {
            this.type = e, this.size = t, this.width = n, this.height = o, this.url = r;
        }, Ye.Elem.Images.Image.prototype.getType = function() {
            return this.type;
        }, Ye.Elem.Images.Image.prototype.getSize = function() {
            return this.size;
        }, Ye.Elem.Images.Image.prototype.getWidth = function() {
            return this.width;
        }, Ye.Elem.Images.Image.prototype.getHeight = function() {
            return this.height;
        }, Ye.Elem.Images.Image.prototype.getUrl = function() {
            return this.url;
        }, Ye.Elem.Sound = function(e, t, n, o, r, i, s) {
            var a, u, c;
            this.uuid = e, this.second = t, this.size = n, this.senderId = o, this.receiverId = r, 
            this.downFlag = i, this.busiId = s == B.C2C ? 2 : 1, void 0 !== i && void 0 !== busiId ? Re(e, o, 0, i, r, this.busiId, h.SOUND) : this.downUrl = (a = e, 
            u = o, c = null, he && _e[0] ? c = "http://" + _e[0] + "/asn.com/stddownload_common_file?authkey=" + he + "&bid=" + y + "&subbid=" + Ee.sdkAppID + "&fileid=" + a + "&filetype=" + _ + "&openid=" + u + "&ver=0" : Se.error("拼接语音下载url不报错：ip或者authkey为空"), 
            c);
        }, Ye.Elem.Sound.prototype.getUUID = function() {
            return this.uuid;
        }, Ye.Elem.Sound.prototype.getSecond = function() {
            return this.second;
        }, Ye.Elem.Sound.prototype.getSize = function() {
            return this.size;
        }, Ye.Elem.Sound.prototype.getSenderId = function() {
            return this.senderId;
        }, Ye.Elem.Sound.prototype.getDownUrl = function() {
            return this.downUrl;
        }, Ye.Elem.Sound.prototype.toHtml = function() {
            return "ie" == e.type && parseInt(e.ver) <= 8 ? "[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:" + this.downUrl : '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
        }, Ye.Elem.File = function(e, t, n, o, r, i, s) {
            this.uuid = e, this.name = t, this.size = n, this.senderId = o, this.receiverId = r, 
            this.downFlag = i, this.busiId = s == B.C2C ? 2 : 1, void 0 !== i && void 0 !== busiId ? Re(e, o, 0, i, r, this.busiId, h.FILE) : this.downUrl = be(e, o, t);
        }, Ye.Elem.File.prototype.getUUID = function() {
            return this.uuid;
        }, Ye.Elem.File.prototype.getName = function() {
            return this.name;
        }, Ye.Elem.File.prototype.getSize = function() {
            return this.size;
        }, Ye.Elem.File.prototype.getSenderId = function() {
            return this.senderId;
        }, Ye.Elem.File.prototype.getDownUrl = function() {
            return this.downUrl;
        }, Ye.Elem.File.prototype.getDownFlag = function() {
            return this.downFlag;
        }, Ye.Elem.File.prototype.toHtml = function() {
            var e, t;
            return e = this.size, t = "Byte", 1024 <= this.size && (e = Math.round(this.size / 1024), 
            t = "KB"), '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + "(" + e + t + ")</i></a>";
        }, Ye.Elem.GroupTip = function(e, t, n, o, r) {
            this.opType = e, this.opUserId = t, this.groupId = n, this.groupName = o, this.userIdList = r || [], 
            this.groupInfoList = [], this.memberInfoList = [], this.groupMemberNum = null;
        }, Ye.Elem.GroupTip.prototype.addGroupInfo = function(e) {
            this.groupInfoList.push(e);
        }, Ye.Elem.GroupTip.prototype.addMemberInfo = function(e) {
            this.memberInfoList.push(e);
        }, Ye.Elem.GroupTip.prototype.getOpType = function() {
            return this.opType;
        }, Ye.Elem.GroupTip.prototype.getOpUserId = function() {
            return this.opUserId;
        }, Ye.Elem.GroupTip.prototype.getGroupId = function() {
            return this.groupId;
        }, Ye.Elem.GroupTip.prototype.getGroupName = function() {
            return this.groupName;
        }, Ye.Elem.GroupTip.prototype.getUserIdList = function() {
            return this.userIdList;
        }, Ye.Elem.GroupTip.prototype.getGroupInfoList = function() {
            return this.groupInfoList;
        }, Ye.Elem.GroupTip.prototype.getMemberInfoList = function() {
            return this.memberInfoList;
        }, Ye.Elem.GroupTip.prototype.getGroupMemberNum = function() {
            return this.groupMemberNum;
        }, Ye.Elem.GroupTip.prototype.setGroupMemberNum = function(e) {
            return this.groupMemberNum = e;
        }, Ye.Elem.GroupTip.prototype.toHtml = function() {
            var e = "[群提示消息]";
            switch (this.opType) {
              case ie.JOIN:
                for (var t in e += this.opUserId + "邀请了", this.userIdList) if (e += this.userIdList[t] + ",", 
                10 < this.userIdList.length && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "加入该群";
                break;

              case ie.QUIT:
                e += this.opUserId + "主动退出该群";
                break;

              case ie.KICK:
                for (var t in e += this.opUserId + "将", this.userIdList) if (e += this.userIdList[t] + ",", 
                10 < this.userIdList.length && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "踢出该群";
                break;

              case ie.SET_ADMIN:
                for (var t in e += this.opUserId + "将", this.userIdList) if (e += this.userIdList[t] + ",", 
                10 < this.userIdList.length && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "设为管理员";
                break;

              case ie.CANCEL_ADMIN:
                for (var t in e += this.opUserId + "取消", this.userIdList) if (e += this.userIdList[t] + ",", 
                10 < this.userIdList.length && 9 == t) {
                    e += "等" + this.userIdList.length + "人";
                    break;
                }
                e += "的管理员资格";
                break;

              case ie.MODIFY_GROUP_INFO:
                for (var t in e += this.opUserId + "修改了群资料：", this.groupInfoList) {
                    var n = this.groupInfoList[t].getType(), o = this.groupInfoList[t].getValue();
                    switch (n) {
                      case se.FACE_URL:
                        e += "群头像为" + o + "; ";
                        break;

                      case se.NAME:
                        e += "群名称为" + o + "; ";
                        break;

                      case se.OWNER:
                        e += "群主为" + o + "; ";
                        break;

                      case se.NOTIFICATION:
                        e += "群公告为" + o + "; ";
                        break;

                      case se.INTRODUCTION:
                        e += "群简介为" + o + "; ";
                        break;

                      default:
                        e += "未知信息为:type=" + n + ",value=" + o + "; ";
                    }
                }
                break;

              case ie.MODIFY_MEMBER_INFO:
                for (var t in e += this.opUserId + "修改了群成员资料:", this.memberInfoList) {
                    var r = this.memberInfoList[t].getUserId(), i = this.memberInfoList[t].getShutupTime();
                    if (e += r + ": ", e += null != i && void 0 !== i ? 0 == i ? "取消禁言; " : "禁言" + i + "秒; " : " shutupTime为空", 
                    10 < this.memberInfoList.length && 9 == t) {
                        e += "等" + this.memberInfoList.length + "人";
                        break;
                    }
                }
                break;

              case ie.READED:
                Log.info("消息已读同步");
                break;

              default:
                e += "未知群提示消息类型：type=" + this.opType;
            }
            return e;
        }, Ye.Elem.GroupTip.GroupInfo = function(e, t) {
            this.type = e, this.value = t;
        }, Ye.Elem.GroupTip.GroupInfo.prototype.getType = function() {
            return this.type;
        }, Ye.Elem.GroupTip.GroupInfo.prototype.getValue = function() {
            return this.value;
        }, Ye.Elem.GroupTip.MemberInfo = function(e, t) {
            this.userId = e, this.shutupTime = t;
        }, Ye.Elem.GroupTip.MemberInfo.prototype.getUserId = function() {
            return this.userId;
        }, Ye.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function() {
            return this.shutupTime;
        }, Ye.Elem.Custom = function(e, t, n) {
            this.data = e, this.desc = t, this.ext = n;
        }, Ye.Elem.Custom.prototype.getData = function() {
            return this.data;
        }, Ye.Elem.Custom.prototype.getDesc = function() {
            return this.desc;
        }, Ye.Elem.Custom.prototype.getExt = function() {
            return this.ext;
        }, Ye.Elem.Custom.prototype.toHtml = function() {
            return this.data;
        };
        var Xe = new function() {
            var s = {}, e = [];
            je = {}, this.cookie = "", this.syncFlag = 0;
            var i = function(e) {
                for (var t in s) e(s[t]);
            };
            this.sessMap = function() {
                return s;
            }, this.sessCount = function() {
                return e.length;
            }, this.sessByTypeId = function(e, t) {
                var n = He.skey(e, t);
                return void 0 === n || null == n ? null : s[n];
            }, this.delSessByTypeId = function(e, t) {
                var n = He.skey(e, t);
                return void 0 !== n && null != n && (s[n] && (delete s[n], delete je[n]), !0);
            }, this.resetCookieAndSyncFlag = function() {
                this.cookie = "", this.syncFlag = 0;
            }, this.setAutoRead = function(e, t, n) {
                if (n && i(function(e) {
                    e._impl.isAutoRead = !1;
                }), e && (e._impl.isAutoRead = t)) if (e._impl.unread = 0, e._impl.type == B.C2C) {
                    var o = [];
                    o.push(new Ve(e._impl.id, e._impl.time)), De(Xe.cookie, o, function(e) {
                        Se.info("[setAutoRead]: c2CMsgReaded success");
                    }, function(e) {
                        Se.error("[setAutoRead}: c2CMsgReaded failed:" + e.ErrorInfo);
                    });
                } else if (e._impl.type == B.GROUP) {
                    var r = {
                        GroupId: e._impl.id,
                        MsgReadedSeq: e._impl.curMaxMsgSeq
                    };
                    we(r, function(e) {
                        Se.info("groupMsgReaded success");
                    }, function(e) {
                        Se.error("groupMsgReaded failed:" + e.ErrorInfo);
                    });
                }
            }, this.c2CMsgReaded = function(e, t, n) {
                var o = [];
                o.push(new Ve(e.To_Account, e.LastedMsgTime)), De(Xe.cookie, o, function(e) {
                    t && (Se.info("c2CMsgReaded success"), t(e));
                }, function(e) {
                    n && (Se.error("c2CMsgReaded failed:" + e.ErrorInfo), n(e));
                });
            }, this.addSession = function(e) {
                s[e._impl.skey] = e;
            }, this.delSession = function(e) {
                delete s[e._impl.skey];
            }, this.addMsg = function(e) {
                if (n = !1, o = (t = e).sess._impl.skey, r = t.isSend + t.seq + t.random, je[o] && je[o][r] && (n = !0), 
                je[o] || (je[o] = {}), je[o][r] = {
                    time: t.time
                }, n) return !1;
                var t, n, o, r, i = e.sess;
                return s[i._impl.skey] || this.addSession(i), i._impl_addMsg(e), !0;
            }, this.updateTimeline = function() {
                var t = new Array();
                i(function(e) {
                    t.push(e);
                }), t.sort(function(e, t) {
                    return t.time - e.time;
                }), e = t;
            };
        }(), Qe = new function() {
            var y = null, N = null, d = {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null,
                9: null,
                10: null,
                11: null,
                15: null,
                255: null,
                12: null
            }, s = {
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
                6: null,
                7: null,
                8: null
            }, a = {
                1: null
            }, u = !1, i = 0, g = 0, c = null, l = !1, p = 0, f = 90, m = null, I = {}, M = {
                92: null,
                96: null
            }, _ = null, r = 0, h = {}, E = {};
            this.setLongPollingOn = function(e) {
                u = e;
            }, this.getLongPollingOn = function() {
                return u;
            }, this.resetLongPollingInfo = function() {
                u = !1, g = i = 0;
            }, this.setBigGroupLongPollingOn = function(e) {
                l = e;
            }, this.setBigGroupLongPollingKey = function(e) {
                m = e;
            }, this.resetBigGroupLongPollingInfo = function() {
                l = !1, p = 0, m = null, I = {};
            }, this.setBigGroupLongPollingMsgMap = function(e, t) {
                var n = I[e];
                n ? (n = parseInt(n) + t, I[e] = n) : I[e] = t;
            }, this.clear = function() {
                d = {
                    1: N = null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null,
                    9: null,
                    10: null,
                    11: null,
                    15: null,
                    255: null,
                    12: null
                }, s = {
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null
                }, l = u = !(a = {
                    1: null
                }), p = g = i = 0, I = {}, E = {}, _e = [], he = m = c = y = null;
            };
            var T = function(t, n) {
                var e, o;
                e = function(e) {
                    _e = e.IpList, he = e.AuthKey, e.ExpireTime, t && t(e);
                }, ve(o = function(e) {
                    Se.error("initIpAndAuthkey failed:" + e.ErrorInfo), n && n(e);
                }, !0) && ze.apiCall(k, "authkey", {}, e, o);
            }, C = function(e, t, n) {
                r++;
                var o = {
                    GroupId: e,
                    ReqMsgSeq: t,
                    ReqMsgNumber: n
                };
                Se.warn("第" + r + "次补齐群消息,参数=" + JSON.stringify(o)), Qe.syncGroupMsgs(o);
            }, A = function(e, t) {
                var n = h[e];
                n ? n < t && (h[e] = t) : h[e] = t;
            }, S = function(e, t) {
                for (var n in e) {
                    var o = e[n];
                    if (o.From_Account) {
                        var r = U(o, !1, !0);
                        r && t.push(r), A(o.ToGroupId, o.MsgSeq);
                    }
                }
                return t;
            }, v = function(e, t) {
                var n = {}, o = [];
                for (var r in t) {
                    var i = n[t[r].ToGroupId];
                    i || (i = n[t[r].ToGroupId] = {
                        min: 99999999,
                        max: -1,
                        msgs: []
                    }), t[r].NoticeSeq > g && (Se.warn("noticeSeq=" + g + ",msgNoticeSeq=" + t[r].NoticeSeq), 
                    g = t[r].NoticeSeq), t[r].Event = e, n[t[r].ToGroupId].msgs.push(t[r]), t[r].MsgSeq < i.min && (n[t[r].ToGroupId].min = t[r].MsgSeq), 
                    t[r].MsgSeq > i.max && (n[t[r].ToGroupId].max = t[r].MsgSeq);
                }
                for (var s in n) {
                    var a = n[s].max - n[s].min + 1, u = h[s];
                    u ? 1 < n[s].min - u || n[s].msgs.length < a ? (Se.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + u + ", minMsgSeq=" + n[s].min + ", maxMsgSeq=" + n[s].max + ", msgs.length=" + n[s].msgs.length + ", tempCount=" + a), 
                    C(s, n[s].max, n[s].max - u), A(s, n[s].max)) : o = S(n[s].msgs, o) : (Se.warn("不存在该群的最大消息seq，群id=" + s), 
                    n[s].msgs.length < a ? (Se.warn("发起一次补齐群消息请求,minMsgSeq=" + n[s].min + ", maxMsgSeq=" + n[s].max + ", msgs.length=" + n[s].msgs.length + ", tempCount=" + a), 
                    C(s, n[s].max, a), A(s, n[s].max)) : o = S(n[s].msgs, o));
                }
                o.length && Xe.updateTimeline(), y && o.length && y(o);
            }, F = function(e, t) {
                var n = {}, o = [];
                for (var r in t) {
                    var i = n[t[r].ToGroupId];
                    i || (i = n[t[r].ToGroupId] = {
                        min: 99999999,
                        max: -1,
                        msgs: []
                    }), t[r].NoticeSeq > g && (Se.warn("noticeSeq=" + g + ",msgNoticeSeq=" + t[r].NoticeSeq), 
                    g = t[r].NoticeSeq), t[r].Event = e, n[t[r].ToGroupId].msgs.push(t[r]), t[r].MsgSeq < i.min && (n[t[r].ToGroupId].min = t[r].MsgSeq), 
                    t[r].MsgSeq > i.max && (n[t[r].ToGroupId].max = t[r].MsgSeq);
                }
                for (var s in n) {
                    var a = n[s].max - n[s].min + 1, u = h[s];
                    u ? 1 < n[s].min - u || n[s].msgs.length < a ? (Se.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + u + ", minMsgSeq=" + n[s].min + ", maxMsgSeq=" + n[s].max + ", msgs.length=" + n[s].msgs.length + ", tempCount=" + a), 
                    C(s, n[s].max, n[s].max - u), A(s, n[s].max)) : o = S(n[s].msgs, o) : (Se.warn("不存在该群的最大消息seq，群id=" + s), 
                    n[s].msgs.length < a ? (Se.warn("发起一次补齐群消息请求,minMsgSeq=" + n[s].min + ", maxMsgSeq=" + n[s].max + ", msgs.length=" + n[s].msgs.length + ", tempCount=" + a), 
                    C(s, n[s].max, a), A(s, n[s].max)) : o = S(n[s].msgs, o));
                }
                o.length && Xe.updateTimeline(), y && o.length && y(o);
            }, G = function(e, t) {
                for (var n in e) {
                    var o = e[n], r = o.MsgBody, i = r.ReportType;
                    0 == t && o.NoticeSeq && o.NoticeSeq > g && (g = o.NoticeSeq);
                    o.GroupInfo.To_Account;
                    if (t) {
                        var s = o.ToGroupId + "_" + i + "_" + r.Operator_Account;
                        if (E[s]) {
                            Se.warn("收到重复的群系统消息：key=" + s);
                            continue;
                        }
                        E[s] = !0;
                    }
                    var a = {
                        SrcFlag: 0,
                        ReportType: i,
                        GroupId: o.ToGroupId,
                        GroupName: o.GroupInfo.GroupName,
                        Operator_Account: r.Operator_Account,
                        MsgTime: o.MsgTimeStamp,
                        groupReportTypeMsg: r
                    };
                    switch (i) {
                      case ae.JOIN_GROUP_REQUEST:
                        a.RemarkInfo = r.RemarkInfo, a.MsgKey = r.MsgKey, a.Authentication = r.Authentication, 
                        a.UserDefinedField = o.UserDefinedField, a.From_Account = o.From_Account, a.MsgSeq = o.ClientSeq, 
                        a.MsgRandom = o.MsgRandom;
                        break;

                      case ae.JOIN_GROUP_ACCEPT:
                      case ae.JOIN_GROUP_REFUSE:
                        a.RemarkInfo = r.RemarkInfo;
                        break;

                      case ae.KICK:
                      case ae.DESTORY:
                      case ae.CREATE:
                      case ae.INVITED_JOIN_GROUP_REQUEST:
                      case ae.INVITED_JOIN_GROUP_REQUEST_AGREE:
                      case ae.QUIT:
                      case ae.SET_ADMIN:
                      case ae.CANCEL_ADMIN:
                      case ae.REVOKE:
                      case ae.READED:
                        break;

                      case ae.CUSTOM:
                        a.MsgSeq = o.MsgSeq, a.UserDefinedField = r.UserDefinedField;
                        break;

                      default:
                        Se.error("未知群系统消息类型：reportType=" + i);
                    }
                    if (t) i == ae.JOIN_GROUP_REQUEST && d[i] && d[i](a); else if (d[i]) if (i == ae.READED) for (var u = a.groupReportTypeMsg.GroupReadInfoArray, c = 0, l = u.length; c < l; c++) {
                        var p = u[c];
                        d[i](p);
                    } else d[i](a);
                }
            }, b = function(e, t) {
                var n, o, r;
                for (var i in e) {
                    switch (o = (n = e[i]).PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > g && (g = n.NoticeSeq), 
                    r = {
                        Type: o
                    }, o) {
                      case ue.FRIEND_ADD:
                        r.Accounts = n.FriendAdd_Account;
                        break;

                      case ue.FRIEND_DELETE:
                        r.Accounts = n.FriendDel_Account;
                        break;

                      case ue.PENDENCY_ADD:
                        r.PendencyList = n.PendencyAdd;
                        break;

                      case ue.PENDENCY_DELETE:
                        r.Accounts = n.FrienPencydDel_Account;
                        break;

                      case ue.BLACK_LIST_ADD:
                        r.Accounts = n.BlackListAdd_Account;
                        break;

                      case ue.BLACK_LIST_DELETE:
                        r.Accounts = n.BlackListDel_Account;
                        break;

                      default:
                        Se.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(n));
                    }
                    t ? o == ue.PENDENCY_ADD && s[o] && s[o](r) : s[o] && s[o](r);
                }
            }, R = function(e, t) {
                var n, o, r;
                for (var i in e) {
                    switch (o = (n = e[i]).PushType, 0 == t && n.NoticeSeq && n.NoticeSeq > g && (g = n.NoticeSeq), 
                    r = {
                        Type: o
                    }, o) {
                      case ce:
                        r.Profile_Account = n.Profile_Account, r.ProfileList = n.ProfileList;
                        break;

                      default:
                        Se.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(n));
                    }
                    t ? o == ce && a[o] && a[o](r) : a[o] && a[o](r);
                }
            }, O = function(e) {
                var t = e.MsgBody, n = t.ReportType, o = (e.GroupInfo.To_Account, {
                    SrcFlag: 1,
                    ReportType: n,
                    GroupId: e.ToGroupId,
                    GroupName: e.GroupInfo.GroupName,
                    Operator_Account: t.Operator_Account,
                    MsgTime: e.MsgTimeStamp
                });
                switch (n) {
                  case ae.JOIN_GROUP_REQUEST:
                    o.RemarkInfo = t.RemarkInfo, o.MsgKey = t.MsgKey, o.Authentication = t.Authentication, 
                    o.UserDefinedField = e.UserDefinedField, o.From_Account = e.From_Account, o.MsgSeq = e.ClientSeq, 
                    o.MsgRandom = e.MsgRandom;
                    break;

                  case ae.JOIN_GROUP_ACCEPT:
                  case ae.JOIN_GROUP_REFUSE:
                    o.RemarkInfo = t.RemarkInfo;
                    break;

                  case ae.KICK:
                  case ae.DESTORY:
                  case ae.CREATE:
                  case ae.INVITED_JOIN_GROUP_REQUEST:
                  case ae.INVITED_JOIN_GROUP_REQUEST_AGREE:
                  case ae.QUIT:
                  case ae.SET_ADMIN:
                  case ae.CANCEL_ADMIN:
                  case ae.REVOKE:
                    break;

                  case ae.CUSTOM:
                    o.MsgSeq = e.MsgSeq, o.UserDefinedField = t.UserDefinedField;
                    break;

                  default:
                    Se.error("未知群系统消息类型：reportType=" + n);
                }
                d[n] && d[n](o);
            }, L = function(e) {
                for (var t = 0, n = e.length; t < n; t++) o(e[t]);
            }, o = function(e) {
                var t = e.SubMsgType;
                switch (t) {
                  case ee:
                    if (e.ReadC2cMsgNotify.UinPairReadArray && M[t]) for (var n = 0, o = e.ReadC2cMsgNotify.UinPairReadArray.length; n < o; n++) {
                        var r = e.ReadC2cMsgNotify.UinPairReadArray[n];
                        M[t](r);
                    }
                    break;

                  case te:
                    M[t] && M[t]();
                    break;

                  default:
                    Se.error("未知C2c系统消息：subType=" + t);
                }
            };
            this.longPolling = function(e, o) {
                var r = {
                    Timeout: me / 1e3,
                    Cookie: {
                        NotifySeq: i,
                        NoticeSeq: g
                    }
                };
                function t() {
                    var e, t, n;
                    e = r, t = function(e) {
                        for (var t in e.EventArray) {
                            var n = e.EventArray[t];
                            switch (n.Event) {
                              case H:
                                i = n.NotifySeq, Se.warn("longpolling: received new c2c msg"), Qe.syncMsgs();
                                break;

                              case V:
                                Se.warn("longpolling: received new group msgs"), F(n.Event, n.GroupMsgArray);
                                break;

                              case Y:
                              case Q:
                                Se.warn("longpolling: received new group tips"), F(n.Event, n.GroupTips);
                                break;

                              case X:
                                Se.warn("longpolling: received new group system msgs"), G(n.GroupTips, !1);
                                break;

                              case W:
                                Se.warn("longpolling: received new friend system notice"), b(n.FriendListMod, !1);
                                break;

                              case j:
                                Se.warn("longpolling: received new profile system notice"), R(n.ProfileDataMod, !1);
                                break;

                              case $:
                                g = n.C2cMsgArray[0].NoticeSeq, Se.warn("longpolling: received new c2c_common msg", g), 
                                v(n.Event, n.C2cMsgArray);
                                break;

                              case Z:
                                g = n.C2cNotifyMsgArray[0].NoticeSeq, Se.warn("longpolling: received new c2c_event msg"), 
                                L(n.C2cNotifyMsgArray);
                                break;

                              default:
                                Se.error("longpolling收到未知新消息类型: Event=" + n.Event);
                            }
                        }
                        P({
                            ActionStatus: K,
                            ErrorCode: 0
                        });
                    }, n = function(e) {
                        P(e), o && o(e);
                    }, (w || "undefined" == typeof stopPolling || 1 != stopPolling) && ve(n, !0) && ze.apiCall(k, "longpolling", e, t, n, me, !0);
                }
                Me ? (r.Cookie.LongPollingId = Me, t()) : Ke(0, function(e) {
                    Me = r.Cookie.LongPollingId = e.LongPollingId, me = 60 < e.Timeout ? me : 1e3 * e.Timeout, 
                    t();
                });
            }, this.bigGroupLongPolling = function(u, n) {
                var e, t, o, r;
                e = {
                    StartSeq: p,
                    HoldTime: f,
                    Key: m
                }, t = function(e) {
                    var t = [];
                    if (p = e.NextSeq, f = e.HoldTime, m = e.Key, e.RspMsgList && 0 < e.RspMsgList.length) {
                        for (var n, o, r, i = 0, s = e.RspMsgList.length - 1; 0 <= s; s--) if (!(n = e.RspMsgList[s]).IsPlaceMsg && n.From_Account && n.MsgBody && 0 != n.MsgBody.length) switch (o = n.Event) {
                          case V:
                            Se.info("bigGroupLongPolling: return new group msg"), (r = U(n, !1, !1)) && t.push(r), 
                            i += 1;
                            break;

                          case Y:
                          case Q:
                            Se.info("bigGroupLongPolling: return new group tip"), (r = U(n, !1, !1)) && t.push(r);
                            break;

                          case X:
                            Se.info("bigGroupLongPolling: new group system msg"), O(n);
                            break;

                          default:
                            Se.error("bigGroupLongPolling收到未知新消息类型: Event=" + o);
                        }
                        0 < i && (Qe.setBigGroupLongPollingMsgMap(n.ToGroupId, i), Se.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(I)));
                    }
                    ye = 0;
                    var a = {
                        ActionStatus: K,
                        ErrorCode: le.ON,
                        ErrorInfo: "connection is ok..."
                    };
                    ze.callBack(a), u ? u(t) : c && c(t), l && Qe.bigGroupLongPolling();
                }, o = function(e) {
                    if (e.ErrorCode != Ie && (Se.error(e.ErrorInfo), ye++), 91101 == e.ErrorCode && (Se.error("多实例登录，被kick"), 
                    _ && _()), ye < 10) l && Qe.bigGroupLongPolling(); else {
                        var t = {
                            ActionStatus: J,
                            ErrorCode: le.OFF,
                            ErrorInfo: "connection is off"
                        };
                        ze.callBack(t);
                    }
                    n && n(e);
                }, r = 1e3 * f, ze.apiCall(x, "get_msg", e, t, o, r);
            };
            var P = function(e) {
                if (0 == e.ErrorCode || e.ErrorCode == Ie) {
                    var t;
                    fe = 0;
                    var n = ge = !1;
                    switch (de) {
                      case le.INIT:
                        n = !0, de = le.ON, t = "create connection successfully(INIT->ON)";
                        break;

                      case le.ON:
                        t = "connection is on...(ON->ON)";
                        break;

                      case le.RECONNECT:
                        de = le.ON, t = "connection is on...(RECONNECT->ON)";
                        break;

                      case le.OFF:
                        n = !0, de = le.RECONNECT, t = "reconnect successfully(OFF->RECONNECT)";
                    }
                    var o = {
                        ActionStatus: K,
                        ErrorCode: de,
                        ErrorInfo: t
                    };
                    n && ze.callBack(o), u && Qe.longPolling();
                } else if (91101 == e.ErrorCode) Se.error("多实例登录，被kick"), _ && _(); else if (fe++, 
                Se.warn("longPolling接口第" + fe + "次报错: " + e.ErrorInfo), fe <= 10) setTimeout(D, 100); else {
                    var r = {
                        ActionStatus: J,
                        ErrorCode: de = le.OFF,
                        ErrorInfo: "connection is off"
                    };
                    0 == ge && ze.callBack(r), ge = !0, Se.warn("5000毫秒之后,SDK会发起新的longPolling请求..."), 
                    setTimeout(D, 5e3);
                }
            }, D = (v = function(e, t) {
                var n, o = [];
                for (var r in n = t) {
                    var i, s, a, u = n[r];
                    u.From_Account == Ee.identifier ? (i = !0, s = u.To_Account) : (i = !1, s = u.From_Account), 
                    a = "";
                    var c = Xe.sessByTypeId(B.C2C, s);
                    c || (c = new He(B.C2C, s, s, a, 0, 0));
                    var l = new Ye(c, i, u.MsgSeq, u.MsgRandom, u.MsgTimeStamp, u.From_Account), p = null, d = null, g = null;
                    for (var f in u.MsgBody) {
                        switch (g = (p = u.MsgBody[f]).MsgType) {
                          case z.TEXT:
                            d = new Ye.Elem.Text(p.MsgContent.Text);
                            break;

                          case z.FACE:
                            d = new Ye.Elem.Face(p.MsgContent.Index, p.MsgContent.Data);
                            break;

                          case z.IMAGE:
                            for (var m in d = new Ye.Elem.Images(p.MsgContent.UUID, p.MsgContent.ImageFormat || ""), 
                            p.MsgContent.ImageInfoArray) {
                                var I = p.MsgContent.ImageInfoArray[m];
                                d.addImage(new Ye.Elem.Images.Image(I.Type, I.Size, I.Width, I.Height, I.URL));
                            }
                            break;

                          case z.SOUND:
                            p.MsgContent ? d = new Ye.Elem.Sound(p.MsgContent.UUID, p.MsgContent.Second, p.MsgContent.Size, u.From_Account, u.To_Account, p.MsgContent.Download_Flag, B.C2C) : (g = z.TEXT, 
                            d = new Ye.Elem.Text("[语音消息]下载地址解析出错"));
                            break;

                          case z.LOCATION:
                            d = new Ye.Elem.Location(p.MsgContent.Longitude, p.MsgContent.Latitude, p.MsgContent.Desc);
                            break;

                          case z.FILE:
                          case z.FILE + " ":
                            g = z.FILE, p.MsgContent ? d = new Ye.Elem.File(p.MsgContent.UUID, p.MsgContent.FileName, p.MsgContent.FileSize, u.From_Account, u.To_Account, p.MsgContent.Download_Flag, B.C2C) : (g = z.TEXT, 
                            d = new Ye.Elem.Text("[文件消息下载地址解析出错]"));
                            break;

                          case z.CUSTOM:
                            try {
                                var M = JSON.parse(p.MsgContent.Data);
                                if (M && M.userAction && M.userAction == pe) continue;
                            } catch (e) {}
                            g = z.CUSTOM, d = new Ye.Elem.Custom(p.MsgContent.Data, p.MsgContent.Desc, p.MsgContent.Ext);
                            break;

                          default:
                            g = z.TEXT, d = new Ye.Elem.Text("web端暂不支持" + p.MsgType + "消息");
                        }
                        l.elems.push(new Ye.Elem(g, d));
                    }
                    0 < l.elems.length && Xe.addMsg(l) && o.push(l);
                }
                0 < o.length && Xe.updateTimeline(), 0 < o.length && y && y(o);
            }, function() {
                u && Qe.longPolling();
            });
            this.syncMsgs = function(m, t) {
                var I = [], M = [];
                !function n(e, t, o, r) {
                    ve(r, !0) && ze.apiCall(k, "getmsg", {
                        Cookie: e,
                        SyncFlag: t
                    }, function(e) {
                        if (e.MsgList && e.MsgList.length) for (var t in e.MsgList) Te.push(e.MsgList[t]);
                        1 == e.SyncFlag ? n(e.Cookie, e.SyncFlag, o, r) : (e.MsgList = Te, Te = [], o && o(e));
                    }, r);
                }(Xe.cookie, Xe.syncFlag, function(e) {
                    for (var t in 2 == e.SyncFlag && (Xe.syncFlag = 0), M = e.MsgList, Xe.cookie = e.Cookie, 
                    M) {
                        var n, o, r, i = M[t];
                        i.From_Account == Ee.identifier ? (n = !0, o = i.To_Account) : (n = !1, o = i.From_Account), 
                        r = "";
                        var s = Xe.sessByTypeId(B.C2C, o);
                        s || (s = new He(B.C2C, o, o, r, 0, 0));
                        var a = new Ye(s, n, i.MsgSeq, i.MsgRandom, i.MsgTimeStamp, i.From_Account), u = null, c = null, l = null;
                        for (var p in i.MsgBody) {
                            switch (l = (u = i.MsgBody[p]).MsgType) {
                              case z.TEXT:
                                c = new Ye.Elem.Text(u.MsgContent.Text);
                                break;

                              case z.FACE:
                                c = new Ye.Elem.Face(u.MsgContent.Index, u.MsgContent.Data);
                                break;

                              case z.IMAGE:
                                for (var d in c = new Ye.Elem.Images(u.MsgContent.UUID, u.MsgContent.ImageFormat), 
                                u.MsgContent.ImageInfoArray) {
                                    var g = u.MsgContent.ImageInfoArray[d];
                                    c.addImage(new Ye.Elem.Images.Image(g.Type, g.Size, g.Width, g.Height, g.URL));
                                }
                                break;

                              case z.SOUND:
                                u.MsgContent ? c = new Ye.Elem.Sound(u.MsgContent.UUID, u.MsgContent.Second, u.MsgContent.Size, i.From_Account, i.To_Account, u.MsgContent.Download_Flag, B.C2C) : (l = z.TEXT, 
                                c = new Ye.Elem.Text("[语音消息]下载地址解析出错"));
                                break;

                              case z.LOCATION:
                                c = new Ye.Elem.Location(u.MsgContent.Longitude, u.MsgContent.Latitude, u.MsgContent.Desc);
                                break;

                              case z.FILE:
                              case z.FILE + " ":
                                l = z.FILE, u.MsgContent ? c = new Ye.Elem.File(u.MsgContent.UUID, u.MsgContent.FileName, u.MsgContent.FileSize, i.From_Account, i.To_Account, u.MsgContent.Download_Flag, B.C2C) : (l = z.TEXT, 
                                c = new Ye.Elem.Text("[文件消息下载地址解析出错]"));
                                break;

                              case z.CUSTOM:
                                try {
                                    var f = JSON.parse(u.MsgContent.Data);
                                    if (f && f.userAction && f.userAction == pe) continue;
                                } catch (e) {}
                                l = z.CUSTOM, c = new Ye.Elem.Custom(u.MsgContent.Data, u.MsgContent.Desc, u.MsgContent.Ext);
                                break;

                              default:
                                l = z.TEXT, c = new Ye.Elem.Text("web端暂不支持" + u.MsgType + "消息");
                            }
                            a.elems.push(new Ye.Elem(l, c));
                        }
                        0 < a.elems.length && Xe.addMsg(a) && I.push(a);
                    }
                    !function(e) {
                        for (var t in e) {
                            var n = e[t];
                            switch (G(n.GroupTips, !0), n.Event) {
                              case X:
                                Se.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg"), G(n.GroupTips, !0);
                                break;

                              default:
                                Se.error("syncMsgs收到未知的群系统消息类型: Event=" + n.Event);
                            }
                        }
                    }(e.EventArray), 0 < I.length && Xe.updateTimeline(), m ? m(I) : 0 < I.length && y && y(I);
                }, function(e) {
                    Se.error("getMsgs failed:" + e.ErrorInfo), t && t(e);
                });
            }, this.getC2CHistoryMsgs = function(m, I, t) {
                if (m.Peer_Account || !t) if (m.MaxCnt || (m.MaxCnt = 15), m.MaxCnt <= 0 && t) t(Ae.getReturnError("MaxCnt should be greater than 0", -14)); else {
                    if (15 < m.MaxCnt) return t ? void t(Ae.getReturnError("MaxCnt can not be greater than 15", -15)) : void 0;
                    null != m.MsgKey && void 0 !== m.MsgKey || (m.MsgKey = ""), function u(c, l, p) {
                        ve(p, !0) && ze.apiCall(k, "getroammsg", c, function(e) {
                            var t = c.MaxCnt, n = e.Complete, o = e.MaxCnt, r = e.MsgKey, i = e.LastMsgTime;
                            if (e.MsgList && e.MsgList.length) for (var s in e.MsgList) Ce.push(e.MsgList[s]);
                            var a = null;
                            0 == n && o < t && (a = {
                                Peer_Account: c.Peer_Account,
                                MaxCnt: t - o,
                                LastMsgTime: i,
                                MsgKey: r
                            }), a ? u(a, l, p) : (e.MsgList = Ce, Ce = [], l && l(e));
                        }, p);
                    }({
                        Peer_Account: m.Peer_Account,
                        MaxCnt: m.MaxCnt,
                        LastMsgTime: m.LastMsgTime,
                        MsgKey: m.MsgKey
                    }, function(e) {
                        var t, n = [];
                        t = e.MsgList;
                        var o = Xe.sessByTypeId(B.C2C, m.Peer_Account);
                        for (var r in o || (o = new He(B.C2C, m.Peer_Account, m.Peer_Account, "", 0, 0)), 
                        t) {
                            var i, s = t[r];
                            s.From_Account == Ee.identifier ? (i = !0, s.To_Account) : (i = !1, s.From_Account), 
                            "";
                            var a = new Ye(o, i, s.MsgSeq, s.MsgRandom, s.MsgTimeStamp, s.From_Account), u = null, c = null, l = null;
                            for (var p in s.MsgBody) {
                                switch (l = (u = s.MsgBody[p]).MsgType) {
                                  case z.TEXT:
                                    c = new Ye.Elem.Text(u.MsgContent.Text);
                                    break;

                                  case z.FACE:
                                    c = new Ye.Elem.Face(u.MsgContent.Index, u.MsgContent.Data);
                                    break;

                                  case z.IMAGE:
                                    for (var d in c = new Ye.Elem.Images(u.MsgContent.UUID, u.MsgContent.ImageFormat), 
                                    u.MsgContent.ImageInfoArray) {
                                        var g = u.MsgContent.ImageInfoArray[d];
                                        c.addImage(new Ye.Elem.Images.Image(g.Type, g.Size, g.Width, g.Height, g.URL));
                                    }
                                    break;

                                  case z.SOUND:
                                    u.MsgContent ? c = new Ye.Elem.Sound(u.MsgContent.UUID, u.MsgContent.Second, u.MsgContent.Size, s.From_Account, s.To_Account, u.MsgContent.Download_Flag, B.C2C) : (l = z.TEXT, 
                                    c = new Ye.Elem.Text("[语音消息]下载地址解析出错"));
                                    break;

                                  case z.LOCATION:
                                    c = new Ye.Elem.Location(u.MsgContent.Longitude, u.MsgContent.Latitude, u.MsgContent.Desc);
                                    break;

                                  case z.FILE:
                                  case z.FILE + " ":
                                    l = z.FILE, u.MsgContent ? c = new Ye.Elem.File(u.MsgContent.UUID, u.MsgContent.FileName, u.MsgContent.FileSize, s.From_Account, s.To_Account, u.MsgContent.Download_Flag, B.C2C) : (l = z.TEXT, 
                                    c = new Ye.Elem.Text("[文件消息下载地址解析出错]"));
                                    break;

                                  case z.CUSTOM:
                                    l = z.CUSTOM, c = new Ye.Elem.Custom(u.MsgContent.Data, u.MsgContent.Desc, u.MsgContent.Ext);
                                    break;

                                  default:
                                    l = z.TEXT, c = new Ye.Elem.Text("web端暂不支持" + u.MsgType + "消息");
                                }
                                a.elems.push(new Ye.Elem(l, c));
                            }
                            Xe.addMsg(a), n.push(a);
                        }
                        if (Xe.updateTimeline(), I) {
                            var f = {
                                Complete: e.Complete,
                                MsgCount: n.length,
                                LastMsgTime: e.LastMsgTime,
                                MsgKey: e.MsgKey,
                                MsgList: n
                            };
                            o.isFinished(e.Complete), I(f);
                        }
                    }, function(e) {
                        Se.error("getC2CHistoryMsgs failed:" + e.ErrorInfo), t && t(e);
                    });
                } else t(Ae.getReturnError("Peer_Account is empty", -13));
            }, this.syncGroupMsgs = function(e, a, t) {
                if (e.ReqMsgSeq <= 0) {
                    if (t) {
                        var n = Ae.getReturnError("ReqMsgSeq must be greater than 0", -16);
                        t(n);
                    }
                } else {
                    var o, r, i, s = {
                        GroupId: e.GroupId,
                        ReqMsgSeq: e.ReqMsgSeq,
                        ReqMsgNumber: e.ReqMsgNumber
                    };
                    o = s, r = function(e) {
                        var t = [], n = (e.GroupId, e.RspMsgList), o = e.IsFinished;
                        if (null != n && void 0 !== n) {
                            for (var r = n.length - 1; 0 <= r; r--) {
                                var i = n[r];
                                if (!i.IsPlaceMsg && i.From_Account && i.MsgBody && 0 != i.MsgBody.length) {
                                    var s = U(i, !0, !0, o);
                                    s && t.push(s);
                                }
                            }
                            0 < t.length && Xe.updateTimeline(), a ? a(t) : 0 < t.length && y && y(t);
                        } else a && a([]);
                    }, ve(i = function(e) {
                        Se.error("getGroupMsgs failed:" + e.ErrorInfo), t && t(e);
                    }, !0) && ze.apiCall(q, "group_msg_get", {
                        GroupId: o.GroupId,
                        ReqMsgSeq: o.ReqMsgSeq,
                        ReqMsgNumber: o.ReqMsgNumber
                    }, r, i);
                }
            };
            var U = function(e, t, n, o) {
                if (e.IsPlaceMsg || !e.From_Account || !e.MsgBody || 0 == e.MsgBody.length) return null;
                var r, i, s, a, u = e.ToGroupId, c = u;
                e.GroupInfo && e.GroupInfo.GroupName && (c = e.GroupInfo.GroupName), s = e.From_Account, 
                e.GroupInfo && (e.GroupInfo.From_AccountNick && (s = e.GroupInfo.From_AccountNick), 
                a = e.GroupInfo.From_AccountHeadurl ? e.GroupInfo.From_AccountHeadurl : null), r = e.From_Account == Ee.identifier, 
                e.From_Account, i = "";
                var l = Xe.sessByTypeId(B.GROUP, u);
                l || (l = new He(B.GROUP, u, c, i, 0, 0)), void 0 !== o && l.isFinished(o || 0);
                var p = ne.COMMON;
                if (Y == e.Event || Q == e.Event) {
                    p = ne.TIP;
                    var d = e.MsgBody;
                    e.MsgBody = [], e.MsgBody.push({
                        MsgType: z.GROUP_TIP,
                        MsgContent: d
                    });
                } else e.MsgPriority && (e.MsgPriority == oe ? p = ne.REDPACKET : e.MsgPriority == re && (p = ne.LOVEMSG));
                var g = new Ye(l, r, e.MsgSeq, e.MsgRandom, e.MsgTimeStamp, e.From_Account, p, s, a), f = null, m = null, I = null;
                for (var M in e.MsgBody) {
                    switch (I = (f = e.MsgBody[M]).MsgType) {
                      case z.TEXT:
                        m = new Ye.Elem.Text(f.MsgContent.Text);
                        break;

                      case z.FACE:
                        m = new Ye.Elem.Face(f.MsgContent.Index, f.MsgContent.Data);
                        break;

                      case z.IMAGE:
                        for (var y in m = new Ye.Elem.Images(f.MsgContent.UUID, f.MsgContent.ImageFormat || ""), 
                        f.MsgContent.ImageInfoArray) m.addImage(new Ye.Elem.Images.Image(f.MsgContent.ImageInfoArray[y].Type, f.MsgContent.ImageInfoArray[y].Size, f.MsgContent.ImageInfoArray[y].Width, f.MsgContent.ImageInfoArray[y].Height, f.MsgContent.ImageInfoArray[y].URL));
                        break;

                      case z.SOUND:
                        f.MsgContent ? m = new Ye.Elem.Sound(f.MsgContent.UUID, f.MsgContent.Second, f.MsgContent.Size, e.From_Account, e.To_Account, f.MsgContent.Download_Flag, B.GROUP) : (I = z.TEXT, 
                        m = new Ye.Elem.Text("[语音消息]下载地址解析出错"));
                        break;

                      case z.LOCATION:
                        m = new Ye.Elem.Location(f.MsgContent.Longitude, f.MsgContent.Latitude, f.MsgContent.Desc);
                        break;

                      case z.FILE:
                      case z.FILE + " ":
                        I = z.FILE;
                        be(f.MsgContent.UUID, e.From_Account, f.MsgContent.FileName);
                        f.MsgContent ? m = new Ye.Elem.File(f.MsgContent.UUID, f.MsgContent.FileName, f.MsgContent.FileSize, e.From_Account, e.To_Account, f.MsgContent.Download_Flag, B.GROUP) : (I = z.TEXT, 
                        m = new Ye.Elem.Text("[文件消息]地址解析出错"));
                        break;

                      case z.GROUP_TIP:
                        var _ = f.MsgContent.OpType;
                        if (m = new Ye.Elem.GroupTip(_, f.MsgContent.Operator_Account, u, e.GroupInfo.GroupName, f.MsgContent.List_Account), 
                        ie.JOIN == _ || ie.QUIT == _) m.setGroupMemberNum(f.MsgContent.MemberNum); else if (ie.MODIFY_GROUP_INFO == _) {
                            var h = !1, E = {
                                GroupId: u,
                                GroupFaceUrl: null,
                                GroupName: null,
                                OwnerAccount: null,
                                GroupNotification: null,
                                GroupIntroduction: null
                            }, T = f.MsgContent.MsgGroupNewInfo;
                            if (T.GroupFaceUrl) {
                                var C = new Ye.Elem.GroupTip.GroupInfo(se.FACE_URL, T.GroupFaceUrl);
                                m.addGroupInfo(C), h = !0, E.GroupFaceUrl = T.GroupFaceUrl;
                            }
                            if (T.GroupName) {
                                var A = new Ye.Elem.GroupTip.GroupInfo(se.NAME, T.GroupName);
                                m.addGroupInfo(A), h = !0, E.GroupName = T.GroupName;
                            }
                            if (T.Owner_Account) {
                                var S = new Ye.Elem.GroupTip.GroupInfo(se.OWNER, T.Owner_Account);
                                m.addGroupInfo(S), h = !0, E.OwnerAccount = T.Owner_Account;
                            }
                            if (T.GroupNotification) {
                                var v = new Ye.Elem.GroupTip.GroupInfo(se.NOTIFICATION, T.GroupNotification);
                                m.addGroupInfo(v), h = !0, E.GroupNotification = T.GroupNotification;
                            }
                            if (T.GroupIntroduction) {
                                var F = new Ye.Elem.GroupTip.GroupInfo(se.INTRODUCTION, T.GroupIntroduction);
                                m.addGroupInfo(F), h = !0, E.GroupIntroduction = T.GroupIntroduction;
                            }
                            0 == t && h && N && N(E);
                        } else if (ie.MODIFY_MEMBER_INFO == _) {
                            var G = f.MsgContent.MsgMemberInfo;
                            for (var b in G) {
                                var R = G[b];
                                m.addMemberInfo(new Ye.Elem.GroupTip.MemberInfo(R.User_Account, R.ShutupTime));
                            }
                        }
                        break;

                      case z.CUSTOM:
                        I = z.CUSTOM, m = new Ye.Elem.Custom(f.MsgContent.Data, f.MsgContent.Desc, f.MsgContent.Ext);
                        break;

                      default:
                        I = z.TEXT, m = new Ye.Elem.Text("web端暂不支持" + f.MsgType + "消息");
                    }
                    g.elems.push(new Ye.Elem(I, m));
                }
                return 0 == n ? g : Xe.addMsg(g) ? g : null;
            };
            this.init = function(e, t, n) {
                var r, o, i;
                (e.onMsgNotify || Se.warn("listeners.onMsgNotify is empty"), y = e.onMsgNotify, 
                e.onBigGroupMsgNotify ? c = e.onBigGroupMsgNotify : Se.warn("listeners.onBigGroupMsgNotify is empty"), 
                e.onC2cEventNotifys ? M = e.onC2cEventNotifys : Se.warn("listeners.onC2cEventNotifys is empty"), 
                e.onGroupSystemNotifys ? d = e.onGroupSystemNotifys : Se.warn("listeners.onGroupSystemNotifys is empty"), 
                e.onGroupInfoChangeNotify ? N = e.onGroupInfoChangeNotify : Se.warn("listeners.onGroupInfoChangeNotify is empty"), 
                e.onFriendSystemNotifys ? s = e.onFriendSystemNotifys : Se.warn("listeners.onFriendSystemNotifys is empty"), 
                e.onProfileSystemNotifys ? a = e.onProfileSystemNotifys : Se.warn("listeners.onProfileSystemNotifys is empty"), 
                e.onKickedEventCall ? _ = e.onKickedEventCall : Se.warn("listeners.onKickedEventCall is empty"), 
                e.onAppliedDownloadUrl ? e.onAppliedDownloadUrl : Se.warn("listeners.onAppliedDownloadUrl is empty"), 
                Ee.identifier && Ee.userSig) ? (r = function(e) {
                    Se.info("initMyGroupMaxSeqs success"), T(function(e) {
                        (Se.info("initIpAndAuthkey success"), t) && (Se.info("login success(have login state))"), 
                        t({
                            ActionStatus: K,
                            ErrorCode: 0,
                            ErrorInfo: "login success"
                        }));
                        Qe.setLongPollingOn(!0), u && Qe.longPolling(t);
                    }, n);
                }, o = n, i = {
                    Member_Account: Ee.identifier,
                    Limit: 1e3,
                    Offset: 0,
                    GroupBaseInfoFilter: [ "NextMsgSeq" ]
                }, Ue(i, function(e) {
                    if (!e.GroupIdList || 0 == e.GroupIdList.length) return Se.info("initMyGroupMaxSeqs: 目前还没有加入任何群组"), 
                    void (r && r(e));
                    for (var t = 0; t < e.GroupIdList.length; t++) {
                        var n = e.GroupIdList[t].GroupId, o = e.GroupIdList[t].NextMsgSeq - 1;
                        h[n] = o;
                    }
                    r && r(e);
                }, function(e) {
                    Se.error("initMyGroupMaxSeqs failed:" + e.ErrorInfo), o && o(e);
                })) : t && t({
                    ActionStatus: K,
                    ErrorCode: 0,
                    ErrorInfo: "login success(no login state)"
                });
            }, this.sendMsg = function(o, r, i) {
                !function(e, t, n) {
                    if (ve(n, !0)) {
                        var o = null;
                        switch (e.sess.type()) {
                          case B.C2C:
                            o = {
                                From_Account: Ee.identifier,
                                To_Account: e.sess.id().toString(),
                                MsgTimeStamp: e.time,
                                MsgSeq: e.seq,
                                MsgRandom: e.random,
                                MsgBody: []
                            };
                            break;

                          case B.GROUP:
                            var r = e.getSubType();
                            switch (o = {
                                GroupId: e.sess.id().toString(),
                                From_Account: Ee.identifier,
                                Random: e.random,
                                MsgBody: []
                            }, r) {
                              case ne.COMMON:
                                o.MsgPriority = "COMMON";
                                break;

                              case ne.REDPACKET:
                                o.MsgPriority = "REDPACKET";
                                break;

                              case ne.LOVEMSG:
                                o.MsgPriority = "LOVEMSG";
                                break;

                              case ne.TIP:
                                Se.error("不能主动发送群提示消息,subType=" + r);
                                break;

                              default:
                                return Se.error("发送群消息时，出现未知子消息类型：subType=" + r);
                            }
                        }
                        for (var i in e.elems) {
                            var s = e.elems[i], a = null, u = s.type;
                            switch (u) {
                              case z.TEXT:
                                a = {
                                    Text: s.content.text
                                };
                                break;

                              case z.FACE:
                                a = {
                                    Index: s.content.index,
                                    Data: s.content.data
                                };
                                break;

                              case z.IMAGE:
                                var c = [];
                                for (var l in s.content.ImageInfoArray) c.push({
                                    Type: s.content.ImageInfoArray[l].type,
                                    Size: s.content.ImageInfoArray[l].size,
                                    Width: s.content.ImageInfoArray[l].width,
                                    Height: s.content.ImageInfoArray[l].height,
                                    URL: s.content.ImageInfoArray[l].url
                                });
                                a = {
                                    ImageFormat: s.content.ImageFormat,
                                    UUID: s.content.UUID,
                                    ImageInfoArray: c
                                };
                                break;

                              case z.SOUND:
                                Se.warn("web端暂不支持发送语音消息");
                                continue;

                              case z.LOCATION:
                                Se.warn("web端暂不支持发送地理位置消息");
                                continue;

                              case z.FILE:
                                a = {
                                    UUID: s.content.uuid,
                                    FileName: s.content.name,
                                    FileSize: s.content.size,
                                    DownloadFlag: s.content.downFlag
                                };
                                break;

                              case z.CUSTOM:
                                a = {
                                    Data: s.content.data,
                                    Desc: s.content.desc,
                                    Ext: s.content.ext
                                }, u = z.CUSTOM;
                                break;

                              default:
                                Se.warn("web端暂不支持发送" + s.type + "消息");
                                continue;
                            }
                            e.PushInfoBoolean && (o.OfflinePushInfo = e.PushInfo), o.MsgBody.push({
                                MsgType: u,
                                MsgContent: a
                            });
                        }
                        e.sess.type() == B.C2C ? ze.apiCall(k, "sendmsg", o, t, n) : e.sess.type() == B.GROUP && ze.apiCall(q, "send_group_msg", o, t, n);
                    }
                }(o, function(e) {
                    if (o.sess.type() == B.C2C) {
                        if (!Xe.addMsg(o)) {
                            var t = "sendMsg: addMsg failed!", n = Ae.getReturnError(t, -17);
                            return Se.error(t), void (i && i(n));
                        }
                        Xe.updateTimeline();
                    }
                    r && r(e);
                }, function(e) {
                    i && i(e);
                });
            };
        }(), We = new function() {
            this.fileMd5 = null;
            this.submitUploadFileForm = function(e, n, o) {
                var t, r, i = e.formId, s = e.fileId, a = "uploadResultIframe_" + C++, u = e.To_Account, c = e.businessType, l = document.getElementById(i);
                if (!l) return t = "获取表单对象为空: formId=" + i + "(formId非法)", r = Ae.getReturnError(t, -20), 
                void (o && o(r));
                var p = document.getElementById(s);
                if (!p) return t = "获取文件对象为空: fileId=" + s + "(没有选择文件或者fileId非法)", r = Ae.getReturnError(t, -21), 
                void (o && o(r));
                p.name = "file";
                var d = document.createElement("iframe");
                d.name = a, d.id = a, d.style.display = "none", document.body.appendChild(d);
                var g = "https://pic.tim.qq.com/v4/openpic/" + (Fe() ? "pic_up" : "pic_up_test") + "?tinyid=" + Ee.tinyid + "&a2=" + Ee.a2 + "&sdkappid=" + Ee.sdkAppID + "&accounttype=" + Ee.accountType + "&contenttype=http";
                function f(e, t) {
                    var n = document.createElement("input");
                    n.type = "hidden", n.name = e, n.value = t, l.appendChild(n);
                }
                l.action = g, l.method = "post", l.target = a, f("App_Version", E.APP_VERSION), 
                f("From_Account", Ee.identifier), f("To_Account", u), f("Seq", L().toString()), 
                f("Timestamp", O().toString()), f("Random", P().toString()), f("Busi_Id", c), f("PkgFlag", M.RAW_DATA.toString()), 
                f("Auth_Key", he), f("Server_Ver", E.SERVER_VERSION.toString()), f("File_Type", e.fileType), 
                setTimeout(function e() {
                    var t;
                    try {
                        t = JSON.parse(d.contentWindow.name) || {};
                    } catch (e) {
                        t = {};
                    }
                    t.ActionStatus ? (d.src = "about:blank", d.parentNode.removeChild(d), d = null, 
                    t.ActionStatus == K ? n && n(t) : o && o(t)) : setTimeout(e, 100);
                }, 500), l.submit();
            }, this.uploadFile = function(t, n, o) {
                var s = {
                    init: function(e, t, n) {
                        var o = this;
                        o.file = e.file, o.onProgressCallBack = e.onProgressCallBack, e.abortButton && (e.abortButton.onclick = o.abortHandler), 
                        o.total = o.file.size, o.loaded = 0, o.step = 1105920, o.sliceSize = 0, o.sliceOffset = 0, 
                        o.timestamp = O(), o.seq = L(), o.random = P(), o.fromAccount = Ee.identifier, o.toAccount = e.To_Account, 
                        o.fileMd5 = e.fileMd5, o.businessType = e.businessType, o.fileType = e.fileType, 
                        o.cbOk = t, o.cbErr = n, o.reader = new FileReader(), o.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice, 
                        o.reader.onloadstart = o.onLoadStart, o.reader.onprogress = o.onProgress, o.reader.onabort = o.onAbort, 
                        o.reader.onerror = o.onerror, o.reader.onload = o.onLoad, o.reader.onloadend = o.onLoadEnd;
                    },
                    upload: function() {
                        s.readBlob(0);
                    },
                    onLoadStart: function() {},
                    onProgress: function(e) {
                        var t = s;
                        t.loaded += e.loaded, t.onProgressCallBack && t.onProgressCallBack(t.loaded, t.total);
                    },
                    onAbort: function() {},
                    onError: function() {},
                    onLoad: function(e) {
                        var n = s;
                        if (e.target.readyState == FileReader.DONE) {
                            var t = e.target.result, o = t.indexOf(",");
                            -1 != o && (t = t.substr(o + 1));
                            var r = {
                                From_Account: n.fromAccount,
                                To_Account: n.toAccount,
                                Busi_Id: n.businessType,
                                File_Type: n.fileType,
                                File_Str_Md5: n.fileMd5,
                                PkgFlag: M.BASE64_DATA,
                                File_Size: n.total,
                                Slice_Offset: n.sliceOffset,
                                Slice_Size: n.sliceSize,
                                Slice_Data: t,
                                Seq: n.seq,
                                Timestamp: n.timestamp,
                                Random: n.random
                            }, i = function(e) {
                                if (0 == e.IsFinish) n.loaded = e.Next_Offset, n.loaded < n.total ? n.readBlob(n.loaded) : n.loaded = n.total; else if (n.cbOk) {
                                    var t = {
                                        ActionStatus: e.ActionStatus,
                                        ErrorCode: e.ErrorCode,
                                        ErrorInfo: e.ErrorInfo,
                                        File_UUID: e.File_UUID,
                                        File_Size: e.Next_Offset,
                                        URL_INFO: e.URL_INFO,
                                        Download_Flag: e.Download_Flag
                                    };
                                    n.fileType == h.FILE && (t.URL_INFO = be(e.File_UUID, Ee.identifier, n.file.name)), 
                                    n.cbOk(t);
                                }
                                T = 0;
                            };
                            xe(r, i, function e(t) {
                                T < 20 ? (T++, setTimeout(function() {
                                    xe(r, i, e);
                                }, 1e3)) : n.cbErr(t);
                            });
                        }
                    },
                    onLoadEnd: function() {},
                    readBlob: function(e) {
                        var t, n = s, o = n.file, r = e + n.step;
                        r > n.total ? (r = n.total, n.sliceSize = r - e) : n.sliceSize = n.step, n.sliceOffset = e, 
                        t = n.blobSlice.call(o, e, r), n.reader.readAsDataURL(t);
                    },
                    abortHandler: function() {
                        var e = s;
                        e.reader && e.reader.abort();
                    }
                };
                !function(o, i, t) {
                    var r = null;
                    try {
                        r = new FileReader();
                    } catch (e) {
                        if (t) return t(Ae.getReturnError("当前浏览器不支持FileReader", -18));
                    }
                    var s = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
                    if (s || !t) {
                        var a = 2097152, u = Math.ceil(o.size / a), c = 0, l = new SparkMD5();
                        r.onload = function(e) {
                            for (var t = "", n = new Uint8Array(e.target.result), o = n.byteLength, r = 0; r < o; r++) t += String.fromCharCode(n[r]);
                            l.appendBinary(t), ++c < u ? p() : (this.fileMd5 = l.end(), i && i(this.fileMd5));
                        }, p();
                    } else t(Ae.getReturnError("当前浏览器不支持FileAPI", -19));
                    function p() {
                        var e = c * a, t = e + a >= o.size ? o.size : e + a, n = s.call(o, e, t);
                        r.readAsArrayBuffer(n);
                    }
                }(t.file, function(e) {
                    Se.info("fileMd5: " + e), t.fileMd5 = e, s.init(t, n, o), s.upload();
                }, o);
            };
        }();
        t.SESSION_TYPE = B, t.MSG_MAX_LENGTH = {
            C2C: 12e3,
            GROUP: 8898
        }, t.C2C_MSG_SUB_TYPE = {
            COMMON: 0
        }, t.GROUP_MSG_SUB_TYPE = ne, t.MSG_ELEMENT_TYPE = z, t.GROUP_TIP_TYPE = ie, t.IMAGE_TYPE = r, 
        t.GROUP_SYSTEM_TYPE = ae, t.FRIEND_NOTICE_TYPE = ue, t.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = se, 
        t.BROWSER_INFO = e, t.Emotions = t.EmotionPicData = N, t.EmotionDataIndexs = t.EmotionPicDataIndex = R, 
        t.TLS_ERROR_CODE = {
            OK: 0,
            SIGNATURE_EXPIRATION: 11
        }, t.CONNECTION_STATUS = le, t.UPLOAD_PIC_BUSSINESS_TYPE = {
            GROUP_MSG: 1,
            C2C_MSG: 2,
            USER_HEAD: 3,
            GROUP_HEAD: 4
        }, t.RECENT_CONTACT_TYPE = {
            C2C: 1,
            GROUP: 2
        }, t.UPLOAD_RES_TYPE = h, t.Tool = Ae, t.Log = Se, t.Msg = Ye, t.Session = He, t.MsgStore = {
            sessMap: function() {
                return Xe.sessMap();
            },
            sessCount: function() {
                return Xe.sessCount();
            },
            sessByTypeId: function(e, t) {
                return Xe.sessByTypeId(e, t);
            },
            delSessByTypeId: function(e, t) {
                return Xe.delSessByTypeId(e, t);
            },
            resetCookieAndSyncFlag: function() {
                return Xe.resetCookieAndSyncFlag();
            }
        }, t.Resources = b, t.login = t.init = function(e, t, n, o, r) {
            var i, s, a, u, c;
            ze.init(t.onConnNotify, o, r), t.jsonpCallback && t.jsonpCallback, i = e, s = t, 
            a = n, u = o, c = r, Ne(), a && (A = a), 0 == A.isAccessFormalEnv && (w = A.isAccessFormalEnv), 
            0 == A.isLogOn && Se.setOn(A.isLogOn), i || !c ? i.sdkAppID || !c ? (i.identifier && (Ee.identifier = i.identifier.toString()), 
            i.identifier && !i.userSig && c ? c(Ae.getReturnError("loginInfo.userSig is empty", -9)) : (i.userSig && (Ee.userSig = i.userSig.toString()), 
            Ee.sdkAppID = i.sdkAppID, Ee.accountType = i.accountType, Ee.identifier && Ee.userSig ? Le(function(t, n) {
                Qe.init(s, function(e) {
                    u && (e.identifierNick = t, e.headurl = n, u(e));
                }, c);
            }, c) : Qe.init(s, u, c))) : c(Ae.getReturnError("loginInfo.sdkAppID is empty", -7)) : c(Ae.getReturnError("loginInfo is empty", -6));
        }, t.logout = t.offline = function(e, t) {
            return Pe("instance", e, t);
        }, t.logoutAll = function(e, t) {
            return Pe("all", e, t);
        }, t.sendMsg = function(e, t, n) {
            return Qe.sendMsg(e, t, n);
        }, t.syncMsgs = function(e, t) {
            return Qe.syncMsgs(e, t);
        }, t.getC2CHistoryMsgs = function(e, t, n) {
            return Qe.getC2CHistoryMsgs(e, t, n);
        }, t.syncGroupMsgs = function(e, t, n) {
            return Qe.syncGroupMsgs(e, t, n);
        }, t.c2CMsgReaded = function(e, t, n) {
            return Xe.c2CMsgReaded(e, t, n);
        }, t.groupMsgReaded = function(e, t, n) {
            return we(e, t, n);
        }, t.setAutoRead = function(e, t, n) {
            return Xe.setAutoRead(e, t, n);
        }, t.createGroup = function(e, t, n) {
            return function(e, t, n) {
                if (ve(n, !0)) {
                    for (var o = {
                        Type: e.Type,
                        Name: e.Name
                    }, r = [], i = 0; i < e.MemberList.length; i++) r.push({
                        Member_Account: e.MemberList[i]
                    });
                    o.MemberList = r, e.GroupId && (o.GroupId = e.GroupId), e.Owner_Account && (o.Owner_Account = e.Owner_Account), 
                    e.Introduction && (o.Introduction = e.Introduction), e.Notification && (o.Notification = e.Notification), 
                    e.MaxMemberCount && (o.MaxMemberCount = e.MaxMemberCount), e.ApplyJoinOption && (o.ApplyJoinOption = e.ApplyJoinOption), 
                    e.AppDefinedData && (o.AppDefinedData = e.AppDefinedData), e.FaceUrl && (o.FaceUrl = e.FaceUrl), 
                    ze.apiCall(q, "create_group", o, t, n);
                }
            }(e, t, n);
        }, t.createGroupHigh = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "create_group", o, r, i));
            var o, r, i;
        }, t.applyJoinGroup = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "apply_join_group", {
                GroupId: o.GroupId,
                ApplyMsg: o.ApplyMsg,
                UserDefinedField: o.UserDefinedField
            }, r, i));
            var o, r, i;
        }, t.handleApplyJoinGroupPendency = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "handle_apply_join_group", {
                GroupId: o.GroupId,
                Applicant_Account: o.Applicant_Account,
                HandleMsg: o.HandleMsg,
                Authentication: o.Authentication,
                MsgKey: o.MsgKey,
                ApprovalMsg: o.ApprovalMsg,
                UserDefinedField: o.UserDefinedField
            }, r, function(e) {
                10024 == e.ErrorCode ? r && r({
                    ActionStatus: K,
                    ErrorCode: 0,
                    ErrorInfo: "该申请已经被处理过"
                }) : i && i(e);
            }));
            var o, r, i;
        }, t.getPendencyGroup = function(e, t, n) {
            return o = e, r = t, void (ve(n, !0) && ze.apiCall(q, "get_pendency", {
                StartTime: o.StartTime,
                Limit: o.Limit,
                Handle_Account: Ee.identifier
            }, r, function(e) {}));
            var o, r;
        }, t.getPendencyGroupRead = function(e, t, n) {
            return o = e, r = t, void (ve(n, !0) && ze.apiCall(q, "report_pendency", {
                ReportTime: o.ReportTime,
                From_Account: Ee.identifier
            }, r, function(e) {}));
            var o, r;
        }, t.handleInviteJoinGroupRequest = function(e, t, n) {
            return o = e, r = t, void (ve(n, !0) && ze.apiCall(q, "handle_invite_join_group", {
                GroupId: o.GroupId,
                Inviter_Account: o.Inviter_Account,
                HandleMsg: o.HandleMsg,
                Authentication: o.Authentication,
                MsgKey: o.MsgKey,
                ApprovalMsg: o.ApprovalMsg,
                UserDefinedField: o.UserDefinedField
            }, r, function(e) {}));
            var o, r;
        }, t.deleteApplyJoinGroupPendency = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(k, "deletemsg", o, r, i));
            var o, r, i;
        }, t.quitGroup = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "quit_group", {
                GroupId: o.GroupId
            }, r, i));
            var o, r, i;
        }, t.searchGroupByName = function(e, t, n) {
            return o = e, r = t, i = n, void ze.apiCall(q, "search_group", o, r, i);
            var o, r, i;
        }, t.getGroupPublicInfo = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "get_group_public_info", {
                GroupIdList: o.GroupIdList,
                ResponseFilter: {
                    GroupBasePublicInfoFilter: o.GroupBasePublicInfoFilter
                }
            }, function(e) {
                if (e.ErrorInfo = "", e.GroupInfo) for (var t in e.GroupInfo) {
                    var n = e.GroupInfo[t].ErrorCode;
                    0 < n && (e.ActionStatus = J, e.GroupInfo[t].ErrorInfo = "[" + n + "]" + e.GroupInfo[t].ErrorInfo, 
                    e.ErrorInfo += e.GroupInfo[t].ErrorInfo + "\n");
                }
                e.ActionStatus == J ? i && i(e) : r && r(e);
            }, i));
            var o, r, i;
        }, t.getGroupInfo = function(e, t, n) {
            return function(e, t, n) {
                if (ve(n, !0)) {
                    var o = {
                        GroupIdList: e.GroupIdList,
                        ResponseFilter: {
                            GroupBaseInfoFilter: e.GroupBaseInfoFilter,
                            MemberInfoFilter: e.MemberInfoFilter
                        }
                    };
                    e.AppDefinedDataFilter_Group && (o.ResponseFilter.AppDefinedDataFilter_Group = e.AppDefinedDataFilter_Group), 
                    e.AppDefinedDataFilter_GroupMember && (o.ResponseFilter.AppDefinedDataFilter_GroupMember = e.AppDefinedDataFilter_GroupMember), 
                    ze.apiCall(q, "get_group_info", o, t, n);
                }
            }(e, t, n);
        }, t.modifyGroupBaseInfo = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "modify_group_base_info", o, r, i));
            var o, r, i;
        }, t.getGroupMemberInfo = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "get_group_member_info", {
                GroupId: o.GroupId,
                Offset: o.Offset,
                Limit: o.Limit,
                MemberInfoFilter: o.MemberInfoFilter,
                MemberRoleFilter: o.MemberRoleFilter,
                AppDefinedDataFilter_GroupMember: o.AppDefinedDataFilter_GroupMember
            }, r, i));
            var o, r, i;
        }, t.addGroupMember = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "add_group_member", {
                GroupId: o.GroupId,
                Silence: o.Silence,
                MemberList: o.MemberList
            }, r, i));
            var o, r, i;
        }, t.modifyGroupMember = function(e, t, n) {
            return function(e, t, n) {
                if (ve(n, !0)) {
                    var o = {};
                    e.GroupId && (o.GroupId = e.GroupId), e.Member_Account && (o.Member_Account = e.Member_Account), 
                    e.Role && (o.Role = e.Role), e.MsgFlag && (o.MsgFlag = e.MsgFlag), e.ShutUpTime && (o.ShutUpTime = e.ShutUpTime), 
                    e.NameCard && (o.NameCard = e.NameCard), e.AppMemberDefinedData && (o.AppMemberDefinedData = e.AppMemberDefinedData), 
                    ze.apiCall(q, "modify_group_member_info", o, t, n);
                }
            }(e, t, n);
        }, t.deleteGroupMember = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "delete_group_member", {
                GroupId: o.GroupId,
                Silence: o.Silence,
                MemberToDel_Account: o.MemberToDel_Account,
                Reason: o.Reason
            }, r, i));
            var o, r, i;
        }, t.destroyGroup = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "destroy_group", {
                GroupId: o.GroupId
            }, r, i));
            var o, r, i;
        }, t.changeGroupOwner = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "change_group_owner", o, r, i));
            var o, r, i;
        }, t.getJoinedGroupListHigh = function(e, t, n) {
            return Ue(e, t, n);
        }, t.getRoleInGroup = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "get_role_in_group", {
                GroupId: o.GroupId,
                User_Account: o.User_Account
            }, r, i));
            var o, r, i;
        }, t.forbidSendMsg = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "forbid_send_msg", {
                GroupId: o.GroupId,
                Members_Account: o.Members_Account,
                ShutUpTime: o.ShutUpTime
            }, r, i));
            var o, r, i;
        }, t.sendCustomGroupNotify = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(q, "send_group_system_notification", o, r, i));
            var o, r, i;
        }, t.applyJoinBigGroup = function(e, t, n) {
            return o = e, r = t, s = ve(i = n, !1) ? q : g, void ze.apiCall(s, "apply_join_group", {
                GroupId: o.GroupId,
                ApplyMsg: o.ApplyMsg,
                UserDefinedField: o.UserDefinedField
            }, function(e) {
                if (e.JoinedStatus && "JoinedSuccess" == e.JoinedStatus) {
                    if (!e.LongPollingKey) return void (i && i(Ae.getReturnError("Join Group succeed; But the type of group is not AVChatRoom: groupid=" + o.GroupId, -12)));
                    Qe.setBigGroupLongPollingOn(!0), Qe.setBigGroupLongPollingKey(e.LongPollingKey), 
                    Qe.setBigGroupLongPollingMsgMap(o.GroupId, 0), Qe.bigGroupLongPolling();
                }
                r && r(e);
            }, function(e) {
                i && i(e);
            });
            var o, r, i, s;
        }, t.quitBigGroup = function(e, t, n) {
            return o = e, r = t, s = ve(i = n, !1) ? q : g, void ze.apiCall(s, "quit_group", {
                GroupId: o.GroupId
            }, function(e) {
                Qe.resetBigGroupLongPollingInfo(), r && r(e);
            }, i);
            var o, r, i, s;
        }, t.getProfilePortrait = function(e, t, n) {
            return qe(e, t, n);
        }, t.setProfilePortrait = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(l, "portrait_set", {
                From_Account: Ee.identifier,
                ProfileItem: o.ProfileItem
            }, function(e) {
                for (var t in o.ProfileItem) {
                    var n = o.ProfileItem[t];
                    if ("Tag_Profile_IM_Nick" == n.Tag) {
                        Ee.identifierNick = n.Value;
                        break;
                    }
                }
                r && r(e);
            }, i));
            var o, r, i;
        }, t.applyAddFriend = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "friend_add", {
                From_Account: Ee.identifier,
                AddFriendItem: o.AddFriendItem
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.getPendency = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "pendency_get", {
                From_Account: Ee.identifier,
                PendencyType: o.PendencyType,
                StartTime: o.StartTime,
                MaxLimited: o.MaxLimited,
                LastSequence: o.LastSequence
            }, r, i));
            var o, r, i;
        }, t.getPendencyReport = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "PendencyReport", {
                From_Account: Ee.identifier,
                LatestPendencyTimeStamp: o.LatestPendencyTimeStamp
            }, r, i));
            var o, r, i;
        }, t.deletePendency = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "pendency_delete", {
                From_Account: Ee.identifier,
                PendencyType: o.PendencyType,
                To_Account: o.To_Account
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.responseFriend = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "friend_response", {
                From_Account: Ee.identifier,
                ResponseFriendItem: o.ResponseFriendItem
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.getAllFriend = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "friend_get_all", {
                From_Account: Ee.identifier,
                TimeStamp: o.TimeStamp,
                StartIndex: o.StartIndex,
                GetCount: o.GetCount,
                LastStandardSequence: o.LastStandardSequence,
                TagList: o.TagList
            }, r, i));
            var o, r, i;
        }, t.deleteChat = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && (1 == o.chatType ? ze.apiCall(f, "delete", {
                From_Account: Ee.identifier,
                Type: o.chatType,
                To_Account: o.To_Account
            }, r, i) : ze.apiCall(f, "delete", {
                From_Account: Ee.identifier,
                Type: o.chatType,
                ToGroupid: o.To_Account
            }, r, i)));
            var o, r, i;
        }, t.deleteFriend = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "friend_delete", {
                From_Account: Ee.identifier,
                To_Account: o.To_Account,
                DeleteType: o.DeleteType
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.addBlackList = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "black_list_add", {
                From_Account: Ee.identifier,
                To_Account: o.To_Account
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.deleteBlackList = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "black_list_delete", {
                From_Account: Ee.identifier,
                To_Account: o.To_Account
            }, function(e) {
                var t = ke(e);
                t.ActionStatus == J ? i && i(t) : r && r(t);
            }, i));
            var o, r, i;
        }, t.getBlackList = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(u, "black_list_get", {
                From_Account: Ee.identifier,
                StartIndex: o.StartIndex,
                MaxLimited: o.MaxLimited,
                LastSequence: o.LastSequence
            }, r, i));
            var o, r, i;
        }, t.getRecentContactList = function(e, t, n) {
            return o = e, r = t, void (ve(i = n, !0) && ze.apiCall(p, "get", {
                From_Account: Ee.identifier,
                Count: o.Count
            }, r, i));
            var o, r, i;
        }, t.uploadFile = t.uploadPic = function(e, t, n) {
            return We.uploadFile(e, t, n);
        }, t.submitUploadFileForm = function(e, t, n) {
            return We.submitUploadFileForm(e, t, n);
        }, t.uploadFileByBase64 = t.uploadPicByBase64 = function(e, t, n) {
            var o = {
                To_Account: e.toAccount,
                Busi_Id: e.businessType,
                File_Type: e.File_Type,
                File_Str_Md5: e.fileMd5,
                PkgFlag: M.BASE64_DATA,
                File_Size: e.totalSize,
                Slice_Offset: 0,
                Slice_Size: e.totalSize,
                Slice_Data: e.base64Str,
                Seq: L(),
                Timestamp: O(),
                Random: P()
            };
            return xe(o, t, n);
        }, t.setJsonpLastRspData = function(e) {
            "string" == typeof e ? JSON.parse(e) : e;
        }, t.getLongPollingId = function(e, t, n) {
            return Ke(0, t, n);
        }, t.applyDownload = function(e, t, n) {
            return Je(e, t, n);
        }, t.onDownFile = function(e) {
            window.open(b.downloadMap["uuid_" + e]);
        }, t.checkLogin = function(e, t) {
            return ve(e, t);
        };
    }(e), e;
}();