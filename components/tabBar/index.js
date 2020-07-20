var app = getApp();

Component({
    parameter: {
        navbar: "1",
        return: "0",
        title: "购物",
        color: !0,
        class: "red"
    },
    data: {},
    methods: {
        setClass: function() {
            var a = "";
            switch (this.data.tabInfo.class) {
              case "0":
              case "on":
                a = "on";
                break;

              case "1":
              case "black":
                a = "black";
                break;

              case "2":
              case "gray":
                a = "gray";
                break;

              case "3":
              case "red":
                a = "red";
            }
            this.setData({
                "searchInfo.class": a
            });
        }
    }
});