var app = getApp();

Component({
    properties: {
        searchInfo: {
            type: Object,
            value: {
                class: "0"
            }
        },
        searchList: {
            type: Object
        },
        logoUrl: {
            type: String,
            value: ""
        },
        link: {
            type: String,
            value: ""
        }
    },
    data: {
        navH: ""
    },
    attached: function() {
        this.setData({
            navH: app.globalData.navHeight
        });
    },
    methods: {
        setGoodsSearch: function() {
            wx.navigateTo({
                url: "/live/pages/searchLive/index"
            });
        },
        setClass: function() {
            var a = "";
            switch (this.data.searchInfo.class) {
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