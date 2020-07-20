Component({
    properties: {
        live: {
            type: Object,
            value: []
        },
        examineKeywords: {
            type: Object,
            value: {}
        }
    },
    data: {
        showTip: 0
    },
    lifetimes: {
        attached: function() {}
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    },
    methods: {}
});