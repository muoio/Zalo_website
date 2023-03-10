var _za_version = "2201101603";
try {
    if (ZA && ZA.version) throw new Error("Already loaded");
    var ZA = function () {
        var n, i = encodeURIComponent,
            r = {
                t: "__zi",
                o: "st",
                i: "ozi",
                u: "cdm",
                s: "_zirc",
                _: "cme",
                l: "anoTok",
                g: "anoVid"
            },
            o = ["zalo.me", "zaloapp.com", "zingmp3.vn", "baomoi.com", "zingnews.vn", "zapps.vn"],
            t = {
                m: "/v3/w/t",
                p: "/v3/le",
                h: "/static/v3/index.html?origin=",
                S: "/v3/gb",
                k: "/v3/brp",
                P: "/cm",
                A: "/gen-ano"
            },
            a = {
                B: 1,
                C: 21,
                I: 20
            },
            u = {
                M: "reqVid",
                T: "resVid"
            },
            e = {
                R: "z_tpv_",
                O: "z_cfb_"
            },
            c = {
                V: "z_tpv",
                W: "resRd" + Date.now(),
                D: "z_dpm",
                F: "ZA.onready"
            },
            d = {},
            s = "https://za.",
            v = {
                N: function (n, t) {
                    if ("string" == typeof t)
                        for (var e = n + "=", o = t.split(/[;&]/), i = 0; i < o.length; i++) {
                            for (var r = o[i];
                                " " === r.charAt(0);) r = r.substring(1, r.length);
                            if (0 === r.indexOf(e)) return r.substring(e.length, r.length)
                        }
                },
                U: function (n) {
                    return n = n || window.location.pathname + window.location.search
                },
                $: function (n) {
                    (n = n || {}).url = n.url || "", n.params = n.params || {}, n.success = n.success || function () {}, n.fail = n.fail || function () {};
                    var t = new XMLHttpRequest;
                    t.addEventListener("readystatechange", function () {
                        4 === this.readyState && (200 === this.status ? n.success(this.responseText) : n.fail(this.status))
                    }), t.open("POST", n.url), t.withCredentials = !0, t.setRequestHeader("content-type", "application/x-www-form-urlencoded"), t.send(v.q(n.params))
                },
                G: function (n) {
                    (n = n || {}).url = n.url || "", n.params = n.params || {}, n.success = n.success || function () {}, n.fail = n.fail || function () {};
                    var t = new XMLHttpRequest;
                    t.addEventListener("readystatechange", function () {
                        4 === this.readyState && (200 === this.status ? n.success(this.responseText) : n.fail(this.status))
                    }), t.open("GET", n.url + "?" + v.q(n.params)), t.send()
                },
                q: function (n) {
                    var t = "",
                        e = !0;
                    for (var o in n) !1 === e ? t += "&" : e = !1, t += o + "=" + i(n[o]);
                    return t
                },
                J: function (n, t) {
                    try {
                        t = t || window.location.href, n = n.replace(/[\[\]]/g, "\\$&");
                        var e = new RegExp("[?&]" + n + "(=([^&#]*)|&|#|$)").exec(t);
                        return e ? e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "" : null
                    } catch (n) {
                        return ""
                    }
                },
                Z: function (n) {
                    var t = document.location.href,
                        e = t.split("?");
                    if (2 <= e.length) {
                        for (var o = e.shift(), i = e.join("?"), r = encodeURIComponent(n) + "=", a = i.split(/[&;]/g), u = a.length; 0 < u--;) - 1 !== a[u].lastIndexOf(r, 0) && a.splice(u, 1);
                        t = o + (1 <= a.length ? "?" + a.join("&") : ""), window.history.replaceState("", document.title, t)
                    }
                    return t
                },
                L: function (n) {
                    for (var t = document.getElementsByTagName("script"), e = 0; e < t.length; e++)
                        if (-1 < t[e].src.indexOf(n)) return t[e].src;
                    return null
                },
                j: function (n) {
                    (n = n || {}).url = n.url || "", n.params = n.params || {};
                    var t = document.createElement("img");
                    t.setAttribute("width", "0"), t.setAttribute("height", "0"), t.setAttribute("onload", "this.parentNode.removeChild(this)"), t.setAttribute("onerror", "this.parentNode.removeChild(this)"), t.src = n.url + "?" + this.q(n.params) + "&r=" + (new Date).getTime();
                    var e = document.getElementsByTagName("script")[0];
                    e.parentNode.insertBefore(t, e)
                },
                H: function (n) {
                    if (!n || "" === n) return 1;
                    for (var t = 0, e = 0, o = n.length - 1; 0 <= o; o--) {
                        var i = parseInt(n.charCodeAt(o));
                        0 != (e = 266338304 & (t = (t << 6 & 268435455) + i + (i << 14))) && (t ^= e >> 21)
                    }
                    return t
                },
                K: function (n) {
                    n = n || g.X;
                    var t = "Windows";
                    return /windows 4.10/.test(n) ? t = "Windows 98" : /windows 4.90/.test(n) ? t = "Windows ME" : /windows nt 5.0/.test(n) ? t = "Windows 2000" : /windows nt 5.1/.test(n) ? t = "Windows XP" : /windows nt 6.0/.test(n) ? t = "Windows Vista" : /windows nt 6.1/.test(n) ? t = "Windows 7" : /windows nt 6.2/.test(n) ? t = "Windows 8" : /windows nt 6.3/.test(n) && (t = "Windows 8.1"), t
                },
                Y: function () {
                    if (/windows phone/.test(g.X)) return "Windows Phone";
                    var n = g.nn.split(" ")[0];
                    return "win32" === n.toLowerCase() || "win64" === n.toLowerCase() ? n = this.K() : "linux" === n.toLowerCase() && (0 <= g.X.indexOf("android") ? n = "Android" : 0 <= g.X.indexOf("mac os") && (n = "iOS")), n
                },
                tn: function (t) {
                    try {
                        var n = document.cookie;
                        if ((n = n && n.split(";")) && 0 < n.length)
                            for (var e = n.length - 1; 0 <= e; e--) {
                                var o = n[e].trim().split("=");
                                if (o && 1 < o.length && o[0] === t) return o[1]
                            }
                        return null
                    } catch (n) {
                        return t === r.t && m("Cant get vid: " + n + " | url: " + window.location.href + " | userAgent: " + navigator.userAgent), null
                    }
                },
                en: function (n, t) {
                    try {
                        var e = d[r.u] || v.on(),
                            o = new Date(Date.now() + 63072e6).toUTCString();
                        return document.cookie = n + "=" + t + "; expires=" + o + "; path=/; domain=" + e, !0
                    } catch (n) {
                        return !1
                    }
                },
                in: function (n) {
                    try {
                        var t = d[r.u] || v.on();
                        return document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=" + t, !0
                    } catch (n) {
                        return !1
                    }
                },
                rn: function () {
                    return !!navigator.userAgent && /iPhone|iPad|Macintosh/.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent) && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                },
                an: function () {
                    return /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
                },
                un: function () {
                    return /Android.+wv.+Chrome.+Mobile/.test(navigator.userAgent)
                },
                cn: function () {
                    return v.an() || v.un()
                },
                dn: function () {
                    return /Puffin|SamsungBrowser|UCBrowser|QQBrowser|QIHU|Maxthon|OppoBrowser|MiuiBrowser|RealmeBrowser/.test(navigator.userAgent)
                },
                sn: function () {
                    return /zalo/i.test(navigator.userAgent)
                },
                vn: function () {
                    return /FBAN|FB_IAB|FBAV/.test(navigator.userAgent)
                },
                fn: function () {
                    return /SamsungBrowser/.test(navigator.userAgent) || /Mobile.*OPR/.test(navigator.userAgent)
                },
                _n: function (n) {
                    return n.split("").reverse().join("")
                },
                ln: function (t) {
                    var e;
                    try {
                        e = new Event(t, {
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (n) {
                        (e = document.createEvent("Event")).initEvent(t, !0, !0)
                    }
                    e && document.dispatchEvent(e)
                },
                wn: function (n) {
                    var t = {
                        eventName: null,
                        successCallback: function () {},
                        timeoutCallback: function () {},
                        errorCallback: function () {},
                        timeout: 1e8,
                        target: document,
                        listenTimes: 1
                    };
                    if (v.gn(n, t), t.eventName && t.target) try {
                        var e = !1;

                        function o() {
                            e || (clearTimeout(i), v.mn(t.successCallback), --t.listenTimes || t.target.removeEventListener(t.eventName, o))
                        }
                        var i = setTimeout(function () {
                            e = !0, t.target.removeEventListener(t.eventName, o), v.mn(t.timeoutCallback)
                        }, t.timeout);
                        t.target.addEventListener(t.eventName, o)
                    } catch (n) {
                        v.mn(t.errorCallback)
                    }
                },
                pn: function () {
                    var n = navigator.userAgent;
                    return !/iPhone|iPad/.test(n) && (/AppleWebKit.* \(KHTML, like Gecko\)( Version.[^ ]*)? Chrome\/\d+(\.\d+)*( Mobile)? Safari\/\d+(\.\d+)*$/.test(n) || /Edg\//.test(n) || /coc_coc_browser/.test(n) || /Vivaldi/.test(n) || /OPR/.test(n) && !/Mobile/.test(n))
                },
                hn: function () {
                    return !!window.postMessage
                },
                yn: function () {
                    return window !== window.top
                },
                gn: function (n, t) {
                    try {
                        for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e])
                    } catch (n) {}
                },
                bn: function (n) {
                    Date.now();
                    var t = document.createElement("div");
                    t.style.top = "-10000px", t.style.width = "0px", t.style.height = "0px", t.style.position = "absolute";
                    var e = document.createElement("iframe");
                    return t.appendChild(e), e.onload = function () {}, e.setAttribute("src", n), document.body.insertBefore(t, document.body.firstChild), t
                },
                Sn: function (e, o) {
                    window.addEventListener("message", function (n) {
                        var t;
                        try {
                            t = JSON.parse(n.data)
                        } catch (n) {
                            t = {}
                        }
                        /za\.zalo\.me/.test(n.origin) && t.msgType === e && (o(t.data), v.ln(c.W))
                    }, !1)
                },
                on: function () {
                    var n = window.location.hostname.split(".");
                    return n[n.length - 2] + "." + n[n.length - 1]
                },
                mn: function (n) {
                    "function" == typeof n && n()
                },
                kn: function (n) {
                    return window[n]
                },
                zn: function (n) {
                    window[n] = !0
                },
                Pn: function () {
                    for (var n in e) e.hasOwnProperty(n) && (window[n] = !1)
                },
                An: function () {
                    var n = w.Bn(r.t);
                    return y.Cn(n) || /ZaloSDK/.test(navigator.userAgent)
                }
            },
            f = "https://za." + (n = v.on(), -1 < o.indexOf(n) ? n : "zalo.me"),
            _ = "not available",
            l = {
                In: void 0,
                Mn: [],
                xn: [],
                Tn: 11,
                Rn: [],
                En: "z_cbd",
                On: void 0,
                Vn: function (n, t) {
                    l.Mn.push(n), t && l.xn.push(t)
                },
                Wn: function () {
                    v.j({
                        params: {
                            fts: l.Mn,
                            ver: _za_version,
                            ua: navigator.userAgent,
                            __zi: y.Dn(),
                            ext: l.xn
                        },
                        url: f + t.k
                    })
                },
                Fn: function () {
                    if (void 0 !== l.In) return l.In;
                    var n = !1;
                    return 0 < l.Nn() && (n = !0), n = n || /bot|spider|google|yahoo|http|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|headless/i.test(navigator.userAgent), l.In = n
                },
                Un: function () {
                    var n = navigator.userAgent.toLowerCase(),
                        t = "unkown";
                    return -1 < n.indexOf("googlebot") ? t = "Googlebot" : -1 < n.indexOf("yandex") ? t = "YandexBot" : -1 < n.indexOf("googleweblight") ? t = "googleweblight" : -1 < n.indexOf("google-speakr") ? t = "GoogleSpeakr" : -1 < n.indexOf("google web preview") ? t = "GoogleWebPreview" : -1 < n.indexOf("mappy") ? t = "Mappy" : -1 < n.indexOf("adsbot-google") ? t = "AdsBotGoogle" : -1 < n.indexOf("jp.co.yahoo") ? t = "YahooBot" : -1 < n.indexOf("baidu") ? t = "Baidu" : -1 < n.indexOf("mediapartners-google") ? t = "MediapartnersGoogle" : -1 < n.indexOf("facebook") ? t = "Facebook" : -1 < n.indexOf("applebot") ? t = "Applebot" : -1 < n.indexOf("google") && (t = "Google"), t
                },
                $n: function (e) {
                    v.$({
                        url: f + t.S,
                        success: function (n) {
                            var t;
                            try {
                                n = n || "{}", t = JSON.parse(n)
                            } catch (n) {
                                t = {}, m("parse failed: " + n.message)
                            }
                            y.qn(t[r.t], a.C), v.mn(e)
                        }
                    })
                },
                Nn: function () {
                    if (void 0 !== l.On) return l.On;
                    var n = 0;
                    try {
                        ("_phantom" in window || "callPhantom" in window) && (n = 1, l.Vn(1)), "__phantomas" in window && (n = 2, l.Vn(2)), "Buffer" in window && (n = 3, l.Vn(3)), "emit" in window && (n = 4, l.Vn(4)), "spawn" in window && (n = 5, l.Vn(5)), ("webdriver" in window && 1 == window.webdriver || "webdriver" in window.navigator && 1 == window.navigator.webdriver) && (n = 6, l.Vn(6)), "domAutomation" in window && (n = 7, l.Vn(7));
                        try {
                            window.document.documentElement.getAttribute("webdriver") && (n = 8, l.Vn(8))
                        } catch (n) {}
                        "_Selenium_IDE_Recorder" in window && (n = 9, l.Vn(9)), "__webdriver_script_fn" in document && (n = 10, l.Vn(10));
                        try {
                            var t, e = "__webdriver_evaluate __selenium_evaluate __webdriver_script_function __webdriver_script_func __webdriver_script_fn __fxdriver_evaluate __driver_unwrapped __webdriver_unwrapped __driver_evaluate __selenium_unwrapped __fxdriver_unwrapped".split(" "),
                                o = "_phantom __nightmare _selenium callPhantom callSelenium _Selenium_IDE_Recorder __stopAllTimers".split(" ");
                            for (t in o)
                                if (window[o[t]]) {
                                    n = 11, l.Vn(11);
                                    break
                                } for (var i in e)
                                if (window.document[e[i]]) {
                                    n = 12, l.Vn(12);
                                    break
                                } for (var r in window.document)
                                if (r.match(/\$[a-z]dc_/) && window.document[r].Gn) {
                                    n = 13, l.Vn(13);
                                    break
                                }
                        } catch (n) {}
                        window.external && window.external.toString() && -1 != window.external.toString().indexOf("Sequentum") ? (n = 14, l.Vn(14)) : window.document.documentElement.getAttribute("selenium") ? (n = 15, l.Vn(15)) : window.document.documentElement.getAttribute("driver") ? (n = 16, l.Vn(16)) : null !== document.documentElement.getAttribute("selenium") ? (n = 17, l.Vn(17)) : null !== document.documentElement.getAttribute("webdriver") ? (n = 18, l.Vn(18)) : null !== document.documentElement.getAttribute("driver") && (n = 19, l.Vn(19))
                    } catch (n) {}
                    return l.On = n, l.Rn.push("injected" + n), v.ln(l.En), n
                },
                Jn: function (t) {
                    try {
                        navigator.permissions.query({
                            name: "notifications"
                        }).then(function (n) {
                            "denied" === Notification.permission && "prompt" === n.state && (l.Vn(20), v.mn(t))
                        })
                    } catch (n) {}
                    l.Rn.push("incons"), v.ln(l.En)
                },
                Zn: function () {
                    try {
                        var n = window.navigator.permissions;
                        if (!n) return l.Rn.push("perOverr"), v.ln(l.En), 0;
                        "query" !== n.query.name && l.Vn(21), /functionquery\(\)\{\[nativecode\]\}/.test(n.query.toString().replace(/\s/g, "")) || l.Vn(22), "toString" !== Function.prototype.toString.name && l.Vn(23, Function.prototype.toString.name), /functiontoString\(\)\{\[nativecode\]\}/.test(n.query.toString.toString().replace(/\s/g, "")) || l.Vn(24), n.query.toString.hasOwnProperty("[[Handler]]") && n.query.toString.hasOwnProperty("[[Target]]") && n.query.toString.hasOwnProperty("[[IsRevoked]]") && l.Vn(25), n.hasOwnProperty("query") && l.Vn(26), "prototype" in Function.prototype.toString && l.Vn(27)
                    } catch (n) {}
                    return l.Rn.push("perOverr"), v.ln(l.En), 0
                },
                Ln: function () {
                    if (!v.rn()) return l.Rn.push("safari"), v.ln(l.En), 0;
                    try {
                        /functionhasOwnProperty\(\)\{\[nativecode\]\}/.test(navigator.hasOwnProperty.toString().replace(/\s/g, "")) || l.Vn(28), /functiontoString\(\)\{\[nativecode\]\}/.test(navigator.hasOwnProperty.toString.toString().replace(/\s/g, "")) || l.Vn(29), -1 === navigator.vendor.indexOf("Apple") && l.Vn(30), 47 !== navigator.hasOwnProperty.toString().length && l.Vn(31), navigator.hasOwnProperty("vendor") && l.Vn(32)
                    } catch (n) {}
                    return l.Rn.push("safari"), v.ln(l.En), 0
                },
                jn: function () {
                    return v.un() || v.sn() || v.vn() || v.dn() || /bot|spider|google|yahoo|http|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|headless/i.test(navigator.userAgent) || !/Chrome/.test(window.navigator.userAgent) || window.chrome ? (l.Rn.push("chrome"), v.ln(l.En), 0) : (l.Vn(33), l.Rn.push("chrome"), v.ln(l.En), 33)
                },
                Hn: function () {
                    return navigator.language && 0 !== navigator.languages.length ? (l.Rn.push("lang"), v.ln(l.En), 0) : (l.Vn(34), l.Rn.push("lang"), v.ln(l.En), 34)
                },
                Kn: function () {
                    var n = PluginArray.prototype === navigator.plugins.__proto__;
                    return 0 < navigator.plugins.length && (n &= Plugin.prototype === navigator.plugins[0].__proto__), n ? (l.Rn.push("plug"), v.ln(l.En), 0) : (l.Vn(35), l.Rn.push("plug"), v.ln(l.En), 35)
                },
                Qn: function () {
                    var n = MimeTypeArray.prototype === navigator.mimeTypes.__proto__;
                    return 0 < navigator.mimeTypes.length && (n &= MimeType.prototype === navigator.mimeTypes[0].__proto__), n ? (l.Rn.push("mime"), v.ln(l.En), 0) : (l.Vn(36), l.Rn.push("mime"), v.ln(l.En), 36)
                },
                Xn: function () {
                    if (v.un() || v.sn() || v.vn() || v.fn()) return l.Rn.push("connRtt"), v.ln(l.En), 0;
                    var n = navigator.connection;
                    return 0 === (n ? n.rtt : void 0) ? (l.Vn(37), l.Rn.push("connRtt"), v.ln(l.En), 37) : (l.Rn.push("connRtt"), v.ln(l.En), 0)
                },
                Yn: function () {
                    return 0 === window.outerHeight && 0 === window.outerWidth ? (l.Vn(38), l.Rn.push("outer"), v.ln(l.En), 38) : (l.Rn.push("outer"), v.ln(l.En), 0)
                },
                nt: function () {
                    if (!v.kn(e.O) && (v.zn(e.O), document.addEventListener(l.En, function () {
                            l.Tn--, l.Tn < 0 && m("Too many events fired! Events: " + l.Rn), 0 === l.Tn && 0 < l.Mn.length && l.Wn()
                        }), l.jn(), l.Ln(), l.Xn(), l.Hn(), l.Yn(), l.Zn(), l.Qn(), l.Kn(), l.Jn(), -1 < navigator.userAgent.indexOf("Mobile") && -1 === navigator.userAgent.indexOf("Firefox"))) try {
                        var n = document.createElement("video");
                        if (!n.canPlayType) return void m("create video failed! ua: " + navigator.userAgent);
                        "" == n.canPlayType("application/vnd.apple.mpegURL") && "" == n.canPlayType("audio/mpegurl") && m("not support HLS: " + navigator.userAgent)
                    } catch (n) {}
                },
                tt: function (n) {
                    v.mn(n)
                },
                et: function () {
                    try {
                        var n = document.createElement("div");
                        n.style.top = "-10000px", n.style.width = "0px", n.style.height = "0px", n.style.position = "absolute";
                        var t = document.createElement("iframe");
                        n.appendChild(t), t.srcdoc = "page intentionally left blank", document.body.appendChild(n);
                        var e = Object.getOwnPropertyDescriptors(HTMLIFrameElement.prototype),
                            o = e.contentWindow.get.toString().replace(/\s/g, "");
                        "functiongetcontentWindow(){[nativecode]}" !== o && "functioncontentWindow(){[nativecode]}" !== o && l.Vn(39, e.contentWindow.get.toString().replace(/\s/g, "")), t.contentWindow === window && l.Vn(40), !0 !== t.contentWindow.navigator.webdriver && !0 !== t.contentWindow.webdriver || l.Vn(41), n.remove()
                    } catch (n) {}
                    return l.Rn.push("iframe"), v.ln(l.En), 0
                }
            },
            w = {
                ot: function (t, n) {
                    var e = !1;
                    try {
                        e = -1 < o.indexOf(v.on()) && v.tn(t) === n || v.en(t, n), localStorage.setItem(t, n)
                    } catch (n) {
                        e || m("Set key " + t + " failed! Msg: " + n.message)
                    }
                },
                Bn: function (n) {
                    try {
                        return v.tn(n) || localStorage.getItem(n)
                    } catch (n) {
                        return null
                    }
                },
                it: function (t) {
                    try {
                        var e = v.in(t);
                        localStorage.removeItem(t)
                    } catch (n) {
                        e || m("Remove key " + t + " failed! Msg: " + n.message)
                    }
                }
            },
            g = {
                rt: document.referrer || "",
                at: document.characterSet || document.charset || "",
                nn: navigator.platform || "",
                ut: document.location.host || "",
                X: navigator.userAgent.toLowerCase(),
                ct: "function" == typeof navigator.javaEnabled && !0 === navigator.javaEnabled(),
                rn: -1 < navigator.userAgent.toLowerCase().indexOf("safari") && -1 === navigator.userAgent.toLowerCase().indexOf("chrome"),
                dt: [
                    [navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || _], navigator.languages
                ],
                st: navigator.deviceMemory || _,
                vt: (new Date).getTimezoneOffset(),
                ft: navigator.hardwareConcurrency || _
            };

        function m(n) {
            v.j({
                params: {
                    msg: n,
                    ver: _za_version
                },
                url: f + t.p
            })
        }
        var p, h, y = {
                _t: "",
                g: "",
                lt: "",
                o: "",
                wt: /^2000\.((\w+\.\d+\.\w+$)|([^\.]+\.\d$))/,
                bot_pattern: /^4000\.\w+\.\d+\.\w+$/,
                gt: /^3000\.((\d+)|([^\.]+\.\d$))/,
                pt: /^2001\.((\w+\.\d+\.\w+$)|([^\.]+\.\d$))/,
                ht: /^2002\.((\w+\.\d+\.\w+$)|([^\.]+\.\d$))/,
                yt: function (n) {
                    return y.wt.test(n) || y.gt.test(n) || y.bot_pattern.test(n)
                },
                Cn: function (n) {
                    return y.pt.test(n) || y.ht.test(n)
                },
                bt: function () {
                    var n = w.Bn(r.t);
                    if (y.yt(n)) this.qn(n, a.B);
                    else if (l.Fn()) {
                        var t = l.Un().toLowerCase(),
                            e = "4000." + v._n(t) + "." + Date.now() + "." + v.H(t);
                        this.qn(e, a.C)
                    }
                },
                St: function (n) {
                    !1 !== this.yt(n) ? (this._t = n, w.ot(r.t, n), P || (P = !0, ZA && ZA.version ? v.ln(c.F) : setTimeout(function () {
                        v.ln(c.F)
                    }, 0))) : m("Set visitor id while it is invalid: " + n)
                },
                qn: function (n, t) {
                    this.kt(t), this.St(n)
                },
                Dn: function () {
                    return this._t
                },
                zt: function (e) {
                    return this.g ? ("function" == typeof e && e(this.g), this.g) : "function" != typeof e ? null : void v.G({
                        url: f + t.A,
                        params: {
                            __zi: this._t,
                            anoTok: this.lt
                        },
                        success: function (n) {
                            var t = JSON.parse(n);
                            0 === t.errorCode ? (y.g = t[r.g], e(y.g)) : e(null)
                        },
                        fail: function () {
                            e(null)
                        }
                    })
                },
                Pt: function (n) {
                    return "function" == typeof n && (this.yt(this._t) ? n(this._t) : document.addEventListener(c.F, function () {
                        n(y.Dn())
                    })), this._t
                },
                kt: function (n) {
                    n && (this.o = n)
                },
                At: function () {
                    return this.o
                }
            },
            b = (p = {
                zl: window.location.href,
                zrf: g.rt,
                zch: g.at,
                zts: (new Date).getTime(),
                zos: v.Y(),
                zla: g.dt,
                __zi: w.Bn(r.t),
                v: _za_version,
                incog: void 0
            }, (h = w.Bn(r.i)) && (p[r.i] = h), p);

        function S() {
            if (!v.kn(e.R)) {
                v.zn(e.R), b.zact = "pv", b._zapp = v.tn(location.host + "_zapp"), b._zidnbaid = v.tn(location.host + "_zidnbaid");

                function n() {
                    v.$({
                        url: f + t.m,
                        params: b,
                        success: function (n) {
                            d = JSON.parse(n), w.it(r.s), d[r.i] && w.ot(r.i, d[r.i]), v.Z("gidzl"), y.qn(d[r.t], d[r.o]), y.lt = d[r.l], v.ln(c.V),
                                function () {
                                    if (!0 !== d[r._]) return;
                                    v.$({
                                        url: s + location.host + t.P,
                                        params: {
                                            url: location.href,
                                            ref: document.referrer,
                                            __zi: y.Dn()
                                        }
                                    })
                                }()
                        },
                        fail: function (n) {
                            P || (P = !0, v.ln(c.F))
                        }
                    })
                }
                void 0 !== b.incog ? n() : v.wn({
                    eventName: c.D,
                    successCallback: n,
                    timeout: 2e3,
                    timeoutCallback: n
                })
            }
        }

        function k() {
            window.addEventListener("message", function (n) {
                var t = {};
                try {
                    t = JSON.parse(n.data)
                } catch (n) {}! function (n) {
                    return n.msgType === u.M
                }(t) || n.source.postMessage(function () {
                    var n = {
                        msgType: u.T,
                        from: location.origin,
                        data: y.Dn()
                    };
                    return JSON.stringify(n)
                }(), n.origin)
            }, !1)
        }

        function z(e) {
            var n, o = !1,
                i = setTimeout(function () {
                    o = !0, window.removeEventListener("message", r, !1), e()
                }, 1e3);

            function r(n) {
                var t = {};
                try {
                    t = JSON.parse(n.data)
                } catch (n) {}! function (n) {
                    return n.msgType === u.T
                }(t) || o || (clearTimeout(i), window.removeEventListener("message", r, !1), y.qn(t.data, a.B), e(t))
            }
            window.addEventListener("message", r, !1), window.top.postMessage((n = {
                msgType: u.M,
                from: location.origin
            }, JSON.stringify(n)), "*")
        }
        var P = !1;
        return function () {
            if (!v.An()) {
                if (v.Pn(), function () {
                        function a(n) {
                            void 0 === b.incog && (b.incog = n, v.ln(c.D))
                        }
                        var n;
                        try {
                            window.webkitRequestFileSystem ? 76 <= function () {
                                var n = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                                if (!n) throw new Error("Not Chromium!");
                                return parseInt(n[2], 10)
                            }() && navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(function (n) {
                                a(!!(n && n.quota < 125829120))
                            }) : window.webkitRequestFileSystem(0, 1, function () {
                                a(!1)
                            }, function () {
                                a(!0)
                            }) : /Apple/.test(navigator.vendor) && /Safari/.test(navigator.userAgent) ? function () {
                                function o(n) {
                                    for (var t = "", e = 0; e < n; e++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
                                    return t
                                }
                                if (13 <= function () {
                                        var n = navigator.userAgent.match(/Version\/([0-9\._]+).*Safari/) || navigator.userAgent.match(/iPhone OS ([0-9\._]+).*Safari/);
                                        if (!n) throw new Error("Not Safari!");
                                        return parseInt(n[1], 10)
                                    }()) {
                                    var n = function () {
                                            for (var n = o(100), t = [], e = 0; e < 1e3; e++) t.push(n);
                                            return t.join()
                                        }(),
                                        t = [];
                                    try {
                                        for (var e = 0; e < 30; e++) {
                                            var i = o(10);
                                            localStorage.setItem(i, n), t.push(i)
                                        }
                                        a(!0)
                                    } catch (n) {
                                        a(!1)
                                    } finally {
                                        for (e = 0; e < t.length; e++) localStorage.removeItem(t[e])
                                    }
                                } else {
                                    var r = !1;
                                    try {
                                        localStorage.setItem("inPrivate", "0"), localStorage.removeItem("inPrivate")
                                    } catch (n) {
                                        return a(navigator.cookieEnabled)
                                    }
                                    try {
                                        window.openDatabase(null, null, null, null)
                                    } catch (n) {
                                        r = !0
                                    }
                                    a(r)
                                }
                            }() : "MozAppearance" in document.documentElement.style ? function () {
                                try {
                                    if (null == indexedDB) a(!0);
                                    else {
                                        var n = indexedDB.open("inPrivate");
                                        n.onsuccess = function () {
                                            a(!1)
                                        }, n.onerror = function () {
                                            a(!0)
                                        }
                                    }
                                } catch (n) {
                                    a(!1)
                                }
                            }() : (n = !window.indexedDB && (window.PointerEvent || window.MSPointerEvent), a(!!n))
                        } catch (n) {
                            a(!1), m("detect Incogito failed! msg: " + n.message)
                        }
                    }(), y.bt(), v.yn()) y.Dn() ? S() : z(S);
                else k(), y.Dn() ? S() : l.tt(S);
                1 == v.J("giddebug", window.location.href) && document.addEventListener("readystatechange", function (n) {
                    if ("complete" === n.target.readyState) {
                        var t = document.createElement("script");
                        t.async = 1, t.onload = function () {
                            eruda.init()
                        }, t.src = "//cdn.jsdelivr.net/npm/eruda", document.body.appendChild(t)
                    }
                })
            }
        }(), {
            version: _za_version,
            getVisitorID: function (n) {
                return y.Pt(n)
            },
            getAnonymousVid: function (n) {
                return y.zt(n)
            }
        }
    }()
} catch (n) {
    "Already loaded" !== n.message && (console.error(n), (new Image).src = "https://za.zalo.me/v3/le?error=" + encodeURIComponent('{"error":"LOAD", "extra": {"name":"' + n.name + '","line":"' + (n.lineNumber || n.line) + '","script":"' + (n.fileName || n.sourceURL || n.script) + '","stack":"' + (n.stackTrace || n.stack) + '","ver":"' + _za_version + '","message":"' + n.message + '"}}'))
}