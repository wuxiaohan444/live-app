Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.viewingRewardsPlugintoRoom = viewingRewardsPlugintoRoom, exports.viewingRewardsPlugleaveRoom = viewingRewardsPlugleaveRoom, 
exports.viewingRewardsPlugCountTime = viewingRewardsPlugCountTime, exports.viewingRewardsPlugRecReward = viewingRewardsPlugRecReward, 
exports.viewingRewardsPlugAnchorCountTime = viewingRewardsPlugAnchorCountTime, exports.viewingRewardsPlugAnchorRecReward = viewingRewardsPlugAnchorRecReward, 
exports.viewingRewardsPlugLiveStart = viewingRewardsPlugLiveStart, exports.viewingRewardsPlugLiveEnd = viewingRewardsPlugLiveEnd;

var _request = require("./../../../lib/utils/request.js"), _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function viewingRewardsPlugintoRoom(e) {
    return _request2.default.get("plugin/viewing_rewards/live/into/" + e);
}

function viewingRewardsPlugleaveRoom(e) {
    return _request2.default.get("plugin/viewing_rewards/live/leave/" + e);
}

function viewingRewardsPlugCountTime(e) {
    return _request2.default.post("plugin/viewing_rewards/live/count-time/" + e);
}

function viewingRewardsPlugRecReward(e, i) {
    return _request2.default.post("plugin/viewing_rewards/live/rec-reward/" + e, i);
}

function viewingRewardsPlugAnchorCountTime(e) {
    return _request2.default.post("plugin/viewing_rewards/live/anchor-count-time/" + e);
}

function viewingRewardsPlugAnchorRecReward(e, i) {
    return _request2.default.post("plugin/viewing_rewards/live/anchor-rec-reward/" + e, i);
}

function viewingRewardsPlugLiveStart() {
    return _request2.default.post("plugin/viewing_rewards/live/live-start");
}

function viewingRewardsPlugLiveEnd() {
    return _request2.default.post("plugin/viewing_rewards/live/live-end");
}