var app = getApp();

Component({
    properties: {
        attribute: {
            type: Object,
            value: {}
        },
        attrList: {
            type: Object,
            value: []
        },
        productAttr: {
            type: Object,
            value: []
        },
        productSelect: {
            type: Object,
            value: {
                image: "",
                store_name: "",
                price: 0,
                unique: "",
                stock: 0,
                ot_price:0
            }
        }
    },
    data: {
        attrValue: [],
        attrIndex: 0
    },
    attached: function() {},
    methods: {
        close: function() {
            this.triggerEvent("myevent", {
                window: !1
            });
        },
        CartNumDes: function() {
            this.triggerEvent("ChangeCartNum", !1);
        },
        CartNumInt: function() {
            this.triggerEvent("ChangeCartNum", !0);
        },
        tapAttr: function(t) {
            var e = t.currentTarget.dataset.indexw, r = t.currentTarget.dataset.indexn, a = this.data.productAttr[e].attr_value[r];
            this.data.productAttr[e].checked = a.attr, this.setData({
                productAttr: this.data.productAttr
            });

            var n = this.getCheckedValue().sort().join(",");
            this.triggerEvent("ChangeAttr", n);
            console.log(this.data.productSelect);
        },
        getCheckedValue: function() {
            return this.data.productAttr.map(function(t) {
                return t.checked;
            });
        },
        ResetAttr: function() {
            for (var t in this.data.productAttr) this.data.productAttr[t].checked = "";
            this.setData({
                productAttr: this.data.productAttr
            });
        }
    }
});