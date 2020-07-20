Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.observe = observe;

var _behavior = require("./behavior");

function observe(e, r) {
    var o = e.watch;
    if (r.behaviors.push(_behavior.behavior), o) {
        var i = r.properties || {};
        Object.keys(o).forEach(function(e) {
            if (e in i) {
                var r = i[e];
                null !== r && "type" in r || (r = {
                    type: r
                }), r.observer = o[e], i[e] = r;
            }
        }), r.properties = i;
    }
}