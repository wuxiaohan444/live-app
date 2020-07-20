Component({
    properties: {
        live: {
            type: Object,
            value: []
        }
    },
    data: {
        showTip: 0
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    },
    methods: {}
});