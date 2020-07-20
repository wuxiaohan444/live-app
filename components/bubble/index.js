var _live = require("../../api/live"), app = getApp();

Component({
    properties: {
        giveups: {
            type: Array,
            value: []
        },
        live_id: {
            type: Number,
            value: 0
        }
    },
    lifetimes: {
        attached: function() {}
    },
    pageLifetimes: {
        show: function() {
            this.on();
        },
        hide: function() {
            this.off();
        }
    },
    data: {
        giveups: [],
        images: [],
        imagesDownloadAll: !1
    },
    attached: function() {},
    ready: function() {
        this.downloadAllImageArr();
    },
    detached: function() {
        this.off();
    },
    methods: {
        init: function() {
            this.timer = null, this.autoBubbleTimer = null, this.queue = [], this.ctx = this.ctx || wx.createCanvasContext("bubble", this);
        },
        on: function() {},
        off: function() {
            this.clear();
        },
        clear: function() {
            clearTimeout(this.timer), clearTimeout(this.autoBubbleTimer), this.timer = null, 
            this.ctx && this.ctx.draw(), this.setData({
                show: !1
            });
        },
        showBubble: function() {
            this.ctx || (this.init(), this.downloadAllImageArr());
            var t = this.getRandImg();
            t && this.createBubble(t);
        },
        createBubble: function(t) {
            this.queue.push({
                t: 0,
                icon: t,
                scale: 0,
                start: Date.now(),
                bezier: this.getAnimalXY()
            }), null === this.timer && this.animate();
        },
        downloadImageArr: function(e) {
            var i = this;
            if (i.data.giveups[e]) var t = i.data.giveups[e]; else t = app.getDomain() + "/addons/shimmer_liveshop/static/wxapp/live/like/" + (e + 1) + ".png";
            this.downloadFile(t).then(function(t) {
                i.data.images[e] = t;
            });
        },
        downloadFile: function(i) {
            return new Promise(function(e, t) {
                wx.downloadFile({
                    url: i,
                    success: function(t) {
                        e(t.tempFilePath);
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            });
        },
        getRandImg: function() {
            var t = this.data.images;
            if (t.length) return t[this.getRandom(0, t.length - 1)];
        },
        getRandom: function(t, e) {
            return Math.floor(Math.random() * (e - t + 1)) + t;
        },
        setEmptyImage: function() {
            var t = this;
            this.data.images.length <= 0 && setTimeout(function() {
                t.downloadImageArr(0);
            }, 1e3);
        },
        downloadAllImageArr: function() {
            if (!this.data.imagesDownloadAll) {
                this.setData({
                    imagesDownloadAll: !0
                });
                for (var t = 0 < this.data.giveups.length ? this.data.giveups.length : 6, e = 0; e < t; e++) this.downloadImageArr(e);
            }
        },
        getRandomSport: function(t, e) {
            return Math.random() * (e - t) + t;
        },
        setAnimal: function(t) {
            var e = Math.round(2 * Math.random());
            1 == Math.round(Math.random()) && (e = -e);
            Date.now();
            var i = Math.max(0, 16 - e);
            setTimeout(t, i);
        },
        animate: function() {
            var t = this, o = Date.now(), s = this.ctx, e = this.queue, r = this;
            this.queue = e.filter(function(t) {
                var e = r.getAnimalA(t), i = r.getAnimalI(t), a = i.x, n = i.y;
                return s.globalAlpha = r.getAnimalR(t), s.drawImage(t.icon, a, n, e, e), t.t = (o - t.start) / 2e3, 
                t.t < 1;
            }), s.draw(), this.queue.length ? (this.data.show || this.setData({
                show: !0
            }), this.timer = this.setAnimal(function() {
                t.animate();
            })) : this.clear();
        },
        getAnimalA: function(t) {
            var e = t.t;
            return e < .1 ? 10 * e * 32 : .2 < e ? 32 * ((e - .2) / .8 * .5 + 1) : 32;
        },
        getAnimalI: function(t) {
            var e = t.bezier, i = e[0], a = e[1], n = e[2], o = e[3], s = t.t, r = 3 * (a.x - i.x), h = 3 * (n.x - a.x) - r, l = o.x - i.x - r - h, u = 3 * (a.y - i.y), m = 3 * (n.y - a.y) - u, d = o.y - i.y - u - m;
            return {
                x: l * (s * s * s) + h * (s * s) + r * s + i.x,
                y: d * (s * s * s) + m * (s * s) + u * s + i.y
            };
        },
        getAnimalR: function(t) {
            var e = t.t;
            return e < .2 ? e / .2 : .3 < e ? 1 - (e - .3) / .7 : 1;
        },
        getAnimalXY: function() {
            return [ {
                x: 80,
                y: 400
            }, {
                x: this.getRandomSport(0, 120),
                y: this.getRandomSport(200, 300)
            }, {
                x: this.getRandomSport(0, 120),
                y: this.getRandomSport(50, 100)
            }, {
                x: this.getRandomSport(0, 120),
                y: this.getRandomSport(0, 50)
            } ];
        }
    }
});