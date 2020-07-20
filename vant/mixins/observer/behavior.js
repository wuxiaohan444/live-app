Object.defineProperty(exports, "__esModule", {
    value: !0
});

var behavior = exports.behavior = Behavior({
    methods: {
        set: function(t, o) {
            var r = this;
            return new Promise(function(e) {
                r.setData(t, function() {
                    o && "function" == typeof o && o.call(r), e();
                });
            });
        }
    }
});