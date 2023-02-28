"object" != typeof globalThis && (globalThis = window),
    function (e) {
        function t(t) {
            for (var r, o, i = t[0], s = t[1], u = t[2], l = 0, f = []; l < i.length; l++) o = i[l], Object.prototype.hasOwnProperty.call(a, o) && a[o] && f.push(a[o][0]), a[o] = 0;
            for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
            for (d && d(t); f.length;) f.shift()();
            return c.push.apply(c, u || []), n()
        }

        function n() {
            for (var e, t = 0; t < c.length; t++) {
                for (var n = c[t], r = !0, o = 1; o < n.length; o++) {
                    var s = n[o];
                    0 !== a[s] && (r = !1)
                }
                r && (c.splice(t--, 1), e = i(i.s = n[0]))
            }
            return e
        }
        var r = {},
            o = {
                13: 0
            },
            a = {
                13: 0
            },
            c = [];

        function i(t) {
            if (r[t]) return r[t].exports;
            var n = r[t] = {
                i: t,
                l: !1,
                exports: {}
            };
            return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
        }
        i.e = function (e) {
            var t = [];
            o[e] ? t.push(o[e]) : 0 !== o[e] && {
                1: 1,
                3: 1,
                18: 1,
                22: 1,
                23: 1,
                24: 1
            } [e] && t.push(o[e] = new Promise((function (t, n) {
                for (var r = ({
                        1: "default-embed-web-startup",
                        3: "vendors-embed-web-startup",
                        4: "countries",
                        8: "lang-en",
                        9: "lang-vi",
                        17: "vendors-web-startup",
                        18: "web-startup"
                    } [e] || e) + "." + {
                        1: "c74076b5055445f98284",
                        3: "f85daca1da58d70b76b1",
                        4: "31d6cfe0d16ae931b73c",
                        8: "31d6cfe0d16ae931b73c",
                        9: "31d6cfe0d16ae931b73c",
                        17: "31d6cfe0d16ae931b73c",
                        18: "aab8c6ddb45252f6e591",
                        20: "31d6cfe0d16ae931b73c",
                        21: "31d6cfe0d16ae931b73c",
                        22: "dd4e207f5ac06653d6bf",
                        23: "84ee815cccbfc9541cc0",
                        24: "1f3793b2b4757be50303"
                    } [e] + ".css", a = i.p + r, c = document.getElementsByTagName("link"), s = 0; s < c.length; s++) {
                    var u = (d = c[s]).getAttribute("data-href") || d.getAttribute("href");
                    if ("stylesheet" === d.rel && (u === r || u === a)) return t()
                }
                var l = document.getElementsByTagName("style");
                for (s = 0; s < l.length; s++) {
                    var d;
                    if ((u = (d = l[s]).getAttribute("data-href")) === r || u === a) return t()
                }
                var f = document.createElement("link");
                f.rel = "stylesheet", f.type = "text/css", f.onload = t, f.onerror = function (t) {
                    var r = t && t.target && t.target.src || a,
                        c = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
                    c.code = "CSS_CHUNK_LOAD_FAILED", c.request = r, delete o[e], f.parentNode.removeChild(f), n(c)
                }, f.href = a, document.getElementsByTagName("head")[0].appendChild(f)
            })).then((function () {
                o[e] = 0
            })));
            var n = a[e];
            if (0 !== n)
                if (n) t.push(n[2]);
                else {
                    var r = new Promise((function (t, r) {
                        n = a[e] = [t, r]
                    }));
                    t.push(n[2] = r);
                    var c, s = document.createElement("script");
                    s.charset = "utf-8", s.timeout = 120, i.nc && s.setAttribute("nonce", i.nc), s.src = function (e) {
                        return i.p + "lazy/" + ({
                            1: "default-embed-web-startup",
                            3: "vendors-embed-web-startup",
                            4: "countries",
                            8: "lang-en",
                            9: "lang-vi",
                            17: "vendors-web-startup",
                            18: "web-startup"
                        } [e] || e) + "." + {
                            1: "1ddd4d903c024ae32662",
                            3: "f36ed1d932fee667945c",
                            4: "bbfee67f386a646e4922",
                            8: "80cacdf3af7dbb438dfb",
                            9: "f46c079d34ddfeaf49da",
                            17: "92bec007b82d35b99f3c",
                            18: "7367cabc8ac3dad7a7d5",
                            20: "73609597553b2c374c33",
                            21: "1111c118c669f8c427c5",
                            22: "5ebc3c2900c18c4d9c9d",
                            23: "4a6d50aea73ce300d1ee",
                            24: "1968f73c8f10eaaed313"
                        } [e] + ".js"
                    }(e);
                    var u = new Error;
                    c = function (t) {
                        s.onerror = s.onload = null, clearTimeout(l);
                        var n = a[e];
                        if (0 !== n) {
                            if (n) {
                                var r = t && ("load" === t.type ? "missing" : t.type),
                                    o = t && t.target && t.target.src;
                                u.message = "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")", u.name = "ChunkLoadError", u.type = r, u.request = o, n[1](u)
                            }
                            a[e] = void 0
                        }
                    };
                    var l = setTimeout((function () {
                        c({
                            type: "timeout",
                            target: s
                        })
                    }), 12e4);
                    s.onerror = s.onload = c, document.head.appendChild(s)
                } return Promise.all(t)
        }, i.m = e, i.c = r, i.d = function (e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, i.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, i.t = function (e, t) {
            if (1 & t && (e = i(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (i.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var r in e) i.d(n, r, function (t) {
                    return e[t]
                }.bind(null, r));
            return n
        }, i.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return i.d(t, "a", t), t
        }, i.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, i.p = "https://zalo-chat-static.zadn.vn/v1/", i.oe = function (e) {
            throw e
        };
        var s = this.webpackJsonp = this.webpackJsonp || [],
            u = s.push.bind(s);
        s.push = t, s = s.slice();
        for (var l = 0; l < s.length; l++) t(s[l]);
        var d = u;
        c.push([17, 2, 0]), n()
    }({
        17: function (e, t, n) {
            e.exports = n("cKAe")
        },
        "2EFI": function (e, t, n) {
            "use strict";
            const r = {
                enable: !0,
                allowLog: !1,
                mechanism: ["onunhandledrejection"],
                blacklistOriginException: ["not support", "reaction db timeout", "off-feature", "aborted!!", "search: aborted!!", "abort running too long", "Message key not found. The counter was repeated or the key was not filled.", "Bad MAC", "timeout of 10000ms exceeded", "Network Error", "entry/data is not valid", "invalid msg"],
                blacklistSentryException: ["Non-Error promise rejection captured with value: undefined", "Non-Error promise rejection captured with keys:", "Non-Error promise rejection captured with value:", "DataError: Failed to execute 'put' on 'IDBObjectStore': Evaluating the object store's key path yielded a value that is not a valid key.", "DataError: Failed to execute 'put' on 'IDBObjectStore': Evaluating the object store's key path did not yield a value.", "DataError: Failed to execute 'delete' on 'IDBObjectStore': No key or key range specified.", "InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase': The database connection is closing.", "FAIL_TO_OPEN_INVALID_STATE"],
                preventAll: !1
            };
            t.a = r
        },
        "8ogj": function (e, t, n) {
            "use strict";
            n("cfqX");
            var r = n("N1xz");
            (() => {
                r.a.install()
            })()
        },
        SbjA: function (e, t, n) {
            "use strict";
            (function (e) {
                var t = n("agHs"),
                    r = n("2EFI");
                const o = {
                    config: {
                        dsn: "https://182d4db70da74cf3adbc4e844aeb4256@senpc.api.zalo.me/2",
                        submitURL: "https://senpc.api.zalo.me/api/2/minidump/?sentry_key=182d4db70da74cf3adbc4e844aeb4256",
                        integrationFilter: r.a
                    }
                };
                class a {
                    constructor(e = {}) {
                        this.name = "IntegrationEventFilter", "object" == typeof e ? this._config = {
                            ...r.a,
                            ...e
                        } : this.config = r.a, this._logInfo("init success")
                    }
                    _logInfo(...e) {
                        this._config.allowLog
                    }
                    _checkMatchMechanism(e) {
                        return !(!e.exception || "object" != typeof e.exception) && (!!Array.isArray(e.exception.values) && !!e.exception.values.find((e => {
                            const t = e.mechanism || {};
                            return !(!t.type && !Array.isArray(this._config.mechanism)) && this._config.mechanism.includes(t.type)
                        })))
                    }
                    _checkInBlacklistOriginException(e) {
                        if (!e || "object" != typeof e) return !1;
                        const t = this._config.blacklistOriginException || [],
                            n = e.originalException || {};
                        if ("string" != typeof n.name) return !1;
                        if ("string" != typeof n.message) return !1;
                        return !!t.find((e => {
                            if (e === n) return !0;
                            if (e && n instanceof Error) {
                                if (n.name.includes(e)) return !0;
                                if (n.message.includes(e)) return !0
                            }
                            return !1
                        }))
                    }
                    _checkInBlacklistSentryException(e) {
                        const t = this._config.blacklistSentryException || [];
                        if (!e.exception || "object" != typeof e.exception) return !1;
                        if (!Array.isArray(e.exception.values)) return !1;
                        return !!e.exception.values.find((e => {
                            const n = (e || {}).value;
                            return !!n && t.find((e => n.includes(e)))
                        }))
                    }
                    _handleFilter(e, t) {
                        return this._checkMatchMechanism(e) && (this._config.preventAll || this._checkInBlacklistOriginException(t) || this._checkInBlacklistSentryException(e)) ? null : e
                    }
                    setupOnce(e) {
                        e(((e, t) => {
                            if (this._logInfo("receive event", {
                                    event: e,
                                    hint: t
                                }), this._config.enable) {
                                const n = this._handleFilter(e, t);
                                return this._logInfo("result filter", n), n
                            }
                            return e
                        }))
                    }
                }(function () {
                    {
                        const e = function (e = {}) {
                            const t = localStorage.getItem("sh_stry_cf");
                            try {
                                return t ? JSON.parse(t) : e
                            } catch (n) {
                                return e
                            }
                        }(o);
                        t && e && function (e, t = {}) {
                            if (!e) return;
                            let n = new Map;
                            const {
                                enable: r,
                                config: o
                            } = t;
                            if (r && o && o.dsn) try {
                                e.init({
                                    dsn: o.dsn,
                                    integrations: e => (e.push(new a(o.integrationFilter)), e),
                                    release: "Zalo23.2.1",
                                    beforeSend(e, t) {
                                        let r = function (e) {
                                            const t = e => e ? `${e.function} ${e.colno} ${e.lineno}` : "",
                                                n = function (e) {
                                                    const {
                                                        exception: t
                                                    } = e;
                                                    if (t) try {
                                                        return `${t.values[0].type} ${t.values[0].value}`
                                                    } catch (n) {
                                                        return "no message"
                                                    }
                                                    return "no message"
                                                }(e),
                                                r = function (e) {
                                                    const {
                                                        exception: t,
                                                        stacktrace: n
                                                    } = e;
                                                    if (t) try {
                                                        return t.values[0].stacktrace.frames
                                                    } catch (r) {
                                                        return
                                                    } else if (n) return n.frames
                                                }(e),
                                                o = r && r.length;
                                            if (o && o > 0) {
                                                const e = r[0],
                                                    a = r[o - 1];
                                                return `${n} ${t(e)} ${t(a)}`
                                            }
                                            return n
                                        }(e);
                                        return n.has(r) ? null : (n.set(r, !0), e)
                                    }
                                })
                            } catch (c) {}
                        }(t, e)
                    }
                })()
            }).call(this, n("ckNr"))
        },
        cKAe: function (e, t, n) {
            "use strict";
            n.r(t);
            n("8ogj");
            var r = n("BGEY");
            n("SbjA");
            (async function () {
                const e = window.localStorage.getItem("sh_z_recentuid") || window.localStorage.getItem("z_recentuid");
                await Object(r.b)(e)
            })().then((() => Promise.all([n.e(3), n.e(17), n.e(1), n.e(18)]).then(n.bind(null, "qLCR"))))
        }
    });
//# sourceMappingURL=sourcemaps/render.ee60bee9cbea52573265.js.map