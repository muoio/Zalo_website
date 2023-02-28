"object" != typeof globalThis && (globalThis = window), (this.webpackJsonp = this.webpackJsonp || []).push([
    [0], {
        "+7Kn": function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            })), n.d(t, "d", (function () {
                return i
            })), n.d(t, "b", (function () {
                return a
            })), n.d(t, "g", (function () {
                return r
            })), n.d(t, "e", (function () {
                return c
            })), n.d(t, "f", (function () {
                return d
            })), n.d(t, "c", (function () {
                return m
            }));
            var o = n("N0Be");
            class s extends Error {
                constructor(e) {
                    super(`[MigrateActionManager] An action handler has already registered for ${e} action type!`), this.name = o.a
                }
            }
            class i extends Error {
                constructor(e) {
                    super(`[MigrateActionManager] No action handler found for ${e} action type!`), this.name = o.d
                }
            }
            class a extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] Invalid initialized data for SecureKeysToMigrate"), this.name = o.b
                }
            }
            class r extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] SecureKeysToMigrate hasn't been initialized yet!"), this.name = o.g
                }
            }
            class c extends Error {
                constructor() {
                    super("[SecureKeysToMigrate] Invalid secure indexedDB key"), this.name = o.e
                }
            }
            class d extends Error {
                constructor() {
                    super("[MigrateRule] Can't generate new key name due to the lack of userID"), this.name = o.f
                }
            }
            class m extends Error {
                constructor() {
                    super("[MigrateFlow] Migration stops due to timeout"), this.name = o.c
                }
            }
        },
        "3EqI": function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            }));
            class o {
                constructor() {
                    this.pendings = void 0, this.pendings = new Map
                }
                markStart(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    let t = () => {};
                    const n = new Promise((e => {
                        t = e
                    })).finally((() => {
                        this.pendings.delete(e)
                    }));
                    this.pendings.set(e, {
                        promise: n,
                        resolver: t,
                        fulfilled: !1
                    })
                }
                markEnd(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    t && (t.fulfilled = !0, t.resolver())
                }
                isPending(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    return !!t && !t.fulfilled
                }
                isDone(e) {
                    return void 0 === e && (e = o.DEFAULT_JOB_ID), !this.isPending(e)
                }
                async wait(e) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID);
                    const t = this.pendings.get(e);
                    t && await t.promise
                }
            }
            o.DEFAULT_JOB_ID = "z1000";
            class s {
                constructor() {
                    this.jobQueue = {}, this.auditor = void 0, this.auditor = new o
                }
                exec(e, t) {
                    void 0 === e && (e = o.DEFAULT_JOB_ID), this.isPending(e) || this.auditor.markStart(e);
                    const n = this.jobQueue[e] || Promise.resolve(),
                        s = this.jobQueue[e] = n.then(t, t);
                    return s.finally((() => {
                        this.jobQueue[e] === s && delete this.jobQueue[e], this.jobQueue[e] || this.auditor.markEnd(e)
                    })), s
                }
                isPending(e) {
                    return this.auditor.isPending(e)
                }
                wait(e) {
                    return this.auditor.wait(e)
                }
            }
            const i = new s;
            t.b = i
        },
        "5Drw": function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            }));
            class o {
                constructor(e) {
                    this.time = void 0, this.metrics = void 0, this.time = e, this.metrics = []
                }
                setTime(e) {
                    this.time = e
                }
                add(e) {
                    this.metrics.push(e)
                }
                static clone(e) {
                    const t = new o(e.time);
                    return e.metrics.forEach((e => t.add(e))), t
                }
            }
            t.b = class {
                constructor() {
                    this.timeNodes = void 0, this.startTime = void 0, this.isRunning = void 0, this.enabled = void 0, this.everyTimeNode = void 0, this.timer = void 0, this.listener = void 0, this.everyPassedTime = void 0, this.sort = e => {
                        for (let t = 1; t < e.length; t++) {
                            const n = e[t];
                            let o;
                            for (o = t - 1; o >= 0 && e[o].time > n.time; o--) e[o + 1] = e[o];
                            e[o + 1] = n
                        }
                        return e
                    }, this.timeNodes = [], this.startTime = 0, this.isRunning = !1, this.enabled = !1, this.everyPassedTime = 0
                }
                onMessage(e) {
                    this.listener = e
                }
                startUp(e) {
                    this.isRunning || (this.enabled = !0, this.timeNodes = this.sort(e), this.timeNodes.length && (this.startTime = Date.now(), this.run()))
                }
                startEvery(e) {
                    this.everyTimeNode = e, this.isRunning || (this.enabled = !0, this.startTime = Date.now(), this.everyPassedTime = 0, this.runEvery())
                }
                stop() {
                    clearTimeout(this.timer), this.enabled = !1, this.timeNodes = [], this.everyTimeNode = void 0
                }
                execTimeNode(e) {
                    if (this.enabled && this.listener) {
                        const t = {
                            startTime: this.startTime,
                            passedTime: e.time,
                            metrics: e.metrics
                        };
                        this.listener(t)
                    }
                }
                run() {
                    if (!this.enabled) return void this.stop();
                    this.isRunning = !0;
                    const e = Date.now() - this.startTime,
                        t = this.timeNodes.shift();
                    if (t) {
                        const n = t.time - e;
                        this.timer = setTimeout((() => {
                            this.execTimeNode(t), this.everyPassedTime = t.time, this.run(), this.isRunning = !1
                        }), n)
                    } else this.isRunning = !1, this.runEvery()
                }
                runEvery() {
                    if (!this.everyTimeNode) return;
                    if (!this.enabled) return void this.stop();
                    this.isRunning = !0;
                    const e = this.everyTimeNode.time;
                    e ? this.timer = setTimeout((() => {
                        if (this.everyTimeNode) {
                            const t = this.everyPassedTime + e,
                                n = o.clone(this.everyTimeNode);
                            n.setTime(t), this.execTimeNode(n), this.everyPassedTime = t, this.runEvery(), this.isRunning = !1
                        }
                    }), e) : this.isRunning = !1
                }
            }
        },
        "7FSS": function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            }));
            const o = globalThis.zconsole || globalThis.console
        },
        "7xKq": function (e, t) {},
        AoYG: function (e, t, n) {
            "use strict";
            var o;
            ! function (e) {
                e.TIME = "TIME", e.MEMORY = "MEMORY", e.CPU = "CPU", e.USAGE = "USAGE", e.APP_USAGE = "APP_USAGE"
            }(o || (o = {})), t.a = o
        },
        BGEY: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return ue
            })), n.d(t, "b", (function () {
                return le
            }));
            var o = n("Ff2n"),
                s = n("K0f4"),
                i = n("wudS"),
                a = n("bH0y"),
                r = n("buT3"),
                c = n("NFKh"),
                d = n.n(c);

            function m() {
                let e = window.localStorage.getItem("sh_z_uuid") || window.localStorage.getItem("z_uuid");
                return e || (e = function () {
                    let e = (new Date).getTime();
                    window.performance && "function" == typeof window.performance.now && (e += performance.now());
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
                        let n = (e + 16 * Math.random()) % 16 | 0;
                        return e = Math.floor(e / 16), ("x" == t ? n : 3 & n | 8).toString(16)
                    }))
                }() + "-" + d.a.MD5(navigator.userAgent).toString(), window.localStorage.setItem("sh_z_uuid", e)), e
            }
            var u = n("gNXM");

            function l(e) {
                return "string" == typeof e ? e : "object" == typeof e ? JSON.stringify(e) : `${e}`
            }
            const h = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/RENAME",
                p = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/DELETE",
                g = "MIGRATE_ACTION_TYPE/LOCAL_STORAGE/RENAME_AND_MARK_FOR_ENCRYPTION",
                _ = "MIGRATE_ACTION_TYPE/IDB/RENAME",
                f = "MIGRATE_ACTION_TYPE/IDB/DELETE",
                I = "MIGRATE_ACTION_TYPE/IDB/RENAME_AND_MARK_FOR_ENCRYPTION";
            class P {
                constructor(e, t, n) {
                    this.versionObject = void 0, this.actionType = void 0, this.data = void 0, this.versionObject = e, this.actionType = t, this.data = n
                }
            }
            class y {
                constructor(e) {
                    this._rule = null, this._rule = e
                }
            }
            class M {}
            class v extends P {
                constructor(e, t) {
                    super(e, h, t)
                }
            }
            class b extends y {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, s] = n, {
                        dry: i,
                        logger: a
                    } = t || {}, c = (e, t) => {
                        i && a && a.log(`localStorage - Rename ${e} into ${t}`)
                    };
                    if (Array.isArray(o)) {
                        for (const d of o)
                            if (r.a.hasItem(d)) {
                                const t = "string" == typeof s ? s : s(e, d);
                                S(d, t), c(d, t)
                            }
                    } else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n)
                                if (r.a.hasItem(t)) {
                                    const n = "string" == typeof s ? s : s(e, t);
                                    S(t, n), c(t, n)
                                }
                        } else {
                            const n = t,
                                o = r.a.getAllKeyNames();
                            for (const t of o)
                                if (n(t)) {
                                    const n = t,
                                        o = "string" == typeof s ? s : s(e, n);
                                    S(n, o), c(n, o)
                                }
                        }
                    }
                }
            }
            class w extends M {
                createAction(e) {
                    return new b(e)
                }
            }

            function S(e, t) {
                const n = r.a.getItem(e);
                r.a.removeItem(e), r.a.setItem(t, n)
            }
            class q extends y {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, o = n, {
                        dry: s,
                        logger: i
                    } = t || {}, a = e => {
                        s && i && i.log(`localStorage - Delete ${e} `)
                    };
                    if (Array.isArray(o))
                        for (const c of o) r.a.hasItem(c) && (T(c), a(c));
                    else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const e = t;
                            for (const t of e) r.a.hasItem(t) && (T(t), a(t))
                        } else {
                            const e = t,
                                n = r.a.getAllKeyNames();
                            for (const t of n) e(t) && (T(t), a(t))
                        }
                    }
                }
            }
            class D extends M {
                createAction(e) {
                    return new q(e)
                }
            }

            function T(e) {
                r.a.removeItem(e)
            }
            class A extends y {
                exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, s] = n, {
                        dry: i,
                        logger: a
                    } = t || {}, c = (e, t) => {
                        i && a && (a.log(`localStorage - Rename ${e} into ${t}`), a.log(`localStorage - Will encrypt ${t} in its next key reading`))
                    };
                    if (Array.isArray(o)) {
                        for (const d of o)
                            if (r.a.hasItem(d)) {
                                const t = "string" == typeof s ? s : s(e, d);
                                N(d, t), c(d, t)
                            }
                    } else {
                        const t = o(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n)
                                if (r.a.hasItem(t)) {
                                    const n = "string" == typeof s ? s : s(e, t);
                                    N(t, n), c(t, n)
                                }
                        } else {
                            const n = t,
                                o = r.a.getAllKeyNames();
                            for (const t of o)
                                if (n(t)) {
                                    const n = t,
                                        o = "string" == typeof s ? s : s(e, n);
                                    N(n, o), c(n, o)
                                }
                        }
                    }
                }
            }
            class R extends M {
                createAction(e) {
                    return new A(e)
                }
            }

            function N(e, t) {
                const n = r.a.getItem(e);
                r.a.removeItem(e), r.a.setItem(t, n), a.a.markLocalStorageKey(t)
            }
            var E = n("H/wq"),
                $ = n("gbvv");
            class x extends P {
                constructor(e, t) {
                    super(e, _, t)
                }
            }
            class B extends y {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, s, i, a] = n, {
                        dry: r,
                        logger: c
                    } = t || {}, d = (e, t) => {
                        r && c && c.log(`indexedDB - Rename ${e} into ${t}`)
                    };
                    let m = "";
                    m = "string" == typeof o ? o : o(e);
                    let l = null;
                    try {
                        l = await u.a.openExistedDB(m)
                    } catch (p) {
                        if (p.name === E.a) return;
                        throw p
                    }
                    const h = l.objectStoreNames;
                    if (Array.isArray(s)) {
                        const t = s;
                        for (const n of t) h.contains(n) && await U(e, l, n, i, a, d)
                    } else {
                        const t = s(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) h.contains(t) && await U(e, l, t, i, a, d)
                        } else {
                            const n = t,
                                o = Array.from(h);
                            for (const t of o) n(t) && await U(e, l, t, i, a, d)
                        }
                    }
                }
            }
            class k extends M {
                createAction(e) {
                    return new B(e)
                }
            }
            async function U(e, t, n, o, s, i) {
                const a = t.transaction(n, "readwrite").objectStore(n),
                    r = t.name,
                    c = Object($.a)(r, n);
                if (!c) return void 0;
                const {
                    keyPath: d
                } = c;
                if (Array.isArray(o)) {
                    const t = o;
                    for (const n of t) {
                        if (!(await u.a.doesObjectStoreHaveKey(n, a))) continue;
                        const t = "string" == typeof s ? s : s(e, n);
                        await u.a.renameKeyOfObjectStore(n, t, a, d), i(n, t)
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const n = t;
                        for (const t of n) {
                            if (!(await u.a.doesObjectStoreHaveKey(t, a))) continue;
                            const n = "string" == typeof s ? s : s(e, t);
                            await u.a.renameKeyOfObjectStore(t, n, a, d), i(t, n)
                        }
                    } else {
                        const n = t,
                            o = await u.a.getAllKeyNamesOfObjectStore(a);
                        for (const t of o) {
                            if (!n(t)) continue;
                            const o = "string" == typeof s ? s : s(e, t);
                            await u.a.renameKeyOfObjectStore(t, o, a, d), i(t, o)
                        }
                    }
                }
            }
            class O extends P {
                constructor(e, t) {
                    super(e, f, t)
                }
            }
            class C extends y {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, s, i] = n, {
                        dry: a,
                        logger: r
                    } = t || {}, c = e => {
                        a && r && r.log(`indexedDB - Delete ${e}}`)
                    };
                    let d = "";
                    d = "string" == typeof o ? o : o(e);
                    let m = null;
                    try {
                        m = await u.a.openExistedDB(d)
                    } catch (h) {
                        if (h.name === E.a) return;
                        throw h
                    }
                    const l = m.objectStoreNames;
                    if (Array.isArray(s)) {
                        const t = s;
                        for (const n of t) l.contains(n) && await j(e, m, n, i, c)
                    } else {
                        const t = s(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) l.contains(t) && await j(e, m, t, i, c)
                        } else {
                            const n = t,
                                o = Array.from(l);
                            for (const t of o) n(t) && await j(e, m, t, i, c)
                        }
                    }
                }
            }
            class G extends M {
                createAction(e) {
                    return new C(e)
                }
            }
            async function j(e, t, n, o, s) {
                const i = t.transaction(n, "readwrite").objectStore(n);
                if (Array.isArray(o)) {
                    const e = o;
                    for (const t of e) {
                        await u.a.doesObjectStoreHaveKey(t, i) && (await u.a.deleteKeyOfObjectStore(t, i), s(t))
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const e = t;
                        for (const t of e) {
                            await u.a.doesObjectStoreHaveKey(t, i) && (await u.a.deleteKeyOfObjectStore(t, i), s(t))
                        }
                    } else {
                        const e = t,
                            n = await u.a.getAllKeyNamesOfObjectStore(i);
                        for (const t of n) e(t) && (await u.a.deleteKeyOfObjectStore(t, i), s(t))
                    }
                }
            }
            class z extends P {
                constructor(e, t) {
                    super(e, I, t)
                }
            }
            class L extends y {
                async exec(e, t) {
                    const {
                        data: n
                    } = this._rule, [o, s, i, a] = n, {
                        dry: r,
                        logger: c
                    } = t || {}, d = (e, t) => {
                        r && c && (c.log(`indexedDB - Rename ${e} into ${t}`), c.log(`indexedDB - Will encrypt ${t} in its next key reading`))
                    };
                    let m = "";
                    m = "string" == typeof o ? o : o(e);
                    let l = null;
                    try {
                        l = await u.a.openExistedDB(m)
                    } catch (p) {
                        if (p.name === E.a) return;
                        throw p
                    }
                    const h = l.objectStoreNames;
                    if (Array.isArray(s)) {
                        const t = s;
                        for (const n of t) h.contains(n) && await K(e, l, n, i, a, d)
                    } else {
                        const t = s(e);
                        if (Array.isArray(t)) {
                            const n = t;
                            for (const t of n) h.contains(t) && await K(e, l, t, i, a, d)
                        } else {
                            const n = t,
                                o = Array.from(h);
                            for (const t of o) n(t) && await K(e, l, t, i, a, d)
                        }
                    }
                }
            }
            class F extends M {
                createAction(e) {
                    return new L(e)
                }
            }
            async function K(e, t, n, o, s, i) {
                const r = t.transaction(n, "readwrite").objectStore(n),
                    c = t.name,
                    d = Object($.a)(c, n);
                if (!d) return void 0;
                const {
                    keyPath: m
                } = d;
                if (Array.isArray(o)) {
                    const t = o;
                    for (const o of t) {
                        if (!(await u.a.doesObjectStoreHaveKey(o, r))) continue;
                        const t = "string" == typeof s ? s : s(e, o);
                        await u.a.renameKeyOfObjectStore(o, t, r, m, (() => {
                            a.a.markIndexedDBKey(c, n, t)
                        })), i(o, t)
                    }
                } else {
                    const t = o(e);
                    if (Array.isArray(t)) {
                        const o = t;
                        for (const t of o) {
                            if (!(await u.a.doesObjectStoreHaveKey(t, r))) continue;
                            const o = "string" == typeof s ? s : s(e, t);
                            await u.a.renameKeyOfObjectStore(t, o, r, m, (() => {
                                a.a.markIndexedDBKey(c, n, o)
                            })), i(t, o)
                        }
                    } else {
                        const o = t,
                            d = await u.a.getAllKeyNamesOfObjectStore(r);
                        for (const t of d) {
                            if (!o(t)) continue;
                            const d = "string" == typeof s ? s : s(e, t);
                            await u.a.renameKeyOfObjectStore(t, d, r, m, (() => {
                                a.a.markIndexedDBKey(c, n, d)
                            })), i(t, d)
                        }
                    }
                }
            }
            var W = n("+7Kn");
            const H = new class {
                    constructor() {
                        this._actionFactories = new Map, this.init()
                    }
                    init() {
                        this.registerActionFactory(h, new w), this.registerActionFactory(p, new D), this.registerActionFactory(g, new R), this.registerActionFactory(_, new k), this.registerActionFactory(f, new G), this.registerActionFactory(I, new F)
                    }
                    registerActionFactory(e, t) {
                        if (this._actionFactories.has(e)) throw new W.a(e);
                        this._actionFactories.set(e, t)
                    }
                    getActions(e) {
                        const t = [];
                        for (const n of e) {
                            const {
                                actionType: e
                            } = n, o = this.getActionFactory(e).createAction(n);
                            t.push(o)
                        }
                        return t
                    }
                    getActionFactory(e) {
                        const t = this._actionFactories.get(e);
                        if (!t) throw new W.d(e);
                        return t
                    }
                },
                V = ["captcha_cert", "l-lg-t", "_config_new_remember", "_config_opt_remember", "z_admin_config", "language", "z_uuid", "z_recentp", "z_recoun", "z_reclogtype", "quest_cert", "already_login", "zpw_type", "zpw_ver", "app_ver", "e1cfeb1a59820a1ef96743cac2394fc4", "ADD_SYSTEM_INFO", "z_nom", "zcpu_messure_update", "zcpu_messure_recording", "last_inject_events", "gr_topics__pin_limit", "off_socket", "z_new_register", "FORGOT_PASSWORD", "zlast_uid", "z_recentin", "z_recentuid", "zlast_logout", "_need_set_remember", "_set_value_action_log", "FORCE_GET_FRIEND_LIST", "z_crdbSyncMsg", "z_needSyncMsg", "z_syncmsgInfo", "singleton_web_app", "z_lspop_faildb", "zlast_reset_db", "reset__zklastefid", "qos_url", "qos_lastRequestId", "_ud_launch_", "_remme_", "_rupd_", "_avblupd_", "_ud_what_new_", "_ud_new_version_", "_stry_cf_", "_s_ph_if_", "limit_pin_messages", "zipKey", "last_timeonapp_submit", "_firstCall", "zpc_log_submitted_at", "upload_log_client", "z_listroom_", "z_c_d_", "zv_cu", "zavi_download_dir", "__cookieStore__", "pcinfo", "mig_ver_sh", "user_ids", "zclr_res_pid", "domain-tool-v1-db-cache-data", "mig_lt_sh", "${userID}_viewerkey", "${userID}_cl_u_r_", "${userID}react_", "${userID}_deviceSettings"],
                Y = ["introduced-ttl-${userID}", "${userID}_g_token", "${userID}_d_token", "__list_recent_search__${userID}", "__list_recent_g_search__${userID}v2", "ttl-v1-${userID}", "ttl-v1-saved-${userID}", "fas_${userID}", "feat-pro-count-auto-replies-${userID}"],
                Q = ["passCode", "timeOut", "_skip_stk_cat_", "lst_force_reset_db", "z_rdb_", "z_dl_media_setting", "z_dl_media_info", "recent_save_path", "text-file-editor-rect", "lstdm_", "filesPath", "z_lf_frl", "DB_TYPE_SETTING_KEY", "${userID}_ver_sticker_suggest", "${userID}_ver_giphy_suggest", "${userID}_ver_sticker_cate_list", "${userID}_ver_giphy_cate", "${userID}_ver_tenor_to_sticker", "zres_mgt_${userID}", "${userID}_preload_cache", "last_dttm_overflow_queue_${userID}", "${userID}_show_onboard_cata", "z_stw_${userID}", "ztipfol_${userID}", "z1gbftip_${userID}", "_rso_${userID}", "sticker_hint${userID}", "tg_hfg${userID}", "_lastLogSidebarState_${userID}", "z_sendtome_filessent_${userID}", "z_del_everyone_${userID}", "z_sendtome_supportpage_${userID}", "${userID}_gr_topics__force_sync", "${userID}_debugsignal", "call_st_autoAudioInput_${userID}", "call_st_autoAudioOutput_${userID}", "call_st_audioInput_${userID}", "call_st_audioInputVl_${userID}", "call_st_audioOutput_${userID}", "call_st_audioOutputVl_${userID}", "call_st_videoInput_${userID}", "call_auto_adjust_${userID}", "z1gbfpop_${userID}", "_clipboard_suggestion_${userID}", "_auto_sticker_${userID}", "_double_click_reply_${userID}", "z_sendtome_quicksend_${userID}", "${userID}__QM__showDashboardTooltip", "${userID}__QM__showEntrypointRedDot", "${userID}__QM__showSettingsRedDot", "${userID}__QM__showWelcome", "${userID}__QM__searchTutorialCount", "z_sendtome_bubbledot_${userID}", "z_sendtome_suggest_limit_${userID}", "${userID}_BUTTON_FRIEND_LIST", "${userID}_BUTTON_REQUEST_FRIEND", "${userID}_BUTTON_SEND_REQUEST_FRIEND", "${userID}_BUTTON_NEW_FRIEND", "f_nf_${userID}", "z_sendtome_${userID}", "z_sendtome_pinned_${userID}", "nlst_w_${userID}", "${userID}_zinit_sgg", "onboarding_flag_${userID}", "${userID}__dbtimepc", "overflowts_${userID}", "${userID}_data_pin_hidden_chat", "${userID}_data_ids_hidden_chat", "${userID}_config_show_unread_time", "${userID}_data_config_hidden_chat", "${userID}_zpinc", "me_ts_${userID}", "${userID}_signal_cur_opid", "${userID}_signalenable", "${userID}_signalsubdevices", "${userID}_signallastinit", "${userID}_signalreinitsub", "${userID}_signalrk", "recent_sticker_event_${userID}", "recent_card_event_${userID}", "${userID}_version_alias", "${userID}_time_alias", "${userID}_last_err_alias", "${userID}_ver_bl_friend", "${userID}_init_fetch_fr", "${userID}_last_time_fetch_fr_success", "${userID}_key_last_get_fr_status", "${userID}_last_time_req_to_me", "fr_req_src_${userID}", "${userID}_alias_key", "${userID}phonebook_ver_key", "${userID}_phonebook_key", "${userID}_time_update_pbook", "${userID}_last_err_pb", "${userID}_last_time_verify_fr_list", "${userID}_config_alias", "${userID}_z_uids_bl", "zrgf_${userID}", "${userID}_total_mem_per_fetch", "muq_${userID}", "${userID}_cdkl", "${userID}_cdk", "${userID}_last_ack_evict", "lsmsg_${userID}", "askNoti_${userID}", "acv2_${userID}", "ac_${userID}", "aco_${userID}", "sock_msg_${userID}", "sock_ac_${userID}", "sock_aco_${userID}", "actrv2_${userID}", "actr_${userID}", "actro_${userID}", "${userID}_show_sidebar_cata", "${userID}_cata_ver", "${userID}__QM__lastUpdate", "zretry_v1__${userID}", "mgrk_${userID}", "mgripck_v4_${userID}", "z_trackfollow_v2${userID}", "z_tracktimesearch${userID}", "z_his_decay${userID}", "z_trackfrecency_v2${userID}", "z_sound_${userID}", "z_cleardata_${userID}", "z_e2ee_times_${userID}", "z_chatbg_${userID}", "z_capzalo_${userID}", "z_scrshot_hotkey_${userID}", "z_scrshot_hotkey_withoutZ_${userID}", "z_ytpr_${userID}", "z_ivap_${userID}", "z_ivaps_${userID}", "z_tptm_${userID}", "z_contact_${userID}", "z_copy_excel_${userID}", "z_suggestMentions_${userID}", "z_todoEventRemind_${userID}", "z_file_enable_auto_download_${userID}", "z_file_enable_thumbnail_${userID}", "z_file_white_list_${userID}", "z_text_file_editor_wrap_${userID}", "z_enable_notify_call_${userID}", "${userID}_z_sc", "${userID}_lff_", "${userID}_ver_pin", "${userID}_LAST_CONTACT_LIST_OPEN", "hfresetac355_${userID}", "${userID}_rs", "${userID}_remo", "${userID}_s_stk", "${userID}_st-on-dock", "${userID}_st-ver_", "${userID}_rm_s", "lbl_${userID}", "z_mdbk_${userID}", "${userID}_ib", "${userID}_off_tip_", "${userID}_cot", "${userID}_rate", "${userID}_bd", "${userID}_lbl-info", "${userID}__imlc", "${userID}__imlp", "${userID}_unrImsg", "${userID}_upss", "sock_pgm_${userID}", "${userID}iurc_", "${userID}dmn_", "${userID}__gbunread", "${userID}_dmar", "${userID}_dst", "${userID}_wn", "${userID}_ri", "${userID}_emo", "${userID}_h_n_stck", "${userID}_efs", "${userID}_pfs", "${userID}_grv", "${userID}_nsp_", "${userID}_lstCrS", "${userID}_cpa", "${userID}___sdbs", "${userID}_un_td", "${userID}_51area", "${userID}_adtd", "${userID}_adtdm", "${userID}_arotd", "${userID}_n_up_t", "${userID}_ta", "${userID}_fcbt", "${userID}_daet", "${userID}_bnbs", "${userID}_lused-lbl", "${userID}_z_jumpurl", "${userID}_inc_m_", "${userID}_z_cngc", "${userID}_tvi", "${userID}_tbsh", "${userID}_wps", "${userID}_wfs", "${userID}_m_u_f", "${userID}u_l_f", "${userID}_z_u_s", "${userID}_lbl_coll", "${userID}_lbl-intro", "${userID}_right_sb", "${userID}__update_gi", "${userID}_rem_pn", "${userID}_conv_ux_ver", "${userID}_conv_ux_mul_lbl", "${userID}_conv_ux_ec", "${userID}_cls_m_b", "${userID}_conv_tr_inf", "${userID}_bt", "${userID}_z_phonebook_version", "${userID}_l_r_msg", "z_sync_key__${userID}", "z_sync_wr_key__${userID}", "${userID}_showCf", "z_sync_stt${userID}", "mgrthreadmsgk_v2_${userID}", "zthrpendingact_${userID}", "${userID}_room_end_meeting", "z_frl_${userID}", "lastfilepath_${userID}", "lastimagepath_${userID}", "_dk_stk_${userID}", "${userID}_lbl_ver", "${userID}_signalserverenable", "${userID}_mig_ver_usr", "${userID}_mig_lt_usr", "INIT_FRIEND_BA${userID}", "${userID}_fdn_", "${userID}___recent_catalog__", "${userID}_rec_pack", "NEED_FETCH_PROFILE_ME${userID}", "${userID}sync_cross_settings", "${userID}_citk", "${userID}_sktmig", "${userID}_key_last_fetch_group", "${userID}_z_b__a_view_onboarding_state", "${userID}_z_b__a_view_business_user_status", "${userID}_z_b__a_view_business_profile", "${userID}_z_b__a_first_upgrade_business_account"],
                J = ["diskCacheInfos", "lastTimeGetDiskCacheInfos", "__ta__dev__", "isAutoScroll", "isAlwaysOnTop", "filterByName", "sticker_cf_v3", "sticker_v3", "feedback_clicked", "ztypsp_", "__STORAGE_WARN_TIMESTAMP__", "IS_FACEBOOK_LOGIN", "NEED_GET_COOKIE_MP3", "z_os_lastSession", "zfl_disable_discovery_v2", "__lstsbnet_", "last-msgid-sock", "last-queue-poll", "en_zshop", "z_auto_dl_msg-setting", "z_auto_dl_msg-info", "zdb_setting", "zroll_qc", "${userID}_time_begin_promote", "last_stk_${userID}", "${userID}_show_popup_del", "last_sc${userID}", "${userID}_fr_has_convs", "zmigrate_${userID}_lastId", "zmigrate_${userID}", "zmigrate_${userID}_sch", "zmigrate_${userID}_total", "zmigrate_${userID}_stat", "zmigrate_${userID}_er", "${userID}_z_spfonl_", "z_trackthk${userID}", "z_trackfollow${userID}", "z_trackfrecency${userID}", "z_e2ee_file_times_${userID}", "z_theme_${userID}", "z_ytcf_${userID}", "__list_recent_g_search__${userID}", "${userID}_st-first-time", "${userID}_st-mg_", "${userID}_bn", "${userID}_cstk", "${userID}_gbrt", "${userID}_gbin", "${userID}_gbgn", "${userID}_awf", "${userID}_qe", "${userID}_tmem", "${userID}_off_pr_st", "${userID}_mig_mention_v1", "${userID}_nnc", "${userID}_rctfm", "${userID}_tasks", "${userID}_cte", "${userID}_tte", "${userID}__zptd", "${userID}_ztbd", "${userID}_c_p_", "${userID}_tdlv", "${userID}__zlnt", "update-to-use-vanish-${userID}", "set-vanish--succeed${userID}"];

            function X(e) {
                return e.startsWith("sh_")
            }

            function Z(e, t) {
                if (!Object(i.a)(e)) return !1;
                const n = Object(i.b)(e);
                return t.startsWith(`${n}_`)
            }

            function ee(e) {
                return !!["zinsrc", "tmpr"].some((t => e.startsWith(`${t}_`))) || V.some((t => {
                    const n = "^" + t.replace("${userID}", "[0-9]+") + "$";
                    return new RegExp(n, "g").test(e)
                }))
            }

            function te(e, t) {
                return !(!t.startsWith("hide-fbadge") || !t.endsWith(e)) || (t === `$auto-replies-state-v1-${e}` || Y.some((n => {
                    const o = n.replace("${userID}", e);
                    return t.includes(o)
                })))
            }

            function ne(e, t) {
                if (t.startsWith(`${e}_z_ml_`)) return !0;
                if (t.startsWith(`${e}_`) && t.endsWith("_lastReceiveTs")) return !0;
                if (t.startsWith(`${e}_tabmsg.header_`)) return !0;
                if (t.startsWith(`TIP_CARD_ID_${e}_`)) return !0;
                if (t.startsWith(`TIP_PROMO_ICON_ID_${e}_`)) return !0;
                if (t.startsWith(`TIP_EFFECT_ID_${e}_`)) return !0;
                if (t.startsWith(`_recent_card_p_${e}_`)) return !0;
                if (t.startsWith(`zklastefid_${e}_`)) return !0;
                let n = t.split("_");
                return 2 === n.length && n[0] === e && !isNaN(Number(n[1])) || (!!t.startsWith(`${e}_z_bl_`) || (!!t.includes("lstfpmedia") || (!!t.startsWith(`${e}_z_frq_`) || (!!t.startsWith(`${e}_at_k_`) || (!(!t.startsWith(e) || !t.endsWith("_z_clmt")) || (!!t.startsWith(`sock_verfy_${e}`) || (!!t.startsWith(`z_retry_${e}_`) || (!!t.startsWith(`${e}_mact_`) || (!!t.startsWith(`${e}_mhasm_`) || (n = t.split("_"), !(3 !== n.length && 4 !== n.length || n[0] !== e || isNaN(Number(n[2]))) || (!!t.startsWith(`${e}_sync_cross_state`) || Q.some((n => {
                    const o = n.replace("${userID}", e);
                    return t === o
                })))))))))))))
            }

            function oe(e) {
                if (e.includes("_rpk_")) return !0;
                if (e.endsWith("_signalssgr")) return !0;
                if (["image", "fetchedImages", "file", "fetchedFiles", "link", "fetchedLinks"].some((t => e.endsWith(`${t}`)))) return !0;
                if (e.includes("_z_srq_name_")) return !0;
                return !!/^[0-9]{19}_msg_/g.test(e) || J.some((t => {
                    const n = "^" + t.replace("${userID}", "[0-9]+") + "$";
                    return new RegExp(n, "g").test(e)
                }))
            }
            var se = [...[new v({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, [() => e => ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const s of o)
                    if (t.endsWith(s)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = s.replace(e, "");
                        break
                    } return `sh_${n}`
            }]), new v({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, [e => e ? t => ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }]), new class extends P {
                constructor(e, t) {
                    super(e, p, t)
                }
            }({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, (() => e => oe(e))), new class extends P {
                constructor(e, t) {
                    super(e, g, t)
                }
            }({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, [e => e ? t => te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }]), new x({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], () => e => "string" == typeof e && ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const s of o)
                    if (t.endsWith(s)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = s.replace(e, "");
                        break
                    } return `sh_${n}`
            }]), new x({
                currentSharedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], () => e => "string" == typeof e && ee(e) && !X(e), (e, t) => {
                let n = t;
                const o = ["deviceSettings", "viewerkey", "_cl_u_r_", "react_"];
                for (const s of o)
                    if (t.endsWith(s)) {
                        const e = /^[_-]+|[_-]+$/g;
                        n = s.replace(e, "");
                        break
                    } return `sh_${n}`
            }]), new x({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], e => e ? t => "string" == typeof t && ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }]), new x({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], e => e ? t => "string" == typeof t && ne(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }]), new O({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], () => e => "string" == typeof e && oe(e)]), new O({
                currentSharedKeyVer: 0,
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], () => e => "string" == typeof e && oe(e)]), new z({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zlocalstorage", ["friend-blocked", "info-cache", "retry-cache"], e => e ? t => "string" == typeof t && te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }]), new z({
                currentUserScopedKeyVer: 0,
                targetVer: 1
            }, ["zsecure-localstorage", ["async-store"], e => e ? t => "string" == typeof t && te(e, t) && !Z(e, t) : [], (e, t) => {
                if (!e) throw new W.f;
                const n = Object(i.b)(e);
                if (t === `$auto-replies-state-v1-${e}`) return `${n}_auto-replies-state-v1`;
                let o = t;
                if (t.includes(e))
                    if (t === `${e}_${e}`) o = e;
                    else {
                        const n = /^[_-]+|[_-]+$/gm;
                        o = t.split(e).filter((e => "" !== e)).map((e => e.replace(n, ""))).join("_").replace(/^(sh_)+/g, "")
                    } return `${n}_${o}`
            }])]];
            const ie = new class {
                constructor() {
                    this._ruleMap = new Map, this._initRuleMap()
                }
                _getRuleMapKey(e) {
                    let t = "x",
                        n = "x";
                    const {
                        targetVer: o
                    } = e;
                    return Object.hasOwnProperty.call(e, "currentSharedKeyVer") && (t = l(e.currentSharedKeyVer)), Object.hasOwnProperty.call(e, "currentUserScopedKeyVer") && (n = l(e.currentUserScopedKeyVer)), `${t}_${n}_${o}`
                }
                _initRuleMap() {
                    const e = se;
                    for (const t of e) {
                        const {
                            versionObject: e
                        } = t, n = this._getRuleMapKey(e);
                        let o = [];
                        this._ruleMap.has(n) && (o = this._ruleMap.get(n)), o.push(t), this._ruleMap.set(n, o)
                    }
                }
                getRules(e, t, n) {
                    const o = this._getRuleMapKey({
                            currentSharedKeyVer: e,
                            targetVer: n
                        }),
                        s = this._ruleMap.get(o) || [],
                        i = this._getRuleMapKey({
                            currentUserScopedKeyVer: t,
                            targetVer: n
                        }),
                        a = this._ruleMap.get(i) || [],
                        r = this._getRuleMapKey({
                            currentSharedKeyVer: e,
                            currentUserScopedKeyVer: t,
                            targetVer: n
                        });
                    return [...s, ...a, ...this._ruleMap.get(r) || []]
                }
            };
            var ae = n("N0Be");
            class re {
                constructor() {
                    this.startTime = null, this.endTime = null
                }
                start() {
                    this.startTime = performance.now(), this.endTime = null
                }
                end() {
                    this.endTime = performance.now()
                }
                reset() {
                    this.startTime = null, this.endTime = null
                }
                isDataReady() {
                    return null !== this.startTime && null !== this.endTime
                }
                getDuration() {
                    if (!this.isDataReady()) return null;
                    return Math.round(this.endTime - this.startTime)
                }
            }
            const ce = ["err"];
            async function de(e, t) {
                const {
                    currentSharedKeysVer: a,
                    currentUserScopedKeysVer: c,
                    targetVer: d,
                    err: u
                } = t, l = u instanceof Error ? `${function(e){switch(e){case ae.a:return 1;case ae.d:return 2;case ae.b:return 3;case ae.g:return 4;case ae.e:return 5;case ae.f:return 6;case ae.c:return 7;default:return 0}}(u.name)}` : "0";
                a < d && (r.a.setItem(s.l, "0"), r.a.setItem(s.b, l));
                if (null !== e && c < d) {
                    const t = Object(i.b)(e),
                        n = `${t}_${s.m}`;
                    r.a.setItem(n, "0");
                    const o = `${t}_${s.c}`;
                    r.a.setItem(o, l)
                }
                const h = await Promise.resolve().then(n.bind(null, "agHs"));
                h.withScope((e => {
                    e.setTag(s.j, `${m()}`);
                    const {
                        err: n
                    } = t, i = Object(o.a)(t, ce);
                    e.setExtras(i), n instanceof Error ? h.captureException(n) : "string" == typeof n && h.captureMessage(n, h.Severity.Fatal)
                }))
            }

            function me(e, t, n) {
                const o = ie.getRules(e, t, n);
                return H.getActions(o)
            }

            function ue(e) {
                const t = `${Object(i.b)(e)}_${s.n}`;
                if (!r.a.hasItem(t)) return !1;
                return 1 === +r.a.getItem(t)
            }
            async function le(e, t) {
                void 0 === t && (t = {}), Object(i.d)();
                const n = null !== e,
                    o = null !== r.a.getItem(s.b);
                let c = !1;
                if (n) {
                    const t = `${Object(i.b)(e)}_${s.c}`;
                    c = null !== r.a.getItem(t)
                }
                const {
                    dry: d,
                    logger: m
                } = t;
                if (d && (r.a.turnOnDryMode(), u.a.turnOnDryMode()), n && (a.a.init(e), !d && function () {
                        const e = s.k;
                        return !!r.a.hasItem(e) && 1 == +r.a.getItem(e)
                    }() && ue(e))) return;
                const h = new re;
                h.start();
                const p = {
                    currentSharedKeysVer: s.d,
                    currentUserScopedKeysVer: s.d,
                    targetVer: s.d,
                    err: null
                };
                p.targetVer = 1;
                let g = s.d;
                !d && r.a.hasItem(s.k) && (g = +r.a.getItem(s.k), p.currentSharedKeysVer = g), o && (g = s.a);
                let _ = s.d;
                if (n) {
                    const t = `${Object(i.b)(e)}_${s.n}`;
                    !d && r.a.hasItem(t) && (_ = +r.a.getItem(t), p.currentUserScopedKeysVer = _)
                }
                c && (_ = s.a), await new Promise((async o => {
                    const a = setTimeout((async () => {
                        const t = new W.c;
                        m && m.error(t.message), p.err = t, await de(e, p), o()
                    }), s.e);
                    try {
                        for (;;) {
                            const n = me(g, _, 1);
                            if (0 === n.length) break;
                            for (const o of n) await o.exec(e, t);
                            g < 1 && g !== s.a && (g += 1, p.currentSharedKeysVer = g), null !== _ && _ !== s.a && _ < 1 && (_ += 1, p.currentUserScopedKeysVer = _)
                        }
                        if (clearTimeout(a), g !== s.a && (r.a.setItem(s.k, l(1)), r.a.setItem(s.l, "1")), n && _ !== s.a) {
                            const t = Object(i.b)(e),
                                n = `${t}_${s.n}`;
                            r.a.setItem(n, l(1));
                            const o = `${t}_${s.m}`;
                            r.a.setItem(o, "1")
                        }
                    } catch (c) {
                        0,
                        p.err = c,
                        await de(e, p)
                    }
                    finally {
                        o()
                    }
                })), a.a.save(), h.end();
                const f = h.getDuration();
                if (null !== f) {
                    if (r.a.setItem(s.f, `${f}`), n) {
                        const t = Object(i.b)(e);
                        r.a.setItem(`${t}_${s.g}`, `${f}`)
                    }
                    h.reset()
                }
                const I = r.a.getAllKeyNames().length + await async function () {
                    let e = 0;
                    const t = ["friend-blocked", "info-cache", "retry-cache"];
                    for (const n of t) e += await u.a.getTotalKeyCountOfStore("zlocalstorage", n);
                    return e += await u.a.getTotalKeyCountOfStore("zsecure-localstorage", "async-store"), e
                }();
                if (r.a.setItem(s.h, `${I}`), n) {
                    const t = Object(i.b)(e);
                    r.a.setItem(`${t}_${s.i}`, `${I}`)
                }
            }
        },
        CHYU: function (e, t, n) {
            "use strict";
            var o;
            ! function (e) {
                e.Main = "main", e.Render = "render", e.SharedWorker = "shared-worker", e.Photo = "photo", e.Web = "web", e.Embed = "embed", e.Login = "login", e.Unknown = "unknown"
            }(o || (o = {})), t.a = o
        },
        Cvfp: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            })), n.d(t, "b", (function () {
                return s
            }));
            const o = "-/~^~/-",
                s = {
                    zlocalstorage: {
                        "cocos-res": {
                            keyPath: "path",
                            dataPath: "data"
                        },
                        "db-stchecksum": {
                            keyPath: "checksum",
                            dataPath: "url"
                        },
                        "friend-blocked": {
                            keyPath: "key",
                            dataPath: "val"
                        },
                        "info-cache": {
                            keyPath: "key",
                            dataPath: "val"
                        },
                        "retry-cache": {
                            keyPath: "key",
                            dataPath: "val"
                        }
                    },
                    "zsecure-localstorage": {
                        "async-store": {
                            keyPath: "key",
                            dataPath: "val"
                        }
                    }
                }
        },
        "H/wq": function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            })), n.d(t, "b", (function () {
                return s
            }));
            const o = "NonExistedDBError";
            class s extends Error {
                constructor(e) {
                    super(e), this.name = o
                }
            }
        },
        "K+9E": function (e, t, n) {
            "use strict";
            var o;
            ! function (e) {
                e.METRIC_MANAGER = "METRIC_MANAGER", e.METRIC_SCHEMA_MANAGER = "METRIC_SCHEMA_MANAGER", e.METRIC_FACTORY = "METRIC_FACTORY", e.METRIC_TRANSPORTER = "METRIC_TRANSPORTER", e.METRIC_RESOLVER = "METRIC_RESOLVER", e.USAGE_MONITOR = "USAGE_MONITOR", e.LOCAL_STAT = "LOCAL_STAT", e.DATA_MANAGER = "DATA_MANAGER", e.UI_MANAGER = "UI_MANAGER"
            }(o || (o = {})), t.a = o
        },
        K0f4: function (e, t, n) {
            "use strict";
            n.d(t, "k", (function () {
                return o
            })), n.d(t, "n", (function () {
                return s
            })), n.d(t, "b", (function () {
                return i
            })), n.d(t, "c", (function () {
                return a
            })), n.d(t, "d", (function () {
                return r
            })), n.d(t, "a", (function () {
                return c
            })), n.d(t, "e", (function () {
                return d
            })), n.d(t, "j", (function () {
                return m
            })), n.d(t, "l", (function () {
                return u
            })), n.d(t, "m", (function () {
                return l
            })), n.d(t, "f", (function () {
                return h
            })), n.d(t, "g", (function () {
                return p
            })), n.d(t, "h", (function () {
                return g
            })), n.d(t, "i", (function () {
                return _
            }));
            const o = "sh_mig_ver_sh",
                s = "mig_ver_usr",
                i = "sh_mig_lt_sh",
                a = "mig_lt_usr",
                r = 0,
                c = -1,
                d = 1e6,
                m = "migrate_storage_key",
                u = "sh_mig_scs_sh",
                l = "mig_scs_usr",
                h = "sh_mig_d",
                p = "mig_d",
                g = "sh_mig_co",
                _ = "mig_co"
        },
        K6Wi: function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n("rFEu"),
                s = n("cnBV"),
                i = n("uzza"),
                a = n("CHYU");
            const r = Object(o.f)(o.a.time("1m"), o.a.time("5m"), o.a.time("10m"), o.a.time("30m"), o.a.time("1h"), o.a.time("3h"), o.a.time("5h"), o.a.time("8h"), o.a.time("24h")),
                c = o.b.Memory({
                    name: i.a.usage_memory,
                    categories: [s.a.usage],
                    timeline: r,
                    statement: Object(o.e)({
                        name: "memory usage",
                        points: [o.e.Point({
                            name: "usage after 1m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("1m"))
                            },
                            points: [o.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("50MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99108
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99140
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99172
                                    }
                                })]
                            }), o.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99109
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99141
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99173
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99110
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99142
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99174
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99111
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99143
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99175
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 5m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("5m"))
                            },
                            points: [o.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("50MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99112
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99144
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99176
                                    }
                                })]
                            }), o.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99113
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99145
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99177
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99114
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99146
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99178
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99115
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99147
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99179
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 10m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("10m"))
                            },
                            points: [o.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("50MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99116
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99148
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99180
                                    }
                                })]
                            }), o.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99117
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99149
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99181
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99118
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99150
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99182
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99119
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99151
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99183
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 30m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("30m"))
                            },
                            points: [o.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("50MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99120
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99152
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99184
                                    }
                                })]
                            }), o.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99121
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99153
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99185
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99122
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99154
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99186
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99123
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99155
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99187
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 1h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("1h"))
                            },
                            points: [o.e.Point({
                                name: "<= 50 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("50MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99124
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99156
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99188
                                    }
                                })]
                            }), o.e.Point({
                                name: "50 MB < heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99125
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99157
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99189
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99126
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99158
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99190
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99127
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99159
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99191
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 3h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("3h"))
                            },
                            points: [o.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99128
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99160
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99192
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99129
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99161
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99193
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99130
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99162
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99194
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 5h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("5h"))
                            },
                            points: [o.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99131
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99163
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99195
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99132
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99164
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99196
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99133
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99165
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99197
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 8h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("8h"))
                            },
                            points: [o.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99134
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99166
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99198
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99135
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99167
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99199
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99136
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99168
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99200
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 24h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t >= o.a.time("24h"))
                            },
                            points: [o.e.Point({
                                name: "heapUsed <= 100 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("100MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99137
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99169
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99201
                                    }
                                })]
                            }), o.e.Point({
                                name: "100 MB < heapUsed <= 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t <= o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99138
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99170
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99202
                                    }
                                })]
                            }), o.e.Point({
                                name: "heapUsed > 200 MB",
                                condition: e => {
                                    const t = o.a.extractHeapUsed(e);
                                    return !!(null != t && t > o.a.bytes("200MB"))
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99139
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99171
                                    }
                                }), o.e.Point({
                                    name: "dbtask",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99203
                                    }
                                })]
                            })]
                        })]
                    })
                }),
                d = o.b.CPU({
                    name: i.a.usage_cpu,
                    categories: [s.a.usage],
                    timeline: r,
                    statement: Object(o.e)({
                        name: "percent CPU usage",
                        points: [o.e.Point({
                            name: "usage after 1m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("1m"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99e3
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99036
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99072
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99001
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99037
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99073
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99002
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99038
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99074
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99003
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99039
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99075
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 5m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("5m"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99004
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99040
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99076
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99005
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99041
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99077
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99006
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99042
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99078
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99007
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99043
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99079
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 10m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("10m"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99008
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99044
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99080
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99009
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99045
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99081
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99010
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99046
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99082
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99011
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99047
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99083
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 30m",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("30m"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99012
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99048
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99084
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99013
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99049
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99085
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99014
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99050
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99086
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99015
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99051
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99087
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 1h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("1h"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99016
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99052
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99088
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99017
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99053
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99089
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99018
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99054
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99090
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99019
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99055
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99091
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 3h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("3h"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99020
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99056
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99092
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99021
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99057
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99093
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99022
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99058
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99094
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99023
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99059
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99095
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 5h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("5h"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99024
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99060
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99096
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99025
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99061
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99097
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99026
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99062
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99098
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99027
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99063
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99099
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 8h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t <= o.a.time("8h"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99028
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99064
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99100
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99029
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99065
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99204
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99030
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99066
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99205
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99031
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99067
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99206
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usage after 24h",
                            condition: e => {
                                const t = o.a.extractPassedTime(e);
                                return !!(t && t >= o.a.time("24h"))
                            },
                            points: [o.e.Point({
                                name: "<= 10%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 10)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99032
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99068
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99104
                                    }
                                })]
                            }), o.e.Point({
                                name: "10% < percentCPUUsage <= 30%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 30)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99033
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99069
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99105
                                    }
                                })]
                            }), o.e.Point({
                                name: "30% < percentCPUUsage <= 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t <= 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99034
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99070
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99106
                                    }
                                })]
                            }), o.e.Point({
                                name: "percentCPUUsage > 70%",
                                condition: e => {
                                    const t = o.a.extractCPUUsage(e);
                                    return !!(null != t && t > 70)
                                },
                                points: [o.e.Point({
                                    name: "main",
                                    condition: e => e.processName === a.a.Main,
                                    qos: {
                                        cmdId: 99035
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99071
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.SharedWorker,
                                    qos: {
                                        cmdId: 99107
                                    }
                                })]
                            })]
                        })]
                    })
                });
            var m = Object(o.c)({
                metrics: [c, d]
            });
            const u = e => "get" === e || "get-multi" === e || "get-all" === e || "get-all-key" === e || "count" === e ? "read" : "insert" === e || "insert-multi" === e || "update" === e || "update-multi" === e || "get-and-update" === e ? "write" : "delete" === e || "delete-multi" === e || "find-and-delete" === e || "clear" === e ? "delete" : void 0,
                l = Object(o.b)({
                    name: i.a.query_resolution_time,
                    features: [s.b.dal],
                    categories: [s.a.core],
                    showStackTrace: () => !1,
                    statement: o.e.Group(Object(o.e)({
                        name: "duration by query type",
                        points: [o.e.Point({
                            name: "queryType: READ",
                            condition: (e, t) => "read" === u(null == t ? void 0 : t.method),
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99504
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99505
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99506
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99507
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99508
                                }
                            })]
                        }), o.e.Point({
                            name: "queryType: WRITE",
                            condition: (e, t) => "write" === u(null == t ? void 0 : t.method),
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t < o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99509
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99510
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99511
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99512
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99513
                                }
                            })]
                        }), o.e.Point({
                            name: "queryType: DELETE",
                            condition: (e, t) => "delete" === u(null == t ? void 0 : t.method),
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99514
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99515
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99516
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99517
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99518
                                }
                            })]
                        })]
                    }), Object(o.e)({
                        name: "usage time: within first 10m",
                        checkingMode: "all",
                        points: [o.e.Point({
                            name: "usageTime <= 1m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= o.a.time("1m")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99519
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99520
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99521
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99522
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99523
                                }
                            })]
                        }), o.e.Point({
                            name: "usageTime <= 5m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= o.a.time("5m")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99524
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99525
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99526
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99527
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99528
                                }
                            })]
                        }), o.e.Point({
                            name: "usageTime <= 10m",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t <= o.a.time("10m")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99529
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99530
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99531
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99532
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99533
                                }
                            })]
                        })]
                    }), Object(o.e)({
                        name: "usage time: 10m - 5h",
                        checkingMode: "all",
                        points: [o.e.Point({
                            name: "10m < usageTime <= 1h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > o.a.time("10m") && t <= o.a.time("1h")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99534
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99535
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99536
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99537
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99538
                                }
                            })]
                        }), o.e.Point({
                            name: "1h < usageTime <= 5h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > o.a.time("1h") && t <= o.a.time("5h")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99539
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99540
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99541
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99542
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99543
                                }
                            })]
                        })]
                    }), Object(o.e)({
                        name: "usage time: long session",
                        points: [o.e.Point({
                            name: "usageTime > 5h",
                            condition: e => {
                                let {
                                    usageTime: t
                                } = e;
                                return t > o.a.time("5h")
                            },
                            points: [o.e.Point({
                                name: "<= 500ms",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("500ms")
                                },
                                qos: {
                                    cmdId: 99544
                                }
                            }), o.e.Point({
                                name: "500ms < duration <= 1s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("1s")
                                },
                                qos: {
                                    cmdId: 99545
                                }
                            }), o.e.Point({
                                name: "1s < duration <= 5s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("5s")
                                },
                                qos: {
                                    cmdId: 99546
                                }
                            }), o.e.Point({
                                name: "5s < duration <= 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t <= o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99547
                                }
                            }), o.e.Point({
                                name: "duration > 10s",
                                condition: e => {
                                    let {
                                        duration: t
                                    } = e;
                                    return t > o.a.time("10s")
                                },
                                qos: {
                                    cmdId: 99548
                                }
                            })]
                        })]
                    }), Object(o.e)({
                        name: "duration > 10s",
                        points: [o.e.Point({
                            name: "duration > 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99549
                            }
                        })]
                    }))
                }),
                h = Object(o.b)({
                    name: i.a.db_ready,
                    features: [s.b.dal],
                    categories: [s.a.core],
                    statement: Object(o.e)({
                        name: "DB open time",
                        points: [o.e.Point({
                            name: "<= 1s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("1s")
                            },
                            qos: {
                                cmdId: 99500
                            }
                        }), o.e.Point({
                            name: "1s-5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("5s")
                            },
                            qos: {
                                cmdId: 99501
                            }
                        }), o.e.Point({
                            name: "5s-10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99502
                            }
                        }), o.e.Point({
                            name: "> 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99503
                            }
                        })]
                    })
                });
            var p = Object(o.c)({
                metrics: [l, h]
            });
            const g = Object(o.b)({
                    name: i.a.authenticate,
                    features: [s.b.start_up],
                    categories: [s.a.task_latency],
                    statement: Object(o.e)({
                        name: "authenticate",
                        points: [o.e.Point({
                            name: "<= 1s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("1s")
                            },
                            qos: {
                                cmdId: 99605
                            }
                        }), o.e.Point({
                            name: "<= 2s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("2s")
                            },
                            qos: {
                                cmdId: 99606
                            }
                        }), o.e.Point({
                            name: "<= 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("5s")
                            },
                            qos: {
                                cmdId: 99607
                            }
                        }), o.e.Point({
                            name: "> 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > o.a.time("5s")
                            },
                            qos: {
                                cmdId: 99608
                            }
                        })]
                    })
                }),
                _ = Object(o.b)({
                    name: i.a.start_up_time,
                    features: [s.b.start_up],
                    categories: [s.a.ux_latency],
                    fromProcess: [a.a.Main, a.a.Web],
                    startFromEpoch: !0,
                    disabled: !1,
                    statement: Object(o.e)({
                        name: "startup duration",
                        points: [o.e.Point({
                            name: "<= 5s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("5s")
                            },
                            qos: {
                                cmdId: 99600
                            }
                        }), o.e.Point({
                            name: "5s-10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99601
                            }
                        }), o.e.Point({
                            name: "10s-30s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("30s")
                            },
                            qos: {
                                cmdId: 99602
                            }
                        }), o.e.Point({
                            name: "30s-1m",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("1m")
                            },
                            qos: {
                                cmdId: 99603
                            }
                        }), o.e.Point({
                            name: "> 1m",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("1m")
                            },
                            qos: {
                                cmdId: 99604
                            }
                        })]
                    })
                });
            var f = Object(o.c)({
                metrics: [g, _]
            });
            const I = Object(o.b)({
                    name: i.a.conv_load_1st_msg,
                    features: [s.b.chat],
                    categories: [s.a.ux_latency],
                    mode: "sequential"
                }),
                P = Object(o.b)({
                    name: i.a.open_conversation,
                    features: [s.b.chat],
                    categories: [s.a.ux_latency],
                    statement: Object(o.e)({
                        name: "open conversation time",
                        points: [o.e.Point({
                            name: "duration <= 1s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("1s")
                            },
                            qos: {
                                cmdId: 99625
                            }
                        }), o.e.Point({
                            name: "1s < duration <= 3s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("3s")
                            },
                            qos: {
                                cmdId: 99626
                            }
                        }), o.e.Point({
                            name: "3s < duration <= 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t <= o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99627
                            }
                        }), o.e.Point({
                            name: "duration > 10s",
                            condition: e => {
                                let {
                                    duration: t
                                } = e;
                                return t > o.a.time("10s")
                            },
                            qos: {
                                cmdId: 99628
                            }
                        })]
                    })
                });
            var y = Object(o.c)({
                metrics: [I, P]
            });
            const M = function () {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    const [o, s] = t || [];
                    return {
                        avgFps: null == s ? void 0 : s.avgFps,
                        usageTime: null == s ? void 0 : s.usageTime
                    }
                },
                v = Object(o.b)({
                    name: i.a.fps,
                    categories: [s.a.ux_latency],
                    statement: Object(o.e)({
                        name: "fps",
                        points: [o.e.Point({
                            name: "usageTime <= 2m",
                            condition: function (e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) n[s - 1] = arguments[s];
                                const {
                                    usageTime: i
                                } = M(...n);
                                return !!(i && i <= o.a.time("2m"))
                            },
                            points: [o.e.Point({
                                name: "fps <= 12",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 12)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99609
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99617
                                    }
                                })]
                            }), o.e.Point({
                                name: "12 < fps <= 23",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 23)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99610
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99618
                                    }
                                })]
                            }), o.e.Point({
                                name: "[23,24] < fps <= 29",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 29)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99611
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99619
                                    }
                                })]
                            }), o.e.Point({
                                name: "[29,30] < fps <= 60",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 60)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99612
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99620
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "usageTime > 2m",
                            condition: function (e) {
                                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), s = 1; s < t; s++) n[s - 1] = arguments[s];
                                const {
                                    usageTime: i
                                } = M(...n);
                                return !!(i && i > o.a.time("2m"))
                            },
                            points: [o.e.Point({
                                name: "fps <= 12",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 12)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99613
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99621
                                    }
                                })]
                            }), o.e.Point({
                                name: "12 < fps <= 23",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 23)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99614
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99622
                                    }
                                })]
                            }), o.e.Point({
                                name: "[23,24] < fps <= 29",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 29)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99615
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99623
                                    }
                                })]
                            }), o.e.Point({
                                name: "[29,30] < fps <= 60",
                                condition: function (e) {
                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                                    const {
                                        avgFps: s
                                    } = M(...n);
                                    return !!(s && s <= 60)
                                },
                                points: [o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Render,
                                    qos: {
                                        cmdId: 99616
                                    }
                                }), o.e.Point({
                                    name: "render",
                                    condition: e => e.processName === a.a.Web,
                                    qos: {
                                        cmdId: 99624
                                    }
                                })]
                            })]
                        })]
                    })
                });
            var b = Object(o.c)({
                    metrics: [v]
                }),
                w = n("AoYG");
            const S = e => {
                    var t;
                    return null == e || null === (t = e.data) || void 0 === t ? void 0 : t.cpuTotal
                },
                q = e => {
                    var t;
                    return null == e || null === (t = e.data) || void 0 === t ? void 0 : t.memoryTotal
                },
                D = Object(o.e)({
                    name: "CPU used",
                    points: [o.e.Point({
                        name: "usage after 1m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("1m"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99351
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99387
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99352
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99388
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99353
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99389
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99354
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99390
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 5m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("5m"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99355
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99391
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99356
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99392
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99357
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99393
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99358
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99394
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 10m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("10m"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99359
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99395
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99360
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99396
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99361
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99397
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99362
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99398
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 30m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("30m"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99363
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99399
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99364
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99400
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99365
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99401
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99366
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99402
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 1h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("1h"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99367
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99403
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99368
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99404
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99369
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99405
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99370
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99406
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 3h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("3h"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99371
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99407
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99372
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99408
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99373
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99409
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99374
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99410
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 5h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("5h"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99375
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99411
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99376
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99412
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99377
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99413
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99378
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99414
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 8h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("8h"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99379
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99415
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99380
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99416
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99381
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99417
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99382
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99418
                                }
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 24h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("24h"))
                        },
                        points: [o.e.Point({
                            name: "<= 20%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 20)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99383
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99419
                                }
                            })]
                        }), o.e.Point({
                            name: "20% < cpuTotal <= 40%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 40)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99384
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99420
                                }
                            })]
                        }), o.e.Point({
                            name: "40% < cpuTotal <= 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t <= 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99385
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99421
                                }
                            })]
                        }), o.e.Point({
                            name: "cpuTotal > 70%",
                            condition: e => {
                                const t = S(e);
                                return !!(null != t && t > 70)
                            },
                            points: [o.e.Point({
                                name: "window",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99386
                                }
                            }), o.e.Point({
                                name: "macos",
                                condition: () => !1,
                                qos: {
                                    cmdId: 99422
                                }
                            })]
                        })]
                    })]
                }),
                T = Object(o.e)({
                    name: "Memory used",
                    points: [o.e.Point({
                        name: "usage after 1m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("1m"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99207
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99243
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99279
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99315
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99208
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99244
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99280
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99316
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99209
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99245
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99281
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99317
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99210
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99246
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99282
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99318
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 5m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("5m"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99211
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99247
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99283
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99319
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99212
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99248
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99284
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99320
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99213
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99249
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99285
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99321
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99214
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99250
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99286
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99322
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 10m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("10m"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99215
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99251
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99287
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99323
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99216
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99252
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99288
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99324
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99217
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99253
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99289
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99325
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99218
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99254
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99290
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99326
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 30m",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("30m"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99219
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99255
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99291
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99327
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99220
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99256
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99292
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99328
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99221
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99257
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99293
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99329
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99222
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99258
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99294
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99330
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 1h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("1h"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99223
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99259
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99295
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99331
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99224
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99260
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99296
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99332
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99225
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99261
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99297
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99333
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99226
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99262
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99298
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99334
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 3h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("3h"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99227
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99263
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99299
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99335
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99228
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99264
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99300
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99336
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99229
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99265
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99301
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99337
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99230
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99266
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99302
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99338
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 5h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("5h"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99231
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99267
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99303
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99339
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99232
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99268
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99304
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99340
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99233
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99269
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99305
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99341
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99234
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99270
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99306
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99342
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 8h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("8h"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99235
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99271
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99307
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99343
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99236
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99272
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99308
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99344
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99237
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99273
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99309
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99345
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99238
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99274
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99310
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99346
                                    }
                                })]
                            })]
                        })]
                    }), o.e.Point({
                        name: "usage after 24h",
                        condition: e => {
                            const t = o.a.extractPassedTime(e);
                            return !!(t && t <= o.a.time("24h"))
                        },
                        points: [o.e.Point({
                            name: "realMem <= 500MB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("500MB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99239
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99275
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99311
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99347
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "500MB < realMem <= 1GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("1GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99240
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99276
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99312
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99348
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "1GB < realMem <= 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t <= o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99241
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99277
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99313
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99349
                                    }
                                })]
                            })]
                        }), o.e.Point({
                            name: "realMem > 2GB",
                            condition: e => {
                                const t = q(e);
                                return !!(null != t && t > o.a.bytes("2GB"))
                            },
                            points: [o.e.Point({
                                name: "RAM <= 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t <= o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99242
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99278
                                    }
                                })]
                            }), o.e.Point({
                                name: "RAM > 8GB",
                                condition: e => {
                                    const t = o.a.extractRAM(e);
                                    return !!(null != t && t > o.a.bytes("8GB"))
                                },
                                points: [o.e.Point({
                                    name: "window",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99314
                                    }
                                }), o.e.Point({
                                    name: "macos",
                                    condition: () => !1,
                                    qos: {
                                        cmdId: 99350
                                    }
                                })]
                            })]
                        })]
                    })]
                }),
                A = Object(o.b)({
                    name: i.a.app_usage,
                    type: w.a.APP_USAGE,
                    categories: [s.a.usage],
                    statement: o.e.Group(D, T)
                });
            var R = Object(o.c)({
                metrics: [A]
            });
            t.default = Object(o.d)({
                usage: m,
                dal: p,
                fps: b,
                startUp: f,
                conversation: y,
                appUsage: R
            })
        },
        KA3I: function (e, t, n) {
            "use strict";
            var o = n("N1xz"),
                s = n("CHYU"),
                i = n("dFSO");
            t.a = class {
                constructor(e) {
                    this.Logger = void 0, this.Logger = e
                }
                getProcessName(e) {
                    try {
                        return n("T7kW").getName(e) || ""
                    } catch (o) {
                        var t;
                        null === (t = this.Logger) || void 0 === t || t.zsymb(18, 9616, 3e4, "Failed on load module process-register. ERR: {}", o)
                    }
                    return ""
                }
                async run() {
                    if (o.a.process !== s.a.Main) return [];
                    const e = Date.now(),
                        t = n("vbkW").app.getAppMetrics(),
                        a = t.map((e => e.pid));
                    if (!a.length) return [];
                    try {
                        var r;
                        const n = this.getExecutionMethod(),
                            o = await n(a);
                        if (null === (r = this.Logger) || void 0 === r || r.zsymb(3, 9616, 30001, "[ProcessUsage] processesUsage {}", o), o.error) throw o.error;
                        if (o.info) {
                            var c;
                            const n = this.merge(t, o.info),
                                s = Date.now();
                            return null === (c = this.Logger) || void 0 === c || c.zsymb(5, 9616, 30002, "[ProcessUsage] run took {} ms ({})", s - e, Object(i.f)(s - e)), n
                        }
                    } catch (m) {
                        var d;
                        null === (d = this.Logger) || void 0 === d || d.zsymb(23, 9616, 30003, "[ProcessUsage] run failed. ERR {}", m)
                    }
                    return []
                }
                getPidMetrics(e) {
                    return n("vbkW").app.getAppMetrics().find((t => t.pid === e))
                }
                getGPUMetrics() {
                    return n("vbkW").app.getAppMetrics().find((e => "GPU" === e.type))
                }
                merge(e, t) {
                    const n = [];
                    return e.forEach((e => {
                        const o = t[e.pid];
                        o && n.push({
                            pid: e.pid,
                            ppid: o.ppid,
                            name: this.getProcessName(e.pid),
                            type: e.type,
                            cpu: o.cpu,
                            memory: o.memory,
                            sandboxed: e.sandboxed,
                            elapsed: o.elapsed,
                            timestamp: o.timestamp
                        })
                    })), n
                }
                getExecutionMethod() {
                    throw new Error("Platform WEB is not supported yet")
                }
            }
        },
        KBA3: function (e, t, n) {
            "use strict";
            var o = n("VTBJ"),
                s = n("dFSO");
            var i = n("CHYU"),
                a = n("ncfp");
            const r = new class {
                constructor() {
                    this.config = {
                        enable: !1,
                        enable_for_staging_account: !0,
                        enable_submit_qos: !0,
                        enable_fps_monitor: !0,
                        submit_qos_except_dev: !0,
                        allow_measure_usage_by_ps_cmd: !1,
                        allow_measure_app_usage: !1,
                        max_cache_records_resolved: 25,
                        max_starting_process_dictionary: 500,
                        processes_whitelist: [i.a.Main, i.a.Web, i.a.Render, i.a.SharedWorker, i.a.Photo],
                        staging_account: !1
                    }, this.stagingAccountStatus = a.a.PENDING, this.listerners = {}, this.listernerChanged = [], this.init()
                }
                get enable() {
                    return this.config.enable
                }
                init() {
                    0
                }
                mergeSetting(e) {
                    var t;
                    if (!e || "object" != typeof e) return;
                    const n = JSON.parse(JSON.stringify(this.config));
                    this.config = Object(o.a)(Object(o.a)({}, this.config), e || {});
                    for (const o in this.config) {
                        const t = null == e ? void 0 : e[o];
                        if ("staging_account" === o && (this.stagingAccountStatus = t ? a.a.YES : a.a.NO), !Object(s.b)(n[o]) && !Object(s.b)(t)) {
                            const e = this.listerners[o];
                            null != e && e.length && e.forEach((e => e(t)))
                        }
                    }
                    null !== (t = this.listernerChanged) && void 0 !== t && t.length && this.listernerChanged.forEach((e => e()))
                }
                on(e, t) {
                    this.listerners[e] || (this.listerners[e] = []), this.listerners[e].push(t)
                }
                removeListener(e, t) {
                    var n;
                    null !== (n = this.listerners[e]) && void 0 !== n && n.length && (this.listerners[e] = this.listerners[e].filter((e => e !== t)))
                }
                onConfigChange(e) {
                    this.listernerChanged.push(e)
                }
                onEnable(e) {
                    this.on("enable", (t => {
                        t && e()
                    }))
                }
                onDisable(e) {
                    this.on("enable", (t => {
                        t || e()
                    }))
                }
                getConfig() {
                    return this.config
                }
                getStagingAccountStatus() {
                    return this.stagingAccountStatus
                }
            };
            t.a = r
        },
        Mgpg: function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n("XB6V");
            n.d(t, "ZLoggerFactory", (function () {
                return o.a
            }));
            var s = n("7xKq");
            n.d(t, "ZLogger", (function () {
                return s.ZLogger
            }));
            var i = n("7FSS");
            n.d(t, "dangerouslyLogConsole", (function () {
                return i.a
            }));
            var a = n("OMsT");
            n.d(t, "ZLogCollector", (function () {
                return a.a
            }));
            var r = n("jGDt");
            n.d(t, "ZLogSession", (function () {
                return r.a
            }))
        },
        N0Be: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            })), n.d(t, "d", (function () {
                return s
            })), n.d(t, "b", (function () {
                return i
            })), n.d(t, "g", (function () {
                return a
            })), n.d(t, "e", (function () {
                return r
            })), n.d(t, "f", (function () {
                return c
            })), n.d(t, "c", (function () {
                return d
            }));
            const o = "ExistedActionHandlerError",
                s = "NonExistedActionHandlerError",
                i = "InvalidInitializedDataForSecureKeysToMigrateError",
                a = "UninitializedSecureKeysToMigrateError",
                r = "SecureKeysToMigrateInvalidIDBKeyError",
                c = "UnavailableUserIDForKeynameGenerationError",
                d = "MigrateTimeoutError"
        },
        N1xz: function (e, t, n) {
            "use strict";
            var o = n("h0S/"),
                s = n("KBA3"),
                i = n("K+9E"),
                a = n("CHYU");
            class r {
                static get EPOCH() {
                    return this._epoch
                }
                static register(e, t) {
                    this.tokens || (this.tokens = new Map), this.tokens.set(e, t)
                }
                static get MetricManager() {
                    if (!this._metricManager) {
                        const e = i.a.METRIC_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._metricManager = new t, this.tokens.delete(e)
                    }
                    return this._metricManager
                }
                static get SchemaManager() {
                    if (!this._schemaManager) {
                        const e = i.a.METRIC_SCHEMA_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._schemaManager = new t, this.tokens.delete(e)
                    }
                    return this._schemaManager
                }
                static get MetricFactory() {
                    if (!this._metricFactory) {
                        const e = i.a.METRIC_FACTORY,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`[metricz] token "${e}" is not registered`);
                        this._metricFactory = new t, this.tokens.delete(e)
                    }
                    return this._metricFactory
                }
                static get MetricTransporter() {
                    if (!this._metricTransporter) {
                        const e = i.a.METRIC_TRANSPORTER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._metricTransporter = new t, this.tokens.delete(e)
                    }
                    return this._metricTransporter
                }
                static get MetricResolver() {
                    if (!this._metricResolver) {
                        const e = i.a.METRIC_RESOLVER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._metricResolver = new t, this.tokens.delete(e)
                    }
                    return this._metricResolver
                }
                static get UsageMonitor() {
                    if (!this._usageMonitor) {
                        const e = i.a.USAGE_MONITOR,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._usageMonitor = new t, this.tokens.delete(e)
                    }
                    return this._usageMonitor
                }
                static get LocalStat() {
                    if (!this._localStat) {
                        const e = i.a.LOCAL_STAT,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._localStat = new t, this.tokens.delete(e)
                    }
                    return this._localStat
                }
                static get DataManager() {
                    if (!this._dataManager) {
                        const e = i.a.DATA_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._dataManager = new t, this.tokens.delete(e)
                    }
                    return this._dataManager
                }
                static get UIManager() {
                    if (!this._uiManager) {
                        const e = i.a.UI_MANAGER,
                            t = this.tokens.get(e);
                        if (!t) throw new Error(`Metric token "${e}" is not registered`);
                        this._uiManager = new t, this.tokens.delete(e)
                    }
                    return this._uiManager
                }
                static createLogger(e) {
                    try {
                        const {
                            ModuleContainer: t
                        } = n("jDHv"), {
                            ZLoggerFactory: s
                        } = n("Mgpg");
                        return t.resolve(s).createZLogger(o.b.metricz, [e])
                    } catch (t) {}
                }
                static get Logger() {
                    return this._Logger || (this._Logger = this.createLogger("internal")), this._Logger
                }
                static install() {
                    this._installed || (this._installed = !0, this._exited = !1, this.canIUse() && (this.startEpoch(), this.SchemaManager.ready(), this.UsageMonitor.ready(), this.MetricManager.ready(), this.MetricResolver.ready(), this.LocalStat.ready(), this.UIManager.ready()))
                }
                static isInstalled() {
                    return !!this._installed
                }
                static startEpoch() {
                    this._epoch || (this._epoch = Date.now(), this.DataManager.saveEpoch(this.process, this._epoch))
                }
                static get process() {
                    return this._process || (this._process = this.getCurrentProcess()), this._process
                }
                static getCurrentProcess() {
                    switch (__ZaBUNDLENAME__.toLowerCase()) {
                        case "main":
                            return a.a.Main;
                        case "web":
                            return a.a.Web;
                        case "render":
                            return a.a.Render;
                        case "login":
                            return a.a.Login;
                        case "photo":
                            return a.a.Photo;
                        case "shared-worker":
                            return a.a.SharedWorker;
                        default:
                            return a.a.Unknown
                    }
                }
                static canIUse() {
                    return !(!this._installed || this._exited) && s.a.getConfig().processes_whitelist.includes(this.process)
                }
                static exit() {
                    this._exited = !0, this._installed = !1, this.MetricManager.exit(), this.MetricTransporter.exit(), this.UIManager.exit()
                }
            }
            r._Logger = void 0, r._process = void 0, r._metricManager = void 0, r._schemaManager = void 0, r._metricFactory = void 0, r._metricTransporter = void 0, r._metricResolver = void 0, r._usageMonitor = void 0, r._localStat = void 0, r._dataManager = void 0, r._uiManager = void 0, r.tokens = void 0, r._epoch = void 0, r._installed = void 0, r._exited = void 0, t.a = r
        },
        Na1p: function (e, t, n) {
            "use strict";
            (function (e) {
                var o = n("VTBJ"),
                    s = n("ZgEe");
                class i {
                    static start() {
                        var t;
                        !this.started && null !== (t = e) && void 0 !== t && t.cpuUsage && (this.started = !0, this.timer = new s.a, this.startUsage = e.cpuUsage())
                    }
                    static getUsage() {
                        this.started || this.start();
                        const t = e.cpuUsage(this.startUsage),
                            n = this.timer.us,
                            s = (t.system + t.user) / n * 100;
                        return Object(o.a)(Object(o.a)({}, t), {}, {
                            time: n,
                            percent: s
                        })
                    }
                }
                i.timer = void 0, i.startUsage = void 0, i.started = void 0, t.a = i
            }).call(this, n("ckNr"))
        },
        OMsT: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            }));
            var o = n("jDHv");
            const s = Object(o.define)("log-collector")
        },
        T7kW: function (e, t) {
            e.exports = new class {
                constructor() {
                    this._reverse = {}
                }
                subcribeMainIPC(e) {
                    e.on("zmain_register_process", ((e, t, n, o) => {
                        this.register(t, n, o)
                    }))
                }
                register(e, t, n) {
                    this._reverse[t] = e
                }
                getName(e) {
                    return this._reverse[e]
                }
            }
        },
        XB6V: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            }));
            var o = n("jDHv");
            const s = Object(o.define)("zlogger-factory")
        },
        ZcVI: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            })), n.d(t, "b", (function () {
                return s
            })), n.d(t, "c", (function () {
                return i
            })), n.d(t, "d", (function () {
                return a
            })), n.d(t, "h", (function () {
                return r
            })), n.d(t, "i", (function () {
                return c
            })), n.d(t, "j", (function () {
                return d
            })), n.d(t, "m", (function () {
                return m
            })), n.d(t, "k", (function () {
                return u
            })), n.d(t, "l", (function () {
                return l
            })), n.d(t, "e", (function () {
                return h
            })), n.d(t, "f", (function () {
                return p
            })), n.d(t, "g", (function () {
                return g
            }));
            const o = "conversation",
                s = "friend",
                i = "group",
                a = "group_info",
                r = "ac",
                c = "acv2",
                d = "aco",
                m = "sock_msg",
                u = "sock_ac",
                l = "sock_aco",
                h = "actr",
                p = "actrv2",
                g = "actro"
        },
        ZgEe: function (e, t, n) {
            "use strict";
            (function (e) {
                t.a = class {
                    constructor() {
                        this.t0 = void 0, this.t0 = e.hrtime.bigint()
                    }
                    get ms() {
                        const t = e.hrtime.bigint();
                        return Number(t - this.t0) / 1e6
                    }
                    get us() {
                        const t = e.hrtime.bigint();
                        return Number(t - this.t0) / 1e3
                    }
                }
            }).call(this, n("ckNr"))
        },
        bH0y: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return a
            }));
            var o = n("+7Kn"),
                s = n("wudS"),
                i = n("Cvfp");
            const a = new class {
                constructor() {
                    this._localStorageKeys = null, this._indexedDBKeys = null, this._keyName = null
                }
                init(e) {
                    if (!e) throw new o.b;
                    const t = `${Object(s.b)(e)}_sktmig`;
                    this._keyName = t;
                    let n = {
                        l: [],
                        i: []
                    };
                    const i = window.localStorage.getItem(t);
                    null !== i && (n = JSON.parse(i));
                    const {
                        l: a,
                        i: r
                    } = n;
                    this._localStorageKeys = a, this._indexedDBKeys = r
                }
                _hasInitialized() {
                    return null !== this._keyName && null !== this._localStorageKeys && null !== this._indexedDBKeys
                }
                _getKeyName() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._keyName
                }
                _getSecureIndexedDBKey(e, t, n) {
                    return [e, t, n].join(i.a)
                }
                getSecureIndexedDBKeyObject(e) {
                    const t = e.split(i.a);
                    if (3 !== t.length) throw new o.e;
                    const [n, s, a] = t;
                    return {
                        dbName: n,
                        storeName: s,
                        keyName: a
                    }
                }
                getLocalStorageKeys() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._localStorageKeys
                }
                getIndexedDBKeys() {
                    if (!this._hasInitialized()) throw new o.g;
                    return this._indexedDBKeys
                }
                isLocalStorageKeyMarked(e) {
                    return this.getLocalStorageKeys().includes(e)
                }
                markLocalStorageKey(e) {
                    this.isLocalStorageKeyMarked(e) || this.getLocalStorageKeys().push(e)
                }
                unmarkLocalStorageKey(e) {
                    if (!this.isLocalStorageKeyMarked(e)) return;
                    const t = this.getLocalStorageKeys().indexOf(e);
                    this.getLocalStorageKeys().splice(t, 1)
                }
                isIndexedDBKeyMarked(e) {
                    return this.getIndexedDBKeys().includes(e)
                }
                markIndexedDBKey(e, t, n) {
                    const o = this._getSecureIndexedDBKey(e, t, n);
                    this.isIndexedDBKeyMarked(o) || this.getIndexedDBKeys().push(o)
                }
                unmarkIndexedDBKey(e, t, n) {
                    const o = this._getSecureIndexedDBKey(e, t, n);
                    if (!this.isIndexedDBKeyMarked(o)) return;
                    const s = this.getIndexedDBKeys().indexOf(o);
                    this.getIndexedDBKeys().splice(s, 1)
                }
                save() {
                    if (!this._hasInitialized()) return;
                    const e = {
                        l: this.getLocalStorageKeys(),
                        i: this.getIndexedDBKeys()
                    };
                    window.localStorage.setItem(this._getKeyName(), JSON.stringify(e))
                }
            }
        },
        buT3: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return i
            }));
            const o = "LOCAL_STORAGE_MODE/DEFAULT",
                s = "LOCAL_STORAGE_MODE/DRY";
            const i = new class {
                constructor() {
                    this._mode = o
                }
                turnOnDryMode() {
                    this._mode = s
                }
                turnOnDefaultMode() {
                    this._mode = o
                }
                hasItem(e) {
                    return null !== window.localStorage.getItem(e)
                }
                setItem(e, t) {
                    this._mode !== s && window.localStorage.setItem(e, t)
                }
                getItem(e) {
                    return window.localStorage.getItem(e)
                }
                removeItem(e) {
                    window.localStorage.removeItem(e)
                }
                getAllKeyNames() {
                    return Object.keys(window.localStorage)
                }
            }
        },
        cfqX: function (e, t, n) {
            "use strict";
            var o = n("N1xz"),
                s = n("K+9E");
            const i = e => e ? e - o.a.EPOCH : Date.now() - o.a.EPOCH,
                a = e => {
                    var t, n;
                    const s = {
                        duration: null !== (t = e.duration) && void 0 !== t ? t : 0,
                        usageTime: i(e.endAt),
                        data: e.exposeInfo(),
                        processName: o.a.process,
                        systemInfo: o.a.UsageMonitor.getSystemInfo()
                    };
                    null !== (n = e.stackTrace) && void 0 !== n && n.length && (s.stackTrace = e.stackTrace);
                    return [s, ...e.info || []]
                },
                r = e => {
                    let t = 0;
                    if (e.trim())
                        for (let o = 0; o < e.length; o++) t = 31 * t + e.charCodeAt(o), t = (n = t) > 2147483647 || n < -2147483648 ? 4294967295 & n : n;
                    var n;
                    return t
                };
            var c = n("fbdB");
            var d = class {
                    constructor(e) {
                        this.epoch = void 0, this.processName = void 0, this.events = void 0, this.processName = e, this.events = []
                    }
                    getName() {
                        return this.processName
                    }
                    add(e, t) {
                        this.events.some((n => n.name === e && n.time === t)) || this.events.push({
                            name: e,
                            time: t
                        })
                    }
                    saveEpoch(e) {
                        this.epoch || (this.epoch = e), this.add(c.a.bootstrap, e)
                    }
                    getEpoch() {
                        return this.epoch
                    }
                    get(e) {
                        return this.events.filter((t => t.name === e))[0]
                    }
                    getAll() {
                        return this.events
                    }
                    merge(e) {
                        const t = e.getEpoch();
                        t && this.saveEpoch(t), e.getAll().forEach((e => {
                            this.add(e.name, e.time)
                        })), this.events = this.events.sort(((e, t) => e.time - t.time))
                    }
                    hashCode() {
                        return r(`${this.epoch}`) ^ r(this.processName) ^ r(JSON.stringify(this.events))
                    }
                    cleanUp() {
                        this.events = []
                    }
                },
                m = n("KBA3");
            o.a.register(s.a.DATA_MANAGER, class {
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("data-manager")), this._logger
                }
                constructor() {
                    this.process = void 0, this.processEvents = {}, this._logger = void 0, this.process = new d(o.a.process), m.a.onDisable((() => this.cleanUp))
                }
                cleanUp() {
                    this.processEvents = {}, this.process.cleanUp()
                }
                getProcess(e) {
                    return e && e !== o.a.process ? (this.processEvents[e] || (this.processEvents[e] = new d(e)), this.processEvents[e]) : this.process
                }
                saveEvent(e, t) {
                    this.getProcess().add(e, t)
                }
                getEvent(e) {
                    return this.getProcess().get(e)
                }
                saveEpoch(e, t) {
                    this.getProcess(e).saveEpoch(t)
                }
                getEpoch(e) {
                    return this.getProcess(e).getEpoch()
                }
                getCurrentProcessData() {
                    return this.process
                }
                getOtherProcessData() {
                    return Object.values(this.processEvents)
                }
                mergeProcessData(e) {
                    this.getProcess(e.getName()).merge(e)
                }
                freezeProcessData(e) {
                    return {
                        epoch: e.getEpoch(),
                        processName: e.getName(),
                        events: e.getAll()
                    }
                }
                hydrateProcessData(e) {
                    try {
                        if (e.processName) {
                            var t;
                            const n = new d(e.processName);
                            return e.epoch && !isNaN(Number(e.epoch)) && n.saveEpoch(Number(e.epoch)), null !== (t = e.events) && void 0 !== t && t.length && e.events.forEach((e => {
                                e.name && !isNaN(Number(e.time)) && n.add(e.name, Number(e.time))
                            })), n
                        }
                    } catch (o) {
                        var n;
                        null === (n = this.Logger) || void 0 === n || n.zsymb(23, 9588, 3e4, "Fail on hydrate process data. ERR {}", String(o))
                    }
                }
                getHashCode() {
                    const e = this.process.hashCode();
                    let t = 0;
                    return Object.values(this.processEvents).forEach((e => t += e.hashCode())), e + t
                }
            });
            var u = n("CHYU");
            var l = class {
                constructor(e) {
                    this.record = void 0, this.record = e
                }
                end(e) {
                    if (!this.record || this.record.isDone) return;
                    const t = Date.now();
                    o.a.MetricManager.endRecord(this.record, t, e)
                }
                pushInfo(e) {
                    this.record && !this.record.isDone && this.record.pushInfo(e)
                }
            };
            var h = class {
                constructor() {
                    this.startingProcess = void 0, this.startingProcess = new Map
                }
                findStartingProcess(e) {
                    return this.startingProcess.get(e)
                }
                saveStartingProcess(e, t) {
                    if (!this.startingProcess.has(e)) {
                        if (this.startingProcess.size >= m.a.getConfig().max_starting_process_dictionary) {
                            const [e] = Array.from(this.startingProcess.keys());
                            this.startingProcess.delete(e)
                        }
                        return this.startingProcess.set(e, t)
                    }
                }
                cleanUp() {
                    this.startingProcess = new Map
                }
            };
            const p = new Set([c.b.start_up_time]);
            o.a.register(s.a.METRIC_MANAGER, class {
                constructor() {
                    this._records = void 0, this._logger = void 0, this._history = void 0, this._oneTimeMetrics = void 0, this.isEnabled = void 0
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("manager")), this._logger
                }
                get records() {
                    return this._records || (this._records = {}), {
                        set: e => {
                            const t = e.key;
                            this._records[t] || (this._records[t] = []), this._records[t].push(e)
                        },
                        get: (e, t, n) => {
                            const s = o.a.MetricFactory.getKey(e, t),
                                i = this._records[s];
                            return null != i && i.length && n ? i.find(n) : null == i ? void 0 : i[0]
                        },
                        delete: e => {
                            const t = e.key;
                            if (this._records[t]) {
                                const n = this._records[t].findIndex((t => t == e));
                                n > -1 && this._records[t].splice(n, 1)
                            }
                        }
                    }
                }
                get OneTimeMetrics() {
                    return {
                        setStart: e => {
                            this._oneTimeMetrics || (this._oneTimeMetrics = new Set);
                            const t = `${e}_start`;
                            this._oneTimeMetrics.add(t)
                        },
                        hasStart: e => {
                            var t;
                            const n = `${e}_start`;
                            return !(null === (t = this._oneTimeMetrics) || void 0 === t || !t.has(n))
                        },
                        setEnd: e => {
                            this._oneTimeMetrics || (this._oneTimeMetrics = new Set);
                            const t = `${e}_end`;
                            this._oneTimeMetrics.add(t)
                        },
                        hasEnd: e => {
                            var t;
                            const n = `${e}_end`;
                            return !(null === (t = this._oneTimeMetrics) || void 0 === t || !t.has(n))
                        }
                    }
                }
                get history() {
                    return this._history || (this._history = new h), this._history
                }
                ready() {
                    m.a.onConfigChange((() => {
                        o.a.process === u.a.Render && o.a.MetricTransporter.transmitConfig();
                        const e = m.a.getConfig().enable_for_staging_account,
                            t = m.a.getConfig().staging_account;
                        this.isEnabled = m.a.enable || e && t, this.isEnabled || this.cleanUp()
                    }))
                }
                cleanUp() {
                    this._records = {}, this._oneTimeMetrics = new Set, this.history.cleanUp()
                }
                exit() {
                    o.a.process === u.a.Main && (o.a.UsageMonitor.exit(), o.a.LocalStat.export(!0))
                }
                record(e) {
                    if (!o.a.isInstalled() || !o.a.canIUse()) return;
                    if (!1 === this.isEnabled) return;
                    const t = Date.now();
                    o.a.DataManager.saveEvent(e, t), e === c.a.main_ready && o.a.process === u.a.Main && o.a.MetricTransporter.init(), o.a.MetricResolver.resolveEvent(e, t)
                }
                handleOneTimeMetric(e, t) {
                    p.has(e) && (t ? this.OneTimeMetrics.setStart(e) : this.OneTimeMetrics.setEnd(e))
                }
                start(e, t) {
                    if (!o.a.canIUse() || this.OneTimeMetrics.hasStart(e)) return this.createSection();
                    if (!1 === this.isEnabled) return this.createSection();
                    const n = Date.now(),
                        s = o.a.SchemaManager.loadSchema(e);
                    if (s.disabled) return this.createSection();
                    this.handleOneTimeMetric(e, !0);
                    const i = o.a.MetricFactory.create(e, t, s);
                    return i.setStartAt(n), this.processStackTrace(i), this.records.set(i), o.a.MetricTransporter.checkConnection(), this.history.saveStartingProcess(e, o.a.process), this.createSection(i)
                }
                end(e, t, n) {
                    if (!o.a.canIUse() || this.OneTimeMetrics.hasEnd(e)) return;
                    if (!1 === this.isEnabled) return;
                    const s = Date.now(),
                        i = o.a.SchemaManager.loadSchema(e);
                    if (i.disabled) return;
                    this.handleOneTimeMetric(e, !1);
                    let a = this.records.get(e, t, (e => !!(e.startAt && e.startAt <= s)));
                    if (!a && this.isFromCurrentEpoch(e) && (a = this.createPartialFromCurrentEpoch(e, t)), a) this.endRecord(a, s, n);
                    else {
                        if (this.isFromCurrentProcess(e)) return;
                        const a = o.a.MetricFactory.create(e, t, i, !0);
                        a.setEndAt(s), a.pushInfo(n), a.evaluate(), o.a.MetricTransporter.transmit(a)
                    }
                }
                endRecord(e, t, n) {
                    e.isDone || (null != n && e.pushInfo(n), e.setEndAt(t), e.evaluate(), this.processStackTrace(e, !0), this.resolve(e))
                }
                createSection(e) {
                    return new l(e)
                }
                resolve(e) {
                    this.records.delete(e), o.a.MetricResolver.resolve(e)
                }
                onReceivePartialRecords(e) {
                    var t;
                    if (!1 === this.isEnabled) return [];
                    const n = [];
                    return e.forEach((e => {
                        if (this.OneTimeMetrics.hasStart(e.name)) return;
                        this.handleOneTimeMetric(e.name, !0);
                        let t = this.records.get(e.name, e.key, (t => !!(e.type === t.type && t.startAt && e.endAt && t.startAt <= e.endAt)));
                        !t && this.isFromCurrentProcess(e.name) && (t = this.createPartialFromCurrentEpoch(e.name, e.key)), t ? t.isDone || (t.evaluate(e), this.resolve(t)) : n.push(e)
                    })), n.length && (null === (t = this.Logger) || void 0 === t || t.zsymb(11, 9584, 3e4, "[WARN] receive unknownRecords: {}", n)), n
                }
                isFromCurrentEpoch(e, t) {
                    let n = t;
                    return n || (n = o.a.SchemaManager.loadSchema(e)), !!n.startFromEpoch && (Array.isArray(n.fromProcess) ? n.fromProcess.some((e => e === o.a.process)) : !n.fromProcess || n.fromProcess === o.a.process)
                }
                isFromCurrentProcess(e, t) {
                    var n;
                    if (this.history.findStartingProcess(e) === o.a.process) return !0;
                    let s = t;
                    return s || (s = o.a.SchemaManager.loadSchema(e)), !(null === (n = s) || void 0 === n || !n.fromProcess) && (Array.isArray(s.fromProcess) ? s.fromProcess.some((e => e === o.a.process)) : s.fromProcess === o.a.process)
                }
                createPartialFromCurrentEpoch(e, t) {
                    const n = o.a.SchemaManager.loadSchema(e),
                        s = o.a.MetricFactory.create(e, t, n);
                    return s.setStartAt(o.a.EPOCH), this.records.set(s), s
                }
                processStackTrace(e, t) {
                    if (t || e.stackTrace) {
                        if (t && e.stackTrace) {
                            const t = e.getSchema();
                            let n = !1;
                            null != t && t.showStackTrace && (n = "boolean" == typeof t.showStackTrace ? t.showStackTrace : t.showStackTrace(...a(e))), n || e.deleteStackTrace()
                        }
                    } else {
                        let t = [];
                        const n = (new Error).stack.split("\n");
                        0 === n[0].indexOf("Error") && (t = n.slice(1)), t = t.slice(3).map((e => e.replace(/\s+at\s+/, ""))), e.addStackTrace(t)
                    }
                }
            });
            var g = n("rFEu"),
                _ = n("AoYG");
            o.a.register(s.a.METRIC_SCHEMA_MANAGER, class {
                constructor() {
                    this.metricSchemas = void 0, this._customMetrics = void 0, this.isReady = void 0
                }
                get customMetrics() {
                    return this._customMetrics || (this._customMetrics = new Map), this._customMetrics
                }
                ready() {
                    if (this.isReady) return;
                    this.metricSchemas = new Map;
                    n("K6Wi").default.getSchemas().forEach((e => {
                        e.getMetrics().forEach((e => {
                            this.metricSchemas.set(e.name, e)
                        }))
                    })), this.isReady = !0, m.a.onDisable((() => this.cleanUp))
                }
                cleanUp() {
                    this.metricSchemas.clear(), this._customMetrics && this._customMetrics.clear()
                }
                loadSchema(e) {
                    this.isReady || this.ready();
                    const t = this.metricSchemas.get(e);
                    if (t) return t;
                    const n = Object(g.b)(e);
                    return this.customMetrics.set(e, n), n
                }
                getMemoryUsageSchemas() {
                    this.isReady || this.ready();
                    let e = [];
                    return this.metricSchemas.forEach((t => {
                        t.type === _.a.MEMORY && e.push(t)
                    })), e
                }
                getCPUUsageSchemas() {
                    this.isReady || this.ready();
                    let e = [];
                    return this.metricSchemas.forEach((t => {
                        t.type === _.a.CPU && e.push(t)
                    })), e
                }
                hasUsageSchemas() {
                    return !!this.getMemoryUsageSchemas().length || !!this.getCPUUsageSchemas().length
                }
            });
            var f = n("VTBJ"),
                I = n("dFSO");
            class P {
                constructor(e) {
                    this.schema = void 0, this.id = void 0, this.name = void 0, this.key = void 0, this.type = void 0, this.startAt = void 0, this.endAt = void 0, this.stackTrace = void 0, this.duration = void 0, this.durationText = void 0, this.version = void 0, this.isDone = void 0, this.info = void 0, this.usageTime = void 0, this.usageTimeText = void 0, this.data = void 0, this.id = e.id, this.name = e.name, this.key = e.key, this.type = e.type || _.a.TIME, this.schema = e.metricSchema, this.version = e.version || P.DEFAULT_VERSION
                }
                setStartAt(e) {
                    this.startAt = e
                }
                setEndAt(e) {
                    this.endAt = e
                }
                addStackTrace(e) {
                    this.stackTrace = [...this.stackTrace || [], ...e]
                }
                deleteStackTrace() {
                    this.stackTrace = void 0
                }
                exposeInfo() {
                    var e;
                    return null !== (e = this.data) && void 0 !== e ? e : null
                }
                setData(e) {
                    this.data = e
                }
                resolve() {
                    this.isDone = !0
                }
                getSchema() {
                    return this.schema
                }
                pushInfo(e) {
                    this.info || (this.info = []), this.info.push(e)
                }
                evaluate(e) {
                    this.isDone || (e && e.endAt && (this.endAt = e.endAt), this.startAt && this.endAt && (this.duration = this.endAt - this.startAt, this.durationText = Object(I.f)(this.duration)), this.endAt && (this.usageTime = i(this.endAt), this.usageTime && (this.usageTimeText = Object(I.f)(this.usageTime))))
                }
                clone(e) {
                    null != e.startAt && (this.startAt = Number(e.startAt)), null != e.endAt && (this.endAt = Number(e.endAt)), null != e.duration && (this.duration = Number(e.duration)), null != e.data && (this.data = e.data), this.durationText = e.durationText, this.isDone = !0 === e.isDone, this.usageTime = e.usageTime, this.usageTimeText = e.usageTimeText;
                    try {
                        e.stackTrace && (this.stackTrace = e.stackTrace), e.info && (this.info = JSON.parse(e.info) || [])
                    } catch (t) {}
                }
            }
            P.DEFAULT_VERSION = 1;
            var y = P;
            class M extends y {
                constructor(e) {
                    super(e), this.type = _.a.TIME, this.version = M.VERSION
                }
                evaluate(e) {
                    super.evaluate(e)
                }
                exposeInfo() {
                    return {
                        name: this.name,
                        duration: this.duration,
                        startAt: this.startAt,
                        endAt: this.endAt
                    }
                }
                resolve() {
                    this.isDone || (this.info = [...this.info || [], {
                        duration: this.duration,
                        startAt: this.startAt,
                        endAt: this.endAt
                    }], super.resolve())
                }
            }
            M.VERSION = 1;
            var v = M;
            class b extends y {
                constructor(e) {
                    super(e), this.usage = void 0, this.passedTime = void 0, this.type = _.a.USAGE, this.version = b.VERSION
                }
                evaluate() {
                    super.evaluate()
                }
                exposeInfo() {
                    return {
                        usage: this.usage,
                        passedTime: this.passedTime
                    }
                }
                resolve() {
                    super.resolve()
                }
                setData(e, t) {
                    this.usage = e, this.passedTime = t
                }
            }
            b.VERSION = 1;
            var w, S = b;
            o.a.register(s.a.METRIC_FACTORY, class {
                    constructor() {
                        this.idCounter = void 0
                    }
                    generateId() {
                        return null == this.idCounter && (this.idCounter = 0), this.idCounter++, this.idCounter
                    }
                    getKey(e, t) {
                        return e + (null != t ? `_${t}` : "")
                    }
                    create(e, t, n, o) {
                        let s;
                        const i = (null == n ? void 0 : n.type) || _.a.TIME;
                        return s = i === _.a.CPU || i === _.a.MEMORY ? new S({
                            id: this.generateId(),
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }) : i === _.a.TIME ? new v({
                            id: o ? 0 : this.generateId(),
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }) : new y({
                            id: o ? 0 : this.generateId(),
                            type: i,
                            name: e,
                            key: this.getKey(e, t),
                            metricSchema: n
                        }), s
                    }
                    clone(e) {
                        let t;
                        const n = (null == e ? void 0 : e.type) || _.a.TIME,
                            o = {
                                id: this.generateId(),
                                type: n,
                                name: e.name,
                                key: e.key,
                                version: e.version
                            };
                        return t = n === _.a.USAGE ? new S(Object(f.a)({}, o)) : n === _.a.TIME ? new v(Object(f.a)({}, o)) : new y(Object(f.a)({}, o)), t.clone(e), t
                    }
                }),
                function (e) {
                    e.TRANSMIT_RECORDS = "TRANSMIT_RECORDS", e.TRANSMIT_ALL = "TRANSMIT_ALL", e.TRANSMIT_EVENTS = "TRANSMIT_EVENTS", e.TRANSMIT_CONFIG = "TRANSMIT_CONFIG", e.TRANSMIT_FPS = "TRANSMIT_FPS", e.REGISTER = "REGISTER", e.SEND_STATS = "SEND_STATS"
                }(w || (w = {}));
            var q = w;
            var D = class {
                constructor(e) {
                    this.messageChannel = void 0, this.transportDataHolder = void 0, this.sending = void 0, this.sendingTimeout = void 0, this.idleRequestId = void 0, this.lastSentDataManagerHash = void 0, this.requestIdle = e => {
                        try {
                            var t;
                            if (o.a.process !== u.a.Main)
                                if (window && "function" == typeof (null === (t = window) || void 0 === t ? void 0 : t.requestIdleCallback)) return window.requestIdleCallback(e)
                        } catch (n) {}
                        return setTimeout((() => {
                            e()
                        }), 1)
                    }, this.cancelRequestIdle = () => {
                        try {
                            var e;
                            if (o.a.process !== u.a.Main)
                                if ("number" == typeof this.idleRequestId) return window && "function" == typeof (null === (e = window) || void 0 === e ? void 0 : e.requestIdleCallback) && window.cancelIdleCallback(this.idleRequestId), void(this.idleRequestId = void 0)
                        } catch (t) {}
                        clearTimeout(this.idleRequestId)
                    }, this.messageChannel = e, this.transportDataHolder = {}, this.sending = !1
                }
                send(e, t, n, o) {
                    var s;
                    if (!this.messageChannel) return;
                    let i = n;
                    if (Array.isArray(n)) {
                        var a, r;
                        let o = [];
                        const s = null === (a = this.transportDataHolder[e]) || void 0 === a || null === (r = a.data) || void 0 === r ? void 0 : r[t];
                        Array.isArray(s) && null != s && s.length && (o = [...s, ...n], i = o)
                    } else if ("object" == typeof n) {
                        var c, d;
                        const n = null === (c = this.transportDataHolder[e]) || void 0 === c || null === (d = c.data) || void 0 === d ? void 0 : d[t];
                        n && (i = Object(f.a)(Object(f.a)({}, n || {}), i))
                    }
                    const m = {
                        action: e,
                        data: Object(f.a)(Object(f.a)({}, (null === (s = this.transportDataHolder[e]) || void 0 === s ? void 0 : s.data) || {}), {}, {
                            [t]: i
                        }),
                        fromClientId: null == o ? void 0 : o.fromClientId,
                        toClientId: null == o ? void 0 : o.toClientId
                    };
                    this.transportDataHolder[e] = m, this.startSend()
                }
                exit() {
                    this.sending && (clearTimeout(this.sendingTimeout), this.cancelRequestIdle())
                }
                startSend() {
                    this.sending || (this.sending = !0, clearTimeout(this.sendingTimeout), this.cancelRequestIdle(), this.sendingTimeout = setTimeout((() => {
                        this.idleRequestId = this.requestIdle((() => {
                            if (this.messageChannel) {
                                const e = this.transportDataHolder;
                                this.transportDataHolder = {};
                                const t = this.getExtraTransferInfo();
                                let n = !!t;
                                const o = [];
                                Object.values(e).forEach((e => {
                                    const s = {
                                        action: e.action,
                                        data: e.data
                                    };
                                    n && "object" == typeof s.data && (s.data.extraInfo = t, n = !1), o.push(s)
                                })), o.length && this.messageChannel.send(o)
                            }
                            this.sending = !1
                        }))
                    }), 3e3))
                }
                getExtraTransferInfo() {
                    if (this.lastSentDataManagerHash !== o.a.DataManager.getHashCode()) {
                        this.lastSentDataManagerHash = o.a.DataManager.getHashCode();
                        const e = o.a.DataManager.getCurrentProcessData();
                        return {
                            processData: o.a.DataManager.freezeProcessData(e)
                        }
                    }
                }
            };
            var T, A = class {
                constructor(e) {
                    this.messageChannel = void 0, this.sender = void 0, this.Logger = void 0, this.onMessage = e => {
                        e.forEach((e => {
                            if (o.a.process === u.a.Main) {
                                var t;
                                const {
                                    fromClientId: r,
                                    action: d,
                                    data: u
                                } = e;
                                var n;
                                if (this.onReceiveProcessEventData(null == u || null === (t = u.extraInfo) || void 0 === t ? void 0 : t.processData), d === q.TRANSMIT_RECORDS) {
                                    if (null != u && null !== (n = u.records) && void 0 !== n && n.length) {
                                        const e = [];
                                        u.records.forEach((t => {
                                            const n = this.hydrateMetricRecord(t);
                                            n && e.push(n)
                                        }));
                                        const t = o.a.MetricManager.onReceivePartialRecords(e);
                                        if (t.length) {
                                            const e = this.messageChannel.getClients().filter((e => e.id !== r));
                                            if (e.length)
                                                for (const n of e) {
                                                    var s;
                                                    null === (s = this.sender) || void 0 === s || s.send(q.TRANSMIT_RECORDS, "records", t, {
                                                        fromClientId: r,
                                                        toClientId: n.id
                                                    })
                                                }
                                        }
                                    }
                                } else if (d === q.REGISTER);
                                else if (d === q.TRANSMIT_ALL) {
                                    var i;
                                    null != u && null !== (i = u.records) && void 0 !== i && i.length && u.records.forEach((e => {
                                        const t = this.hydrateMetricRecord(e);
                                        t && o.a.LocalStat.record(t)
                                    }))
                                } else if (d === q.SEND_STATS) try {
                                        const e = u.processStats;
                                        e && o.a.UsageMonitor.onReceiveProcessStats(e)
                                    } catch (c) {} else if (d === q.TRANSMIT_EVENTS) this.onReceiveProcessEventData(u.processData);
                                    else if (d === q.TRANSMIT_CONFIG) {
                                    (null == u ? void 0 : u.config) && m.a.mergeSetting(u.config);
                                    const e = this.messageChannel.getClients().filter((e => e.id !== r));
                                    if (e.length)
                                        for (const t of e) {
                                            var a;
                                            null === (a = this.sender) || void 0 === a || a.send(q.TRANSMIT_CONFIG, "config", m.a.getConfig(), {
                                                fromClientId: r,
                                                toClientId: t.id
                                            })
                                        }
                                } else d === q.TRANSMIT_FPS && null != u && u.fps && o.a.LocalStat.recordFps(u.fps)
                            } else {
                                const {
                                    action: t,
                                    data: n
                                } = e;
                                var r;
                                if (t === q.TRANSMIT_RECORDS) null != n && null !== (r = n.records) && void 0 !== r && r.length && o.a.MetricManager.onReceivePartialRecords(n.records);
                                else t === q.TRANSMIT_CONFIG && (null == n ? void 0 : n.config) && m.a.mergeSetting(n.config)
                            }
                        }))
                    }, this.Logger = e
                }
                listen(e) {
                    var t;
                    this.messageChannel = e, null === (t = this.messageChannel) || void 0 === t || t.onMessage(this.onMessage)
                }
                bindSender(e) {
                    this.sender = e
                }
                onReceiveProcessEventData(e) {
                    if (e) {
                        const t = o.a.DataManager.hydrateProcessData(e);
                        t && o.a.DataManager.mergeProcessData(t)
                    }
                }
                hydrateMetricRecord(e) {
                    try {
                        return o.a.MetricFactory.clone(e)
                    } catch (n) {
                        var t;
                        null === (t = this.Logger) || void 0 === t || t.zsymb(23, 9593, 3e4, "Can not hydrate reccord: {}", e)
                    }
                }
            };
            ! function (e) {
                e.RENDERER = "metricz-renderer", e.MAIN = "metricz-main"
            }(T || (T = {}));
            o.a.register(s.a.METRIC_TRANSPORTER, class {
                constructor() {
                    this.messageChannel = void 0, this.isReady = !1, this.registered = void 0, this._sender = void 0, this._receiver = void 0, this._logger = void 0
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("transporter")), this._logger
                }
                createMessageChannel() {
                    if (this.messageChannel) return;
                    let e;
                    try {
                        0
                    } catch (n) {
                        var t;
                        null === (t = this.Logger) || void 0 === t || t.zsymb(23, 9582, 3e4, "Fail on create message channel. ERR {}", String(n))
                    }
                    this.receiver.listen(this.messageChannel)
                }
                get sender() {
                    return this._sender || (this._sender = new D(this.messageChannel)), this._sender
                }
                get receiver() {
                    return this._receiver || (this._receiver = new A(this.Logger)), this._receiver.bindSender(this.sender), this._receiver
                }
                ready() {
                    this.isReady || (this.isReady = !0, this.createMessageChannel())
                }
                init() {
                    var e;
                    this.createMessageChannel(), null === (e = this.Logger) || void 0 === e || e.zsymb(5, 9582, 30001, "[transporter] init. process {}", o.a.process)
                }
                transmit(e) {
                    if (this.ready(), o.a.process !== u.a.Main) {
                        const t = [this.freezeMetricRecord(e)];
                        this.sender.send(q.TRANSMIT_RECORDS, "records", t)
                    }
                }
                checkConnection() {
                    var e;
                    this.registered || o.a.process === u.a.Main || (this.registered || (this.registered = !0, this.ready(), this.sender.send(q.REGISTER, "processName", o.a.process), null === (e = this.Logger) || void 0 === e || e.zsymb(5, 9582, 30002, "register. process {}", o.a.process)))
                }
                transmitProcessStats(e) {
                    o.a.process !== u.a.Main && (this.ready(), this.sender.send(q.SEND_STATS, "processStats", e))
                }
                transmitRecords(e) {
                    if (this.ready(), o.a.process !== u.a.Main) {
                        const t = e.map((e => this.freezeMetricRecord(e)));
                        this.sender.send(q.TRANSMIT_ALL, "records", t)
                    }
                }
                transmitEvents() {
                    this.sender.send(q.TRANSMIT_EVENTS, "extraInfo", {})
                }
                transmitConfig() {
                    this.sender.send(q.TRANSMIT_CONFIG, "config", m.a.getConfig())
                }
                transmitFps(e, t, n) {
                    this.sender.send(q.TRANSMIT_FPS, "fps", Object(f.a)({
                        processName: o.a.process,
                        recordAt: t,
                        usageTime: n
                    }, e))
                }
                exit() {
                    this.sender.exit()
                }
                freezeMetricRecord(e) {
                    return JSON.parse(JSON.stringify(Object(f.a)(Object(f.a)({}, e), {}, {
                        info: JSON.stringify(e.info)
                    })))
                }
            });
            n("ncfp");
            var R = class {
                constructor() {
                    this.qosLogControl = void 0, this.reservedLogs = void 0, this.enabled = !0, this.tsMaxReserved = void 0, this.MAX_RESERVED_LOGS = 1e3, this.MAX_TIMEOUT_DISABLE = Object(I.g)("5m")
                }
                register(e) {
                    this.qosLogControl = e
                }
                send(e) {
                    var t, n, s, i;
                    this.qosLogControl ? o.a.process === u.a.Main ? null !== (t = this.qosLogControl) && void 0 !== t && t._readyQos ? (this.handleReservedLogs(), null === (n = this.qosLogControl) || void 0 === n || n.logQos({
                        success: e.success,
                        commandId: e.cmdId,
                        subCommandId: e.subCmdId || 0,
                        duration: e.duration,
                        errorCode: (null == e ? void 0 : e.errorCode) || 0,
                        params: e.params,
                        startTime: e.startTime
                    })) : this.reserve(e) : (this.handleReservedLogs(), e.success ? null === (s = this.qosLogControl) || void 0 === s || s.increaseSuccess(e.cmdId, e.subCmdId, e.duration, e.params) : null === (i = this.qosLogControl) || void 0 === i || i.increaseFailed(e.cmdId, e.subCmdId, e.duration, e.errorCode, e.startTime, e.params)) : this.reserve(e)
                }
                handleReservedLogs() {
                    var e;
                    if (null !== (e = this.reservedLogs) && void 0 !== e && e.length) {
                        const e = this.reservedLogs;
                        this.reservedLogs = [], e.forEach((e => {
                            this.send(e)
                        }))
                    }
                }
                reserve(e) {
                    this.reservedLogs && this.reservedLogs.length >= this.MAX_RESERVED_LOGS && (this.reservedLogs.shift(), this.tsMaxReserved ? Date.now() - this.tsMaxReserved >= this.MAX_TIMEOUT_DISABLE && (this.enabled = !1) : this.tsMaxReserved = Date.now()), this.enabled && (this.reservedLogs || (this.reservedLogs = []), this.reservedLogs.push(e))
                }
            };
            var N = class {
                constructor() {
                    this._qosSender = void 0, this._logger = void 0, this.pendingQosLogs = void 0, this.disabled = void 0, this.MAX_LOGS_ROLL_OUT = 1e3
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("qos")), this._logger
                }
                get qosSender() {
                    return this._qosSender || (this._qosSender = new R), this._qosSender
                }
                registerQosControl(e) {
                    this.qosSender.register(e)
                }
                checkEnableSubmitLog() {
                    var e;
                    const t = m.a.getConfig().enable_submit_qos,
                        n = (m.a.getConfig().submit_qos_except_dev, m.a.getConfig().enable_for_staging_account),
                        o = m.a.getConfig().staging_account;
                    let s = (m.a.enable || n && o) && t;
                    var i;
                    (null === (e = this.Logger) || void 0 === e || e.zsymb(3, 9592, 3e4, "isEnabled: {}", s), s) ? null !== (i = this.pendingQosLogs) && void 0 !== i && i.length && this.pendingQosLogs.forEach((e => {
                        this.logQos(e)
                    })): (this.disabled = !0, this.pendingQosLogs = [])
                }
                send(e, t) {
                    if (this.disabled) return;
                    if (!t.qos || t.disabled || !e.isDone) return;
                    const n = {
                        success: !0,
                        cmdId: t.qos.cmdId,
                        subCmdId: t.qos.subCmdId || 0,
                        duration: e.duration,
                        startTime: e.startAt,
                        params: [...e.info || []]
                    };
                    m.a.getConfig().enable_submit_qos ? this.logQos(n) : (this.pendingQosLogs || (this.pendingQosLogs = []), this.pendingQosLogs.length >= this.MAX_LOGS_ROLL_OUT && this.pendingQosLogs.shift(), this.pendingQosLogs.push(n))
                }
                logQos(e) {
                    try {
                        this.qosSender.send(e)
                    } catch (n) {
                        var t;
                        null === (t = this.Logger) || void 0 === t || t.zsymb(20, 9592, 30001, "metric logQos ERR: {}", n)
                    }
                }
            };
            o.a.register(s.a.METRIC_RESOLVER, class {
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("resolver")), this._logger
                }
                get records() {
                    return {
                        push: e => {
                            this._records || (this._records = []), this._records.push(e)
                        },
                        getAll: () => this._records || [],
                        clear: () => {
                            var e;
                            (null === (e = this._records) || void 0 === e ? void 0 : e.length) && (this._records = [])
                        }
                    }
                }
                get qosManager() {
                    return this._qosManager || (this._qosManager = new N), this._qosManager
                }
                constructor() {
                    this._records = void 0, this._logger = void 0, this._qosManager = void 0, this.lastTransmit = void 0, this.isReady = void 0, this.configSynced = void 0, this.MAX_TRANSMIT_TIMEOUT = 5e3, this.lastTransmit = o.a.EPOCH
                }
                ready() {
                    this.isReady || (m.a.onConfigChange((() => {
                        this.configSynced = !0, this.handleRecordsByConfig(), this.qosManager.checkEnableSubmitLog()
                    })), this.isReady = !0)
                }
                handleRecordsByConfig() {
                    const e = m.a.getConfig().enable_for_staging_account,
                        t = m.a.getConfig().staging_account;
                    m.a.enable || e && t ? this.checkNeedTransmitToMain() && (this.transmitRecords(), this.lastTransmit = Date.now()) : this.records.clear()
                }
                checkNeedTransmitToMain() {
                    return this.records.getAll().length >= m.a.getConfig().max_cache_records_resolved || Date.now() - this.lastTransmit >= this.MAX_TRANSMIT_TIMEOUT
                }
                resolve(e) {
                    e.isDone || e.resolve(), this.analyze(e), o.a.process === u.a.Main && o.a.LocalStat.record(e)
                }
                resolveEvent(e, t) {
                    o.a.MetricTransporter.transmitEvents()
                }
                exportAll() {
                    this.transmitRecords()
                }
                registerQosControl(e) {
                    this.qosManager.registerQosControl(e)
                }
                transmitRecords() {
                    const e = this.records.getAll();
                    this.records.clear(), e.length && o.a.MetricTransporter.transmitRecords(e)
                }
                analyze(e) {
                    const t = e.getSchema();
                    if (null == t || !t.statement) return;
                    t.statement.getAll().forEach((t => {
                        this.scanStatement(t, e)
                    }))
                }
                scanStatement(e, t) {
                    let n;
                    const o = e => {
                        if (e.disabled) return;
                        let n;
                        var s;
                        if (this.checkStatPoint(e, t) && (n = e, null !== (s = e.points) && void 0 !== s && s.length))
                            for (const t of e.points) {
                                const e = o(t);
                                if (e) {
                                    n = e;
                                    break
                                }
                            }
                        return n
                    };
                    for (const s of e.points)
                        if (n = o(s), n && this.qosManager.send(t, n), "sequential" === e.checkingMode && n) break
                }
                checkStatPoint(e, t) {
                    const n = a(t);
                    return "boolean" == typeof e.condition ? e.condition : e.condition(...n)
                }
            });
            var E = n("5Drw"),
                $ = n("Na1p");
            o.a.register(s.a.USAGE_MONITOR, class {
                constructor() {
                    this._timelineEngine = void 0, this.timeline = void 0, this._logger = void 0, this._processMonitor = void 0, this._appUsageMonitor = void 0, this._isReady = void 0, this.execTimeNode = e => {
                        const {
                            metrics: t
                        } = e, n = t.filter((e => e.type === _.a.CPU || e.type === _.a.MEMORY));
                        var o;
                        n.length && (null === (o = this.processMonitor) || void 0 === o || o.recordAtTime(e, n))
                    }, this.timeline = []
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("usage-monitor")), this._logger
                }
                get timelineEngine() {
                    return this._timelineEngine || (this._timelineEngine = new E.b, this._timelineEngine.onMessage(this.execTimeNode)), this._timelineEngine
                }
                get processMonitor() {
                    if (!this._processMonitor) try {
                        let e;
                        e = o.a.process === u.a.Main ? n("xDBg").default : n("gpfy").default, this._processMonitor = new e(this.Logger)
                    } catch (t) {
                        var e;
                        null === (e = this.Logger) || void 0 === e || e.zsymb(21, 9581, 3e4, "Fail to get processMonitor. ERR: {}", t)
                    }
                    return this._processMonitor
                }
                get appUsageMonitor() {
                    if (!this._appUsageMonitor) try {
                        let e = n("w46u").default;
                        this._appUsageMonitor = new e(this.Logger)
                    } catch (t) {
                        var e;
                        null === (e = this.Logger) || void 0 === e || e.zsymb(21, 9581, 30001, "Fail to get appUsageMonitor. ERR: {}", t)
                    }
                    return this._appUsageMonitor
                }
                getSystemInfo() {
                    var e, t;
                    return null === (e = this.processMonitor) || void 0 === e || null === (t = e.getSystemInfo) || void 0 === t ? void 0 : t.call(e)
                }
                ready() {
                    this._isReady || (o.a.SchemaManager.hasUsageSchemas() && (o.a.process !== u.a.Main || $.a.start()), m.a.onConfigChange((() => {})), this._isReady = !0)
                }
                startUp() {
                    const e = o.a.SchemaManager.getMemoryUsageSchemas(),
                        t = o.a.SchemaManager.getCPUUsageSchemas(),
                        n = e.filter((e => {
                            var t;
                            return null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes.length
                        })),
                        s = t.filter((e => {
                            var t;
                            return null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes.length
                        })),
                        i = [];
                    [...n, ...s].forEach((e => {
                        var t;
                        ((null === (t = e.timeline) || void 0 === t ? void 0 : t.timeNodes) || []).forEach((t => {
                            let {
                                time: n
                            } = t;
                            const o = i.find((e => e.time === n));
                            if (o) o.add(e);
                            else {
                                const t = new E.a(n);
                                t.add(e), i.push(t)
                            }
                        }))
                    })), i.length && (this.timeline = i, this.timelineEngine.startUp(i))
                }
                onReceiveProcessStats(e) {
                    var t, n;
                    null != e && e.pid && e.name !== u.a.Main && (null === (t = this.processMonitor) || void 0 === t || null === (n = t.combineRendererStats) || void 0 === n || n.call(t, e))
                }
                exit() {
                    this.timelineEngine.stop()
                }
            });
            const x = g.a.time("10s"),
                B = [g.a.time("1m"), g.a.time("5m"), g.a.time("10m"), g.a.time("20m"), g.a.time("30m"), g.a.time("1h"), g.a.time("2h"), g.a.time("4h"), g.a.time("6h"), g.a.time("8h")];
            o.a.register(s.a.LOCAL_STAT, class {
                constructor() {
                    this.tasks = [], this.processAppUsage = {}, this.totalAppUsage = {}, this.queryStatistics = {
                        totalRequest: 0,
                        totalExecDuration: 0,
                        inUse: {}
                    }, this.processStats = {}, this.attentionQueries = [], this.fpsInfo = void 0, this.hasChange = {
                        queryStatistics: !1,
                        fpsInfo: !1
                    }, this.writing = !1, this.savedProcessDataHash = 0, this.timeoutLog = void 0, this.writerEnabled = void 0, this.isReady = void 0, this.WHITELIST_MEMORY = new Set(["rss", "heapTotal", "heapUsed", "heapSizeLimit"]), this.writeLog = async () => {
                        if (o.a.process !== u.a.Main) return;
                        const e = this.getWriter();
                        try {
                            const t = () => Object(I.e)(Date.now());
                            if (this.tasks.length) {
                                const n = this.tasks;
                                this.tasks = [];
                                let o = `------ updated at: ${t()} ------\n`;
                                n.forEach(((e, t) => {
                                    o += `${t+1}.\n`, o += this.writeContentFromObject(e), o += "\n\n"
                                })), o += "\n", await e.append("metrics", o)
                            }
                            if (Object.keys(this.processAppUsage).length) {
                                const n = this.processAppUsage;
                                this.processAppUsage = {};
                                let o = `------ updated at: ${t()} ------\n`;
                                for (const e in n) {
                                    o += `\n- Usage after ${Object(I.f)(Number(e))}:`;
                                    const t = this.totalAppUsage[e];
                                    t && (o += `+--- total: cpu: ${t.cpuTotal.toFixed(2)}% | mem: ${Object(I.d)(t.memoryTotal)}`);
                                    for (const s of n[e]) {
                                        let e = "";
                                        for (const t in s) e += `${t}:${s[t]} | `;
                                        o += `\n+ ${e}`
                                    }
                                }
                                o += "\n\n", this.totalAppUsage = {}, await e.append("app-usage", o)
                            }
                            if (Object.keys(this.processStats).length) {
                                const n = this.processStats;
                                this.processStats = {};
                                for (const o in n) {
                                    let s = `------ updated at: ${t()} ------\n`;
                                    n[o].forEach((e => {
                                        s += this.writeContentFromObject(e), s += "\n"
                                    })), s += "\n\n\n", await e.append(`usage.${o}`, s)
                                }
                            }
                            if (this.hasProcessDataChanged()) {
                                this.savedProcessDataHash = o.a.DataManager.getHashCode();
                                const n = [o.a.DataManager.getCurrentProcessData(), ...o.a.DataManager.getOtherProcessData()];
                                let s = `------ updated at: ${t()} ------\n`;
                                n.forEach((e => {
                                    s += `\n* process: ${e.getName()}`;
                                    e.getAll().forEach((e => {
                                        s += `\n  - ${e.name} : ${e.time} (${Object(I.e)(e.time)})`
                                    })), s += "\n"
                                })), await e.write("actions", s)
                            }
                            if (this.hasChange.queryStatistics) {
                                this.hasChange.queryStatistics = !1;
                                let n = `------ updated at: ${t()} ------\n`;
                                n += `\nTotal request: ${this.queryStatistics.totalRequest}`, n += `\nAverage duration: ${Object(I.f)(this.queryStatistics.totalExecDuration/this.queryStatistics.totalRequest)}`, Object.keys(this.queryStatistics.inUse).length && (n += "\n- By usage time:");
                                for (const e in this.queryStatistics.inUse) Number(e) <= Date.now() - o.a.EPOCH && (n += `\n + ${Object(I.f)(Number(e))}:`, n += `\n   Total request: ${this.queryStatistics.inUse[e].totalRequest}`, n += `\n   Average duration: ${Object(I.f)(this.queryStatistics.inUse[e].totalExecDuration/this.queryStatistics.inUse[e].totalRequest)}`);
                                n += "\n\n", await e.write("query-stats", n)
                            }
                            if (this.attentionQueries.length) {
                                const n = this.attentionQueries;
                                this.attentionQueries = [];
                                let o = `------ updated at: ${t()} ------\n`;
                                const s = e => Object.entries(e).map((e => {
                                    let [t, n] = e;
                                    return `${t}=${JSON.stringify(n)}`
                                })).join(",");
                                n.forEach((e => {
                                    var t;
                                    const n = null !== (t = e.info) && void 0 !== t && t[1] ? s(e.info[1]) : "";
                                    o += `\n* ${n||e.id}: `, o += this.writeContentFromObject(e), o += "\n"
                                })), o += "\n\n\n", await e.append("attention-queries", o)
                            }
                            if (this.hasChange.fpsInfo && this.fpsInfo) {
                                this.hasChange.fpsInfo = !1;
                                let n = `------ updated at: ${t()} ------\n`;
                                n += `* process: ${this.fpsInfo.processName} | usageTime: ${Object(I.f)(this.fpsInfo.usageTime)} | recordAt: ${Object(I.e)(this.fpsInfo.recordAt)}`, n += `\n  + fps: ${this.fpsInfo.fps}`, n += `\n  + avgFps: ${this.fpsInfo.avgFps}`, n += `\n  + maxFps: ${this.fpsInfo.maxFps}`, n += `\n  + history: ${JSON.stringify(this.fpsInfo.fpsColumns)}`, n += "\n\n", await e.append("fps", n)
                            }
                        } catch (t) {}
                    }, this.hasDataChanged = () => this.tasks.length || Object.keys(this.processAppUsage).length || this.hasChange.queryStatistics || this.hasChange.fpsInfo || this.attentionQueries.length || this.hasProcessDataChanged()
                }
                ready() {
                    this.isReady || o.a.process === u.a.Main && (m.a.on("staging_account", (e => {
                        this.writerEnabled = !!e && m.a.getConfig().enable_for_staging_account, this.writerEnabled ? this.startWrite() : this.reset()
                    })), this.isReady = !0)
                }
                reset() {
                    this.tasks = [], this.processAppUsage = {}, this.queryStatistics = {
                        totalRequest: 0,
                        totalExecDuration: 0,
                        inUse: {}
                    }, this.processStats = {}, this.attentionQueries = [], this.hasChange = {
                        queryStatistics: !1,
                        fpsInfo: !1
                    }, this.writing = !1, this.savedProcessDataHash = 0, this.timeoutLog && clearTimeout(this.timeoutLog)
                }
                record(e) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== u.a.Main) return;
                    if (e.name === c.b.fps) return;
                    let t = {
                        duration: e.durationText,
                        startAt: e.startAt ? Object(I.e)(e.startAt) : void 0,
                        endAt: e.endAt ? Object(I.e)(e.endAt) : void 0,
                        id: e.id,
                        name: e.name,
                        type: e.type,
                        info: [...e.info || []],
                        usageTime: e.usageTimeText
                    };
                    if (e.type === _.a.TIME)
                        if (e.name === c.b.query_resolution_time) {
                            if (t = Object(f.a)(Object(f.a)({}, t), {}, {
                                    stackTrace: e.stackTrace
                                }), e.duration) {
                                this.hasChange.queryStatistics = !0, this.queryStatistics.totalRequest++, this.queryStatistics.totalExecDuration += e.duration;
                                for (const t of B) {
                                    const n = e => e <= t;
                                    e.usageTime && n(e.usageTime) && (this.queryStatistics.inUse[t] || (this.queryStatistics.inUse[t] = {
                                        totalRequest: 0,
                                        totalExecDuration: 0
                                    }), this.queryStatistics.inUse[t].totalRequest++, this.queryStatistics.inUse[t].totalExecDuration += e.duration)
                                }
                                e.duration > x && this.attentionQueries.push(t)
                            }
                        } else t = Object(f.a)({}, t), this.tasks.push(t);
                    this.startWrite()
                }
                recordUsage(e, t) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== u.a.Main) return;
                    const n = i(t);
                    this.processAppUsage[n] = e.map((e => ({
                        pid: e.pid,
                        ppid: e.ppid,
                        processName: e.name,
                        processType: e.type,
                        cpu: `${e.cpu.toFixed(2)}%`,
                        memory: Object(I.d)(e.memory),
                        sandboxed: e.sandboxed,
                        usageTime: Object(I.f)(n),
                        elapsed: Object(I.f)(e.elapsed),
                        timestamp: e.timestamp
                    }))), this.startWrite()
                }
                recordProcessStats(e) {
                    var t;
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== u.a.Main) return;
                    let n = {};
                    if (null != e && e.memory)
                        for (const o in e.memory)
                            if (this.WHITELIST_MEMORY.has(o)) {
                                const t = e.memory[o];
                                n[o] = "number" == typeof t ? Object(I.d)(t) : t
                            } let s = {};
                    null != e && null !== (t = e.cpu) && void 0 !== t && t.percent && (s = {
                        percent: e.cpu.percent
                    });
                    const i = {
                        recordAt: Object(I.e)(e.recordAt),
                        usageTime: Object(I.f)(e.usageTime),
                        pid: e.pid,
                        name: e.name,
                        memory: n,
                        cpu: s,
                        creationTime: e.creationTime ? Object(I.e)(e.creationTime) : null,
                        sandboxed: e.sandboxed,
                        processType: e.type
                    };
                    this.processStats[e.name] || (this.processStats[e.name] = []), this.processStats[e.name].push(i), this.startWrite()
                }
                recordFps(e) {
                    !1 !== this.writerEnabled && o.a.process === u.a.Main && (this.fpsInfo = e, this.hasChange.fpsInfo = !0, this.startWrite())
                }
                recordAppUsage(e, t) {
                    if (!1 === this.writerEnabled) return;
                    if (o.a.process !== u.a.Main) return;
                    const n = i(t);
                    this.processAppUsage[n] = e.map((e => ({
                        pid: e.pid,
                        ppid: e.ppid,
                        processName: e.name,
                        processType: e.type,
                        cpu: `${e.cpu.toFixed(2)}%`,
                        memory: Object(I.d)(e.memory),
                        sandboxed: e.sandboxed,
                        usageTime: Object(I.f)(n),
                        elapsed: Object(I.f)(e.elapsed),
                        timestamp: e.timestamp
                    }))), this.totalAppUsage[n] = e.reduce(((e, t) => (e.cpuTotal += t.cpu, e.memoryTotal += t.memory, e)), {
                        cpuTotal: 0,
                        memoryTotal: 0
                    }), this.startWrite()
                }
                startWrite() {
                    !1 !== this.writerEnabled && o.a.process === u.a.Main && !this.writing && this.writerEnabled && (this.writing = !0, this.timeoutLog = setTimeout((() => {
                        this.writeLog().finally((() => {
                            if (this.writing = !1, this.hasDataChanged()) return this.startWrite()
                        }))
                    }), 5e3))
                }
                export (e) {
                    !1 !== this.writerEnabled && o.a.process === u.a.Main && e && (clearTimeout(this.timeoutLog), this.hasDataChanged() && this.writeLog())
                }
                writeContentFromObject(e) {
                    let t = "";
                    for (const n in e) {
                        const o = e[n];
                        if (void 0 !== o)
                            if (Array.isArray(o)) t += `\n - ${n}:`, o.forEach((e => {
                                if ("object" == typeof e) {
                                    t += "\n   + {";
                                    for (const n in e) t += `\n      ${n} : ${e[n]}`;
                                    t += "\n     }"
                                } else t += `\n   + ${e}`
                            }));
                            else if ("object" == typeof o) {
                            t += `\n - ${n}:`;
                            for (const e in o) void 0 !== o[e] && (t += `\n   .  ${e} : ${o[e]}`);
                            t += "\n"
                        } else t += `\n - ${n} : ${o}`
                    }
                    return t
                }
                hasProcessDataChanged() {
                    return o.a.DataManager.getHashCode() !== this.savedProcessDataHash
                }
                getWriter() {
                    return (0, n("sc+k").default)()
                }
            });
            o.a.register(s.a.UI_MANAGER, class {
                constructor() {
                    this._fpsTimeline = void 0, this.fpsEngineStartAt = void 0, this.fpsState = void 0, this._logger = void 0, this.recordFpsMetric = e => {
                        var t;
                        if (!this.fpsState) return;
                        const n = Date.now(),
                            {
                                metrics: s,
                                passedTime: i,
                                startTime: a
                            } = e,
                            r = s.find((e => e.name === c.b.fps));
                        if (r) {
                            const e = o.a.MetricFactory.create(r.name, `${r.name}.${i}`, r);
                            e.setStartAt(a), e.setEndAt(n), e.pushInfo({
                                fps: this.fpsState.fps,
                                avgFps: this.fpsState.avgFps,
                                maxFps: this.fpsState.maxFps,
                                usageTime: i
                            }), e.evaluate(), e.resolve(), o.a.MetricResolver.resolve(e)
                        }
                        o.a.MetricTransporter.transmitFps(this.fpsState, n, i), null === (t = this.Logger) || void 0 === t || t.zsymb(5, 9427, 3e4, "[fps] fps: {}; avgFps: {}; maxFps {}", this.fpsState.fps, this.fpsState.avgFps, this.fpsState.maxFps)
                    }
                }
                get Logger() {
                    return this._logger || (this._logger = o.a.createLogger("ui-manager")), this._logger
                }
                get fpsTimeline() {
                    return this._fpsTimeline || (this._fpsTimeline = new E.b, this._fpsTimeline.onMessage(this.recordFpsMetric)), this._fpsTimeline
                }
                ready() {}
                exit() {
                    this.fpsTimeline.stop()
                }
                registerFpsMonitor() {
                    if (this.fpsEngineStartAt) return;
                    this.fpsEngineStartAt = Date.now();
                    const e = new E.a(Object(I.g)("1m")),
                        t = o.a.SchemaManager.loadSchema(c.b.fps);
                    t.categories && (e.add(t), this.fpsTimeline.startEvery(e))
                }
                getRegisteredFpsMonitor() {
                    return this.fpsEngineStartAt
                }
                recordFps(e) {
                    this.fpsState = e
                }
                getFps() {
                    return this.fpsState
                }
            })
        },
        cnBV: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return o
            })), n.d(t, "b", (function () {
                return s
            }));
            const o = {
                    ux_latency: "ux_latency",
                    task_latency: "task_latency",
                    usage: "usage",
                    web_vitals: "web_vitals",
                    navigation_timing: "navigation_timing",
                    core: "core"
                },
                s = {
                    start_up: "start_up",
                    dal: "dal",
                    chat: "chat"
                }
        },
        dFSO: function (e, t, n) {
            "use strict";
            n.d(t, "g", (function () {
                return a
            })), n.d(t, "b", (function () {
                return r
            })), n.d(t, "f", (function () {
                return c
            })), n.d(t, "d", (function () {
                return m
            })), n.d(t, "c", (function () {
                return u
            })), n.d(t, "e", (function () {
                return l
            })), n.d(t, "a", (function () {
                return g
            }));
            const o = 36e5,
                s = 24 * o,
                i = {
                    W: 6048e5,
                    D: s,
                    h: o,
                    m: 6e4,
                    s: 1e3
                },
                a = e => {
                    var t;
                    const n = null === (t = /(\d+)(ms)/g.exec(e)) || void 0 === t ? void 0 : t[1];
                    if (n) return Number(n);
                    const o = /(\d+)([WDhms])/g;
                    let s, a = 0;
                    for (; s = o.exec(e);) a += parseInt(s[1]) * i[s[2]];
                    return a
                },
                r = e => null == e,
                c = e => {
                    let t = e;
                    const n = [];
                    for (const o in i) {
                        const e = i[o],
                            s = Math.trunc(t / e);
                        s > 0 && (n.push(`${s}`.padStart(2, "0") + o), t -= s * e)
                    }
                    return t > 0 && n.push(t + "ms"), n.join(":")
                },
                d = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
                m = e => {
                    let t = 0,
                        n = parseInt(e.toString(), 10) || 0;
                    for (; n >= 1024 && ++t;) n /= 1024;
                    return n.toFixed(n < 10 && t > 0 ? 1 : 0) + " " + d[t]
                },
                u = e => 1024 * Number(e),
                l = e => {
                    const t = e => `${e}`.padStart(2, "0"),
                        n = new Date(e);
                    return `${n.toLocaleDateString()} ${`${t(n.getHours())}:${t(n.getMinutes())}:${t(n.getSeconds())}.${t(n.getMilliseconds())}`}`
                };
            let h, p = {};
            const g = e => {
                if (!h) {
                    let e = "";
                    [...d].reverse().forEach(((t, n) => {
                        p[t] = 1024 ** (d.length - 1 - n), e += 0 === n ? t : `|${t}`
                    })), h = new RegExp(`(\\d+)(?:)(${e})`, "g")
                }
                let t, n = 0;
                for (; t = h.exec(e);) n += parseInt(t[1]) * p[t[2]];
                return n
            }
        },
        fbdB: function (e, t, n) {
            "use strict";
            n.d(t, "b", (function () {
                return o.a
            })), n.d(t, "a", (function () {
                return s
            }));
            var o = n("uzza");
            var s = {
                bootstrap: "bootstrap",
                main_ready: "main_ready",
                main_window_finish_load: "main_window_finish_load",
                app_did_mount: "app_did_mount",
                app_done_preload_data: "app_done_preload_data",
                app_ready: "app_ready"
            };
            n("cnBV")
        },
        gNXM: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return r
            }));
            var o = n("VTBJ"),
                s = n("H/wq");
            const i = "INDEXED_DB_MODE/DEFAULT",
                a = "INDEXED_DB_MODE/DRY";
            const r = new class {
                constructor() {
                    this._mode = i
                }
                turnOnDryMode() {
                    this._mode = a
                }
                turnOnDefaultMode() {
                    this._mode = i
                }
                async openExistedDB(e) {
                    const t = window.indexedDB.open(e);
                    return await new Promise(((n, o) => {
                        t.onupgradeneeded = function () {
                            var n;
                            null === (n = t.transaction) || void 0 === n || n.abort(), o(new s.b(`No database whose name is ${e} exists`))
                        }, t.onsuccess = function () {
                            n(t.result)
                        }, t.onerror = function () {
                            o(t.error)
                        }
                    }))
                }
                getKeyDataInObjectStore(e, t) {
                    return new Promise(((n, o) => {
                        const s = t.get(e);
                        s.onsuccess = function () {
                            n(s.result)
                        }, s.onerror = function () {
                            o(s.error)
                        }
                    }))
                }
                getAllKeyNamesOfObjectStore(e) {
                    return new Promise(((t, n) => {
                        const o = e.getAllKeys();
                        o.onsuccess = function () {
                            t(o.result)
                        }, o.onerror = function () {
                            n(o.error)
                        }
                    }))
                }
                async doesObjectStoreHaveKey(e, t) {
                    return void 0 !== await this.getKeyDataInObjectStore(e, t)
                }
                async renameKeyOfObjectStore(e, t, n, s, i) {
                    void 0 === i && (i = () => {});
                    const r = await this.getKeyDataInObjectStore(e, n);
                    this._mode !== a && (await new Promise(((t, o) => {
                        const s = n.delete(e);
                        s.onsuccess = function () {
                            t()
                        }, s.onerror = function () {
                            o(s.error)
                        }
                    })), await new Promise(((e, i) => {
                        const a = n.put(Object(o.a)(Object(o.a)({}, r), {}, {
                            [s]: t
                        }));
                        a.onsuccess = function () {
                            e()
                        }, a.onerror = function () {
                            i(a.error)
                        }
                    })), i())
                }
                async deleteKeyOfObjectStore(e, t) {
                    this._mode !== a && await new Promise(((n, o) => {
                        const s = t.delete(e);
                        s.onsuccess = function () {
                            n()
                        }, s.onerror = function () {
                            o(s.error)
                        }
                    }))
                }
                async updateKeyOfObjectStore(e, t) {
                    this._mode !== a && await new Promise(((n, o) => {
                        const s = t.put(e);
                        s.onsuccess = function () {
                            n()
                        }, s.onerror = function () {
                            o(s.error)
                        }
                    }))
                }
                async getTotalKeyCountOfStore(e, t) {
                    let n = null;
                    try {
                        n = await this.openExistedDB(e)
                    } catch (s) {
                        return -1
                    }
                    if (!n.objectStoreNames.contains(t)) return -1;
                    const o = n.transaction(t, "readwrite").objectStore(t);
                    return (await this.getAllKeyNamesOfObjectStore(o)).length
                }
            }
        },
        gbvv: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            }));
            var o = n("Cvfp");

            function s(e, t) {
                const n = o.b[e];
                if (!n) return null;
                const s = n[t];
                return s || null
            }
        },
        gpfy: function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n("VTBJ"),
                s = n("N1xz"),
                i = n("dFSO"),
                a = n("AoYG");
            t.default = class {
                constructor(e) {
                    this.Logger = void 0, this.Logger = e
                }
                recordAtTime(e, t) {
                    const n = Date.now();
                    try {
                        const {
                            pid: r,
                            memoryUsage: c,
                            heapStats: d,
                            cpuUsage: m
                        } = MetriczGlobal.getProcessStats(), u = {
                            pid: r,
                            name: s.a.process,
                            memory: {
                                rss: c.rss,
                                heapTotal: c.heapTotal,
                                heapUsed: c.heapUsed,
                                heapSizeLimit: Object(i.c)(d.heapSizeLimit),
                                totalHeapSizeExecutable: Object(i.c)(d.totalHeapSizeExecutable),
                                totalPhysicalSize: Object(i.c)(d.totalPhysicalSize),
                                totalAvailableSize: Object(i.c)(d.totalAvailableSize),
                                mallocedMemory: Object(i.c)(d.mallocedMemory),
                                peakMallocedMemory: Object(i.c)(d.peakMallocedMemory),
                                doesZapGarbage: d.doesZapGarbage,
                                external: c.external,
                                arrayBuffers: c.arrayBuffers
                            },
                            cpu: Object(o.a)({}, m),
                            recordAt: n,
                            usageTime: n - s.a.EPOCH
                        };
                        null != t && t.length && t.forEach((t => {
                            const o = s.a.MetricFactory.create(t.name, `${u.name}.${e.passedTime}`, t);
                            var i;
                            (o.setStartAt(e.startTime), o.setEndAt(n), o.setData(u, e.passedTime), t.type === a.a.CPU) ? o.pushInfo({
                                percentCPUUsage: null === (i = u.cpu) || void 0 === i ? void 0 : i.percent,
                                recordAt: u.recordAt,
                                usageTime: u.usageTime,
                                processName: u.name
                            }): t.type === a.a.MEMORY && o.pushInfo({
                                heapUsed: u.memory.heapUsed,
                                heapTotal: u.memory.heapTotal,
                                rss: u.memory.rss
                            });
                            o.evaluate(), o.resolve(), s.a.MetricResolver.resolve(o)
                        })), s.a.MetricTransporter.transmitProcessStats(u)
                    } catch (c) {
                        var r;
                        null === (r = this.Logger) || void 0 === r || r.zsymb(23, 9590, 3e4, "Fail on record process usage stats. ERR: {}", String(c))
                    }
                }
            }
        },
        "h0S/": function (e, t, n) {
            "use strict";
            let o;
            n.d(t, "b", (function () {
                    return o
                })), n.d(t, "c", (function () {
                    return s
                })), n.d(t, "a", (function () {
                    return i
                })),
                function (e) {
                    e.moduleA = "moduleA", e.featA = "featA", e.featPhoto = "photo", e.featPhotoLoadCache = "photoLoadCache", e.featPhotoDomCache = "photoDomCache", e.featPhotoReduxAction = "photoReduxAction", e.staging = "staging", e.onlyAdminChatSettings = "only-admin-chat-setting", e.contactTabV2 = "contact-tab-v2", e.conversationSetting = "conversation-setting", e.appStatus = "app-status", e.focusDetectorManager = "focus-detector-manager", e.focusStatus = "focus-status", e.activeDeactive = "active-deactive", e.signalProtocolManager = "signal-protocol-manager", e.resendManager = "resend-manager", e.iidManager = "iid-manager", e.signalStore = "signal-protocol-store", e.conversation = "conversation", e.controller = "controller", e.service = "service", e.stateMachine = "state-machine", e.convList = "conv-list", e.e2ee = "e2ee", e.metricz = "metricz", e.unread = "unread"
                }(o || (o = {}));
            const s = {
                    [o.moduleA]: !0,
                    [o.featA]: !0,
                    [o.featPhoto]: !0,
                    [o.featPhotoLoadCache]: !0,
                    [o.featPhotoDomCache]: !0,
                    [o.featPhotoReduxAction]: !0,
                    [o.staging]: !0,
                    [o.onlyAdminChatSettings]: !0,
                    [o.contactTabV2]: !0,
                    [o.conversationSetting]: !0,
                    [o.appStatus]: !0,
                    [o.focusDetectorManager]: !0,
                    [o.focusStatus]: !0,
                    [o.activeDeactive]: !0,
                    [o.controller]: !0,
                    [o.service]: !0,
                    [o.stateMachine]: !0,
                    [o.service]: !0,
                    [o.stateMachine]: !0,
                    [o.metricz]: !0
                },
                i = []
        },
        jDHv: function (e, t, n) {
            "use strict";
            n.r(t), n.d(t, "define", (function () {
                return s
            })), n.d(t, "Container", (function () {
                return i
            })), n.d(t, "ModuleContainer", (function () {
                return a
            })), n.d(t, "autoInjectable", (function () {
                return r
            })), n.d(t, "injectable", (function () {
                return c
            })), n.d(t, "inject", (function () {
                return d
            })), n.d(t, "singleton", (function () {
                return m
            }));
            var o = n("S8fy");
            n("h6tn");

            function s(e) {
                return {
                    service: e,
                    token: e
                }
            }
            class i {
                constructor() {
                    this.inject = e => o.c(e.token), this.injectToken = e => o.c(e), this.singleton = o.f, this.injectable = o.d, this.register = (e, t) => {
                        o.b.register(e.token, {
                            useClass: t
                        }), this.hookAfferResolution(e)
                    }, this.registerValue = (e, t) => {
                        o.b.register(e.token, {
                            useValue: t
                        }), this.hookAfferResolution(e)
                    }, this.registerSingleton = (e, t) => {
                        o.b.registerSingleton(t), o.b.register(e.token, {
                            useFactory: e => e.resolve(t)
                        }), this.hookAfferResolution(e)
                    }, this.registerFactory = (e, t) => {
                        o.b.register(e.token, {
                            useFactory: t
                        }), this.hookAfferResolution(e)
                    }, this.resolve = e => o.b.resolve(e.token), this.resolveToken = e => o.b.resolve(e), this.resolveAll = e => o.b.resolveAll(e.token), this.resolveIfExist = e => {
                        try {
                            return o.b.resolve(e.token)
                        } catch (t) {
                            return
                        }
                    }
                }
                hookAfferResolution(e) {}
            }
            const a = new i,
                r = o.a,
                c = o.d,
                d = e => o.c(e.token);

            function m(e) {
                return function (t) {
                    e ? a.registerSingleton(e, t) : a.singleton()(t)
                }
            }
        },
        jGDt: function (e, t, n) {
            "use strict";
            n.d(t, "a", (function () {
                return s
            }));
            var o = n("jDHv");
            const s = Object(o.define)("zlog-session")
        },
        ncfp: function (e, t, n) {
            "use strict";
            var o;
            ! function (e) {
                e[e.PENDING = 0] = "PENDING", e[e.YES = 1] = "YES", e[e.NO = 2] = "NO"
            }(o || (o = {})), t.a = o
        },
        rFEu: function (e, t, n) {
            "use strict";
            n.d(t, "d", (function () {
                return S
            })), n.d(t, "c", (function () {
                return q
            })), n.d(t, "f", (function () {
                return D
            })), n.d(t, "b", (function () {
                return A
            })), n.d(t, "e", (function () {
                return N
            })), n.d(t, "a", (function () {
                return w
            }));
            class o {
                constructor() {
                    this.name = void 0, this.checkingMode = void 0, this.points = void 0
                }
            }
            class s {}
            class i extends o {
                constructor(e) {
                    super(), this.name = void 0, this.checkingMode = void 0, this.points = void 0, this.name = e.name, this.checkingMode = e.checkingMode || i.DEFAULT_CHECKING_MODE, this.points = e.points
                }
            }
            i.DEFAULT_CHECKING_MODE = "sequential";
            var a = i;
            class r {
                constructor(e) {
                    this.version = void 0, this.version = (null == e ? void 0 : e.version) || r.DEFAULT_VERSION
                }
            }
            r.DEFAULT_VERSION = 1;
            var c = r;
            var d = class extends c {
                constructor(e) {
                    super(e), this.name = void 0, this.condition = void 0, this.qos = void 0, this.points = void 0, this.disabled = void 0, this.name = e.name, this.condition = e.condition, this.qos = e.qos, this.points = e.points, this.disabled = e.disabled
                }
            };
            var m = class extends s {
                constructor() {
                    super(), this.statements = void 0;
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    this.statements = t
                }
                getAll() {
                    return this.statements
                }
            };
            var u = class extends c {
                    constructor(e) {
                        super(e), this.metrics = void 0, e.metrics.length && (this.metrics = e.metrics)
                    }
                    getMetrics() {
                        return this.metrics || []
                    }
                },
                l = n("AoYG");
            var h = class extends c {
                constructor(e) {
                    super(e), this.name = void 0, this.type = void 0, this.features = void 0, this.categories = void 0, this.fromProcess = void 0, this.startFromEpoch = void 0, this.showStackTrace = void 0, this.statement = void 0, this.disabled = void 0, this.mode = void 0, this.name = e.name, this.type = e.type || l.a.TIME, this.features = e.features, this.categories = e.categories, this.fromProcess = e.fromProcess, this.startFromEpoch = e.startFromEpoch, this.showStackTrace = e.showStackTrace, this.disabled = e.disabled, this.mode = e.mode, e.statement instanceof s ? this.statement = e.statement : e.statement instanceof o && (this.statement = y.StatementGroup(e.statement))
                }
            };
            var p = class extends c {
                constructor(e) {
                    super(), this.schemas = void 0, this.schemas = new Map(Object.entries(e))
                }
                getSchemas() {
                    return this.schemas ? Array.from(this.schemas.values()) : []
                }
            };
            var g = class extends h {
                constructor(e) {
                    super(e), this.timeline = void 0, this.type = l.a.MEMORY, this.timeline = e.timeline
                }
            };
            var _ = class extends h {
                constructor(e) {
                    super(e), this.timeline = void 0, this.type = l.a.CPU, this.timeline = e.timeline
                }
            };
            const f = function (e) {
                for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                return new e(...n)
            };
            var I = class extends c {
                constructor() {
                    super(), this.timeNodes = void 0;
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    this.timeNodes = (t || []).map((e => ({
                        time: e
                    })))
                }
            };
            class P {
                constructor() {}
            }
            P.SchemaGroup = e => f(p, e), P.Schema = e => f(u, e), P.Metric = e => f(h, "string" == typeof e ? {
                name: e
            } : e), P.MetricMemory = e => f(g, e), P.MetricCPU = e => f(_, e), P.Statement = e => f(a, e), P.StatPoint = e => f(d, e), P.StatementGroup = function () {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return f(m, ...t)
            }, P.Timeline = function () {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                return f(I, ...t)
            };
            var y = P,
                M = n("dFSO");
            let v;
            var b;
            (b = v || (v = {})).time = M.g, b.bytes = M.a, b.notNil = e => !Object(M.b)(e), b.extractCPUUsage = e => {
                var t, n, o;
                return null === (t = e.data) || void 0 === t || null === (n = t.usage) || void 0 === n || null === (o = n.cpu) || void 0 === o ? void 0 : o.percent
            }, b.extractHeapUsed = e => {
                var t, n, o;
                return null === (t = e.data) || void 0 === t || null === (n = t.usage) || void 0 === n || null === (o = n.memory) || void 0 === o ? void 0 : o.heapUsed
            }, b.extractPassedTime = e => {
                var t;
                return null === (t = e.data) || void 0 === t ? void 0 : t.passedTime
            }, b.extractRAM = e => {
                var t;
                return null === (t = e.systemInfo) || void 0 === t ? void 0 : t.totalMem
            };
            var w = v;
            const S = y.SchemaGroup,
                q = y.Schema,
                D = y.Timeline,
                T = y.Metric;
            T.Memory = y.MetricMemory, T.CPU = y.MetricCPU;
            const A = T,
                R = y.Statement;
            R.Group = y.StatementGroup, R.Point = y.StatPoint;
            const N = R
        },
        "sc+k": function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n("3EqI"),
                s = n("Iwwi"),
                i = n.n(s),
                a = n("Cwh7"),
                r = n.n(a),
                c = n("vbkW"),
                d = n.n(c),
                m = n("N1xz");
            var u = class {
                constructor() {
                    this.directoryPath = void 0, this.directoryName = void 0, this.metaPath = void 0, this.logExt = void 0, this.accessibleFiles = {}, this.metaPreparing = !1, this.isMetaReady = !1, this.metaData = void 0, this.MAX_DIRECTORIES = 5, this.directoryPath = r.a.join(d.a.app.getPath("userData"), "metrics"), this.metaPath = r.a.join(d.a.app.getPath("userData"), "metrics", "meta"), this.logExt = ".txt", this.metaData = {
                        items: []
                    }
                }
                getFilePath(e) {
                    return r.a.join(this.directoryPath, e + this.logExt)
                }
                async checkFileExists(e) {
                    try {
                        return await i.a.promises.access(e, i.a.constants.F_OK), this.accessibleFiles[e] = !0, !0
                    } catch (t) {}
                    return !1
                }
                async ensureDirectoryExists() {
                    try {
                        await i.a.promises.mkdir(this.directoryPath, {
                            mode: 511,
                            recursive: !0
                        }), !this.isMetaReady && this.metaPreparing
                    } catch (e) {
                        throw new Error(e)
                    }
                }
                async prepareMeta() {
                    if (this.metaPreparing || this.isMetaReady) return;
                    let e;
                    this.metaPreparing = !0;
                    const t = async () => {
                        e = await i.a.promises.readFile(this.metaPath, "utf8")
                    }, n = async () => {
                        await this.checkFileExists(this.metaPath) && await t()
                    };
                    if (this.accessibleFiles[this.metaPath]) try {
                        await t()
                    } catch (a) {
                        await n()
                    } else await n();
                    if (e) try {
                        const t = JSON.parse(e);
                        if (null != t && t.items) {
                            var o;
                            this.metaData.items = t.items;
                            let e = this.metaData.items;
                            if (e = e.sort(((e, t) => e.createAt - t.createAt)), (null === (o = e) || void 0 === o ? void 0 : o.length) + 1 >= this.MAX_DIRECTORIES) {
                                e.splice(0, e.length + 1 - this.MAX_DIRECTORIES).forEach((e => {
                                    const t = r.a.join(d.a.app.getPath("userData"), "metrics", e.name);
                                    i.a.promises.unlink(t).catch((e => {}))
                                }))
                            }
                            this.metaData.items = e
                        }
                    } catch (c) {}
                    this.metaData.items.push({
                        name: this.directoryName,
                        createAt: m.a.EPOCH
                    });
                    const s = JSON.stringify(this.metaData);
                    await i.a.promises.writeFile(this.metaPath, s), this.metaPreparing = !1, this.isMetaReady = !0
                }
            };
            class l extends u {
                constructor() {
                    super(), this.lock = void 0, this.lock = new o.a
                }
                async write(e, t) {
                    return await this.lock.exec(e, (async () => {
                        const n = this.getFilePath(e),
                            o = async () => {
                                await this.ensureDirectoryExists(), await this.checkFileExists(n), await this.writeData(n, t)
                            };
                        if (this.accessibleFiles[n]) try {
                            await this.writeData(n, t)
                        } catch (s) {
                            await o()
                        } else await o()
                    }))
                }
                async append(e, t) {
                    return await this.lock.exec(e, (async () => {
                        const n = this.getFilePath(e),
                            o = async () => {
                                await this.ensureDirectoryExists();
                                await this.checkFileExists(n) ? await this.writeData(n, t) : await this.appendData(n, t)
                            };
                        if (this.accessibleFiles[n]) try {
                            await this.appendData(n, t)
                        } catch (s) {
                            await o()
                        } else await o()
                    }))
                }
                async writeData(e, t) {
                    try {
                        await i.a.promises.writeFile(e, t)
                    } catch (n) {
                        throw new Error(n)
                    }
                }
                async appendData(e, t) {
                    return new Promise(((n, o) => {
                        const s = i.a.createWriteStream(e, {
                            flags: "a"
                        }).on("error", (e => o(e))).on("close", n);
                        s.write(t), s.end("")
                    })).catch((e => {
                        throw new e
                    }))
                }
            }
            let h;
            t.default = () => (h || (h = new l), h)
        },
        uzza: function (e, t, n) {
            "use strict";
            t.a = {
                usage_memory: "usage_memory",
                usage_cpu: "usage_cpu",
                app_usage: "app_usage",
                start_up_time: "start_up_time",
                query_resolution_time: "query_resolution_time",
                db_ready: "db_ready",
                authenticate: "authenticate",
                open_conversation: "open_conversation",
                conv_load_1st_msg: "conv_1st_load_msg",
                fps: "fps"
            }
        },
        w46u: function (e, t, n) {
            "use strict";
            n.r(t);
            var o = n("5Drw"),
                s = n("KA3I"),
                i = n("dFSO"),
                a = n("N1xz"),
                r = n("fbdB");
            t.default = class {
                constructor(e) {
                    this._timelineEngine = void 0, this._processUsagePerformer = void 0, this.Logger = void 0, this.times = void 0, this.caclUsage = e => {
                        const t = Date.now();
                        this.processUsagePerformer.run().then((n => {
                            this.recordMetric(n, t, e.passedTime), a.a.LocalStat.recordAppUsage(n, t)
                        }))
                    }, this.recordMetric = (e, t, n) => {
                        const o = a.a.SchemaManager.loadSchema(r.b.app_usage);
                        if (o.statement) {
                            const s = e.reduce(((e, t) => (e.cpuTotal += t.cpu, e.memoryTotal += t.memory, e)), {
                                    cpuTotal: 0,
                                    memoryTotal: 0
                                }),
                                i = a.a.MetricFactory.create(r.b.app_usage, void 0, o);
                            i.setData({
                                cpuTotal: s.cpuTotal,
                                memoryTotal: s.memoryTotal,
                                passedTime: n
                            }), i.setStartAt(t), i.setEndAt(Date.now()), i.pushInfo(s), i.evaluate(), i.resolve(), a.a.MetricResolver.resolve(i)
                        }
                    }, this.Logger = e, this.times = [Object(i.g)("1m"), Object(i.g)("5m"), Object(i.g)("10m"), Object(i.g)("30m"), Object(i.g)("1h"), Object(i.g)("3h"), Object(i.g)("5h"), Object(i.g)("8h"), Object(i.g)("24h")]
                }
                get timelineEngine() {
                    return this._timelineEngine || (this._timelineEngine = new o.b, this._timelineEngine.onMessage(this.caclUsage)), this._timelineEngine
                }
                get processUsagePerformer() {
                    return this._processUsagePerformer || (this._processUsagePerformer = new s.a(this.Logger)), this._processUsagePerformer
                }
                start() {
                    const e = [];
                    this.times.length && (this.times.forEach((t => {
                        e.push(new o.a(t))
                    })), this.timelineEngine.startUp(e))
                }
            }
        },
        wudS: function (e, t, n) {
            "use strict";
            n.d(t, "c", (function () {
                return i
            })), n.d(t, "d", (function () {
                return a
            })), n.d(t, "b", (function () {
                return r
            })), n.d(t, "a", (function () {
                return c
            }));
            var o = n("ZcVI");
            const s = "sh_user_ids";

            function i() {
                const e = window.localStorage.getItem(s);
                let t = [];
                try {
                    e && (t = JSON.parse(e))
                } catch (n) {}
                return t
            }

            function a() {
                if (null !== window.localStorage.getItem(s)) return;
                const e = function () {
                    let e = new Set;
                    for (let t in localStorage)
                        for (let n of [o.i, o.h, o.m])
                            if (t && t.startsWith(n + "_")) {
                                let o = t.substring(n.length + 1, t.length);
                                if (o && !isNaN(+o)) {
                                    e.add(o);
                                    break
                                }
                            } return 0 == e.size ? [] : Array.from(e)
                }();
                window.localStorage.setItem(s, JSON.stringify(e))
            }

            function r(e) {
                let t = i(),
                    n = t.indexOf(e);
                return -1 === n && (t.push(e), n = t.length - 1, window.localStorage.setItem(s, JSON.stringify(t))), n
            }

            function c(e) {
                const t = window.localStorage.getItem(s);
                if (null === t) return !1;
                return -1 !== JSON.parse(t).indexOf(e)
            }
        },
        xDBg: function (e, t, n) {
            "use strict";
            n.r(t),
                function (e) {
                    var o = n("VTBJ"),
                        s = n("N1xz"),
                        i = n("KBA3"),
                        a = n("KA3I"),
                        r = n("dFSO"),
                        c = n("Na1p"),
                        d = n("AoYG");
                    t.default = class {
                        constructor(e) {
                            this._processUsagePerformer = void 0, this.Logger = void 0, this.systemInfo = void 0, this.Logger = e
                        }
                        get processMonitor() {
                            return this._processUsagePerformer || (this._processUsagePerformer = new a.a(this.Logger)), this._processUsagePerformer
                        }
                        recordAtTime(e, t) {
                            if (this.recordCurrentProcessStats(e, t), i.a.getConfig().allow_measure_usage_by_ps_cmd) {
                                const e = Date.now();
                                this.processMonitor.run().then((n => {
                                    if (s.a.LocalStat.recordUsage(n, e), null != t && t.length) {
                                        let e = [];
                                        n.forEach((e => {
                                            t.forEach((e => {}))
                                        })), e.forEach((e => {
                                            s.a.MetricResolver.resolve(e)
                                        }))
                                    }
                                }))
                            }
                        }
                        combineRendererStats(e) {
                            this.fillMetrics(e), s.a.LocalStat.recordProcessStats(e)
                        }
                        getSystemInfo() {
                            if (!this.systemInfo) {
                                const e = n("TcBx");
                                this.systemInfo = {
                                    totalMem: e.totalmem()
                                }
                            }
                            return this.systemInfo
                        }
                        recordCurrentProcessStats(t, n) {
                            const i = Date.now(),
                                a = e.getHeapStatistics(),
                                m = e.memoryUsage(),
                                u = c.a.getUsage(),
                                l = {
                                    pid: e.pid,
                                    name: s.a.process,
                                    memory: {
                                        rss: m.rss,
                                        heapTotal: m.heapTotal,
                                        heapUsed: m.heapUsed,
                                        heapSizeLimit: Object(r.c)(a.heapSizeLimit),
                                        totalHeapSizeExecutable: Object(r.c)(a.totalHeapSizeExecutable),
                                        totalPhysicalSize: Object(r.c)(a.totalPhysicalSize),
                                        totalAvailableSize: Object(r.c)(a.totalAvailableSize),
                                        mallocedMemory: Object(r.c)(a.mallocedMemory),
                                        peakMallocedMemory: Object(r.c)(a.peakMallocedMemory),
                                        doesZapGarbage: a.doesZapGarbage,
                                        external: m.external,
                                        arrayBuffers: m.arrayBuffers
                                    },
                                    cpu: Object(o.a)({}, u),
                                    recordAt: i,
                                    usageTime: i - s.a.EPOCH
                                };
                            this.fillMetrics(l), null != n && n.length && n.forEach((e => {
                                const n = s.a.MetricFactory.create(e.name, `${l.name}.${t.passedTime}`, e);
                                var o;
                                (n.setStartAt(t.startTime), n.setEndAt(i), n.setData(l, t.passedTime), e.type === d.a.CPU) ? n.pushInfo({
                                    percentCPUUsage: null === (o = l.cpu) || void 0 === o ? void 0 : o.percent,
                                    recordAt: l.recordAt,
                                    usageTime: l.usageTime,
                                    processName: l.name
                                }): e.type === d.a.MEMORY && n.pushInfo({
                                    heapUsed: l.memory.heapUsed,
                                    heapTotal: l.memory.heapTotal,
                                    rss: l.memory.rss
                                });
                                n.evaluate(), n.resolve(), s.a.MetricResolver.resolve(n)
                            })), s.a.LocalStat.recordProcessStats(l)
                        }
                        recordGpuProcessStats() {
                            const e = Date.now(),
                                t = this.processMonitor.getGPUMetrics();
                            if (t) {
                                const n = {
                                    pid: Number(t.pid),
                                    name: "GPU",
                                    memory: {
                                        workingSetSize: Object(r.c)(t.memory.workingSetSize),
                                        peakWorkingSetSize: Object(r.c)(t.memory.peakWorkingSetSize)
                                    },
                                    cpu: {
                                        percent: t.cpu.percentCPUUsage
                                    },
                                    recordAt: Number(e),
                                    usageTime: Number(e - s.a.EPOCH),
                                    creationTime: t.creationTime,
                                    sandboxed: t.sandboxed,
                                    type: t.type
                                };
                                t.memory.privateBytes && (n.memory.privateBytes = Object(r.c)(t.memory.privateBytes)), s.a.LocalStat.recordProcessStats(n)
                            }
                        }
                        fillMetrics(e) {
                            const t = this.processMonitor.getPidMetrics(e.pid);
                            t && (e.memory.workingSetSize = Object(r.c)(t.memory.workingSetSize), e.memory.peakWorkingSetSize = Object(r.c)(t.memory.peakWorkingSetSize), t.memory.privateBytes && (e.memory.privateBytes = Object(r.c)(t.memory.privateBytes)), e.creationTime = t.creationTime, e.sandboxed = t.sandboxed, e.type = t.type)
                        }
                    }
                }.call(this, n("ckNr"))
        }
    }
]);
//# sourceMappingURL=../sourcemaps/lazy/default-embed-render.2b4d98cd24bd321671d4.js.map