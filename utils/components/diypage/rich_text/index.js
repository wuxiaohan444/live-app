var _wxParse = require("../../../../lib/wxParse/wxParse.js"), _wxParse2 = _interopRequireDefault(_wxParse);

function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var app = getApp();

Component({
    properties: {
        page: {
            type: Object,
            value: {}
        }
    },
    data: {
        navH: ""
    },
    attached: function() {
        _wxParse2.default.wxParse("content", "html", this.data.page.content, this, 0);
    },
    methods: {
        catchTouchMove: function(e) {
            return !1;
        }
    }
});