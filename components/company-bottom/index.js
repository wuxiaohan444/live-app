var _common = require("../../api/common.js");

Component({
    properties: {},
    lifetimes: {
        attached: function() {
            this.getConfig();
        }
    },
    data: {
        config: {}
    },
    methods: {
        getConfig: function() {
            var o = this;
            (0, _common.getConfig)(1).then(function(t) {
                o.setData({
                    config: t.data
                });
            });
        }
    }
});