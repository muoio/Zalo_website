"object" != typeof globalThis && (globalThis = window), (this.webpackJsonp = this.webpackJsonp || []).push([
    [18], {
        "+eUS": function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return S
            }));
            var i = s("jDHv"),
                n = s("+ExH"),
                a = s("YEoC"),
                r = s("oRsZ"),
                o = s("IpiK"),
                l = s("d04y"),
                d = s("pRxM"),
                c = s("b3Jv"),
                h = s("4IGy"),
                u = s("xS/Y"),
                g = s("rdC+"),
                m = s("pP8i");
            const p = (e, t) => {
                if (t === a.a.IDB) switch (e) {
                    case "Core":
                        return r.a.useIdb;
                    case "MsgInfo":
                        return o.a.useIdb;
                    case "Qos":
                        return l.a.useIdb;
                    case "Reaction":
                        return d.a.useIdb;
                    case "Search":
                        return c.a.useIdb;
                    case "Storage":
                        return h.a.useIdb;
                    case "Res":
                        return u.a.useIdb;
                    case "SecureLocalstorage":
                        return g.a.useIdb;
                    case "ZLog":
                        return m.a.useIdb;
                    default:
                        return
                }
                if (t === a.a.SQLite) switch (e) {
                    case "Core":
                        return r.a.useSqlite;
                    case "MsgInfo":
                        return o.a.useSqlite;
                    case "Qos":
                        return l.a.useSqlite;
                    case "Reaction":
                        return d.a.useSqlite;
                    case "Search":
                        return c.a.useSqlite;
                    case "Storage":
                        return h.a.useSqlite;
                    case "Res":
                        return u.a.useSqlite;
                    case "SecureLocalstorage":
                        return g.a.useSqlite;
                    case "ZLog":
                        return m.a.useSqlite;
                    default:
                        return
                }
            };
            var f = s("kFM4"),
                v = s("0slR"),
                b = s("UJ0r"),
                I = s("teaq"),
                y = s("PhBv"),
                C = s("1UUk");

            function S(e) {
                Object(f.a)("RunMode", e), e !== a.e.Unknown && (i.ModuleContainer.resolve(C.b).install(), e !== a.e.Background && (setTimeout((() => {
                    i.ModuleContainer.resolve(y.b).start()
                }), 1), i.ModuleContainer.resolve(b.b).install(n.a), i.ModuleContainer.resolve(v.a).install(p), i.ModuleContainer.resolve(I.b).install()))
            }
        },
        "0rWR": function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("Mgpg"),
                r = s("YEoC"),
                o = s("DI/x"),
                l = s("PmZf"),
                d = s("LzQZ"),
                c = s("teaq"),
                h = s("UJ0r"),
                u = s("9rga");

            function g(e) {
                let t = {};
                return async function () {
                    for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++) i[n] = arguments[n];
                    const a = i.length ? i.join("-") : "";
                    if (!t[a]) return t[a] = !0, e(...i)
                }
            }
            let m = n.ModuleContainer.injectable()(i = function (e, t) {
                return n.ModuleContainer.inject(c.b)(e, void 0, 0)
            }(i = function (e, t) {
                return n.ModuleContainer.inject(a.ZLoggerFactory)(e, void 0, 1)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === c.b ? Object : c.b, void 0 === a.ZLoggerFactory ? Object : a.ZLoggerFactory])(i = class extends h.a {
                constructor(e, t) {
                    super(), this.configurationManager = e, this.logger = void 0, this.dbSchema = null, this.logger = t.createZLogger("db", ["adapter-manager"]), this.closeDatabase = g(this.closeDatabase.bind(this)), this.closeAllDatabases = g(this.closeAllDatabases.bind(this)), this.deleteDatabase = g(this.deleteDatabase.bind(this)), this.deleteAllDatabases = g(this.deleteAllDatabases.bind(this))
                }
                install(e) {
                    this.dbSchema = e
                }
                getAllDBNames() {
                    if (!this.dbSchema) throw new o.v("The adapter manager hasn't been installed yet!");
                    return Object.keys(this.dbSchema)
                }
                async closeDatabase(e) {
                    const t = this.configurationManager.getDatabaseConfigs(e).map((e => this.getSpecificAdapterManager(e.type)));
                    await Promise.all(t.map((t => t.closeDatabase(e))))
                }
                async closeAllDatabases() {
                    const e = this.getAllDBNames(),
                        t = new Set;
                    for (const n of e) {
                        this.configurationManager.getDatabaseConfigs(n).map((e => e.type)).forEach((e => t.add(e)))
                    }
                    const s = n.ModuleContainer.resolve(d.a);
                    await s.waitUntilIdle();
                    const i = [],
                        a = t.values();
                    let r = a.next();
                    for (; !r.done;) {
                        const e = this.getSpecificAdapterManager(Number(r.value));
                        i.push(e.closeAllDatabases()), r = a.next()
                    }
                    await Promise.all(i)
                }
                async deleteDatabase(e) {
                    const t = this.configurationManager.getDatabaseConfigs(e).map((e => this.getSpecificAdapterManager(e.type)));
                    await Promise.all(t.map((t => t.deleteDatabase(e))))
                }
                async deleteAllDatabases() {
                    const e = this.getAllDBNames(),
                        t = new Set;
                    for (const n of e) {
                        this.configurationManager.getDatabaseConfigs(n).map((e => e.type)).forEach((e => t.add(e)))
                    }
                    const s = n.ModuleContainer.resolve(d.a);
                    await s.waitUntilIdle();
                    const i = [],
                        a = t.values();
                    let r = a.next();
                    for (; !r.done;) {
                        const e = this.getSpecificAdapterManager(Number(r.value));
                        i.push(e.deleteAllDatabases()), r = a.next()
                    }
                    await Promise.all(i)
                }
                doesDatabaseExists(e) {
                    const t = this.configurationManager.getDatabaseConfigs(e).map((e => this.getSpecificAdapterManager(e.type)));
                    return Promise.all(t.map((t => t.doesDatabaseExist(e)))).then((e => e.reduce(((e, t) => e && t), !0)))
                }
                getDatabaseAdapter(e, t, s) {
                    return this.getSpecificAdapterManager(t.type).getDatabaseAdapterForPlanner(e, t, s)
                }
                canUse(e) {
                    return e !== r.a.SQLite || this.canIUseSQLite()
                }
                canIUseSQLite() {
                    return !1
                }
                getSpecificAdapterManager(e) {
                    let t = u.b;
                    if (e === r.a.SQLite) t = u.c;
                    const s = n.ModuleContainer.resolve(t);
                    return s.hasAlreadyInitialized || (s.install(this.dbSchema), s.addEventListener(l.a.UnexpectedError, (e => {
                        this.dispatchEvent(new l.d(e.error))
                    }))), s
                }
            }) || i) || i) || i) || i) || i;
            n.ModuleContainer.registerSingleton(h.b, m)
        },
        27: function (e, t) {},
        "5yGw": function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("Mgpg"),
                r = s("DI/x"),
                o = s("PmZf"),
                l = s("1UUk"),
                d = s("0slR"),
                c = s("d/or"),
                h = s("teaq");
            let u = n.ModuleContainer.injectable()(i = function (e, t) {
                return n.ModuleContainer.inject(c.a)(e, void 0, 0)
            }(i = function (e, t) {
                return n.ModuleContainer.inject(d.a)(e, void 0, 1)
            }(i = function (e, t) {
                return n.ModuleContainer.inject(a.ZLoggerFactory)(e, void 0, 2)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === c.a ? Object : c.a, void 0 === d.a ? Object : d.a, void 0 === a.ZLoggerFactory ? Object : a.ZLoggerFactory])(i = class {
                constructor(e, t, s) {
                    this.settingsManager = e, this.adapterBuilder = t, this.configCache = void 0, this.logger = void 0, this.logger = s.createZLogger("db", ["config"]), this.configCache = new Map
                }
                install() {
                    n.ModuleContainer.resolve(l.b).addEventListener(o.a.SessionChange, (() => {
                        this.clearCache()
                    }))
                }
                getDatabaseConfigs(e) {
                    const t = this.configCache.get(e);
                    return t || this.createConfigCache(e)
                }
                clearCache() {
                    const e = this.configCache.values();
                    let t = e.next();
                    for (; !t.done;) {
                        t.value.forEach((e => e.clearCache())), t = e.next()
                    }
                    this.configCache.clear()
                }
                createConfigCache(e) {
                    const t = [],
                        s = this.getCurrentConfig(e);
                    if (s) {
                        t.push(s);
                        const i = this.getConfigForMigrate(e, s.type);
                        i && t.push(i)
                    }
                    return this.configCache.set(e, t), t
                }
                getConfigForMigrate(e, t) {
                    const s = this.settingsManager;
                    let i, n = s.getPreferredAdapter(e);
                    if (n !== t) {
                        if (n && (i = this.adapterBuilder.computeDatabaseConfig(e, n)), !n || !i) {
                            const t = s.preferAdapters;
                            for (let s = 0; s < t.length && (n = t[s], i = this.adapterBuilder.computeDatabaseConfig(e, n), !i); s++);
                        }
                        return i && t !== n ? i : void 0
                    }
                }
                getCurrentConfig(e) {
                    const t = this.settingsManager.getCurrentAdapterType(e);
                    if ("number" != typeof t) throw new r.g(`${t} is not a valid AdapterType value!`);
                    return this.adapterBuilder.computeDatabaseConfig(e, t)
                }
            }) || i) || i) || i) || i) || i) || i;
            n.ModuleContainer.registerSingleton(h.b, u)
        },
        "9rga": function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return u
            })), s.d(t, "b", (function () {
                return p
            })), s.d(t, "c", (function () {
                return f
            }));
            var i = s("jDHv"),
                n = s("Uzj0"),
                a = s("AH6j"),
                r = s("Mgpg"),
                o = s("YEoC"),
                l = s("DI/x"),
                d = s("PmZf"),
                c = s("1UUk"),
                h = s("0slR");
            class u extends a.b {
                constructor() {
                    super(), this.session = void 0, this.dbSchema = null, this.adapterContainers = void 0, this.adapterBuilder = void 0, this.logger = void 0, this.adapterContainers = new Map, this.adapterBuilder = i.ModuleContainer.resolve(h.a);
                    const e = i.ModuleContainer.resolve(r.ZLoggerFactory);
                    this.logger = e.createZLogger("db", [this.getManagerName()])
                }
                install(e) {
                    this.dbSchema = e, i.ModuleContainer.resolve(c.b).addEventListener(d.a.SessionChange, (e => {
                        this.session = e.session, this.adapterContainers.clear()
                    }))
                }
                get hasAlreadyInitialized() {
                    return !!this.dbSchema
                }
                prepareAdapter(e) {
                    return e.addEventListener(d.a.UnexpectedError, (e => {
                        this.dispatchEvent(new d.d(e.error))
                    })), e
                }
                getAllDBNames() {
                    if (!this.dbSchema) throw new l.v(`The following adapter manager hasn't been installed yet: ${this.getManagerName()}!`);
                    return Object.keys(this.dbSchema)
                }
                getTablesNameOfDB(e) {
                    if (!this.dbSchema) throw new l.v(`The following adapter manager hasn't been installed yet: ${this.getManagerName()}!`);
                    const t = this.dbSchema[e];
                    if (!t) throw new l.n(e);
                    return Object.values(t).map((e => e.name))
                }
                async getDatabaseAdaptersFromScratch(e, t) {
                    void 0 === t && (t = !1);
                    const s = this.adapterBuilder.computeDatabaseConfig(e, this.getAdapterType());
                    if (!s) throw new l.m(e);
                    const i = {};
                    let n = this.getTablesNameOfDB(e);
                    for (const o of n) {
                        const t = this.adapterBuilder.computeDatabaseName(s, o, this.session),
                            n = this.adapterBuilder.computePartitionConfig(s, o, this.session);
                        if (!n) throw new l.p(o, this.session);
                        const a = this.adapterBuilder.computeTableConfig(n, o, e);
                        if (!a) throw new l.r(o);
                        let r = [];
                        s.supportPartitionByField && a.supportPartitionByField && (r = await this.getPartitionValues(t));
                        let d = [];
                        d = r.length ? r.map((e => "" !== e ? `${t}/${e}` : t)) : [t];
                        for (const e of d) i[e] || (i[e] = n)
                    }
                    const a = Object.keys(i);
                    for (const o of a) {
                        await this.isFullnameOfExistedDatabase(o) || delete i[o]
                    }
                    const r = Object.entries(i).map((e => {
                        let [s, i] = e;
                        return t ? this.getCreatedDatabaseAdapter(s, i) : this.adapterBuilder.computeDatabaseAdapter(s, i)
                    }));
                    return Promise.all(r).then((e => e.filter(Boolean)))
                }
                async doesDatabaseExist(e) {
                    const t = this.adapterBuilder.computeDatabaseConfig(e, this.getAdapterType());
                    if (!t) throw new l.m(e);
                    let s = this.getTablesNameOfDB(e);
                    const i = new Set;
                    for (const r of s) {
                        const s = this.adapterBuilder.computeDatabaseName(t, r, this.session),
                            n = this.adapterBuilder.computePartitionConfig(t, r, this.session);
                        if (!n) throw new l.p(r, this.session);
                        const a = this.adapterBuilder.computeTableConfig(n, r, e);
                        if (!a) throw new l.r(r);
                        let o = [];
                        t.supportPartitionByField && a.supportPartitionByField && (o = await this.getPartitionValues(s));
                        let d = [];
                        d = o.length ? o.map((e => "" !== e ? `${s}/${e}` : s)) : [s], d.forEach((e => i.add(e)))
                    }
                    const n = i.values();
                    let a = n.next();
                    for (; !a.done;) {
                        const e = a.value;
                        if (await this.isFullnameOfExistedDatabase(e)) return !0;
                        a = n.next()
                    }
                    return !1
                }
                getDatabaseAdapterForPlanner(e, t, s) {
                    const i = `${e}_${t.type}`;
                    let a = this.adapterContainers.get(i);
                    return a || (a = new n.b.Container, this.adapterContainers.set(i, a), this.adapterBuilder.computeDatabaseAdapter(e, t).then((e => {
                        e && (e = this.prepareAdapter(e)), a.resolve(e)
                    })).catch(a.reject)), a.value || a.promise.then((() => s())).catch((e => {
                        const t = new l.b(i, e.message);
                        this.logger.zsymb(18, 8706, 3e4, (() => [t])), this.dispatchEvent(new d.d(t))
                    })), a.value
                }
                async getCreatedDatabaseAdapter(e, t) {
                    const s = `${e}_${t.type}`;
                    let i = this.adapterContainers.get(s);
                    return i ? (i.value || await i.promise, i.value) : null
                }
                async closeDatabase(e) {
                    const t = (await this.getDatabaseAdaptersFromScratch(e, !0)).map((e => e.closeThisDatabase()));
                    return Promise.all(t).then((() => Promise.resolve())).catch((t => this.logger.zsymb(3, 8706, 30001, "CLOSE database failed!", e, t)))
                }
                closeAllDatabases() {
                    let e = this.getAllDBNames().map((e => this.closeDatabase(e)));
                    return Promise.all(e).then((() => Promise.resolve())).catch((e => this.logger.zsymb(3, 8706, 30002, "CLOSE ALL databases failed!", e)))
                }
                async deleteDatabase(e) {
                    const t = await this.getDatabaseAdaptersFromScratch(e);
                    0 === t.length && this.logger.zsymb(3, 8706, 30003, "'{}' database doesn't exist -> Skip its deletion", e);
                    const s = t.map((e => e.deleteThisDatabase()));
                    return Promise.all(s).then((() => Promise.resolve())).catch((t => this.logger.zsymb(3, 8706, 30004, "DELETE database failed!", e, t)))
                }
                async deleteAllDatabases() {
                    const e = this.getAllDBNames().map((e => this.deleteDatabase(e)));
                    await Promise.all(e).then((() => Promise.resolve())).catch((e => this.logger.zsymb(3, 8706, 30005, "DELETE ALL databases failed!", e)))
                }
            }
            const g = `database-adapter-manager-${o.a.IDB}`,
                m = `database-adapter-manager-${o.a.SQLite}`,
                p = Object(i.define)(g),
                f = Object(i.define)(m)
        },
        BtX6: function (e, t, s) {
            s("E2g8").polyfill()
        },
        HPcM: function (e, t, s) {
            "use strict";
            s.d(t, "b", (function () {
                return n
            })), s.d(t, "a", (function () {
                return a
            }));
            var i = s("jDHv");
            const n = Object(i.define)("zlog-sentry-bucket"),
                a = Object(i.define)("zlog-regular-bucket")
        },
        K8kB: function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return n
            }));
            var i = s("jDHv");
            const n = Object(i.define)("zlog-write-scheduler")
        },
        KRcn: function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return n
            }));
            var i = s("PLj1");

            function n() {
                let e;
                try {
                    switch (__ZaBUNDLENAME__.toLocaleLowerCase()) {
                        case "main":
                            e = i.b.Main;
                            break;
                        case "web":
                            e = i.b.Web;
                            break;
                        case "login":
                            e = i.b.Login;
                            break;
                        case "photo":
                            e = i.b.Photo;
                            break;
                        case "render":
                            e = i.b.Render;
                            break;
                        case "shared-worker":
                            e = i.b.SharedWorker;
                            break;
                        default:
                            e = i.b.Unknown
                    }
                } catch {
                    e = i.b.Unknown
                }
                return e
            }
        },
        KdAX: function (e, t, s) {
            "use strict";
            var i = s("jDHv"),
                n = s("W8fB"),
                a = s("UJDs"),
                r = s("7FSS"),
                o = (s("j6JD"), s("VTBJ"));
            const l = s("4JQ2"),
                d = {
                    intro: e => d.eol(e),
                    info: e => e,
                    debug: e => e,
                    warning: e => e,
                    error: e => e,
                    placeholder: e => e,
                    tick: e => e,
                    header: e => l.green(e),
                    sourcemap: e => l.gray(e),
                    level: e => e,
                    bold: e => l.bold(e),
                    eol: e => e + "\n\n"
                },
                c = (Object(o.a)(Object(o.a)({}, d), {}, {
                    intro: e => d.eol(l.bgWhite.black(e)),
                    info: e => l.white(e),
                    debug: e => l.blue(e),
                    warning: e => l.yellow(e),
                    error: e => l.red(e),
                    tick: e => l.black.bgWhite.bold(` ${e} `),
                    header: e => e
                }), d);
            s("CDcE");
            const h = {
                    display: !0,
                    style: "font-size: 11px; color: gray"
                },
                u = {
                    display: !1,
                    style: "font-size: 11px; color: gray; margin-bottom: 8px"
                };

            function g(e) {
                let {
                    lineMeta: t,
                    template: s,
                    args: i
                } = e;
                if ("number" == typeof s) return "Error: expected template as string. Got number?! [" + t.id1 + ":" + t.id2 + "]";
                const n = [t.module, t.features.join("/")].map((e => e || "?")).join("|");
                let a = i.map((e => function (e) {
                    let t = e;
                    if ("function" == typeof e) try {
                        t = e()
                    } catch (s) {
                        r.a.error("ZLogSanitizer: failed to exec func. Please make sure your func executable" + s), t = e.toString()
                    }
                    return t
                }(e)));
                1 === a.length && 1 === i.length && "function" == typeof i[0] && Array.isArray(a[0]) && (a = a[0]);
                const o = function (e, t) {
                        if (null === e) return "";
                        const s = "{}";
                        let i = 0;
                        for (; - 1 !== e.search(s) && i < t.length;) switch (typeof t[i++]) {
                            case "number":
                                e = e.replace(s, "%d");
                                break;
                            case "string":
                            default:
                                e = e.replace(s, "%s");
                                break;
                            case "object":
                                e = e.replace(s, "%o")
                        }
                        return e
                    }(s, a).trim(),
                    l = (t.id1.toString().substring(t.id1.toString().indexOf("src")), t.id2, ""),
                    d = [];
                return h.display && n.trim() && d.push(c.sourcemap(n.trim()) + "\n"), u.display && l.trim() && d.push(c.sourcemap(l) + "\n"), o.trim() && d.push(o.trim()), a.length > 0 ? (a.unshift(d.join(" ")), a) : [d.join(" ")]
            }
            var m;
            let p = Object(i.injectable)()(m = class {
                write(e) {
                    const t = g(e);
                    switch (e.lineMeta.level) {
                        case a.b.info:
                            r.a.log.apply(null, t);
                            break;
                        case a.b.warn:
                            r.a.warn.apply(null, t);
                            break;
                        case a.b.debug:
                            r.a.debug.apply(null, t);
                            break;
                        case a.b.error:
                            r.a.error.apply(null, t);
                            break;
                        default:
                            r.a.log.apply(null, t)
                    }
                }
            }) || m;
            i.ModuleContainer.registerSingleton(n.a, p)
        },
        Lq8m: function (e, t, s) {
            "use strict";
            (function (e) {
                var t, i = s("jDHv"),
                    n = s("Uzj0"),
                    a = s("Mgpg"),
                    r = s("UK4g"),
                    o = s("YEoC"),
                    l = s("DI/x"),
                    d = s("tHMN"),
                    c = s("ipeT"),
                    h = s("LzQZ"),
                    u = s("pjo1");
                let g = i.ModuleContainer.injectable()(t = function (e, t) {
                    return i.ModuleContainer.inject(d.b)(e, void 0, 0)
                }(t = function (e, t) {
                    return i.ModuleContainer.inject(a.ZLoggerFactory)(e, void 0, 1)
                }(t = function (e, t) {
                    return i.ModuleContainer.inject(h.a)(e, void 0, 2)
                }(t = Reflect.metadata("design:type", Function)(t = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === a.ZLoggerFactory ? Object : a.ZLoggerFactory, void 0 === h.a ? Object : h.a])(t = class {
                    constructor(e, t, s) {
                        this.engine = e, this.loggerFactory = t, this.transactionManager = s, this.logger = void 0, this.logger = this.loggerFactory.createZLogger("db", ["client"])
                    }
                    createQueryBuilder(e) {
                        const t = n.c.map(e, ((e, t) => this.createBuilder(e, t)));
                        return t.deleteAllDatabases = this.deleteAllDatabases.bind(this), t.closeAllDatabases = this.closeAllDatabases.bind(this), t
                    }
                    createBuilder(e, t, s) {
                        const i = n.c.map(t, ((t, i) => new c.a(this.engine, e, i, r.j, s)));
                        return i.runTransaction = this.runTransaction.bind(this, e, t), i.deleteThisDatabase = this.deleteDatabase.bind(this, e), i.closeThisDatabase = this.closeDatabase.bind(this, e), i.doesThisDatabaseExist = this.doesDatabaseExists.bind(this, e), i
                    }
                    runTransaction(t, s, i, n, a) {
                        void 0 === a && (a = o.f.READWRITE);
                        const r = this.transactionManager,
                            d = this.engine;
                        return new Promise(((o, h) => {
                            try {
                                !async function (o, h) {
                                    const u = i.map((e => "string" == typeof e ? e : e.name)),
                                        g = await r.beginTransaction(t, u, a),
                                        m = u.map((e => {
                                            if (!s[e]) throw new l.r(e);
                                            const i = s[e];
                                            return new c.a(d, t, i, g.id)
                                        }));
                                    await n(m), e((() => {
                                        r.commitTransaction(g.id).then(o).catch(h)
                                    }))
                                }(o, h)
                            } catch (u) {
                                h(u)
                            }
                        }))
                    }
                    deleteDatabase(e) {
                        return this.engine.deleteDatabase(e)
                    }
                    deleteAllDatabases() {
                        return this.engine.deleteAllDatabases()
                    }
                    closeDatabase(e) {
                        return this.engine.closeDatabase(e)
                    }
                    closeAllDatabases() {
                        return this.engine.closeAllDatabases()
                    }
                    doesDatabaseExists(e) {
                        return this.engine.doesDatabaseExists(e)
                    }
                }) || t) || t) || t) || t) || t) || t;
                i.ModuleContainer.registerSingleton(u.a, g)
            }).call(this, s("NWH6").setImmediate)
        },
        PLj1: function (e, t, s) {
            "use strict";
            s.d(t, "b", (function () {
                return n
            })), s.d(t, "c", (function () {
                return a
            })), s.d(t, "a", (function () {
                return r
            }));
            var i = s("fsQs");
            let n;
            ! function (e) {
                e.Main = "main", e.Render = "render", e.SharedWorker = "shared-worker", e.Unknown = "unknown", e.Photo = "photo", e.Web = "web", e.Embed = "embed", e.Login = "login"
            }(n || (n = {}));
            const a = {
                    [n.Main]: i.e,
                    [n.Render]: i.e,
                    [n.SharedWorker]: i.e,
                    [n.Unknown]: i.e,
                    [n.Photo]: i.e,
                    [n.Web]: i.g,
                    [n.Embed]: -1,
                    [n.Login]: i.f
                },
                r = [n.Embed, n.Unknown]
        },
        UJDs: function (e, t, s) {
            "use strict";
            let i;
            s.d(t, "b", (function () {
                    return i
                })), s.d(t, "a", (function () {
                    return n
                })),
                function (e) {
                    e[e.info = 0] = "info", e[e.error = 1] = "error", e[e.warn = 2] = "warn", e[e.debug = 3] = "debug", e[e.critical = 4] = "critical"
                }(i || (i = {}));
            const n = {
                [i.info]: "info",
                [i.error]: "error",
                [i.warn]: "warn",
                [i.debug]: "debug",
                [i.critical]: "critical"
            }
        },
        W8fB: function (e, t, s) {
            "use strict";
            s.d(t, "b", (function () {
                return n
            })), s.d(t, "a", (function () {
                return a
            })), s.d(t, "c", (function () {
                return r
            }));
            var i = s("jDHv");
            const n = Object(i.define)("sen-log-writer"),
                a = Object(i.define)("console-log-writer"),
                r = Object(i.define)("zlog-writer")
        },
        XidR: function (e, t, s) {
            "use strict";
            var i = s("jDHv"),
                n = s("YEoC"),
                a = s("x9oK"),
                r = s("9rga");
            class o extends r.a {
                getAdapterFactoryToken() {
                    return a.b
                }
                async isFullnameOfExistedDatabase(e) {
                    try {
                        return (await
                            function (e) {
                                const t = globalThis.indexedDB.open(e);
                                return new Promise(((s, i) => {
                                    t.onupgradeneeded = function () {
                                        var s;
                                        null === (s = t.transaction) || void 0 === s || s.abort(), i(new d(`No database whose name is ${e} exists`))
                                    }, t.onsuccess = function () {
                                        s(t.result)
                                    }, t.onerror = function () {
                                        i(t.error)
                                    }
                                }))
                            }(e)).close(), !0
                    } catch (t) {
                        if (t.name === l) return !1;
                        throw t
                    }
                }
                getManagerName() {
                    return "idb-adapter-manager"
                }
                async getPartitionValues(e) {
                    return []
                }
                getAdapterType() {
                    return n.a.IDB
                }
            }
            i.ModuleContainer.registerSingleton(r.b, o);
            const l = "NonExistedDBError";
            class d extends Error {
                constructor(e) {
                    super(e), this.name = l
                }
            }
        },
        XuBa: function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return n
            }));
            const i = s("NFKh");
            class n {
                static encrypt(e) {
                    return i.AES.encrypt(e, "5dbe084b7eedNWjRref04e2rDxs01lwH", {
                        iv: "7eb5dbe084b7eedeef04e2622d46ba00",
                        mode: i.mode.ECB,
                        padding: i.pad.Pkcs7
                    }) + ""
                }
                static decrypt(e) {
                    return i.AES.decrypt(e, "5dbe084b7eedNWjRref04e2rDxs01lwH", {
                        keySize: 16,
                        iv: "7eb5dbe084b7eedeef04e2622d46ba00",
                        mode: i.mode.ECB,
                        padding: i.pad.Pkcs7
                    }).toString(i.enc.Utf8)
                }
            }
        },
        Y41u: function (e, t, s) {
            "use strict";
            let i;
            s.d(t, "c", (function () {
                    return i
                })), s.d(t, "b", (function () {
                    return n
                })), s.d(t, "a", (function () {
                    return a
                })),
                function (e) {
                    e.RegLogBucketStatus = "RegLogBucketStatus", e.SentryLogBucketStatus = "SentryLogBucketStatus", e.WriteSchedulerRequestFlush = "WriteSchedulerRequestFlush", e.WriterStatus = "WriterStatus", e.LogBucketRequestFlush = "LogBucketRequestFlush"
                }(i || (i = {}));
            class n {
                constructor(e, t) {
                    this.type = e, this.payload = t
                }
            }
            class a {
                constructor(e) {
                    this.type = e
                }
            }
        },
        cF85: function (e, t, s) {
            "use strict";
            var i = s("jDHv"),
                n = s("x9oK"),
                a = s("PmZf"),
                r = s("AH6j");
            let o;
            ! function (e) {
                e.AbnormallyClose = "abnormally-closed"
            }(o || (o = {}));
            class l extends r.a {
                constructor() {
                    super(o.AbnormallyClose)
                }
            }
            var d = s("LzQZ"),
                c = s("rvru"),
                h = s("xpEm"),
                u = s("DI/x");

            function g(e) {
                return new Promise(((t, s) => {
                    e.onerror = () => s(e.error), e.onsuccess = () => t(e.result)
                }))
            }

            function m(e, t, s) {
                return `Invalid filter value for this method: '${e}' - Expected type: '${t}' - Actual type: '${s}'`
            }

            function p(e, t) {
                const s = Object(h.m)(t, {
                    operations: {
                        AND: h.a,
                        OR: h.k,
                        NOT: h.j,
                        gt: h.c,
                        gte: h.d,
                        lt: h.f,
                        lte: h.g,
                        in: h.e,
                        notIn: h.i,
                        eq: h.b,
                        notEq: h.h,
                        contains(e, t, s) {
                            if ("string" != typeof e) {
                                const t = m("contains", "string", typeof e);
                                throw new u.l(t)
                            }
                            return Object(h.l)((t => "string" == typeof t && t.includes(e)), t, s)
                        },
                        startsWith(e, t, s) {
                            if ("string" != typeof e) {
                                const t = m("startsWith", "string", typeof e);
                                throw new u.l(t)
                            }
                            return Object(h.l)((t => "string" == typeof t && t.startsWith(e)), t, s)
                        },
                        endsWith(e, t, s) {
                            if ("string" != typeof e) {
                                const t = m("endsWith", "string", typeof e);
                                throw new u.l(t)
                            }
                            return Object(h.l)((t => "string" == typeof t && t.endsWith(e)), t, s)
                        }
                    }
                });
                return s(e)
            }
            class f extends r.b {
                constructor(e) {
                    super(), this.connectionFactory = e, this.connection = null, this.isManuallyClose = !1, this.onAbnormallyCloseListeners = []
                }
                async getName() {
                    return (await this.getConnection()).name
                }
                async getObjectStoreNames() {
                    return (await this.getConnection()).objectStoreNames
                }
                async getVersion() {
                    return (await this.getConnection()).version
                }
                async getConnection(e) {
                    void 0 === e && (e = !1);
                    const t = async () => {
                        let e = null;
                        try {
                            e = await this.connectionFactory()
                        } catch (t) {
                            let e = t;
                            throw "VersionError" === t.name && (e = new u.k(t.message)), this.dispatchEvent(new a.d(e)), t
                        }
                        return e.onclose = () => {
                            this.dispatchEvent(new l)
                        }, e
                    };
                    if (this.connection) {
                        if (e) {
                            if (this.isManuallyClose) throw new u.d("The database connection has manually been closed!", ["idb"]);
                            const e = this.connection;
                            this.onAbnormallyCloseListeners.forEach((t => {
                                e.removeEventListener("close", t)
                            })), this.connection = await t()
                        }
                    } else this.connection = await t();
                    return this.connection
                }
                async getTransaction(e, t) {
                    let s = await this.getConnection(),
                        i = null;
                    try {
                        i = s.transaction(e, t)
                    } catch (n) {
                        if (!n || "InvalidStateError" !== n.name && 11 !== n.code) throw n;
                        s = await this.getConnection(!0), i = s.transaction(e, t)
                    }
                    return i
                }
                close() {
                    this.connection && !this.isManuallyClose && (this.connection.close(), this.isManuallyClose = !0)
                }
            }
            var v = s("bSii"),
                b = s("3wcW");
            class I extends b.a {
                constructor(e, t, s) {
                    super(e, t, !1), this._transaction = s, this.allowMissingTable = !1
                }
                async delete() {}
                async close() {
                    this.instance && this.instance.close()
                }
                async _getTables() {
                    return Array.from(this.instance.objectStoreNames)
                }
                async _createTable(e) {
                    const t = this.instance;
                    let s = {};
                    if (e.isNonFieldlikeEntity) s = {
                        autoIncrement: !0
                    };
                    else {
                        const t = e.primaryIndex;
                        s = {
                            keyPath: Object(v.a)(t.getRealFields()),
                            autoIncrement: t.autoIncrement
                        }
                    }
                    if (t.objectStoreNames.contains(e.tableName)) return;
                    const i = t.createObjectStore(e.tableName, s);
                    Object.values(e.indices).map((e => {
                        if ("primary" === e.name) return;
                        const t = e.fields.map((e => "object" != typeof e ? e : "length" === e.type ? `${e.field.toString()}.length` : e.field));
                        i.createIndex(e.name, Object(v.a)(t), {
                            unique: e.unique
                        })
                    }))
                }
                async _createIndex(e, t) {
                    const s = this._transaction;
                    if (!s) throw new u.u(`Can't create '${t}' due to unavailable IDBTransaction transaction!`);
                    const i = s.objectStore(e.tableName),
                        n = e.getIndex(t),
                        a = n.fields.map((e => "object" != typeof e ? e : "length" === e.type ? `${e.field.toString()}.length` : e.field));
                    var r;
                    i.createIndex(t, 1 === (r = a).length ? r[0] : r, {
                        unique: n.unique
                    })
                }
                _addColumns(e, t) {
                    return Promise.resolve()
                }
            }
            var y = s("VTBJ"),
                C = s("YEoC"),
                S = s("X2RP");
            class _ extends S.a {
                constructor(e, t) {
                    super(), this.instance = e, this.transactionManager = t
                }
                getExecutorName() {
                    return "idb"
                }
                async clear(e) {
                    let {
                        transaction: t,
                        meta: s
                    } = e;
                    const i = s.tableConfig;
                    return g((await this.getStore(t, i, C.f.READWRITE)).clear())
                }
                async get(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = i.index,
                        a = i.key,
                        r = s.tableConfig,
                        o = await this.getStoreOrIndex(t, r, n),
                        l = this.validateKey(r, n, a),
                        d = o.get(l);
                    return this.getResult(r, d)
                }
                async getMulti(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = i.index,
                        a = i.keys,
                        r = s.tableConfig,
                        o = await this.getStoreOrIndex(t, r, n),
                        l = a.map((e => {
                            const t = this.validateKey(r, n, e),
                                s = o.get(t);
                            return this.getResult(r, s)
                        }));
                    return Promise.all(l)
                }
                getAll(e) {
                    return e.params.direction === C.b.PREV || e.params.direction === C.b.PREV_UNIQUE || e.params.filter || e.params.predicate || e.params.aborted || e.params.onProgress || e.params.onValue ? this.getAllByCursor(e) : this.getAllWithoutFilter(e)
                }
                async getAllKey(e) {
                    let {
                        meta: t,
                        params: s,
                        transaction: i
                    } = e;
                    const n = t.tableConfig,
                        a = s.range && this.toIDBKeyRange(s.range);
                    return g((await this.getStoreOrIndex(i, n, s.index)).getAllKeys(a, s.limit))
                }
                async getAndUpdate(e) {
                    const {
                        transaction: t,
                        params: s,
                        meta: i
                    } = e, n = s.index, a = s.updater, r = s.key, o = i.tableConfig, l = await this.getStoreOrIndex(t, o, n), d = this.validateKey(o, n, r), c = l.get(d), h = await this.getResult(o, c);
                    if (void 0 === h) return;
                    const m = await this.getStore(t, o, C.f.READWRITE),
                        p = await a(h || {});
                    if (!p && !1 !== s.ignoreNotFound) throw new u.f("Update undefined document");
                    const f = this.toDB(o, p),
                        v = m.put(f);
                    return await g(v), p
                }
                insert(e) {
                    return e.params.replace ? this._insertOrReplace(e) : this._insertIfNotExist(e)
                }
                insertMulti(e) {
                    return e.params.replace ? this.insertOrReplaceMulti(e) : this.insertIfNotExistMulti(e)
                }
                async update(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getStore(t, n, C.f.READWRITE);
                    return this._update(a, this.validateKey(n, "primary", i.key), i.attributes, this.toDB(n, i.value, !1), i.ignoreNotFound).then((t => t ? this.fromDB(e.meta.tableConfig, t) : t))
                }
                async updateMulti(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getStore(t, n, C.f.READWRITE), r = [], o = [], l = i.patches.map((t => this._update(a, this.validateKey(n, "primary", t.key), t.attributes, this.toDB(n, t.value, !1), i.ignoreNotFound).then((t => t ? this.fromDB(e.meta.tableConfig, t) : t)).then((e => {
                        e ? r.push(e) : o.push(e)
                    }))));
                    return Promise.all(l).then((() => ({
                        success: r,
                        fail: o
                    })))
                }
                async delete(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = s.tableConfig,
                        a = (await this.getStore(t, n, C.f.READWRITE)).delete(this.validateKey(n, "primary", i.key));
                    return this.checkReqSuccessOrFail(a)
                }
                async deleteMulti(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = s.tableConfig,
                        a = await this.getStore(t, n, C.f.READWRITE),
                        r = i.keys.map((e => a.delete(e)));
                    return Promise.all(r.map((e => this.checkReqSuccessOrFail(e))))
                }
                async count(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = s.tableConfig,
                        a = this.toIDBKeyRange(i.range);
                    return g((await this.getStoreOrIndex(t, n, i.index)).count(a))
                }
                async findAndDelete(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = s.tableConfig,
                        {
                            filter: a
                        } = i,
                        r = a ? e => p(e, a) : null,
                        o = this.toIDBKeyRange(i.range),
                        l = (await this.getStore(t, n, C.f.READWRITE)).openCursor(o);
                    return null === l ? 0 : new Promise(((e, t) => {
                        let s = 0,
                            i = !1;
                        l.onsuccess = () => {
                            if (i) return;
                            const t = l.result;
                            if (null === t || null === t.value) return i = !0, void e(s);
                            const a = this.fromDB(n, t.value);
                            r && !r(a) || (t.delete(), s += 1, !i) ? t.continue() : e(s)
                        }, l.onerror = () => {
                            t(l.error)
                        }
                    }))
                }
                beginTransaction(e) {
                    throw new u.a("beginTransaction", ["idb"])
                }
                commitTransaction(e) {
                    throw new u.a("commitTransaction", ["idb"])
                }
                async getAllByCursor(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i,
                        deferrer: n
                    } = e;
                    const a = s.tableConfig,
                        {
                            onProgress: r,
                            advance: o,
                            stepCount: l,
                            onValue: d,
                            predicate: c,
                            filter: h
                        } = i;
                    if (c && h) {
                        const e = new u.l("Query using both 'filter' and 'predicate' is not allowed!");
                        return void(null == n || n.reject(e))
                    }
                    let g = null;
                    (c || h) && (g = c || (e => p(e, h)));
                    const m = await this.getStoreOrIndex(t, a, i.index),
                        f = this.toIDBKeyRange(i.range),
                        v = m.openCursor(f, i.direction);
                    return null === v ? [] : new Promise(((e, t) => {
                        const s = [];
                        let n = !1,
                            c = !!o;
                        v.onsuccess = () => {
                            if (n) return;
                            const t = v.result;
                            if (null === t || null === t.value) return n = !0, void e(s);
                            if (c && o) return c = !1, void t.advance(o);
                            const h = this.fromDB(a, t.value);
                            d && d(h), g && !g(h) || (s.push(h), r && r(s, h), n = s.length > i.limit, n || (n = !!i.aborted && i.aborted(s, h)), !n) ? (l && t.advance(l), t.continue()) : e(s)
                        }, v.onerror = () => {
                            t(v.error)
                        }
                    }))
                }
                async getAllWithoutFilter(e) {
                    let {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e;
                    const n = s.tableConfig,
                        a = this.toIDBKeyRange(i.range),
                        r = (await this.getStoreOrIndex(t, n, i.index)).getAll(a, i.limit);
                    return this.getResult(n, r)
                }
                async getStoreOrIndex(e, t, s) {
                    const i = await this.getStore(e, t, C.f.READONLY);
                    if ("primary" === s) return i;
                    const n = t.getIndex(s);
                    if (!n) throw new u.o(s);
                    return i.index(n.name)
                }
                async _insertIfNotExist(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getTransaction(t, n, C.f.READWRITE), r = a.objectStore(n.tableName);
                    let o = null;
                    if (!n.isNonFieldlikeEntity) {
                        const e = n.primaryIndex;
                        if (!e.autoIncrement) {
                            const t = Object(v.a)(e.createKey(i.value)),
                                s = r.get(t);
                            o = await new Promise((e => {
                                s.onsuccess = () => {
                                    const t = this.fromDB(n, s.result);
                                    e(t)
                                }, s.onerror = () => {
                                    e(null)
                                }
                            }))
                        }
                    }
                    if (o) return Promise.resolve(o); {
                        const e = r.add(this.toDB(n, i.value));
                        return t ? g(e).then((() => i.value)) : new Promise(((t, s) => {
                            a.oncomplete = () => {
                                t(i.value)
                            }, a.onerror = () => {
                                var n;
                                0 === (null === (n = e.error) || void 0 === n ? void 0 : n.code) ? t(i.value) : s(e.error)
                            }
                        }))
                    }
                }
                async _insertOrReplace(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getTransaction(t, n, C.f.READWRITE), r = a.objectStore(n.tableName).put(this.toDB(n, i.value));
                    return t ? g(r).then((() => i.value)) : new Promise(((e, t) => {
                        a.oncomplete = () => {
                            e(i.value)
                        }, a.onerror = () => {
                            t(r.error)
                        }
                    }))
                }
                async insertIfNotExistMulti(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getTransaction(t, n, C.f.READWRITE), r = a.objectStore(n.tableName), o = [], l = [], d = i.values.map((async e => {
                        let t = !1;
                        if (!n.isNonFieldlikeEntity) {
                            const s = n.primaryIndex;
                            if (!s.autoIncrement) {
                                const i = Object(v.a)(s.createKey(e)),
                                    a = r.get(i);
                                t = await new Promise((e => {
                                    a.onsuccess = () => {
                                        const t = this.fromDB(n, a.result);
                                        let s = !1;
                                        void 0 !== t && (o.push(t), s = !0), e(s)
                                    }, a.onerror = () => {
                                        e(!1)
                                    }
                                }))
                            }
                        }
                        if (t) return;
                        const s = r.add(this.toDB(n, e));
                        return this.checkReqSuccessOrFail(s).then((t => {
                            if (t) {
                                let t = e;
                                if (!n.isNonFieldlikeEntity) {
                                    const {
                                        primaryIndex: e
                                    } = n, i = e.fields[0].field;
                                    Object.prototype.hasOwnProperty.call(t, i) || (t[i] = s.result)
                                }
                                o.push(t)
                            } else l.push(e)
                        })).catch((() => {
                            l.push(e)
                        }))
                    }));
                    return t ? Promise.all(d).then((() => ({
                        success: o,
                        fail: l
                    }))) : new Promise((e => {
                        a.oncomplete = () => {
                            e({
                                success: o,
                                fail: l
                            })
                        }, a.onerror = () => {
                            e({
                                success: o,
                                fail: l
                            })
                        }
                    }))
                }
                async insertOrReplaceMulti(e) {
                    const {
                        transaction: t,
                        meta: s,
                        params: i
                    } = e, n = s.tableConfig, a = await this.getTransaction(t, n, C.f.READWRITE), r = a.objectStore(n.tableName), o = [], l = [], d = i.values.map((e => {
                        const t = r.put(this.toDB(n, e));
                        return this.checkReqSuccessOrFail(t).then((() => {
                            let s = e;
                            if (!n.isNonFieldlikeEntity) {
                                const {
                                    primaryIndex: e
                                } = n, i = e.fields[0].field;
                                Object.prototype.hasOwnProperty.call(s, i) || (s[i] = t.result)
                            }
                            o.push(s)
                        })).catch((() => {
                            l.push(e)
                        }))
                    }));
                    return t ? Promise.all(d).then((() => ({
                        success: o,
                        fail: l
                    }))) : new Promise(((e, t) => {
                        a.oncomplete = () => e({
                            success: o,
                            fail: l
                        }), a.onerror = () => e({
                            success: o,
                            fail: l
                        })
                    }))
                }
                async _update(e, t, s, i, n) {
                    const a = await g(e.get(t));
                    if (!a) {
                        if (n) return;
                        throw new u.f("Update undefined document!")
                    }
                    return await g(e.put(s.reduce(((e, t) => (e[t] = i[t], e)), a))), a
                }
                checkReqSuccessOrFail(e) {
                    return g(e).then((() => !0)).catch((() => !1))
                }
                getTransaction(e, t, s) {
                    const i = t.tableName;
                    if (e > 0) {
                        const t = this.transactionManager.get(e);
                        return Promise.resolve(t.instance)
                    }
                    return this.instance.getTransaction([i], s)
                }
                async getStore(e, t, s) {
                    return (await this.getTransaction(e, t, s)).objectStore(t.tableName)
                }
                toIDBKeyRange(e) {
                    if (e) {
                        if (e.from && e.to) try {
                            return IDBKeyRange.bound(e.from, e.to, e.excludeFrom, e.excludeTo)
                        } catch (t) {
                            throw t
                        }
                        return e.from ? IDBKeyRange.lowerBound(e.from, e.excludeFrom) : e.to ? IDBKeyRange.upperBound(e.to, e.excludeTo) : void 0
                    }
                }
                getResult(e, t) {
                    return g(t).then((t => this.fromDB(e, t)))
                }
                toDB(e, t, s) {
                    void 0 === s && (s = !0);
                    try {
                        e.validate(t, s)
                    } catch (n) {
                        this.logger.zsymb(21, 8650, 3e4, "{}: {} (database={}, table={})", n.name, n.message, e.dbName, e.name)
                    }
                    const {
                        isNonFieldlikeEntity: i
                    } = e;
                    return function (t) {
                        if (0 === e.transforms.length) return t;
                        const s = t => {
                            if (i) return e.transforms.reduce(((e, t) => t.toDB(e)), t); {
                                const s = Object(y.a)({}, t);
                                return e.transforms.forEach((e => {
                                    e.toDB(s)
                                })), s
                            }
                        };
                        return Array.isArray(t) ? t.map(s) : s(t)
                    }(t = e.prepareValue(t, s, i))
                }
                fromDB(e, t) {
                    if (0 === e.transforms.length) return t;
                    const s = t => (e.transforms.forEach((e => {
                        e.fromDB(t)
                    })), t);
                    return Array.isArray(t) ? t.map(s) : s(t)
                }
                validateKey(e, t, s) {
                    if (!e.getIndex(t).validateKey(s)) throw new u.l("The query key is invalid!");
                    return s
                }
            }
            class E {
                constructor(e, t) {
                    this.partition = e, this.instance = t
                }
                async beginTransaction(e) {
                    try {
                        const t = e.params.tables.map((e => this.partition.getTableConfig(e).tableName)),
                            s = e.params.mode,
                            i = await this.instance.getTransaction(t, s),
                            n = e.transaction;
                        e.deferrer.resolve(new L(n, i))
                    } catch (t) {
                        e.deferrer.reject(t)
                    }
                }
            }
            class L {
                constructor(e, t) {
                    this.id = e, this.instance = t, this.error = null, this.closed = void 0, this.onCloseListeners = [], this.closed = !1;
                    const s = e => {
                        this.closed = !0, this.error = e, this.onCloseListeners.forEach((t => t(e)))
                    };
                    t.addEventListener("complete", (() => s(t.error))), t.addEventListener("abort", (() => s(t.error))), t.addEventListener("error", (() => s(t.error)))
                }
                execute(e) {
                    return e().catch((e => {
                        throw this.instance.abort(), e
                    }))
                }
                onClose(e) {
                    this.onCloseListeners.push(e), this.closed && e(this.error)
                }
            }
            var w, M = s("rkiK");
            class T extends n.a {
                constructor(e, t, s, i, n, r) {
                    super(e, t, s, i, n, r, {}), this.instance.addEventListener(a.a.UnexpectedError, (e => {
                        this.dispatchEvent(new a.d(e.error))
                    })), this.instance.addEventListener(o.AbnormallyClose, (() => {
                        this.logger.zsymb(6, 9436, 3e4, "The database connection has abnormally closed!")
                    }))
                }
                deleteThisDatabase() {
                    this.instance.isManuallyClose = !0;
                    const e = indexedDB.deleteDatabase(this.fullName),
                        t = this.instance,
                        s = this.fullName,
                        i = this.logger;
                    return i.zsymb(6, 9436, 30001, `The database connection is manually closed due to database deletion: '${s}'`), new Promise(((n, a) => {
                        e.onsuccess = function () {
                            i.zsymb(0, 9436, 30002, `Delete database sucessfully: '${s}'`), n()
                        }, e.onblocked = function () {
                            t.close()
                        }, e.onerror = function () {
                            const t = e.error;
                            i.zsymb(0, 9436, 30003, `Failed to delete database: '${s}' - Error: ${t}`), a(t)
                        }
                    }))
                }
                closeThisDatabase() {
                    return this.instance.close(), this.logger.zsymb(6, 9436, 30004, `The database connection is manually closed due to manual database closing: '${this.fullName}'`), new Promise((e => {
                        setTimeout((() => {
                            e()
                        }), 1e4)
                    }))
                }
                static async factory(e, t) {
                    const s = new f((async function () {
                            const s = indexedDB.open(e, t.version);
                            s.onupgradeneeded = async e => {
                                if (null !== e.newVersion) try {
                                    const i = new I(t, s.result, s.transaction);
                                    await i.upgrade(e.oldVersion, e.newVersion), await i.validate()
                                } catch (i) {
                                    throw s.transaction.abort(), i
                                }
                            };
                            const n = M.e.start(M.c.db_ready),
                                a = Date.now(),
                                r = i.ModuleContainer.resolve(c.a),
                                o = setTimeout((() => {
                                    r.sendLongOpenRequestQos(e)
                                }), 2e4),
                                l = await g(s).catch((e => {
                                    throw clearTimeout(o), e
                                })),
                                d = Date.now();
                            clearTimeout(o);
                            const h = d - a;
                            return r.sendSuccessOpenDBDurationQos(e, a, h), n.end({
                                dbName: e
                            }), l.onversionchange = function (e) {
                                if (null === e.newVersion) {
                                    e.target.close()
                                }
                            }, l
                        })),
                        n = i.ModuleContainer.resolve(d.a),
                        a = new E(t, s),
                        r = new _(s, n);
                    return t.tables.forEach((e => e.transforms.forEach((e => e.init(t.cipherKey))))), new T(t, e, n, s, r, a)
                }
            }
            let F = i.ModuleContainer.injectable()(w = class {
                async createAdapter(e, t) {
                    return T.factory(e, t)
                }
            }) || w;
            i.ModuleContainer.registerSingleton(n.b, F)
        },
        ebA4: function (e, t, s) {
            "use strict";
            s.d(t, "c", (function () {
                return d
            })), s.d(t, "b", (function () {
                return c
            })), s.d(t, "a", (function () {
                return h
            }));
            var i = s("UJDs"),
                n = s("j6JD"),
                a = s("CDcE"),
                r = s("fsQs"),
                o = s("XuBa");
            const l = new TextEncoder;

            function d(e) {
                let t = e;
                if (Object(a.c)(t)) return t.asset = o.a.encrypt(t.asset), t;
                if (Object(a.b)(t)) return t.args;
                if ("function" == typeof t) try {
                    t = e()
                } catch (s) {
                    t = t.toString()
                }
                return "object" == typeof t && (t = JSON.stringify(t, Object(a.a)())), "string" == typeof t && (t = t.replace(/\r\n|\n|\t|\r/g, "").toString()), t
            }

            function c(e, t) {
                let {
                    lineMeta: s,
                    template: o,
                    args: c
                } = e;
                if ("number" == typeof o) throw new Error("Error: expected template as string. Got number?! [" + s.id1 + ":" + s.id2 + "]");
                const h = Object(n.a)(s.tick),
                    u = [s.module, s.features.join("/")].filter((e => e)).join("|"),
                    g = function (e, t) {
                        let s = [],
                            i = -1;
                        if (t.forEach(((e, t) => {
                                (Object(a.b)(e) || Object(a.c)(e)) && (i = t), s.push(d(e))
                            })), 1 === s.length && 1 === t.length && "function" == typeof t[0] && Array.isArray(s[0]) && (s = [...s[0]]), !e) return s.join(" ");
                        const n = "{}";
                        let r = e;
                        const o = [];
                        for (s.forEach((e => {
                                -1 !== r.search(n) ? r = r.replace(n, e) : o.push(e)
                            })); - 1 !== r.search(n);) r = r.replace(n, "");
                        return r.concat(" ").concat(o.join(" "))
                    }(o, c),
                    m = "[" + [s.id1, s.id2].join(":") + "]",
                    p = i.a[s.level].toUpperCase(),
                    f = [`${h}__${t?`${t.ss}.${t.ss_ln}`:"?.?"}`, p, u, g, m].join("\t"),
                    v = l.encode(f.concat("\n"));
                return v.byteLength > r.k.file_lim ? v.slice(0, r.k.file_lim) : v
            }

            function h(e) {
                const t = new ArrayBuffer(8),
                    s = new DataView(t),
                    i = 4294967295,
                    n = ~~(e / i),
                    a = e % i - n;
                return s.setUint32(0, n), s.setUint32(4, a), t
            }
        },
        ez9R: function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return n
            }));
            var i = s("jDHv");
            const n = Object(i.define)("zlog-bin-encoder")
        },
        ezdo: function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("HPcM"),
                r = s("Y58e"),
                o = s("AH6j"),
                l = s("fsQs"),
                d = s("Y41u"),
                c = s("UJDs"),
                h = s("PLj1"),
                u = s("jGDt"),
                g = s("KRcn"),
                m = s("7FSS");
            const p = null === globalThis || void 0 === globalThis ? void 0 : globalThis.performance;
            let f = Object(n.injectable)()(i = function (e, t) {
                return Object(n.inject)(u.a)(e, void 0, 0)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === u.a ? Object : u.a])(i = class extends o.b {
                constructor(e) {
                    super(), this._session = e, this._data = [], this._lastPing = 0, this._isSessionLineReady = !1, this.add = e => {
                        this._data.push(e), p.now() - this._lastPing >= l.l && (this._lastPing = p.now(), this._broadcastEvent(d.c.LogBucketRequestFlush)), this._data.length > 5e4 && m.a.error(`[ZLL]: bucket size high: ${this._data.length}`)
                    }, this._broadcastEvent = (e, t) => {
                        switch (e) {
                            case d.c.LogBucketRequestFlush:
                            case d.c.RegLogBucketStatus:
                                this.dispatchEvent(new d.b(e, t))
                        }
                    }, this.recordSession()
                }
                get(e) {
                    return void 0 === e && (e = l.i), this._isSessionLineReady || m.a.error("[ZLL]: session line not ready. get() returns 0 untils it is ready"), this._isSessionLineReady ? this._data.slice(0, e) : []
                }
                removeFirst(e) {
                    void 0 === e && (e = 1), this._data.splice(0, e), m.a.debug(`[ZLL]: removed first ${e}, current:${this._data.length} `)
                }
                getAll() {
                    return this._isSessionLineReady ? this._data : []
                }
                size() {
                    return this._data.length
                }
                recordSession() {
                    const e = this._session.getSession();
                    const t = `zlgvers:${e.zlgv} ps:${e.process} build:${e.env}-${e.buildType} pversion:${e.pversion} avers:undefined bhash:${e.build}`,
                        s = {
                            lineMeta: {
                                type: "info",
                                module: "Session".toUpperCase(),
                                features: [""],
                                level: c.b.info,
                                id1: 0,
                                id2: 0,
                                tick: this._session.getProcessStartTime()
                            },
                            template: "",
                            args: [t]
                        };
                    this._data.unshift(s), this._isSessionLineReady = !0
                }
            }) || i) || i) || i) || i;
            var v;
            n.ModuleContainer.registerSingleton(a.a, f);
            let b = Object(n.injectable)()(v = class extends o.b {
                constructor() {
                    super(...arguments), this._data = []
                }
                removeFirst(e) {
                    void 0 === e && (e = 1), this._data.splice(0, e)
                }
                add(e) {
                    this._data.push(e), this._broadcastEvent(d.c.LogBucketRequestFlush)
                }
                get(e) {
                    const t = this._data.slice(0, e);
                    return this._data = this._data.slice(e), t
                }
                getAll() {
                    return this._data
                }
                size() {
                    return this._data.length
                }
                _broadcastEvent(e, t) {
                    switch (e) {
                        case d.c.LogBucketRequestFlush:
                        case d.c.SentryLogBucketStatus:
                            this.dispatchEvent(new d.b(e, t))
                    }
                }
            }) || v;
            n.ModuleContainer.registerSingleton(a.b, b);
            const I = Object(n.define)("zlogger-validator");
            var y;
            let C = Object(n.injectable)()(y = function (e, t) {
                return Object(n.inject)(r.a)(e, void 0, 0)
            }(y = Reflect.metadata("design:type", Function)(y = Reflect.metadata("design:paramtypes", [void 0 === r.a ? Object : r.a])(y = class {
                constructor(e) {
                    this.config = e, this.DevOrStagingLevelConfig = {
                        [c.b.info]: !0,
                        [c.b.error]: !0,
                        [c.b.warn]: !0,
                        [c.b.debug]: !0,
                        [c.b.critical]: !0
                    }, this.ProdLevelConfig = {
                        [c.b.info]: !0,
                        [c.b.error]: !0,
                        [c.b.warn]: !0,
                        [c.b.debug]: !1,
                        [c.b.critical]: !0
                    }, this.DevOrStagingTransConfig = {
                        [c.b.info]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.error]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.warn]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.debug]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.critical]: {
                            toFile: !0,
                            toConsole: !0
                        }
                    }, this.ProdTransConfig = {
                        [c.b.info]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.error]: {
                            toFile: !0,
                            toConsole: !0
                        },
                        [c.b.warn]: {
                            toFile: !1,
                            toConsole: !1
                        },
                        [c.b.debug]: {
                            toFile: !1,
                            toConsole: !1
                        },
                        [c.b.critical]: {
                            toFile: !0,
                            toConsole: !0
                        }
                    }, this._ProcessBlacklist = [], l.n && m.a.log("zlogger validator init")
                }
                validateLog(e, t, s, i) {
                    if (this._isBlackedlisted(e)) return !1;
                    switch (e) {
                        case h.b.Main:
                            return this._validateNoConfig(t, s, i);
                        case h.b.Web:
                        case h.b.Login:
                        case h.b.Photo:
                        case h.b.SharedWorker:
                        case h.b.Render:
                            return this._validateUsingConfig(t, s, i);
                        default:
                            return this._validateNoConfig(t, s, i)
                    }
                }
                _validateUsingConfig(e, t, s) {
                    const i = !!this.config && this.config.get("stagingAccount"),
                        n = !!this.config && this.config.get("adminMode");
                    return (!0 !== (null == s ? void 0 : s.stagingOnly) || !1 !== i || !1 != !n) && (n || i ? this.DevOrStagingLevelConfig[e] && this.DevOrStagingTransConfig[e][t] : this.ProdLevelConfig[e] && this.ProdTransConfig[e][t])
                }
                _validateNoConfig(e, t, s) {
                    return this.ProdLevelConfig[e] && this.ProdTransConfig[e][t]
                }
                _isBlackedlisted(e) {
                    var t;
                    return !!(e === h.b.Embed || this.config && !0 === (null === (t = this.config) || void 0 === t ? void 0 : t.get("adminConfig.offLog")) || this._ProcessBlacklist.includes(e))
                }
            }) || y) || y) || y) || y;
            n.ModuleContainer.register(I, C);
            const S = Object(n.define)("zsentry-log-trans"),
                _ = Object(n.define)("zfile-log-trans"),
                E = Object(n.define)("zconsole-log-trans");
            var L, w, M, T = s("W8fB");
            let F = Object(n.injectable)()(L = function (e, t) {
                    return Object(n.inject)(a.b)(e, void 0, 0)
                }(L = Reflect.metadata("design:type", Function)(L = Reflect.metadata("design:paramtypes", [void 0 === a.b ? Object : a.b])(L = class {
                    constructor(e) {
                        this.sentryBucket = e
                    }
                    transport(e) {
                        throw new Error("Method not implemented.")
                    }
                }) || L) || L) || L) || L,
                O = Object(n.injectable)()(w = function (e, t) {
                    return Object(n.inject)(a.a)(e, void 0, 0)
                }(w = function (e, t) {
                    return Object(n.inject)(I)(e, void 0, 1)
                }(w = Reflect.metadata("design:type", Function)(w = Reflect.metadata("design:paramtypes", [void 0 === a.a ? Object : a.a, void 0 === I ? Object : I])(w = class {
                    constructor(e, t) {
                        this.regularBucket = e, this.validator = t, this._currentProcess = void 0, this._currentProcess = Object(g.a)()
                    }
                    transport(e) {
                        this.validator.validateLog(this._currentProcess, e.lineMeta.level, "toFile", e.extras) && this.regularBucket.add(e)
                    }
                }) || w) || w) || w) || w) || w,
                R = Object(n.injectable)()(M = function (e, t) {
                    return Object(n.inject)(I)(e, void 0, 0)
                }(M = function (e, t) {
                    return Object(n.inject)(T.a)(e, void 0, 1)
                }(M = Reflect.metadata("design:type", Function)(M = Reflect.metadata("design:paramtypes", [void 0 === I ? Object : I, void 0 === T.a ? Object : T.a])(M = class {
                    constructor(e, t) {
                        this.validator = e, this.consoleWriter = t, this._currentProcess = void 0, this._currentProcess = Object(g.a)()
                    }
                    transport(e) {
                        this.validator.validateLog(this._currentProcess, e.lineMeta.level, "toConsole", e.extras) && this.consoleWriter.write(e)
                    }
                }) || M) || M) || M) || M) || M;
            n.ModuleContainer.registerSingleton(_, O), n.ModuleContainer.registerSingleton(S, F), n.ModuleContainer.registerSingleton(E, R);
            var D = s("XB6V");
            const A = ["info", "warn", "debug", "error", "critical"],
                j = ["", "F", "C", "T", "FT", "CT"];

            function P() {
                let e = 0;
                const t = {},
                    s = {};
                return A.forEach((i => {
                    j.forEach((n => {
                        "" === n ? (t[e] = `z${i}A`, s[`z${i}A`] = e, e += 1) : "T" === n ? (t[e] = `z${i}AT`, s[`z${i}AT`] = e, e += 1) : (t[e] = `z${i}${n}`, s[`z${i}${n}`] = e, e += 1)
                    }))
                })), {
                    EnumeratedLevels: t,
                    ReversedEnumeratedLevels: s
                }
            }
            Object.freeze(j), Object.freeze(A);
            const N = P().EnumeratedLevels,
                B = P().ReversedEnumeratedLevels;
            Object.freeze(N), Object.freeze(B);
            var U, k = s("h0S/");
            let G = Object(n.injectable)()(U = function (e, t) {
                return Object(n.inject)(_)(e, void 0, 0)
            }(U = function (e, t) {
                return Object(n.inject)(S)(e, void 0, 1)
            }(U = function (e, t) {
                return Object(n.inject)(E)(e, void 0, 2)
            }(U = Reflect.metadata("design:type", Function)(U = Reflect.metadata("design:paramtypes", [void 0 === _ ? Object : _, void 0 === S ? Object : S, void 0 === E ? Object : E])(U = class extends class {} {
                constructor(e, t, s) {
                    super(), this.fileTransporter = e, this.sentryTransporter = t, this.consoleTransporter = s, this._instanceMap = new Map
                }
                createZLogger(e, t, s) {
                    void 0 === t && (t = []);
                    const i = `${e}:${t.join(":")}`,
                        a = this._instanceMap.get(i);
                    var r, o, l, d, h, g, p, f, v, b, I;
                    if (a && ((null == s ? void 0 : s.trans) === (null === (r = a.config) || void 0 === r ? void 0 : r.trans) && (null == s || null === (o = s.trans) || void 0 === o ? void 0 : o.file) === (null === (l = a.config) || void 0 === l || null === (d = l.trans) || void 0 === d ? void 0 : d.file) && (null == s || null === (h = s.trans) || void 0 === h ? void 0 : h.console) === (null === (g = a.config) || void 0 === g || null === (p = g.trans) || void 0 === p ? void 0 : p.console) && (null == s || null === (f = s.trans) || void 0 === f ? void 0 : f.sentry) === (null === (v = a.config) || void 0 === v || null === (b = v.trans) || void 0 === b ? void 0 : b.sentry) && (null == s ? void 0 : s.stagingOnly) === (null === (I = a.config) || void 0 === I ? void 0 : I.stagingOnly))) return a.logger;
                    let y, C, S;
                    (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.file) && (y = this.fileTransporter), (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.console) && (C = this.consoleTransporter), (void 0 === (null == s ? void 0 : s.trans) || null != s && s.trans.sentry) && (S = this.sentryTransporter);
                    const _ = class {
                        constructor(e, t, s) {
                            var i = this;
                            this.module = e, this.features = t, this.config = s, this.enabled = !0, this.Sentry = null, this.tempOffConfig = {
                                toConsole: !1,
                                toFile: !1,
                                toSentry: !1
                            }, this.zsentry = function () {
                                if (i.Sentry) {
                                    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                                    i.Sentry.captureException(new Error(t.join(" ")))
                                }
                            }, this.zfatal = function () {}, this.zsymb = function (e, t, s) {
                                if (!1 === i.enabled) return;
                                const n = N[e];
                                for (var a = arguments.length, r = new Array(a > 3 ? a - 3 : 0), o = 3; o < a; o++) r[o - 3] = arguments[o];
                                if (n.includes("zcritical")) return void(i.Sentry && i.Sentry.captureException(new Error(r.join(" "))));
                                const l = i._getLevel(n);
                                if (n.endsWith("A")) i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: null,
                                    args: r,
                                    target: "ConsoleFile"
                                });
                                else if (n.endsWith("AT")) {
                                    const [e, ...n] = r;
                                    i._transport({
                                        tick: Date.now(),
                                        level: l,
                                        id1: t,
                                        id2: s,
                                        templ: e,
                                        args: n,
                                        target: "ConsoleFile"
                                    })
                                } else if (n.endsWith("C") || n.endsWith("F")) i._transport({
                                    tick: Date.now(),
                                    level: l,
                                    id1: t,
                                    id2: s,
                                    templ: null,
                                    args: r,
                                    target: n.endsWith("C") ? "toConsole" : "toFile"
                                });
                                else if (n.endsWith("CT") || n.endsWith("FT")) {
                                    const [e, ...a] = r;
                                    i._transport({
                                        tick: Date.now(),
                                        level: l,
                                        id1: t,
                                        id2: s,
                                        templ: e,
                                        args: a,
                                        target: n.endsWith("CT") ? "toConsole" : "toFile"
                                    })
                                }
                            }, this._transport = e => {
                                let {
                                    tick: t,
                                    level: s,
                                    id1: i,
                                    id2: a,
                                    templ: r,
                                    args: o,
                                    target: l
                                } = e;
                                const d = () => ({
                                        lineMeta: {
                                            type: "normal",
                                            module: this.module,
                                            features: this.features,
                                            id1: i,
                                            id2: a,
                                            level: s,
                                            tick: t
                                        },
                                        template: r,
                                        args: o,
                                        extras: {
                                            stagingOnly: this.config.stagingOnly
                                        }
                                    }),
                                    c = n.ModuleContainer.resolve(u.a);
                                var h, g;
                                if ("ConsoleFile" === l) !1 === this.tempOffConfig.toConsole && c.isEnabledConsole() && (null === (h = this.config.toConsole) || void 0 === h || h.transport(d())), !1 === this.tempOffConfig.toFile && (null === (g = this.config.toFile) || void 0 === g || g.transport(d()));
                                else if (!1 === this.tempOffConfig[l]) {
                                    var m;
                                    if ("toConsole" === l && !c.isEnabledConsole()) return;
                                    null === (m = this.config[l]) || void 0 === m || m.transport(d())
                                }
                            }, this._getLevel = e => {
                                let t = e;
                                e.endsWith("A") ? t = e.replace("A", "") : e.endsWith("AT") ? t = e.replace("AT", "") : e.endsWith("C") ? t = e.replace("C", "") : e.endsWith("CT") ? t = e.replace("CT", "") : e.endsWith("F") ? t = e.replace("F", "") : e.endsWith("FT") && (t = e.replace("FT", ""));
                                let s = c.b.info;
                                switch (t) {
                                    case "zinfo":
                                        s = c.b.info;
                                        break;
                                    case "zwarn":
                                        s = c.b.warn;
                                        break;
                                    case "zerror":
                                        s = c.b.error;
                                        break;
                                    case "zdebug":
                                        s = c.b.debug
                                }
                                return s
                            }, this.zinfo = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zinfoC = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zinfoF = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zwarn = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zwarnC = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zwarnF = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zerror = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zerrorC = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zerrorF = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zdebug = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zdebugC = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.zdebugF = function () {
                                throw new Error("babel-plugin-transform-zlog failed: zlog malfunction")
                            }, this.enabled = !0 === function (e, t, s) {
                                if (void 0 === s && (s = !1), !k.a.includes(e) && !1 === k.c[e]) return m.a.error("LogModeController:", [e, t], `module ${e} is not whitelisted`), !1;
                                let i = !1;
                                for (const n of t) {
                                    const a = k.a.includes(n) || !(!1 === k.c[e]);
                                    if (s && !a || !a && !i) return !1;
                                    if (a) {
                                        if (i = !0, !s) return !0
                                    } else if (!i) return m.a.error("LogModeController:", [e, t], `feat ${n} is not whitelisted and requireAllFeatOn:${s}`), !1
                                }
                                return !0
                            }(this.module, this.features)
                        }
                        disableFile() {
                            this.tempOffConfig.toFile = !0
                        }
                        enableFile() {
                            this.tempOffConfig.toFile = !1
                        }
                        disableConsole() {
                            this.tempOffConfig.toConsole = !0
                        }
                        enableConsole() {
                            this.tempOffConfig.toConsole = !1
                        }
                        static create(e, t, s) {
                            return new this(e, t, s)
                        }
                        pause() {
                            this.enabled = !0
                        }
                        resume() {
                            this.enabled = !1
                        }
                        specialTransport(e) {
                            this._transport(e)
                        }
                    }.create(e, t, {
                        toFile: y,
                        toConsole: C,
                        toSentry: S,
                        stagingOnly: null == s ? void 0 : s.stagingOnly
                    });
                    return this._instanceMap.set(i, {
                        logger: _,
                        config: s
                    }), _
                }
                createZLoggerStaging(e, t, s) {
                    return t.push(k.b.staging), this.createZLogger(e, t, {
                        trans: s,
                        stagingOnly: !0
                    })
                }
            }) || U) || U) || U) || U) || U) || U;
            n.ModuleContainer.register(D.a, G);
            var z = s("yBqK"),
                x = s("ebA4");
            var V, $ = s("CDcE");
            let W = Object(n.injectable)()(V = Reflect.metadata("design:type", Function)(V = Reflect.metadata("design:paramtypes", [])(V = class extends class {
                constructor() {
                    this._TextEncoder = new TextEncoder
                }
                encodeUi8(e, t, s) {
                    return e.setUint8(t, s), t + l.b.ui8
                }
                encodeUi16(e, t, s) {
                    return e.setUint16(t, s), t + l.b.ui16
                }
                encodeUi32(e, t, s) {
                    return e.setUint32(t, s), t + l.b.ui32
                }
                encodeFloat32(e, t, s) {
                    return e.setFloat32(t, s), t + l.b.float32
                }
                encodeFloat64(e, t, s) {
                    return e.setFloat64(t, s), t + l.b.float64
                }
                encodeBigInt64(e, t, s) {
                    const i = Object(x.a)(s),
                        n = new Uint8Array(i);
                    for (let a = 0; a < n.byteLength; a++) t = this.encodeUi8(e, t, n[a]);
                    return t
                }
                encodeTotalSize(e, t, s) {
                    return this.encodeUi16(e, t, s)
                }
                encodeTotalSizeEnd(e, t) {
                    return this.encodeUi16(e, t, t + l.b.ui16)
                }
                encodeTick(e, t, s) {
                    const i = Object(x.a)(s),
                        n = new Uint8Array(i);
                    return this.copyCache(e, t, n)
                }
                encodeVers(e, t, s) {
                    if (s > 32767) throw new Error("[BinEncoder] error: encoding verion is TOO BIG!");
                    return this.encodeUi16(e, t, s)
                }
                encodeEncoderVers(e, t, s) {
                    if (s > 255) throw new Error("[BinEncoder] error: encoding level is TOO BIG!");
                    return this.encodeUi8(e, t, s)
                }
                encodeLevel(e, t, s) {
                    if (s > 255) throw new Error("[BinEncoder] error: encoding level is TOO BIG!");
                    return this.encodeUi8(e, t, s)
                }
                encodeHeaderNum(e, t, s) {
                    if (s > 255) throw new Error("[BinEncoder] error: encoding numOfHeader is TOO BIG!");
                    return this.encodeUi8(e, t, s)
                }
                encodeStringOnly(e, t, s) {
                    const i = this._TextEncoder.encode(s),
                        n = i.byteLength;
                    return t = this.encodeUi8(e, t, n), this.copyCache(e, t, i)
                }
                copyCache(e, t, s) {
                    for (let i = 0; i < s.byteLength; i++) t = this.encodeUi8(e, t, s[i]);
                    return t
                }
            } {
                constructor() {
                    super(), this.MemoryLogBatch = void 0, this.dv = void 0, this._lastOffset = 0, this._lastTs = 0, this.MemoryLogBatch = new ArrayBuffer(l.d.mem_batch_lim), this.dv = new DataView(this.MemoryLogBatch)
                }
                getLastBuffer() {
                    return this.MemoryLogBatch.slice(0, this._lastOffset)
                }
                encode(e, t, s) {
                    try {
                        const {
                            lineMeta: i,
                            args: n
                        } = e;
                        let a = 0;
                        a += l.b.ui16;
                        let r = i.tick;
                        r <= this._lastTs && (r = this._lastTs + 1), this._lastTs = r, a = this.encodeTick(this.dv, a, r), a = this.encodeEncoderVers(this.dv, a, l.o), a = this.encodeLevel(this.dv, a, i.level), a = this.encodeUi16(this.dv, a, s.ss), a = this.encodeUi32(this.dv, a, s.ss_ln), a = this.encodeStringOnly(this.dv, a, "ilq_2kox"), a = this.encodeUi32(this.dv, a, t), a = this.encodeUi16(this.dv, a, i.id1), a = this.encodeUi16(this.dv, a, i.id2), a = this._encodeArgs(a, this.dv, n);
                        const o = a + l.b.ui16;
                        return this.encodeTotalSize(this.dv, 0, o), a = this.encodeTotalSize(this.dv, a, o), this._lastOffset = a, this.MemoryLogBatch.slice(0, o)
                    } catch (i) {
                        throw m.a.error("BinEncoderImpl.encode error:", i), new Error("BinEncoderImpl.encode error")
                    }
                }
                _allowTruncate() {
                    const e = n.ModuleContainer.resolve(r.a),
                        t = (null == e ? void 0 : e.get("adminMode")) || !1,
                        s = e.get("stagingAccount") || !1;
                    return !(t || s)
                }
                _encodeArgs(e, t, s) {
                    let i = !1;
                    const n = [];
                    if (s.length)
                        for (let r of s) "object" == typeof r && (i = Object($.b)(r) || Object($.c)(r)), n.push(Object(x.c)(r));
                    let a;
                    if (a = 1 === n.length && 1 === s.length && Array.isArray(n[0]) && "function" == typeof s[0] ? z.encode([...n[0]]) : z.encode(n), a.byteLength > l.d.line_hard_lim) {
                        const e = JSON.stringify(n, Object($.a)()).slice(0, l.d.line_hard_lim);
                        a = z.encode(e)
                    } else if (!i && a.byteLength > l.d.line_soft_lim && this._allowTruncate()) {
                        const e = JSON.stringify(n, Object($.a)()).slice(0, l.d.line_soft_lim);
                        a = z.encode(e)
                    }
                    for (let r = 0; r < a.byteLength; r++) e = this.encodeUi8(t, e, a[r]);
                    return e
                }
            }) || V) || V) || V;
            var q = s("ez9R");
            n.ModuleContainer.registerSingleton(q.a, W);
            var K = s("K8kB");
            var H, Z = class {
                constructor(e, t) {
                    void 0 === e && (e = []), void 0 === t && (t = !0), this.tasks = e, this.alive = t
                }
                do() {
                    return this.add(...arguments)
                }
                add() {
                    for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                    return this.tasks = this.tasks.concat(t), this
                }
                once(e) {
                    return void 0 === e && (e = !1), this.alive = !1, e && (async e => this.async())() || this.sync(), this
                }
                every(e) {
                    return this.add((() => new Promise((t => setTimeout(t, e))))), this.forever(!0)
                }
                forever(e) {
                    return void 0 === e && (e = !1), this.alive = !0, e && (async e => this.async())() || this.sync(), this
                }
                cancel() {
                    return this.alive = !1, this
                }
                async async () {
                    for (let e of this.tasks) await e();
                    this.alive && this.async()
                }
                sync() {
                    for (let e of this.tasks) e();
                    this.alive && this.sync()
                }
            };
            let Q = Object(n.injectable)()(H = function (e, t) {
                return Object(n.inject)(a.a)(e, void 0, 0)
            }(H = Reflect.metadata("design:type", Function)(H = Reflect.metadata("design:paramtypes", [void 0 === a.a ? Object : a.a])(H = class extends o.b {
                constructor(e) {
                    super(), this.bucket = e, this.task = void 0, this.start = () => {
                        var e;
                        if (null !== (e = this.task) && void 0 !== e && e.alive) return;
                        this.task || (this.task = new Z);
                        const t = h.c[Object(g.a)()] || l.e;
                        this.task.add((() => this._broadcastEvent(d.c.WriteSchedulerRequestFlush))).every(t), this._listenEvents()
                    }, this.stop = () => {
                        this.task && this.task.cancel(), this.task = void 0
                    }, this._listenEvents = () => {
                        this.bucket.addEventListener(d.c.LogBucketRequestFlush, this._handleFlushRequestFromBucket)
                    }, this._handleFlushRequestFromBucket = () => {
                        var e;
                        this.task && this.task.alive || (l.n && m.a.log("Oopsie! Scheduler is somehow not running. Restarting..."), null === (e = this.task) || void 0 === e || e.cancel(), this.task = void 0, this.start())
                    }
                }
                _broadcastEvent(e) {
                    if (e === d.c.WriteSchedulerRequestFlush) this.dispatchEvent(new d.a(e))
                }
            }) || H) || H) || H) || H;
            n.ModuleContainer.registerSingleton(K.a, Q)
        },
        gpNb: function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("PmZf"),
                r = s("rvru"),
                o = s("UJ0r"),
                l = s("PhBv"),
                d = s("tHMN");
            let c = n.ModuleContainer.injectable()(i = function (e, t) {
                return n.ModuleContainer.inject(l.b)(e, void 0, 0)
            }(i = function (e, t) {
                return n.ModuleContainer.inject(o.b)(e, void 0, 1)
            }(i = function (e, t) {
                return n.ModuleContainer.inject(r.a)(e, void 0, 2)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === l.a ? Object : l.a, void 0 === o.a ? Object : o.a, void 0 === r.a ? Object : r.a])(i = class extends d.a {
                constructor(e, t, s) {
                    super(), this.queryPlanner = e, this.adapterManager = t, this.dbQos = s, this.queryPlanner.addEventListener(a.a.QueryError, (e => {
                        this.dispatchEvent(new a.b(e.error)), this.dbQos.sendDBErrorQos(e.error)
                    })), this.queryPlanner.addEventListener(a.a.UnexpectedError, (e => {
                        this.dispatchEvent(new a.d(e.error)), this.dbQos.sendDBErrorQos(e.error)
                    }))
                }
                async closeDatabase(e) {
                    await this.adapterManager.closeDatabase(e)
                }
                async closeAllDatabases() {
                    this.queryPlanner.stop(), await this.adapterManager.closeAllDatabases()
                }
                async deleteDatabase(e) {
                    await this.adapterManager.deleteDatabase(e)
                }
                async deleteAllDatabases() {
                    this.queryPlanner.stop(), await this.adapterManager.deleteAllDatabases()
                }
                doesDatabaseExists(e) {
                    return this.adapterManager.doesDatabaseExists(e)
                }
                do(e) {
                    return this.queryPlanner.do(e)
                }
                doImmediately(e) {
                    return "Qos" === e.database && e.trace(), this.queryPlanner.doImmediately(e)
                }
            }) || i) || i) || i) || i) || i) || i;
            n.ModuleContainer.registerSingleton(d.b, c)
        },
        hRcX: function (e, t, s) {
            "use strict";
            var i = s("VTBJ"),
                n = s("jDHv");
            const a = () => {},
                r = (() => {
                    let e = 0;
                    return () => ++e
                })(),
                o = {
                    id: 0,
                    retry: 0,
                    success: a,
                    error: a,
                    execute: a
                };

            function l(e, t) {
                const s = e.length;
                e.push(t),
                    function (e, t, s) {
                        let i = s;
                        for (;;) {
                            const s = i - 1 >>> 1,
                                n = e[s];
                            if (!(void 0 !== n && c(n, t) > 0)) return;
                            e[s] = t, e[i] = n, i = s
                        }
                    }(e, t, s)
            }

            function d(e) {
                const t = e[0];
                if (void 0 !== t) {
                    const s = e.pop();
                    return s !== t && (e[0] = s, function (e, t, s) {
                        let i = s;
                        const n = e.length;
                        for (; i < n;) {
                            const s = 2 * (i + 1) - 1,
                                n = e[s],
                                a = s + 1,
                                r = e[a];
                            if (void 0 !== n && c(n, t) < 0) void 0 !== r && c(r, n) < 0 ? (e[i] = r, e[a] = t, i = a) : (e[i] = n, e[s] = t, i = s);
                            else {
                                if (!(void 0 !== r && c(r, t) < 0)) return;
                                e[i] = r, e[a] = t, i = a
                            }
                        }
                    }(e, s, 0)), t
                }
                return null
            }

            function c(e, t) {
                const s = e.sortIndex - t.sortIndex;
                return 0 !== s ? s : e.id - t.id
            }
            let h;
            ! function (e) {
                e[e.BLOCKING = 50] = "BLOCKING", e[e.NON_BLOCKING = 250] = "NON_BLOCKING", e[e.IDLE = 500] = "IDLE", e[e.NEVER_TIMEOUT = 1e3] = "NEVER_TIMEOUT"
            }(h || (h = {}));
            const u = new class {
                    push(e, t) {
                        const s = Object(i.a)(Object(i.a)(Object(i.a)({}, o), t), {}, {
                            id: r()
                        });
                        e.push(s)
                    }
                    getCandidate(e) {
                        return e.shift()
                    }
                },
                g = new class {
                    push(e, t) {
                        l(e, Object(i.a)(Object(i.a)(Object(i.a)({}, o), t), {}, {
                            sortIndex: Date.now() + (t.deadline || h.NON_BLOCKING),
                            id: r()
                        }))
                    }
                    getCandidate(e) {
                        return d(e)
                    }
                };
            class m {
                constructor(e, t) {
                    void 0 === e && (e = u), void 0 === t && (t = !0), this._queue = void 0, this._strategy = void 0, this._stopped = void 0, this._inactive = void 0, this._queue = [], this._strategy = e, this._stopped = !t, this._inactive = !0
                }
                run(e) {
                    this._strategy.push(this._queue, e), this._inactive && this._run()
                }
                start() {
                    this._stopped = !1, setTimeout((() => {
                        this._run()
                    }))
                }
                stop() {
                    this._stopped = !0, this._inactive = !0
                }
                async _run() {
                    if (this._stopped) return void(this._inactive = !0);
                    const e = this._strategy.getCandidate(this._queue);
                    if (e) try {
                        const s = await e.execute();
                        try {
                            null == e || e.success(s)
                        } catch (t) {}
                        setTimeout((() => {
                            this._run()
                        }))
                    } catch (t) {
                        e.retry > 0 ? (e.retry--, this.run(e)) : null == e || e.error(t), setTimeout((() => {
                            this._run()
                        }))
                    } else this._inactive = !0
                }
            }
            new m(g);
            var p = s("Mgpg"),
                f = s("YEoC"),
                v = s("DI/x"),
                b = s("PmZf"),
                I = s("YZti"),
                y = s("1UUk"),
                C = s("MRjZ"),
                S = s("0slR"),
                _ = s("UJ0r"),
                E = s("teaq"),
                L = s("Abbu"),
                w = s("PhBv"),
                M = s("rkiK"),
                T = s("wH4e");
            const F = new Set(["Qos"]);
            var O;
            let R = n.ModuleContainer.injectable()(O = function (e, t) {
                return n.ModuleContainer.inject(_.b)(e, void 0, 0)
            }(O = function (e, t) {
                return n.ModuleContainer.inject(E.b)(e, void 0, 1)
            }(O = function (e, t) {
                return n.ModuleContainer.inject(S.a)(e, void 0, 2)
            }(O = function (e, t) {
                return n.ModuleContainer.inject(p.ZLoggerFactory)(e, void 0, 3)
            }(O = Reflect.metadata("design:type", Function)(O = Reflect.metadata("design:paramtypes", [void 0 === _.a ? Object : _.a, void 0 === E.b ? Object : E.b, void 0 === S.a ? Object : S.a, void 0 === p.ZLoggerFactory ? Object : p.ZLoggerFactory])(O = class extends w.a {
                constructor(e, t, s, i) {
                    super(), this.adapterManager = e, this.configManager = t, this.adapterBuilder = s, this.scheduler = void 0, this.pendingQueries = [], this.session = void 0, this.logger = void 0, this.idCounter = 0, this.scheduler = new m(u, !1), this.logger = i.createZLogger("db", ["host", "planner"]), this.adapterManager.addEventListener(b.a.UnexpectedError, (e => {
                        this.dispatchEvent(new b.d(e.error))
                    }))
                }
                start() {
                    this.scheduler.start();
                    const e = n.ModuleContainer.resolve(y.b),
                        t = e => {
                            this.session = e;
                            const t = this.pendingQueries;
                            this.pendingQueries = [], t.forEach((e => {
                                this.enqueue(e, {
                                    immediately: !1
                                })
                            }))
                        };
                    e.session && t(e.session), e.addEventListener(b.a.SessionChange, (e => {
                        t(e.session)
                    }))
                }
                stop() {
                    this.scheduler.stop(), this.logger.zsymb(6, 9601, 3e4, "Stop!")
                }
                do(e) {
                    const t = function (e) {
                        if (F.has(e.database)) return;
                        const t = M.e.start(M.c.query_resolution_time),
                            s = {
                                method: T.QueryUtils.getTypeName(e.type),
                                database: e.database,
                                table: e.table,
                                transaction: e.transaction
                            };
                        return t.pushInfo(s), t
                    }(e);
                    return new Promise(((t, s) => {
                        this.enqueue(Object(i.a)(Object(i.a)({}, e), {}, {
                            deferrer: {
                                resolve: t,
                                reject: s
                            }
                        }), {
                            immediately: L.a.isInTransaction(e)
                        })
                    })).finally((() => {
                        null == t || t.end()
                    }))
                }
                doImmediately(e) {
                    return new Promise(((t, s) => {
                        this.enqueue(Object(i.a)(Object(i.a)({}, e), {}, {
                            deferrer: {
                                resolve: t,
                                reject: s
                            }
                        }), {
                            immediately: !0
                        })
                    }))
                }
                enqueue(e, t) {
                    e.meta.step = 0, e.meta.id = this.idCounter++, this.scheduler.run({
                        immediately: t.immediately,
                        execute: () => {
                            try {
                                return this.execute(e)
                            } catch (t) {
                                if (0 !== e.retry) throw e.retry -= 1, t; {
                                    const s = this.createErrorForQuery(e, t);
                                    this.logger.zsymb(18, 9601, 30001, (() => [s])), this.dispatchEvent(new b.d(new v.i(s.message)))
                                }
                            }
                        },
                        retry: e.retry
                    })
                }
                trapQueryError(e) {
                    let t = null,
                        s = () => {};
                    this.shouldTrapTimeoutQuery(e) && (t = setTimeout((() => {
                        var t, s;
                        const i = (null === (t = e.params) || void 0 === t || null === (s = t.values) || void 0 === s ? void 0 : s.length) || void 0,
                            n = void 0 !== i ? [i] : [];
                        e.deferrer.reject(new v.t(n))
                    }), e.meta.timeout), e.meta.timer = t, s = () => {
                        clearTimeout(t)
                    });
                    const i = e.deferrer;
                    e.deferrer = {
                        resolve: e => {
                            s(), i.resolve(e)
                        },
                        reject: t => {
                            s();
                            const n = this.createErrorForQuery(e, t);
                            this.dispatchEvent(new b.b(n)), i.reject(n)
                        }
                    }
                }
                createErrorForQuery(e, t) {
                    const s = {
                            method: I.b.getTypeName(e.type),
                            database: e.database,
                            table: e.table,
                            step: e.meta.step,
                            partition: e.meta.partitionKey,
                            trans: e.transaction,
                            deadline: e.meta.timeout
                        },
                        i = Object(C.a)(s);
                    let n = null;
                    const a = e.meta.error.stack;
                    if (t)
                        if (t instanceof Error) {
                            const s = t.message + ` (${i})`;
                            t instanceof DOMException ? (n = new v.c(s, t.name, t.code), n.setStack(a)) : t instanceof v.e ? (n = t, n.message = s, n.setStack(a)) : (n = e.meta.error, n.message = s, n.name = t.name)
                        } else {
                            let e = t ? `${t}` : "Unknown reason";
                            e += ` (${i})`, n = new v.i(e), n.setStack(a)
                        }
                    else {
                        let e = `Unknown reason (${i})`;
                        n = new v.i(e), n.setStack(a)
                    }
                    return n
                }
                shouldTrapTimeoutQuery(e) {
                    return !1
                }
                execute(e) {
                    e.meta.step = 1, e.meta.dead = !1, e.meta.step = 2, !e.meta.databaseConfig && (this.computeDatabaseConfig(e), e.meta.dead) || (e.meta.step = 3, this.isReadyForExecute(e) && (e.meta.shouldNotTrapQuery || this.trapQueryError(e), e.meta.step = 4, !e.meta.databaseName && (this.computeDatabaseName(e), e.meta.dead) || (e.meta.step = 5, e.meta.step = 6, !e.meta.partitionConfig && (this.computePartitionConfig(e), e.meta.dead) || (e.meta.step = 7, !e.meta.tableConfig && (this.computeTableConfig(e), e.meta.dead) || (e.meta.step = 8, "string" != typeof e.meta.partitionKey && (this.computePartitionKey(e), e.meta.dead) || (e.meta.step = 9, !e.meta.executor && (this.computeDatabaseAdapter(e), e.meta.dead) || (e.meta.step = 10, e.meta.executor())))))))
                }
                computeDatabaseAdapter(e) {
                    const {
                        databaseName: t,
                        partitionConfig: s,
                        partitionKey: i,
                        databaseConfig: n,
                        tableConfig: a
                    } = e.meta;
                    let r = t;
                    if (!L.a.isPartitionlessQuery(e) && n.supportPartitionByField && a.supportPartitionByField) {
                        if ("" === i) return void this.rejectQuery(e, new v.q);
                        r = `${t}/${i}`
                    }
                    const o = this.adapterManager.getDatabaseAdapter(r, s, (() => (e.meta.shouldNotTrapQuery = !0, this.execute(e))));
                    o ? (e.meta.adapterName = o.type === f.a.IDB ? "idb" : "sqlite", e.meta.executor = () => {
                        e.meta.databaseName = r, o.execute(e)
                    }) : e.meta.dead = !0
                }
                replicate(e, t) {
                    this.do(Object(i.a)(Object(i.a)({}, e), {}, {
                        transaction: 0,
                        meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                            databaseConfig: t,
                            error: new Error
                        }),
                        deferrer: void 0
                    }))
                }
                isReadyForExecute(e) {
                    return !(e.meta.databaseConfig.session && !this.session) || (this.pendingQueries.push(e), !1)
                }
                computeDatabaseConfig(e) {
                    const t = this.configManager.getDatabaseConfigs(e.database);
                    if (0 !== t.length) {
                        if (t.length > 1 && this.shouldReplicate(e))
                            for (let s = 1; s < t.length; s++) this.replicate(e, t[s]);
                        e.meta.databaseConfig = t[0]
                    } else this.rejectQuery(e, new v.m(e.database))
                }
                computeDatabaseName(e) {
                    let {
                        meta: t,
                        table: s
                    } = e;
                    const i = this.adapterBuilder.computeDatabaseName(t.databaseConfig, s, this.session);
                    t.databaseName = i
                }
                computePartitionConfig(e) {
                    const t = this.adapterBuilder.computePartitionConfig(e.meta.databaseConfig, e.table, this.session);
                    t ? e.meta.partitionConfig = t : this.rejectQuery(e, new v.p(e.table, this.session))
                }
                computeTableConfig(e) {
                    const t = this.adapterBuilder.computeTableConfig(e.meta.partitionConfig, e.table, e.database);
                    t ? e.meta.tableConfig = t : this.rejectQuery(e, new v.r(e.table))
                }
                computePartitionKey(e) {
                    const {
                        databaseConfig: t,
                        tableConfig: s
                    } = e.meta;
                    if (t.supportPartitionByField && s.supportPartitionByField) switch (e.type) {
                        case f.d.BeginTransaction:
                        case f.d.CommitTransaction:
                            return void(e.meta.partitionKey = "");
                        case f.d.Clear:
                            return;
                        case f.d.Insert:
                            return void this.computePartitionForInsertQuery(e);
                        case f.d.InsertMulti:
                            return void this.computePartitionForInsertMultiQuery(e);
                        case f.d.Get:
                        case f.d.GetAndUpdate:
                        case f.d.Update:
                        case f.d.Delete:
                            return void this.computePartitionForIndexedQuery(e);
                        case f.d.FindAndDelete:
                        case f.d.GetAllKey:
                        case f.d.GetAll:
                        case f.d.Count:
                            return void this.computePartitionForRangedQuery(e);
                        case f.d.DeleteMulti:
                        case f.d.GetMulti:
                            return void this.computePartitionForGetMultiAndDeleteMultiQuery(e);
                        case f.d.UpdateMulti:
                            return void this.computePartitionForUpdateMultiQuery(e)
                    } else e.meta.partitionKey = ""
                }
                computePartitionForInsertQuery(e) {
                    const t = this.adapterBuilder.computePartitionKeyFromEntityValue(e.meta.tableConfig, e.params.value);
                    void 0 !== t ? e.meta.partitionKey = `${t}` : this.rejectQuery(e, new v.q)
                }
                computePartitionForInsertMultiQuery(e) {
                    const t = {
                        groupByPartitions: {}
                    };
                    for (const i of e.params.values) {
                        const s = this.adapterBuilder.computePartitionKeyFromEntityValue(e.meta.tableConfig, i);
                        if (void 0 === s) return void this.rejectQuery(e, new v.q);
                        t.groupByPartitions[s] || (t.groupByPartitions[s] = []), t.groupByPartitions[s].push(i)
                    }
                    let s;
                    const n = Object.entries(t.groupByPartitions);
                    if (1 === n.length) s = n[0][0], void 0 !== s ? e.meta.partitionKey = s : this.rejectQuery(e, new v.q);
                    else {
                        e.meta.dead = !0;
                        const t = n.map((t => {
                            let [s, n] = t;
                            const a = s;
                            return this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                                meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                    partitionKey: a,
                                    error: new Error
                                }),
                                params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                    values: n
                                }),
                                deferrer: void 0
                            }))
                        }));
                        Promise.all(t).then((t => e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                    }
                }
                computePartitionForIndexedQuery(e) {
                    const t = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, e.params.key, e.params.index);
                    void 0 !== t ? e.meta.partitionKey = `${t}` : this.rejectQuery(e, new v.q)
                }
                computePartitionForRangedQuery(e) {
                    var t, s;
                    if (!e.params.range) {
                        const t = new v.s("Get all data in partitioned table");
                        return void this.rejectQuery(e, t)
                    }
                    let i = "";
                    i = e.type === f.d.FindAndDelete || e.type === f.d.Count ? "primary" : e.params.index;
                    const n = e.meta.tableConfig;
                    if (-1 === n.getIndexPartitionField(i)) {
                        if (n.usePartitionTable) {
                            const t = new v.s("Lookup partition from query range");
                            this.rejectQuery(e, t)
                        } else {
                            const t = new v.s("Get all data by index in partitioned table");
                            this.rejectQuery(e, t)
                        }
                        return
                    }
                    if (null === (t = e.params.range) || void 0 === t || !t.from || null === (s = e.params.range) || void 0 === s || !s.to) {
                        const t = new v.s("Get data with open boundary in partition table");
                        return void this.rejectQuery(e, t)
                    }
                    const a = e.params.range.from,
                        r = e.params.range.to,
                        o = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, a, i);
                    if (o !== this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, r, i)) {
                        const t = new v.s("Get data from multiple partition");
                        return void this.rejectQuery(e, t)
                    }
                    let l = o;
                    void 0 !== l ? e.meta.partitionKey = `${l}` : this.rejectQuery(e, new v.q)
                }
                computePartitionForGetMultiAndDeleteMultiQuery(e) {
                    let t = "";
                    t = e.type === f.d.DeleteMulti ? "primary" : e.params.index;
                    const s = {};
                    for (const i of e.params.keys) {
                        const n = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, i, t);
                        if (void 0 === n) return void this.rejectQuery(e, new v.q);
                        s[n] || (s[n] = []), s[n].push(i)
                    }
                    const n = Object.entries(s);
                    let a;
                    if (1 === n.length) a = n[0][0], void 0 !== a ? e.meta.partitionKey = `${a}` : this.rejectQuery(e, new v.q);
                    else {
                        e.meta.dead = !0;
                        const t = n.map((t => {
                            let [s, n] = t;
                            const a = s;
                            return e.type, f.d.GetMulti, this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                                meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                    partitionKey: a,
                                    error: new Error
                                }),
                                params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                    keys: n
                                }),
                                deferrer: void 0
                            }))
                        }));
                        Promise.all(t).then((t => e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                    }
                }
                computePartitionForUpdateMultiQuery(e) {
                    const {
                        patches: t
                    } = e.params, s = {};
                    for (const i of t) {
                        const {
                            key: t
                        } = i, n = this.adapterBuilder.computePartitionKeyFromEntityKey(e.meta.tableConfig, t);
                        if (void 0 === n) return void this.rejectQuery(e, new v.q);
                        s[n] || (s[n] = []), s[n].push(i)
                    }
                    let n;
                    const a = Object.entries(s);
                    if (1 === a.length) n = a[0][0], void 0 !== n ? e.meta.partitionKey = n : this.rejectQuery(e, new v.q);
                    else {
                        const t = a.map((t => {
                            let [s, n] = t;
                            const a = s;
                            return this.doImmediately(Object(i.a)(Object(i.a)({}, e), {}, {
                                meta: Object(i.a)(Object(i.a)({}, e.meta), {}, {
                                    partitionKey: a,
                                    error: new Error
                                }),
                                params: Object(i.a)(Object(i.a)({}, e.params), {}, {
                                    patches: n
                                }),
                                deferrer: void 0
                            }))
                        }));
                        Promise.all(t).then((t => e.deferrer.resolve(t.flat()))).catch(e.deferrer.reject)
                    }
                }
                shouldReplicate(e) {
                    switch (e.type) {
                        case f.d.Clear:
                        case f.d.Delete:
                        case f.d.DeleteMulti:
                        case f.d.FindAndDelete:
                        case f.d.Insert:
                        case f.d.InsertMulti:
                        case f.d.Update:
                        case f.d.UpdateMulti:
                        case f.d.GetAndUpdate:
                            return !0;
                        default:
                            return !1
                    }
                }
                logQueryInfo(e) {
                    L.a.isBeginTransaction(e) ? this.logger.zsymb(12, 9601, 30003, (() => [I.b.getTypeName(e.type), {
                        database: e.meta.databaseName,
                        table: e.params.tables.join(","),
                        transaction: e.transaction,
                        adapter: e.meta.databaseConfig.typeName
                    }])) : this.logger.zsymb(12, 9601, 30004, (() => [I.b.getTypeName(e.type), {
                        database: e.meta.databaseName,
                        table: e.table,
                        transaction: e.transaction,
                        adapter: e.meta.databaseConfig.typeName
                    }]))
                }
                rejectQuery(e, t) {
                    e.meta.dead = !0, e.deferrer.reject(t)
                }
            }) || O) || O) || O) || O) || O) || O) || O;
            n.ModuleContainer.registerSingleton(w.b, R)
        },
        i15Q: function (e, t, s) {
            "use strict";
            s.d(t, "a", (function () {
                return n
            }));
            var i = s("KRcn");
            class n {
                constructor() {
                    this._session = null, this._processStart = void 0, this._enableConsole = void 0, this.isReady = () => !!this._session, this.getSession = () => {
                        if (!this._session) throw new Error("session is not ready");
                        return this._session
                    }, this.getProcessStartTime = () => this._processStart, this.setSession = e => {
                        this._session = e
                    }, this._processStart = Date.now(), this._session = {
                        build: "47f9ada1452c7192665dfd4bbbfbf4459208a18a",
                        zlgv: "ilq_2kox",
                        env: "prod",
                        buildType: "release",
                        pversion: s("kiQV").version,
                        process: Object(i.a)()
                    }, this._enableConsole = !1
                }
                enableConsole() {}
                disableConsole() {}
                isEnabledConsole() {
                    return this._enableConsole
                }
            }
        },
        j6JD: function (e, t, s) {
            "use strict";
            (function (e) {
                function i(e, t) {
                    "string" == typeof e && (e = parseInt(e));
                    const s = new Date(e),
                        i = s.getDate(),
                        a = s.getMonth() + 1,
                        r = (s.getFullYear(), s.getHours()),
                        o = s.getMinutes(),
                        l = s.getSeconds();
                    return null != t && t.dayOnly ? `${i}.${a}` : null != t && t.timeOnly ? `${n(r,2)}:${n(o,2)}:${n(l,2)}` : `${i}.${a} ${n(r,2)}:${n(o,2)}:${n(l,2)}`
                }

                function n(e, t) {
                    const s = e.toString();
                    return s.length < t ? "0".repeat(t - s.length) + s : s
                }
                s.d(t, "a", (function () {
                    return i
                }))
            }).call(this, s("Q40w").Buffer)
        },
        jIg3: function (e, t, s) {
            "use strict";
            var i = s("1UUk");
            s.d(t, "a", (function () {
                return i.a
            })), s.d(t, "b", (function () {
                return i.b
            }))
        },
        jw3m: function (e, t, s) {},
        kiQV: function (e) {
            e.exports = JSON.parse('{"name":"Zalo","homepage":"https://zalo.me/","version":"23.2.1","description":"Zalo - Nhắn gửi yêu thương","engines":{"npm":">=3"},"lint-staged":{"*.{js}":["node ./tools/prettier-include/index.js","eslint --quiet"],"*.{jsx,tsx,ts,scss,md,json,html,yml}":["node ./tools/prettier-include/index.js"]},"pre-commit":"check","main":"bootstrap.js","scripts":{"check":"lint-staged","preinstall":"node tools/nodeVersionCheck.js && git submodule init && git submodule update","postinstall":"npm run update-bundle-files-list","setup":"node tools/setup/setupMessage.js && npm install && node tools/setup/setup.js","remove-demo":"babel-node tools/removeDemo.js","start":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:web","start-zaloapp":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' WEB_DOMAIN=zaloapp zpc-cli run dev:web","open:src":"cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:web","open:dist":"cross-env BABEL_ENV=web babel-node tools/distServer.js","update-about":"babel-node tools/updateAbout.js","distwname":"babel-node tools/dist-with-name.js","send-zlog":"node ./tools/collect-zlog-templates.js","init-zlog-vers":"node ./tools/init-zlog-vers.js","prep":"rimraf ./node_modules/.cache ./zlog-dist && npm run sass && npm run lang","update-call-hash":"babel-node tools/update-call-hash.js","update-zavi-hash":"babel-node tools/update-zavi-hash.js","lint":"esw src --color --parser babel-eslint","lint-strict":"eslint main/*.js","m-lint":"eslint src/utils/meta-info-msg/*.js src/database/base-db.js","lint:watch":"npm run lint -- --watch","clean-dist":"npm run remove-dist && mkdir dist","remove-dist":"rimraf ./dist","prebuild":"npm run clean-dist && npm run sass && npm run lang","prebuild-pc":"npm run lint-strict && rimraf ./pc-dist && mkdir pc-dist && npm run sass && npm run lang","build-dev":"cross-env WEB_ENV=dev npm run build","build-prod":"cross-env WEB_ENV=prod npm run build","build-zaloapp-prod":"cross-env WEB_ENV=prod WEB_DOMAIN=zaloapp npm run build","build-zalome-prod":"cross-env WEB_ENV=prod WEB_DOMAIN=zalome npm run build","build:local":"npm run init-zlog-vers && npm run cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' BUILD_TYPE=release zpc-cli run compile:web && npm run send-zlog","build":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' BUILD_TYPE=release node ./tools/zpc-cli.js run compile:web && npm run send-zlog","compile:main":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:main","build-pc":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:renderer","build-pc-appX":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run compile:renderer:appx","test:cover":"babel-node node_modules/isparta/bin/isparta cover --root src --report html node_modules/mocha/bin/_mocha -- --require ./tools/testSetup.js \\"src/**/*.spec.js\\" --reporter progress","test:cover:travis":"babel-node node_modules/isparta/bin/isparta cover --root src --report lcovonly _mocha -- --require ./tools/testSetup.js \\"src/**/*.spec.js\\" && cat ./coverage/lcov.info | node_modules/coveralls/bin/coveralls.js","test:watch":"npm run test -- --watch","open:cover":"npm run test:cover && open coverage/index.html","test:electron":"electron ./test/main/download.js","test":"for f in $(find src -name *.spec.js); do NODE_PATH=./src mocha tools/testSetup.js \\"$f\\" --reporter progress; done;","wintest":"for %f in (src/utils/*.spec.js) do mocha tools/testSetup.js \\"src/utils/%f\\" done;","jest:test":"cross-env NODE_PATH=./src __PLATFORM__=WEB NODE_ENV=development jest --forceExit","jest:emoji":"cross-env NODE_PATH=./src __PLATFORM__=WEB jest test/core/parse-emoji.test.js --forceExit","jest:conversation":"cross-env NODE_PATH=./src __PLATFORM__=WEB jest --watch --testPathPattern=src/logic/conversation --forceExit","jest:log:test":"cross-env NODE_PATH=./src jest --runInBand --forceExit","jest:update":"cross-env NODE_PATH=./src jest -u","test:single":"cross-env NODE_PATH=./src mocha tools/testSetup.js src/utils/message.spec.js","test:file":"node ./test/file/test.js","test:ibparser":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/inputbox-parser.spec.js","test:compare":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/third-party/compare.spec.js","test:zstructures":"cross-env NODE_PATH=./src mocha tools/testSetup.js  src/utils/third-party/zstructures.spec.js","test:common":"cross-env NODE_PATH=./src mocha tools/testSetup.js src/utils/common.spec.js","test:schema":"cross-env NODE_PATH=./src jest --config= database/zdb/row-items/schema/data-validator.test.js --forceExit --detectOpenHandles","presass":"mkdirp src/static/css && mkdirp pc/static/fonts/zalo && ncp src/static/fonts/zalo/ pc/static/fonts/zalo/ && mkdirp pc/static/fonts/main  && ncp src/static/fonts/main/ pc/static/fonts/main/ ","sass":"sass src/static/scss/layout.scss src/static/css/layout.css && sass pc/static/scss/login.scss pc/static/css/login.css  && sass pc/static/scss/photo.scss pc/static/css/photo.css  && sass pc/static/scss/videocall.scss pc/static/css/videocall.css && sass src/static/scss/base/color-v1.scss src/static/css/color-v1.css && sass src/static/scss/base/darkmode.scss src/static/css/darkmode.css && sass src/static/scss/base/color-vtest.scss src/static/css/color-vtest.css","preelectron-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:main","electron-start-dev":"npm run init-zlog-vers && cross-env PC=1 BABEL_ENV=pc NODE_ENV=development electron .","predebug-main":"npm run init-zlog-vers && npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:main","debug-main":"npm run init-zlog-vers && cross-env PC=1 BABEL_ENV=pc NODE_ENV=development electron . --inspect=9230","pc-compile":"cross-env FORCE_COLOR=1 PC=1 BABEL_ENV=pc NODE_ENV=development npm run electron-start-dev","pc-compile-2":"cross-env PC=1 BABEL_ENV=pc CLONE=1 NODE_ENV=development npm run electron-start-dev","v1-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:renderer","pc-start-dev":"npm run init-zlog-vers && cross-env NODE_OPTIONS=\'--max-old-space-size=8192\' zpc-cli run dev:renderer","start-pc":"npm run init-zlog-vers && npm-run-all -p pc-compile pc-start-dev","prepack":"npm run build-pc && npm run compile:main","prepack:win32":"npm run build-pc && npm run compile:main","prepack:winstaller":"npm run build-pc && npm run signtool && npm run compile:main","prewinstaller":"git submodule init && git submodule update","pack":"electron-builder --dir --config electron-builder.config.js","pack:win32":"cross-env BUILD_TYPE=release npm run pack:winstaller && node ./tools/afterpack.js ia32 && babel-node tools/genPartialUpdate.js ia32 -- ","pack:winstaller:no-build":"cross-env BUILD_TYPE=release ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --dir --ia32 --config electron-builder.config.js","pack:winstaller":"electron-builder --dir --ia32 --config electron-builder.config.js","postpack":"babel-node tools/genPartialUpdate.js && npm run send-zlog","postpack:win32":"babel-node tools/genPartialUpdate.js ia32 && npm run send-zlog","predodist":"npm run build-pc && npm run signtool && npm run compile:main && npm run send-zlog","predodist:win64":"npm run predodist","predodist:win32":"npm run predodist","predodist:mac":"node ./tools/predodistmac.js && npm run predodist","dodist":"electron-builder --config electron-builder.config.js","predodist:dir":"npm run build-pc && npm run signtool && npm run compile:main","dodist:mac":"electron-builder --mac --config electron-builder.config.js","dodist:dir":"electron-builder --dir --mac --config electron-builder.config.js","dodist:win":"electron-builder --win --config electron-builder.config.js","dodist:win32":"electron-builder --ia32 --config electron-builder.config.js","dodist:win64":"electron-builder --arch x64 --config electron-builder.config.js","pack:installer":"node ./tools/prebuild.js && npm run pack:winstaller && node ./tools/afterpack.js ia32 && electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js && babel-node tools/genPartialUpdate.js ia32 -- ","pack:full":"node ./tools/prebuild.js && npm run pack:winstaller && node ./tools/afterpack.js ia32 && electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js && babel-node tools/diffModule.js","dist:win32":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=4096\' BUILD_ENV=test npm run pack:installer && npm run send-zlog","dist:win32release":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=4096\' BUILD_TYPE=release BUILD_ENV=test NEED_SIGN=1 npm run pack:installer && npm run send-zlog","dist:win32fullpack":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true NODE_OPTIONS=\'--max-old-space-size=8096\' BUILD_TYPE=release BUILD_ENV=production NEED_SIGN=1 npm run pack:full","postpack:full":"npm run send-zlog","uploadsourcemapwin":"sentry-cli releases files Zalo%npm_package_version% upload-sourcemaps pc-dist/ --url-prefix app:///pc-dist/ && sentry-cli releases files Zalo%npm_package_version% upload-sourcemaps main-dist/ --url-prefix app:///main-dist/","uploadsourcemapmac":"sentry-cli releases files Zalo$npm_package_version upload-sourcemaps pc-dist/ --url-prefix app:///pc-dist/ && sentry-cli releases files Zalo$npm_package_version upload-sourcemaps main-dist/ --url-prefix app:///main-dist/","uploadsourcemapweb":"sentry-cli releases files Zalo$npm_package_version upload-sourcemaps dist/ --url-prefix ~/ && rm -r ./dist/sourcemaps","dist:win32nobuild":"electron-builder --prepackaged ./dist/win-ia32-unpacked/ --ia32 --config electron-builder.config.js&& babel-node tools/genPartialUpdate.js ia32 -- && npm run send-zlog","dist:win":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist:win","dist:win64":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist:win64","dist:appX":"(npm run dodist:appX || true) && babel-node tools/rename-appx-64.js &&  npm run dodist:appX32","dist:mac":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true BUILD_ENV=test npm run dodist:mac && npm run send-zlog","dist:macrelease":"cross-env NODE_OPTIONS=\'--max-old-space-size=4096\' ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true BUILD_TYPE=release NEED_SIGN=1 npm run dodist:mac && npm run send-zlog","dist:macnobuild":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --mac --config electron-builder.config.js && npm run send-zlog","dist":"cross-env NODE_OPTIONS=\'--max-old-space-size=2048\' ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true npm run dodist","predist:appX":"npm run build-pc-appX && npm run signtool && npm run compile:main","dodist:appX":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --win AppX --config electron-builder.config.js","dodist:appX32":"cross-env ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true electron-builder --win AppX --ia32  --config electron-builder.config.js","zip-pc":"babel-node tools/zipResource.js","db:clear":"babel-node tools/clearDb.js","icon:gen":"gulp icon","icon:check":"babel-node icon/checkIconsCli.js","icon":"babel-node icon/buildIcons.js && babel-node icon/createSVGFont.js && npm run sass","icon:full":"npm run icon:check && npm run icon && npm run sass ","lang":"mkdirp src/static/lang &&  cd ./InitLang && node ./run.js","signtool":"cross-env BABEL_ENV=node babel-node tools/sign-tool-win.js","install-native":"electron-builder install-app-deps","install-native-32":"electron-builder install-app-deps --arch=ia32","pack-module":"babel-node tools/genPartialUpdate.js ia32 -- ","update-bundle-files-list":"node ./tools/get-node-modules-glob.js","upload-native-symbol":"sentry-cli upload-dif -o vng -p zalopc --wait ./.symbols"},"author":{"name":"VNG Corp.","email":"feddback@zalo.me","url":"https://zalo.me/"},"license":"MIT","dependencies":{"@babel/plugin-transform-runtime":"7.11.0","@babel/preset-env":"7.11.0","@babel/preset-react":"7.10.4","@babel/runtime-corejs3":"7.11.2","@google-cloud/secret-manager":"4.0.0","@google-cloud/storage":"6.1.0","@reduxjs/toolkit":"1.5.1","@sentry/electron":"1.1.0","@sentry/react":"6.2.4","@tensorflow/tfjs":"0.15.3","@types/generic-pool":"3.1.9","adm-zip":"0.4.13","ajv":"5.2.2","archiver":"2.0.3","auto-launch":"^5.0.1","babel-plugin-module-resolver":"4.0.0","babel-plugin-transform-zlog":"1.17.1","big-integer":"1.6.23","bloom-filters":"1.3.8","broadcast-channel":"~4.10.0","cborg":"1.9.5","change-case":"4.1.2","chart.js":"2.7.2","check-disk-space":"2.1.0","clsx":"1.0.4","codemirror":"^5.59.0","core-js":"3.6.5","cron":"2.1.0","crypto-js":"3.1.8","decompress":"4.2.0","dompurify":"2.3.6","dropbox":"2.5.9","electron-log":"4.2.2","electron-store":"6.0.1","electron-updater":"4.0.0","es6-promise":"3.2.1","fast-memoize":"^2.5.2","file-saver":"1.3.3","file-type":"10.11.0","flatted":"3.2.5","fs-extra":"6.0.1","generic-pool":"3.7.2","glob":"7.1.2","google-libphonenumber":"3.1.15","immer":"7.0.5","jpeg-js":"0.4.1","js-yaml":"^3.8.4","jszip":"3.10.1","libphonenumber-js":"1.6.6","lodash.debounce":"4.0.8","lodash.toarray":"4.4.0","lottie-web":"^5.1.7","lowdb":"2.1.0","lz-string":"1.4.4","microm":"0.2.4","mkdirp":"^0.5.1","moment":"^2.29.1","nanoid":"3.3.3","network":"0.5.0","node-fetch":"2.6.0","node-stream-zip":"1.8.0","node-wifi":"2.0.13","p-defer":"4.0.0","p-tap":"4.0.0","pako":"2.0.3","pdfjs-dist":"2.5.207","percentile":"1.6.0","progress-stream":"1.2.0","prop-types":"15.5.10","protobufjs":"6.11.2","quick-lru":"6.0.2","react":"16.14.0","react-codemirror2":"^7.2.1","react-custom-scrollbars":"^4.2.1","react-datetime":"file:native/zdate-time-picker","react-dom":"16.14.0","react-draggable":"^4.4.3","react-error-overlay":"6.0.7","react-input-range":"^1.3.0","react-intersection-observer":"8.25.2","react-measure":"2.0.2","react-motion":"0.5.2","react-redux":"7.2.4","react-refresh":"0.8.3","react-resizable":"^1.11.0","react-router-redux":"^4.0.8","react-simple-timefield":"3.2.5","react-transition-group":"4.4.1","react-virtualized":"9.9.0","recoil":"0.1.3","recompose":"0.30.0","redux":"4.0.5","redux-batched-subscribe":"0.1.6","redux-thunk":"2.3.0","reflect-metadata":"0.1.13","request":"2.88.0","reselect":"4.0.0","resize-observer-polyfill":"1.5.1","sift":"16.0.0","source-map-support":"0.5.19","spark-md5":"3.0.0","stackblur-canvas":"1.4.0","systeminformation":"5.6.12","tar-fs":"2.0.0","tmp":"0.0.31","tough-cookie":"^2.3.2","tsyringe":"4.6.0","unused-filename":"0.1.0","uuid":"3.1.0","workerpool":"6.1.0","xstate":"4.23.1"},"devDependencies":{"@babel/cli":"^7.0.0","@babel/core":"^7.0.0","@babel/eslint-parser":"7.12.1","@babel/node":"^7.0.0","@babel/plugin-proposal-class-properties":"7.12.1","@babel/preset-typescript":"7.12.7","@babel/register":"^7.0.0","@sentry/cli":"1.51.1","@types/async":"3.2.3","@types/codemirror":"0.0.98","@types/core-js":"2.5.4","@types/dompurify":"2.3.3","@types/gulp":"4.0.6","@types/jest":"26.0.23","@types/lodash.debounce":"4.0.6","@types/lodash.toarray":"4.4.6","@types/node":"17.0.35","@types/react":"^16.8.25","@types/react-custom-scrollbars":"4.0.8","@types/react-dom":"17.0.9","@types/react-resizable":"1.7.3","@types/react-transition-group":"4.4.0","@types/react-virtualized":"9.21.12","@types/rimraf":"3.0.2","@types/sqlite3":"3.1.8","@types/workerpool":"6.1.0","@typescript-eslint/parser":"4.22.0","babel-core":"^7.0.0-bridge.0","babel-eslint":"^9.0.0","babel-jest":"^23.4.2","babel-plugin-encrypt-src":"^1.0.3","capitalize":"2.0.4","chai":"3.5.0","chalk":"1.1.3","connect":"3.6.6","consola":"2.15.0","coveralls":"2.11.12","cross-env":"^2.0.0-beta","debug":"4.1.1","devtron":"1.4.0","electron":"7.3.2","electron-builder":"20.44.4","electron-devtools-installer":"3.1.1","electron-download":"4.1.1","electron-notarize":"0.2.1","electron-publish":"19.53.3","enzyme":"3.3.0","eslint":"5.4.0","eslint-import-resolver-babel-module":"5.1.0","eslint-import-resolver-webpack":"0.6.0","eslint-plugin-babel":"3.3.0","eslint-plugin-import":"2.16.0","eslint-plugin-jest":"21.22.0","eslint-plugin-jsx-a11y":"2.1.0","eslint-plugin-react":"7.11.1","eslint-plugin-react-hooks":"2.4.0","eslint-watch":"2.1.14","faker":"5.5.3","globby":"11.0.1","gulp":"4.0.2","gulp-consolidate":"0.2.0","gulp-iconfont":"11.0.0","isparta":"4.0.0","jest":"23.6.0","jsftp":"1.5.5","lint-staged":"10.5.4","md5":"2.2.1","md5-file":"4.0.0","micromatch":"4.0.2","mocha":"4.1.0","ncp":"^2.0.0","node-abi":"^2.0.2","node-pre-gyp":"^0.6.37","node-sass":"4.12.0","nodemon":"1.11.0","npm":"6.14.2","npm-run-all":"2.3.0","open":"0.0.5","pre-commit":"1.2.2","prettier":"2.4.1","prompt":"1.0.0","react-hook-form":"7.31.3","react-hook-form-auto":"1.3.13","react-test-renderer":"16.5.1","recoilize":"2.0.1","redux-logger":"3.0.6","redux-perf-middleware":"1.1.0","regenerator-runtime":"0.13.7","replace":"0.3.0","rimraf":"2.5.4","serve-static":"1.13.2","shelving-mock-indexeddb":"1.0.8","sinon":"1.17.5","sinon-chai":"2.8.0","terser-webpack-plugin-legacy":"1.2.3","ts-jest":"26.5.6","ts-node":"8.10.2","typescript":"3.9.6","uglify-es":"3.3.7","uglifyjs-webpack-plugin":"1.1.6","utility-types":"3.10.0","walkdir":"0.0.12","webpack":"3.10.0","webpack-chain":"6.5.1","webpack-dev-middleware":"^2.0.4","webpack-hot-middleware":"^2.21.0","webpack-md5-hash":"0.0.5","webpack-strip":"0.1.0","webpack-virtual-modules":"0.4.3","yargs":"15.4.1"},"externals":[]}')
        },
        nUpV: function (e, t, s) {
            "use strict";
            var i = s("jDHv"),
                n = s("YEoC"),
                a = (s("bSii"), s("UJ0r")),
                r = s("teaq");
            const o = n.a.IDB;
            var l, d = s("d/or");
            let c = i.ModuleContainer.injectable()(l = Reflect.metadata("design:type", Function)(l = Reflect.metadata("design:paramtypes", [])(l = class e {
                constructor() {
                    this._preferAdapters = void 0, this._settings = void 0, this._preferAdapters = [], this._settings = new Map
                }
                get preferAdapters() {
                    return this._preferAdapters
                }
                set preferAdapters(e) {
                    this._preferAdapters = e, this._settings.clear(), this.save();
                    i.ModuleContainer.resolve(r.b).clearCache()
                }
                async load() {
                    i.ModuleContainer.resolve(a.b);
                    throw new Error("'zdb_setting' localStorage key is no longer in-use! Please remove it usage!")
                }
                async save() {
                    e.deserializePreferAdapter(this._preferAdapters), e.deserializeDatabaseSettings(this._settings);
                    throw new Error("'zdb_setting' localStorage key is no longer in-use! Please remove it usage!")
                }
                getPreferredAdapter(e) {
                    var t;
                    return null === (t = this._settings.get(e)) || void 0 === t ? void 0 : t.preferAdapter
                }
                setPreferAdapter(e, t) {
                    let s = this._settings.get(e);
                    s ? s.preferAdapter = t : s = {
                        currentAdapter: t,
                        preferAdapter: t
                    }, this._settings.set(e, s), this.save()
                }
                getCurrentAdapterType(e) {
                    let t = this._settings.get(e);
                    return t || (t = {
                        currentAdapter: o
                    }, this._settings.set(e, t)), t.currentAdapter
                }
                setCurrentAdapter(e, t) {
                    let s = this._settings.get(e);
                    s ? s.currentAdapter = t : s = {
                        currentAdapter: t,
                        preferAdapter: t
                    }, this._settings.set(e, s)
                }
                getDatabaseState(e) {
                    return this._settings.get(e)
                }
                static deserializePreferAdapter(e) {
                    return e.map((e => e === n.a.IDB ? "IDB" : "SQLite"))
                }
                static serializePreferAdapter(e) {
                    return e.adapter.map((e => "IDB" === e ? n.a.IDB : n.a.SQLite))
                }
                static deserializeDatabaseSettings(e) {
                    return Array.from(e.entries())
                }
                static serializeDatabaseSettings(e) {
                    return new Map(e.databases)
                }
            }) || l) || l) || l;
            i.ModuleContainer.registerSingleton(d.a, c)
        },
        o0oJ: function (e, t, s) {
            (function (e) {
                const t = {};

                function s(e) {
                    return t[e] || (t[e] = 0), t[e] += 1, 100 * e + t[e]
                }
                if (!e.perf) {
                    let t;
                    t = () => Date.now();
                    const i = {
                        STARTUP: s(1),
                        MIGRATION_DONE: s(2),
                        MAIN_SCRIPT: s(2),
                        LOADED_MAIN_SCRIPT: s(3),
                        MAIN_APP_READY: s(3),
                        LOADED_STARTUP_SCRIPT: s(2),
                        STARTUP_BEFORE_HEAVY: s(3),
                        CREATE_MAIN_WINDOW: s(3),
                        SHOW_MAIN_WINDOW: s(3),
                        MAIN_WINDOW_LOADING: s(3),
                        MAIN_WINDOW_LOADED: s(3),
                        APP_STARTUP: s(2),
                        LOAD_APP_SCRIPT: s(3),
                        APP_DID_MOUNT: s(3),
                        CHATBOX_DID_MOUNT: s(3),
                        SELECT_CONVERSATION: s(1),
                        SELECTED_CONVERSATION: s(2)
                    };
                    e.perf = {
                        ...i,
                        perfRecords: [],
                        record: s => {
                            s || (s = 0);
                            const i = [s, t()];
                            e.perf.perfRecords.push(i)
                        }
                    }
                }
            }).call(this, s("kjmW"))
        },
        qLCR: function (e, t, s) {
            "use strict";
            s.r(t);
            s("cOPa"), s("mNvP"), s("BtX6");
            var i = s("VTBJ"),
                n = s("mwIZ"),
                a = s.n(n),
                r = s("D1y2"),
                o = s.n(r),
                l = s("jDHv"),
                d = s("Y58e");
            l.ModuleContainer.registerSingleton(d.a, class {
                get(e) {
                    const t = s("NDmK").default;
                    return a()(t, e)
                }
                set(e, t) {
                    const n = s("NDmK").default,
                        r = Object(i.a)(Object(i.a)({}, a()(n, e)), t);
                    return o()(n, e, r)
                }
            });
            var c, h = s("jGDt"),
                u = s("igA5"),
                g = s("PLj1"),
                m = s("KRcn"),
                p = s("7FSS"),
                f = s("i15Q"),
                v = s("1pet");
            let b = Object(l.injectable)()(c = Reflect.metadata("design:type", Function)(c = Reflect.metadata("design:paramtypes", [])(c = class extends f.a {
                constructor() {
                    super();
                    const e = Object(m.a)();
                    if (g.a.includes(e)) this._enableConsole = !1;
                    else {
                        var t;
                        const e = null === (t = u.a.getInstance()) || void 0 === t ? void 0 : t.getItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE);
                        this._enableConsole = "true" === e || !1
                    }
                    p.a.log("[ZLL]: Console logging", this._enableConsole ? "enabled" : "disabled")
                }
                enableConsole() {
                    p.a.log("[ZLL]: Console logging enabled"), this._enableConsole = !0;
                    const e = Object(m.a)();
                    var t;
                    g.a.includes(e) || (null === (t = u.a.getInstance()) || void 0 === t || t.setItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE, "true"))
                }
                disableConsole() {
                    p.a.log("[ZLL]: Console logging disabled"), this._enableConsole = !1;
                    const e = Object(m.a)();
                    var t;
                    g.a.includes(e) || (null === (t = u.a.getInstance()) || void 0 === t || t.setItem(v.ZLoggerLocalStorageKeys.RENDERER_CONSOLE_MODE, "false"))
                }
            }) || c) || c) || c;
            l.ModuleContainer.registerSingleton(h.a, b);
            s("ezdo"), s("KdAX");
            var I = s("W8Xk");
            const y = Object(l.define)("kv-cache"),
                C = Object(l.define)("kv-cache-in-mem");
            var S;
            class _ {
                constructor(e) {
                    this._prefix = void 0, this._prefix = `${e}-kv-db`
                }
                _buildKey(e) {
                    return `${this._prefix}-${e}`
                }
                async setItem(e, t) {
                    const s = this._buildKey(e),
                        i = u.a.getInstance();
                    return await i.setItemAsync(s, I.b(t)), t
                }
                async getItem(e) {
                    const t = this._buildKey(e),
                        s = u.a.getInstance(),
                        i = await s.getItemAsync(t);
                    return Promise.resolve(i ? I.a(i) : void 0)
                }
                async removeItem(e) {
                    const t = this._buildKey(e),
                        s = u.a.getInstance();
                    return await s.removeItemAsync(t), this
                }
            }
            Object(l.singleton)(y)(S = class {
                createCache(e) {
                    return new _(`${e}`)
                }
            });
            var E, L = s("ndDP");
            class w {
                constructor(e, t) {
                    this._unused_name = e, this._lru = void 0, this._lru = new L.default(t)
                }
                setItem(e, t) {
                    return this._lru.set(e, t), Promise.resolve(t)
                }
                getItem(e) {
                    return Promise.resolve(this._lru.get(e))
                }
                removeItem(e) {
                    return this._lru.delete(e), Promise.resolve(this)
                }
            }
            Object(l.singleton)(C)(E = class {
                constructor() {
                    this._registry = {}
                }
                createCache(e, t) {
                    return this._registry[e] || (this._registry[e] = new w(e, t)), this._registry[e]
                }
            });
            s("wKPd"), s("0rWR"), s("Lq8m"), s("nUpV"), s("5yGw"), s("hRcX"), s("gpNb"), s("rhBN"), s("cF85"), s("XidR");
            var M = s("4prX"),
                T = s("12Ui");
            l.ModuleContainer.registerSingleton(T.a, class {
                increaseSuccess(e, t, s, i, n) {
                    M.default.increaseSuccess(e, t, s, i, n)
                }
                increaseFailed(e, t, s, i, n, a, r) {
                    M.default.increaseFailed(e, t, s, i, n, a, r)
                }
            });
            var F, O = s("8/YW"),
                R = s("PmZf"),
                D = s("tHMN"),
                A = s("jIg3"),
                j = s("Mgpg");
            let P = l.ModuleContainer.injectable()(F = function (e, t) {
                return l.ModuleContainer.inject(D.b)(e, void 0, 0)
            }(F = function (e, t) {
                return l.ModuleContainer.inject(j.ZLoggerFactory)(e, void 0, 1)
            }(F = Reflect.metadata("design:type", Function)(F = Reflect.metadata("design:paramtypes", [void 0 === D.a ? Object : D.a, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(F = class extends A.a {
                constructor(e, t) {
                    super(), this.engine = e, this.logger = void 0, this.logger = t.createZLogger("db", ["browser"]), this.engine.addEventListener(R.a.UnexpectedError, (e => {
                        this.dispatchEvent(new R.d(e.error))
                    })), this.engine.addEventListener(R.a.QueryError, (e => {
                        this.dispatchEvent(new R.b(e.error))
                    }))
                }
                install() {
                    const e = l.ModuleContainer.resolve(O.a);
                    e.addEventListener(O.b.Authenticated, (e => {
                        this.authenticate(e.getSession())
                    })), e.currentSession && this.authenticate(e.currentSession), this.logger.zsymb(3, 8630, 3e4, "installed")
                }
                areYouOk() {
                    return !0
                }
                authenticate(e) {
                    e && (this.session = e, this.dispatchEvent(new R.c(e)), this.logger.zsymb(0, 8630, 30001, (() => ["authenticated", `id: ${e.userId}`])))
                }
                async closeDBs(e) {
                    let t = [];
                    e ? e.length && (t = e.map((e => this.engine.closeDatabase(e)))) : t = [this.engine.closeAllDatabases()], await Promise.all(t)
                }
            }) || F) || F) || F) || F) || F;
            l.ModuleContainer.registerSingleton(A.b, P);
            var N, B = s("W8fB");
            let U = Object(l.injectable)()(N = class {}) || N;
            l.ModuleContainer.registerSingleton(B.b, U);
            var k = s("AH6j"),
                G = s("fsQs"),
                z = s("HPcM");
            let x;
            ! function (e) {
                e.Binary = "zlog", e.Text = "log"
            }(x || (x = {}));
            x.Binary, x.Text;
            let V, $;
            ! function (e) {
                e.PhysicalTextWriter = "PhysicalTextWriter", e.PhysicalBinaryWriter = "PhysicalBinaryWriter", e.PhysicalMeta = "PhysicalMeta"
            }(V || (V = {})),
            function (e) {
                e.Init = "Init", e.Idle = "Idle", e.Busy = "Busy", e.Paused = "Paused", e.Disabled = "Disabled"
            }($ || ($ = {}));
            const W = Object(l.define)("virtual-file-writer");
            var q;
            let K = Object(l.injectable)()(q = function (e, t) {
                return Object(l.inject)(z.a)(e, void 0, 0)
            }(q = function (e, t) {
                return Object(l.inject)(W)(e, void 0, 1)
            }(q = Reflect.metadata("design:type", Function)(q = Reflect.metadata("design:paramtypes", [void 0 === z.a ? Object : z.a, void 0 === W ? Object : W])(q = class extends k.b {
                constructor(e, t) {
                    super(), this.bucket = e, this.logWriter = t, this._mode = void 0, this.status = $.Init, this._mode = x.Binary
                }
                async init() {
                    G.n && p.a.log("DBLogWriterImpl.init()");
                    try {
                        await this.logWriter.loadMeta(), this._mode === x.Binary && await this.logWriter.loadModule()
                    } catch (e) {
                        p.a.debug("[ZLL]: DBLogWriterImpl.init() failed", e)
                    }
                    this.status = $.Idle, G.n && p.a.log("[ZLL]: DBLogWriterImpl init() DONE", $[this.status])
                }
                async flush() {
                    if (this.status !== $.Idle) return void p.a.debug(`[ZLL]:Log writer is: ${$[this.status]}, flush skipped!`);
                    let e = Date.now();
                    if (0 === this.bucket.size()) return void p.a.debug("[ZLL]: bucket is EMPTY, flush skipped!");
                    G.n && p.a.log(`FLUSHING: ${this.bucket.size()} logs => DB`), this.status = $.Busy;
                    const t = this.bucket.get(G.j),
                        s = t.length;
                    await this.logWriter.write(t) ? (await this.logWriter.flushMetas(), this.bucket.removeFirst(s - t.length), p.a.debug(`[ZLL]: flush success: ${s-t.length}/${s}. failed:${t.length}/${s}`)) : p.a.error(`[ZLL]: flush failed: ${s-t.length}/${s}. failed:${t.length}/${s}`), this._mode === x.Binary && await this.logWriter.flushModules(), this.status = $.Idle, G.n && p.a.log(`FLUSHED: ${s-t.length}/${s} logs => DB. TOOK: ${Date.now()-e}ms`)
                }
            }) || q) || q) || q) || q) || q;
            var H, Z = s("fsN4"),
                Q = s("ebA4"),
                J = s("ez9R"),
                X = s("XuBa"),
                Y = s("j6JD");
            const ee = {
                id: 0,
                current: 0,
                currentPage: 0,
                startups: [],
                ss: -1,
                ss_ln: -1
            };
            let te = Object(l.injectable)()(H = Reflect.metadata("design:type", Function)(H = Reflect.metadata("design:paramtypes", [])(H = class {
                constructor() {
                    this._status = void 0, this.BinEncoder = null, this.DB = void 0, this.currentPage = void 0, this.module = new Map, this.metas = {
                        data: ee,
                        updateRequired: !1
                    }, this._status = $.Idle, this.DB = Z.a.getInstance().ZLog
                }
                get status() {
                    return this._status
                }
                async write(e) {
                    try {
                        return this._status = $.Busy, await this.encodeFit(e, this.metas), this._status = $.Idle, !0
                    } catch (t) {
                        return p.a.error(`[ZLL]: VirtualFileWriterImpl.write err ${t}`), this._status = $.Idle, !1
                    }
                }
                async collectAllLogs() {
                    try {
                        const e = (await this.DB.Pages.getAll()).map((e => e.data.slice(0, e.curoffs))),
                            t = new Blob(e);
                        return await t.arrayBuffer()
                    } catch (e) {
                        return p.a.error(`[ZLL]:VirtualFileWriterImpl.getAllPagesCombine err ${e}`), new ArrayBuffer(0)
                    }
                }
                async read(e) {
                    try {
                        return await this.DB.Pages.get(e)
                    } catch (t) {
                        return void p.a.error(`[ZLL]: VirtualFileWriterImpl.reading ${e} err ${t}`)
                    }
                }
                async delete(e) {
                    try {
                        return await this.DB.Pages.delete(e), !0
                    } catch (t) {
                        return p.a.error(`[ZLL]:VirtualFileWriterImpl.deleting ${e} err ${t}`), !1
                    }
                }
                async encodeFit(e, t) {
                    var s;
                    if (0 === e.length) return;
                    const i = [],
                        n = G.d.page_limit;
                    this.currentPage && this.currentPage.id === t.data.currentPage || (this.currentPage = await this.DB.Pages.get(t.data.currentPage), this.currentPage && (this.currentPage.curoffs = 0));
                    let a = 0;
                    const r = n - ((null === (s = this.currentPage) || void 0 === s ? void 0 : s.curoffs) || 0);
                    let o = G.c.OK;
                    for (; e.length;) {
                        const t = await this.encodeBinary(e[0]);
                        if (a + t.byteLength > r) {
                            o = G.c.OVERSIZE_NEXTPAGE;
                            break
                        }
                        i.push(new Uint8Array(t)), a += t.byteLength, e.shift()
                    }
                    if (0 === i.length && o === G.c.OVERSIZE_NEXTPAGE) {
                        if (this.currentPage && this.currentPage.curoffs < this.currentPage.data.size) {
                            const e = this.currentPage.data.slice(0, this.currentPage.curoffs);
                            this.currentPage.data = e, await this.DB.Pages.insert(this.currentPage, {
                                replace: !0
                            })
                        }
                        return this.nextPage(t), void(await this.DB.Metas.insert(t.data, {
                            replace: !0
                        }))
                    }
                    if (!i.length) return;
                    const l = this.combineArrayBuffers(i);
                    if (this.currentPage) {
                        if (l.byteLength) {
                            const e = this.currentPage.data.slice(0, this.currentPage.curoffs),
                                t = new Blob([e, l]);
                            this.currentPage.data = t, this.currentPage.curoffs += l.byteLength, this.currentPage.max = G.d.page_limit, this.currentPage.mtime = Date.now()
                        }
                        o === G.c.OVERSIZE_NEXTPAGE ? this.nextPage(t) : t.data.current = this.currentPage.curoffs, l.byteLength && await this.DB.Pages.insert(this.currentPage, {
                            replace: !0
                        });
                        try {
                            await this.DB.Metas.insert(t.data, {
                                replace: !0
                            })
                        } catch (d) {
                            p.a.error("[ZLL]: VirtualFileWriterImpl.encodeFit err2", d)
                        }
                    } else {
                        this.currentPage = {
                            id: t.data.currentPage,
                            data: new Blob([l]),
                            curoffs: l.byteLength,
                            max: G.d.page_limit,
                            mtime: Date.now()
                        }, t.data.current = l.byteLength;
                        try {
                            await this.DB.Pages.insert(this.currentPage, {
                                replace: !0
                            }), await this.DB.Metas.insert(t.data, {
                                replace: !0
                            })
                        } catch (d) {
                            p.a.error("[ZLL]:VirtualFileWriterImpl.encodeFit err", d)
                        }
                    }
                }
                combineArrayBuffers(e) {
                    const t = e.reduce(((e, t) => e + t.byteLength), 0),
                        s = new Uint8Array(t);
                    let i = 0;
                    for (const n of e) s.set(new Uint8Array(n), i), i += n.byteLength;
                    return s.buffer
                }
                getSessionLineId() {
                    let e = this.metas.data.ss;
                    const t = (this.metas.data.ss_ln + 1) % G.m.SESSION_LINE_MAX;
                    return 0 === t && (e = (e + 1) % G.m.SESSION_MAX), this.metas.data.ss = e, this.metas.data.ss_ln = t, {
                        ss: e,
                        ss_ln: t
                    }
                }
                encodeText(e) {
                    const t = this.getSessionLineId();
                    return Object(Q.b)(e, t).buffer
                }
                async encodeBinary(e) {
                    this.BinEncoder || (this.BinEncoder = l.ModuleContainer.resolve(J.a));
                    const t = await this._getModule([e.lineMeta.module, e.lineMeta.features]),
                        s = this.getSessionLineId();
                    return this.BinEncoder.encode(e, t.data.id, s)
                }
                nextPage(e) {
                    const t = G.d.page_limit,
                        s = G.d.file_lim,
                        i = Math.floor(s / t),
                        n = (e.data.currentPage + 1) % i;
                    return e.updateRequired = !0, e.data.currentPage = n, e.data.current = 0, e
                }
                async loadMeta() {
                    try {
                        let e = await this.DB.Metas.get(0);
                        e || (e = ee), e.startups.length > G.a && (e.startups = e.startups.slice(0, G.a)), e.startups.unshift(Object(Y.a)(Date.now())), e.ss = void 0 !== e.ss ? e.ss : -1, e.ss_ln = -1, this.metas.data = e, this.metas.updateRequired = !1
                    } catch (e) {
                        p.a.error(`[ZLL]: VirtualFileWriterImpl.loadMeta err ${e}`)
                    }
                    return await this._loadCurrentPage(), this.metas
                }
                async flushMetas() {
                    this.metas.updateRequired && await this.DB.Metas.insert(this.metas.data, {
                        replace: !0,
                        retry: 1
                    })
                }
                async loadModule() {
                    try {
                        const e = await this.DB.Modules.getAll();
                        if (e) {
                            const t = e.map((e => [X.a.decrypt(e.hash), {
                                data: e,
                                updateRequired: !1
                            }]));
                            this.module = new Map(t)
                        }
                    } catch (e) {
                        p.a.error(`[ZLL]: VirtualFileWriterImpl.loadModule err ${e}`)
                    }
                    return this.module
                }
                async flushModules() {
                    const e = Array.from(this.module.values());
                    for (const t of e) t.updateRequired && (await this.DB.Modules.insert(t.data, {
                        retry: 1
                    }), t.updateRequired = !1)
                }
                async _loadCurrentPage() {
                    this.metas || await this.loadMeta();
                    const e = await this.DB.Pages.get(this.metas.data.currentPage);
                    return this.currentPage = e, e
                }
                async _getModule(e) {
                    const t = JSON.stringify(e),
                        s = this.module.get(t);
                    if (s) return s;
                    const i = X.a.encrypt(t),
                        n = {
                            data: {
                                id: this.module.size,
                                hash: i
                            },
                            updateRequired: !0
                        };
                    return this.module.set(t, n), n
                }
            }) || H) || H) || H;
            l.ModuleContainer.registerSingleton(W, te), l.ModuleContainer.registerSingleton(B.c, K);
            const se = Object(l.define)("zlog-writer-manager");
            var ie, ne = s("Y41u"),
                ae = s("K8kB");
            let re = Object(l.injectable)()(ie = function (e, t) {
                return Object(l.inject)(ae.a)(e, void 0, 0)
            }(ie = function (e, t) {
                return Object(l.inject)(B.c)(e, void 0, 1)
            }(ie = function (e, t) {
                return Object(l.inject)(B.b)(e, void 0, 2)
            }(ie = Reflect.metadata("design:type", Function)(ie = Reflect.metadata("design:paramtypes", [void 0 === ae.a ? Object : ae.a, void 0 === B.c ? Object : B.c, void 0 === B.b ? Object : B.b])(ie = class {
                constructor(e, t, s) {
                    this._writeScheduler = e, this.zlogWriter = t, this.senWriter = s, this._handleFlushRequest = () => {
                        this.zlogWriter.flush()
                    }, this._handleWriterStatus = e => {}
                }
                setupWriters() {
                    this.zlogWriter.init(), this._writeScheduler.start(), this._listenEvents()
                }
                _listenEvents() {
                    this._writeScheduler.addEventListener(ne.c.WriteSchedulerRequestFlush, this._handleFlushRequest), this.zlogWriter.addEventListener(ne.c.WriterStatus, this._handleWriterStatus)
                }
            }) || ie) || ie) || ie) || ie) || ie) || ie;
            l.ModuleContainer.registerSingleton(se, re);
            var oe, le = s("OMsT"),
                de = s("XS0u");
            let ce = Object(l.injectable)()(oe = class {
                clientDeviceInfo() {
                    return navigator.userAgent
                }
                prepareLogBlob(e) {
                    return new Promise(((t, i) => {
                        let n = e.viewerKey;
                        if (!n) {
                            n = de.default.getLastViewKey() || "";
                            try {
                                var a;
                                n = null === (a = n) || void 0 === a ? void 0 : a.split(".")[0]
                            } catch {}
                        }
                        const r = new(s("xOOu")),
                            o = [this.collectLDBLogs(), this.collectLDBMetas(), this.collectLDBModules()];
                        Promise.all(o).then((s => {
                            const [a, o, l] = s; {
                                const e = `${Object(m.a)()}.zlog`;
                                r.file(e, a)
                            } {
                                const e = `${Object(m.a)()}.meta`;
                                r.file(e, o)
                            } {
                                const e = `${Object(m.a)()}.module`;
                                r.file(e, l)
                            } {
                                const e = "device.zinfo",
                                    t = new TextEncoder;
                                r.file(e, t.encode(this.clientDeviceInfo()).buffer)
                            }
                            r.generateAsync({
                                type: "arraybuffer",
                                compression: "DEFLATE"
                            }).then((s => {
                                if (e.bareContent) t({
                                    name: `zlog_${n}_${Date.now()}.zip`,
                                    data: new Uint8Array(s)
                                });
                                else {
                                    const e = new Blob([new Uint8Array(s)]);
                                    e.name = `zlog_${n}_${Date.now()}.zip`, t(e)
                                }
                            })).catch((e => {
                                i(e)
                            }))
                        }))
                    }))
                }
                async collectLDBLogs() {
                    try {
                        const e = Z.a.getInstance().ZLog,
                            t = (await e.Pages.getAll()).map((e => e.data)),
                            s = new Blob(t);
                        return await s.arrayBuffer()
                    } catch (e) {
                        return p.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`), new ArrayBuffer(0)
                    }
                }
                async collectLDBMetas() {
                    try {
                        const e = Z.a.getInstance().ZLog,
                            t = await e.Metas.get(0);
                        if (t) {
                            const e = new Blob([JSON.stringify({
                                current: t.current,
                                currentPage: t.currentPage,
                                startups: t.startups
                            })]);
                            return await e.arrayBuffer()
                        }
                        return new ArrayBuffer(0)
                    } catch (e) {
                        return p.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`), new ArrayBuffer(0)
                    }
                }
                async collectLDBModules() {
                    try {
                        const e = Z.a.getInstance().ZLog,
                            t = await e.Modules.getAll();
                        if (t) {
                            const e = {
                                size: 0
                            };
                            t.forEach((t => {
                                e[t.hash] = t.id, e.size++
                            }));
                            const s = new Blob([JSON.stringify(e)]);
                            return await s.arrayBuffer()
                        }
                        return new ArrayBuffer(0)
                    } catch (e) {
                        return p.a.error(`VirtualFileWriterImpl.getAllPagesCombine err ${e}`), new ArrayBuffer(0)
                    }
                }
            }) || oe;
            l.ModuleContainer.registerSingleton(le.a, ce);
            s("jw3m");
            var he = s("q1tI"),
                ue = s.n(he),
                ge = s("i8i4"),
                me = s.n(ge),
                pe = s("Jcee");
            class fe extends pe.b {
                constructor(e, t, s, i) {
                    super(e, t, s), this.container = void 0, this.component = void 0, this.container = i.container, this.component = i.component
                }
                async start() {
                    await super.start(), this.render()
                }
                render() {
                    me.a.render(ue.a.createElement(this.component), this.container)
                }
            }
            let ve, be;
            ! function (e) {
                e.Idle = "Idle", e.Active = "Active"
            }(ve || (ve = {})),
            function (e) {
                e[e.idle = 0] = "idle", e[e.active = 1] = "active"
            }(be || (be = {}));
            class Ie extends k.b {
                constructor(e) {
                    super(), this.status = be.active, this.window = void 0, this.idleDelay = void 0, this.minimumIdlePeriod = void 0, this.lastIdleTime = void 0, this.focusStateChangeDebounceTimer = void 0, this.handleDocumentBlur = () => {
                        this.resetFocusStateChangeDebounceTimer(), this.focusStateChangeDebounceTimer = setTimeout((() => {
                            this.setStateToIdle()
                        }), this.idleDelay)
                    }, this.handleDocumentFocus = () => {
                        this.resetFocusStateChangeDebounceTimer(), this.setStateToActive()
                    }, this.idleDelay = e.idleDelay, this.minimumIdlePeriod = e.minimumIdlePeriod, this.window = e.window || window, this.lastIdleTime = 0, this.focusStateChangeDebounceTimer = null
                }
                start() {
                    this.window.addEventListener("blur", this.handleDocumentBlur), this.window.addEventListener("focus", this.handleDocumentFocus)
                }
                stop() {
                    this.window.removeEventListener("blur", this.handleDocumentBlur), this.window.removeEventListener("focus", this.handleDocumentFocus)
                }
                onIdle(e) {
                    return this.addEventListener(ve.Idle, e)
                }
                setStateToActive() {
                    this.status !== be.idle || (this.status = be.active, this.dispatchEvent(new Event(ve.Active)))
                }
                setStateToIdle() {
                    if (this.status !== be.active) return;
                    this.isThrottlingIdleState() || (this.lastIdleTime = Date.now(), this.status = be.idle, this.dispatchEvent(new Event(ve.Idle)))
                }
                isThrottlingIdleState() {
                    return Date.now() - this.lastIdleTime < this.minimumIdlePeriod
                }
                resetFocusStateChangeDebounceTimer() {
                    this.focusStateChangeDebounceTimer && (clearTimeout(this.focusStateChangeDebounceTimer), this.focusStateChangeDebounceTimer = null)
                }
            }
            var ye = s("/MKj"),
                Ce = s("FK2X"),
                Se = s("emRR"),
                _e = s("xrk1"),
                Ee = s("ZBGy"),
                Le = s("T1Xd"),
                we = s("uzdi");
            const Me = Object(we.a)();

            function Te() {
                const e = Me.useRecoilSnapshot();
                return Me.setSnapShot(e), null
            }
            var Fe = s("QVmZ"),
                Oe = s("72hn"),
                Re = s("ZlRg"),
                De = s("VaDh"),
                Ae = s("CzFt"),
                je = s("hI9i");
            const Pe = Object(ye.b)((function (e) {
                    return {
                        user: e.user,
                        popup: e.popup,
                        status: e.status,
                        profile: e.profile,
                        zaviState: e.zaviState,
                        chatview: e.chatview
                    }
                }), (function (e) {
                    const t = Object(Ee.d)(e);
                    return {
                        emitter: Object(Ee.c)(),
                        dispatch: t
                    }
                }))(Ce.c),
                Ne = () => ue.a.createElement(ye.a, {
                    store: Ae.a,
                    context: Ae.b
                }, ue.a.createElement(_e.d, null, ue.a.createElement(ye.a, {
                    store: Fe.a,
                    context: Oe.a
                }, ue.a.createElement(ye.a, {
                    store: Se.default
                }, ue.a.createElement(ye.a, {
                    store: je.b,
                    context: je.a
                }, ue.a.createElement(Ee.b, null, ue.a.createElement(Le.a, null, ue.a.createElement(ye.a, {
                    context: De.a,
                    store: Re.a
                }, ue.a.createElement(Te, null), ue.a.createElement(Pe, null)))))))));
            var Be;
            let Ue = Object(l.injectable)()(Be = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(Be = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 1)
            }(Be = Reflect.metadata("design:type", Function)(Be = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(Be = class extends fe {
                constructor(e, t) {
                    super("zalo", e, t, {
                        component: Ne,
                        container: document.getElementById("app")
                    })
                }
                async start() {
                    this.setupIdleDetector(), await super.start()
                }
                setupIdleDetector() {
                    const e = this.config.get("idle_detector"),
                        t = new Ie(e);
                    t.addEventListener(ve.Idle, (() => {
                        this.setStateToIdle()
                    })), t.addEventListener(ve.Active, (() => this.setStateToActive())), t.start(), this.disposables.add((() => t.stop())), document.hasFocus() ? this.setStateToActive() : this.setStateToIdle()
                }
            }) || Be) || Be) || Be) || Be) || Be;
            l.ModuleContainer.registerSingleton(O.a, Ue);
            var ke = s("sxU/"),
                Ge = s("SZ0g");
            l.ModuleContainer.registerValue(Ge.a, new class {
                constructor() {
                    this._emitter = void 0, this._emitter = ke.a.instance
                }
                emit(e) {
                    return this._emitter.emit(e.topic, e), Promise.resolve()
                }
                on(e, t) {
                    return this._emitter.on(e, t), this
                }
                off(e, t) {
                    return this._emitter.off(e, t), this
                }
            });
            s("ahRi");
            var ze = s("ptxg");
            s("pUq9");
            let xe;
            xe = class {
                getOverrideDomain(e) {}
                getDomainConfig() {
                    return {}
                }
                setDomainConfig(e) {
                    return this
                }
                subscribe(e) {
                    return () => {}
                }
            }, Object(l.injectable)()(xe), Object(l.singleton)(ze.a)(xe);
            s("LakN"), s("o0oJ");
            var Ve = s("dThN"),
                $e = s("z0WU");
            s("vSga");
            perf.record(perf.LOAD_APP_SCRIPT),
                function () {
                    window.__loadTimer && clearTimeout(window.__loadTimer);
                    window.__startTime && s("vbkW").ipcRenderer.send("load-shell-qos", Date.now() - window.__startTime)
                }();
            s("FcQj");
            var We = s("Ydol"),
                qe = s("97kL"),
                Ke = s("eSGF"),
                He = s("NDmK");
            let Ze;

            function Qe() {
                return Ze || (Ze = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("utils", ["event-bus-effects"])), Ze
            }
            const Je = {
                [qe.FetchActions.DELETE_EVERYONE]: (e, t) => {
                    Xe(e.toUid, e.msgId)
                },
                [qe.FetchActions.UNDO_MULTI]: (e, t) => {
                    var s;
                    null == e || null === (s = e.forEach) || void 0 === s || s.call(e, (e => Xe(e.toUid || e.userId, e.msgId)))
                },
                [qe.FetchActions.UNDO]: (e, t) => {
                    Xe(e.toUid || e.userId, e.msgId)
                },
                [qe.FetchActions.REMOVE_MEDIA]: (e, t) => {
                    for (let s of e.items) Xe(null == e ? void 0 : e.conversationId, null == s ? void 0 : s.msgId)
                },
                [qe.ChatBoxActions.REMOVE_EXPIRED_MEDIA]: (e, t) => {
                    Xe(null == e ? void 0 : e.conversationId, (null == e ? void 0 : e.msgIds) || (null == e ? void 0 : e.msgId))
                },
                [qe.ChatBoxActions.DELETE_MESSAGE]: (e, t) => {
                    const s = e.toUid || e.userId || e.conversation && e.conversation.userId;
                    s !== He.default.sendToMeId && Xe(s, e.msgId)
                }
            };

            function Xe(e, t) {
                if (!e) return;
                if (!t) return;
                let s = Object(Ke.a)(t);
                ke.a.instance.emit("media-removed", {
                    convId: e,
                    msgIds: s
                })
            }
            We.default.subscribe((function (e, t) {
                let s = Je[e];
                if (s) try {
                    s(t, e)
                } catch (i) {
                    Qe().zsymb(18, 8157, 3e4, "Failed to run side effect for event:" + e), Qe().zsymb(18, 8157, 30001, [i])
                }
            }));
            var Ye = s("2ua2");
            s.p;
            Ye.a.init(), $e.default.checkSupport(), $e.default.showWarningMsg();
            var et, tt = s("UiPd"),
                st = s("Kvb3"),
                it = s("QPNp");
            Object(l.singleton)(st.a)(et = Object(O.e)()(et = Reflect.metadata("design:type", Function)(et = Reflect.metadata("design:paramtypes", [])(et = class {
                constructor() {
                    this._isConnectSignalChangeInfo = void 0, this._ipc = void 0, this._dispatch = void 0, this._authEvent = void 0, this._isConnectSignalChangeInfo = !1, this.signalInfoChange = this.signalInfoChange.bind(this)
                }
                isWeb() {
                    return !0
                }
                getIPC() {
                    if (!this.isWeb()) {
                        if (!this._ipc) {
                            const {
                                ipcRenderer: e
                            } = s("vbkW");
                            this._ipc = e
                        }
                        return this._ipc
                    }
                    return null
                }
                bindDispatch(e) {
                    this._dispatch = e
                }
                getDispatch() {
                    return this.isWeb() ? this._dispatch : null
                }
                async preFormatPayload(e) {
                    let t = Object(i.a)({}, e);
                    if (t.conversation) {
                        var s, n;
                        if (null === (s = t.conversation.userId) || void 0 === s || null === (n = s.startsWith) || void 0 === n ? void 0 : n.call(s, v.GROUPID_PREFIX)) {
                            const e = t.conversation.userId,
                                s = await it.a.GroupManager.get(e);
                            if (s && (t.conversation.topMember = s.topMembers, t.conversation.displayName = s.displayName), t.conversation.topMember)
                                for (const i of t.conversation.topMember) {
                                    const e = tt.default.getMiniInfo(i.id);
                                    e && (i.dName = e.dName, i.avatar = e.avatar)
                                }
                        } else {
                            const e = tt.default.getMiniInfo(t.conversation.userId);
                            e && (t.conversation.displayName = e.dName, t.conversation.avatar = e.avatar)
                        }
                    }
                    return t
                }
                signalInfoChange(e) {
                    if (!this.isWeb()) {
                        const t = this.getIPC();
                        t && t.send("update-info-photo-viewer", e)
                    }
                }
                connectSignalToFriendWorker() {
                    this._isConnectSignalChangeInfo || (this._isConnectSignalChangeInfo = !0, tt.default.connectSignalChangeDNameAndAvatar(this.signalInfoChange))
                }
                onAuthenticated(e) {
                    this._authEvent = e
                }
                _addSession(e) {
                    var t;
                    return (e = Object(i.a)({}, e)).session = null === (t = this._authEvent) || void 0 === t ? void 0 : t.getSession(), e
                }
                async openPhotoViewer(e) {
                    let t = await this.preFormatPayload(e);
                    if (t = this._addSession(t), this.connectSignalToFriendWorker(), this.isWeb()) {
                        const e = this.getDispatch();
                        return void(e && e({
                            type: qe.ChatBoxActions.SHOW_FULL_IMAGE,
                            payload: t
                        }))
                    }
                    const s = this.getIPC();
                    s && s.send("photo-viewer", t)
                }
            }) || et) || et) || et);
            var nt, at = s("vQ8b"),
                rt = s("smi1"),
                ot = s("gEkt"),
                lt = s("yzMR");
            let dt = Object(l.injectable)()(nt = function (e, t) {
                return l.ModuleContainer.inject(lt.h)(e, void 0, 0)
            }(nt = function (e, t) {
                return l.ModuleContainer.inject(lt.g)(e, void 0, 1)
            }(nt = Reflect.metadata("design:type", Function)(nt = Reflect.metadata("design:paramtypes", [void 0 === lt.h ? Object : lt.h, void 0 === lt.g ? Object : lt.g])(nt = class {
                constructor(e, t) {
                    this.unreadDataManager = e, this.previewManager = t, this.menuRef = void 0, this.menuRef = {}
                }
                deleteConversation(e, t) {
                    void 0 === t && (t = !0), e != v.CONV_FILTER.STRANGER && ($e.default.logCoreError(`[user call del conv] ${e}`), rt.a.deleteConversation(e, t).then((e => {
                        e && e.delConversationId && Object(Ee.f)({
                            type: qe.ConversationListActions.TAG_CONV,
                            payload: {
                                data: [{
                                    userId: e.delConversationId,
                                    label: null
                                }]
                            }
                        })
                    })).catch((e => {
                        $e.default.logCoreError("Delete conversation fail - " + JSON.stringify(e))
                    })))
                }
                bindUIMenu(e, t) {
                    this.menuRef[e] = t
                }
                cleanUpUIMenu(e) {
                    this.menuRef[e] = null
                }
                showMenu(e, t, s) {
                    if (this.menuRef[e] && e === ot.b) this.showConvActionMenu(t, s)
                }
                hideMenu(e) {
                    this.menuRef[e] && this.menuRef[e].close()
                }
                showConvActionMenu(e, t) {
                    if (t && t.friendItem) return;
                    const s = Object(i.a)({}, t),
                        n = s.userId;
                    if (s && !$e.default.isFakeId(n)) {
                        const e = this.previewManager.getPreviewByIDSync(n),
                            t = tt.default.getProfileFriendByIdSync(n) || {},
                            i = this.unreadDataManager.getUnreadByConvIdSync(n);
                        s.lastMessage = null == e ? void 0 : e.message, s.isFr = t.isFr, s.type = t.type, s.unreadMark = null == i ? void 0 : i.unreadMark, s.smsUnreadCount = null == i ? void 0 : i.smsUnreadCount
                    }
                    this.menuRef[ot.b].updateTargetInfo(s), this.menuRef[ot.b].showAction(Object(i.a)({}, e))
                }
            }) || nt) || nt) || nt) || nt) || nt;
            var ct, ht = s("rCQs"),
                ut = s("iZzu"),
                gt = s("Yi2m"),
                mt = s("6Vk1"),
                pt = s("RojW"),
                ft = s("rXIX"),
                vt = s("EFQ6"),
                bt = s("3xbP"),
                It = s("l+Gc"),
                yt = s("h0sc"),
                Ct = s("VTLO"),
                St = s("LJTV"),
                _t = s("Enw1"),
                Et = s("PoHQ"),
                Lt = s("M7kw"),
                wt = s("Ws4b"),
                Mt = s("6uTC"),
                Tt = s("c51z"),
                Ft = s("Ja3U"),
                Ot = s("SdS7"),
                Rt = s("WQAo"),
                Dt = s("Gm1y"),
                At = s("P6UB"),
                jt = s("h0S/");
            const Pt = {
                    typeFilter: ut.d.ALL,
                    labelFilters: [],
                    loaded: !1
                },
                Nt = "z_sendtome_bubbledot";
            Object(ht.b)(ut.b)(ct = function (e, t) {
                return l.ModuleContainer.inject(lt.a)(e, void 0, 0)
            }(ct = function (e, t) {
                return l.ModuleContainer.inject(mt.b)(e, void 0, 1)
            }(ct = function (e, t) {
                return l.ModuleContainer.inject(lt.h)(e, void 0, 2)
            }(ct = function (e, t) {
                return l.ModuleContainer.inject(lt.e)(e, void 0, 3)
            }(ct = function (e, t) {
                return l.ModuleContainer.inject(lt.f)(e, void 0, 4)
            }(ct = Reflect.metadata("design:type", Function)(ct = Reflect.metadata("design:paramtypes", [void 0 === lt.a ? Object : lt.a, void 0 === mt.b ? Object : mt.b, void 0 === lt.h ? Object : lt.h, void 0 === lt.e ? Object : lt.e, void 0 === lt.f ? Object : lt.f])(ct = class extends k.b {
                constructor(e, t, s, i, n) {
                    var a;
                    super(), a = this, this.convDataManager = e, this.labelDataManager = t, this.unreadDataManager = s, this.muteDataManager = i, this.pinDataManager = n, this.typeFilter = void 0, this.labelFilters = void 0, this.listRawAll = void 0, this.listVisible = void 0, this.listStrangers = void 0, this.listHiddens = void 0, this.listFiltered = void 0, this.newestStrangerId = void 0, this.menuRef = void 0, this.convUIListContainer = void 0, this.showedOnboarding = void 0, this.loaded = void 0, this._logger = void 0, this._pm = null, this._sbc = null, this.handleMuteChange = e => {
                        const t = e.convId,
                            s = e.payload,
                            i = this.listFiltered.includes(t);
                        this.logger.zsymb(0, 9431, 30002, "handleMuteChange", t, i, this.typeFilter, s), i && this.typeFilter === ut.d.UNREAD && this.addConvToUnreadFilterV2(t)
                    }, this.deleteConversation = function (e, t) {
                        void 0 === t && (t = !0), e != v.CONV_FILTER.STRANGER && (a.logger.zsymb(18, 9431, 30006, `[user call del conv] ${e}`), rt.a.deleteConversation(e, t).then((e => {
                            e && e.delConversationId && Object(Ee.f)({
                                type: qe.ConversationListActions.TAG_CONV,
                                payload: {
                                    data: [{
                                        userId: e.delConversationId,
                                        label: null
                                    }]
                                }
                            })
                        })).catch((e => {
                            a.logger.zsymb(18, 9431, 30007, "Delete conversation fail - " + JSON.stringify(e))
                        })))
                    }, this.name = ut.a, this.data = new Map, this.key = "windowId", this.typeFilter = ut.d.ALL, this.labelFilters = [], this.listRawAll = new Set, this.listVisible = [], this.listStrangers = [], this.listHiddens = [], this.listFiltered = [], this.newestStrangerId = "", this.menuRef = {}, this.showedOnboarding = !1, this.loaded = !1, this.getRecentContactWithId = this.getRecentContactWithId.bind(this), this.selectConversation = this.selectConversation.bind(this), this.showBroadCastMsgModal = this.showBroadCastMsgModal.bind(this), this.markAsRead = this.markAsRead.bind(this), this.addListener()
                }
                get logger() {
                    return this._logger || (this._logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.conversation, [jt.b.convList])), this._logger
                }
                get previewManager() {
                    return this._pm || (this._pm = l.ModuleContainer.resolve(lt.g)), this._pm
                }
                get sidebarController() {
                    return this._sbc || (this._sbc = l.ModuleContainer.resolve(ut.l)), this._sbc
                }
                get currUser() {
                    return Object(wt.c)()
                }
                onTypeFilterChange(e, t) {
                    if (e === ut.d.UNREAD) {
                        if (0 !== this.labelFilters.length) {
                            const e = this.labelFilters.length > 1 ? 1453215 : 1453214;
                            gt.e.logAction(e)
                        }
                        setTimeout((() => {
                            this.scrollToTop(!1)
                        }))
                    }
                    this.applyTypeFilter(e, t)
                }
                onLabelFilterChange(e) {
                    this.typeFilter === ut.d.UNREAD && setTimeout((() => {
                        this.scrollToTop(!1)
                    })), this.applyLabelFilter(e)
                }
                rerenderList() {
                    this.signalRenderList()
                }
                async onPreviewChange(e, t) {
                    if (!e || !t) return;
                    const s = e.convId;
                    if (this.listRawAll.add(s), vt.a.isThreadHidden(s)) return void this.listHiddens.push(s);
                    let i = s,
                        n = !1,
                        a = !1,
                        r = !1;
                    if (await pt.a.isOATypeAsync(s)) {
                        const e = this.convDataManager.getConvByIdSync(s);
                        if (!e || !pt.a.popoutOA(e)) return
                    } else if (pt.a.isStrangerV2(s) && (n = !0, this.listStrangers.includes(s) || (this.logger.zsymb(0, 9431, 30001, `first new stranger msg ${s}`), this.listStrangers.push(s)), !this.isMeBAAccount())) {
                        const t = "0" == e.fromUid || this.convDataManager.isRespondedByMeSync(s),
                            n = this.listVisible.includes(s);
                        t || (n && (r = !0, this.listVisible = this.listVisible.filter((e => e !== s))), this.updateNewestStrangerId(this.listStrangers), i = v.CONV_FILTER.STRANGER), t && !n && (a = !0, this.listVisible.unshift(s), this.newestStrangerId === s && this.updateNewestStrangerId(this.listStrangers))
                    }
                    const [o, l] = pt.a.insertToProperPosition(this.listVisible, i, this.getAlterId());
                    this.listVisible = o;
                    const d = It.b.getLabelObjByConversaionId(s),
                        c = d && d.id && this.labelFilters.includes("" + d.id),
                        h = n && this.labelFilters.includes(ot.h),
                        u = c || h,
                        g = l || a || r;
                    if (this.typeFilter === ut.d.ALL) this.addTabAllFiltered(s, u, g);
                    else if (this.typeFilter === ut.d.UNREAD) this.addTabUnreadFiltered(s, u, n);
                    else if (this.typeFilter === ut.d.STRANGER) {
                        const e = c || !this.labelFilters.length,
                            t = n && e;
                        this.addTabStrangerFiltered(s, t)
                    }
                }
                addTabAllFiltered(e, t, s) {
                    if (t) {
                        const [t, s] = pt.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                        s && (this.listFiltered = t, this.signalRenderList())
                    } else s && this.signalRenderList()
                }
                addTabUnreadFiltered(e, t, s) {
                    if (this.listFiltered.includes(e) || !At.b.isMyMessage(this.previewManager.getPreviewByIDSync(e)))
                        if (t) this.addConvToUnreadFilterV2(e);
                        else {
                            if (this.labelFilters.length) return;
                            this.isMeBAAccount() || !s ? this.addConvToUnreadFilterV2(e) : this.addConvToUnreadFilterV2(v.CONV_FILTER.STRANGER)
                        }
                }
                addTabStrangerFiltered(e, t) {
                    if (!t) return;
                    const [s, i] = pt.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                    i && (this.listFiltered = s, this.signalRenderList())
                }
                addConvToUnreadFilterV2(e) {
                    if (this.muteDataManager.isMuted(e) && !pt.a.getPinFromConvId(e)) this.listFiltered = this.safeSortConvList(this.listFiltered, !0), this.signalRenderList();
                    else {
                        const [t, s] = pt.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                        s && (this.listFiltered = t, this.signalRenderList())
                    }
                }
                onPinChange(e) {
                    let t = !1;
                    for (let s = 0; s < e.length; s++) {
                        const i = e[s].priority,
                            n = e[s].id;
                        i ? (this.onPreviewChange({
                            convId: n
                        }, []), t = !1) : (t = !0, (!this.previewManager.getPreviewByIDSync(n) || !this.convDataManager.isRespondedByMeSync(n) && pt.a.isStrangerV2(n)) && (this.listVisible = this.listVisible.filter((e => e !== n))))
                    }
                    t && (this.listVisible = this.safeSortConvList(this.listVisible, !1), (this.typeFilter !== ut.d.ALL || this.labelFilters.length) && (this.listFiltered = pt.a.sortConvId(this.listFiltered, this.typeFilter === ut.d.UNREAD, !0))), this.signalRenderList()
                }
                onHiddenChat(e, t) {
                    const s = this.convDataManager.getConvByIdSync(e);
                    if (this.logger.zsymb(0, 9431, 30003, "onHiddenChat ", e, t, !!s), t) this.listHiddens.push(e), this.listVisible = this.listVisible.filter((t => t !== e)), this.listFiltered = this.listFiltered.filter((t => t !== e)), this.signalRenderList();
                    else {
                        if (!s && !it.a.PinDataManager.isPinned(e)) return;
                        this.listHiddens = this.listHiddens.filter((t => t !== e));
                        const [t, i] = pt.a.insertToProperPosition(this.listVisible, e, this.getAlterId());
                        if (this.listVisible = t, this.listFiltered) {
                            const [t, s] = pt.a.insertToProperPosition(this.listFiltered, e, this.getAlterId());
                            this.listFiltered = t
                        }
                    }
                    this.signalRenderList()
                }
                getCurrentFilter() {
                    return {
                        type: this.typeFilter,
                        labels: this.labelFilters
                    }
                }
                getRecentContacts() {
                    const e = [];
                    return this.listRawAll.forEach((t => {
                        const s = this.convDataManager.getConvByIdSync(t);
                        s && e.push(s)
                    })), e
                }
                getRecentContactWithId(e) {
                    if (this.listRawAll.has(e)) {
                        return this.convDataManager.getConvByIdSync(e) || null
                    }
                    return null
                }
                addConvToLabel(e, t) {
                    let s = It.b.getItem(t);
                    yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.MANAGE_LABEL,
                        params: {
                            view: Ct.b.ADD_CONVERSATION,
                            info: s
                        }
                    }), e && (e.preventDefault(), e.stopPropagation()), gt.e.logAction(14521)
                }
                selectConversation(e) {
                    if (St.b.startPerf(St.a), e.userId === v.CONV_FILTER.MEDIA) return void this.logger.zsymb(18, 9431, 30004, "No handler for mediabox. This feat disable!!!");
                    if (e.userId === v.CONV_FILTER.STRANGER) return void(2 == Number(de.default.getConvUXVersion()) ? this.applyTypeFilter(ut.d.STRANGER) : this.labelDataManager.onSelectLabel(ot.h));
                    const t = this.sidebarController.getState(bt.c).selectedId;
                    e.userId === t && e.userId !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER ? Object(Ee.f)({
                        type: qe.ConversationListActions.SELECT_CONV_MINOR,
                        payload: e
                    }) : (this.convUIListContainer && this.convUIListContainer.focus(), e.userId === He.default.sendToMeId && (_t.g.getFlagForCurrentUser(this.currUser.userId, Nt) || (Et.q.getHasShownSendToMeTip() ? _t.g.setFlagForCurrentUser(this.currUser.userId, Nt, 1) : setTimeout((() => {
                        We.default.send(qe.ConversationListActions.SHOW_BUBBLE_DOT), Et.q.setHasShownSendToMeTip(!0)
                    }), 144e5)), Lt.b.getCurrentStepKey() !== Lt.a.UPLOAD_IMAGES || this.showedOnboarding || (Lt.b.show(), this.showedOnboarding = !0), gt.e.logAction(13901)), e.userId === v.FAKE_CONVERSATION_ID.FRIEND_CENTER ? Object(Ee.f)({
                        type: qe.SideBarActions.SELECT_FRIEND_CENTER,
                        payload: Object(i.a)({}, e)
                    }) : l.ModuleContainer.resolve(Rt.b).openConversation(e.userId, Rt.c.fromConvItem(e))), this.logActionSelectConv()
                }
                showBroadCastMsgModal() {
                    var e;
                    if (!de.default.checkBroadcastTime()) return void Mt.a.createError(Tt.default.str("STR_BROADCAST_OVER_LIMIT_TIP"));
                    let t = !0;
                    1 === this.labelFilters.length && (t = It.b.getItem(this.labelFilters[0]) || !0), null !== (e = He.default.broadcast_resend_config) && void 0 !== e && e.enable ? yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.BROADCAST_RESEND,
                        params: t
                    }) : yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.BROADCAST_COMPSE,
                        params: {
                            label: t
                        }
                    }), gt.e.logAction(1453102)
                }
                markAsRead(e, t) {
                    void 0 === t && (t = null), e && (e.preventDefault(), e.stopPropagation()), gt.e.logAction(164), de.default.isShowMarkAsReadAgain() ? Ft.a.openConfirm({
                        windowId: bt.c,
                        name: v.MODAL_CONFIRM.confirmIdentities,
                        params: {
                            message: Tt.default.str("STR_MARK_READ_CONFIRM_TEXT"),
                            okText: Tt.default.str("STR_CONFIRM"),
                            okType: "primary",
                            cancelText: Tt.default.str("STR_LOGOUT_NO"),
                            onOk: e => {
                                de.default.setShowMarkAsReadAgain(!(e && e.dont_show_mark_as_read)), this.markConvsAsRead(t)
                            },
                            options: [{
                                default_val: !1,
                                key: "dont_show_mark_as_read",
                                title: "STR_DONT_SHOW_AGAIN"
                            }]
                        }
                    }) : this.markConvsAsRead(t)
                }
                scrollToTop(e) {
                    const t = Ot.b.instance().getConvList();
                    t && t.scrollToTop(e)
                }
                scrollToConv(e) {
                    const t = Ot.b.instance().getConvList();
                    t && t.scrollToConversation(e)
                }
                openInNewWindow(e, t) {
                    if (!e || !e.userId) return;
                    const s = this.menuRef[ot.b];
                    s && s.openInNewWindow && (s.updateTargetInfo(e), s.openInNewWindow(t))
                }
                getStrangerInfo() {
                    let e = "";
                    if (this.newestStrangerId) {
                        const t = this.previewManager.getPreviewByIDSync(this.newestStrangerId);
                        e = t ? t.messageTime : ""
                    }
                    return this.logger.zsymb(0, 9431, 30005, "getStrangerInfo ", this.newestStrangerId, e), {
                        messageTime: e
                    }
                }
                getTopMostConv() {
                    return this.typeFilter !== ut.d.ALL || this.labelFilters.length ? this.listFiltered[0] : this.listVisible[0]
                }
                addListener() {
                    setTimeout((() => {
                        this.labelDataManager.addEventListener(mt.d.SelectedLabelChange, (e => {
                            this.onLabelFilterChange(e.payload)
                        })), this.labelDataManager.addEventListener(mt.d.LabelAddConvs, (e => {
                            this.onLabelChangeConvs(e.payload.labelId, e.payload.convIds, "add")
                        })), this.labelDataManager.addEventListener(mt.d.LabelRemoveConvs, (e => {
                            this.onLabelChangeConvs(e.payload.labelId, e.payload.convIds, "remove")
                        }));
                        const e = l.ModuleContainer.resolve(lt.g);
                        e.addEventListener(ft.b.DoneLoadPreview, (e => {
                            this.onLoadPreview(e.payload)
                        })), e.addEventListener(ft.b.DoneMigratePreview, (() => {
                            this.onMigratedPreview()
                        })), e.addEventListener(ft.b.PreviewChanged, (e => {
                            const {
                                changedItem: t,
                                all: s
                            } = e.payload;
                            this.onPreviewChange(t, s)
                        })), e.addEventListener(ft.b.DraftChanged, (e => {})), this.convDataManager.addEventListener(ft.b.DeleteConv, (e => {
                            this.moveConvOutConvList(e.convId)
                        })), this.convDataManager.addEventListener(ft.b.EmptyConv, (e => {
                            this.moveConvOutConvList(e.convId)
                        })), this.convDataManager.addEventListener(ft.b.LeaveGroup, (e => {
                            this.moveConvOutConvList(e.convId)
                        })), this.pinDataManager.addEventListener(ft.b.ChangePinConv, (e => {
                            this.onPinChange(e.payload)
                        })), this.muteDataManager.addEventListener(ft.b.MuteChanged, this.handleMuteChange), tt.default.subscribeEventFriend(v.EventFriend.ADD_FRIEND, (e => {
                            let {
                                userId: t
                            } = e, s = 0;
                            this.listStrangers.includes(t) && (s++, this.listStrangers = this.listStrangers.filter((e => e !== t)), t == this.newestStrangerId && (s++, this.updateNewestStrangerId(this.listStrangers))), this.logger.zsymb(0, 9431, 30008, `on add friend ${t} ${s}`)
                        })), tt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, (e => {
                            let {
                                userId: t
                            } = e, s = 0;
                            this.listVisible.some((e => e === t)) && (s++, this.listStrangers.push(t)), this.logger.zsymb(0, 9431, 30009, `on remove friend ${t} ${s}`)
                        })), tt.default.subscribeEventFriend(v.EventFriend.DOWNGRADE_BIZ_PROFILE, (() => {
                            this.handleUserPackageChange()
                        })), tt.default.subscribeEventFriend(v.EventFriend.UPGRADE_BIZ_PROFILE, (() => {
                            this.handleUserPackageChange()
                        }))
                    }), 0)
                }
                addToListFiltered(e, t) {
                    void 0 === t && (t = !1), e.forEach((e => {
                        if (t) {
                            const t = this.unreadDataManager.getUnreadByConvIdSync(e);
                            if (!t || !t.smsUnreadCount && !t.unreadMark) return
                        }
                        const [s] = pt.a.insertToProperPosition(this.listFiltered, e);
                        this.listFiltered = s
                    }))
                }
                applyTypeFilter(e, t) {
                    if (void 0 === t && (t = !1), this.typeFilter === e && !t) return;
                    this.logger.zsymb(0, 9431, 30010, "applyTypeFilter ", e, t);
                    const s = this.typeFilter;
                    switch (this.typeFilter = e, e) {
                        case ut.d.ALL:
                            if (0 !== this.labelFilters.length) {
                                if (this.listFiltered = pt.a.filterByLabel(this.listVisible, this.labelFilters), this.labelFilters.includes(ot.h)) {
                                    let e = this.listStrangers;
                                    this.showStrangerNROnly() && (e = pt.a.filterByResponsed(e, !1)), this.addToListFiltered(e)
                                } else this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters);
                                this.addLikeConvToFilterListV2(this.listFiltered, this.labelFilters)
                            }
                            break;
                        case ut.d.UNREAD:
                            if (0 !== this.labelFilters.length) {
                                const e = s == ut.d.ALL ? this.listFiltered : this.listVisible;
                                this.listFiltered = pt.a.filterByLabel(e, this.labelFilters), this.labelFilters.includes(ot.h) ? this.addToListFiltered(this.listStrangers) : this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters), this.listFiltered = pt.a.filterByUnread(this.listFiltered), this.listFiltered = pt.a.sortConvId(this.listFiltered, !0, !0)
                            } else this.listFiltered = pt.a.filterByUnread(this.listVisible), this.listFiltered = this.safeSortConvList(this.listFiltered);
                            break;
                        case ut.d.STRANGER:
                            this.listFiltered = pt.a.filterByLabel(this.listStrangers, this.labelFilters), this.listFiltered = pt.a.sortConvId(this.listFiltered, !1, !0), this.showStrangerNROnly() && (this.listFiltered = pt.a.filterByResponsed(this.listFiltered, !1))
                    }
                    this.signalRenderState(), this.signalRenderList()
                }
                applyLabelFilter(e) {
                    if (this.labelFilters !== e) {
                        switch (this.logger.zsymb(0, 9431, 30011, "applyLabelFilter ", e.join("-")), this.labelFilters = e.map((e => "" + e)), this.typeFilter) {
                            case ut.d.ALL:
                                if (this.listFiltered = pt.a.filterByLabel(this.listVisible, this.labelFilters), this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters), this.addLikeConvToFilterListV2(this.listFiltered, e), this.labelFilters.some((e => e == ot.h))) {
                                    let e = this.listStrangers;
                                    this.showStrangerNROnly() && (e = pt.a.filterByResponsed(e, !1)), this.addToListFiltered(e)
                                }
                                break;
                            case ut.d.UNREAD:
                                if (this.listFiltered = pt.a.filterByLabel(this.listVisible, e), this.doAddStrangerHasLabel(this.listFiltered, this.labelFilters), this.labelFilters.some((e => e == ot.h))) {
                                    let e = this.listStrangers;
                                    this.showStrangerNROnly() && (e = pt.a.filterByResponsed(e, !1)), this.addToListFiltered(e)
                                }
                                this.listFiltered = pt.a.filterByUnread(this.listFiltered), this.listFiltered = this.safeSortConvList(this.listFiltered);
                                break;
                            case ut.d.STRANGER:
                                this.listFiltered = pt.a.filterByLabel(this.listStrangers, this.labelFilters), this.listFiltered = pt.a.sortConvId(this.listFiltered, !1, !0), this.showStrangerNROnly() && (this.listFiltered = pt.a.filterByResponsed(this.listFiltered, !1))
                        }
                        this.signalRenderState(), this.signalRenderList()
                    }
                }
                showStrangerNROnly() {
                    return !this.isMeBAAccount()
                }
                isMeBAAccount() {
                    const e = tt.default.isMeBAAccount();
                    return this.logger.zsymb(0, 9431, 30012, "isMeBAAccount ", e), e
                }
                doAddStrangerHasLabel(e, t) {
                    if (t.length) {
                        const s = pt.a.filterByLabel(this.listStrangers, t);
                        if (s.length) {
                            const t = new Set(s);
                            for (let s = 0; s < e.length; s++) t.has(e[s]) && t.delete(e[s]);
                            this.addToListFiltered(t)
                        }
                    }
                    return e
                }
                isConvExists(e) {
                    const t = this.convDataManager.getConvByIdSync(e);
                    return !!(null != t && t.firstSmsLocalId || null != t && t.lastSmsLocalId)
                }
                safeSortConvList(e, t) {
                    void 0 === t && (t = !0);
                    const s = e.indexOf(v.CONV_FILTER.STRANGER);
                    if (-1 !== s) {
                        e[s] = this.newestStrangerId;
                        const i = (e = pt.a.sortConvId(e, t, !0)).indexOf(this.newestStrangerId);
                        e[i] = v.CONV_FILTER.STRANGER
                    } else e = pt.a.sortConvId(e, t, !0);
                    return e
                }
                isValidFakeConv(e, t, s) {
                    if (e.some((e => e == s)) || vt.a.isThreadHidden(s)) return !1;
                    const i = It.b.getLabelObjByConversaionId(s);
                    return !(!i || !t.some((e => e == i.id)))
                }
                isValidFakeConvV2(e, t) {
                    if (!t || e.some((e => e == t)) || vt.a.isThreadHidden(t)) return !1;
                    return !(t && t.startsWith(v.GROUPID_PREFIX)) || !!Dt.default.getGroupByIdSync(t)
                }
                addLikeConvToFilterListV2(e, t) {
                    if (t.length && this.typeFilter !== ut.d.UNREAD) {
                        this.logger.zsymb(0, 9431, 30013, "addLikeConvToFilterListV2 ", t);
                        for (const s of t) {
                            const t = this.labelDataManager.getLabelById(s);
                            if (t && t.conversations)
                                for (const s of t.conversations) this.isValidFakeConvV2(e, s) && this.listFiltered.push(s)
                        }
                    }
                }
                markConvsAsRead(e) {
                    const t = [],
                        s = 0 === this.labelFilters.length;
                    this.logger.zsymb(0, 9431, 30014, `markConvsAsRead #1  ${null==e?void 0:e.join("-")}`), this.listRawAll.forEach((i => {
                        const n = this.unreadDataManager.getUnreadByConvIdSync(i);
                        if (n && (n.smsUnreadCount > 0 || n.unreadMark)) {
                            if (this.logger.zsymb(0, 9431, 30015, `markConvsAsRead #2, ${i}, ${n.smsUnreadCount}`), e && !e.hasOwnProperty(i) || i === v.FAKE_CONVERSATION_ID.FRIEND_CENTER) return;
                            const a = It.b.getLabelObjByConversaionId(i) || {},
                                r = this.convDataManager.getConvByIdSync(i) || {
                                    userId: i
                                };
                            (s || this.labelFilters.some((e => e == a.id)) || pt.a.isInStrangerBoxV2(i) && this.typeFilter === ut.d.STRANGER) && t.push(r)
                        }
                    })), this.logger.zsymb(0, 9431, 30016, `markConvsAsRead #3 ${t.length} ${t.map((e=>e.userId)).join("-")}`), t.length > 0 && (We.default.send(qe.SideBarActions.MARK_AS_READ, {
                        conversations: t
                    }), gt.e.logAction(1453304))
                }
                onLoadPreview(e) {
                    this.logger.zsymb(0, 9431, 30017, `onload Preview 1: ${this.listRawAll.size}`);
                    let t = e.map((e => e.convId));
                    this.listRawAll.size && this.listRawAll.forEach((e => {
                        t.some((t => t === e)) || t.push(e)
                    })), this.listRawAll = new Set(t);
                    const s = He.default.sendToMeId;
                    this.listRawAll.has(s) || (t.push(s), this.listRawAll.add(s)), this.logger.zsymb(0, 9431, 30018, `onload Preview 2: ${t.length}`), pt.a.groupConversaion(t).then((e => {
                        if (this.logger.zsymb(0, 9431, 30019, `grouped list #1: \n\t\t\t\t${e.hidden.length}\n\t\t\t\t- ${e.stranger.length}\n\t\t\t\t- ${e.outdate.length}\n\t\t\t\t- ${e.visible.length}\n\t\t\t`), He.default.stagingAccount)
                            for (const i in e) this.logger.zsymb(0, 9431, 30020, `${i}: ${e[i]}`);
                        this.listStrangers = e.stranger, this.listHiddens = e.hidden;
                        const t = this.addStrangersToVisible(e.visible, this.listStrangers);
                        let s = t;
                        if (this.listVisible.length) {
                            this.logger.zsymb(0, 9431, 30021, `preview changed while group csc #1: ${this.listVisible}`), s = this.listVisible;
                            const e = new Set(this.listVisible);
                            t.forEach((t => {
                                e.has(t) || s.push(t)
                            }))
                        }
                        this.listVisible = this.safeSortConvList(s, !1), this.initMyCloud(), this.logger.zsymb(0, 9431, 30022, `visible sorted #1: ${this.listVisible}`), this.loaded = !0, this.signalRenderList(), this.signalRenderState(), this.dispatchEvent(new ft.a(ft.c.LoadPreviewDone, "", this.listVisible.slice()))
                    }))
                }
                onMigratedPreview() {
                    this.logger.zsymb(0, 9431, 30023, `onMigratedPreview #1: ${this.listVisible}`);
                    const e = He.default.sendToMeId;
                    this.listRawAll.has(e) || this.initMyCloud(), this.convDataManager.getConvByIdSync(e) && !this.listVisible.includes(e) && (this.logger.zsymb(0, 9431, 30024, "onMigratedPreview #2"), this.onPreviewChange({
                        convId: e
                    }, [])), this.loaded = !0, this.signalRenderList(), this.signalRenderState()
                }
                initMyCloud() {
                    const e = _t.g.getFlagForCurrentUser(null, "z_sendtome"),
                        t = He.default.sendToMeId,
                        s = !(He.default.isOffSendToMe || e && 1 !== e);
                    if (this.logger.zsymb(0, 9431, 30025, "initMyCloud", e, He.default.isOffSendToMe), this.listVisible.some((e => e === t))) {
                        const e = this.convDataManager.getConvByIdSync(t);
                        e && e.pinned ? gt.e.logAction(1390703) : (_t.g.setFlagForCurrentUser(null, "z_sendtome", Date.now()), gt.e.logAction(1390702))
                    } else if (s) {
                        const e = it.a.PinDataManager.getTotalPinnedConversation() >= He.default.limit_pin_messages,
                            s = He.default.auto_pin_send2me && !_t.g.getFlagForCurrentUser(null, "z_sendtome_pinned") && !e;
                        this.convDataManager.createEmptyConvForUser(t, s ? 1 : 0, v.CONV_OT_STATE.none, {}), s && (it.a.PinDataManager.pin([t]), _t.g.setFlagForCurrentUser(null, "z_sendtome_pinned", 1)), _t.g.setFlagForCurrentUser(null, "z_sendtome", Date.now()), this.onPreviewChange({
                            convId: t
                        }, [])
                    }
                }
                addStrangersToVisible(e, t) {
                    if (!t || !t.length) return e;
                    if (this.isMeBAAccount()) return e.concat(t); {
                        const s = pt.a.filterByResponsed(t, !1);
                        if (s.length) {
                            this.newestStrangerId = pt.a.getNewestConvFromIds(s);
                            e.includes(v.CONV_FILTER.STRANGER) || e.push(v.CONV_FILTER.STRANGER)
                        }
                        return t.forEach((t => {
                            this.convDataManager.isRespondedByMeSync(t) && e.push(t)
                        })), e
                    }
                }
                onLabelChangeConvs(e, t, s) {
                    if (this.logger.zsymb(0, 9431, 30026, "onLabelChangeConvs", t.length, e), t.length && this.labelFilters.includes(e))
                        if ("add" == s) {
                            const e = t.filter((e => !this.listFiltered.includes(e) && !this.listHiddens.includes(e)));
                            if (!e.length) return;
                            this.listFiltered = [...this.listFiltered, ...e], this.listFiltered = pt.a.sortConvId(this.listFiltered, this.typeFilter === ut.d.UNREAD, !1), this.signalRenderList()
                        } else {
                            let e = !1;
                            t.forEach((t => {
                                const s = It.b.getLabelObjByConversaionId(t),
                                    i = s ? s.id : null;
                                this.labelFilters.includes("" + i) || (this.listFiltered = this.listFiltered.filter((e => e !== t)), e = !0)
                            })), e && this.signalRenderList()
                        }
                }
                moveConvOutConvList(e) {
                    this.logger.zsymb(0, 9431, 30027, "moveConvOutConvList", e), this.listVisible = this.listVisible.filter((t => t !== e)), this.listFiltered = this.listFiltered.filter((t => t !== e)), this.listStrangers = this.listStrangers.filter((t => t !== e)), e !== this.newestStrangerId || this.isMeBAAccount() || this.updateNewestStrangerId(this.listStrangers), this.signalRenderList()
                }
                getAlterId() {
                    return new Map([
                        [v.CONV_FILTER.STRANGER, this.newestStrangerId]
                    ])
                }
                updateNewestStrangerId(e) {
                    if (this.isMeBAAccount()) return;
                    const t = pt.a.filterByResponsed(e, !1),
                        s = this.newestStrangerId;
                    if (this.newestStrangerId = pt.a.getNewestConvFromIds(t), this.newestStrangerId || (this.listVisible = this.listVisible.filter((e => e !== v.CONV_FILTER.STRANGER)), this.signalRenderList()), this.previewManager.updateStrangerBox(this.newestStrangerId), s !== this.newestStrangerId && this.newestStrangerId) {
                        const [e, t] = pt.a.insertToProperPosition(this.listVisible, v.CONV_FILTER.STRANGER, this.getAlterId());
                        this.listVisible = e, this.signalRenderList()
                    }
                }
                rebuildList() {
                    this.logger.zsymb(0, 9431, 30028, `rebuildList 1: ${this.listRawAll.size} ${this.listVisible.length} ${this.listStrangers.length}`), this.listStrangers = [], this.listVisible = [], this.listHiddens = [], this.listFiltered = [], this.newestStrangerId = "";
                    const e = Array.from(this.listRawAll),
                        t = pt.a.groupConversaionSync(e);
                    if (this.logger.zsymb(0, 9431, 30029, `grouped list #2: \n\t\t\t${t.hidden.length}\n\t\t\t- ${t.stranger.length}\n\t\t\t- ${t.outdate.length}\n\t\t\t- ${t.visible.length}\n\t\t`), He.default.stagingAccount)
                        for (const n in t) this.logger.zsymb(0, 9431, 30030, `${n}:, ${t[n]}`);
                    this.listStrangers = t.stranger, this.listHiddens = t.hidden;
                    const s = this.addStrangersToVisible(t.visible, this.listStrangers),
                        i = this.safeSortConvList(s, !1);
                    this.listVisible = i, this.logger.zsymb(0, 9431, 30031, `visible sorted #2: ${this.listVisible}`), this.labelFilters.length && this.applyLabelFilter(this.labelFilters), this.typeFilter !== ut.d.ALL && this.applyTypeFilter(this.typeFilter), this.signalRenderList(), this.signalRenderState()
                }
                handleUserPackageChange() {
                    this.logger.zsymb(0, 9431, 30032, `handleUserPackageChange: ${tt.default.isMeBAAccount()}}`), this.rebuildList()
                }
                signalRenderList(e) {
                    void 0 === e && (e = "all"), Object(je.h)(this.name, e)
                }
                signalRenderState() {
                    Object(je.g)(this.name, bt.c)
                }
                logActionSelectConv() {
                    const e = this.labelFilters.length > 0;
                    if (this.typeFilter === ut.d.UNREAD ? (gt.e.logAction(1453103), e || gt.e.logAction(1453107)) : this.typeFilter === ut.d.ALL && (gt.e.logAction(1453104), e && gt.e.logAction(1453108)), e) gt.e.logAction(1453106);
                    else {
                        gt.e.logAction(1453105);
                        for (let e = 0; e < this.labelFilters.length; e++) {
                            if (parseInt(this.labelFilters[e]) > 0) {
                                gt.e.logAction(1453109);
                                break
                            }
                        }
                    }
                }
                init() {}
                getItem(e) {
                    return e.key === bt.c ? {
                        labelFilters: this.labelFilters,
                        typeFilter: this.typeFilter,
                        loaded: this.loaded
                    } : Pt
                }
                getList(e) {
                    return e.key === bt.c || this.typeFilter == ut.d.ALL && 0 === this.labelFilters.length ? this.listVisible : this.listFiltered
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                bindUIMenu(e, t) {
                    this.menuRef[e] = t
                }
                cleanUpUIMenu(e) {
                    this.menuRef[e] = null
                }
                showMenu(e, t, s) {
                    if (this.menuRef[e] && e === ot.b) this.showConvActionMenu(t, s)
                }
                hideMenu(e) {
                    this.menuRef[e]
                }
                showConvActionMenu(e, t) {
                    if (t && t.friendItem) return;
                    if (t.userId === v.CONV_FILTER.STRANGER || t.userId === v.CONV_FILTER.MEDIA) return;
                    const s = Object(i.a)({}, t),
                        n = s.userId;
                    if (s && !$e.default.isFakeId(n)) {
                        const e = this.previewManager.getPreviewByIDSync(n),
                            t = tt.default.getProfileFriendByIdSync(n) || {},
                            i = this.unreadDataManager.getUnreadByConvIdSync(n);
                        s.lastMessage = null == e ? void 0 : e.message, s.isFr = t.isFr, s.unreadMark = null == i ? void 0 : i.unreadMark, s.smsUnreadCount = null == i ? void 0 : i.smsUnreadCount
                    }
                    this.menuRef[ot.b].updateTargetInfo(s), this.menuRef[ot.b].showAction(Object(i.a)({}, e))
                }
                bindUIContainer(e) {
                    this.convUIListContainer = e
                }
                cleanUpUIContainer() {
                    this.convUIListContainer = null
                }
            }) || ct) || ct) || ct) || ct) || ct) || ct) || ct);
            var Bt, Ut = s("AtyM"),
                kt = s("R5gT"),
                Gt = s("Xzw3"),
                zt = s("d+hT"),
                xt = s("uEOi"),
                Vt = s("rQsU"),
                $t = s("kTC5"),
                Wt = s("4wTQ"),
                qt = s("ES/k");
            const Kt = {
                    isFocusSearchBox: !1,
                    isFocusOnRecentSearch: !1,
                    searchText: "",
                    searchResult: {},
                    searching: !1,
                    conversation: null,
                    highlightId: "",
                    filter: {
                        timeFrom: 0,
                        timeTo: Date.now()
                    }
                },
                Ht = new $e.LocalId;
            var Zt;
            ! function (e) {
                e[e.STEP_CONTACT = 0] = "STEP_CONTACT", e[e.STEP_MESSAGES = 1] = "STEP_MESSAGES", e[e.STEP_FILES = 2] = "STEP_FILES", e[e.STEP_DIRECTORY = 3] = "STEP_DIRECTORY"
            }(Zt || (Zt = {}));
            Object(ht.b)(ut.j)(Bt = function (e, t) {
                return l.ModuleContainer.inject(Vt.b)(e, void 0, 0)
            }(Bt = function (e, t) {
                return l.ModuleContainer.inject(lt.a)(e, void 0, 1)
            }(Bt = function (e, t) {
                return l.ModuleContainer.inject(lt.g)(e, void 0, 2)
            }(Bt = Reflect.metadata("design:type", Function)(Bt = Reflect.metadata("design:paramtypes", [void 0 === Vt.b ? Object : Vt.b, void 0 === lt.a ? Object : lt.a, void 0 === lt.g ? Object : lt.g])(Bt = class {
                constructor(e, t, s) {
                    this.convListController = e, this.convDataManager = t, this.previewDataManager = s, this.state = void 0, this.pageLoad = void 0, this.curQuery = void 0, this.cacheResSearch = void 0, this.countQuery = void 0, this.countTimeUseGlobalSearch = void 0, this.countSelectTopRes = void 0, this.cacheSearch = void 0, this.trackSearch = void 0, this.trackSearchVietnamese = void 0, this.lastTextSearch = void 0, this.lastTextSearchTs = void 0, this.isShowRecentSearch = void 0, this.isFirstLoadSuccess = void 0, this.searchDelay = void 0, this.closeBySendingMsg = void 0, this.clearAdminMode = void 0, this.timeouResetDataMsg = void 0, this.searchResultList = void 0, this.recentSearchList = void 0, this.searchInput = void 0, this.loadingMore = void 0, this.loadingMoreFiles = void 0, this.oldestTime = void 0, this.functionSearchByName = void 0, this.timeoutLog = void 0, this._sbc = null, this._removeSearchResult = (e, t) => {
                        const s = this.getSearchState();
                        if (s && !s.conversation && s.searchResult)
                            if (t) {
                                if (!s.searchResult.groups) return;
                                const t = [...s.searchResult.groups];
                                for (let n = 0; n < t.length; n++)
                                    if (t[n].userId == e) {
                                        t.splice(n, 1), this.updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                                            searchResult: Object(i.a)(Object(i.a)({}, s.searchResult), {}, {
                                                groups: t
                                            })
                                        }));
                                        break
                                    }
                            } else {
                                if (!s.searchResult.friends) return;
                                const t = [...s.searchResult.friends];
                                for (let n = 0; n < t.length; n++)
                                    if (t[n].userId == e) {
                                        t.splice(n, 1), this.updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                                            searchResult: Object(i.a)(Object(i.a)({}, s.searchResult), {}, {
                                                friends: t
                                            })
                                        }));
                                        break
                                    }
                            }
                    }, this.name = ut.h, this.key = "windowId", this.state = Kt, this.pageLoad = 0, this.curQuery = "", this.countQuery = 0, this.countTimeUseGlobalSearch = 0, this.countSelectTopRes = 0, this.cacheSearch = {
                        items: [],
                        keywords: null
                    }, this.trackSearch = !1, this.trackSearchVietnamese = !1, this.lastTextSearch = "", this.lastTextSearchTs = 0, this.isShowRecentSearch = !1, this.searchDelay = this._getSearchDelaySetting(), this.closeBySendingMsg = !1, this.loadingMore = !1, this.loadingMoreFiles = !1, this.oldestTime = 0, this.timeoutLog = null, this.isFirstLoadSuccess = !1, this._innerSearchFunc = this._innerSearchFunc.bind(this), this.functionSearchByName = $e.default.throttle(this._innerSearchFunc, this.searchDelay), this.onKeywordChange = this.onKeywordChange.bind(this), this.loadMessagesV2 = this.loadMessagesV2.bind(this), this.loadMoreFiles = this.loadMoreFiles.bind(this), this.onKeyPressInput = this.onKeyPressInput.bind(this), this.onFocusInput = this.onFocusInput.bind(this), this.onBlurInput = this.onBlurInput.bind(this), this.onclickCloseSearchButton = this.onclickCloseSearchButton.bind(this), this.onClickClearSearch = this.onClickClearSearch.bind(this), this.onSearchKeyword = this.onSearchKeyword.bind(this), this.setRecentSearchFocusState = this.setRecentSearchFocusState.bind(this), this.focusSearchBox = this.focusSearchBox.bind(this), this.selectResult = this.selectResult.bind(this), this.onFileSelect = this.onFileSelect.bind(this), this.selectTopRes = this.selectTopRes.bind(this), this.listenEvents()
                }
                get sidebarController() {
                    return this._sbc || (this._sbc = l.ModuleContainer.resolve(ut.l)), this._sbc
                }
                listenEvents() {
                    We.default.subscribe(((e, t) => {
                        switch (e) {
                            case qe.SideBarActions.FOCUS_SEARCH_INPUT:
                                this.focusSearchBox();
                                break;
                            case qe.FetchActions.FRIENDS_REMOVED:
                                this._removeSearchResult(t, !1);
                                break;
                            case qe.FetchActions.GROUP_LEAVE:
                                this._removeSearchResult(t, !0);
                                break;
                            case qe.SideBarActions.SEARCH_FILE_DONE:
                                this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                    searching: !1
                                }));
                                break;
                            case qe.SideBarActions.CLEAR_SEARCH:
                                this.clearSearch();
                                break;
                            case qe.ConversationListActions.SELECT_CONVERSATION:
                                setTimeout((() => {
                                    this.state.highlightId !== t.userId && this.setRecentSearchFocusState(!1, !1, !0), t.callPoint !== Rt.a.JumpMessage && this.updateStateOf("highlightId", null == t ? void 0 : t.userId)
                                }), 0)
                        }
                    }))
                }
                logSearch(e) {
                    Et.q.getDebugSearch().showLogSearchFlow
                }
                updateState(e, t) {
                    void 0 === t && (t = !0), this.state = e, t && Object(je.g)(this.name, bt.c)
                }
                isTextKey(e) {
                    return e.match(/^[a-zA-Z0-9!@#$%^&*)(+=._-|\\\[\]{}~`"\';:?/<>,-\s\n]$/)
                }
                isMultipleKeyPressed(e) {
                    return e.ctrlKey || e.metaKey || e.altKey
                }
                isKeywordStale(e) {
                    return qt.a.formatTextSearch(e) !== qt.a.formatTextSearch(this.state.searchText)
                }
                bindUIList(e, t) {
                    this._updateListRef(e, t)
                }
                cleanUpUIList(e) {
                    this._updateListRef(e, null)
                }
                bindUISearchInput(e) {
                    this.searchInput = e
                }
                cleanUpUISearchInput() {
                    this.searchInput = null
                }
                _updateListRef(e, t) {
                    switch (e) {
                        case $t.c.SEARCH_RESULT:
                            this.searchResultList = t;
                            break;
                        case $t.c.RECENT_SEARCH:
                            this.recentSearchList = t
                    }
                }
                resetState() {
                    this.searchInput.value = "", this.updateState(Object(i.a)({}, Kt))
                }
                updateStateOf(e, t) {
                    this.state.hasOwnProperty(e) && this.state[e] !== t && ("searchText" === e && (this.searchInput.value = t), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        [e]: t
                    })))
                }
                onKeyPressInput(e) {
                    if (this._isSelectAllSearchText() && this.searchResultList && this.isTextKey(e.key) && !this.isMultipleKeyPressed(e) && (this.searchResultList.openTabAll(), this.searchResultList.resetContactList()), e.which == v.K_BACK_SPACE ? this.state && this.state.searchText && "" !== this.state.searchText && gt.e.logAction(12307) : "" === this.state.searchText && !this.timeoutLog && this.isTextKey(e.key) && (this.timeoutLog = setTimeout((() => {
                            this.timeoutLog = null, gt.e.logAction(1232002)
                        }), 3e3)), e.which == v.K_ESC) !0 === this.isShowRecentSearch && (this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        isFocusOnRecentSearch: !1,
                        isFocusSearchBox: !1
                    })), this.searchInput && this.searchInput.blur(), this.onCloseSearch()), "" != this.searchInput.value ? this.clearSearch(!1) : this.clearSearch(!0);
                    else if (e.which == v.K_ENTER) {
                        let e = this.searchResultList || this.recentSearchList;
                        if (e && this.state.searchText) {
                            let t = e.selectFocusedConversation(!0);
                            setTimeout((() => {
                                this.state.conversation ? this.focusSearchBox() : vt.a.isThreadHidden(t) || We.default.send(qe.ChatBoxActions.FOCUS_INPUT, {
                                    userId: t,
                                    windowId: bt.c
                                })
                            }), 0)
                        }
                    } else if (e.which == v.K_UP || e.which == v.K_DOWN) {
                        this.searchResultList && gt.e.logAction(12317);
                        let t = this.searchResultList || this.recentSearchList;
                        t && (e.stopPropagation(), e.preventDefault(), e.which == v.K_UP ? t.moveUp() : t.moveDown())
                    }
                }
                onKeywordChange(e, t) {
                    let s = "";
                    if (s = !e && t ? t : e.target.value, s && (s = $e.default.ZSafeFunction((() => s.normalize()), s)), this.countTimeUseGlobalSearch || (this.countTimeUseGlobalSearch = Ut.a.now(), this.countSelectTopRes = 0), s) {
                        const e = qt.a.formatTextSearch(this.lastTextSearch),
                            t = qt.a.formatTextSearch(s);
                        $e.default.log("searching: true"), He.default.stagingAccount && this._checkOnAdminMode(s), this.trackSearch || (this.trackSearch = !0, gt.e.logAction(12318)), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchText: s
                        })), this.countQuery = Ht.next(), this.functionSearchByName(s, this.countQuery, e !== t)
                    } else this._resetCacheResultSearch(), kt.a.abortSearch(), this.clearSearch(!1)
                }
                onFocusInput() {
                    this.searchInput && "" !== this.searchInput.value && this.searchInput.select(), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        isFocusSearchBox: !0
                    })), gt.e.logAction(1232001)
                }
                onBlurInput() {
                    setTimeout((() => {
                        this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            isFocusSearchBox: !1
                        })), this.searchInput && "" == this.searchInput.value && this.qosLogSearch()
                    }), 20)
                }
                onclickCloseSearchButton(e) {
                    this.setRecentSearchFocusState(!1), this.onCloseSearch(), this._resetCacheResultSearch(), this.clearSearch(!this.state.conversation), gt.e.logAction(1232003), e && (e.stopPropagation(), e.preventDefault())
                }
                onClickClearSearch() {
                    Et.q.resetGlobalSearchMode(), this.state.conversation && gt.e.logAction(12314), this._resetCacheResultSearch(), this.clearSearch(!this.state.conversation), this.focusSearchBox(), gt.e.logAction(1232006)
                }
                onSearchKeyword(e) {
                    "string" == typeof e && this.searchInput && (this.searchInput.value = e, this.onKeywordChange(null, e), xt.a.addCacheKeyword(e))
                }
                onRemoveKeyword(e) {
                    "string" == typeof e && xt.a.removeCacheKeyword(e)
                }
                onFileSelect(e) {
                    null != e && e.msgId && (this.updateStateOf("highlightId", e.msgId), this.state.searchText && xt.a.addCacheKeyword(this.state.searchText))
                }
                setRecentSearchFocusState(e, t, s) {
                    if (void 0 === t && (t = !1), void 0 === s && (s = !1), !s) {
                        const t = this.sidebarController.getSelectedId();
                        if (this.state.isFocusOnRecentSearch === e || t && this.state.highlightId === t && !e) return
                    }
                    this.state.isFocusOnRecentSearch = e, e && (this.closeBySendingMsg = !1), Object(je.g)(this.name, bt.c)
                }
                onCloseSearch() {
                    var e, t;
                    gt.e.logAction(1232004), 0 == (null === (e = this.state.searchResult) || void 0 === e || null === (t = e.messages) || void 0 === t ? void 0 : t.length) && gt.e.logAction(1232202), this.qosLogSearch()
                }
                focusSearchBox(e) {
                    void 0 === e && (e = !1), this.searchInput && (this.searchInput.focus(), e && setTimeout((() => {
                        this.searchInput.select()
                    }), 0))
                }
                openRecentSearch() {
                    this.searchInput ? this.searchInput.focus() : this.setRecentSearchFocusState(!0)
                }
                loadMessagesV2(e, t, s) {
                    var n = this;
                    void 0 === t && (t = !1);
                    let a = this.state.searchResult,
                        r = "",
                        o = e;
                    if (!this.state.searchText) return;
                    r = this.state.searchText;
                    let l = this.state,
                        d = !1;
                    t || (l = Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                            messages: null
                        })
                    }), d = !0);
                    const c = () => this.state.filter.timeFrom != o.timeFrom || this.state.filter.timeTo != o.timeTo || !(!this.state.searchText || !this.isKeywordStale(r)),
                        h = !this.loadingMore && this.isFirstLoadSuccess && !!a && !!a.messages;
                    if (!t || h) {
                        this.logSearch(`[Search flow] load more msg: ${r}, ${this.pageLoad}`), this.updateState(Object(i.a)(Object(i.a)({}, l), {}, {
                            filter: {
                                timeFrom: e.timeFrom,
                                timeTo: e.timeTo
                            }
                        }), d), this.loadingMore = !0;
                        const a = [],
                            o = function (e, o) {
                                var l;
                                void 0 === o && (o = !1);
                                let d = [];
                                if (n.loadingMore = !1, n.logSearch(`[Search flow] load more msg res: ${r}, ${null===(l=e.arr)||void 0===l?void 0:l.length}`), c()) return n.pageLoad++, void(s && s(null, -1));
                                if (e && e.listConv && e.arr) {
                                    n.convListController.getRecentContacts().forEach((t => {
                                        let s = e.listConv.indexOf(t.userId);
                                        if (s >= 0 && !vt.a.isThreadHidden(t.userId))
                                            for (let i = s; i < e.listConv.length; ++i) e.listConv[i] == t.userId && (e.arr[i].conversation = t)
                                    })), e.arr.forEach((e => {
                                        Object.keys(e.conversation).length > 1 && d.push(e)
                                    })), Array.prototype.push.apply(a, d), o && t && a.length && n.pageLoad++, c() || !n.isFirstLoadSuccess && t || (n.state.searchResult.messages && (d = n.state.searchResult.messages.concat(d)), n.updateState(Object(i.a)(Object(i.a)({}, n.state), {}, {
                                        searchResult: Object(i.a)(Object(i.a)({}, n.state.searchResult), {}, {
                                            messages: d
                                        }),
                                        searching: !1
                                    })), s && o && s(a, n.pageLoad))
                                }
                            };
                        kt.a.searchGlobalMessagesV3(r, c, void 0, o, He.default.limit_result_msg_search + 1, e).then((e => o(e, !0))).catch((e => {
                            this.loadingMore = !1, this.logSearch(`[Search flow] load more msg err: ${r}, ${e}`), s && s(null, -1), $e.default.logCoreError("searchGlobalMsg v2 " + e)
                        }))
                    } else s && s(null, -1)
                }
                loadMoreMessages() {
                    this.state.searchResult
                }
                loadMoreFiles() {
                    let e = this.state.searchResult,
                        t = this.state.searchText;
                    e && e.rawFileResult && e.files && e.rawFileResult.length > e.lastFileOffset && !this.loadingMoreFiles && (this.loadingMoreFiles = !0, de.default.getFilesByMsgIds(e.rawFileResult.slice(e.lastFileOffset, e.lastFileOffset + 20)).then((s => {
                        if (this.loadingMoreFiles = !1, this.isKeywordStale(t)) return;
                        e = this.state.searchResult;
                        const n = s.filter(Boolean);
                        let a = $e.default.ZSafeFunction((() => Math.max(0, e.rawFileResult.length - e.lastFileOffset - 20) + e.files.length + n.length), e.realFileLen),
                            r = this.state.searchResult.files.concat(n);
                        r.sort(((e, t) => parseInt(t.sendDttm) - parseInt(e.sendDttm))), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                files: r,
                                realFileLen: a,
                                lastFileOffset: e.lastFileOffset + 20
                            })
                        }))
                    })).catch((e => {
                        this.loadingMoreFiles = !1, $e.default.logCoreError("_loadMoreFiles ", e)
                    })))
                }
                qosLogSearch() {
                    this.countTimeUseGlobalSearch && (M.default.increaseSuccess(97111, 0, Ut.a.now() - this.countTimeUseGlobalSearch), this.countTimeUseGlobalSearch = 0), this.countSelectTopRes >= 0 && (M.default.increaseSuccess(97112, 0, this.countSelectTopRes), this.countSelectTopRes = -1)
                }
                selectTopRes() {
                    this.countSelectTopRes >= 0 && this.countSelectTopRes++
                }
                selectResult(e, t, s, n) {
                    var a;
                    void 0 === t && (t = !1), void 0 === s && (s = !1), void 0 === n && (n = !1);
                    const r = this.state.searchText;
                    let o = !!this.state.conversation;
                    Wt.a.jumpToMessage(e.message, null === (a = e.conversation) || void 0 === a ? void 0 : a.userId, Ee.f).then((t => {
                        const {
                            groupMsgs: s = []
                        } = t;
                        let n = null;
                        $e.default.ZSafeFunction((() => {
                            if (s)
                                for (let t = 0; t < s.length; t++)
                                    if (s[t].msgId == e.message.msgId) return n = Object(i.a)({}, s[t]), void(n.searchKeyWord = r)
                        }), null), this.state.searchText && xt.a.addCacheKeyword(this.state.searchText), We.default.send(qe.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH, {
                            messages: s,
                            focusId: ["" + e.message.msgId],
                            conversation: e.conversation
                        }), n && Object(Ee.f)({
                            type: qe.ChatBoxActions.UPDATE_MESSAGE_ATTRIBUTES,
                            payload: n
                        })
                    })).catch((t => {
                        $e.default.logCoreError(t), Mt.a.createWarning(Tt.default.str("STR_MESSAGE_NOT_FOUND")), n || We.default.send(qe.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH, {
                            messages: [],
                            focusId: [],
                            conversation: e.conversation
                        })
                    })), o ? (s && this.focusSearchBox(), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        highlightId: e.message.msgId
                    }))) : t || this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        highlightId: e.message.msgId
                    }))
                }
                getRecentSearchItems() {
                    if (0 === He.default.recent_search.is_enable) return [];
                    let e = xt.a.getLocalRecentSearchList();
                    if (!e) return [];
                    let t = Dt.default.getGroupsListSync(),
                        s = t || [];
                    return e = e.filter((e => {
                        if (e && e.userId && !vt.a.isThreadHidden(e.userId)) {
                            if (e.userId.startsWith(v.GROUPID_PREFIX) || 1 === e.type) {
                                let t = !1;
                                1 !== e.type || e.userId.startsWith(v.GROUPID_PREFIX) || (e.userId = v.GROUPID_PREFIX + e.userId);
                                for (let i of s)
                                    if (i.userId && e.userId == i.userId) {
                                        t = !0;
                                        break
                                    } return !!t || (xt.a.removeLocalRecentSearchList(e.userId), !1)
                            }
                            return !0
                        }
                        return !1
                    })), e
                }
                getCacheRecentSearch() {
                    return this.cacheSearch.items = this.getRecentSearchItems(), He.default.sync_recent_search.enable_kw && (this.cacheSearch.keywords = xt.a.getLocalKeywordList()), this.cacheSearch
                }
                getPageLoad() {
                    return this.pageLoad
                }
                getSearchInputRef() {
                    return this.searchInput
                }
                getSearchState() {
                    return this.state
                }
                clearSearch(e) {
                    if (void 0 === e && (e = !0), this._resetCacheResultSearch(), this.searchInput.value = "", this.lastTextSearch = "", e) {
                        if (Gt.b.setMode(Gt.a.NORMAL), this.updateState(Object(i.a)({}, Kt)), this.sidebarController.getState(bt.c).currentTab == ut.m.FILE_TAB) return void this.functionSearchByName(null, this.countQuery, !0)
                    } else this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                        searchText: "",
                        searching: !0,
                        highlightId: ""
                    })), this.functionSearchByName("", this.countQuery, !0)
                }
                _resetCacheResultSearch() {
                    this.curQuery = "", this.cacheResSearch = null, this.trackSearch = !1, this.trackSearchVietnamese = !1
                }
                _checkOnAdminMode(e) {
                    let t = this.__checkOnAdminMode(e);
                    t && (1 === t ? (this.clearAdminMode && clearTimeout(this.clearAdminMode), He.default.adminMode = !0, this.sidebarController.togglePerfTab(!0), this.clearAdminMode = setTimeout((() => {
                        this.clearAdminMode = void 0, He.default.adminMode = void 0, this.sidebarController.togglePerfTab()
                    }), 216e5)) : 2 === t && (this.clearAdminMode && (clearTimeout(this.clearAdminMode), this.clearAdminMode = void 0), He.default.adminMode = !1, this.sidebarController.togglePerfTab(!1)))
                }
                __checkOnAdminMode(e) {
                    if (e && "string" == typeof e && e.startsWith("$##")) {
                        return e.substring(3) === He.default.zAminKey ? 1 : 2
                    }
                    return 0
                }
                _innerSearchFunc(e, t, s) {
                    if (void 0 === s && (s = !0), !Ht.valid(t)) return;
                    if (this.sidebarController.getState(bt.c).currentTab === ut.m.FILE_TAB) We.default.send(qe.SideBarActions.SEARCH_FILE, {
                        term: e
                    });
                    else if (this.state.conversation) this.filterByConversation(e, this.state.conversation);
                    else {
                        const t = s && this.isKeywordStale(this.lastTextSearch),
                            a = qt.a.formatTextSearch(e);
                        var n;
                        if (this.logSearch(`[Search flow] start search-------: ${t}, ${a}`), !a) null === (n = this.searchResultList) || void 0 === n || n.forceStopSearch(), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                            searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                messages: null,
                                files: [],
                                rawFileResult: []
                            })
                        }));
                        this._searchGlobal(e, t)
                    }
                }
                _searchGlobal(e, t) {
                    var s, n, a, r, o, l, d = this;
                    void 0 === t && (t = !0), this.lastTextSearchTs = Date.now(), this.lastTextSearch = e;
                    let c = 2,
                        h = 0,
                        u = {},
                        g = this.convDataManager.getAllConvSync(),
                        m = this.previewDataManager.getAllPreviewsSync(),
                        p = $e.default.simpleStripVietnamese(e, !1);
                    const f = (s, n) => {
                            s !== Zt.STEP_DIRECTORY && s !== Zt.STEP_FILES && c--;
                            let a, r = 1 == c && s === Zt.STEP_CONTACT && 0 == h;
                            if (a = !!(c > 1 || r), this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                    searchResult: n,
                                    searching: a
                                })), s === Zt.STEP_CONTACT && t && (y(), He.default.tabbedGlobalSearchResult && Gt.b.setMode(Gt.a.SEARCHING), He.default.enableFileGlobalSearch && I()), 0 == c && !this.isKeywordStale(e)) {
                                let e = Date.now() - this.lastTextSearchTs;
                                e > 2e3 ? this._upSearchDelay() : e < 600 && this._downSearchDelay()
                            }
                        },
                        b = () => !(!this.state.searchText || !this.isKeywordStale(e)),
                        I = () => {
                            if (He.default.adminConfig && He.default.adminConfig.offglobalSearchMessage) return setTimeout((() => {
                                this.state && !this.isKeywordStale(e) && f(Zt.STEP_FILES, this.state.searchResult)
                            }), 100);
                            const t = t => {
                                var s, n;
                                if (this.isKeywordStale(e)) return;
                                let a = new Set,
                                    r = [];
                                var o, l;
                                if ((t.forEach((e => {
                                        e.msgId && !a.has(e.msgId) && (a.add(e.msgId), r.push(e.msgId))
                                    })), (null === (s = this.state.searchResult) || void 0 === s || null === (n = s.rawFileResult) || void 0 === n ? void 0 : n.length) >= 20 && (null == r ? void 0 : r.length) >= 20) && ((null === (o = this.state.searchResult) || void 0 === o ? void 0 : o.rawFileResult[0]) == r[0] && (null === (l = this.state.searchResult) || void 0 === l ? void 0 : l.rawFileResult[19]) == r[19])) return void this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                    searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                        rawFileResult: r,
                                        realFileLen: r.length
                                    })
                                }), !1);
                                const d = r.slice(0, 20);
                                de.default.getFilesByMsgIds(d).then((t => {
                                    if (this.isKeywordStale(e)) return;
                                    let s = [],
                                        n = 0,
                                        a = 0;
                                    for (const e of t) e ? (s.push(e), n++) : a++;
                                    s.sort(((e, t) => parseInt(t.sendDttm) - parseInt(e.sendDttm)));
                                    let o = this.state.searchResult;
                                    $e.default.log("search files: cur = " + o.searchKey + " this query = " + e, s.length), o = o ? Object(i.a)({}, o) : {}, o.files = s, o.realFileLen = r.length - a, o.rawFileResult = r, o.lastFileOffset = d.length, o.searchKey = e, h += n, f(Zt.STEP_FILES, o)
                                })).catch((t => {
                                    $e.default.logCoreError("doSearchFiles " + t), this.state && !this.isKeywordStale(e) && f(Zt.STEP_FILES, this.state.searchResult)
                                }))
                            };
                            kt.a.search(e, null, {
                                msgType: v.MSG_FILE
                            }, t, {
                                enableReject: !0
                            }).then(t).catch((e => {
                                this.state.searchResult.files && this.state.searchResult.files.length || this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                    searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                        files: []
                                    })
                                }), !0)
                            }))
                        },
                        y = () => {
                            if (He.default.adminConfig && He.default.adminConfig.offglobalSearchMessage) return setTimeout((() => {
                                this.state && !this.isKeywordStale(e) && f(Zt.STEP_MESSAGES, this.state.searchResult)
                            }), 100);
                            this.logSearch(`[Search flow] search msg: ${e}`);
                            Date.now();
                            const t = function (t, n) {
                                var a;
                                if (void 0 === n && (n = !1), d.logSearch(`[Search flow] search msg res first load: ${e}, ${null===(a=t.arr)||void 0===a?void 0:a.length}`), d.pageLoad = 0, d.timeouResetDataMsg && (clearTimeout(d.timeouResetDataMsg), d.timeouResetDataMsg = !1, d.updateState(Object(i.a)(Object(i.a)({}, d.state), {}, {
                                        searchResult: Object(i.a)(Object(i.a)({}, d.state.searchResult), {}, {
                                            messages: null
                                        })
                                    }), !1)), !d.isKeywordStale(e) && t) {
                                    let a = [],
                                        o = 0;
                                    t && t.listConv && t.arr && g.forEach((e => {
                                        let s = t.listConv.indexOf(e.userId);
                                        if (s >= 0 && !vt.a.isThreadHidden(e.userId))
                                            for (let i = s; i < t.listConv.length; ++i) t.listConv[i] == e.userId && (t.arr[i].conversation = e, o += 1, a.push(t.arr[i]))
                                    }));
                                    let l = d.state.searchResult,
                                        c = a;
                                    var r;
                                    if (l.messages && (c = l.messages.slice(), Array.prototype.push.apply(c, a)), c.sort(((e, t) => parseInt(t.message.sendDttm) - parseInt(e.message.sendDttm))), l = l ? Object(i.a)({}, l) : {}, l.messages = c, l.searchKey = e, h += o, n) d.isFirstLoadSuccess = !0, d.searchResultList && s && d.searchResultList.updateFirstLoadPos(s.timeFrom), $e.default.logCoreError("[Global search] check First data", e, null === (r = d.state.searchResult.messages) || void 0 === r ? void 0 : r.length);
                                    else if (!a.length) return;
                                    f(Zt.STEP_MESSAGES, l)
                                }
                            };
                            this.searchResultList && (!this.timeouResetDataMsg && this.state.searchResult.messages && (this.timeouResetDataMsg = setTimeout((() => {
                                this.timeouResetDataMsg = !1, this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                    searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                        messages: null
                                    })
                                })), this.searchResultList && this.searchResultList.resetDataSearch()
                            }), 1e3)), this.searchResultList.resetDataSearch());
                            const s = Object(i.a)({}, null);
                            this.updateState(Object(i.a)(Object(i.a)({}, this.state), {}, {
                                searching: !0,
                                highlightId: "",
                                searchResult: Object(i.a)(Object(i.a)({}, this.state.searchResult), {}, {
                                    messages: !this.lastTextSearch || e.length < this.lastTextSearch.length ? null : this.state.searchResult.messages
                                })
                            })), this.loadingMore = !1, this.isFirstLoadSuccess = !1, kt.a.searchGlobalMessagesV3(e, (() => b()), void 0, t, He.default.limit_result_msg_search + 1, null).then((e => t(e, !0))).catch((t => {
                                if (this.logSearch(`[Search flow] search msg fail: ${t}`), $e.default.logCoreError("searchGlobalMsg " + t), this.state && !this.isKeywordStale(e)) {
                                    this.searchResultList && this.searchResultList.forceStopSearch(), this.timeouResetDataMsg && (clearTimeout(this.timeouResetDataMsg), this.timeouResetDataMsg = !1);
                                    let e = this.state.searchResult;
                                    e.messages = [], f(Zt.STEP_MESSAGES, e)
                                }
                            }))
                        };
                    if (this.curQuery && 0 !== e.indexOf(this.curQuery) && this._resetCacheResultSearch(), !this.cacheResSearch) {
                        const e = e => {
                            for (const t of e) {
                                const e = t.userId || t.convId;
                                t && !u[e] && (t.userId || (t.userId = e), t.infoSearch && delete t.infoSearch, t.isDirectory && delete t.isDirectory, u[e] = t)
                            }
                        };
                        m.length && e(m), e(tt.default.getFriendsSync()), e(Dt.default.getGroupsListSync())
                    }
                    zt.a.search(e, this.cacheResSearch ? this.cacheResSearch : u, {
                        hasSection: !0,
                        suggestGroupWithMember: !0,
                        searchFriendInGroup: !0,
                        isCalc: !0,
                        updateLastChat: !this.cacheResSearch,
                        searchPb: !0,
                        searchZName: !0,
                        searchNumPhone: !0,
                        filterHidden: vt.a.isKeyPIN(e)
                    }).then((t => {
                        let s = this.state.searchResult;
                        if (!this.isKeywordStale(e)) {
                            {
                                var n;
                                let a = [];
                                if (vt.a.isKeyPIN(e)) {
                                    gt.e.logAction(1970601);
                                    const e = vt.a.getUidsHiddenChat();
                                    if (e.length)
                                        for (let t of e) {
                                            let e = !1;
                                            for (let s of g)
                                                if (s && s.userId == t) {
                                                    a.push(Object(i.a)(Object(i.a)({}, s), {}, {
                                                        infoSearch: {}
                                                    })), e = !0;
                                                    break
                                                } if (!e) {
                                                let e = null;
                                                e = t.startsWith(v.GROUPID_PREFIX) ? Dt.default.getGroupByIdSync(t) : tt.default.getProfileFriendSync(t), e && (e.lastMessageTime || (e.lastMessageTime = 0), a.push(Object(i.a)(Object(i.a)({}, e), {}, {
                                                    infoSearch: {}
                                                })))
                                            }
                                        }
                                }
                                this.curQuery || (this.curQuery = e), !this.cacheResSearch && t.orderAll && t.orderAll.constructor == Array && t.orderAll.length > 0 && (this.cacheResSearch = u), null !== (n = t.phone) && void 0 !== n && n.length && (t.phone = t.phone.filter((e => e.userId))), s = s ? Object(i.a)({}, s) : {}, s.recentChat = t.recentChat, s.groups = t.groups, s.friends = t.friends, s.oa = t.oa, s.directory = t.directory, s.searchKey = e, s.phone = t.phone, s.hiddenChat = a, s.all = t.all, s.orderAll = t.orderAll, h += (s.groups ? s.groups.length : 0) + (s.friends ? s.friends.length : 0) + (s.oa ? s.oa.length : 0), h += (s.recentChat ? s.recentChat.length : 0) + s.hiddenChat.length
                            }
                            f(Zt.STEP_CONTACT, s)
                        }
                    })).catch((e => {
                        $e.default.logCoreError(e)
                    })), 0 == (null === (s = this.state.searchResult) || void 0 === s || null === (n = s.messages) || void 0 === n ? void 0 : n.length) && 0 == (null === (a = this.state.searchResult) || void 0 === a || null === (r = a.all) || void 0 === r ? void 0 : r.length) && 0 == (null === (o = this.state.searchResult) || void 0 === o || null === (l = o.files) || void 0 === l ? void 0 : l.length) && gt.e.logAction(1232201), p === e || this.trackSearchVietnamese || (this.trackSearchVietnamese = !0, gt.e.logAction(1232010))
                }
                filterByConversation(e, t) {
                    var s = this;
                    if (!e) return this.searchInput.value = "", void this.updateState(Object(i.a)(Object(i.a)({}, Kt), {}, {
                        conversation: t,
                        searching: !1,
                        highlightId: ""
                    }));
                    let n = function (n, a) {
                        void 0 === a && (a = !1), s.isKeywordStale(e) ? $e.default.logCoreError("search: abort filtermode 1", s.state.searchText, e) : (!a || n && 0 != n.length) && kt.a.getMessageOfConversation(n, t.userId, 20).then((r => {
                            if (s.isKeywordStale(e)) return void $e.default.logCoreError("search: abort filtermode 2", s.state.searchText, e);
                            let o = r.list;
                            if (a && (!o || 0 === o.length)) return;
                            let l = o.length < 20 && n.length > 20;
                            o.length > 0 ? (s.updateState(Object(i.a)(Object(i.a)({}, s.state), {}, {
                                conversation: t,
                                searchResult: {
                                    messageList: o.map((e => ({
                                        message: e,
                                        conversation: t
                                    }))),
                                    realLen: r.len,
                                    rawSearchResult: n,
                                    lastOffset: 20,
                                    progress: a
                                },
                                searching: !1,
                                highlightId: o[0].msgId
                            })), a || (s.focusSearchBox(), l && s.loadMoreMessages()), !a && s.searchResultList && s.searchResultList.scrollToTop && s.searchResultList.scrollToTop()) : (s.updateState(Object(i.a)(Object(i.a)({}, s.state), {}, {
                                conversation: t,
                                searchResult: {
                                    messageList: [],
                                    realLen: 0,
                                    lastOffset: 0,
                                    progress: !1
                                },
                                searching: !1,
                                highlightId: ""
                            })), s.focusSearchBox(), !a && l && s.loadMoreMessages())
                        }))
                    };
                    kt.a.search(e, null, {
                        convId: t.userId + ""
                    }, (e => {
                        n(e, !0)
                    })).then((e => {
                        n(e)
                    }))
                }
                _getSearchDelaySetting() {
                    return 70
                }
                _upSearchDelay() {
                    let e = this.searchDelay;
                    this.searchDelay = Math.min(400, Math.round(1.1 * this.searchDelay + 10 * Math.random())), e !== this.searchDelay && this._resetSearchFunction()
                }
                _downSearchDelay() {
                    let e = this.searchDelay;
                    this.searchDelay = Math.max(70, Math.round(.9 * this.searchDelay + 10 * Math.random())), e !== this.searchDelay && this._resetSearchFunction()
                }
                _resetSearchFunction() {
                    $e.default.logCoreError("__rssf__", this.searchDelay), this.functionSearchByName = $e.default.throttle(this._innerSearchFunc, this.searchDelay)
                }
                _isSelectAllSearchText() {
                    if (this.searchInput) {
                        const e = this.searchInput.selectionStart,
                            t = this.searchInput.selectionEnd;
                        return !(!this.searchInput.value.length || 0 != e || t != this.searchInput.value.length)
                    }
                    return !1
                }
                init() {}
                getItem(e) {
                    return this.state
                }
                getList(e) {
                    throw new Error("No imp!!!")
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                loadOldestTime() {
                    kt.a.getOldestTime().then((e => {
                        null != e && e.length && e[0].ts ? this.oldestTime = parseFloat(e[0].ts) : this.oldestTime = 0
                    })).catch((e => {
                        this.oldestTime = 0
                    }))
                }
                getOldestTime() {
                    return this.oldestTime
                }
            }) || Bt) || Bt) || Bt) || Bt) || Bt);
            var Qt, Jt = s("OlUt"),
                Xt = s("jnrz"),
                Yt = s("Anfm"),
                es = s("BZLJ"),
                ts = s("L+5E"),
                ss = s("A9FD"),
                is = s("BKm0"),
                ns = s("iKSP");
            const as = {
                    windowId: bt.c,
                    theme: Jt.a.default,
                    currentTab: ut.m.MESSAGE_TAB,
                    previousTab: ut.m.MESSAGE_TAB,
                    selectedId: null,
                    previousId: null,
                    showExportImportEntry: !0
                },
                rs = "z_sendtome_bubbledot",
                os = "SIDEBAR CONTROLLER";

            function ls() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                $e.default.logCoreInfo(`[${os}] - `, t)
            }
            Object(O.h)()(Qt = Object(ht.b)(ut.l)(Qt = function (e, t) {
                return l.ModuleContainer.inject(ut.b)(e, void 0, 0)
            }(Qt = function (e, t) {
                return l.ModuleContainer.inject($t.b)(e, void 0, 1)
            }(Qt = Reflect.metadata("design:type", Function)(Qt = Reflect.metadata("design:paramtypes", [void 0 === ut.b ? Object : ut.b, void 0 === $t.b ? Object : $t.b])(Qt = class {
                constructor(e, t) {
                    var s = this;
                    this.convListController = e, this.searchController = t, this.changeTabFromSearch = void 0, this._firstTimePageLoad = void 0, this._querySelect = void 0, this._convsLoaded = void 0, this._exportImportFinished = void 0, this._exportImportProgressError = void 0, this._allowAutoJumpFC = void 0, this._es = void 0, this._onSendMsg = e => {
                        var t, s;
                        const i = (null == e || null === (t = e.messages) || void 0 === t || null === (s = t[0]) || void 0 === s ? void 0 : s.upSrc) & v.FILE_UP_SRC.TextEditor,
                            n = this.getState();
                        if (n.currentTab == ut.m.TODO_TAB || n.currentTab == ut.m.CATALOG_TAB || i || e.isChild) return;
                        const a = this.searchController.getSearchState();
                        n.currentTab !== ut.m.MESSAGE_TAB || a && a.searchText ? (n.currentTab = ut.m.MESSAGE_TAB, Object(je.g)(this.name, bt.c), Object(Ee.f)({
                            type: qe.SideBarActions.SHOW_CHAT_VIEW
                        }), a && a.searchText && gt.e.logAction(1232007), this.searchController.clearSearch(!0)) : n.currentTab == ut.m.MESSAGE_TAB && this.searchController.setRecentSearchFocusState(!1, !1, !0), this.searchController.closeBySendingMsg = !0, setTimeout((() => {
                            this.convListController.scrollToTop(!1)
                        }), 100)
                    }, this.changeTab = function (e, t) {
                        void 0 === t && (t = bt.c);
                        const i = s._getStateByWindowId(t);
                        i.currentTab !== e && (i.currentTab = e, Object(je.g)(s.name, t)), s._onChangeTab(i.currentTab)
                    }, this.togglePerfTab = e => {
                        const t = this._getStateByWindowId(bt.c);
                        t.showPerfTab !== e && (t.showPerfTab = e, Object(je.g)(this.name, bt.c))
                    }, this.changeTheme = async e => {
                        const t = this._getStateByWindowId(bt.c);
                        t.theme !== e && (t.theme = e, Object(je.g)(this.name, bt.c))
                    }, this.selectMessageTab = () => {
                        this.changeTab(ut.m.MESSAGE_TAB)
                    }, this.selectTodoTab = () => {
                        this.changeTab(ut.m.TODO_TAB), gt.e.logAction(171), es.i.setViewPopupTodoSrc(es.d.TAB_ICON)
                    }, this.selectContactFromSearch = async function (e, t) {
                        if (void 0 === t && (t = !1), !e) return ls("Select friend null!"), Promise.resolve(!1);
                        const i = await l.ModuleContainer.resolve(Rt.b).openConversation(e.userId, Rt.c.fromSearchList(e));
                        return !0 === t ? (s.searchController.onCloseSearch(), s.searchController.resetState()) : s.searchController.updateStateOf("highlightId", e.userId), i ? (e && e.userId === He.default.sendToMeId && (_t.g.getFlagForCurrentUser(s.currUser.userId, rs) || (Et.q.getHasShownSendToMeTip() ? _t.g.setFlagForCurrentUser(s.currUser.userId, rs, 1) : setTimeout((() => {
                            We.default.send(qe.ConversationListActions.SHOW_BUBBLE_DOT), Et.q.setHasShownSendToMeTip(!0)
                        }), 144e5)), gt.e.logAction(1390101)), Promise.resolve(!0)) : (ls("Open conv failure"), Promise.resolve(!1))
                    }, this.setupSelectConvOnPageLoad = () => {
                        if (!this._firstTimePageLoad) return;
                        let e = this._getQueryParams();
                        if (e.c) {
                            $e.default.logCoreInfo(`[${this.name}] - setup select conv c`);
                            const t = e => {
                                    const t = {
                                        [e]: !0
                                    };
                                    this._querySelect = () => {
                                        let s;
                                        s = e.startsWith(v.GROUPID_PREFIX) ? Ve.default.fetchGroupsIfNotExpire(t) : Ve.default.fetchFriendsIfNotExist(t), s.then((t => {
                                            t && t[e] ? this.selectContactFromSearch(t[e]) : $e.default.logCoreInfo(`[${this.name}] - auto open conv with id ${e} does not exist`)
                                        })).catch((e => {
                                            $e.default.logCoreError(e)
                                        }))
                                    }, this._autoSelectConv()
                                },
                                s = e.c;
                            e.convert ? Ve.default.convertOAIds([s]).then((e => {
                                e && e[s] && t(e[s])
                            })) : t(s), this._firstTimePageLoad = !1
                        } else if (e.g) $e.default.logCoreInfo(`[${this.name}] - setup select conv g`), ts.a.autoSelectGroupByLink(`https://${He.default.CONFIG_DOMAIN}/g/` + encodeURIComponent(e.g));
                        else if (e.zs);
                        else if (e.phone) {
                            let t = e.phone,
                                s = e.openConv;
                            !t || isNaN(t) || this._querySelect || ($e.default.logCoreInfo(`[${this.name}] - setup select conv p`), this._querySelect = () => {
                                s ? ts.a.autoOpenConversationByPhone(t, Ee.e) : ts.a.autoSelectConversationByPhone(t, Ee.e)
                            }, this._autoSelectConv())
                        } else if (e.alias) {
                            $e.default.logCoreInfo(`[${this.name}] - setup select conv a`);
                            let t = e.alias;
                            this._querySelect || (this._querySelect = () => {
                                ts.a.autoSelectConversationByAlias(t, Ee.e)
                            }, this._autoSelectConv())
                        }
                    }, this.name = ut.i, this.data = new Map, this.key = "windowId", this.changeTabFromSearch = !1, this._firstTimePageLoad = !0, this._convsLoaded = !1, this._allowAutoJumpFC = !1, this.selectConversationForFriend = this.selectConversationForFriend.bind(this), this.listenEvents()
                }
                get currUser() {
                    return Object(wt.c)()
                }
                get autoJumFC() {
                    return this._allowAutoJumpFC
                }
                get eventStore() {
                    return this._es || (this._es = s("emRR").default), this._es
                }
                onStart(e) {
                    l.ModuleContainer.resolve(Rt.b)
                }
                listenEvents() {
                    We.default.subscribe(((e, t) => {
                        switch (e) {
                            case qe.ChatBoxActions.SEND_MSG:
                                this._onSendMsg(t);
                                break;
                            case qe.ChatBoxActions.SELECT_FRIEND:
                                this.selectConversationForFriend(t);
                                break;
                            case qe.SideBarActions.SHOW_FILE_MANAGER:
                                this.getState().currentTab = ut.m.FILE_TAB, Object(je.g)(this.name, bt.c);
                                break;
                            case qe.SideBarActions.SELECT_TAB_MSG:
                                this.changeTab(ut.m.MESSAGE_TAB);
                                break;
                            case qe.SideBarActions.SELECT_ZAVI_TAB:
                                this.changeTab(ut.m.ZAVI_TAB);
                                break;
                            case qe.FetchActions.DELETE_CONVERSATION:
                            case qe.FetchActions.GROUP_LEAVE: {
                                const e = this.getState();
                                e.previousId && t === e.previousId && (e.previousId = null);
                                break
                            }
                            case qe.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT:
                            case qe.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH:
                                this.getState().currentTab == ut.m.FILE_TAB && this.changeTab(ut.m.MESSAGE_TAB);
                                break;
                            case qe.TodoActions.OPEN_TODO_LIST: {
                                const e = Ot.b.instance().getTodoView();
                                e ? e.onCheckOpenTab() : this.changeTab(ut.m.TODO_TAB);
                                break
                            }
                            case qe.ActionList.ACT_OPEN_TAB_CHAT:
                                this.selectMessageTab();
                                break;
                            case qe.ActionList.ACT_OPEN_TAB_CONTACT:
                                this.changeTab(ut.m.CONTACT_TAB);
                                break;
                            case qe.ActionList.ACT_OPEN_GROUPLIST:
                                if (this.getState().currentTab === ut.m.CONTACT_TAB) {
                                    const e = Ot.b.instance().getContactList();
                                    e && e.onJumpGroupCenter()
                                } else this.changeTab(ut.m.CONTACT_TAB);
                                break;
                            case is.b.EXPORT_IMPORT_START:
                                this._exportImportFinished = !1, this._exportImportProgressError = !1;
                                break;
                            case is.b.EXPORT_IMPORT_FINISHED:
                                this._exportImportFinished = !0, this._exportImportProgressError = !1;
                                break;
                            case is.b.IMPORT_DB_PROGRESS:
                            case is.b.IMPORT_PROGRESS:
                            case is.b.EXPORT_PROGRESS:
                            case is.b.EXPORT_DB_PROGRESS:
                                t && t.error && (this._exportImportProgressError = !0);
                                break;
                            case qe.ConversationListActions.SELECT_CONVERSATION: {
                                const e = this.getState();
                                e.currentTab !== ut.m.FILE_TAB && e.currentTab !== ut.m.ZAVI_TAB && e.currentTab !== ut.m.CATALOG_TAB || this.changeTab(ut.m.MESSAGE_TAB);
                                break
                            }
                        }
                    })), it.a.ConvInfoDataManager.addEventListener(ft.b.DoneLoadDB, (e => {
                        this._convsLoaded = !0, this._autoSelectConv()
                    })), it.a.UnreadDataManager.addEventListener(ft.b.DoneLoadDB, (e => {
                        Xt.b.onDoneLoadUnreadDB(null == e ? void 0 : e.payload)
                    }))
                }
                getState(e) {
                    return void 0 === e && (e = bt.c), this._getStateByWindowId(e)
                }
                getSelectedId(e) {
                    return this.getState(e).selectedId || null
                }
                getCurrMainConvId() {
                    const e = this.eventStore.getState();
                    return e && e.chatview.view === ns.c.CHAT_VIEW ? this.getSelectedId() : null
                }
                updateSelectedId(e, t) {
                    void 0 === t && (t = bt.c);
                    const s = this._getStateByWindowId(t);
                    s.selectedId !== e && (s.previousId = e ? null : s.selectedId, s.selectedId = e, Object(je.g)(this.name, t))
                }
                isInImportExportProcess() {
                    const e = this._exportImportFinished || this._exportImportProgressError;
                    return void 0 !== e && !e
                }
                openFriendCenter() {}
                selectConversationForFriend(e, t) {
                    if (void 0 === t && (t = !1), !e) return void $e.default.logCoreError("friend null");
                    if (Ee.f && (Object(Ee.f)({
                            type: qe.ConversationListActions.SELECT_CONV_MINOR,
                            payload: e
                        }), Object(Ee.f)({
                            type: qe.ChatBoxActions.READ_CONVERSATION,
                            payload: {
                                conversationId: e.userId
                            }
                        })), e.userId == this.currUser.userId) return void this._showMyProfile();
                    let s = this.convListController.getRecentContactWithId(e.userId),
                        n = !1;
                    if (s) n = !0;
                    else {
                        let t = t => {
                            t && t.includes(e.userId) && (s = Object(i.a)({}, t[e.userId]))
                        };
                        s || t(Dt.default.getGroupsListSync()), s || t(tt.default.getFriendsSync()), s || (s = {}), Object.assign(s, e), s.isFr = s.isFr || 0, s.type = s.type || v.FRIEND_TYPE_NORMAL
                    }
                    e.byPassPIN ? s.byPassPIN = 1 : s.byPassPIN && delete s.byPassPIN, setTimeout((() => {
                        Object(Ee.f)({
                            type: qe.ConversationListActions.SELECT_CONVERSATION,
                            payload: s
                        })
                    }), 0);
                    const a = this.data.get(bt.c);
                    let r = null == a ? void 0 : a.currentTab;
                    !0 === t ? (r = n ? ut.m.MESSAGE_TAB : ut.m.CONTACT_TAB, r === ut.m.CONTACT_TAB && ($e.default.log("sidebar: select from search, should highlight thread"), this.changeTabFromSearch = !0), this.searchController.onCloseSearch(), this.searchController.resetState(), !e.userId || !e.byPassPIN && vt.a.isThreadHidden(e.userId) || setTimeout((() => {
                        We.default.send(qe.ChatBoxActions.FOCUS_INPUT, {
                            userId: e.userId,
                            windowId: bt.c
                        })
                    }), 0)) : this.searchController.updateStateOf("highlightId", e.userId), this.updateState(Object(i.a)(Object(i.a)({}, a), {}, {
                        currentTab: r,
                        selectedId: e.userId
                    })), e && e.userId === He.default.sendToMeId && (_t.g.getFlagForCurrentUser(this.currUser.userId, rs) || (Et.q.getHasShownSendToMeTip() ? _t.g.setFlagForCurrentUser(this.currUser.userId, rs, 1) : setTimeout((() => {
                        We.default.send(qe.ConversationListActions.SHOW_BUBBLE_DOT), Et.q.setHasShownSendToMeTip(!0)
                    }), 144e5)))
                }
                showAddFriendModal() {
                    gt.e.logAction(1020203), gt.e.logAction(12316), yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.FIND_FRIEND
                    })
                }
                showGroupCompose() {
                    gt.e.logAction(1020202), Yt.c.markStart(Yt.a.CREATE_GROUP, Yt.b.Group.CREATE_GR_HEADER_ICON);
                    const e = Et.q.getSessionUserId(),
                        t = function (e) {
                            void 0 === e && (e = !0), yt.ModalManagerV2.openModal({
                                windowId: bt.c,
                                name: v.ModalIdentitiesDefine.CREATE_GROUP_COMPOSE,
                                params: {
                                    needInitE2ee: e
                                },
                                forceCloseAll: !1
                            })
                        };
                    !_t.g.getTimeEntryPointE2eGroup(e, Yt.b.Group.CREATE_GR_HEADER_ICON) && He.default.e2ee.enable_group && He.default.e2ee.group.can_enable_right_in_creation_step ? yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.E2EE_ONBOARDING,
                        params: {
                            entry: ss.e.CREATE_GROUP,
                            entrySrc: Yt.b.Group.CREATE_GR_HEADER_ICON,
                            isGroup: !0,
                            userId: "",
                            callback: t,
                            callbackCancel: t
                        },
                        forceCloseAll: !1
                    }) : t(!1)
                }
                enableAutoJupmFC() {
                    this._allowAutoJumpFC = !0
                }
                disableAutoJupmFC() {
                    this._allowAutoJumpFC = !1
                }
                init() {}
                getItem(e) {
                    const t = e.key;
                    return this._getStateByWindowId(t)
                }
                getList(e) {
                    return Array.from(this.data.keys())
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                updateState(e, t, s) {
                    void 0 === t && (t = bt.c), void 0 === s && (s = !0), this.data.set(t, e), s && Object(je.g)(this.name, t)
                }
                _getStateByWindowId(e) {
                    let t = this.data.get(e);
                    return t || (t = Object(i.a)({}, as), this.data.set(e, t)), t
                }
                _onChangeTab(e) {
                    switch (function () {
                        switch (e) {
                            case ut.m.MESSAGE_TAB:
                                gt.e.logAction(12801);
                                break;
                            case ut.m.CONTACT_TAB:
                                gt.e.logAction(12802), 3 === He.default.noti_center_config.entry_position && gt.e.logAction(1281205);
                                break;
                            case ut.m.MENTION_TAB:
                                gt.e.logAction(12805);
                                break;
                            case ut.m.STAR_TAB:
                                gt.e.logAction(12806);
                                break;
                            case ut.m.FILE_TAB:
                                gt.e.logAction(133);
                                break;
                            case ut.m.TODO_TAB:
                                3 === He.default.noti_center_config.entry_position && gt.e.logAction(1281206);
                                break;
                            case ut.m.ZAVI_TAB:
                                gt.e.logAction(20701)
                        }
                    }(), Et.q.resetGlobalSearchMode(), this.searchController.clearSearch(!0), e) {
                        case ut.m.MESSAGE_TAB: {
                            this._resetConversationList();
                            const e = this.getState();
                            !e.selectedId && e.previousId && this.updateSelectedId(e.previousId), Object(Ee.f)({
                                type: qe.SideBarActions.SHOW_CHAT_VIEW
                            });
                            break
                        }
                        case ut.m.ZAVI_TAB:
                            Object(Ee.f)({
                                type: qe.SideBarActions.SELECT_ZAVI
                            });
                        case ut.m.TODO_TAB:
                    }
                }
                _showMyProfile() {
                    yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                        params: this.currUser.userId
                    })
                }
                _resetConversationList() {}
                _getQueryParams() {
                    let e = {},
                        t = window.location.search;
                    if (t = t ? t.substr(1).split("&") : null, t)
                        for (let s = 0; s < t.length; s++) {
                            let i = t[s].indexOf("=");
                            if (i >= 0) {
                                let n = t[s].slice(0, i),
                                    a = t[s].slice(i + 1, t[s].length);
                                n && n.length > 0 && a && a.length > 0 && (e[n] = decodeURIComponent(a))
                            }
                        }
                    return e
                }
                _autoSelectConv() {
                    this._querySelect && this._convsLoaded && ($e.default.logCoreInfo(`[${this.name}] - auto select conv start`), this._querySelect(), this._querySelect = null)
                }
            }) || Qt) || Qt) || Qt) || Qt) || Qt);
            var ds;
            const cs = {
                id: ot.g,
                color: "#EA87FF",
                conversations: [],
                createTime: 1634956772046,
                emoij: "",
                offset: 100,
                text: "default"
            };
            var hs;
            ! function (e) {
                e.ALL = "all", e.SELECTED = "selected"
            }(hs || (hs = {}));
            Object(ht.b)(ut.f)(ds = Reflect.metadata("design:type", Function)(ds = Reflect.metadata("design:paramtypes", [])(ds = class extends k.b {
                constructor() {
                    super(), this.allLabels = void 0, this.selectedLabel = void 0, this.name = ut.e, this.data = new Map, this.key = "labelId", this.allLabels = [], this.selectedLabel = []
                }
                onLabelChange(e) {
                    const {
                        color: t,
                        conversations: s,
                        createTime: i,
                        emoij: n,
                        offset: a,
                        text: r
                    } = e, o = "" + e.id, l = this.data.get(o);
                    if (!o || l && s === l.conversations && i == (null == l ? void 0 : l.createTime) && n == l.emoij && a == l.offset && r === l.text && t == l.color || (this.data.set(o, e), Object(je.g)(this.name, o)), l && l.conversations && l.conversations.length !== s.length) {
                        let e = [];
                        s.length > l.conversations.length ? (e = s.filter((e => !l.conversations.includes(e))), this.dispatchEvent(new mt.c(mt.d.LabelAddConvs, {
                            labelId: o,
                            convIds: e
                        }))) : (e = l.conversations.filter((e => !s.includes(e))), this.dispatchEvent(new mt.c(mt.d.LabelRemoveConvs, {
                            labelId: o,
                            convIds: e
                        })))
                    }
                }
                onFetchLabels(e) {
                    if (Array.isArray(e) && !(e.length < 0)) {
                        for (let t = 0; t < e.length; t++) this.onLabelChange(e[t]);
                        this.data.forEach((t => {
                            const s = "" + t.id;
                            e.some((e => e.id == s)) || this.data.delete(s)
                        })), this._updateAllLabels(e.map((e => e.id)))
                    }
                }
                onLabelDeleted(e) {
                    "string" != typeof e && ($e.default.logCoreError(`[${this.name}] - delete label invalid lid type ${e}`), e = "" + e), this.data.has(e) ? (this.data.delete(e), this._updateAllLabels(this.allLabels.filter((t => t !== e))), this.selectedLabel.includes(e) && this.onDeSelectLabel(e), Object(je.e)(this.name, e)) : $e.default.logCoreError(this.name + "Deleted not exists item!!!")
                }
                _updateAllLabels(e) {
                    return !$e.default.shallowEqual(this.allLabels, e) && (this.allLabels = e, Object(je.h)(this.name, hs.ALL), !0)
                }
                onSelectLabel(e) {
                    this.selectedLabel = ["" + e], Object(je.h)(this.name, hs.SELECTED), this.selectedLabelChanged()
                }
                onDeSelectLabel(e) {
                    this.selectedLabel = this.selectedLabel.filter((t => t !== e)), Object(je.h)(this.name, hs.SELECTED), this.selectedLabelChanged()
                }
                onClearFilter() {
                    this.selectedLabel = [], Object(je.h)(this.name, hs.SELECTED), this.selectedLabelChanged()
                }
                getLabelById(e) {
                    return e ? ("string" != typeof e && (e = e.toString()), e == ot.g ? cs : e == ot.h ? {
                        id: ot.h
                    } : this.data.get(e) || null) : null
                }
                getAllLabels() {
                    return Array.from(this.data.values())
                }
                getAllLabelIds() {
                    return this.allLabels
                }
                applyNewFilter(e) {
                    this.selectedLabel = e, Object(je.h)(this.name, hs.SELECTED), this.selectedLabelChanged()
                }
                selectedLabelChanged() {
                    this.dispatchEvent(new mt.c(mt.d.SelectedLabelChange, this.selectedLabel))
                }
                init() {
                    It.b.getAll().then((e => {
                        this.onFetchLabels(e)
                    }))
                }
                getItem(e) {
                    const t = e.key;
                    return this.getLabelById(t)
                }
                getList(e) {
                    const t = e.key;
                    return t === hs.ALL ? this.allLabels : t === hs.SELECTED ? this.selectedLabel : []
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
            }) || ds) || ds);
            l.ModuleContainer.register(at.a, dt);
            var us = s("k+R1"),
                gs = s("Py3H");
            let ms;
            ! function (e) {
                e[e.FULL = 0] = "FULL", e[e.WINDOWED = 1] = "WINDOWED"
            }(ms || (ms = {}));
            var ps, fs = s("tQbm"),
                vs = s("qzuk"),
                bs = s("NMlV"),
                Is = s("4HQc"),
                ys = s("8RMw"),
                Cs = s("lPX+"),
                Ss = s("OU7N"),
                _s = s("UYGI"),
                Es = s("X4fA"),
                Ls = s("V8Oy"),
                ws = s("7WX+");
            let Ms;
            $e.default.isWeb() || (Ms = s("Dprd").default);
            const Ts = {
                conversationId: null,
                mode: ms.FULL,
                windowId: bt.c
            };
            Object(ht.b)(fs.b)(ps = function (e, t) {
                return l.ModuleContainer.inject(ut.l)(e, void 0, 0)
            }(ps = Reflect.metadata("design:type", Function)(ps = Reflect.metadata("design:paramtypes", [void 0 === ut.l ? Object : ut.l])(ps = class extends k.b {
                constructor(e) {
                    super(), this.sidebar = e, this.data = new Map, this.onLogOut = () => {
                        if (Ss.c.isCalling()) return void Mt.a.createWarning(Tt.default.str("STR_SIGNOUT_WITH_CALL"));
                        let e = Et.q.getSessionUserId(),
                            t = "STR_LOGOUT_CONFIRM",
                            s = +_s.a.isUploading();
                        if (!s && Ms && Ms.isDownloading() && (s = 2), s > 0) {
                            const e = 1 === s ? Tt.default.str("STR_TITLE_BAR_SEND") : Tt.default.str("STR_TITLE_BAR_RECEIVE");
                            t = Tt.default.str("STR_LOGOUT_CANCEL_FILE") + ` ${e} ` + Tt.default.str("STR_TITLE_BAR_EXIT_ZALO_P2")
                        }
                        Es.a.getLogoutToken(), Ft.a.openConfirm({
                            windowId: bt.c,
                            name: v.MODAL_CONFIRM.confirmIdentities,
                            params: {
                                message: Tt.default.str(t),
                                okText: Tt.default.str("STR_LOGOUT_YES"),
                                cancelText: Tt.default.str("STR_LOGOUT_NO"),
                                onOk: this.doLogout,
                                options: [{
                                    default_val: _t.g.isSetClearData(e),
                                    key: "del_history",
                                    title: "STR_LOGOUT_DEL_HISTORY"
                                }],
                                "data-id": {
                                    confirmBtn: "btn_Logout_Logout",
                                    cancelBtn: "btn_Logout_No"
                                }
                            }
                        })
                    }, this.openConversationInNewWindow = async e => {
                        throw new Error("Method not implemented.")
                    }, this.openScreenCapture = async () => {
                        gt.e.logAction(12808), We.default.send(qe.ChatBoxActions.SIDEBAR_CAPTURE)
                    }, this.openZaloSupport = async () => {
                        const e = He.default.supportPage;
                        return e ? l.ModuleContainer.resolve(Rt.b).openConversation(e, Rt.c.fromSupport()) : Promise.resolve(!1)
                    }, this.openUpdateMyProfile = async () => {
                        yt.ModalManagerV2.openModal({
                            windowId: bt.c,
                            name: v.ModalIdentitiesDefine.UPDATE_PROFILE,
                            params: {
                                showCloseButton: !0
                            }
                        })
                    }, this.openUserInfo = async e => {
                        gs.a.setFriendRequestSource(e, v.FRIEND_REQUEST_SRC_CONTACT_LIST_SUGGESTION), Et.q.setSelectConversationSource(178012), yt.ModalManagerV2.openModal({
                            windowId: bt.c,
                            name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                            params: e
                        })
                    }, this.openEditAlias = async e => {
                        const t = {
                            windowId: bt.c,
                            name: v.ModalIdentitiesDefine.EDIT_ALIAS,
                            params: Object(i.a)({}, e)
                        };
                        yt.ModalManagerV2.openModal(t)
                    }, this.sendFile = async (e, t) => {
                        const s = this._getStateByWindowId(bt.c),
                            i = us.default.getChatBoxControllerByConvId(t || s.conversationId);
                        null == i || i._uploadDragFile(e, null, t)
                    }, this.getConvId = () => this._getStateByWindowId(bt.c).conversationId, this.sendDirectMsgToSendToMe = (e, t) => {
                        !He.default.isOffSendToMe && this.chatboxController && de.default.getConversation(He.default.sendToMeId).then((s => {
                            if (e === v.MSG_GIF && t.url) {
                                var i;
                                let e = {
                                    hd: {
                                        width: t.width ? t.width : 0,
                                        height: t.height ? t.height : 0,
                                        url: t.url
                                    },
                                    original: {
                                        width: t.width ? t.width : 0,
                                        height: t.height ? t.height : 0,
                                        url: t.url
                                    },
                                    normal: {
                                        width: t.width ? t.width : 0,
                                        height: t.height ? t.height : 0,
                                        url: t.url
                                    }
                                };
                                null === (i = this.chatboxController) || void 0 === i || i._sendMessage(s, v.MSG_GIF, e, null, null, null, null, null)
                            }
                            Object(Ee.e)({
                                type: qe.ConversationListActions.SELECT_CONVERSATION,
                                payload: s
                            }), this.sidebar.updateSelectedId(He.default.sendToMeId)
                        }))
                    }, this.broadCastMessage = (e, t, s, i) => {
                        if (e && t)
                            for (let l = 0; l < e.length; l++) {
                                const d = e[l];
                                if (d) {
                                    let e = d.userId,
                                        l = e.startsWith(v.GROUPID_PREFIX);
                                    if (t.msgType === v.MSG_STICKER) {
                                        var n;
                                        const o = bs.a.next();
                                        t && t.sendSrc && Yt.c.track(o, t.sendSrc);
                                        const c = new Is.b(Et.q.getSessionUserId(), e, o, o, v.MSG_STICKER, l),
                                            h = null === ys.default || void 0 === ys.default || null === (n = ys.default.signalProtocolManager) || void 0 === n ? void 0 : n.isOnE2ee(d.userId);
                                        if (c.updateMessageContentProp(Is.a.STICKER, t.message), h) {
                                            var a;
                                            const e = {
                                                id: c.content.sticker.id,
                                                catId: c.content.sticker.cateId,
                                                type: c.content.sticker.type
                                            };
                                            var r;
                                            if (null !== (a = t.message) && void 0 !== a && a.fssInfo) e.extInfo = null === (r = t.message) || void 0 === r ? void 0 : r.fssInfo;
                                            c.updateMessageContentProp(Is.a.STICKER, e), c.e2eeStatus = v.MSG_E2EE
                                        }
                                        Ve.default.sendMsgObject(c).then((t => {
                                            if (s) {
                                                const t = bs.a.next();
                                                let i = new Is.b(Et.q.getSessionUserId(), e, t, t, v.MSG_TEXT, l);
                                                i.updateMessageContentProp(Is.a.TEXT, s), h && (i.e2eeStatus = v.MSG_E2EE), Ve.default.sendMsgObject(i).then((e => {
                                                    h && (e = $e.default.parseE2eeResp(e), this.chatboxController._showLocalMessage(i, d), this.chatboxController._sentMessage(i, e))
                                                })).catch((e => {}))
                                            }
                                            h && (t = $e.default.parseE2eeResp(t), this.chatboxController._showLocalMessage(c, d), this.chatboxController._sentMessage(c, t)), i && i(t)
                                        })).catch((e => {
                                            $e.default.logCoreError("BroadcastErr: ", e), i && i(e)
                                        }))
                                    } else if (t.msgType === v.MSG_TEXT && s) {
                                        var o;
                                        const t = bs.a.next();
                                        let n = new Is.b(Et.q.getSessionUserId(), e, t, t, v.MSG_TEXT, l);
                                        n.updateMessageContentProp(Is.a.TEXT, s);
                                        (null === ys.default || void 0 === ys.default || null === (o = ys.default.signalProtocolManager) || void 0 === o ? void 0 : o.isOnE2ee(d.userId)) && (n.e2eeStatus = v.MSG_E2EE), Ve.default.sendMsgObject(n).then((e => {
                                            i && i(e)
                                        })).catch((e => {
                                            i && i(e)
                                        }))
                                    }
                                }
                            }
                    }, this.handleEvent = (e, t) => {
                        if (e === qe.ConversationListActions.SELECT_CONVERSATION) {
                            const e = this._getStateByWindowId(bt.c);
                            if (t.userId !== e.conversationId) return this._updateStateByWindowId(bt.c, (e => Object(i.a)(Object(i.a)({}, e), {}, {
                                conversationId: t.userId
                            }))), Object(je.g)(this.name, bt.c), void this.dispatchEvent(new vs.a(t.userId, bt.c))
                        }
                    }, this.name = fs.a, this.key = "windowId", this.init()
                }
                get chatboxController() {
                    const e = this.sidebar.getState().selectedId;
                    return us.default.getChatBoxControllerByConvId(e || bt.b)
                }
                onInviteFriend() {
                    const e = [Cs.a];
                    yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.SHARE_MSG_COMPOSE,
                        params: {
                            messages: e,
                            title: Tt.default.str("STR_INVITE_FRIEND_1"),
                            disableGroup: !0,
                            disablePcUser: !0,
                            callback: (e, t) => {
                                We.default.send(qe.SideBarActions.SEND_INVITATION, {
                                    target: e,
                                    message: (null == t ? void 0 : t.length) > 0 ? t[0] : "",
                                    link: `https://${He.default.CONFIG_DOMAIN}/may-tinh`
                                })
                            }
                        }
                    })
                }
                onWhatNew() {
                    yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.APP_UPDATE_INFO,
                        params: {
                            data: de.default.getCacheRecentUpdate(),
                            isManual: !0
                        }
                    })
                }
                showMyProfile() {
                    let e = Et.q.getSessionUserId();
                    yt.ModalManagerV2.openModal({
                        windowId: bt.c,
                        name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                        params: e
                    })
                }
                get mainWindowConversationId() {
                    return this._getStateByWindowId(bt.c).conversationId
                }
                doLogout(e) {
                    let t = Et.q.getSessionUserId();
                    e && e.del_history ? _t.g.setClearData(t, 1) : _t.g.setClearData(t, 0), Ls.a.logout(), ws.a.logout(), Es.a.logout().catch((e => {
                        e.error_code && 18032 === e.error_code && yt.ModalManagerV2.openModal({
                            windowId: bt.c,
                            name: v.ModalIdentitiesDefine.CHANGE_PW
                        })
                    }))
                }
                init() {
                    We.default.subscribe(this.handleEvent)
                }
                getItem(e, t) {
                    return this._getStateByWindowId(e.key)
                }
                getList(e, t) {
                    return Array.from(this.data.keys())
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                _getStateByWindowId(e) {
                    let t = this.data.get(e);
                    return t || (t = Object(i.a)({}, Ts), this.data.set(e, t)), t
                }
                _updateStateByWindowId(e, t) {
                    const s = t(this._getStateByWindowId(e));
                    this.data.set(e, s)
                }
            }) || ps) || ps) || ps);
            var Fs, Os = s("OI//");
            let Rs = l.ModuleContainer.injectable()(Fs = class {
                async get(e) {
                    return Dt.default.getGroupByIdSync(e)
                }
                async getAll() {
                    return await Dt.default.getGroupsListSync()
                }
            }) || Fs;
            var Ds;
            let As = l.ModuleContainer.injectable()(Ds = function (e, t) {
                return l.ModuleContainer.inject(Os.c)(e, void 0, 0)
            }(Ds = function (e, t) {
                return l.ModuleContainer.inject(j.ZLoggerFactory)(e, void 0, 1)
            }(Ds = Reflect.metadata("design:type", Function)(Ds = Reflect.metadata("design:paramtypes", [void 0 === Os.c ? Object : Os.c, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(Ds = class {
                constructor(e, t) {
                    this.groupRepository = e, this.logger = void 0, this.logger = t.createZLogger("groups", ["group-manager"])
                }
                getAll() {
                    return this.groupRepository.getAll().then((e => e.map((e => new Os.a(e))))).catch((e => (this.logger.zsymb(18, 8176, 3e4, (() => ["getAll error. return [].", {
                        reason: e
                    }])), [])))
                }
                get(e) {
                    return this.groupRepository.get(e).then((e => e ? new Os.a(e) : void 0)).catch((e => {
                        this.logger.zsymb(18, 8176, 30001, (() => ["get error. return undefined.", {
                            reason: e
                        }]))
                    }))
                }
            }) || Ds) || Ds) || Ds) || Ds) || Ds;
            l.ModuleContainer.registerSingleton(Os.c, Rs), l.ModuleContainer.registerSingleton(Os.b, As);
            var js, Ps = s("MqnV"),
                Ns = s("yEZN");
            let Bs = l.ModuleContainer.injectable()(js = function (e, t) {
                return l.ModuleContainer.inject(lt.c)(e, void 0, 0)
            }(js = function (e, t) {
                return l.ModuleContainer.inject(Ns.b)(e, void 0, 1)
            }(js = function (e, t) {
                return l.ModuleContainer.inject(lt.e)(e, void 0, 2)
            }(js = Reflect.metadata("design:type", Function)(js = Reflect.metadata("design:paramtypes", [void 0 === lt.c ? Object : lt.c, void 0 === Ns.b ? Object : Ns.b, void 0 === lt.e ? Object : lt.e])(js = class {
                constructor(e, t, s) {
                    this.conversationRepository = e, this.messageManager = t, this.muteManager = s
                }
                async get(e) {
                    const t = await this.conversationRepository.get(e).catch((() => {}));
                    if (t) return new lt.b(t, this, this.messageManager)
                }
                isPinned(e) {
                    return this.conversationRepository.get(e).then((e => !(null == e || !e.pinned))).catch((() => !1))
                }
                isMuted(e) {
                    return !!this.muteManager.isMuted(e)
                }
            }) || js) || js) || js) || js) || js) || js;
            var Us;
            let ks = l.ModuleContainer.injectable()(Us = function (e, t) {
                return l.ModuleContainer.inject(lt.a)(e, void 0, 0)
            }(Us = Reflect.metadata("design:type", Function)(Us = Reflect.metadata("design:paramtypes", [void 0 === lt.a ? Object : lt.a])(Us = class {
                constructor(e) {
                    this.convManager = e
                }
                get(e) {
                    return this.convManager.getConvById(e)
                }
            }) || Us) || Us) || Us) || Us;
            var Gs = s("SVh1");
            var zs, xs = new class {
                    constructor() {}
                    showMyProfile() {
                        yt.ModalManagerV2.openModal({
                            windowId: bt.c,
                            name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                            params: Et.q.getSessionUserId()
                        })
                    }
                },
                Vs = s("idnp"),
                $s = s("SWHF"),
                Ws = s("rkiK");

            function qs() {
                for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                $e.default.logCoreInfo("[Conversation controller] - ", t)
            }
            let Ks = Object(l.singleton)()(zs = Object(l.injectable)()(zs = function (e, t) {
                return Object(l.inject)(lt.g)(e, void 0, 0)
            }(zs = function (e, t) {
                return Object(l.inject)($s.b)(e, void 0, 1)
            }(zs = function (e, t) {
                return Object(l.inject)(ut.l)(e, void 0, 2)
            }(zs = function (e, t) {
                return Object(l.inject)(lt.a)(e, void 0, 3)
            }(zs = Reflect.metadata("design:type", Function)(zs = Reflect.metadata("design:paramtypes", [void 0 === lt.g ? Object : lt.g, void 0 === $s.b ? Object : $s.b, void 0 === ut.l ? Object : ut.l, void 0 === lt.a ? Object : lt.a])(zs = class {
                constructor(e, t, s, i) {
                    this.previewManager = e, this.adminSettingController = t, this.sidebar = s, this.convDataManager = i, this.ipc = void 0, this._es = void 0, this.onRequestJumtoMsg = (e, t) => {
                        const s = t.conversation,
                            i = e === qe.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT || vt.a.getListChatBoxViewCurrent().includes(null == s ? void 0 : s.userId) || s.byPassPIN;
                        if (!s) return;
                        if (s && !i && vt.a.isThreadHidden(s.userId)) return Object(wt.b)({
                            type: e,
                            payload: t
                        }, !0), void qs("req jum to msg rejected because hidden chat");
                        qs("req jum to msg open on main"), Object(wt.b)({
                            type: e,
                            payload: t
                        }, !0);
                        const n = Vs.b.fromJumpMessage();
                        this.openConversationForJump(s.userId, n)
                    }, this.tryToFocusChild = (e, t) => !!us.default.isOpenChildWindowByConvId(e) && (qs("Open conv forward because already open in child => call focus"), us.default.focusOnChildWindow(e, null == t ? void 0 : t.callPoint), !0), this.handleOutConversation = e => {
                        this.closeConversation(e.convId)
                    }, this.listenEvent()
                }
                get eventStore() {
                    return this._es || (this._es = s("emRR").default), this._es
                }
                listenEvent() {
                    We.default.subscribe(((e, t) => {
                        switch (e) {
                            case qe.ConversationListActions.SELECT_CONVERSATION_HIDDEN:
                                this.sidebar.updateSelectedId(t.userId);
                                break;
                            case qe.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH:
                                this.onRequestJumtoMsg(qe.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH, t);
                                break;
                            case qe.ChatBoxActions.OPEN_CONV_JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT:
                                this.onRequestJumtoMsg(qe.ChatBoxActions.JUMP_TO_MESSAGE_SEARCH_HIDDEN_CHAT, t)
                        }
                    })), this.convDataManager.addEventListener(ft.b.DeleteConv, this.handleOutConversation), this.convDataManager.addEventListener(ft.b.EmptyConv, this.handleOutConversation), this.convDataManager.addEventListener(ft.b.LeaveGroup, this.handleOutConversation)
                }
                isConvOpeningInMain(e) {
                    const t = this.eventStore.getState(),
                        s = this.sidebar.getState().selectedId;
                    return t && t.chatview.view === ns.c.CHAT_VIEW && s === e
                }
                openConversationForJump(e, t) {
                    return void 0 === t && (t = Vs.a), new Promise((async s => {
                        if (qs(`Request open conv for jum: ${e}`), !e || this.isConvOpeningInMain(e)) {
                            if (qs(`Open conv rejected because null or opened: ${e}`), e) {
                                this.tryToFocusChild(e, t) || us.default.focusOnMainWindow()
                            }
                            return s(!1)
                        }
                        if (!(await this.conversationWillOpen(e))) return s(!1);
                        let i = !1;
                        if (t.window === Gs.b.Child) return i = this.tryToFocusChild(e, t), s(i);
                        if (t.window === Gs.b.PreferChild) {
                            if (i = this.tryToFocusChild(e, t), i) return s(!0)
                        } else t.window === Gs.b.MainAndChild && (i = this.tryToFocusChild(e, t));
                        i || us.default.focusOnMainWindow(), We.default.send(qe.ConversationListActions.SELECT_CONV_MINOR, {
                            userId: e
                        }), Object(wt.b)({
                            type: qe.ConversationListActions.OPEN_CONV_FOR_JUMP,
                            payload: {
                                userId: e
                            }
                        }), this.sidebar.updateSelectedId(e), s(!0), this.conversationDidOpen(e)
                    }))
                }
                openConversation(e, t) {
                    return void 0 === t && (t = Vs.a), new Promise((async (s, n) => {
                        if (qs(`Request open conv from: ${e} - ${t.callPoint}`), !e || this.isConvOpeningInMain(e) && !t.force) {
                            if (qs(`Open conv rejected because null or opened: ${e}`), e) {
                                this.tryToFocusChild(e, t) || us.default.focusOnMainWindow()
                            }
                            return s(!1)
                        }
                        const a = Et.q.getSessionUserId();
                        if (e == a) return xs.showMyProfile(), s(!1);
                        if (!(await this.conversationWillOpen(e))) return s(!1);
                        let r = !1;
                        if (t.window === Gs.b.Child) return r = this.tryToFocusChild(e, t), s(r);
                        if (t.window === Gs.b.PreferChild) {
                            if (r = this.tryToFocusChild(e, t), r) return s(!0)
                        } else t.window === Gs.b.MainAndChild && (r = this.tryToFocusChild(e, t));
                        let o = t.credentConv;
                        if (o || (o = await de.default.getLikeConversation(e).catch((e => {
                                qs(`Failure to load conv from store ${e}`)
                            })), qs(`Try to use storage conv: ${!!o}`)), o || (o = t.defaultConv, qs(`Try to use default conv: ${!!o}`)), !o) return qs(`Open conv not exists: ${e}`), s(!1);
                        r || us.default.focusOnMainWindow(), We.default.send(qe.ConversationListActions.SELECT_CONV_MINOR, o);
                        const l = vt.a.isThreadHidden(e);
                        l && vt.a.checkShowUnreadHiddenChat(e), t.byPassPIN ? (o = Object(i.a)({}, o), o.byPassPIN = 1) : delete o.byPassPIN, this.eventStore.dispatch({
                            type: qe.ConversationListActions.SELECT_CONVERSATION,
                            payload: o
                        }), We.default.send(qe.ConversationListActions.SELECT_CONVERSATION, {
                            userId: o.userId,
                            needScroll: t.callPoint !== Gs.a.ConvItem,
                            callPoint: t.callPoint
                        });
                        (!l || t.byPassPIN || vt.a.getListChatBoxViewCurrent().includes(o.userId)) && this.sidebar.updateSelectedId(e), s(!0), this.conversationDidOpen(e)
                    }))
                }
                closeConversation(e, t) {
                    return void 0 === t && (t = bt.c), new Promise((s => {
                        if (e && this.sidebar.getState().selectedId !== e) return s(!1);
                        if (t === bt.c) {
                            const e = {
                                conversation: null,
                                convId: null
                            };
                            this.eventStore.dispatch({
                                type: qe.ConversationListActions.SELECT_CONVERSATION,
                                payload: e
                            }), We.default.send(qe.ConversationListActions.SELECT_CONVERSATION, e), this.sidebar.updateSelectedId(null)
                        }
                        s(!0)
                    }))
                }
                closeAllConversations() {
                    return Promise.resolve(!0)
                }
                deleteConversation(e, t) {
                    return void 0 === t && (t = bt.c), new Promise((async s => {
                        if (this.conversationWillDelete(e), await rt.a.deleteConversation(e, !0, t), t === bt.c) {
                            const t = {
                                userId: null
                            };
                            this.eventStore.dispatch({
                                type: qe.ConversationListActions.SELECT_CONVERSATION,
                                payload: t
                            }), We.default.send(qe.ConversationListActions.SELECT_CONVERSATION, t), this.sidebar.updateSelectedId(null), s(!0), this.conversationDidDelete(e)
                        } else s(!1)
                    }))
                }
                pinConversation(e) {
                    return Promise.resolve(!0)
                }
                renameConversation(e) {
                    return Promise.resolve(!0)
                }
                conversationWillOpen(e) {
                    return qs(`Will open conv ${e}`), Promise.resolve(!0)
                }
                conversationDidOpen(e) {
                    Ws.e.start(Ws.c.open_conversation, e), qs(`Did open conv ${e}`), this.adminSettingController.onLoadSetting(e), setTimeout((() => {
                        this.previewManager.revalidate(e)
                    }), 0)
                }
                conversationWillDelete(e) {
                    return qs(`Will delete conv ${e}`), Promise.resolve()
                }
                conversationDidDelete(e) {
                    qs(`Did delete conv ${e}`)
                }
            }) || zs) || zs) || zs) || zs) || zs) || zs) || zs) || zs;
            var Hs, Zs = s("s9sK"),
                Qs = s("TeMN"),
                Js = s("bUXd"),
                Xs = (s("EHdh"), s("Ln14")),
                Ys = s("bdot"),
                ei = s("cfFl"),
                ti = s.n(ei);
            const si = {
                    userId: v.CONV_FILTER.STRANGER,
                    label: null,
                    isGroup: !1,
                    respondedByMe: !1,
                    numMsg: 0,
                    pinned: 0,
                    outside: 0,
                    topOut: !1,
                    infoCheckSearch: null
                },
                ii = ["userId", "label", "firstSmsLocalId", "lastSmsLocalId", "isGroup", "respondedByMe", "numMsg", "pinned", "outside", "lastActionId", "topOutImprTimeOut", "topOutTimeOut", "syncFromMobile", "topOut", "localType", "infoCheckSearch", "preLastSmsLocalId"];
            Object(ht.b)(Xs.c)(Hs = function (e, t) {
                return l.ModuleContainer.inject(Qs.b)(e, void 0, 0)
            }(Hs = Reflect.metadata("design:type", Function)(Hs = Reflect.metadata("design:paramtypes", [void 0 === ft.IReactiveDB ? Object : ft.IReactiveDB])(Hs = class extends k.b {
                constructor(e) {
                    super(), this.DBConvInfo = e, this.name = void 0, this.key = void 0, this.data = void 0, this.didInit = void 0, this.doneLoadDB = void 0, this.fetchAllHolder = void 0, this.preloadCached = void 0, this._pm = void 0, this.pinEventQueue = void 0, this.labelEventQueue = void 0, this.doneEventQueue = void 0, this.name = Xs.a, this.key = "convId", this.data = new Map, this.didInit = !1, this.doneLoadDB = !1, this.fetchAllHolder = null, this.preloadCached = null, this._pm = null, this.pinEventQueue = [], this.labelEventQueue = [], this.doneEventQueue = !1
                }
                get previewManager() {
                    return this._pm || (this._pm = l.ModuleContainer.resolve(lt.g)), this._pm
                }
                get unreadManager() {
                    return it.a.UnreadDataManager
                }
                init() {
                    return this.didInit ? Promise.resolve() : (this.didInit = !0, this.loadData())
                }
                async loadData() {
                    this.fetchAllHolder || (this.fetchAllHolder = this.DBConvInfo.getAll());
                    const e = await this.fetchAllHolder.catch((e => {
                            $e.default.logCoreInfo(`[${this.name}] - load conv from DB got error ${e}`)
                        })) || [],
                        t = await this.onLoadDataFromDB(e);
                    $e.default.logCoreInfo(`[${this.name}] - done load db ${e.length}`), this.doneLoadDB = !0, this.doIdleTask(), this.broadcastEvent(ft.b.DoneLoadDB, "", e), this.previewManager.migrate(t.map((e => e.userId))), this.setCacheData(v.CONV_FILTER.STRANGER, si, !0)
                }
                async doIdleTask() {
                    const e = this.pinEventQueue.slice(),
                        t = this.labelEventQueue.slice();
                    this.pinEventQueue = [], this.labelEventQueue = [];
                    const s = ti.a.series(e),
                        i = ti.a.series(t);
                    return Promise.all([s, i]).then((e => this.pinEventQueue.length || this.labelEventQueue.length ? this.doIdleTask() : (this.doneEventQueue = !0, e)))
                }
                getItem(e, t) {
                    return this.data.get(e.key)
                }
                getList(e, t) {
                    return e.key === Xs.b.ALL ? Array.from(this.data.keys()) : []
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                async onLoadDataFromDB(e) {
                    const t = await pt.a.filterOutdatedConv(e);
                    $e.default.logCoreInfo(`[${this.name}] - done filter outdate ${e.length} ${t.length}`);
                    const s = (new Date).getTime().toString(),
                        n = [];
                    Object(je.i)(s);
                    for (let a = 0; a < t.length; a++) {
                        if (!t[a].userId) continue;
                        const e = Object(i.a)({}, t[a]),
                            r = this.data.get(e.userId);
                        if (e.verified = !0, void 0 === e.isGroup && (e.isGroup = e.userId.startsWith(v.GROUPID_PREFIX)), r) {
                            if (!r.verified) {
                                const t = this.mergeConv(e, r);
                                t.verified = !0, this.setCacheData(e.userId, t), Object(je.f)(s, this.name, e.userId), this.updateInDB(t)
                            }
                        } else this.setCacheData(e.userId, e), Object(je.f)(s, this.name, e.userId);
                        e.infoCheckSearch && (e.infoCheckSearch && $e.default.msgTypeValid(e.infoCheckSearch.lastType) ? zt.a.pushCacheLastChat(e.userId, e.infoCheckSearch.lastMessageTime) : e.numMsg && e.numMsg > 1 && n.push(e.userId))
                    }
                    return n.length > 0 && zt.a.cacheCheckLastChatInDb(n), Object(je.c)(s), t
                }
                onReceiveNewMessages(e, t, s) {
                    return void 0 === s && (s = {
                        outside: void 0,
                        isGroup: !1
                    }), new Promise(((n, a) => {
                        var r;
                        if (!t || t.length < 0) return a("Empty msgs");
                        const o = t[t.length - 1],
                            l = t[0],
                            d = this.data.get(e),
                            c = pt.a.getLastValidMsg(t);
                        let h;
                        c && (h = {
                            lastMessageTime: Number(c.sendDttm),
                            lastType: c.msgType
                        }, zt.a.pushCacheLastChat(e, h.lastMessageTime));
                        const u = {
                            userId: e,
                            firstSmsLocalId: l.msgId,
                            isGroup: s.isGroup || e.startsWith(v.GROUPID_PREFIX),
                            numMsg: t.length,
                            respondedByMe: At.b.includeMyMessage(t),
                            pinned: 0,
                            label: null,
                            topOut: o.topOut,
                            verified: !1,
                            lastSmsLocalId: o.msgId,
                            outside: s.outside,
                            cloudMore: !1,
                            infoCheckSearch: h
                        };
                        if (this.preloadCached && this.preloadCached.onNewMsg(e, o), d) {
                            const t = this.mergeConv(Object(i.a)({}, d), u);
                            this.setCacheData(e, t), this.shouldSignalUpdate(d, t) && Object(je.g)(this.name, e), d.verified && this.updateInDB(t), n(t)
                        } else {
                            const t = It.b.getLabelObjByConversaionId(e);
                            if (u.label = t ? t.id : null, this.setCacheData(e, u, !0), this.doneLoadDB) return u.verified = !0, this.updateInDB(u), n(u);
                            this.DBConvInfo.getById(e).then((t => {
                                const s = this.data.get(e);
                                if (!s) return a("Internal logic handle wrong");
                                let r = Object(i.a)({}, s);
                                r.verified = !0, t ? s.verified || (r = this.mergeConv(r, t), this.setCacheData(e, r), this.shouldSignalUpdate(r, s) && Object(je.g)(this.name, e), this.updateInDB(r)) : this.updateInDB(r), n(r)
                            }))
                        }
                        d && d.respondedByMe || null === (r = this.data.get(e)) || void 0 === r || !r.respondedByMe || ($e.default.logCoreInfo(`[${this.name}] - Detect first my msg ${e} ${o.msgId}`), this.previewManager.forceChangeItem(e))
                    }))
                }
                async onDeleteMessages(e, t) {
                    const s = this.data.get(e);
                    if ($e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #1 ${e} ${t.length}`), s && s.verified) {
                        let n = !1;
                        if (t.find((e => {
                                let {
                                    msgId: t
                                } = e;
                                return s.firstSmsLocalId === t
                            }))) {
                            const t = await (await Ys.b.getFirstMessage(e)).firstMsg;
                            if (!t) return $e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #4 ${e} `), this.forkDeleteCacheAndDB(e), {
                                deletedId: e
                            };
                            s.firstSmsLocalId = null == t ? void 0 : t.msgId, n = !0
                        }
                        if (t.find((e => {
                                let {
                                    msgId: t
                                } = e;
                                return s.lastSmsLocalId === t
                            }))) {
                            const t = await Ys.b.getLastMessage(e, s.lastSmsLocalId);
                            if (!t || t.length < 1) return $e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #5 ${e} ${!!t}`), this.forkDeleteCacheAndDB(e), {
                                deletedId: e
                            };
                            s.lastSmsLocalId = t[0].msgId, n = !0
                        }
                        return $e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #6 ${e} ${n}`), n && (this.setCacheData(e, Object(i.a)({}, s)), this.updateInDB(s)), {
                            conversation: s,
                            updated: n
                        }
                    } {
                        const t = await (await Ys.b.getFirstMessage(e)).firstMsg,
                            s = await Ys.b.getLastMessage(e),
                            n = s && s[0];
                        if (!t || !n) return $e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #2 ${e} ${!!t} ${!!n}`), it.a.PinDataManager.isPinned(e) || this.onDeleteConversation(e), {
                            deletedId: e
                        };
                        const a = await this.DBConvInfo.getById(e);
                        let r = $e.default.msgTypeValid(n) ? {
                            lastMessageTime: n.sendDttm,
                            lastType: n.msgType
                        } : void 0;
                        if ($e.default.logCoreInfo(`[${this.name}] - onDeleteMessages #3 ${e} ${!!a}`), a) {
                            let s = !1;
                            a.firstSmsLocalId !== (null == t ? void 0 : t.msgId) && (a.firstSmsLocalId = null == t ? void 0 : t.msgId, s = !0), a.lastSmsLocalId !== n.msgId && (a.lastSmsLocalId = null == n ? void 0 : n.msgId, s = !0);
                            const r = Object(i.a)(Object(i.a)({}, a), {}, {
                                verified: !0
                            });
                            return this.setCacheData(e, r, !0), s && this.updateInDB(r), {
                                conversation: r,
                                updated: !0
                            }
                        } {
                            const s = {
                                userId: e,
                                isGroup: e.startsWith(v.GROUPID_PREFIX),
                                pinned: 0,
                                label: null,
                                topOut: void 0,
                                verified: !0,
                                outside: null,
                                cloudMore: !1,
                                firstSmsLocalId: t.msgId,
                                lastSmsLocalId: n.msgId,
                                numMsg: 2,
                                respondedByMe: "0" == t.fromUid || "0" == n.fromUid,
                                infoCheckSearch: r
                            };
                            return this.setCacheData(e, s, !0), this.updateInDB(s), {
                                conversation: s,
                                updated: !0
                            }
                        }
                    }
                }
                mergeConv(e, t) {
                    return (!e.lastSmsLocalId || t.lastSmsLocalId && t.lastSmsLocalId > e.lastSmsLocalId) && (e.preLastSmsLocalId = e.lastSmsLocalId || t.lastSmsLocalId, e.lastSmsLocalId = t.lastSmsLocalId, e.outside = t.outside), e.numMsg = (e.numMsg || 0) + t.numMsg, e.respondedByMe = e.respondedByMe || t.respondedByMe, (!e.firstSmsLocalId || t.firstSmsLocalId && t.firstSmsLocalId < e.firstSmsLocalId) && (e.firstSmsLocalId = t.firstSmsLocalId), (!e.infoCheckSearch || !e.infoCheckSearch.lastMessageTime || t.infoCheckSearch && t.infoCheckSearch.lastMessageTime > e.infoCheckSearch.lastMessageTime) && (e.infoCheckSearch = t.infoCheckSearch), e.preLastSmsLocalId || (e.preLastSmsLocalId = t.lastSmsLocalId), !t.respondedByMe && t.topOut && (e.topOut = t.topOut), "string" != typeof e.firstSmsLocalId && (e.firstSmsLocalId = "" + e.firstSmsLocalId), e
                }
                async onEmptyConversation(e) {
                    const t = await this.getConvById(e);
                    if ($e.default.logCoreInfo(`[${this.name}] - onEmptyConversation ${e} ${!!t}`), !t) return;
                    const s = Object(i.a)({}, t);
                    return delete s.firstSmsLocalId, delete s.lastSmsLocalId, s.numMsg = 0, s.respondedByMe = !1, this.setCacheData(e, s, !0), this.broadcastEvent(ft.b.EmptyConv, e), Object(je.g)(this.name, e), it.a.PinDataManager.isPinned(e) && it.a.PinDataManager.unpin([e]), this.updateInDB(s)
                }
                onDeleteConversation(e) {
                    $e.default.logCoreInfo(`[${this.name}] - onDeleteConversation ${e}`);
                    const t = this.data.get(e);
                    return this.doDeleteConversation(e).then((s => {
                        this.broadcastEvent(ft.b.DeleteConv, e, t)
                    }))
                }
                doDeleteConversation(e) {
                    const t = this.data.get(e);
                    return $e.default.logCoreInfo(`[${this.name}] - doDeleteConversation ${e} ${!!t}`), t && (this.data.delete(e), Object(je.e)(this.name, e)), it.a.PinDataManager.isPinned(e) && it.a.PinDataManager.unpinLocal([e]), this.deleteInDB(e)
                }
                onPinConversation(e, t) {
                    return new Promise((s => {
                        this.doneEventQueue ? this.doUpdatePin(e, t).then(s) : this.pinEventQueue.push((async () => {
                            const i = await this.doUpdatePin(e, t);
                            s(i)
                        }))
                    }))
                }
                doUpdatePin(e, t) {
                    if (t && pt.a.isStrangerV2(e)) return Promise.resolve(null);
                    if (!this.data.get(e)) {
                        if (!t) return Promise.resolve(null);
                        const s = this.getEmptyConv(e);
                        s.verified = !0, this.setCacheData(e, s)
                    }
                    const s = new Map;
                    return s.set("pinned", t), this.updateFields(e, s).then((s => (this.broadcastEvent(ft.b.ChangePinConv, e, t), s))).catch((t => ($e.default.logCoreInfo(`[${this.name}] - doUpdatePin err`, t), this.data.get(e))))
                }
                onLeaveGroup(e) {
                    return $e.default.logCoreInfo(`[${this.name}] - onLeaveGroup ${e}`), this.doDeleteConversation(e).then((t => {
                        this.broadcastEvent(ft.b.LeaveGroup, e)
                    }))
                }
                async onChangeConvLabel(e, t) {
                    return new Promise((s => {
                        const i = this.data.get(e);
                        if (i && i.label === t) return s(i);
                        this.doneEventQueue ? this.doUpdateConvLabel(e, t).then(s) : this.labelEventQueue.push((async () => {
                            const i = await this.doUpdateConvLabel(e, t);
                            s(i)
                        }))
                    }))
                }
                doUpdateConvLabel(e, t) {
                    if (!e) return $e.default.logCoreInfo(`[${this.name}] - doUpdateConvLabel with undefined ${t}`), Promise.resolve(null);
                    const s = this.data.get(e);
                    if (s && s.label === t) return Promise.resolve(s);
                    if (!s) {
                        if (!t) return Promise.resolve(null);
                        const s = this.getEmptyConv(e);
                        s.verified = !0, this.setCacheData(e, s)
                    }
                    const i = new Map;
                    return i.set("label", t), this.updateFields(e, i).then((i => (this.unreadManager.onChangeConvLabel(e, null == s ? void 0 : s.label, t), i)))
                }
                onFetchConvLabels(e) {
                    if (!e || !Array.isArray(e)) return;
                    $e.default.logCoreInfo(`[${this.name}] - onChangeConvLabel ${e.length}`);
                    const t = {};
                    this.getAllConv().then((s => {
                        for (let e = 0; e < s.length; e++) t[s[e].userId] = 1;
                        for (let i = 0; i < e.length; i++) {
                            const s = e[i].id,
                                n = e[i].conversations;
                            if (n)
                                for (let e = 0; e < n.length; e++) {
                                    const i = n[e];
                                    delete t[i], this.onChangeConvLabel(i, s)
                                }
                        }
                        for (const e in t) Object.hasOwnProperty.call(t, e) && this.onChangeConvLabel(e, null)
                    }))
                }
                onDeleteConvLabels(e) {
                    $e.default.logCoreInfo(`[${this.name}] - onDeleteConvLabels ${e.length}`), e.forEach((e => {
                        const t = e.conversations;
                        if (t && t.length)
                            for (let s = 0; s < t.length; s++) this.data.has(t[s]) && this.onChangeConvLabel(t[s], null)
                    }))
                }
                async onUpdateMsgId(e, t, s) {
                    if (!t || !s || t === s) return Promise.reject("[Conv-info-manager]- call update with invalid params!");
                    const i = this.data.get(e);
                    let n = i || {},
                        a = !1;
                    if (!i || !i.verified) {
                        const t = await this.DBConvInfo.getById(e);
                        if (!i && !t) {
                            const t = await this.createEmptyConvForUser(e, 0, void 0, {
                                firstSmsLocalId: s,
                                lastSmsLocalId: s
                            });
                            return this.setCacheData(e, t), t
                        }
                        i && t ? (n = this.mergeConv(i, t), a = !0) : (n = i || t, n.verified = !0, a = !0)
                    }
                    return n.firstSmsLocalId && n.firstSmsLocalId !== t || (a = !0, n.firstSmsLocalId = s), n.lastSmsLocalId && n.lastSmsLocalId !== t || (a = !0, n.lastSmsLocalId = s), a && (this.setCacheData(e, n), this.updateInDB(n)), n
                }
                async addOrUpdateConv(e, t, s, n, a, r) {
                    "number" == typeof t && (t = "" + t), "number" == typeof s && (s = "" + s);
                    const o = this.data.get(e);
                    $e.default.logCoreInfo(`[${this.name}] - addOrUpdateConv ${e} ${!!o} ${s}`);
                    const l = e => ((!e.firstSmsLocalId || t && t < e.firstSmsLocalId) && (e.firstSmsLocalId = t), (!e.lastSmsLocalId || s && s > e.lastSmsLocalId) && (e.lastSmsLocalId = s), e.cloudMore = n, e.respondedByMe = e.respondedByMe || a, e.numMsg = (e.numMsg || 0) + r, e);
                    if (o && o.verified) {
                        const t = l(o);
                        return this.setCacheData(e, Object(i.a)({}, t)), this.updateInDB(t), t
                    } {
                        const o = await this.DBConvInfo.getById(e);
                        if ($e.default.logCoreInfo(`[${this.name}] - addOrUpdateConv #2 ${e} ${!!o}`), o) {
                            const t = l(o);
                            return this.setCacheData(e, Object(i.a)(Object(i.a)({}, t), {}, {
                                verified: !0
                            })), this.updateInDB(t), t
                        } {
                            const i = {
                                userId: e,
                                firstSmsLocalId: t,
                                lastSmsLocalId: s,
                                isGroup: e.startsWith(v.GROUPID_PREFIX),
                                respondedByMe: a,
                                numMsg: r || 2,
                                label: null,
                                pinned: 0,
                                verified: !0,
                                cloudMore: n,
                                outside: null,
                                topOut: null,
                                infoCheckSearch: void 0
                            };
                            return this.setCacheData(e, i, !0), this.updateInDB(i), i
                        }
                    }
                }
                async addIfNotExistsConv(e, t, s, i, n, a) {
                    const r = this.data.get(e);
                    if ($e.default.logCoreInfo(`[${this.name}] - addIfNotExistsConv #1 ${e} ${!!r} ${i}`), r) return !1;
                    const o = await this.DBConvInfo.getById(e);
                    if ($e.default.logCoreInfo(`[${this.name}] - addIfNotExistsConv #2 ${!!o}`), o) return !1; {
                        const r = {
                            userId: e,
                            firstSmsLocalId: s,
                            lastSmsLocalId: i,
                            isGroup: t || e.startsWith(v.GROUPID_PREFIX),
                            respondedByMe: n,
                            numMsg: a || 1,
                            label: null,
                            pinned: 0,
                            verified: !0,
                            outside: null,
                            topOut: null,
                            infoCheckSearch: void 0
                        };
                        return this.setCacheData(e, r, !0), this.updateInDB(r), !0
                    }
                }
                createEmptyConvForUser(e, t, s, n) {
                    return void 0 === s && (s = v.CONV_OT_STATE.none), new Promise(((a, r) => {
                        this.getConvById(e).then((a => {
                            let r;
                            if ($e.default.logCoreInfo(`[${this.name}] - createEmptyConvForUser ${e} ${!!a}`), a) {
                                const i = new Map;
                                return r = a, s !== v.CONV_OT_STATE.none && void 0 !== s && (r.outside = s, i.set("outside", s)), t && !it.a.PinDataManager.isPinned(r.userId) && it.a.PinDataManager.pin([r.userId]), this.updateFields(e, i), r
                            }
                            return r = Object(i.a)({
                                userId: e,
                                lastMessageTime: t ? 0 : Js.a.getTimeNow(),
                                isGroup: e.startsWith(v.GROUPID_PREFIX)
                            }, n), s !== v.CONV_OT_STATE.none && void 0 !== s && (r.outside = s), t && it.a.PinDataManager.pin([r.userId]), r.verified = !0, this.setCacheData(e, r, !0), this.updateInDB(r), r
                        })).then((e => {
                            a(e)
                        })).catch((e => {
                            $e.default.logCoreError(e), r(e)
                        }))
                    }))
                }
                updateLastMsgId(e, t) {
                    const s = this.data.get(e);
                    if (s && s.lastSmsLocalId === t) return Promise.resolve(s);
                    const i = new Map;
                    return i.set("lastSmsLocalId", t), this.updateFields(e, i)
                }
                updateInfoCheckSearch(e, t, s) {
                    const i = this.data.get(e);
                    if (i && i.infoCheckSearch && i.infoCheckSearch.lastMessageTime === t) return Promise.resolve(i);
                    const n = new Map;
                    return n.set("infoCheckSearch", {
                        lastMessageTime: t,
                        lastType: s
                    }), this.updateFields(e, n)
                }
                updateConvSetting(e, t) {
                    let s = this.data.get(e);
                    if (!s) {
                        const i = !!this.doneLoadDB;
                        s = {
                            userId: e,
                            verified: i
                        }, i || $e.default.logCoreInfo(`[${this.name}] - update conv setting before done load db ${e}`, t)
                    }
                    $e.default.shallowEqual(s.setting, t) || (s.setting = t, this.setCacheData(e, s, !0), $e.default.logCoreInfo(`[${this.name}] - update conv setting for conv ${e}`, t))
                }
                async isRespondedByMe(e) {
                    const t = await this.getConvById(e);
                    return !!t && Boolean(t.respondedByMe)
                }
                isRespondedByMeSync(e) {
                    const t = this.data.get(e);
                    return !!t && Boolean(t.respondedByMe)
                }
                isDoneLoadDB() {
                    return this.doneLoadDB
                }
                getConvByIdSync(e) {
                    return "string" != typeof e && $e.default.logCoreInfo(`[${this.name}] - getConvByIdSync with invalid id type`, e, !!this.data.get(e), !!this.data.get("" + e)), this.data.get(e)
                }
                getConvById(e) {
                    return new Promise(((t, s) => {
                        if (this.data.has(e)) return t(this.data.get(e));
                        this.DBConvInfo.getById(e).then((e => {
                            t(e)
                        })).catch(s)
                    }))
                }
                getAllConvSync() {
                    return Array.from(this.data.values()) || []
                }
                getAllConv() {
                    return new Promise(((e, t) => {
                        if (this.doneLoadDB) {
                            return e(this.getAllConvSync())
                        }
                        this.fetchAllHolder || (this.fetchAllHolder = this.DBConvInfo.getAll()), this.fetchAllHolder.then(e).catch(t)
                    }))
                }
                getAllConvIdsSync() {
                    return Array.from(this.data.keys())
                }
                setPreloadCache(e) {
                    this.preloadCached = e
                }
                onDoneSyncMobile() {
                    $e.default.logCoreInfo(`[${this.name}] - onDoneSyncMobile`), this.getAllConv().then((e => {
                        e && this.previewManager.migrate(e.map((e => e.userId)), !0)
                    }))
                }
                setCacheData(e, t, s) {
                    void 0 === s && (s = !1), this.data.set(t.userId, t), s && Object(je.g)(this.name, e)
                }
                updateFields(e, t) {
                    return new Promise(((s, n) => {
                        const a = this.data.get(e),
                            r = a => {
                                $e.default.logCoreInfo(`[${this.name}] - updateFields #2`);
                                const r = Object(i.a)({}, a);
                                t.forEach(((e, t) => {
                                    r[t] = e
                                })), this.setCacheData(e, r, !0), this.updateInDB(r).then((() => {
                                    s(r)
                                })).catch(n)
                            };
                        a ? r(a) : this.DBConvInfo.getById(e).then((e => {
                            e && r(e)
                        }))
                    }))
                }
                forkDeleteCacheAndDB(e) {
                    if ($e.default.logCoreInfo(`[${this.name}] - forkDeleteCacheAndDB ${e}`), !it.a.PinDataManager.isPinned(e)) {
                        const t = this.data.get(e);
                        $e.default.logCoreInfo(`[${this.name}] - forkDeleteCacheAndDB ${e} ${!!t}`), this.data.delete(e), Object(je.e)(this.name, e), this.deleteInDB(e).then((s => {
                            this.broadcastEvent(ft.b.DeleteConv, e, t)
                        }))
                    }
                }
                broadcastEvent(e, t, s) {
                    void 0 === t && (t = ""), this.dispatchEvent(new ft.a(e, t, s))
                }
                shouldSignalUpdate(e, t) {
                    return it.a.PinDataManager.isPinned(e.userId) !== it.a.PinDataManager.isPinned(t.userId) || e.label !== t.label || e.respondedByMe !== t.respondedByMe
                }
                cleanConversation(e) {
                    return Object.keys(e).forEach((t => {
                        ii.includes(t) || delete e[t]
                    })), e
                }
                getEmptyConv(e) {
                    return {
                        userId: e,
                        isGroup: e.startsWith(v.GROUPID_PREFIX),
                        numMsg: 0,
                        respondedByMe: !1,
                        pinned: 0,
                        label: null,
                        outside: null,
                        infoCheckSearch: null,
                        topOut: null
                    }
                }
                updateInDB(e) {
                    const t = this.cleanConversation(Object(i.a)({}, e));
                    return this.DBConvInfo.addOrUpdate(t).catch((e => {
                        $e.default.logCoreInfo(`[${this.name}] - updateInDB got error ${e}`)
                    }))
                }
                deleteInDB(e) {
                    return this.DBConvInfo.remove(e).catch((e => {
                        $e.default.logCoreInfo(`[${this.name}] - deleteInDB got error ${e}`)
                    }))
                }
            }) || Hs) || Hs) || Hs);
            var ni = s("NSWB"),
                ai = s("1Abx"),
                ri = s("XEtq"),
                oi = s("ZRfj"),
                li = s("EqtE"),
                di = s("oH3T"),
                ci = s("13iL"),
                hi = s("mea/"),
                ui = s("MPLC"),
                gi = s("WK05");
            var mi, pi = s("RVT8"),
                fi = s("hkvp"),
                vi = s("6tnf"),
                bi = s("sg3c"),
                Ii = s("4pY7"),
                yi = s("ofhN"),
                Ci = s("D8f9");
            const Si = "9999999999999999",
                _i = "zum_m",
                Ei = "1.0.0",
                Li = !1,
                wi = "total",
                Mi = e => ({
                    convId: e,
                    smsUnreadCount: 0,
                    smsUnreadNotCount: 0,
                    mentionUnreadCount: 0,
                    strangerUnreadCount: 0,
                    lastProcessMsgId: "",
                    lastSeenReactId: "",
                    unreadMark: void 0
                }),
                Ti = {
                    CALL_INIT: !1
                },
                Fi = 1,
                Oi = 2;
            Object(ht.b)(pi.b)(mi = function (e, t) {
                return l.ModuleContainer.inject(fi.b)(e, void 0, 0)
            }(mi = Reflect.metadata("design:type", Function)(mi = Reflect.metadata("design:paramtypes", [void 0 === ft.IReactiveDB ? Object : ft.IReactiveDB])(mi = class extends k.b {
                constructor(e) {
                    super(), this.DBConvUnread = e, this.name = void 0, this.key = void 0, this.didInit = void 0, this.doneLoadDB = void 0, this.data = void 0, this.pendingMessage = void 0, this.previewMsgs = void 0, this.pendingClearUnread = void 0, this.fetchAllHolder = void 0, this.total = void 0, this.loadState = Ti, this.isLoadDBStarted = void 0, this.updateTotalQueue = void 0, this._logger = void 0, this.setupQueue = () => Object(ei.queue)((async e => {
                        this.doneLoadDB && await this.calculateComputeUnreadCount(e)
                    }), 1), this._getDeletedMsgByTTLItem = (e, t) => {
                        if (t) return t.find((t => e.msgId ? e.msgId === t.msgId : e.cliMsgId === t.cliMsgId))
                    }, this.name = pi.a, this.key = "convId", this.didInit = !1, this.doneLoadDB = !1, this.data = new Map, this.isLoadDBStarted = !1, this.pendingMessage = new Map, this.previewMsgs = [], this.pendingClearUnread = new Map, this.fetchAllHolder = null, this.total = this.getEmptyTotal(), this.updateTotalQueue = this.setupQueue()
                }
                init() {
                    this.didInit || (this.logger.zsymb(3, 9646, 3e4, "call init unread"), this.didInit = !0, this.addListener(), this.onState("CALL_INIT"))
                }
                onState(e) {
                    this.loadState[e] = !0;
                    const t = Object.values(this.loadState).every((e => !0 === e));
                    t && !this.isLoadDBStarted && (this.logger.zsymb(3, 9646, 30001, "done all state, ready to load db..."), this.loadData())
                }
                get logger() {
                    return this._logger || (this._logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.conversation, [jt.b.unread])), this._logger
                }
                getEmptyTotal() {
                    return {
                        convId: "total",
                        smsUnreadCount: 0,
                        smsUnreadNotCount: 0,
                        mentionUnreadCount: 0,
                        strangerUnreadCount: 0,
                        lastProcessMsgId: "0",
                        lastSeenReactId: "0",
                        unreadMark: 0,
                        smsUnreadNomute: 0
                    }
                }
                loadData() {
                    const e = u.a.getInstance().getItemForCurrentUser(_i);
                    if (e === Ei) this.isLoadDBStarted = !0, this.logger.zsymb(3, 9646, 30002, "start load unread {}", e), this.fetchAllHolder || (this.fetchAllHolder = this.DBConvUnread.getAll()), this.fetchAllHolder.then((e => {
                        this.onLoadUnreadFromDBV2(Oi, e), this.doDoneLoadDBTask()
                    }));
                    else {
                        it.a.ConvInfoDataManager.isDoneLoadDB() && (this.isLoadDBStarted = !0, this.migrateV2())
                    }
                }
                async migrateV2() {
                    const e = u.a.getInstance(),
                        t = e.getItemForCurrentUser(_i) === Ei;
                    if (this.logger.zsymb(3, 9646, 30003, "call migrate unread {}", t), t) return;
                    const s = it.a.ConvInfoDataManager.getAllConvSync(),
                        i = [];
                    s.forEach((e => {
                        const t = e.smsUnreadCount || 0,
                            s = e.smsUnreadNotCount || 0,
                            n = e.mentionUnreadCount || 0,
                            a = e.unreadMark || null;
                        if (!(e && e.userId && (t || s || n || a))) return;
                        const r = {
                            convId: e.userId,
                            smsUnreadCount: t,
                            smsUnreadNotCount: s,
                            strangerUnreadCount: 0,
                            mentionUnreadCount: n,
                            lastProcessMsgId: e.lastMessageIdFromServerv2 || "0",
                            lastSeenReactId: e.lastSeenReactId || "0",
                            unreadMark: a
                        };
                        i.push(r)
                    })), this.onLoadUnreadFromDBV2(Fi, i), this.doDoneLoadDBTask(), this.logger.zsymb(3, 9646, 30004, "done migrate unread {}", i.length), e.setItemForCurrentUser(_i, Ei)
                }
                doDoneLoadDBTask() {
                    const e = Array.from(this.data.values());
                    this.doneLoadDB = !0, this.broadcastEvent(ft.b.DoneLoadDB, "total", e), this.logger.zsymb(3, 9646, 30005, "done load unread {}", e.length), l.ModuleContainer.resolve(Ii.a).onLoadUnreads(e), setTimeout((() => {
                        this.unreadChanged("init")
                    }), 200)
                }
                addListener() {
                    it.a.MuteDataManager.addEventListener(ft.b.MuteChanged, (e => {
                        this.onMuteConversation(e.convId, !!e.payload)
                    })), it.a.ConvInfoDataManager.addEventListener(ft.b.LeaveGroup, (e => {
                        this.doDeleteUnread(e.convId)
                    })), it.a.ConvInfoDataManager.addEventListener(ft.b.DeleteConv, (e => {
                        this.doDeleteUnread(e.convId)
                    })), it.a.ConvInfoDataManager.addEventListener(ft.b.EmptyConv, (e => {
                        this.doDeleteUnread(e.convId)
                    })), it.a.ConvInfoDataManager.addEventListener(ft.b.DoneLoadDB, (e => {
                        this.onState("CALL_INIT")
                    })), We.default.subscribe(((e, t) => {
                        if (e === qe.ConversationListActions.CLEAR_MARK_AS_UNREAD) t.forEach((e => {
                            this.updateUnreadMark(e, null)
                        }));
                        else if (e === qe.GeneralActions.UPDATE_HIDDEN_CHAT)
                            for (let s = 0; s < t.length; s++) {
                                const e = t[s];
                                this.onHiddenConversation(e.uid, e.isHide)
                            }
                    }))
                }
                getItem(e, t) {
                    if (e.key === wi) return this.total;
                    return this.data.get(e.key)
                }
                getList(e, t) {
                    return Array.from(this.data.keys())
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {
                    throw new Error("Method not implemented.")
                }
                onMuteConversation(e, t) {
                    const s = this.data.get(e);
                    !s || s.smsUnreadCount < 1 && !s.unreadMark || vt.a.isThreadHidden(e) || pt.a.isOAType({
                        userId: e
                    }) || (this.logger.zsymb(0, 9646, 30006, "onMuteConversation:", e, t, s.smsUnreadCount, s.smsUnreadNotCount), this.unreadChanged(e))
                }
                onHiddenConversation(e, t) {
                    const s = this.data.get(e);
                    !s || s.smsUnreadCount < 1 && !s.unreadMark || de.default.isMuted(e) || pt.a.isOAType({
                        userId: e
                    }) || (this.logger.zsymb(0, 9646, 30007, "onHiddenConversation: ", e, t, s.smsUnreadCount, s.smsUnreadNotCount), this.unreadChanged(e))
                }
                onChangeConvLabel(e, t, s) {
                    const i = this.data.get(e);
                    t === s || !i || i.smsUnreadCount < 1 || de.default.isMuted(e) || this.unreadChanged(e)
                }
                onReceivePreviewMessages(e) {
                    e.length > 0 && (this.previewMsgs = [...this.previewMsgs, ...e])
                }
                onReceiveNewMessagesOld(e, t, s) {
                    if (!s || !t) return;
                    const i = this.data.get(e);
                    if (i) this.logger.zsymb(0, 9646, 30008, "receive msg", e, i.lastProcessMsgId, s), (!i.lastProcessMsgId || i.lastProcessMsgId < t) && (this.handleNewMessages(e, s, t), Object(je.g)(this.name, e));
                    else {
                        const t = this.pendingMessage.get(e),
                            i = t ? s.concat(t) : s;
                        this.pendingMessage.set(e, i), i.length === s.length && this.DBConvUnread.getById(e).then((t => {
                            if (!t) {
                                const t = this.pendingMessage.get(e);
                                if (t) {
                                    const s = t.filter(((e, t, s) => s.indexOf(e) === t)),
                                        i = At.b.getLastMessageInList(s);
                                    if (!i) return;
                                    this.pendingMessage.delete(e), this.handleNewMessages(e, s, i.msgId), Object(je.g)(this.name, e)
                                }
                            }
                        }))
                    }
                }
                onReceiveNewMessages(e, t, s) {
                    if (!s || !s.length || !t) return;
                    const i = this.data.get(e);
                    if (this.doneLoadDB) {
                        if (!i || !i.lastProcessMsgId || i.lastProcessMsgId < t) {
                            const n = s.map((e => e.msgId)).join("-");
                            this.logger.zsymb(0, 9646, 30009, `onReceiveNewMessages: ${null==i?void 0:i.lastProcessMsgId} ${e} ${t} ${n}`), this.handleNewMessages(e, s, t), Object(je.g)(this.name, e)
                        }
                    } else {
                        const t = this.pendingMessage.get(e),
                            i = t ? s.concat(t) : s;
                        this.pendingMessage.set(e, i)
                    }
                }
                doDeleteUnread(e) {
                    if (!e) return;
                    const t = this.data.get(e);
                    this.logger.zsymb(0, 9646, 30010, `doDeleteUnread ${!!t}`), this.data.delete(e) && (Object(je.e)(this.name, e), this.unreadChanged(e)), this.deleteInDB(e)
                }
                onReceiveDeleteConvMsg(e, t) {
                    if (this.doneLoadDB) {
                        const s = this.safeGetUnreadCached(e);
                        if (0 === s.smsUnreadCount) return;
                        if (t >= +s.lastProcessMsgId) {
                            const t = Object(i.a)(Object(i.a)({}, s), {}, {
                                smsUnreadCount: 0,
                                smsUnreadNotCount: 0
                            });
                            this.data.set(t.convId, t), Object(je.g)(this.name, e), this.unreadChanged(e)
                        }
                    } else this.pendingClearUnread.set(e, t)
                }
                onClearUnreadConversations(e) {
                    if (!e || e.length < 0) return;
                    let t = [];
                    for (let s = 0; s < e.length; s++) {
                        const i = e[s],
                            n = this.data.get(i.userId) || Mi(i.userId);
                        this.logger.zsymb(0, 9646, 30011, "onClearUnreadConversations", !!i, null == n ? void 0 : n.smsUnreadCount), i && (t.push(i.userId), n.smsUnreadCount > 0 && de.default.getLastMessageFrom(i.userId, i.lastSmsLocalId, Si, n.smsUnreadCount, !0).then((e => {
                            let t = {};
                            if (e && e.length > 0)
                                for (let i = 0; i < e.length; i++) {
                                    let s = e[i];
                                    $e.default.validMessageFromOther(s) && (t[s.msgId] = s)
                                }
                            const s = {
                                userId: i.userId,
                                lastSmsLocalId: i.lastSmsLocalId,
                                smsUnreadCount: n.smsUnreadCount
                            };
                            this.clearUnreadConversation(s, t), this.resetUnreadToZero(i.userId, n.lastProcessMsgId)
                        })).catch((e => {
                            this.logger.zsymb(21, 9646, 30012, "clear unread conv failure {}", e)
                        })), gi.a.clearUnreadIfExist({
                            userId: i.userId,
                            lastSeenReactId: n.lastSeenReactId
                        }))
                    }
                    li.a.clearUnreadMark(t, e.length)
                }
                onReadConversation(e, t) {
                    var s;
                    if (He.default.mark_unread.enable && !li.a.canSendUnread(e)) return this.logger.zsymb(0, 9646, 30013, `[read-message] dont clear ${e}`, He.default.mark_unread.enable, li.a.canSendUnread(e)), !1;
                    li.a.getUnreadMark(e) && (e.startsWith(v.GROUPID_PREFIX) ? gt.e.logAction(2160024) : gt.e.logAction(2160023), gt.e.logAction(2160022));
                    const n = this.data.get(e) || Mi(e),
                        a = n.smsUnreadCount;
                    if (!t && !a) {
                        this.logger.zsymb(0, 9646, 30014, `[read-message] dont clear ${e} unread `, a, t);
                        const s = gi.a.sendClearUnread(e, n.lastSeenReactId);
                        return li.a.clearUnreadMark([e], 0), s != n.lastSeenReactId && (n.lastSeenReactId = s, this.data.set(e, Object(i.a)({}, n)), Object(je.g)(this.name, e), this.updateInDB(n)), !1
                    }
                    const r = this.acquireConvManager().getConvByIdSync(e);
                    if (!r) return this.logger.zsymb(0, 9646, 30015, `[read-message] convinfo not exists ${e}`), !1;
                    const o = [],
                        l = {},
                        d = r.lastSmsLocalId ? r.lastSmsLocalId.toString().split("_")[0] : "";
                    let c = !1;
                    const h = null === (s = ui.b.messageCache) || void 0 === s ? void 0 : s.getLast({
                        userId: e
                    }, a);
                    for (let i = h.length - 1; i > -1; i--) {
                        let e = h[i];
                        if ($e.default.validMessageFromOther(e) && e.zglobalMsgId && -1 != e.zglobalMsgId && !o.includes(e.zglobalMsgId) && (o.push(e.zglobalMsgId), l[e.zglobalMsgId] = e, e.zglobalMsgId == d && (c = !0), o.length == a)) break
                    }
                    const u = {
                        userId: e,
                        lastSmsLocalId: r.lastSmsLocalId,
                        smsUnreadCount: a
                    };
                    var g;
                    !d || c || l[d] ? this.clearUnreadConversation(u, l) : (this.logger.zsymb(0, 9646, 30016, `[read-message] append lastMsgIdInConv ${d} ${Object.keys(l).length}`), null === (g = ui.b.messageCache) || void 0 === g || g.getMessageByMsgIdAsync(d).then((e => {
                        l[d] = Object(i.a)({}, e), this.clearUnreadConversation(u, l)
                    })).catch((e => {
                        this.clearUnreadConversation(u, l)
                    })));
                    return li.a.clearUnreadMark([e], 0), n.lastSeenReactId = gi.a.sendClearUnread(e, n.lastSeenReactId), this.resetUnreadToZero(e, n.lastProcessMsgId), !0
                }
                getUnreadByConvIdSync(e) {
                    return this.data.get(e)
                }
                getUnreadByConvId(e) {
                    return new Promise(((t, s) => {
                        if (this.data.has(e)) return t(this.getUnreadByConvIdSync(e));
                        this.DBConvUnread.getById(e).then((e => t(e))).catch(s)
                    }))
                }
                getAllUnreadsSync() {
                    return Array.from(this.data.values())
                }
                getAllUnreads() {
                    return new Promise(((e, t) => {
                        if (this.doneLoadDB) return e(this.getAllUnreadsSync());
                        this.fetchAllHolder || (this.fetchAllHolder = this.DBConvUnread.getAll()), this.fetchAllHolder.then((t => e(t))).catch(t)
                    }))
                }
                resetUnreadToZero(e, t) {
                    return this.getUnreadByConvId(e).then((s => {
                        if (di.b.onClearUnreadConv(e), !s || !s.smsUnreadCount && !s.smsUnreadNotCount) return !1;
                        this.logger.zsymb(3, 9646, 30017, "resetUnreadToZero {} {}", e, s.smsUnreadCount);
                        const i = {
                            convId: e,
                            smsUnreadCount: 0,
                            mentionUnreadCount: 0,
                            strangerUnreadCount: 0,
                            smsUnreadNotCount: 0,
                            lastProcessMsgId: t,
                            lastSeenReactId: s.lastSeenReactId || "",
                            unreadMark: s.unreadMark
                        };
                        return s.smsUnreadCount > 0 && oi.a.notiMainClearunread(e), this.forkUpdateCacheAndDB(i).then((t => (this.broadcastEvent(ft.b.ReadConv, e), !0))).catch((t => (this.logger.zsymb(21, 9646, 30018, "resetUnreadToZero failure {} {}", e, t), !1)))
                    }))
                }
                isUnreadMessage(e) {
                    const {
                        message: t,
                        convId: s,
                        lastProcessMsgId: i
                    } = e, n = At.b.isMyMessage(t), a = ai.b.isRead({
                        userId: s,
                        actionId: t.actionId,
                        msgId: t.msgId,
                        msgSendDttm: t.ts || t.serverTime || t.sendDttm,
                        msgLocalId: void 0,
                        e2eeStatus: Object(bi.e)(t)
                    }), r = !t.msgId || !i || t.msgId <= i;
                    return !a && r && !n
                }
                _updateTTLUnreadCount(e, t, s) {
                    const i = this.data.get(e) || null;
                    if (this.logger.zsymb(0, 9646, 30019, "_updateTTLUnreadCount", e, null == i ? void 0 : i.smsUnreadCount), i && i.smsUnreadCount === t && i.smsUnreadNotCount === s) return;
                    let n = this.safeGetUnreadCached(e);
                    n.smsUnreadCount = t, n.smsUnreadNotCount = s, this.forkUpdateCacheAndDB(n)
                }
                updateUnreadTTLConversation(e, t, s) {
                    const i = this.getUnreadByConvIdSync(e);
                    if (i) {
                        let n = i.smsUnreadCount,
                            a = i.smsUnreadNotCount;
                        t.filter((t => t.ttlType === Ci.a.Message && this.isUnreadMessage({
                            message: this._getDeletedMsgByTTLItem(t, s),
                            convId: e,
                            lastProcessMsgId: i.lastProcessMsgId
                        }))).forEach((e => {
                            const t = this._getDeletedMsgByTTLItem(e, s),
                                i = $e.default.getDataReminder(t),
                                r = At.b.isMyMessage(t);
                            i && r && (t.idTo === He.default.sendToMeId || r) ? (a -= 1, n -= 1) : n -= 1
                        })), this._updateTTLUnreadCount(e, Math.max(n, 0), Math.max(a, 0))
                    }
                }
                updateUnreadCount(e, t) {
                    const s = this.data.get(e) || null;
                    if (this.logger.zsymb(0, 9646, 30020, "updateUnreadCount", e, null == s ? void 0 : s.smsUnreadCount), s && s.smsUnreadCount === t) return;
                    let i = this.safeGetUnreadCached(e);
                    i.smsUnreadCount = t, this.forkUpdateCacheAndDB(i)
                }
                updateMentionCount(e, t) {
                    this.logger.zsymb(0, 9646, 30021, "updateMentionCount", e, t);
                    let s = this.safeGetUnreadCached(e);
                    s.mentionUnreadCount = t, this.forkUpdateCacheAndDB(s, !1), vi.a.updateUnreadMentions(this.getTotalMentionCount())
                }
                updateLastSeenReactId(e, t) {
                    let s = this.safeGetUnreadCached(e);
                    s.lastSeenReactId = t, this.forkUpdateCacheAndDB(s, !1)
                }
                updateUnreadMark(e, t) {
                    let s = this.safeGetUnreadCached(e);
                    s.unreadMark || (s.unreadMark = null), t || (t = null), t !== s.unreadMark && (this.total.unreadMark += t ? 1 : -1, Object(je.g)(this.name, wi), s.unreadMark = t, this.forkUpdateCacheAndDB(s))
                }
                shouldClearUnread(e, t) {
                    const s = this.data.get(e),
                        i = null == s ? void 0 : s.smsUnreadCount,
                        n = null == s ? void 0 : s.lastProcessMsgId;
                    return !!i && !!(n && t && +t >= +n)
                }
                async forkUpdateCacheAndDB(e, t) {
                    void 0 === t && (t = !0), this.data.set(e.convId, e), Object(je.g)(this.name, e.convId), t && this.isValidConvKey(e.convId) && this.unreadChanged(e.convId), await this.updateInDB(e)
                }
                safeGetUnreadCached(e) {
                    const t = this.data.get(e);
                    let s;
                    return s = t ? Object(i.a)({}, t) : {
                        convId: e,
                        smsUnreadCount: 0,
                        smsUnreadNotCount: 0,
                        mentionUnreadCount: 0,
                        strangerUnreadCount: 0,
                        lastProcessMsgId: "0",
                        lastSeenReactId: "0",
                        unreadMark: null
                    }, s
                }
                getTotalMentionCount() {
                    let e = 0;
                    return this.data.forEach((t => {
                        e += t.mentionUnreadCount
                    })), e
                }
                isValidConvKey(e) {
                    return !(!e || e.length < 3) && ("null" != e && (e !== v.CONV_FILTER.STRANGER && e !== wi))
                }
                unreadChanged(e) {
                    "null" != e && (this.updateTotalQueue.remove((e => !0)), this.updateTotalQueue.push(e))
                }
                async calculateComputeUnreadCount(e) {
                    try {
                        var t;
                        const i = this.getEmptyTotal(),
                            n = (null === (t = this.data.get(v.CONV_FILTER.STRANGER)) || void 0 === t ? void 0 : t.smsUnreadCount) || 0;
                        let a = 0;
                        const r = new Map,
                            o = new Map,
                            l = new Map;
                        it.a.LabelDataManager.getAllLabelIds().map((e => {
                            const t = "" + e;
                            l.set(t, t)
                        }));
                        const d = new Map,
                            c = [];
                        for (let e of Array.from(this.data.keys())) {
                            if (!this.isValidConvKey(e)) continue;
                            const t = this.data.get(e);
                            if (!t || vt.a.isThreadHidden(e)) continue;
                            (Boolean(t.smsUnreadCount) || Boolean(t.smsUnreadNotCount) || Boolean(t.unreadMark)) && (d.set(e, t), c.push(e))
                        }
                        Li;
                        if ((await pt.a.verifyOATypeAsync(c)).forEach((e => {
                                let {
                                    cid: t,
                                    isOA: s
                                } = e;
                                const n = d.get(t),
                                    l = n.convId,
                                    c = this.acquireConvManager().getConvByIdSync(l),
                                    h = de.default.isMuted(l);
                                const u = n.smsUnreadCount || 0,
                                    g = n.smsUnreadNotCount || 0;
                                if (i.smsUnreadCount += u, c && !h && !s && c.userId !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER) {
                                    const e = Math.max(u - g, 0);
                                    i.smsUnreadNomute += e;
                                    const t = c.label ? "" + c.label : "",
                                        s = "0" == t || !!t;
                                    if (s && (r.has(t) ? r.set(t, r.get(t) + e) : r.set(t, e)), n.unreadMark) {
                                        const e = i.unreadMark || 0;
                                        i.unreadMark = e + 1, s && (o.has(t) ? o.set(t, o.get(t) + 1) : o.set(t, 1))
                                    }
                                    e > 0 && this.isInStrangerBox(l) && (a += e)
                                }
                            })), this.total.smsUnreadCount !== i.smsUnreadCount || this.total.smsUnreadNomute !== i.smsUnreadNomute || this.total.unreadMark !== i.unreadMark) {
                            var s;
                            const t = null === (s = this.data.get(e)) || void 0 === s ? void 0 : s.smsUnreadCount,
                                n = de.default.isMuted(e);
                            this.total = i, this.dispatchEvent(new ft.a(ft.b.ChangeUnreadCount, wi, {
                                unreadNoMute: i.smsUnreadNomute,
                                totalUnread: i.smsUnreadCount,
                                convId: e,
                                currentUnread: t,
                                curentUnreadNoMute: n ? 0 : t
                            })), this.data.set(wi, i), Object(je.g)(this.name, wi)
                        }
                        if (n !== a) {
                            const e = this.safeGetUnreadCached("");
                            e.smsUnreadCount = a, e.convId = v.CONV_FILTER.STRANGER, this.data.set(v.CONV_FILTER.STRANGER, e), Object(je.g)(this.name, v.CONV_FILTER.STRANGER)
                        }
                        for (let e of Array.from(r.keys())) {
                            const t = this.safeGetUnreadCached("");
                            t.smsUnreadCount = r.get(e), t.unreadMark = o.get(e), this.data.set(e, t), l.delete(e), Object(je.g)(this.name, e)
                        }
                        for (let e of Array.from(l.keys())) this.data.delete(e) && Object(je.g)(this.name, e)
                    } catch (i) {
                        this.logger.zsymb(21, 9646, 30026, " unread err - contact phucnh7 please!!! {}", i)
                    }
                }
                acquireConvManager() {
                    return it.a.ConvInfoDataManager
                }
                onLoadUnreadFromDBV2(e, t) {
                    if (this.logger.zsymb(0, 9646, 30028, "onLoadUnreadFromDB", t.length), t.length < 1) return;
                    const s = (new Date).getTime().toString();
                    Object(je.i)(s);
                    for (let i = 0; i < t.length; i++) {
                        const n = t[i];
                        if (ai.b.isRead({
                                userId: n.convId,
                                msgId: +n.lastProcessMsgId,
                                e2eeStatus: void 0,
                                actionId: void 0,
                                msgSendDttm: void 0,
                                msgLocalId: void 0
                            }) && (n.smsUnreadCount || n.smsUnreadNotCount) && (this.logger.zsymb(0, 9646, 30029, "clear offline", n.convId, n.smsUnreadCount), n.smsUnreadCount = 0, n.strangerUnreadCount = 0, n.smsUnreadNotCount = 0), this.pendingClearUnread.has(n.convId)) {
                            const e = this.pendingClearUnread.get(n.convId);
                            e && e >= +n.lastProcessMsgId && (this.logger.zsymb(0, 9646, 30030, "clear pending", this.pendingClearUnread.size, n.convId), n.smsUnreadCount = 0, n.strangerUnreadCount = 0, n.smsUnreadNotCount = 0)
                        }
                        "null" === n.lastProcessMsgId && (n.lastProcessMsgId = ""), this.data.set(n.convId, n), Object(je.f)(s, this.name, n.convId), e === Fi && this.updateInDB(n), n.unreadMark && this.total.unreadMark++
                    }
                    this.pendingClearUnread.clear(), this.processPendingMessages(), Object(je.c)(s)
                }
                processPendingMessages() {
                    this.logger.zsymb(0, 9646, 30031, "start processPendingMessages", this.pendingMessage.size), this.pendingMessage.forEach(((e, t) => {
                        const s = new Map,
                            i = this.data.get(t);
                        e.forEach((e => {
                            var t;
                            (!i || i.lastProcessMsgId < e.msgId) && s.set(`${(t=e).uidFrom||t.fromUid}_${t.idTo||t.toUid}_${t.cliMsgId}`, e)
                        })), this.logger.zsymb(0, 9646, 30032, "check processPendingMessages #2", t, null == i ? void 0 : i.smsUnreadCount, e.map((e => e.msgId)), s.keys());
                        const n = Array.from(s.values()),
                            a = At.b.getLastMessageInList(n);
                        this.handleNewMessages(t, n, null == a ? void 0 : a.msgId)
                    })), this.pendingMessage.clear()
                }
                handleNewMessages(e, t, s) {
                    if (!t || !t.length) return;
                    let i = !1;
                    const n = {
                            convId: e,
                            strangerUnreadCount: 0,
                            smsUnreadCount: 0,
                            smsUnreadNotCount: 0,
                            mentionUnreadCount: 0,
                            lastProcessMsgId: s,
                            lastSeenReactId: "0"
                        },
                        a = Date.now(),
                        r = new Set;
                    if (t.forEach((t => {
                            const o = At.b.isMyMessage(t);
                            if (t.status !== v.MSG_READ && !o) {
                                const s = t.ts || t.serverTime || t.sendDttm;
                                ai.b.isRead({
                                    userId: e,
                                    actionId: t.actionId,
                                    msgId: t.msgId,
                                    msgSendDttm: s,
                                    msgLocalId: void 0,
                                    e2eeStatus: Object(bi.e)(t)
                                }) && (He.default.stagingAccount && this.logger.zsymb(0, 9646, 30033, `mark msg status as read ${e} ${t.actionId} ${t.msgId}`), t.status = v.MSG_READ)
                            }
                            let l = ri.a.get(t.msgId, t.status);
                            l != t.status && He.default.stagingAccount && this.logger.zsymb(0, 9646, 30034, `change msg status ${t.status} => ${l}`), t.status = l;
                            let d = !1;
                            if ("chat.todo" === t.msgType) {
                                let e = t.content;
                                if (e) {
                                    "todo.remind" === e.action && (d = !0)
                                }
                            }
                            let c = $e.default.getDataReminder(t);
                            var h, u;
                            t.status !== v.MSG_READ && !o || !0 === d ? (t.paramsExt && $e.default.valueValid(t.paramsExt.countUnread) && 0 == t.paramsExt.countUnread && (n.smsUnreadNotCount += 1), this.isCallTimeMessage(t) || (n.smsUnreadCount += 1, n.strangerUnreadCount += 1), ni.b.isMessageMentionMe(t) && n.mentionUnreadCount++) : c && o && (t.idTo === He.default.sendToMeId || o) ? (n.smsUnreadCount += 1, n.smsUnreadNotCount += 1, this.logger.zsymb(0, 9646, 30035, `new unread #2: ${a} ${e} ${t.msgId} ${t.idTo} ${t.toUid} ${t.src} ${s}`)) : !(h = t) || "0" == h.uidFrom && (null === (u = h.paramsExt) || void 0 === u ? void 0 : u.platformType) == ss.i.DeviceIds.SYSTEM ? (r.add(t.msgId), this.logger.zsymb(0, 9646, 30036, "_addMessages: skipped clear unread for", t.idTo)) : t.isCallMessage || (n.smsUnreadCount = 0, n.strangerUnreadCount = 0, n.mentionUnreadCount = 0, i = !0), n.smsUnreadCount > 0 && Xt.b.markGotUnread(e, t.msgId), Xt.b.isLastMsg(t.msgId) && (Xt.b.onDoneEntry(Xt.a.FIRST_FETCH), this.previewMsgs.length > 0 && setTimeout((() => {
                                this.handlePreviewMsgs()
                            }), 0))
                        })), r.has(s))
                        for (let l = t.length - 1; l >= 0; l--) {
                            const s = t[l];
                            if ($e.default.validMessageFromServer(s) && !r.has(s.msgId)) {
                                this.logger.zsymb(0, 9646, 30037, "update last process id", e, n.lastProcessMsgId, s.msgId), n.lastProcessMsgId = s.msgId;
                                break
                            }
                            var o;
                            0 == l && (n.lastProcessMsgId = (null === (o = this.data.get(e)) || void 0 === o ? void 0 : o.lastProcessMsgId) || "0")
                        }
                    return this.updateUnread(e, i, n)
                }
                handlePreviewMsgs() {
                    if (!this.previewMsgs.length) return;
                    const e = [...this.previewMsgs];
                    this.previewMsgs = [], e.forEach((e => {
                        this.onReceiveNewMessages(e.toUid, e.msgId, [e])
                    }))
                }
                updateUnread(e, t, s) {
                    let i = this.data.get(e);
                    if (i) {
                        const e = i.lastSeenReactId || "0";
                        t ? i = s : (i.smsUnreadNotCount += s.smsUnreadNotCount, i.smsUnreadCount += s.smsUnreadCount, i.strangerUnreadCount += s.strangerUnreadCount, i.mentionUnreadCount += s.mentionUnreadCount, i.lastProcessMsgId = s.lastProcessMsgId), i.lastSeenReactId = e
                    } else {
                        if (i = s, !i) return void this.logger.zsymb(18, 9646, 30038, `updateUnread undefined item ${e}`);
                        i.lastSeenReactId = yi.a.getLastSeen(e) || "0"
                    }
                    this.data.set(e, Object.assign({}, i)), this.updateInDB(i), 0 != s.mentionUnreadCount && vi.a.updateUnreadMentions(this.getTotalMentionCount()), this.unreadChanged(e)
                }
                isInStrangerBox(e) {
                    const t = it.a.ConvInfoDataManager.getConvByIdSync(e);
                    return oi.a.isInStrangerBox(t)
                }
                isCallTimeMessage(e) {
                    if ("chat.recommended" === e.msgType && e.content) {
                        if (e.content.action === v.CallMessageAction.CallTime) return !0;
                        if (e.content.action === v.CallMessageAction.MissCall) {
                            let s = e.content.params;
                            if ("string" == typeof s) try {
                                s = JSON.parse(e.content.params)
                            } catch (t) {}
                            if (s && 3 === s.reason) return !0
                        }
                    }
                    return !1
                }
                clearUnreadConversation(e, t) {
                    if (void 0 === t && (t = {}), e && e.smsUnreadCount) try {
                        let s = !0,
                            i = Object.keys(t);
                        i && 0 != i.length || (s = !1, this.logger.zsymb(0, 9646, 30040, `[read-message] actually, no need send seen in that case 2: ${i.length}`)), !s && He.default.chat_aggressive_send_seen && (s = !0), s ? i && 0 !== i.length ? this.sendClearUnreadToServer(t, e.userId) : de.default.getLastMessageFrom(e.userId, e.lastSmsLocalId, Si, e.smsUnreadCount, !0).then((t => {
                            let s = [],
                                i = {};
                            if (t && t.length)
                                for (let e = 0; e < t.length; e++) {
                                    let n = t[e];
                                    $e.default.validMessageFromOther(n) && n.zglobalMsgId && -1 != n.zglobalMsgId && (s.push(n.zglobalMsgId), i[n.zglobalMsgId] = n)
                                }
                            0 === s.length ? this.logger.zsymb(3, 9646, 30041, "- [read-message] get ids.length == 0 {}", e.userId) : this.sendClearUnreadToServer(i, e.userId)
                        })).catch((e => {
                            this.logger.zsymb(21, 9646, 30042, " [read-message] get msgs err {}", e)
                        })) : this.logger.zsymb(3, 9646, 30043, "[read-message] no send {}", e.userId)
                    } catch (s) {
                        this.logger.zsymb(21, 9646, 30044, "[read-message] err {}", s)
                    } else this.logger.zsymb(0, 9646, 30039, `[read-message] actually, no need send seen in that case 1: ${null==e?void 0:e.userId}`)
                }
                async sendClearUnreadToServer(e, t) {
                    void 0 === e && (e = {});
                    const s = Object.keys(e),
                        i = oi.a.isGroup(t),
                        n = hi.a.newReq();
                    try {
                        await Ve.default.sendSeen(e, t, i, n), He.default.stagingAccount && this.logger.zsymb(0, 9646, 30045, `[read-message] done ${t} msgId:\n\t\t\t\t\t${s&&s.length?s[s.length-1]:0}`)
                    } catch (a) {
                        if (this.logger.zsymb(21, 9646, 30046, "[read-message] err {}", a), !(s && s.length > 0)) throw this.logger.zsymb(21, 9646, 30048, "[read-message] send seen fail!!! convId:{} msgId len = 0", t), a;
                        if (this.logger.zsymb(21, 9646, 30047, "[read-message] send seen fail!! convId:{} msgId:{}", t, s[s.length - 1]), a && (114 === a.error_code || -69 === a.error_code)) throw this.logger.zsymb(21, 9646, 30049, "[read-message] send seen fail!!! no need retry {}", a.error_code), a;
                        throw He.default.retrySendSeen ? (this.logger.zsymb(21, 9646, 30050, "[read-message] send seen fail!!! retry"), ci.b.retryAction(ci.a.SEND_SEEN_V2, [e, t, i, n], {
                            startedTime: Date.now(),
                            duration: He.default.retrySendSeen.timeout
                        })) : this.logger.zsymb(21, 9646, 30051, "[read-message] send seen fail!!! not retry"), a
                    }
                }
                broadcastEvent(e, t, s) {
                    this.dispatchEvent(new ft.a(e, t, s))
                }
                updateInDB(e) {
                    null == e.lastSeenReactId && (e.lastSeenReactId = yi.a.getLastSeen(e.convId) || "0", this.logger.zsymb(18, 9646, 30052, `update invalid lastSeen ${e.convId}`)), this.DBConvUnread.addOrUpdate(e)
                }
                deleteInDB(e) {
                    this.DBConvUnread.remove(e)
                }
            }) || mi) || mi) || mi);
            var Ri = s("8Nax"),
                Di = s("GSHL"),
                Ai = s("w5bt");
            let ji;
            var Pi, Ni;
            (Pi = ji || (ji = {})).modelToEntity = function (e) {
                if (!e) throw new Error("[PreviewHelper] Convert undefined model to entity");
                return {
                    convId: e.convId,
                    msgId: e.msgId,
                    dName: e.dName,
                    message: e.message,
                    messageType: e.messageType,
                    messageTime: e.messageTime,
                    isGroup: e.isGroup,
                    fromUid: e.fromUid,
                    toUid: e.toUid,
                    urgencyLevel: e.urgencyLevel,
                    properties: e.properties ? {
                        type: e.properties.type
                    } : null,
                    mentions: e.mentions ? e.mentions : null,
                    ttl: e.ttl,
                    cliMsgId: e.cliMsgId,
                    actionId: e.actionId,
                    status: e.status,
                    substate: e.substate,
                    computedMessage: e.computedMessage,
                    computedIcon: e.computedIcon
                }
            }, Pi.entityToModel = function (e) {
                return e ? {
                    convId: e.convId,
                    msgId: e.msgId,
                    dName: e.dName,
                    message: e.message,
                    messageType: e.messageType,
                    messageTime: e.messageTime,
                    isGroup: e.isGroup,
                    fromUid: e.fromUid,
                    toUid: e.toUid,
                    urgencyLevel: e.urgencyLevel,
                    properties: e.properties,
                    mentions: e.mentions,
                    ttl: e.ttl,
                    cliMsgId: e.cliMsgId,
                    actionId: e.actionId,
                    status: e.status,
                    substate: e.substate,
                    computedMessage: e.computedMessage,
                    computedIcon: e.computedIcon,
                    src: "db.preview",
                    verified: !1
                } : null
            };
            const Bi = "zpm_m",
                Ui = "1.0.0";
            Object(ht.b)(Ai.b)(Ni = function (e, t) {
                return l.ModuleContainer.inject(Di.b)(e, void 0, 0)
            }(Ni = Reflect.metadata("design:type", Function)(Ni = Reflect.metadata("design:paramtypes", [void 0 === ft.IReactiveDB ? Object : ft.IReactiveDB])(Ni = class extends k.b {
                constructor(e) {
                    super(), this.DBConvPreview = e, this.name = void 0, this.key = void 0, this.didInit = void 0, this.data = void 0, this.list = void 0, this.deleteQueue = void 0, this.doneLoadDB = void 0, this.migrating = void 0, this._Logger = void 0, this.name = Ai.a, this.key = "convId", this.didInit = !1, this.data = new Map, this.list = new Map, this.deleteQueue = [], this.doneLoadDB = !1, this.migrating = !1
                }
                init() {
                    return this.didInit ? Promise.resolve() : (this.didInit = !0, this.loadData())
                }
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("conversation", [this.name])), this._Logger
                }
                signalRenderItem(e, t) {
                    Object(je.g)(e, t), this.broadcastEvent(ft.b.PreviewChanged, t, {
                        changedItem: this.data.get(t),
                        all: Array.from(this.data.values())
                    })
                }
                loadData() {
                    return new Promise(((e, t) => {
                        u.a.getInstance().getItemForCurrentUser(Bi) !== Ui || this.migrating ? e() : (this.Logger.zsymb(3, 9400, 3e4, "start load preview"), this.DBConvPreview.getAll().then((t => {
                            this.onLoadPreviewsFromDB(t).then(e).catch((t => {
                                this.Logger.zsymb(21, 9400, 30001, "load previews from db failure #1! {}", t), e()
                            }))
                        })).catch((t => {
                            this.Logger.zsymb(21, 9400, 30002, "load preview from db failure #2! {}", t), e()
                        })))
                    }))
                }
                async revalidate(e) {
                    const t = !!this.getPreviewByIDSync(e),
                        s = await Ys.b.getPreviewMessage(e).catch((s => (this.Logger.zsymb(21, 9400, 30003, "revalidate failure #1 {} {} {}", e, t, s), {
                            previewMsg: void 0
                        })));
                    return !!s.previewMsg && this.onReceiveNewMessage("db.message", s.previewMsg).then((s => (this.Logger.zsymb(3, 9400, 30004, "revalidate success {} {} {}", e, t, s), !0))).catch((s => (this.Logger.zsymb(21, 9400, 30005, "revalidate failure #2 {} {} {}", e, t, s), !1)))
                }
                migrate(e, t) {
                    return void 0 === t && (t = !1), new Promise((s => {
                        const i = u.a.getInstance().getItemForCurrentUser(Bi);
                        if (i === Ui && !t) return;
                        if (this.Logger.zsymb(3, 9400, 30006, "start migrate {} {}", i, t), this.migrating = !0, 0 === e.length) return this.doneMigratePreivew(0), s(0);
                        let n = 0,
                            a = 0;
                        const r = () => {
                                if (n++, n === e.length) return this.doneMigratePreivew(a), s(a)
                            },
                            o = () => {
                                a++, r()
                            },
                            l = () => {
                                for (let t = 0; t < e.length; t++) Ys.b.getPreviewMessage(e[t]).then((s => {
                                    s && s.previewMsg ? this.onReceiveNewMessage("db.message", s.previewMsg).then(o).catch(r) : (this.Logger.zsymb(3, 9400, 30007, "migrate not exists msg {}", e[t]), r())
                                })).catch((s => {
                                    r(), this.Logger.zsymb(21, 9400, 30008, "migrate failure for conv {} {}", e[t], s)
                                }))
                            };
                        let d = e.filter((e => e !== v.FAKE_CONVERSATION_ID.FRIEND_CENTER && e !== v.FAKE_CONVERSATION_ID.GROUP_CENTER && !e.startsWith(v.GROUPID_PREFIX)));
                        if (d.length > 0) return tt.default.getProfileFriendByIds(d, v.SRC_GET_PROFILE.FETCH_MINI_INFO).then((() => {
                            l()
                        })).catch((() => {
                            l()
                        }));
                        l()
                    }))
                }
                doneMigratePreivew(e) {
                    this.Logger.zsymb(3, 9400, 30009, "done migrate preview {}", e);
                    u.a.getInstance().setItemForCurrentUser(Bi, Ui), this.broadcastEvent(ft.b.DoneMigratePreview, "")
                }
                upgradeItemsVersion(e) {
                    void 0 === e && (e = []), this.Logger.zsymb(3, 9400, 30010, "upgradeItemsVersion");
                    const t = (new Date).getTime().toString();
                    Object(je.i)(t), 0 !== e.length ? e.forEach((e => {
                        Object(je.f)(t, this.name, e)
                    })) : this.data.forEach((e => {
                        Object(je.f)(t, this.name, e.convId)
                    })), Object(je.c)(t)
                }
                updateStrangerBox(e) {
                    const t = this.data.get(e);
                    t && (this.data.set(v.CONV_FILTER.STRANGER, Object(i.a)({}, t)), Object(je.g)(this.name, v.CONV_FILTER.STRANGER))
                }
                forceChangeItem(e) {
                    this.signalRenderItem(this.name, e)
                }
                getItem(e, t) {
                    const s = this.data.get(e.key);
                    return s || this.Logger.zsymb(5, 9400, 30011, "try to get item not exist in cache {}", e.key), s
                }
                getList(e, t) {
                    return Array.from(this.data.keys())
                }
                onGetItemFailure(e) {
                    this.Logger.zsymb(11, 9400, 30012, "onGetItemFailure {}", e)
                }
                onGetListFailure(e, t) {
                    this.Logger.zsymb(11, 9400, 30013, "onGetListFailure {} {}", e, t)
                }
                onLoadPreviewsFromDB(e) {
                    return new Promise(((t, s) => {
                        if (this.Logger.zsymb(3, 9400, 30014, "onLoadPreviewsFromDB {}", null == e ? void 0 : e.length), !e || 0 === e.length) return this.doneLoadPreview(0), t();
                        let i = 0;
                        const n = () => {
                            i++, i === e.length && (this.doneLoadPreview(i), t())
                        };
                        for (let a = 0; a < e.length; a++) {
                            const t = ji.entityToModel(e[a]);
                            t && !Ri.a.instance.filterExpiredPreview(t) && (t.messageType = v.MSG_VANISH, t.message = "", this.updateInDB(t)), this.addPreviewToManager(t).then((() => {
                                n()
                            })).catch((e => {
                                n(), this.Logger.zsymb(21, 9400, 30015, "onload preview failure for item {} {}", null == t ? void 0 : t.convId, e)
                            }))
                        }
                    }))
                }
                doneLoadPreview(e) {
                    this.Logger.zsymb(3, 9400, 30016, "doneLoadPreview {}", e), this.doneLoadDB = !0, this.broadcastEvent(ft.b.DoneLoadPreview, "", Array.from(this.data.values())), Object(je.h)(this.name, "all")
                }
                onReceiveNewMessage(e, t) {
                    return new Promise(((s, i) => {
                        if (!t) return s(!1);
                        const n = this.convertDBMessageToPreviewItem(e, t);
                        this.addPreviewToManager(n).then((e => e ? (this.signalRenderItem(this.name, t.toUid), s(!0)) : s(!1))).catch(i)
                    }))
                }
                onReceiveNewMessages(e, t) {
                    return new Promise((s => {
                        if (!t) return s(!1);
                        const i = this.groupMessageByConvId(t),
                            n = [];
                        for (const e in i) {
                            if (!Object.prototype.hasOwnProperty.call(i, e)) continue;
                            const t = i[e];
                            for (let e = t.length - 1; e >= 0; e--) {
                                if (At.b.isValidPreviewMessage(t[e])) {
                                    n.push(t[e]);
                                    break
                                }
                                this.Logger.zsymb(3, 9400, 30017, "receive msg but not preview {}", t[e].msgId)
                            }
                        }
                        return n.length ? Promise.all(n.map((async t => this.onReceiveNewMessage(e, t)))).then((e => {
                            const t = e.some((e => 1 == e));
                            s(t)
                        })).catch((e => {
                            this.Logger.zsymb(21, 9400, 30018, "add messages to preview got error {}", e), s(!1)
                        })) : s(!1)
                    }))
                }
                onUndoMessage(e, t) {
                    if (!t) return;
                    this.Logger.zsymb(3, 9400, 30019, "onUndoMessage {}", t.msgId);
                    const s = this.convertDBMessageToPreviewItem(e, t);
                    s.messageType = v.MSG_UNDO, s.message = "", this.addPreviewToManager(s).then((e => {
                        e && this.signalRenderItem(this.name, t.toUid)
                    }))
                }
                onUpdateE2EEMessage(e, t) {
                    if (!t) return;
                    const s = t.toUid,
                        i = this.data.get(s);
                    if (this.Logger.zsymb(3, 9400, 30020, "onUpdateE2EEMessage {} {} {}", s, null == i ? void 0 : i.msgId, t.msgId), i && (i.msgId !== t.msgId || !ni.b.isSameMsg(i, t))) return;
                    const n = this.convertDBMessageToPreviewItem(e, t),
                        a = $e.default.normalizeMessageTypeFromSubState(null == t ? void 0 : t.e2eeStatus) || t.msgType;
                    n.message = n.message || At.b.getPlainText({
                        msgType: a
                    }), n.verified = !0, n.messageType = a, this.data.set(t.toUid, n), this.updateInDB(n), this.signalRenderItem(this.name, t.toUid)
                }
                onDeleteMessage(e, t) {
                    return new Promise(((e, s) => {
                        if (!t) return e(!1);
                        this.Logger.zsymb(3, 9400, 30021, "onDeleteMessage {}", t.msgId);
                        const i = this.convertDBMessageToPreviewItem("db.message", t);
                        this.deleteMessageInManager(i).then((s => {
                            s ? (this.Logger.zsymb(3, 9400, 30022, "onDeleteMessage success {}", t.msgId), this.signalRenderItem(this.name, t.toUid), e(!0)) : e(!1)
                        }))
                    }))
                }
                onDeleteMessages(e, t) {
                    if (!t || t.length < 1) return;
                    const s = this.groupMessageByConvId(t);
                    for (const i in s)
                        if (Object.prototype.hasOwnProperty.call(s, i)) {
                            const t = s[i];
                            let n = this.convertDBMessageToPreviewItem(e, t[0]),
                                a = 0;
                            for (let s = 1; s < t.length; s++) {
                                const i = this.convertDBMessageToPreviewItem(e, t[s]);
                                this.isSecondItemNewer(n, i) && (a = s, n = i)
                            }
                            this.onDeleteMessage(e, t[a])
                        }
                }
                onDeleteConversation(e) {
                    e && (this.Logger.zsymb(3, 9400, 30023, "onDeleteConversation {}", e), this.data.delete(e) && Object(je.e)(this.name, e), this.deleteInDB(e))
                }
                onChangeDraft(e, t) {
                    let s = this.getPreviewByIDSync(e);
                    !e || !s || s.draft === t || s.draft && t && s.draft.draftTime === t.draftTime ? this.Logger.zsymb(3, 9400, 30024, "onChangeDraft - reject {}", !!s) : (this.Logger.zsymb(3, 9400, 30025, "onChangeDraft - call update {}", !!s), s = Object(i.a)(Object(i.a)({}, s), {}, {
                        draft: t
                    }), this.data.set(e, s), this.signalRenderItem(this.name, e), this.broadcastEvent(ft.b.DraftChanged))
                }
                getPreviewById(e) {
                    return new Promise(((t, s) => {
                        if (this.data.has(e)) return t(this.data.get(e));
                        this.DBConvPreview.getById(e).then((s => {
                            s || this.Logger.zsymb(3, 9400, 30026, "get item not exist with id {}", e);
                            const i = ji.entityToModel(s);
                            t(i || void 0)
                        })).catch(s)
                    }))
                }
                getPreviewByIDSync(e) {
                    return this.data.get(e)
                }
                getAllPreviews() {
                    return new Promise(((e, t) => {
                        if (this.doneLoadDB) return e(this.getAllPreviewsSync());
                        this.DBConvPreview.getAll().then((t => {
                            const s = t.map((e => ji.entityToModel(e)));
                            e(s)
                        })).catch(t)
                    }))
                }
                getAllPreviewsSync() {
                    return Array.from(this.data.values()) || []
                }
                setPreview(e, t, s, i, n, a, r) {
                    void 0 === a && (a = 1), void 0 === r && (r = {});
                    const o = this.data.get(e);
                    this.Logger.zsymb(3, 9400, 30027, "call set preview {} {}", e, !!o);
                    const l = {
                        convId: e,
                        msgId: r.msgId || "unset",
                        src: "ui",
                        dName: r.dName || "",
                        message: t,
                        messageType: "",
                        isGroup: e.startsWith(v.GROUPID_PREFIX),
                        messageTime: s,
                        fromUid: i,
                        toUid: n,
                        urgencyLevel: r.urgencyLevel,
                        properties: null,
                        verified: !0,
                        status: a,
                        computedMessage: t,
                        computedIcon: r.icon
                    };
                    this.data.set(e, l), this.signalRenderItem(this.name, e), this.updateInDB(l)
                }
                async addPreviewToManager(e) {
                    if (!e) return !1;
                    const t = e.convId,
                        s = this.data.get(t);
                    let i = !1;
                    return s ? this.isSecondItemNewer(s, e) && (this.data.set(t, e), i = !0, s.verified ? (e.verified = !0, this.updateInDB(e)) : i = await this.compareCacheWithDBAndUpdate(t, e)) : (this.data.set(t, e), i = !0, "db.preview" !== e.src && (i = await this.compareCacheWithDBAndUpdate(t, e))), i
                }
                async deleteMessageInManager(e) {
                    if (!e) return !1;
                    const t = e.convId,
                        s = this.data.get(t);
                    if (!s || !ni.b.isSameMsg(e, s) && this.isSecondItemNewer(e, s)) return 0 !== this.deleteQueue.length && this.deleteQueue.push(e), !1;
                    const i = async () => {
                        const e = await Ys.b.getPreviewMessage(t),
                            s = this.deleteQueue.find((t => {
                                var s;
                                return t.msgId === (null === (s = e.previewMsg) || void 0 === s ? void 0 : s.msgId)
                            }));
                        if (s) return this.data.set(t, s), await this.deleteMessageInManager(s);
                        if (this.deleteQueue = [], e.previewMsg) {
                            const s = this.convertDBMessageToPreviewItem("db.message", e.previewMsg);
                            return s.verified = !0, this.data.set(t, s), this.updateInDB(s), !0
                        }
                        return this.data.delete(t), this.deleteInDB(t), Object(je.e)(this.name, t), !1
                    };
                    if (s.verified) return await i(); {
                        const s = await this.DBConvPreview.getById(t),
                            n = s && ji.entityToModel(s);
                        return n && this.isSecondItemNewer(e, n) ? (this.data.set(t, n), !0) : await i()
                    }
                }
                convertDBMessageToPreviewItem(e, t) {
                    let s = t.sendDttm || t.serverTime;
                    s = s ? s.toString() : "";
                    const i = t.fromUid || t.uidFrom,
                        n = t.toUid || t.idTo,
                        a = n && n.startsWith(v.GROUPID_PREFIX);
                    return {
                        convId: t.toUid,
                        msgId: t.msgId,
                        src: e,
                        dName: t.dName || "",
                        message: t.message,
                        messageType: t.msgType,
                        mentions: t.mentions,
                        isGroup: a,
                        messageTime: s,
                        fromUid: i,
                        properties: t.properties,
                        urgencyLevel: t.urgency,
                        verified: !1,
                        ttl: t.ttl,
                        status: t.status || 1,
                        substate: t.e2eeStatus,
                        cliMsgId: t.cliMsgId,
                        toUid: t.toUid
                    }
                }
                isSecondItemNewer(e, t) {
                    return !e || (t.msgId === e.msgId && t.messageTime === e.messageTime || ni.b.isSameMsg(e, t) ? t.messageType === v.MSG_UNDO && e.messageType !== v.MSG_UNDO || pt.a.comparePreviewStt(t.status, e.status) > 0 : e.messageTime !== t.messageTime ? t.messageTime > e.messageTime : t.msgId > e.msgId)
                }
                compareCacheWithDBAndUpdate(e, t) {
                    return new Promise(((s, i) => {
                        this.DBConvPreview.getById(e).then((i => {
                            this.Logger.zsymb(3, 9400, 30028, "compareCacheWithDBAndUpdate {} {}", e, !!i);
                            const n = ji.entityToModel(i),
                                a = this.data.get(e);
                            if (JSON.stringify(a) !== JSON.stringify(t)) return s(!1);
                            !n && a || n && a && this.isSecondItemNewer(n, a) ? (a.verified = !0, this.updateInDB(a)) : n && this.data.set(e, n), s(!0)
                        })).catch(i)
                    }))
                }
                groupMessageByConvId(e) {
                    const t = {};
                    for (let s = 0; s < e.length; s++) t[e[s].toUid] ? t[e[s].toUid].push(e[s]) : t[e[s].toUid] = [e[s]];
                    return t
                }
                broadcastEvent(e, t, s) {
                    void 0 === t && (t = ""), this.dispatchEvent(new ft.a(e, t, s))
                }
                updateInDB(e) {
                    this.Logger.zsymb(3, 9400, 30029, "update in db {}", e.msgId);
                    try {
                        const t = ji.modelToEntity(e);
                        this.DBConvPreview.addOrUpdate(t)
                    } catch (t) {
                        this.Logger.zsymb(21, 9400, 30030, "update in db got err{}", t)
                    }
                }
                deleteInDB(e) {
                    this.DBConvPreview.remove(e).catch((e => {
                        this.Logger.zsymb(18, 9400, 30031, `[${this.name}] - deleteInDB got error ${e}`)
                    }))
                }
            }) || Ni) || Ni) || Ni);
            var ki = s("rKwX"),
                Gi = s("SWKE");
            class zi {
                constructor() {
                    this.cache = void 0, this.cache = {}
                }
                localKey(e) {
                    return "z_ml_" + e
                }
                muteConversation(e, t) {
                    const s = u.a.getInstance(),
                        i = "z_ml_" + e;
                    t ? t.constructor === Object ? s.setItemForCurrentUser(this.localKey(e), JSON.stringify(t)) : s.setItemForCurrentUser(this.localKey(e), `${t}`) : s.removeItemForCurrentUser(i), this.cache[e] = t || !1
                }
                isMuted(e) {
                    if (this.cache.hasOwnProperty(e)) return this.cache[e];
                    let t, s = u.a.getInstance().getItemForCurrentUser(this.localKey(e));
                    if (!s) return null;
                    try {
                        return t = JSON.parse(s), this.cache[e] = t, t
                    } catch (i) {
                        $e.default.logCoreError(i)
                    }
                    return this.cache[e] = !1, !1
                }
                setMutedConversations(e) {
                    let t = [];
                    e.chatEntries && e.chatEntries.length > 0 && e.chatEntries.reduce(((e, t) => (e.push(t), e)), t), e.groupChatEntries && e.groupChatEntries.length > 0 && e.groupChatEntries.reduce(((e, t) => (t.id = v.GROUPID_PREFIX + t.id, e.push(t), e)), t);
                    Gi.a.getInstance().cleanupLocalStorageMatchConditions((e => {
                        const t = u.a.getInstance().getKeyNameForCurrentUser(this.localKey(""));
                        return e.startsWith(t)
                    })), this.cache = {};
                    for (let s = 0; s < t.length; s++) this.muteConversation(t[s].id, t[s]);
                    return t
                }
            }
            var xi;
            Object(ht.b)(lt.e)(xi = Reflect.metadata("design:type", Function)(xi = Reflect.metadata("design:paramtypes", [])(xi = class extends k.b {
                constructor() {
                    super(), this.name = void 0, this.key = void 0, this.didInit = void 0, this._muteManager = void 0, this.userId = void 0, this.mapTimeout = void 0, this.name = lt.d, this.key = "id", this.didInit = !1, this.userId = "", this.mapTimeout = {}
                }
                init(e) {
                    this.didInit || (this.didInit = !0, this.userId = e)
                }
                get muteManager() {
                    return this._muteManager && "" !== this.userId || (this.userId, this._muteManager = new zi), this._muteManager
                }
                getItem(e, t) {
                    return this.muteManager.isMuted(e.key)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e) {}
                onGetListFailure(e, t) {}
                onMute(e, t) {
                    return new Promise(((s, i) => {
                        this._clearTimeout(e);
                        let n = -1;
                        switch (t) {
                            case 1:
                                n = 3600;
                                break;
                            case 2:
                                n = 14400;
                                break;
                            case 3:
                                n = Math.round(this._getNowTo8Am() / 1e3)
                        }
                        $e.default.logCoreInfo(`[${this.name}] - onMute ${e} ${n}`), ki.a.lock(e, n, !0).then((t => {
                            this.muteManager.muteConversation(e, {
                                id: e,
                                startTime: t.startTime,
                                duration: t.duration,
                                systemTime: t.systemTime,
                                currentTime: t.currentTime,
                                muteMode: t.muteMode
                            }), s(!0)
                        })).catch(i)
                    }))
                }
                onUnMute(e, t, s) {
                    return void 0 === t && (t = !0), void 0 === s && (s = !1), new Promise(((i, n) => {
                        this._clearTimeout(e), $e.default.logCoreInfo(`[${this.name}] - onUnMute ${e} ${t} ${s}`), ki.a.unlock(e, t, s).then((t => {
                            this.muteManager.muteConversation(e, 0), i(!!t)
                        })).catch(n)
                    }))
                }
                onFetchMute(e) {
                    $e.default.logCoreInfo(`[${this.name}] - onFetchMute`);
                    let t = this.muteManager.setMutedConversations(e);
                    return this.processFetchData(e), t
                }
                onCtrMute(e, t) {
                    t ? (this.doLock(t, !1), this.muteManager.muteConversation(e, t), this.muteChanged(e, !!t)) : this.onUnMute(e, !1).then((s => {
                        this.muteChanged(e, !!t)
                    }))
                }
                isMuted(e) {
                    return this.muteManager.isMuted(e)
                }
                processFetchData(e) {
                    try {
                        e.chatEntries && (e.chatEntries.forEach((e => {
                            this.doLock(e, !0)
                        })), e.groupChatEntries.forEach((e => {
                            this.doLock(e, !0)
                        })))
                    } catch (t) {
                        $e.default.logCoreError(t)
                    }
                }
                doLock(e, t) {
                    if (void 0 === t && (t = !0), this.mapTimeout.hasOwnProperty(e.id) && (t = !0), this._clearTimeout(e.id), -1 != e.duration) {
                        $e.default.log("setTimer", e);
                        let s = e.duration - (e.currentTime - e.systemTime);
                        s >= 0 ? ($e.default.log("setTimer: lock1", e.id), $e.default.logCoreInfo("[Unmute timeout] setTimer: lock1", e.id, s), this.mapTimeout[e.id] = setTimeout((() => {
                            this.onUnMute(e.id, t, !0), $e.default.logCoreInfo("[Unmute timeout] setTimer: unlock1", e.id)
                        }), 1e3 * s)) : ($e.default.log("setTimer: unlock", s), $e.default.logCoreInfo("[Unmute timeout] setTimer: unlock", e.id), this.onUnMute(e.id, t))
                    }
                }
                _clearTimeout(e) {
                    this.mapTimeout.hasOwnProperty(e) && (clearTimeout(this.mapTimeout[e]), delete this.mapTimeout[e])
                }
                _getNowTo8Am() {
                    let e = (new Date).getTime(),
                        t = new Date(e);
                    return t.setHours(8, 0, 0, 0), t.getTime() <= e ? t.getTime() + 864e5 - e : t.getTime() - e
                }
                muteChanged(e, t) {
                    Object(je.g)(this.name, e), this.broadcastEvent(ft.b.MuteChanged, e, t)
                }
                broadcastEvent(e, t, s) {
                    void 0 === t && (t = ""), this.dispatchEvent(new ft.a(e, t, s))
                }
            }) || xi) || xi);
            var Vi, $i = s("kCOK"),
                Wi = s("qvRd"),
                qi = s("fBUP"),
                Ki = s("gwig");
            const Hi = "zpinc",
                Zi = "ver_pin",
                Qi = 0,
                Ji = 1,
                Xi = 2;
            Object(ht.b)(Wi.b)(Vi = Reflect.metadata("design:type", Function)(Vi = Reflect.metadata("design:paramtypes", [])(Vi = class extends k.b {
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("conversation", [this.name])), this._Logger
                }
                constructor() {
                    super(), this.name = void 0, this.key = void 0, this.didInit = void 0, this.doneLoadDB = void 0, this.data = void 0, this._Logger = void 0, this.reFetchCount = void 0, this.retryTimeout = void 0, this.refetchInterval = void 0, this.lastFetchTime = void 0, this.isDataLastest = void 0, this.requestingIds = void 0, this.name = Wi.a, this.key = "convId", this.didInit = !1, this.doneLoadDB = !1, this.data = new Map, this.reFetchCount = 0, this.isDataLastest = !1, this.lastFetchTime = 0, this.requestingIds = new Map
                }
                init() {
                    this.didInit || (this.didInit = !0, this._loadData(), this._fetchPinnedConversations(), this._addListener())
                }
                _loadData() {
                    const e = u.a.getInstance().getItemForCurrentUser(Hi);
                    if (e && e.length) try {
                        const t = JSON.parse(e);
                        Object.keys(t).map((e => {
                            this._verifyPin(t[e].id) && this.data.set(t[e].id, {
                                id: t[e].id,
                                priority: +t[e].priority || Js.a.getTimeNow()
                            })
                        })), this.Logger.zsymb(0, 8605, 3e4, "pin conversations loaded from local", this.data), this.doneLoadDB = !0;
                        const s = this.getAllPinnedConversations();
                        s.length && this._broadcastEvent(ft.b.ChangePinConv, s)
                    } catch (t) {
                        0
                    }
                }
                _addListener() {
                    tt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, (e => {
                        this.Logger.zsymb(0, 8605, 30001, "remove friend - unpin", e.userId), this.updateListPin([e.userId], Xi)
                    })), this._setFetchInterval()
                }
                _setFetchInterval() {
                    this.refetchInterval && clearTimeout(this.refetchInterval), this.refetchInterval = setInterval((() => {
                        this._fetchPinnedConversations()
                    }), 864e5)
                }
                _broadcastEvent(e, t) {
                    this.dispatchEvent(new ft.e(e, t))
                }
                _newPinItem(e, t) {
                    return {
                        id: e,
                        priority: t
                    }
                }
                _syncServer(e, t) {
                    return this._updatePinnedConversationsV2(e, t)
                }
                getLastFetchTime() {
                    return this.lastFetchTime
                }
                isPinned(e) {
                    return this.data.has(e)
                }
                getPinTime(e) {
                    const t = this.data.get(e);
                    return t ? t.priority : 0
                }
                async _checkAndSyncDataBeforeAction() {
                    if (!this.isDataLastest) try {
                        return await this._fetchPinnedConversations(), !0
                    } catch (e) {
                        return !1
                    }
                    return !0
                }
                pin(e) {
                    return this.Logger.zsymb(0, 8605, 30002, "client pin", e), new Promise((async (t, s) => {
                        const i = await this._checkAndSyncDataBeforeAction();
                        if (!e || !e.length) return s(null);
                        if (i) {
                            if (this.data.size + e.length > He.default.limit_pin_messages) return s(null);
                            let i = [];
                            for (let t = 0; t < e.length; ++t) this.isPinned(e[t]) || i.push(e[t]);
                            if (i.length > 0) try {
                                const s = await this._syncServer(i, Ji);
                                return this.updateListPin(e, Ji), t(s)
                            } catch (n) {
                                return s(n)
                            }
                        }
                        return s(null)
                    }))
                }
                pinLocal(e) {
                    this.updateListPin(e, Ji)
                }
                unpin(e, t) {
                    return void 0 === t && (t = !1), this.Logger.zsymb(0, 8605, 30003, "client unpin", e, "force sync", t), new Promise((async (s, i) => {
                        if (!e || !e.length) return i(null);
                        if (await this._checkAndSyncDataBeforeAction()) {
                            let a = [];
                            for (let s = 0; s < e.length; ++s)(this.isPinned(e[s]) || t) && a.push(e[s]);
                            if (a.length > 0) try {
                                await this._syncServer(a, Xi), this.updateListPin(e, Xi), s(1)
                            } catch (n) {
                                i(n)
                            }
                        }
                        return i(null)
                    }))
                }
                unpinLocal(e) {
                    this.Logger.zsymb(0, 8605, 30004, "unpin local", e), this.updateListPin(e, Xi)
                }
                getAllPinnedConversations() {
                    return Array.from(this.data.values())
                }
                getAllPinnedConversationsSync() {
                    return Array.from(this.data.values())
                }
                getTotalPinnedConversation() {
                    return this.data.size + Array.from(this.requestingIds.values()).filter((e => e === Ji)).length
                }
                _verifyPin(e) {
                    return this.Logger.zsymb(0, 8605, 30005, "verify conversation", e, tt.default.isFriend(e), !!Dt.default.getGroupByIdSync(e), e === He.default.sendToMeId), tt.default.isFriend(e) || !!Dt.default.getGroupByIdSync(e) || e === He.default.sendToMeId
                }
                updateListPin(e, t) {
                    if (this.Logger.zsymb(0, 8605, 30006, "updateListPin", e, t), !e || !e.length) return;
                    const s = [];
                    switch (t) {
                        case Ji:
                            let t = Js.a.getTimeNow();
                            for (let i = 0; i < e.length; i++)
                                if (this._verifyPin(e[i]) && !this.data.has(e[i])) {
                                    ++t, this.requestingIds.get(e[i]) && this.requestingIds.set(e[i], Qi);
                                    const n = this._newPinItem(e[i], t);
                                    this.data.set(e[i], n), s.push(n), Object(je.g)(this.name, e[i])
                                } break;
                        case Xi:
                            for (let i = 0; i < e.length; i++)
                                if (this.data.has(e[i])) {
                                    this.requestingIds.get(e[i]) && this.requestingIds.set(e[i], Qi), this.data.delete(e[i]);
                                    const t = this._newPinItem(e[i], 0);
                                    s.push(t), Object(je.g)(this.name, e[i])
                                } break;
                        default:
                            return
                    }
                    s.length && this._broadcastEvent(ft.b.ChangePinConv, s), this._updateInDB()
                }
                _retryFetch(e) {
                    if (this.reFetchCount > 5) return;
                    let t = 0;
                    switch (e) {
                        case "ERR_NO_NETWORK":
                        case -69:
                            break;
                        case 212:
                            this.Logger.zsymb(20, 8605, 30007, "hasn't pinned conversation from server");
                            u.a.getInstance().setItemForCurrentUser(Zi, "0"), this._sendToServer();
                            break;
                        case "ERR_CONNECTION_TIMED_OUT":
                        case 112:
                            t = 5e3 * this.reFetchCount;
                            break;
                        default:
                            t = 36e5
                    }
                    this.Logger.zsymb(21, 8605, 30008, "Handle request error fail with error: {}, retry after time= {}", e, t), this.retryTimeout || t > 0 && (this.retryTimeout = setTimeout((() => {
                        this._fetchPinnedConversations(), this.retryTimeout = void 0
                    }), t))
                }
                _parseData(e) {
                    let t = [];
                    for (let s = 0; s < e.length; ++s) "m1" === e[s] || (e[s].startsWith("g") ? t.push(e[s]) : t.push(e[s].slice(1)));
                    return t
                }
                _fetchPinnedConversations() {
                    return this.reFetchCount++, this.Logger.zsymb(0, 8605, 30009, "_fetchPinnedConversations", this.reFetchCount), new Promise(((e, t) => {
                        qi.default.getPinnedConversations().then($i.a).then((t => {
                            if (t && t.conversations) {
                                const e = u.a.getInstance();
                                void 0 === t.version && null === t.version || e.setItemForCurrentUser(Zi, t.version), this._onFetchPin(this._parseData(t.conversations))
                            }
                            e(t)
                        })).catch((e => {
                            this.isDataLastest = !1, e && (e.error_code ? this._retryFetch(e.error_code) : e.code ? this._retryFetch(e.code) : this._retryFetch("UNKNOWN_ERROR")), t(e)
                        }))
                    }))
                }
                _updatePinnedConversationsV2(e, t) {
                    return new Promise(((s, i) => {
                        if (!He.default.enable_sync_pinned) return;
                        if (!Ki.b.getStateNetwork()) return void i(t === Ji ? Tt.default.str("STR_ERR_NETWORK_PIN_CONVERSATION") : Tt.default.str("STR_ERR_NETWORK_UNPIN_CONVERSATION"));
                        let n = [];
                        for (let a = 0; a < e.length; ++a) e[a].startsWith("g") || e[a].startsWith("u") || (e[a] = "u" + e[a]), n.includes(e[a]) || this.requestingIds.has(e[a]) && this.requestingIds.get(e[a]) !== Qi || (n.push(e[a]), this.requestingIds.set(e[a], t));
                        n.length && qi.default.updatePinnedConversationsV2(n, t).then($i.a).then((() => {
                            n.forEach((e => {
                                this.requestingIds.set(e, Qi)
                            })), s(!0)
                        })).catch((e => {
                            n.forEach((e => {
                                this.requestingIds.set(e, Qi)
                            })), this.Logger.zsymb(20, 8605, 30010, "Update sync pin conv v2 FAIL: " + e);
                            let s = "";
                            if (e)
                                if (e.error_code)
                                    if (160 === e.error_code) this._fetchPinnedConversations();
                                    else s = Tt.default.str("STR_ERR_PIN_CONVERSATION") + " (" + e.error_code + ")";
                            else "ERR_NO_NETWORK" === e.code && Ki.b.getStateNetwork() == Ki.a.DISCONNECT && (s = t === Ji ? Tt.default.str("STR_ERR_NETWORK_PIN_CONVERSATION") : Tt.default.str("STR_ERR_NETWORK_UNPIN_CONVERSATION"));
                            i(s)
                        }))
                    }))
                }
                _isRemoteDataChanged(e) {
                    const t = Array.from(this.data.values()).sort(((e, t) => t.priority - e.priority)).map((e => e.id));
                    if (e.length !== t.length) return !0;
                    let s = !1;
                    return e.forEach(((e, i) => {
                        e !== t[i] && (s = !0)
                    })), s
                }
                _onFetchPin(e) {
                    this.Logger.zsymb(0, 8605, 30011, "onFetchPin", e), this.isDataLastest = !0, this.lastFetchTime = Js.a.getTimeNow(), this.reFetchCount = 0;
                    let t = Js.a.getTimeNow();
                    this._setFetchInterval();
                    const s = [],
                        i = [];
                    for (let n = 0; n < e.length; n++) this._verifyPin(e[n]) ? i.push(e[n]) : this.unpin([e[n]], !0);
                    if (this._isRemoteDataChanged(i)) {
                        for (const e of Array.from(this.data.values())) i.find((t => t === e.id)) || (this.data.delete(e.id), Object(je.g)(this.name, e.id), s.push({
                            id: e.id,
                            priority: 0
                        }));
                        for (let e = 0; e < i.length; e++) {
                            const n = this._newPinItem(i[e], t),
                                a = this.isPinned(i[e]);
                            this.data.set(i[e], n), a || Object(je.g)(this.name, i[e]), t--, s.push(n)
                        }
                        this.Logger.zsymb(0, 8605, 30012, "[After Fetch]", Array.from(this.data.values())), s.length && this._broadcastEvent(ft.b.ChangePinConv, s), this._updateInDB()
                    }
                }
                _sendToServer() {
                    this._syncServer(Array.from(this.data.keys()), Ji)
                }
                getItem(e, t) {
                    return this.data.get(e.key)
                }
                getList(e, t) {
                    return Array.from(this.data.keys())
                }
                onGetItemFailure(e, t) {
                    this.Logger.zsymb(18, 8605, 30013, "onGetItemFailure - key:", e, " - error", t)
                }
                onGetListFailure(e, t) {
                    this.Logger.zsymb(18, 8605, 30014, "onGetItemFailure - key:", e, " - error", t)
                }
                _updateInDB() {
                    if (!this.data) return;
                    const e = u.a.getInstance();
                    this.data.size ? e.setItemForCurrentUser(Hi, JSON.stringify(Array.from(this.data.values()))) : e.removeItemForCurrentUser(Hi)
                }
            }) || Vi) || Vi);
            l.ModuleContainer.registerSingleton(Ps.b, ks), l.ModuleContainer.registerSingleton(Zs.a, Ks), l.ModuleContainer.registerSingleton(Ps.a, Bs);
            var Yi, en = s("Xvw2"),
                tn = s("5uwv"),
                sn = s("lCn6"),
                nn = s("kg13"),
                an = s("dJFb");
            const rn = 2,
                on = {
                    userId: "",
                    friendRequestType: rn,
                    friendRequestSource: 85
                };
            var ln;
            ! function (e) {
                e.SUGGEST = "suggest", e.REQUEST = "request", e.UNREADREQ = "unread-req"
            }(ln || (ln = {}));
            Object(ht.b)(en.b)(Yi = Reflect.metadata("design:type", Function)(Yi = Reflect.metadata("design:paramtypes", [])(Yi = class extends k.b {
                constructor() {
                    super(), this.sugguestList = void 0, this.requestList = void 0, this.unreadFRList = void 0, this._ebFriendRequestSend = e => {
                        const t = this.unreadFRList.filter((t => t !== e));
                        t.length !== this.unreadFRList.length && (de.default.removeFriend(e), $e.default.logCoreError("[reddot-check] SEND_FRIEND_REQUEST: " + JSON.stringify(e)), this.unreadFRList = t, Object(je.h)(this.name, ln.UNREADREQ))
                    }, this._ebFriendFetch = e => {
                        for (let t in e)
                            if (e.hasOwnProperty(t)) {
                                const e = this.requestList.slice();
                                for (let s = 0; s < e.length; s++)
                                    if (e[s] === t) {
                                        e.splice(s, 1);
                                        break
                                    } e.length !== this.requestList.length && (this.requestList = e, Object(je.h)(this.name, ln.REQUEST))
                            }
                    }, this._ebFrReqFetch = e => {
                        $e.default.log("friendNotificationAction: friend requests fetched", e);
                        const t = this.requestList.reduce(((e, t) => (e[t] || (e[t] = !0), e)), {}),
                            s = this.requestList.slice();
                        for (let i of e) t[i.userId] || s.unshift(i);
                        this.requestList = s, Object(je.h)(this.name, ln.REQUEST)
                    }, this._ebFrReqRemove = e => {
                        $e.default.log("friendNotificationAction: friend requests removed", e);
                        const t = this.requestList.filter((t => -1 === e.indexOf(t)));
                        t.length !== this.requestList.length && (this.requestList = t, Object(je.h)(this.name, ln.REQUEST)), this.onFriendListNotificationsChange({
                            action: "remove",
                            ids: e
                        })
                    }, this.name = en.a, this.data = new Map, this.key = "userId", this.sugguestList = [], this.requestList = [], this.unreadFRList = [], this.listenEvents()
                }
                listenEvents() {
                    We.default.subscribe(((e, t) => {
                        switch (e) {
                            case qe.ChatBoxActions.SEND_FRIEND_REQUEST:
                                this._ebFriendRequestSend(t);
                                break;
                            case qe.FetchActions.FRIENDS_FETCHED:
                                this._ebFriendFetch(t);
                                break;
                            case qe.FetchActions.FRIEND_REQUESTS_FETCHED:
                                this._ebFrReqFetch(t);
                                break;
                            case qe.FetchActions.FRIEND_REQUESTS_REMOVED:
                                this._ebFrReqRemove(t)
                        }
                    }))
                }
                onAddFriend(e) {
                    nn.a.removeSuggest(e.userId), this.onFriendListNotificationsChange({
                        action: "remove",
                        ids: [e.userId]
                    })
                }
                onReceiveFriendRequests(e) {
                    if (!e || e.length < 1) return;
                    for (let s = 0; s < e.length; s++) {
                        let t = e[s];
                        t && nn.a.removeSuggest(t.userId)
                    }
                    an.d.setUnreadRequest(1);
                    for (let s = 0; s < e.length; s++) e[s] && Et.q.addNewFriendItem(e[s].userId);
                    it.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, an.d.getUnreadRequest());
                    let t = e.map((e => ({
                        dataInfo: Object(i.a)(Object(i.a)({}, e), {}, {
                            recommInfo: {
                                message: e.friendRequestMsg,
                                source: e.friendRequestSource
                            },
                            recommType: rn
                        }),
                        recommItemType: e.friendRequestType
                    })));
                    nn.a.addRequest(t), this.broadcastEvent(tn.b.ReceiveRequest, "", {
                        uids: e.map((e => e.userId))
                    })
                }
                onRemoveSuggest(e, t, s) {
                    return nn.a.removeSuggestFriend(e, t, s).then((t => {
                        this.broadcastEvent(tn.b.RemoveSuggest, e)
                    }))
                }
                onPromoteFriends() {
                    it.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, 1)
                }
                onFriendRequestFetched() {}
                onFriendListNotificationsChange(e) {
                    if (!e.ids || !e.ids.length) return void("clear" === e.action && (this.unreadFRList = [], Object(je.h)(this.name, ln.UNREADREQ)));
                    let t = this.unreadFRList;
                    if ("remove" === e.action) t = t.filter((t => -1 === e.ids.indexOf(t)));
                    else if ("add" === e.action) {
                        const s = [];
                        for (let i of e.ids) - 1 === t.indexOf(i) && s.push(i);
                        s.length && (t = t.concat(s))
                    }
                    t.length !== this.unreadFRList.length && (this.unreadFRList = t, Object(je.h)(this.name, ln.UNREADREQ))
                }
                acceptFriendRequest(e) {
                    return new Promise(((t, s) => {
                        const n = this.data.get(e);
                        if (!n) return gs.a.acceptAddFriend(e).then((e => t(!0))).catch(s);
                        let a;
                        if (n.friendRequestType === v.FRIEND_REQUEST_TYPE_SUGGEST) {
                            if (n.requested) return a = 104097, gt.e.logAction(a), t(!1);
                            const r = Tt.default.trans("STR_MSG_DEFAULT_REQ_ADD_FR", tt.default.getMiniProfileMe().zaloName);
                            gs.a.requestAddFriend(e, r, n.friendRequestSource).then((() => {
                                Mt.a.createSuccess(Tt.default.str("STR_REQ_FR_SUCCESS")), de.default.removeFriend(e), nn.a.removeSuggest(e);
                                const s = Object(i.a)(Object(i.a)({}, n), {}, {
                                    requested: !0
                                });
                                this.broadcastEvent(tn.b.SentFriendReq, e), this.data.set(e, s), this.onFriendListNotificationsChange({
                                    action: "remove",
                                    ids: [e]
                                }), t(!0)
                            })).catch((e => {
                                this.handleFailureFriendRq(e), s(e)
                            })), a = 104096
                        } else gs.a.acceptAddFriend(e).then((() => {
                            this.data.delete(e), Object(je.e)(this.name, e), this.onFriendListNotificationsChange({
                                action: "remove",
                                ids: [e]
                            }), this.broadcastEvent(tn.b.AcceptRequest, e), sn.a.getUser(e).then((t => {
                                We.default.send(qe.FetchActions.FRIENDS_FETCHED, {
                                    [e]: Object(i.a)(Object(i.a)({}, $e.default.reformatConversationFromFriend(t)), {}, {
                                        isFr: 1
                                    })
                                })
                            })), de.default.getAcceptNewFriend(n), t(!0)
                        })).catch((e => {
                            this.handleFailureFriendRq(e), s(e)
                        })), a = 104095;
                        a && gt.e.logAction(a)
                    }))
                }
                async rejectFriendRequest(e) {
                    const t = this.data.get(e),
                        s = () => {
                            Mt.a.createSuccess(Tt.default.str("STR_TOAST_REJECT_REQUEST")), de.default.removeFriend(e), nn.a.removeSuggest(e), this.broadcastEvent(tn.b.RejectRequest, e)
                        },
                        i = e => {
                            $e.default.logCoreError(e), e && e.error_message && Mt.a.createError(e.error_message)
                        };
                    t && t.friendRequestSource ? Ve.default.removeRecommendedFriend(e, t.friendRequestSource).then(s).catch(i) : gs.a.rejectRequestAddFriend(e).then(s).catch(i), this.data.delete(e), this.onFriendListNotificationsChange({
                        action: "remove",
                        ids: [e]
                    }), gt.e.logAction(104094)
                }
                undoRequestFriend(e) {
                    e && gs.a.undoRequestAddFriend(e).catch((e => {
                        e.error_message && Mt.a.createError(e.error_message)
                    }))
                }
                clearUnreadFriendRequest() {
                    it.a.UnreadDataManager.updateUnreadCount(v.FAKE_CONVERSATION_ID.FRIEND_CENTER, 0), this.unreadFRList = [], Object(je.h)(this.name, ln.UNREADREQ)
                }
                getAllFriendRequests() {
                    return new Promise(((e, t) => {
                        const s = nn.a.getRecommendedFriendsV2(!1, !1);
                        if (!s) return e({});
                        e(this.filterFriendRequest(s))
                    }))
                }
                getAllFriendRequestsSync() {
                    const e = nn.a.getRecommendedFriendsSync();
                    return e ? this.filterFriendRequest(e) : {}
                }
                init() {
                    de.default.getFriends(null, !0).then((e => {
                        if (e) {
                            const t = de.default.getLastContactListOpenTime(),
                                s = e.filter((e => e && e.friendRequestFetchTime > t)).map((e => e.userId));
                            s.length && this.onFriendListNotificationsChange({
                                action: "add",
                                ids: s
                            })
                        }
                    }))
                }
                getItem(e) {
                    return on
                }
                getList(e) {
                    return e.key === ln.UNREADREQ ? this.unreadFRList : []
                }
                onGetItemFailure(e) {}
                onGetListFailure(e) {}
                handleFailureFriendRq(e) {
                    if ($e.default.logCoreError(e), e && e.error_message) {
                        let t = e.error_message;
                        [224, 251].includes(e.error_code) && (t = Tt.default.trans(`STR_FRIEND_REQUEST_FAIL_${e.error_code}`, ["" + He.default.limitFriends])), Mt.a.createMessage(t, 3e3)
                    }
                }
                filterFriendRequest(e) {
                    const t = {};
                    for (let s in e)
                        if (e.hasOwnProperty(s)) {
                            let i = e[s];
                            i && i.dataInfo.recommType === rn && (t[s] = i, t[s].friendRequestType = i.dataInfo.recommType)
                        } return t
                }
                broadcastEvent(e, t, s) {
                    this.dispatchEvent(new tn.a(e, t, s)), this.dispatchEvent(new tn.a(tn.b.FriendCenterChange, t, Object(i.a)(Object(i.a)({}, s), {}, {
                        act: e
                    })))
                }
            }) || Yi) || Yi);
            var dn = s("5cla"),
                cn = s("WV6O");
            class hn {
                static resetNewFriendList() {
                    delete this.newListFriend, this.newListFriend = void 0
                }
                static addNewFriendUid(e) {
                    void 0 === this.newListFriend && this.getNewFriendList(), this.newListFriend.push(e)
                }
                static getNewFriendList() {
                    de.default.removeNewFriend("", !0);
                    let e = [];
                    try {
                        const t = u.a.getInstance().getItemForCurrentUser("f_nf");
                        t && (e = JSON.parse(t))
                    } catch (t) {}
                    this.newListFriend = e.map((e => e.userId))
                }
                static getFriendList(e) {
                    const {
                        userId: t
                    } = e, s = [];
                    return new Promise(((e, i) => {
                        tt.default.getFriends().then((i => {
                            if (i) {
                                const n = Boolean(_t.g.getConfigShowAllUser(t));
                                for (let e = 0; e < i.length; e++)(1 === i[e].isFr || i[e].isFr || i[e].userId === He.default.supportPage) && i[e].userId != t && i[e].isValid && i[e].userId != He.default.sendToMeId && (n || i[e].isActive || i[e].isActivePC || i[e].isActiveWeb) && s.push(i[e].userId);
                                e(s)
                            } else e([])
                        })).catch((e => i(e)))
                    }))
                }
                static getFriendInfo(e) {
                    var t;
                    const {
                        userId: s
                    } = e, i = tt.default.getProfileFriendSync(s);
                    return i ? (void 0 === this.newListFriend && this.getNewFriendList(), {
                        userId: i.userId,
                        avatar: i.avatar,
                        displayName: i.displayName,
                        isFr: i.isFr,
                        zaloName: i.zaloName,
                        bizPkg: i.bizPkg,
                        bizInfo: i.bizInfo,
                        isNewFriend: (null === (t = this.newListFriend) || void 0 === t ? void 0 : t.includes(s)) || !1,
                        isBlocked: i.isBlocked
                    }) : null
                }
            }
            hn.newListFriend = void 0;
            class un {
                static getGroupList(e) {
                    return new Promise(((e, t) => {
                        Dt.default.getGroupsList().then((t => {
                            const s = t.map((e => e.userId));
                            e(s)
                        })).catch(t)
                    }))
                }
                static getGroupInfo(e) {
                    const {
                        userId: t
                    } = e;
                    return new Promise(((e, s) => {
                        Dt.default.getGroupById(t).then((t => {
                            e({
                                userId: t.userId,
                                avatar: t.avatar,
                                displayName: t.displayName,
                                topMember: t.topMember,
                                totalMember: t.totalMember,
                                creatorId: t.creatorId
                            })
                        })).catch(s)
                    }))
                }
                static getGroupInfoSync(e) {
                    const {
                        userId: t
                    } = e, s = Dt.default.getGroupByIdSync(t);
                    return s ? {
                        userId: s.userId,
                        avatar: s.avatar,
                        displayName: s.displayName,
                        topMember: s.topMember,
                        totalMember: s.totalMember,
                        creatorId: s.creatorId
                    } : null
                }
            }
            class gn {
                static getRecommendFriendList() {
                    return new Promise(((e, t) => {
                        Ve.default.getRecommendedFriends().then((t => e(t.recommItems))).catch(t)
                    }))
                }
                static getRelatedGroup(e) {
                    return new Promise(((t, s) => {
                        Ve.default.getRelatedGroup(e).then(t).catch(s)
                    }))
                }
                static getRequestedFriendList() {
                    return new Promise(((e, t) => {
                        Ve.default.getRequestedFriends().then(e).catch(t)
                    }))
                }
                static acceptAddFriend(e) {
                    return gs.a.acceptAddFriend(e)
                }
                static rejectAddFriend(e) {
                    return gs.a.rejectRequestAddFriend(e)
                }
                static makeUndoSentRequestFriend(e) {
                    return gs.a.undoRequestAddFriend(e.userId)
                }
                static removeSuggestFriend(e) {
                    return new Promise(((t, s) => {
                        Ve.default.removeRecommendedFriendV2(e.uid, e.src, e.type).then(t).catch(s)
                    }))
                }
            }
            var mn;
            const pn = {
                    currentView: cn.c.FRIEND_LIST,
                    unread: {
                        newFriendRequests: [],
                        newGroupRequests: []
                    }
                },
                fn = "1",
                vn = "ctt_l_a",
                bn = "ctt_l_r";
            Object(ht.b)(dn.b)(mn = Reflect.metadata("design:type", Function)(mn = Reflect.metadata("design:paramtypes", [])(mn = class {
                constructor() {
                    this.type = void 0, this.name = void 0, this.key = void 0, this.currentTab = void 0, this.data = new Map, this._Logger = void 0, this.name = dn.a, this.key = dn.a, this.data.set(fn, pn), this.currentTab = ""
                }
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.contactTabV2, [this.name])), this._Logger
                }
                _updateState(e, t, s) {
                    void 0 === t && (t = fn), void 0 === s && (s = !0), this.data.set(t, e), s && Object(je.g)(this.name, t)
                }
                _getState(e) {
                    void 0 === e && (e = fn);
                    return this.data.get(e)
                }
                _getAccessTime() {
                    try {
                        return JSON.parse(u.a.getInstance().getItemForCurrentUser(vn))
                    } catch (e) {
                        return this.Logger.zsymb(18, 9649, 3e4, "[_getAccessTime], error: " + JSON.stringify(e)), null
                    }
                }
                _setAccessTime(e) {
                    u.a.getInstance().setItemForCurrentUser(vn, JSON.stringify(e))
                }
                _setLastRequestFriendTime(e, t, s) {
                    let i = [];
                    try {
                        i = JSON.parse(u.a.getInstance().getItemForCurrentUser(bn)) || []
                    } catch (a) {
                        this.Logger.zsymb(18, 9649, 30001, "[_setLastRequestFriendTime], error: " + JSON.stringify(a))
                    }
                    let n = [];
                    switch (e) {
                        case "NEW":
                            i.find((e => (null == e ? void 0 : e.userId) === s)) ? (n = i.filter((e => e.userId !== s)), n = [{
                                ts: t,
                                userId: s
                            }, ...i]) : n = [{
                                ts: t,
                                userId: s
                            }, ...i];
                            break;
                        case "REMOVE":
                            n = i.filter((e => e.userId !== s))
                    }
                    u.a.getInstance().setItemForCurrentUser(bn, JSON.stringify(n))
                }
                _getLastRequestAddFriendTime() {
                    let e;
                    try {
                        e = JSON.parse(u.a.getInstance().getItemForCurrentUser(bn))
                    } catch (t) {
                        this.Logger.zsymb(18, 9649, 30002, "[_getLastRequestAddFriendTime], error: " + JSON.stringify(t))
                    }
                    return e ? e[0] : null
                }
                _onChangeView(e) {
                    switch (l.ModuleContainer.resolve(ut.l).updateSelectedId(null), e) {
                        case cn.c.FRIEND_LIST:
                            Object(Ee.f)({
                                type: qe.SideBarActions.SELECT_FRIEND_LIST,
                                payload: {
                                    userId: "999"
                                }
                            });
                            break;
                        case cn.c.GROUP_LIST:
                            Object(Ee.f)({
                                type: qe.SideBarActions.SELECT_GROUP_CENTER,
                                payload: {
                                    userId: "999"
                                }
                            });
                            break;
                        case cn.c.FRIEND_REQUEST:
                            Object(Ee.f)({
                                type: qe.SideBarActions.SELECT_FRIEND_CENTER,
                                payload: {
                                    userId: "999"
                                }
                            })
                    }
                }
                _onUpdateUnreadRequest(e, t) {
                    const s = this._getState();
                    if (!s) return;
                    let n = s.unread;
                    switch (t) {
                        case "FRIEND":
                            n.newFriendRequests.push(e);
                            break;
                        case "GROUP":
                            n.newGroupRequests.push(e)
                    }
                    this._updateState(Object(i.a)(Object(i.a)({}, s), {}, {
                        unread: n
                    }), fn, !0)
                }
                _clearUnreadRequest() {
                    const e = this._getState();
                    if (!e) return;
                    let t = e.unread;
                    t.newFriendRequests = [], t.newGroupRequests = [], this._updateState(Object(i.a)(Object(i.a)({}, e), {}, {
                        unread: t
                    }), fn, !0)
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                getItem(e, t) {
                    return this._getState(e.key)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
                resetTabData() {
                    this.currentTab = "", hn.resetNewFriendList(), l.ModuleContainer.resolve(dn.b).resetData(), l.ModuleContainer.resolve(dn.f).resetData(), l.ModuleContainer.resolve(dn.e).resetData(), l.ModuleContainer.resolve(dn.j).resetData(), l.ModuleContainer.resolve(dn.i).resetData(), l.ModuleContainer.resolve(dn.m).resetData()
                }
                resetData() {
                    const e = this._getState();
                    e && this._updateState(Object(i.a)(Object(i.a)({}, e), {}, {
                        currentView: cn.c.FRIEND_LIST
                    }))
                }
                changeView(e) {
                    const t = this._getState();
                    t && this._updateState(Object(i.a)(Object(i.a)({}, t), {}, {
                        currentView: e
                    }), fn, !0), this.currentTab = e, this._onChangeView(e)
                }
                onClickContabTabEntry() {
                    if (document.getElementById("ContactTabV2")) {
                        const e = this._getState(),
                            t = (null == e ? void 0 : e.currentView) || pn.currentView;
                        this._onChangeView(t)
                    }
                }
                onContactTab(e) {
                    this._setAccessTime(e), this._clearUnreadRequest()
                }
                getDefaultView() {
                    if (this.currentTab) return this.currentTab;
                    const e = this._getAccessTime(),
                        t = this._getLastRequestAddFriendTime();
                    if (!t) return this.currentTab = cn.c.FRIEND_LIST, this.currentTab;
                    const s = !He.default.contactTabV2.enable_rule_last_view_friend_req || e && t.ts < e,
                        i = t.ts < Date.now() - 864e5;
                    return this.currentTab = i && s ? cn.c.FRIEND_LIST : cn.c.FRIEND_REQUEST, this.currentTab
                }
                onUpdateRequestTracking(e, t, s, i) {
                    if ("NEW" === t ? this._onUpdateUnreadRequest(i, e) : "REMOVE" === t && this._clearUnreadRequest(), "FRIEND" === e) this._setLastRequestFriendTime(t, s || 0, i)
                }
                onInitUnreadRequest() {
                    const e = this._getState();
                    let t = (null == e ? void 0 : e.unread) || pn.unread;
                    const s = (null == e ? void 0 : e.currentView) || pn.currentView,
                        i = this._getAccessTime(),
                        n = this._getLastRequestAddFriendTime();
                    n && i && (i < n.ts && t.newFriendRequests.push(n.userId), this._updateState({
                        currentView: s,
                        unread: t
                    }, fn, !0))
                }
            }) || mn) || mn);
            var In = s("iq5K");
            const yn = (e, t) => {
                    const s = $e.default.simpleStripVietnamese(t).split(" "),
                        i = $e.default.simpleStripVietnamese(e).split(" ");
                    return (() => {
                        const e = [];
                        for (const t of s) {
                            let s = !1;
                            for (let n = 0; n < i.length; ++n)
                                if (i[n].startsWith(t) && !e.includes(n)) {
                                    e.push(n), s = !0;
                                    break
                                } if (!s) return !1
                        }
                        return !0
                    })()
                },
                Cn = e => new Promise(((t, s) => {
                    if (!e) return t(e);
                    setTimeout((() => {
                        t(e)
                    }), e)
                }));
            var Sn;
            Object(ht.b)(dn.f)(Sn = Object(l.injectable)()(Sn = function (e, t) {
                return l.ModuleContainer.inject(dn.e)(e, void 0, 0)
            }(Sn = function (e, t) {
                return l.ModuleContainer.inject(ut.f)(e, void 0, 1)
            }(Sn = Reflect.metadata("design:type", Function)(Sn = Reflect.metadata("design:paramtypes", [void 0 === dn.e ? Object : dn.e, void 0 === ut.f ? Object : ut.f])(Sn = class {
                constructor(e, t) {
                    this.friendInfoManager = e, this.labelDataManager = t, this.type = void 0, this.name = void 0, this.key = void 0, this.listState = void 0, this.listFriend = void 0, this.initListFriend = void 0, this.currentPage = void 0, this.didSort = void 0, this.eventBusInstance = void 0, this._Logger = void 0, this.name = dn.d, this.key = dn.d, this.listState = In.d, this.listFriend = [], this.initListFriend = [], this.currentPage = 1, this.didSort = !1, this.eventBusInstance = null
                }
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.contactTabV2, [this.name])), this._Logger
                }
                _signalRenderList() {
                    Object(je.h)(this.name, "all")
                }
                _signalRenderItem() {
                    Object(je.g)(this.name, "all")
                }
                _signalRenderBoth() {
                    Object(je.g)(this.name, "all"), Object(je.h)(this.name, "all")
                }
                _onRemoveFriend(e) {
                    this.listFriend.includes(e.userId) && (this.listFriend.splice(this.listFriend.indexOf(e.userId), 1), this.initListFriend.splice(this.initListFriend.indexOf(e.userId), 1), this.listState.totalRecord = this.listFriend.length, this._signalRenderBoth())
                }
                _onAddFriend(e) {
                    this.listFriend.includes(e.userId) || (this.listFriend.unshift(e.userId), this.initListFriend.unshift(e.userId), hn.addNewFriendUid(e.userId), this._signalRenderList())
                }
                _getItemInfo(e) {
                    return this.friendInfoManager.getItem({
                        key: e,
                        version: 1,
                        extraData: null
                    }, null) || this.friendInfoManager.loadInfoNotRender({
                        userId: e
                    })
                }
                _onBlockFriend(e) {
                    this.friendInfoManager.onLoadInfo({
                        userId: e.userId
                    })
                }
                _onUnBlockFriend(e) {
                    this.friendInfoManager.onLoadInfo({
                        userId: e.userId
                    })
                }
                _onEditAlias(e) {
                    this.friendInfoManager.onLoadInfo({
                        userId: e.userId
                    }), this.listFriend = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !this.isDidSort(), !1), this.listState.totalRecord = this.listFriend.length, this._signalRenderBoth()
                }
                _onUpdateTagConv(e, t) {
                    void 0 === t && (t = "add");
                    let s = !1;
                    e.convIds.forEach((i => {
                        if (this.friendInfoManager.onLoadInfo({
                                userId: i
                            }), this.listState.searching.filter.label.id && this.listState.searching.filter.label.id === +e.labelId) {
                            const e = this.listFriend.findIndex((e => e === i));
                            "remove" === t && -1 !== e ? (this.listFriend.splice(e, 1), this.listState.totalRecord = Math.max(this.listState.totalRecord - 1, 0), s = !0) : "add" === t && -1 === e && (this.listFriend.push(i), this.listFriend = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !1, !1), this.listState.totalRecord = this.listFriend.length, s = !0)
                        }
                    })), s && this._signalRenderBoth()
                }
                addComponentListeners() {
                    tt.default.subscribeEventFriend(v.EventFriend.REMOVE_FRIEND, this._onRemoveFriend.bind(this)), tt.default.subscribeEventFriend(v.EventFriend.ADD_FRIEND, this._onAddFriend.bind(this)), tt.default.subscribeEventFriend(v.EventFriend.BLOCK_FRIEND, this._onBlockFriend.bind(this)), tt.default.subscribeEventFriend(v.EventFriend.UNBLOCK_FRIEND, this._onUnBlockFriend.bind(this)), this.eventBusInstance = We.default.on(qe.FetchActions.UPDATE_NAME, this._onEditAlias.bind(this)), this.labelDataManager.addEventListener(ut.g.LabelAddConvs, (e => {
                        this._onUpdateTagConv(e.payload, "add")
                    })), this.labelDataManager.addEventListener(ut.g.LabelRemoveConvs, (e => {
                        this._onUpdateTagConv(e.payload, "remove")
                    }))
                }
                removeComponentListeners() {
                    tt.default.unsubscribeEventFriend(v.EventFriend.REMOVE_FRIEND, this._onRemoveFriend.bind(this)), tt.default.unsubscribeEventFriend(v.EventFriend.ADD_FRIEND, this._onAddFriend.bind(this)), tt.default.unsubscribeEventFriend(v.EventFriend.BLOCK_FRIEND, this._onBlockFriend.bind(this)), tt.default.unsubscribeEventFriend(v.EventFriend.UNBLOCK_FRIEND, this._onUnBlockFriend.bind(this)), this.eventBusInstance && this.eventBusInstance.remove(), this.labelDataManager.removeEventListener(ut.g.LabelAddConvs, (e => {
                        this._onUpdateTagConv(e.payload, "add")
                    })), this.labelDataManager.removeEventListener(ut.g.LabelRemoveConvs, (e => {
                        this._onUpdateTagConv(e.payload, "remove")
                    }))
                }
                async onLoadList(e) {
                    try {
                        const t = await hn.getFriendList(e);
                        this.listFriend = t, this.initListFriend = t, this.listState.totalRecord = t.length, this.listFriend = this._handleFilter(In.g.searching.searchText, In.g.searching.sorter, In.g.searching.filter, !0, !1), this.initListFriend = this._handleFilter(In.g.searching.searchText, In.g.searching.sorter, In.g.searching.filter, !0, !0), this.listState.totalRecord = this.listFriend.length, this._signalRenderItem(), this._signalRenderList()
                    } catch (t) {
                        this.Logger.zsymb(18, 9651, 3e4, "[FriendListController] -> [onLoadList], error: " + JSON.stringify(t))
                    }
                }
                onLoadMore() {
                    this.currentPage++, this._signalRenderList()
                }
                onFilterByName(e) {
                    if (!e) return [...this.initListFriend];
                    return [...this.initListFriend].filter((t => {
                        const s = this._getItemInfo(t);
                        return yn((null == s ? void 0 : s.displayName.toLowerCase()) || "", e.toLowerCase())
                    }))
                }
                onFilterByLabel(e, t) {
                    if (!e) return t;
                    if (0 === e.length) return [];
                    return t.filter((t => e.includes(t)))
                }
                onFilterAll(e) {
                    return e
                }
                onFilterHidden(e, t, s) {
                    return t || e ? s : s.filter((e => !vt.a.isThreadHidden(e)))
                }
                onSortAlpha(e, t) {
                    if (e === In.o.DEFAULT) return t;
                    return t.sort(((t, s) => {
                        const i = this._getItemInfo(t),
                            n = this._getItemInfo(s);
                        return ((t, s) => {
                            const i = /^[a-zA-Z]/,
                                n = i.test($e.default.simpleStripVietnamese(t)),
                                a = i.test($e.default.simpleStripVietnamese(s));
                            switch (e) {
                                case In.o.ALPHA_INCREASE:
                                    return !n && a ? 1 : n && !a ? -1 : t.localeCompare(s);
                                case In.o.ALPHA_DECREASE:
                                    return !n && a ? -1 : n && !a ? 1 : s.localeCompare(t);
                                default:
                                    return 0
                            }
                        })((null == i ? void 0 : i.displayName.toLowerCase()) || (null == i ? void 0 : i.zaloName.toLowerCase()) || "", (null == n ? void 0 : n.displayName.toLowerCase()) || (null == n ? void 0 : n.zaloName.toLowerCase()) || "")
                    }))
                }
                onMovingNewFriend(e) {
                    let t = [],
                        s = [];
                    for (let i = e.length - 1; i >= 0; i--) {
                        const n = this._getItemInfo(e[i]);
                        null != n && n.isNewFriend ? t.unshift(null == n ? void 0 : n.userId) : s.unshift(null == n ? void 0 : n.userId)
                    }
                    return [...t, ...s]
                }
                _handleFilter(e, t, s, i, n) {
                    var a;
                    let r = [];
                    return r = this.onFilterByName(e), r = this.onFilterByLabel(null == s || null === (a = s.label) || void 0 === a ? void 0 : a.convs, r), r = this.onFilterAll(r), r = this.onSortAlpha(t, r), r = this.onFilterHidden(n, e, r), i && (r = this.onMovingNewFriend(r)), r
                }
                _checkDidSort(e) {
                    return e !== In.o.ALPHA_INCREASE ? this.didSort = !0 : this.didSort = !1, this.didSort
                }
                isDidSort() {
                    return this.didSort
                }
                _updateInitListFriendWithoutDockNewFriends() {
                    this.initListFriend = this._handleFilter(In.g.searching.searchText, In.g.searching.sorter, In.g.searching.filter, !1, !0), this.listState.totalRecord = this.listFriend.length
                }
                onFilter(e, t, s) {
                    const i = this._checkDidSort(t);
                    i && this._updateInitListFriendWithoutDockNewFriends(), this.listFriend = this._handleFilter(e, t, s, !i, !1), this.listState.totalRecord = this.listFriend.length, this._signalRenderItem(), this._signalRenderList()
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                getItem(e, t) {
                    return this.listState
                }
                getList(e, t) {
                    return this.listFriend
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
                setSearchText(e) {
                    this.listState.searching.searchText = e, this._signalRenderItem()
                }
                setSorter(e) {
                    this.listState.searching.sorter = e, this._signalRenderItem()
                }
                setFilter(e) {
                    this.listState.searching.filter = e, this._signalRenderItem()
                }
                getFilter() {
                    return this.listState.searching.filter
                }
                getSorter() {
                    return this.listState.searching.sorter
                }
                resetData() {
                    this.listFriend = [], this.initListFriend = []
                }
                resetState() {
                    this.listState = {
                        totalRecord: 0,
                        searching: {
                            searchText: "",
                            sorter: In.o.ALPHA_INCREASE,
                            filter: {
                                label: {
                                    convs: null,
                                    id: null
                                },
                                admin: "",
                                all: !0
                            }
                        }
                    }, this.currentPage = 1, this.didSort = !1
                }
            }) || Sn) || Sn) || Sn) || Sn) || Sn);
            var _n;
            Object(ht.b)(dn.e)(_n = Reflect.metadata("design:type", Function)(_n = Reflect.metadata("design:paramtypes", [])(_n = class {
                constructor() {
                    this.type = void 0, this.name = void 0, this.key = void 0, this.data = new Map, this.name = dn.c, this.key = dn.c
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                onLoadInfo(e) {
                    const t = hn.getFriendInfo(e);
                    t && (this.data.set(e.userId, t), Object(je.g)(this.name, e.userId))
                }
                loadInfoNotRender(e) {
                    const t = hn.getFriendInfo(e);
                    return t ? (this.data.set(e.userId, t), t) : null
                }
                getItem(e, t) {
                    return this.data.get(e.key)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
                resetData() {
                    this.data.clear()
                }
            }) || _n) || _n);
            var En;
            Object(ht.b)(dn.j)(En = Object(l.injectable)()(En = function (e, t) {
                return l.ModuleContainer.inject(dn.i)(e, void 0, 0)
            }(En = function (e, t) {
                return l.ModuleContainer.inject(lt.g)(e, void 0, 1)
            }(En = function (e, t) {
                return l.ModuleContainer.inject(ut.f)(e, void 0, 2)
            }(En = Reflect.metadata("design:type", Function)(En = Reflect.metadata("design:paramtypes", [void 0 === dn.i ? Object : dn.i, void 0 === lt.g ? Object : lt.g, void 0 === ut.f ? Object : ut.f])(En = class {
                constructor(e, t, s) {
                    this.groupInfoManager = e, this.previewDataManager = t, this.labelDataManager = s, this.type = void 0, this.name = void 0, this.key = void 0, this.listState = void 0, this.listGroup = void 0, this.initListGroup = void 0, this.currentPage = void 0, this._Logger = void 0, this.name = dn.h, this.key = dn.h, this.listState = In.e, this.listGroup = [], this.initListGroup = [], this.currentPage = 1
                }
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.contactTabV2, [this.name])), this._Logger
                }
                _signalRenderList() {
                    Object(je.h)(this.name, "all")
                }
                _signalRenderItem() {
                    Object(je.g)(this.name, "all")
                }
                _signalRenderBoth() {
                    Object(je.g)(this.name, "all"), Object(je.h)(this.name, "all")
                }
                _getItemInfo(e) {
                    return this.groupInfoManager.getItem({
                        key: e,
                        version: 1,
                        extraData: null
                    }, null) || this.groupInfoManager.loadInfoNotRender({
                        userId: e
                    })
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                getItem(e, t) {
                    return this.listState
                }
                async onLoadList() {
                    try {
                        const e = await un.getGroupList({});
                        this.listGroup = e, this.initListGroup = e, this.listState.totalRecord = e.length, this.groupInfoManager.loadMultiGroupInfo(this.initListGroup), this.listGroup = this._handleFilter(In.h.searching.searchText, In.h.searching.sorter, In.h.searching.filter, !1), this.initListGroup = this._handleFilter(In.h.searching.searchText, In.h.searching.sorter, In.h.searching.filter, !0), this.listState.totalRecord = this.listGroup.length, this._signalRenderItem(), this._signalRenderList()
                    } catch (e) {
                        this.Logger.zsymb(18, 9653, 3e4, "[GroupListController] -> [onLoadList], error: " + JSON.stringify(e))
                    }
                }
                onLoadMore() {
                    this.currentPage++, this._signalRenderList()
                }
                onFilterByName(e) {
                    if (!e) return [...this.initListGroup];
                    return this.initListGroup.filter((t => {
                        const s = this._getItemInfo(t);
                        return yn((null == s ? void 0 : s.displayName.toLowerCase()) || "", e.toLowerCase())
                    }))
                }
                onFilterByLabel(e, t) {
                    if (!e) return t;
                    if (0 === e.length) return [];
                    return t.filter((t => e.includes(t)))
                }
                onFilterMyAdminGroup(e, t) {
                    if (!e) return t;
                    return t.filter((t => {
                        const s = this._getItemInfo(t);
                        return (null == s ? void 0 : s.creatorId) === e
                    }))
                }
                onFilterAll(e) {
                    return e
                }
                onSortAlpha(e, t) {
                    return e === In.o.DEFAULT || e === In.o.ACTION_INCREASE || e === In.o.ACTION_DECREASE ? t : t.sort(((t, s) => {
                        const i = this._getItemInfo(t),
                            n = this._getItemInfo(s),
                            a = (null == i ? void 0 : i.displayName.toLowerCase()) || "",
                            r = (null == n ? void 0 : n.displayName.toLowerCase()) || "";
                        switch (e) {
                            case In.o.ALPHA_INCREASE:
                                return a.localeCompare(r);
                            case In.o.ALPHA_DECREASE:
                                return r.localeCompare(a);
                            default:
                                return 0
                        }
                    }))
                }
                onFilterHidden(e, t, s) {
                    return t || e ? s : s.filter((e => !vt.a.isThreadHidden(e)))
                }
                onSortActionTime(e, t) {
                    return e === In.o.DEFAULT || e === In.o.ALPHA_INCREASE || e === In.o.ALPHA_DECREASE ? t : t.sort(((t, s) => {
                        var i, n;
                        const a = (null === (i = this.previewDataManager.getPreviewByIDSync(t)) || void 0 === i ? void 0 : i.messageTime) || 0,
                            r = (null === (n = this.previewDataManager.getPreviewByIDSync(s)) || void 0 === n ? void 0 : n.messageTime) || 0;
                        switch (e) {
                            case In.o.ACTION_DECREASE:
                                if (r && a) {
                                    if (r > a) return 1;
                                    if (r < a) return -1
                                }
                                return r && !a ? 1 : !r && a ? -1 : 0;
                            case In.o.ACTION_INCREASE:
                                if (r && a) {
                                    if (r < a) return 1;
                                    if (r > a) return -1
                                }
                                return !r && a ? 1 : r && !a ? -1 : 0;
                            default:
                                return 0
                        }
                    }))
                }
                _handleFilter(e, t, s, i) {
                    var n;
                    let a = [];
                    return a = this.onFilterByName(e), a = this.onFilterByLabel(null == s || null === (n = s.label) || void 0 === n ? void 0 : n.convs, a), a = this.onFilterMyAdminGroup((null == s ? void 0 : s.admin) || "", a), a = this.onFilterAll(a), a = this.onSortAlpha(t, a), a = this.onSortActionTime(t, a), a = this.onFilterHidden(i, e, a), a
                }
                onFilter(e, t, s) {
                    this.listGroup = this._handleFilter(e, t, s, !1), this.listState.totalRecord = this.listGroup.length, this._signalRenderItem(), this._signalRenderList()
                }
                _onUpdateTagConv(e, t) {
                    void 0 === t && (t = "add");
                    let s = !1;
                    e.convIds.forEach((i => {
                        if (this.groupInfoManager.onLoadInfo({
                                userId: i
                            }), this.listState.searching.filter.label.id && this.listState.searching.filter.label.id === +e.labelId) {
                            const e = this.listGroup.findIndex((e => e === i));
                            "remove" === t && -1 !== e ? (this.listGroup.splice(e, 1), this.listState.totalRecord = Math.max(this.listState.totalRecord - 1, 0), s = !0) : "add" === t && -1 === e && (this.listGroup.push(i), this.listGroup = this._handleFilter(this.listState.searching.searchText, this.listState.searching.sorter, this.listState.searching.filter, !1), this.listState.totalRecord = this.listGroup.length, s = !0)
                        }
                    })), s && this._signalRenderBoth()
                }
                _onLeaveGroup(e) {
                    for (let t = 0; t < e.length; t++) {
                        if (!this.listGroup.includes(e[t])) return;
                        this.listGroup.splice(this.listGroup.indexOf(e[t]), 1), this.initListGroup.splice(this.listGroup.indexOf(e[t]), 1), this.listState.totalRecord = this.listGroup.length
                    }
                    this._signalRenderBoth()
                }
                addComponentListeners() {
                    Dt.default.subscribeEventGroup(v.EventGroup.LEAVE_GROUP, this._onLeaveGroup.bind(this)), this.labelDataManager.addEventListener(ut.g.LabelAddConvs, (e => {
                        this._onUpdateTagConv(e.payload, "add")
                    })), this.labelDataManager.addEventListener(ut.g.LabelRemoveConvs, (e => {
                        this._onUpdateTagConv(e.payload, "remove")
                    }))
                }
                removeComponentListeners() {
                    Dt.default.unsubscribeEventGroup(v.EventGroup.LEAVE_GROUP, this._onLeaveGroup.bind(this)), this.labelDataManager.removeEventListener(ut.g.LabelAddConvs, (e => {
                        this._onUpdateTagConv(e.payload, "add")
                    })), this.labelDataManager.removeEventListener(ut.g.LabelRemoveConvs, (e => {
                        this._onUpdateTagConv(e.payload, "remove")
                    }))
                }
                getList(e, t) {
                    return this.listGroup
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
                setSearchText(e) {
                    this.listState.searching.searchText = e, this._signalRenderItem()
                }
                setSorter(e) {
                    this.listState.searching.sorter = e, this._signalRenderItem()
                }
                setFilter(e) {
                    this.listState.searching.filter = e, this._signalRenderItem()
                }
                getFilter() {
                    return this.listState.searching.filter
                }
                getSorter() {
                    return this.listState.searching.sorter
                }
                resetData() {
                    this.listGroup = [], this.initListGroup = []
                }
                resetState() {
                    this.listState = {
                        totalRecord: 0,
                        searching: {
                            searchText: "",
                            sorter: In.o.ACTION_DECREASE,
                            filter: {
                                label: {
                                    convs: null,
                                    id: null
                                },
                                admin: "",
                                all: !0
                            }
                        }
                    }, this.currentPage = 1
                }
            }) || En) || En) || En) || En) || En) || En);
            var Ln;
            let wn;
            Object(ht.b)(dn.i)(Ln = Reflect.metadata("design:type", Function)(Ln = Reflect.metadata("design:paramtypes", [])(Ln = class {
                constructor() {
                    this.type = void 0, this.name = void 0, this.key = void 0, this.data = new Map, this.name = dn.g, this.key = dn.g
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                async onLoadInfo(e) {
                    const t = un.getGroupInfoSync(e);
                    t && (this.data.set(e.userId, t), Object(je.g)(this.name, e.userId))
                }
                loadInfoNotRender(e) {
                    const t = un.getGroupInfoSync(e);
                    return t ? (this.data.set(e.userId, t), t) : null
                }
                loadMultiGroupInfo(e) {
                    for (const t of e) this.loadInfoNotRender({
                        userId: t
                    })
                }
                openGroupMemberPopup(e) {
                    const t = this.data.get(e);
                    yt.ModalManagerV2.openModal({
                        windowId: "1",
                        name: v.ModalIdentitiesDefine.GROUP_PROFILE,
                        params: {
                            group_member: t
                        }
                    })
                }
                getItem(e, t) {
                    return this.data.get(e.key)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
                resetData() {
                    this.data.clear()
                }
            }) || Ln) || Ln);
            ! function (e) {
                e[e.RECOMMEND = 1] = "RECOMMEND", e[e.RECEIVE = 2] = "RECEIVE"
            }(wn || (wn = {}));
            const Mn = 500,
                Tn = 500;
            var Fn;
            Object(ht.b)(dn.m)(Fn = function (e, t) {
                return l.ModuleContainer.inject(dn.b)(e, void 0, 0)
            }(Fn = Reflect.metadata("design:type", Function)(Fn = Reflect.metadata("design:paramtypes", [void 0 === dn.b ? Object : dn.b])(Fn = class extends k.b {
                constructor(e) {
                    super(), this.contactTabController = e, this.type = void 0, this.name = void 0, this.key = void 0, this.data = new Map, this._Logger = void 0, this.name = dn.k, this.key = dn.k, this.data.set("all", {
                        isLoadingRecommendFriendList: !1,
                        isLoadingRequestedFriendList: !1,
                        listFriendReceived: [],
                        listFriendSent: [],
                        listFriendSuggest: [],
                        mapRelatedGroup: {}
                    }), this.addPublicListeners()
                }
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.contactTabV2, [this.name])), this._Logger
                }
                _signalRenderItem() {
                    Object(je.g)(this.name, "all")
                }
                init(e) {
                    throw new Error("Method not implemented.")
                }
                getItem(e, t) {
                    return this.data.get(e.key)
                }
                _updateLoadingState(e, t) {
                    const {
                        listFriendReceived: s = [],
                        listFriendSuggest: n = [],
                        listFriendSent: a = []
                    } = this.data.get("all") || {};
                    let {
                        isLoadingRecommendFriendList: r,
                        isLoadingRequestedFriendList: o
                    } = this.data.get("all") || {};
                    if ("RecommendFriendList" === e) switch (t) {
                        case "ON":
                            r || 0 !== s.length || 0 !== n.length || (r = !0);
                            break;
                        case "OFF":
                            r && (r = !1)
                    }
                    if ("RequestedFriendList" === e) switch (t) {
                        case "ON":
                            o || 0 !== a.length || (o = !0);
                            break;
                        case "OFF":
                            o && (o = !1)
                    }
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        isLoadingRecommendFriendList: r,
                        isLoadingRequestedFriendList: o
                    })), this._signalRenderItem()
                }
                async onLoadRequestedFriendList() {
                    const e = Date.now();
                    try {
                        this._updateLoadingState("RequestedFriendList", "ON");
                        const t = await gn.getRequestedFriendList();
                        Date.now() - e < Mn && await Cn(Tn), this._updateLoadingState("RequestedFriendList", "OFF");
                        const s = Object.keys(t).map((e => t[e])).sort(((e, t) => {
                                var s, i;
                                const n = null === (s = e.fReqInfo) || void 0 === s ? void 0 : s.time,
                                    a = null === (i = t.fReqInfo) || void 0 === i ? void 0 : i.time;
                                return a > n ? 1 : a < n ? -1 : 0
                            })),
                            {
                                listFriendReceived: n = [],
                                listFriendSuggest: a = [],
                                mapRelatedGroup: r = {}
                            } = this.data.get("all") || {};
                        this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                            listFriendReceived: n,
                            listFriendSent: s,
                            listFriendSuggest: a,
                            mapRelatedGroup: r
                        })), this._signalRenderItem()
                    } catch (t) {
                        Date.now() - e < Mn && await Cn(Tn), this._updateLoadingState("RequestedFriendList", "OFF"), this.Logger.zsymb(18, 9654, 3e4, "[InvitationController] -> [onLoadRequestedFriendList], error: " + JSON.stringify(t))
                    }
                }
                async onLoadRecommendFriendList() {
                    const e = Date.now();
                    try {
                        this._updateLoadingState("RecommendFriendList", "ON");
                        const t = await gn.getRecommendFriendList();
                        if (Date.now() - e < Mn && await Cn(Tn), this._updateLoadingState("RecommendFriendList", "OFF"), Array.isArray(t) && t.length > 0) {
                            const e = t.filter((e => {
                                    var t;
                                    return (null === (t = e.dataInfo) || void 0 === t ? void 0 : t.recommType) === wn.RECEIVE
                                })),
                                s = t.filter((e => {
                                    var t;
                                    return (null === (t = e.dataInfo) || void 0 === t ? void 0 : t.recommType) === wn.RECOMMEND
                                })),
                                {
                                    listFriendSent: n = [],
                                    mapRelatedGroup: a = {}
                                } = this.data.get("all") || {};
                            this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                                listFriendReceived: e,
                                listFriendSent: n,
                                listFriendSuggest: s,
                                mapRelatedGroup: a
                            })), s.length > 0 && this.dispatchEvent(new cn.b(cn.a.LoadRelatedGroups, "", {})), this._signalRenderItem()
                        }
                    } catch (t) {
                        Date.now() - e < Mn && await Cn(Tn), this._updateLoadingState("RecommendFriendList", "OFF"), this.Logger.zsymb(18, 9654, 30001, "[InvitationController] -> [onLoadRecommendFriendList], error: " + JSON.stringify(t))
                    }
                }
                _handleSortFriendSuggestList(e, t) {
                    return 0 === e.length ? e : e.sort(((e, s) => {
                        var i, n, a, r, o, l;
                        const d = t[null === (i = e.dataInfo) || void 0 === i ? void 0 : i.userId] && t[null === (n = e.dataInfo) || void 0 === n ? void 0 : n.userId].length,
                            c = (null === (a = e.dataInfo) || void 0 === a ? void 0 : a.displayName) || "",
                            h = t[null === (r = s.dataInfo) || void 0 === r ? void 0 : r.userId] && t[null === (o = s.dataInfo) || void 0 === o ? void 0 : o.userId].length,
                            u = (null === (l = s.dataInfo) || void 0 === l ? void 0 : l.displayName) || "";
                        return d && h ? d === h ? c.localeCompare(u) : h > d ? 1 : -1 : d && !h ? -1 : !d && h ? 1 : d || h ? 0 : c.localeCompare(u)
                    }))
                }
                async onLoadRelatedGroupList() {
                    try {
                        const {
                            listFriendSuggest: e = []
                        } = this.data.get("all") || {}, t = e.map((e => {
                            var t;
                            return null == e || null === (t = e.dataInfo) || void 0 === t ? void 0 : t.userId
                        })), s = await gn.getRelatedGroup(t), {
                            listFriendReceived: n = [],
                            listFriendSent: a = []
                        } = this.data.get("all") || {}, r = this._handleSortFriendSuggestList(e, s.groupRelateds);
                        this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                            listFriendReceived: n,
                            listFriendSent: a,
                            listFriendSuggest: r,
                            mapRelatedGroup: s.groupRelateds || {}
                        })), this._signalRenderItem()
                    } catch (e) {
                        this.Logger.zsymb(18, 9654, 30002, "[InvitationController] -> [onLoadRelatedGroupList], error: " + JSON.stringify(e))
                    }
                }
                handleFriendProfileChange(e) {
                    const {
                        listFriendReceived: t = [],
                        listFriendSuggest: s = [],
                        listFriendSent: i = []
                    } = this.data.get("all") || {};
                    Object.keys(e).forEach((e => {
                        const n = tt.default.getDName(e),
                            a = t.findIndex((t => t.dataInfo.userId === e)); - 1 !== a && (t[a].displayName = n);
                        const r = s.findIndex((t => t.dataInfo.userId === e)); - 1 !== r && (s[r].displayName = n);
                        const o = i.findIndex((t => t.userId === e)); - 1 !== o && (i[o].displayName = n)
                    })), this._signalRenderItem()
                }
                handlePublicFriendEvents(e) {
                    const t = e.payload;
                    if (t)
                        for (let i = 0; i < t.length; i++) {
                            var s;
                            const n = t[i].ts,
                                a = "add" === t[i].act && t[i].data || (null === (s = t[i].data) || void 0 === s ? void 0 : s.fromUid),
                                r = a === e.userId;
                            if (n && a && !r && "fr" === t[i].act_type) switch (t[i].act) {
                                case "req_v2":
                                    this.contactTabController.onUpdateRequestTracking("FRIEND", "NEW", n, a);
                                    break;
                                case "undo_req":
                                    this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, a), this.dispatchEvent(new cn.b(cn.a.UndoAddFriendEvent, "", a));
                                    break;
                                case "add":
                                    this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, a), this.dispatchEvent(new cn.b(cn.a.AcceptAddFriendEvent, "", a));
                                    break;
                                case "reject":
                                    this.contactTabController.onUpdateRequestTracking("FRIEND", "REMOVE", n, a), this.dispatchEvent(new cn.b(cn.a.RejectAddFriendEvent, "", a))
                            }
                        }
                }
                handlePublicAddFriendEvent(e) {
                    let t = [];
                    const s = e.payload;
                    if (s) {
                        for (let e = 0; e < s.length; e++) {
                            let i = {};
                            i.userId = s[e].userId, i.zaloName = s[e].zaloName, i.avatar = s[e].avatar, i.displayName = s[e].displayName, i.recommInfo = {
                                message: s[e].friendRequestMsg,
                                source: s[e].friendRequestSource
                            }, i.recommTime = s[e].friendRequestFetchTime, i.recommType = s[e].friendRequestType, t.push({
                                dataInfo: i,
                                recommItemType: 1
                            })
                        }
                        this.dispatchEvent(new cn.b(cn.a.ReceiveAddFriendEvent, "", t))
                    }
                }
                addPublicListeners() {
                    this.addEventListener(cn.a.PublicInvitationEvents, this.handlePublicFriendEvents.bind(this)), this.addEventListener(cn.a.PublicReceiveAddFriendEvent, this.handlePublicAddFriendEvent.bind(this)), tt.default.connectSignalChangeDNameAndAvatar(this.handleFriendProfileChange.bind(this))
                }
                addComponentListeners() {}
                removeComponentListeners() {}
                _addFriendReceived(e) {
                    const {
                        listFriendReceived: t = [],
                        listFriendSent: s = [],
                        listFriendSuggest: n = [],
                        mapRelatedGroup: a = {}
                    } = this.data.get("all") || {}, r = e.concat(t);
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: r,
                        listFriendSent: s,
                        listFriendSuggest: n,
                        mapRelatedGroup: a
                    })), this._signalRenderItem()
                }
                _removeFriendReceived(e) {
                    const {
                        listFriendReceived: t = [],
                        listFriendSent: s = [],
                        listFriendSuggest: n = [],
                        mapRelatedGroup: a = {}
                    } = this.data.get("all") || {}, r = t.filter((t => {
                        var s;
                        return (null === (s = t.dataInfo) || void 0 === s ? void 0 : s.userId) !== e
                    }));
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: r,
                        listFriendSent: s,
                        listFriendSuggest: n,
                        mapRelatedGroup: a
                    })), this._signalRenderItem()
                }
                onUpdateFriendRequests(e, t) {
                    switch (t) {
                        case "ADD":
                            this._addFriendReceived(e);
                            break;
                        case "REMOVE":
                            this._removeFriendReceived(e), this._removeFriendSent(e)
                    }
                }
                async onRejectFriend(e) {
                    return new Promise(((t, s) => {
                        gn.rejectAddFriend(e).then((() => {
                            this._removeFriendReceived(e), t(e)
                        })).catch((e => {
                            this.Logger.zsymb(18, 9654, 30003, "[InvitationController] -> [onRejectFriend], error: " + JSON.stringify(e)), s(e)
                        }))
                    }))
                }
                async onAddFriend(e) {
                    return new Promise(((t, s) => {
                        gn.acceptAddFriend(e).then(t).catch((e => {
                            this.Logger.zsymb(18, 9654, 30004, "[InvitationController] -> [onAddFriend], error: " + JSON.stringify(e)), s(e)
                        }))
                    }))
                }
                removeFriendSent(e) {
                    const {
                        listFriendReceived: t = [],
                        listFriendSent: s = [],
                        listFriendSuggest: n = [],
                        mapRelatedGroup: a = {}
                    } = this.data.get("all") || {}, r = s.filter((t => (null == t ? void 0 : t.userId) !== e));
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: t,
                        listFriendSent: r,
                        listFriendSuggest: n,
                        mapRelatedGroup: a
                    })), this._signalRenderItem()
                }
                onRemoveFriendSent(e) {
                    gn.makeUndoSentRequestFriend(e).then((() => {
                        this.removeFriendSent(e.userId)
                    })).catch((e => {
                        this.Logger.zsymb(18, 9654, 30005, "[InvitationController] -> [onRemoveFriendSent], error: " + JSON.stringify(e)), e && 301 == e.error_code ? Mt.a.createError(Tt.default.str("STR_UNDO_REQUEST_ERROR_301")) : e && "ERR_NO_NETWORK" === e.code ? Mt.a.createError(Tt.default.str("STR_CHECK_NET")) : Mt.a.createError(Tt.default.str("STR_UNDO_REQUEST_ERROR_UNKNOWN"))
                    }))
                }
                _removeFriendSuggest(e) {
                    const {
                        listFriendReceived: t = [],
                        listFriendSent: s = [],
                        listFriendSuggest: n = [],
                        mapRelatedGroup: a = {}
                    } = this.data.get("all") || {}, r = n.filter((t => {
                        var s;
                        return (null == t || null === (s = t.dataInfo) || void 0 === s ? void 0 : s.userId) !== e
                    }));
                    this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                        listFriendReceived: t,
                        listFriendSent: s,
                        listFriendSuggest: r,
                        mapRelatedGroup: a
                    })), this._signalRenderItem()
                }
                onAddFriendSuggest(e) {
                    sn.a.doAddFriend(e.uid, e.src, null, e.windowId).then((() => {
                        this._removeFriendSuggest(e.uid), this.onLoadRequestedFriendList()
                    })).catch((e => {
                        this.Logger.zsymb(18, 9654, 30006, "[InvitationController] -> [onAddFriendSuggest], error: " + JSON.stringify(e))
                    }))
                }
                onRemoveFriendSuggest(e) {
                    gn.removeSuggestFriend(e).then((() => {
                        this._removeFriendSuggest(e.uid)
                    })).catch((e => {
                        this.Logger.zsymb(18, 9654, 30007, "[InvitationController] -> [onRemoveFriendSuggest], error: " + JSON.stringify(e))
                    }))
                }
                openMutualGroupPopup(e) {
                    yt.ModalManagerV2.openModal({
                        windowId: "1",
                        name: v.ModalIdentitiesDefine.FRIEND_PROFILE,
                        params: {
                            userId: e,
                            showMutualGroups: !0
                        }
                    })
                }
                resetData() {
                    this.data.set("all", {
                        isLoadingRecommendFriendList: !1,
                        isLoadingRequestedFriendList: !1,
                        listFriendReceived: [],
                        listFriendSent: [],
                        listFriendSuggest: [],
                        mapRelatedGroup: {}
                    })
                }
                makeExpiredReceivedFriendRequest() {
                    let {
                        listFriendReceived: e = [],
                        listFriendSent: t = [],
                        listFriendSuggest: s = [],
                        mapRelatedGroup: n = {}
                    } = this.data.get("all") || {};
                    if (0 !== e.length) {
                        for (let t = 0; t < e.length; t++) e[t].dataInfo.recommTime = -1, e[t].dataInfo.recommInfo.source = -1, e[t].dataInfo.recommInfo.message = "";
                        this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                            listFriendReceived: e,
                            listFriendSent: t,
                            listFriendSuggest: s,
                            mapRelatedGroup: n
                        })), this._signalRenderItem()
                    }
                }
                makeExpiredSentFriendSentRequest() {
                    let {
                        listFriendReceived: e = [],
                        listFriendSent: t = [],
                        listFriendSuggest: s = [],
                        mapRelatedGroup: n = {}
                    } = this.data.get("all") || {};
                    if (0 !== t.length) {
                        for (let e = 0; e < t.length; e++) t[e].fReqInfo.time = -1, t[e].fReqInfo.src = -1, t[e].fReqInfo.message = "";
                        this.data.set("all", Object(i.a)(Object(i.a)({}, this.data.get("all")), {}, {
                            listFriendReceived: e,
                            listFriendSent: t,
                            listFriendSuggest: s,
                            mapRelatedGroup: n
                        })), this._signalRenderItem()
                    }
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
            }) || Fn) || Fn) || Fn);
            var On = s("hd49");
            let Rn;
            ! function (e) {
                e.MessageDelivered = "MessageDelivered"
            }(Rn || (Rn = {}));
            class Dn extends Event {
                constructor(e, t, s) {
                    super(e), this.msgId = void 0, this.payload = void 0, this.msgId = t, this.payload = s
                }
            }
            var An, jn = s("Y/Cm");
            Object(O.h)()(An = Object(O.g)()(An = Object(l.singleton)(On.a)(An = Object(l.injectable)()(An = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 0)
            }(An = Reflect.metadata("design:type", Function)(An = Reflect.metadata("design:paramtypes", [void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(An = class extends k.b {
                constructor(e) {
                    super(), this.logger = void 0, this.logger = e.createZLogger("feat", ["message-service"])
                }
                onStart() {}
                onDispose() {}
                onPollingMessages(e, t) {
                    return new Promise(((s, i) => {
                        if (!e || 0 === e.length) return s(!1);
                        const n = t ? {
                                userId: t
                            } : {
                                userId: e[0].toUid
                            },
                            a = [...e],
                            r = () => {
                                this.messagesDelivered(a)
                            };
                        jn.a.preparse(a, n, r, r)
                    }))
                }
                loadMessage(e) {
                    return Promise.resolve({})
                }
                loadMessagesBefore(e, t, s) {}
                loadMessagesAfter(e, t, s) {}
                loadLastMessage(e, t) {}
                messagesDelivered(e) {
                    this.broadcastEvent(Rn.MessageDelivered, "", e)
                }
                broadcastEvent(e, t, s) {
                    void 0 === t && (t = ""), $e.default.log([e, "- id: ", t, " - payload: ", null == s ? void 0 : s.length]), this.dispatchEvent(new Dn(e, t, s))
                }
            }) || An) || An) || An) || An) || An) || An);
            const Pn = Object(l.define)("cloud-segment-repository"),
                Nn = Object(l.define)("cloud-segment-manager"),
                Bn = Object(l.define)("cloud-message-manager");
            class Un {
                constructor(e) {
                    this.entity = e
                }
                get conversationId() {
                    return this.entity.conversationId
                }
                get cloudFirstSmsLocalId() {
                    return this.entity.cloudFirstSmsLocalId
                }
                get cloudSegmentCheck() {
                    return this.entity.cloudSegmentCheck
                }
                get hasMore() {
                    return this.entity.hasMore
                }
                get lastCloudVerifiedDttm() {
                    return this.entity.lastCloudVerifiedDttm
                }
                get lastDeletedMsgID() {
                    return this.entity.lastDeletedMsgID
                }
                get lastGetMaxRecentTs() {
                    return this.entity.lastGetMaxRecentTs
                }
                get maxCloudMsgId() {
                    return this.entity.maxCloudMsgId
                }
            }
            var kn, Gn = s("t3h5");
            let zn = l.ModuleContainer.injectable()(kn = Reflect.metadata("design:type", Function)(kn = Reflect.metadata("design:paramtypes", [])(kn = class {
                constructor() {}
                get(e) {
                    return Gn.a.getSegmentByConvId(e)
                }
            }) || kn) || kn) || kn;
            var xn, Vn = s("npvr"),
                $n = s("D8Ji");
            let Wn, qn = l.ModuleContainer.injectable()(xn = function (e, t) {
                return l.ModuleContainer.inject(Pn)(e, void 0, 0)
            }(xn = Reflect.metadata("design:type", Function)(xn = Reflect.metadata("design:paramtypes", [void 0 === Pn ? Object : Pn])(xn = class {
                constructor(e) {
                    this.segmentRepository = e
                }
                get(e) {
                    return this.segmentRepository.get(e).then((e => e && new Un(e))).catch((e => {}))
                }
                async createOrExtendSegment(e, t) {
                    const s = await this.segmentRepository.get(e);
                    s.cloudSegmentCheck = $n.a.mergeNewSegment(t.verifiedRange, null == s ? void 0 : s.cloudSegmentCheck), s.maxCloudMsgId = Math.max(s.maxCloudMsgId || 0, t.verifiedRange[1]), Gn.a.setSegmentCacheByConvId(e, s), await Vn.b.updateSegmentDB(e, s)
                }
            }) || xn) || xn) || xn) || xn;
            ! function (e) {
                e[e.STOP_RETRY = -69] = "STOP_RETRY", e[e.RETRY_LATER = -71] = "RETRY_LATER", e[e.FORCE_UPDATE_CONFIG = -72] = "FORCE_UPDATE_CONFIG", e[e.UNKNOWN_EXCEPTION = 112] = "UNKNOWN_EXCEPTION", e[e.PARAMS_INVALID = 114] = "PARAMS_INVALID", e[e.CLIENT_NOT_SUPPORT = 211] = "CLIENT_NOT_SUPPORT", e[e.LIMIT_GROUPS_PER_REQUEST = 300] = "LIMIT_GROUPS_PER_REQUEST", e[e.LIMIT_MSG_PER_GROUP = 301] = "LIMIT_MSG_PER_GROUP", e[e.LIMIT_TOTAL_SYNC_MSG_PER_GROUP = 303] = "LIMIT_TOTAL_SYNC_MSG_PER_GROUP", e[e.MISSING_PARAM = 111] = "MISSING_PARAM", e[e.GROUP_NOT_EXIST = 161] = "GROUP_NOT_EXIST", e[e.NOT_BELONG_TO_GROUP = 164] = "NOT_BELONG_TO_GROUP", e[e.IS_DIRTY_GROUP = 302] = "IS_DIRTY_GROUP"
            }(Wn || (Wn = {}));
            class Kn extends Error {
                constructor(e, t, s) {
                    super(s), this.code = e, this.data = t
                }
            }
            var Hn;
            let Zn = l.ModuleContainer.injectable()(Hn = function (e, t) {
                return l.ModuleContainer.inject(d.a)(e, void 0, 0)
            }(Hn = Reflect.metadata("design:type", Function)(Hn = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a])(Hn = class {
                constructor(e) {
                    this.config = e
                }
                get settings() {
                    return this.config.get("cloud.auto_download")
                }
                async crawlMissingMessage(e, t) {
                    void 0 === t && (t = {
                        nRetry: 0,
                        count: 50
                    });
                    let s = e.conversationId;
                    s.startsWith("g") && (s = s.slice(1));
                    const i = `${s}_${e.requestMsgId}`;
                    let n = this.settings.limit.minMsgDttm,
                        a = this.settings.limit.maxMsgFirstSegment;
                    const r = {
                        groupId: s,
                        fromMsgId: e.requestMsgId,
                        globalMsgIds: e.globalMsgIds,
                        curTotalMsgs: e.curTotalMsgs,
                        tsJoinGroup: e.tsJoinGroup,
                        minMsgTs: n,
                        maxTotalSyncMsg: a
                    };
                    return await qi.default.crawlMissingMessage(i, r, {
                        requestTimeout: this.settings.fetching.timeout,
                        count: t.count,
                        nRetry: t.nRetry,
                        usePostApi: !0
                    }).then((e => Object($i.a)(e))).then((e => {
                        try {
                            return JSON.parse(e)
                        } catch (t) {
                            throw {
                                error_code: -1,
                                error_message: "invalid response"
                            }
                        }
                    })).then((e => {
                        const t = e[s];
                        if (t.error > 0) throw {
                            error_code: t.error,
                            error_message: "inner error"
                        };
                        return t
                    })).catch((e => {
                        if ("number" == typeof e.error_code) {
                            let s = e.data;
                            try {
                                s = JSON.parse(s)
                            } catch (t) {}
                            throw new Kn(e.error_code, s, e.error_message)
                        }
                        throw e
                    }))
                }
            }) || Hn) || Hn) || Hn) || Hn;
            var Qn, Jn = s("EO3V"),
                Xn = s("enz2");
            const Yn = {
                totalMsgCount: 0,
                fetchedMsgCount: 0,
                serverMsgCount: 0,
                newMsgCount: 0,
                phaseDone: !1,
                isFilteredByTimeJoin: !1,
                done: !0,
                tsJoinGroup: "0"
            };
            let ea = l.ModuleContainer.injectable()(Qn = function (e, t) {
                return l.ModuleContainer.injectToken(Zn)(e, void 0, 0)
            }(Qn = function (e, t) {
                return l.ModuleContainer.inject(Nn)(e, void 0, 1)
            }(Qn = function (e, t) {
                return l.ModuleContainer.inject(Ns.c)(e, void 0, 2)
            }(Qn = function (e, t) {
                return l.ModuleContainer.inject(Ns.b)(e, void 0, 3)
            }(Qn = function (e, t) {
                return l.ModuleContainer.inject(j.ZLoggerFactory)(e, void 0, 4)
            }(Qn = Reflect.metadata("design:type", Function)(Qn = Reflect.metadata("design:paramtypes", [void 0 === Zn ? Object : Zn, void 0 === Nn ? Object : Nn, void 0 === Ns.c ? Object : Ns.c, void 0 === Ns.b ? Object : Ns.b, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(Qn = class {
                constructor(e, t, s, i, n) {
                    this.api = e, this.segmentManager = t, this.messageRepository = s, this.messageManager = i, this.logger = void 0, this.logger = n.createZLogger("cld-msg", ["manager"])
                }
                async crawlMissingMessage(e, t, s) {
                    const n = await this.segmentManager.get(e),
                        a = (() => {
                            var e;
                            let t = s.minMsgId && Number.parseInt(s.minMsgId);
                            return n && n.lastDeletedMsgID && (t = t ? Math.max(n.lastDeletedMsgID, t) : n.lastDeletedMsgID), null === (e = t) || void 0 === e ? void 0 : e.toString()
                        })(),
                        r = "0" !== t,
                        o = r ? s.count + 1 : s.count;
                    if (r && t <= a) return Yn;
                    const l = await this.messageManager.findPrevMessagesFromMsgId(e, {
                            maxMsgId: "0" !== t ? t : void 0,
                            minMsgId: a,
                            limit: o
                        }).then((e => e.map((e => e.entity)))),
                        d = new Set;
                    l.forEach((e => {
                        try {
                            const t = Number.parseInt(e.msgId);
                            Number.isInteger(t) && d.add(t.toString())
                        } catch (t) {}
                    }));
                    const c = Array.from(d.values()),
                        h = await this.api.crawlMissingMessage({
                            conversationId: e,
                            requestMsgId: t,
                            globalMsgIds: c,
                            curTotalMsgs: s.curTotalMsgs,
                            tsJoinGroup: s.tsJoinGroup
                        }, {
                            nRetry: s.nRetry,
                            count: s.count
                        });
                    if (0 === h.groupMsgs.length && "0" === h.maxMsgId) return Yn;
                    let u = Jn.a.checkDupMessageFromCloud(e, h.groupMsgs);
                    a && a > "0" && (u = u.filter((e => e.msgId > a)));
                    const g = [...l, ...u];
                    if (0 === g.length) return Yn;
                    const m = Number.parseInt(h.lastMsgId, 10);
                    let p = Number.parseInt(t);
                    const f = Jn.a.findMinMaxGroupMsg(g, p, m, null == n ? void 0 : n.lastDeletedMsgID),
                        {
                            groupMsgsToView: b,
                            groupMsgsAddDb: I,
                            groupMsgsSearch: y
                        } = Xn.a.findMsgsAddDb(t, u, [], l, Object(i.a)({
                            apiType: 2,
                            conversationId: e
                        }, f));
                    I.forEach((e => {
                        e.src = v.MSG_SRC.AUTO_LOADER
                    })), await this.messageRepository.saveMessages(I), await Xn.a.updateSearchV3(y, e);
                    const C = !!h.isFilteredByPhase,
                        S = h.maxMsgId;
                    f.minMsgId && f.maxMsgId && await this.segmentManager.createOrExtendSegment(e, {
                        verifiedRange: [f.minMsgId, f.maxMsgId]
                    });
                    let _ = "0";
                    Number.isInteger(Number.parseInt(h.tsJoinGroup)) ? _ = h.tsJoinGroup : this.logger.zsymb(18, 8177, 3e4, (() => ["api res invalid ts join group", {
                        tsJoinGroup: h.tsJoinGroup
                    }]));
                    const E = !!h.isFilteredByTimeJoin,
                        L = {
                            totalMsgCount: b.length,
                            fetchedMsgCount: I.length,
                            serverMsgCount: u.length,
                            newMsgCount: I.length,
                            phaseDone: C,
                            isFilteredByTimeJoin: E,
                            done: !(C || !E && h.hasMore),
                            minMsgId: a,
                            maxMsgId: S.toString(),
                            tsJoinGroup: _
                        };
                    return this.logger.zsymb(3, 8177, 30001, "[auto-dl-msg] crawl result", L), L
                }
            }) || Qn) || Qn) || Qn) || Qn) || Qn) || Qn) || Qn) || Qn;
            l.ModuleContainer.registerSingleton(Pn, zn), l.ModuleContainer.registerSingleton(Nn, qn), l.ModuleContainer.registerSingleton(Bn, ea);
            var ta, sa = s("rfrl"),
                ia = s("KP/S"),
                na = s("wiGx");
            const aa = {
                screen: na.a.Hidden,
                error: ia.b.NO_ERROR,
                progress: 0,
                numOfSyncedConv: 0,
                popupVisible: !1,
                startSyncTime: 0,
                closing: !1,
                syncingConversation: null
            };
            Object(ht.b)(na.b)(ta = class {
                constructor() {
                    this.state = Object(i.a)({}, aa), this.name = "sync-message-ui", this.key = "window_id"
                }
                showPopup() {
                    this.setState((e => {
                        e.popupVisible = !0
                    }))
                }
                setSyncingConversation(e) {
                    this.setState((t => {
                        t.syncingConversation = e
                    }))
                }
                hidePopup() {
                    this.setState((e => {
                        e.popupVisible = !1
                    }))
                }
                hideAllUI() {
                    this.setState((e => {
                        e.screen = na.a.Hidden, e.closing = !1
                    }))
                }
                showError(e) {
                    this.setState((t => {
                        t.error = e, t.screen = na.a.Error, t.syncingConversation = null
                    }))
                }
                showSuggestNewSync(e) {
                    this.setState((t => {
                        t.screen = na.a.SuggestNewSync, t.popupVisible = e
                    }))
                }
                showSuggestResume() {
                    this.setState((e => {
                        e.screen = na.a.SuggestResume, e.popupVisible = !1
                    }))
                }
                showSyncGuide() {
                    this.setState((e => {
                        e.screen = na.a.SyncGuide, e.popupVisible = !0
                    }))
                }
                showWaitForBackup() {
                    this.setState((e => {
                        e.screen = na.a.WaitForBackup
                    }))
                }
                showDownloadingBackup() {
                    this.setState((e => {
                        e.screen = na.a.DownloadingBackup, e.progress = 0
                    }))
                }
                showDecryptingBackup() {
                    this.setState((e => {
                        e.screen = na.a.DecryptingBackup, e.progress = 0
                    }))
                }
                showInProgress() {
                    this.setState((e => {
                        e.screen = na.a.SyncInProgress, e.progress = 0
                    }))
                }
                showCloseNotice() {
                    this.setState((e => {
                        e.closing = !0
                    }))
                }
                showSuccessMessage() {
                    this.setState((e => {
                        e.screen = na.a.SyncSuccess, e.syncingConversation = null
                    }))
                }
                showWaitForNetwork() {
                    this.setState((e => {
                        e.screen = na.a.WaitForNetwork
                    }))
                }
                setProgress(e) {
                    this.setState((t => {
                        t.progress = e
                    }))
                }
                setNumOfSyncedConv(e) {
                    this.setState((t => {
                        t.numOfSyncedConv = e
                    }))
                }
                resetStartSyncTime() {
                    this.setState((e => {
                        e.startSyncTime = Date.now()
                    }))
                }
                clearError() {
                    this.setState((e => {
                        e.error = ia.b.NO_ERROR
                    }))
                }
                getStartSyncTime() {
                    return this.state.startSyncTime
                }
                getCurrentError() {
                    return this.state.error
                }
                getCurrentScreen() {
                    return this.state.screen
                }
                getPopupVisible() {
                    return this.state.popupVisible
                }
                init() {}
                getItem() {
                    return this.state
                }
                getList() {
                    return []
                }
                onGetItemFailure() {}
                onGetListFailure() {}
                setState(e) {
                    const t = Object(sa.a)(this.state, e);
                    this.state !== t && (this.state = t, Object(je.g)(this.name, "current"))
                }
            });
            var ra, oa = s("cPHW");
            let la = l.ModuleContainer.injectable()(ra = class {
                start() {}
                isEnable() {
                    return !1
                }
                canSync() {
                    return ia.a.DISABLED
                }
                suggestSync() {
                    throw new Error("Method not implemented.")
                }
                suggestResume() {
                    throw new Error("Method not implemented.")
                }
                sync() {
                    throw new Error("Method not implemented.")
                }
                resume() {
                    throw new Error("Method not implemented.")
                }
                cancel() {
                    throw new Error("Method not implemented.")
                }
                pause() {
                    throw new Error("Method not implemented.")
                }
                retry() {
                    throw new Error("Method not implemented.")
                }
                rejectSuggest() {
                    throw new Error("Method not implemented.")
                }
                showSuggestPopup() {
                    throw new Error("Method not implemented.")
                }
                closeSuggestPopup() {
                    throw new Error("Method not implemented.")
                }
                setRequestBackupTimeout() {
                    throw new Error("Method not implemented.")
                }
                clearRequestBackupTimeout() {
                    throw new Error("Method not implemented.")
                }
                setAutoCloseSuccessTimeout() {
                    throw new Error("Method not implemented.")
                }
                clearAutoCloseSuccessTimeout() {
                    throw new Error("Method not implemented.")
                }
                resendRequest() {
                    throw new Error("Method not implemented.")
                }
                reset() {
                    throw new Error("Method not implemented.")
                }
                hideProgress() {
                    throw new Error("Method not implemented.")
                }
                handleCtrlEvents() {}
            }) || ra;
            l.ModuleContainer.registerSingleton(oa.a, la);
            var da = s("Erqw");
            const ca = e => {
                var t;
                const s = e.step,
                    i = e.registry;
                let n = null !== (t = e.timeout) && void 0 !== t ? t : 0;
                const a = e.callback,
                    r = e.args,
                    o = performance.now() + n;
                let l;

                function d() {
                    let e = Math.min(o - performance.now(), s);
                    return performance.now() > o ? i[l] = setTimeout(a, 0, r) : i[l] = setTimeout(d, e), i[l]
                }
                return function () {
                    let e = Math.min(o - performance.now(), s);
                    return l = setTimeout(d, e), i[l] = l, l
                }()
            };
            const {
                setTimeoutUnlimited: ha,
                clearTimeoutUnlimited: ua
            } = function (e) {
                var t, s;
                void 0 === e && (e = {});
                const i = null !== (t = e.step) && void 0 !== t && t ? 1e4 : 36e5,
                    n = null !== (s = e.registry) && void 0 !== s ? s : {};
                return {
                    setTimeoutUnlimited: function (e, t) {
                        for (var s = arguments.length, a = new Array(s > 2 ? s - 2 : 0), r = 2; r < s; r++) a[r - 2] = arguments[r];
                        const o = ca({
                            step: i,
                            registry: n,
                            callback: e,
                            timeout: t,
                            args: a
                        });
                        return o
                    },
                    clearTimeoutUnlimited: e => {
                        (e => {
                            const t = e.id,
                                s = e.registry;
                            clearTimeout(s[t]), delete s[t]
                        })({
                            id: e,
                            registry: n
                        })
                    }
                }
            }({
                registry: {}
            });
            var ga, ma = s("1p+n"),
                pa = s("UYft"),
                fa = s("AULX");
            Object(l.injectable)()(ga = Object(l.singleton)(fa.a)(ga = Object(O.g)()(ga = Object(O.e)()(ga = function (e, t) {
                return Object(l.inject)(C)(e, void 0, 0)
            }(ga = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 1)
            }(ga = Reflect.metadata("design:type", Function)(ga = Reflect.metadata("design:paramtypes", [void 0 === y ? Object : y, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(ga = class {
                constructor(e, t) {
                    this.kvCacheFactory = e, this.loggerFactory = t, this._logger = void 0, this._authEvent = void 0, this.__cache = void 0, this._renewRegistry = {}, this.updateEmitter = new ma.a, this._logger = this.loggerFactory.createZLogger("feat", ["group-link"])
                }
                onAuthenticated(e) {
                    this._authEvent = e
                }
                _makeCache() {
                    if (!this._authEvent) throw new Error("Not authenticated");
                    return this.kvCacheFactory.createCache(`group-link-v3-${this._authEvent.getSession().userId}`, {
                        maxSize: 50
                    })
                }
                get _cache() {
                    return this.__cache || (this.__cache = this._makeCache()), this.__cache
                }
                _scheduleRenew(e, t) {
                    if (this._clearRenewSchedule(e), !t.enabled) return this;
                    if (!He.default.groupLink.enableScheduleRenew) return this._logger.debug(["_scheduleRenew skipped, enableScheduleRenew:", He.default.groupLink.enableScheduleRenew]), this;
                    let s = t.expirationDate - Js.a.getTimeNow(),
                        i = ha((() => {
                            this._clearRenewSchedule(e), this._emitGroupLinkUpdated(e, !0)
                        }), s);
                    return this._renewRegistry[e] = () => {
                        ua(i), delete this._renewRegistry[e]
                    }, this
                }
                _clearRenewSchedule(e) {
                    var t, s;
                    return null === (t = (s = this._renewRegistry)[e]) || void 0 === t || t.call(s), this
                }
                onDispose() {
                    this._authEvent = void 0, this.__cache = void 0
                }
                async _getFromCache(e) {
                    if (!He.default.groupLink.enableCache) return void this._logger.debug(["cache skipped, enableCache:", He.default.groupLink.enableCache]);
                    e = va(e);
                    let t = await this._cache.getItem(e);
                    if (t) {
                        if (function (e) {
                                if (!e) return !1;
                                let {
                                    data: t,
                                    meta: s
                                } = e;
                                if (!t) return !1;
                                if (!s) return !1;
                                if (da.a.isOverflowAtTime(s.ts)) return !1;
                                const i = Js.a.getTimeNow();
                                if (s.ts + He.default.groupLink.maxCacheDuration < i) return !1;
                                if (t.enabled && t.expirationDate < i) return !1;
                                return !0
                            }(t)) return t.data;
                        await this._cache.removeItem(e)
                    }
                }
                async _fetchAndPutToCache(e, t) {
                    const s = Js.a.getTimeNow(),
                        i = await t(),
                        n = {
                            enabled: i.enabled,
                            expirationDate: i.expiration_date,
                            link: i.link
                        };
                    let a = {
                        ts: s
                    };
                    return await this._cache.setItem(e, {
                        data: n,
                        meta: a
                    }), n
                }
                async _deleteCache(e) {
                    await this._cache.removeItem(e)
                }
                async getGroupLinkDetail(e, t) {
                    void 0 === t && (t = !1), this._logger.zsymb(12, 9640, 3e4, ["getting", e]);
                    let s = va(e),
                        i = await this._getFromCache(s);
                    if (i && !t) return this._logger.zsymb(12, 9640, 30001, ["cache hit", s]), this._scheduleRenew(s, i), i;
                    this._logger.zsymb(12, 9640, 30002, ["fetching", s]);
                    let n = $e.default.getRawGroupId(s);
                    let a = await this._fetchAndPutToCache(s, (() => Ve.default.getGroupLinkDetail(n))).catch(pa.a.catch((e => this._logger.zsymb(18, 9640, 30003, ["get failed", s, e]))));
                    return this._scheduleRenew(s, a), t && await this._emitGroupLinkUpdated(e), this._logger.zsymb(12, 9640, 30004, ["done", s]), a
                }
                async renewGroupLink(e) {
                    this._logger.zsymb(12, 9640, 30005, ["renewing", e]);
                    let t = va(e),
                        s = $e.default.getRawGroupId(t);
                    let i = await this._fetchAndPutToCache(t, (() => Ve.default.renewGroupLink(s))).catch(pa.a.catch((e => this._logger.zsymb(18, 9640, 30006, ["renew failed", t, e]))));
                    return this._scheduleRenew(t, i), await this._emitGroupLinkUpdated(t), this._logger.zsymb(12, 9640, 30007, ["renew done", e]), i
                }
                async disableGroupLink(e) {
                    this._logger.zsymb(12, 9640, 30008, ["disabling", e]);
                    let t = va(e),
                        s = $e.default.getRawGroupId(t);
                    await Ve.default.disableGroupLink(s).catch(pa.a.catch((e => this._logger.zsymb(18, 9640, 30009, ["disable failed", t, e])))), await this._emitGroupLinkUpdated(t, !0), this._logger.zsymb(12, 9640, 30010, ["disable done", e])
                }
                async _emitGroupLinkUpdated(e, t) {
                    void 0 === t && (t = !1);
                    const s = va(e);
                    t && await this._deleteCache(s), this.updateEmitter.emit(s, s), this.updateEmitter.emit("*", s)
                }
                async emitGroupLinkUpdated(e) {
                    return await this._emitGroupLinkUpdated(e, !0)
                }
            }) || ga) || ga) || ga) || ga) || ga) || ga) || ga);

            function va(e) {
                return v.GROUPID_PREFIX + $e.default.getRawGroupId(e)
            }
            var ba, Ia = s("TO4U");
            const ya = {
                loading: !0
            };
            Object(ht.b)(Ia.a)(ba = function (e, t) {
                return Object(l.inject)(fa.a)(e, void 0, 0)
            }(ba = Reflect.metadata("design:type", Function)(ba = Reflect.metadata("design:paramtypes", [void 0 === fa.a ? Object : fa.a])(ba = class e {
                constructor(e) {
                    this._groupLink = e, this.type = void 0, this.name = "group-link-ui", this.key = "group-link-ui", this._cache = new L.default({
                        maxSize: 50
                    }), this._handleUpdate = e => {
                        const t = Ca(e);
                        this._cache.delete(t), this._startFetchAndSetToSession(t)
                    }, this._groupLink.updateEmitter.on("*", this._handleUpdate)
                }
                init() {}
                getItem(e, t) {
                    if (!e.key.startsWith(v.GROUPID_PREFIX)) return;
                    const s = Ca(e.key);
                    this._startFetchAndSetToSession(s);
                    let i = this._cache.get(s);
                    return i || ya
                }
                static shouldSignal(e, t) {
                    var s, i, n, a, r, o;
                    return !e || (null == e || e.error, null == t || t.error, null == t || null === (s = t.data) || void 0 === s || s.enabled, null == t || null === (i = t.data) || void 0 === i || i.enabled, null != e && null !== (n = e.data) && void 0 !== n && n.enabled && null != t && null !== (a = t.data) && void 0 !== a && a.enabled && (null == e || null === (r = e.data) || void 0 === r || r.link, null == t || null === (o = t.data) || void 0 === o || o.link), !1)
                }
                signalIfNeeded(t, s, i) {
                    e.shouldSignal(s, i) && Object(je.g)(this.name, t)
                }
                _startFetchAndSetToSession(e) {
                    const t = this._cache.get(e);
                    setTimeout((() => {
                        this._groupLink.getGroupLinkDetail(e).then((s => {
                            const i = {
                                loading: !1,
                                data: s
                            };
                            this._cache.set(e, i), this.signalIfNeeded(e, t, i)
                        })).catch((s => {
                            const i = {
                                loading: !1,
                                error: s
                            };
                            this._cache.set(e, i), this.signalIfNeeded(e, t, i)
                        }))
                    }), 0)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
            }) || ba) || ba) || ba);

            function Ca(e) {
                return v.GROUPID_PREFIX + $e.default.getRawGroupId(e)
            }
            var Sa = s("akSd"),
                _a = s("xQyS"),
                Ea = s("fqRP"),
                La = s("L904"),
                wa = s("EiAw"),
                Ma = s("IoRb");
            let Ta;
            class Fa {
                static get instance() {
                    return Ta || (Ta = new Fa), Ta
                }
                get _eventStore() {
                    return this.__eventStore || (this.__eventStore = s("emRR").default), this.__eventStore
                }
                constructor() {
                    this.__eventStore = void 0, this._emitConversationDeleted = e => {
                        let t, s, i = [];
                        if (e.ok ? ({
                                conversation: t,
                                toUid: s,
                                allItems: i
                            } = e.value) : ({
                                conversation: t,
                                toUid: s,
                                allItems: i
                            } = e.error), t) return;
                        if (i.length && i.every((e => e.ttlType === Ci.a.Quote))) return;
                        const n = {
                            type: qe.FetchActions.DELETE_CONVERSATION,
                            payload: s
                        };
                        this._eventStore.dispatch(n), Ae.a.dispatch(n), We.default.send(n.type, n.payload)
                    }, this._emitDeletedMsgs = e => {
                        let t, s;
                        e.ok ? ({
                            allItems: s,
                            conversation: t
                        } = e.value) : ({
                            allItems: s,
                            conversation: t
                        } = e.error);
                        const i = s.filter((e => e.ttlType === Ci.a.Message)).map((e => e.msgId));
                        Object(wa.a)({
                            msgId: i,
                            conversation: t
                        })
                    }, this._emitUpdateUnread = (e, t) => {
                        let s, i = [];
                        e.ok ? ({
                            toUid: s,
                            allItems: i
                        } = e.value) : ({
                            toUid: s,
                            allItems: i
                        } = e.error), it.a.UnreadDataManager.updateUnreadTTLConversation(s, i, null == t ? void 0 : t.get(s))
                    }, this.emitPerConversation = async (e, t) => {
                        let s = await Object(_a.a)(this._emitConversationDeleted, e);
                        s.ok || Object(Ma.a)("_emitConversationDeleted failed", s.error), s = await Object(_a.a)(this._emitDeletedMsgs, e), s.ok || Object(Ma.a)("_emitDeletedMsgs failed", s.error), s = await Object(_a.a)(this._emitUpdateUnread, e, t), s.ok || Object(Ma.a)("_emitUpdateUnread failed", s.error)
                    }
                }
            }
            var Oa, Ra = s("LA52"),
                Da = s("GSaP");
            const Aa = e => null == e ? void 0 : e.toUid,
                ja = e => null != e && e.ok ? "success" : "error";
            Object(l.singleton)(Ra.a)(Oa = Reflect.metadata("design:type", Function)(Oa = Reflect.metadata("design:paramtypes", [])(Oa = class {
                constructor() {
                    var e = this;
                    this._pruning = !1, this._task = void 0, this._ttl = l.ModuleContainer.resolve(Ea.a), this._logger = void 0, this.dispose = () => {}, this.prune = async () => this._pruning ? await this._task : (this._pruning = !0, this._task = this._pruneFromDB(), this._pruning = !1, this._task), this._pruneFromDB = async () => {
                        const e = Js.a.getTimeNow();
                        this._logger.zsymb(0, 8948, 3e4, "Pruner execute task", e);
                        const t = await Object(_a.b)(this._ttl.getExpireItemsBefore, e);
                        if (!t.ok) return this._logger.zsymb(18, 8948, 30001, "Pruner getExpireItemsBefore failed", t.error), {
                            ok: !1,
                            error: null
                        };
                        const s = t.ok ? t.value : [];
                        return await this._pruneTTLItems(s)
                    }, this._pruneByMsgsBatch = [], this.pruneByMsgs = async e => {
                        const t = Object(Ke.a)(e);
                        this._pruneByMsgsBatch.push(...t), setTimeout((() => {
                            const e = this._pruneByMsgsBatch;
                            this._pruneByMsgsBatch = [], e.length && (this._logger.zsymb(15, 8948, 30002, "running a batch {}", e.length), this._pruneByMsgs(e))
                        }), 2e3)
                    }, this._pruneByMsgs = async e => {
                        const t = Js.a.getTimeNow();
                        this._logger.zsymb(15, 8948, 30003, "deriving {}", e.length);
                        let s = Da.a.createFromCurrentSession().deriveTTLItems(e);
                        this._logger.zsymb(15, 8948, 30004, "ttlItems count: {}", s.length), s = s.filter((e => {
                            const s = +e.expireOn + He.default.ttl.enable_delete_on_filter_minimum_overtime;
                            return !isNaN(s) && s < t
                        })), this._logger.zsymb(15, 8948, 30005, "expired count: {}", s.length), s = s.filter((e => !this._hasPruneMsgCache(e))), s.forEach((e => {
                            this._setPruneMsgCache(e)
                        })), this._logger.zsymb(15, 8948, 30006, "no cache count: {}", s.length), s.length ? (this._logger.zsymb(3, 8948, 30007, "pruning {}, {}", s.length, s), await this._deleteMsgsAndEmit(s)) : this._logger.zsymb(15, 8948, 30008, "no items to prune")
                    }, this._pruneMsgCache = new L.default({
                        maxSize: 1e4
                    }), this._pruneTTLItems = async e => {
                        const t = e.map((e => [e.msgId, e.ttlType]));
                        this._logger.zsymb(3, 8948, 30009, "pruning {} items: {}", t.length, t), await this._deleteMsgsAndEmit(e);
                        const s = await Object(_a.b)(this._ttl.deletes, t);
                        return s.ok || this._logger.zsymb(18, 8948, 30010, "Pruner deletes ttl failed", s.error), s
                    }, this._retryErrorMsgsIfNeeded = e => {
                        for (const s of e) {
                            var t;
                            if (s.ok) continue;
                            const {
                                errorItems: e,
                                toUid: i
                            } = s.error;
                            this._logger.zsymb(0, 8948, 30011, "_retryErrorDelete " + i, null == e || null === (t = e[0]) || void 0 === t ? void 0 : t.msgId), setTimeout((() => {
                                Object(_a.b)(this._deleteMsgsBelongToTTLItems, e)
                            }), 5e3)
                        }
                    }, this._retryErrorDelete = e => setTimeout((async () => {
                        const t = await this._ttl.getMappedMsgsByConvIdFromTTLItems(e),
                            s = await Object(_a.b)(this._deleteMsgsBelongToTTLItems, e);
                        !s.ok && this._logger.zsymb(18, 8948, 30012, "Pruner _retryErrorDelete", s.error), s.ok && this._emitPruneResult(s.value, t)
                    }), 5e3), this._emitPruneResult = async (e, t) => {
                        for (const s of e) await Object(_a.b)(Fa.instance.emitPerConversation, s, t)
                    }, this._deletePerConversation = async function (e, t) {
                        var s, i, n, a, r, o, l, d, c;
                        void 0 === t && (t = []);
                        const h = await Object(_a.b)(Ys.b.vanishMessages, e, t);
                        if (!h.ok) return {
                            ok: !1,
                            error: {
                                toUid: e,
                                allItems: [],
                                errorItems: t,
                                successItems: []
                            }
                        };
                        const u = null === (s = h.value.vanish) || void 0 === s ? void 0 : s[0],
                            g = null === (i = h.value.quote) || void 0 === i ? void 0 : i[0];
                        if (!u && !g) return {
                            ok: !1,
                            error: {
                                toUid: e,
                                conversation: {},
                                allItems: [],
                                errorItems: t,
                                successItems: []
                            }
                        };
                        const m = null === (n = h.value.vanish) || void 0 === n || null === (a = n[0]) || void 0 === a || null === (r = a.conv) || void 0 === r ? void 0 : r.conversation;
                        let p = [...null !== (o = null === (l = h.value.vanish) || void 0 === l ? void 0 : l.map((e => e.res)).flat()) && void 0 !== o ? o : [], ...null !== (d = null === (c = h.value.quote) || void 0 === c ? void 0 : c.flat()) && void 0 !== d ? d : []];
                        p = p.filter((e => e));
                        const {
                            success: f = [],
                            error: v = []
                        } = Object(La.a)(p, ja), b = f.map((e => e.info)), I = v.map((e => e.info)), y = [...b, ...I];
                        return I.length ? {
                            ok: !1,
                            error: {
                                toUid: e,
                                conversation: m,
                                allItems: y,
                                successItems: b,
                                errorItems: I
                            }
                        } : {
                            ok: !0,
                            value: {
                                toUid: e,
                                conversation: m,
                                allItems: y,
                                successItems: b
                            }
                        }
                    }, this._deleteMsgsBelongToTTLItems = async e => {
                        const t = Object(La.a)(e, Aa),
                            s = Object.keys(t).map((async e => (Object(_a.b)(this._sideEffect, e, t[e]), this._deletePerConversation(e, t[e]))));
                        return await Promise.all(s)
                    }, this._sideEffect = async function (t, s) {
                        return void 0 === s && (s = []), setTimeout((async () => {
                            const i = await Object(_a.b)(e._cancelSendingPerConversation, t, s);
                            i.ok || e._logger.zsymb(18, 8948, 30013, "cancelSendingPerConversation failed", i.error);
                            const n = await Object(_a.b)(e._syncDeletePerConversation, t, s);
                            n.ok || e._logger.zsymb(18, 8948, 30014, "syncDeletePerConversation failed", n.error)
                        }), 0)
                    }, this._cancelSendingPerConversation = async function (e, t) {
                        void 0 === t && (t = []), t.forEach((t => Object(_a.b)((() => {}), e, null == t ? void 0 : t.cliMsgId)))
                    }, this._syncDeletePerConversation = async function (e, t) {
                        if (void 0 === t && (t = []), !He.default.ttl.enable_sync_delete) return;
                        const s = t => {
                            +t.msgId && Object(Sa.e)(e, {
                                cliMsgId: t.cliMsgId,
                                msgId: t.msgId,
                                sendDttm: t.sendDttm,
                                toUid: e,
                                fromUid: t.fromUid
                            })
                        };
                        t.forEach((e => Object(_a.b)(s, e)))
                    }, this._pruning = !1, this._logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("utils", ["ttl", "destructor", "pruner"])
                }
                _getPruneMsgKey(e) {
                    return e ? `${e.msgId}|${e.ttlType}` : ""
                }
                _hasPruneMsgCache(e) {
                    return this._pruneMsgCache.has(this._getPruneMsgKey(e))
                }
                _setPruneMsgCache(e) {
                    this._pruneMsgCache.set(this._getPruneMsgKey(e), void 0)
                }
                async _deleteMsgsAndEmit(e) {
                    const t = await this._ttl.getMappedMsgsByConvIdFromTTLItems(e),
                        s = await Object(_a.b)(this._deleteMsgsBelongToTTLItems, e);
                    s.ok || (this._logger.zsymb(18, 8948, 30015, "Pruner", "deleteMessages failed"), this._retryErrorDelete(e)), s.ok && this._retryErrorMsgsIfNeeded(s.value), s.ok && this._emitPruneResult(s.value, t)
                }
            }) || Oa) || Oa);

            function Pa(e, t) {
                return e.reduce(((e, s, i, n) => (e[t(s, i, n) ? 0 : 1].push(s), e)), [
                    [],
                    []
                ])
            }
            var Na;
            const Ba = v.MessageConstants.MAX_MSG_ID;
            Object(l.singleton)(Ea.a)(Na = Reflect.metadata("design:type", Function)(Na = Reflect.metadata("design:paramtypes", [])(Na = class {
                constructor() {
                    this._logger = void 0, this.dispose = () => {}, this._safePut = async e => {
                        const t = [],
                            s = [],
                            i = Z.a.getInstance();
                        for (const a of e) try {
                            await i.MsgInfo.TTLItem.insert(a, {
                                replace: !0
                            }), t.push(a)
                        } catch (n) {
                            s.push([a, n])
                        }
                        return [t, s]
                    }, this.putMsgs = async e => {
                        let t = e.map((e => Ga(e)));
                        const [s, i] = Pa(t, (e => e.ok)), n = s.map((e => e.value));
                        let a = [],
                            r = [];
                        [r, a] = await this._safePut(n);
                        const o = i.map((e => e.error));
                        return a.lastItem || o.length ? {
                            ok: !1,
                            error: {
                                invalidItems: o,
                                errorItems: a
                            }
                        } : {
                            ok: !0,
                            value: r
                        }
                    }, this.deletes = e => Z.a.getInstance().MsgInfo.TTLItem.deleteMulti(e), this.getExpireItemsBefore = async (e, t) => {
                        const s = t ? {
                                from: [t.expireOn, t.toUid, t.msgId, t.ttlType],
                                to: [e, Ba, Ba, Number.MAX_VALUE],
                                excludeFrom: !1,
                                excludeTo: !0
                            } : {
                                to: [e, Ba, Number.MAX_VALUE],
                                excludeTo: !1
                            },
                            i = {
                                limit: 50,
                                index: "expireOn_toUid_pk"
                            },
                            n = Z.a.getInstance();
                        return await n.MsgInfo.TTLItem.getAll(s, i)
                    }, this.getYoungestExpiredItem = async () => {
                        const e = {
                                to: [Number.MAX_VALUE, Ba, Ba, Number.MAX_VALUE],
                                excludeTo: !0
                            },
                            t = Z.a.getInstance();
                        return (await t.MsgInfo.TTLItem.getAll(e, {
                            limit: 1,
                            index: "expireOn_toUid_pk"
                        }))[0]
                    }, this.getMappedMsgsByConvIdFromTTLItems = async e => {
                        const t = ui.b.messageCache;
                        let s;
                        return t && (s = await t.getMappedMessagesByConvIdAsync(e)), s
                    }, this._logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("utils", ["ttl", "destructor", "ttl"])
                }
            }) || Na) || Na);
            const Ua = e => "number" == typeof e ? String(e) : e,
                ka = [Ci.a.Message, Ci.a.Quote],
                Ga = function (e) {
                    void 0 === e && (e = {});
                    const t = Object(i.a)({}, e);
                    return t.cliMsgId = Ua(t.cliMsgId), t.cliMsgId ? (t.fromUid = Ua(t.fromUid), t.fromUid ? (t.toUid = Ua(t.toUid), t.toUid ? (t.msgId = Ua(t.msgId), s = t.ttlType, ka.includes(s) ? (t.expireOn = +t.expireOn, "number" != typeof t.expireOn ? {
                        ok: !1,
                        error: e
                    } : {
                        ok: !0,
                        value: t
                    }) : {
                        ok: !1,
                        error: e
                    }) : {
                        ok: !1,
                        error: e
                    }) : {
                        ok: !1,
                        error: e
                    }) : {
                        ok: !1,
                        error: e
                    };
                    var s
                },
                za = Object(l.define)("chat-box-list-controller");
            var xa, Va = s("Ti+8");
            Object(O.h)()(xa = Object(O.g)()(xa = Object(l.singleton)(za)(xa = Object(l.injectable)()(xa = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 0)
            }(xa = Reflect.metadata("design:type", Function)(xa = Reflect.metadata("design:paramtypes", [void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(xa = class {
                constructor(e) {
                    this.logger = void 0, this.handleMessageDelivered = e => {
                        var t;
                        $e.default.log(["message delivered", null === (t = e.payload) || void 0 === t ? void 0 : t.length])
                    }, this.logger = e.createZLogger("feat", ["chat-box-list-controller"])
                }
                onStart() {
                    l.ModuleContainer.resolve(Va.a).addEventListener(Rn.MessageDelivered, this.handleMessageDelivered)
                }
                onDispose() {
                    l.ModuleContainer.resolve(Va.a).removeEventListener(Rn.MessageDelivered, this.handleMessageDelivered)
                }
                openConversation(e) {
                    return Promise.resolve(!0)
                }
            }) || xa) || xa) || xa) || xa) || xa) || xa);
            var $a, Wa = s("7nHs");
            const qa = {
                isShown: !1,
                modalTitle: "",
                guideTitle: "",
                errorCode: "",
                guideItems: [],
                showReloadBtn: !0,
                reloadBtnName: "STR_BU_CONFIRM_TEXT_4",
                showDeleteDataBtn: !0,
                deleteDataBtnName: "STR_BU_CANCEL_TEXT_4"
            };
            Object(ht.b)(Wa.a)($a = class {
                constructor() {
                    this.name = Wa.b, this.key = "", this.state = qa
                }
                setState(e) {
                    const t = Object(sa.a)(this.state, e);
                    this.state !== t && (this.state = t, Object(je.g)(this.name, ""))
                }
                showModal(e) {
                    this.state.isShown || this.setState((t => Object(i.a)(Object(i.a)(Object(i.a)({}, t), e), {}, {
                        isShown: !0
                    })))
                }
                closeModal() {
                    this.state.isShown && this.setState((e => Object(i.a)(Object(i.a)(Object(i.a)({}, e), qa), {}, {
                        isShown: !1
                    })))
                }
                init(e) {}
                getItem(e, t) {
                    return this.state
                }
                getList(e, t) {
                    return []
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
            });
            var Ka, Ha = s("Mf7h"),
                Za = s("8c0e");
            const Qa = new $e.LocalId;
            Object(l.injectable)()(Ka = Object(l.singleton)(Za.a)(Ka = class {
                constructor() {
                    this._linkPreviewDatas = new Map, this._lastCheckLinks = new Map, this._listeners = new Map
                }
                addListenerAtConv(e, t) {
                    if (e && "function" == typeof t) {
                        const s = this._listeners.get(e);
                        this._listeners.set(e, [...s || [], t])
                    }
                }
                removeListenerAtConv(e, t) {
                    let s = this._listeners.get(e);
                    s && s.length > 0 && (s = s.filter((e => e !== t)), this._listeners.set(e, s))
                }
                removeAllListenerAtConv(e) {
                    this._listeners.delete(e)
                }
                setLastCheckLinkByConvId(e, t) {
                    this._lastCheckLinks.set(e, t)
                }
                isLastCheckLinkOfConv(e, t) {
                    const s = this._lastCheckLinks.get(e);
                    return !!s && s === t
                }
                getLinkPreviewDataByConvId(e) {
                    return this._linkPreviewDatas.get(e) || null
                }
                addLinkDataToConv(e, t) {
                    const s = this._prepareLinkPreviewData(e, t);
                    this._linkPreviewDatas.set(e, Object(i.a)({}, s));
                    const n = {
                        action: qe.LinkPreviewActions.NEW_LINK_PREVIEW,
                        payload: {
                            newLinkPreviewData: Object(i.a)({}, s)
                        }
                    };
                    this._notifyLinkPreviewDataChangeToConv(e, n), Ha.a.emit(qe.LinkPreviewActions.NEW_LINK_PREVIEW, {
                        newLinkPreviewData: Object(i.a)({}, s)
                    })
                }
                createLoadingLinkPreview(e, t) {
                    const s = {
                        id: Qa.next(),
                        convId: e,
                        content: {
                            title: Tt.default.str("STR_GETTING_LINK_INFO"),
                            src: t,
                            desc: "",
                            thumb: "",
                            loading: !0
                        },
                        link: t,
                        shouldParseLinkOrContact: !0
                    };
                    e && this._linkPreviewDatas.set(e, Object(i.a)({}, s));
                    const n = {
                        action: qe.LinkPreviewActions.NEW_LINK_PREVIEW,
                        payload: {
                            newLinkPreviewData: Object(i.a)({}, s)
                        }
                    };
                    this._notifyLinkPreviewDataChangeToConv(e, n), Ha.a.emit(qe.LinkPreviewActions.NEW_LINK_PREVIEW, {
                        newLinkPreviewData: Object(i.a)({}, s)
                    })
                }
                removeLinkPreviewData(e) {
                    if (!e) return;
                    this._linkPreviewDatas.delete(e);
                    const t = {
                        action: qe.LinkPreviewActions.HIDE_LINK_PREVIEW,
                        payload: null
                    };
                    this._notifyLinkPreviewDataChangeToConv(e, t), Ha.a.emit(qe.LinkPreviewActions.HIDE_LINK_PREVIEW, null)
                }
                _notifyLinkPreviewDataChangeToConv(e, t) {
                    const s = this._listeners.get(e);
                    null == s || s.forEach((e => {
                        "function" == typeof e && e({
                            action: t.action,
                            payload: t.payload
                        })
                    }))
                }
                _prepareLinkPreviewData(e, t) {
                    return {
                        id: Qa.next(),
                        convId: e,
                        link: t.link,
                        content: t.content,
                        shouldParseLinkOrContact: !1
                    }
                }
            }) || Ka);
            var Ja, Xa = s("iy3m"),
                Ya = s("twqL");
            Object(O.h)()(Ja = Object(l.singleton)(Ya.a)(Ja = Reflect.metadata("design:type", Function)(Ja = Reflect.metadata("design:paramtypes", [])(Ja = class {
                constructor() {
                    this.changeTimeFlushNotiReactWhenResumeApp = this.changeTimeFlushNotiReactWhenResumeApp.bind(this), this.changeTimeFlushNotiReactWhenDisNetwork = this.changeTimeFlushNotiReactWhenDisNetwork.bind(this), this.changeTimeFlushNotiReactWhenStartApp = this.changeTimeFlushNotiReactWhenStartApp.bind(this)
                }
                onStart(e) {
                    this.changeTimeFlushNotiReactWhenStartApp()
                }
                changeTimeFlushNotiReactWhenResumeApp() {
                    this.changeTimeFlushNotiReact(Object(Xa.d)())
                }
                setupTimer(e) {
                    yi.a.TimeFlushNotiReact = e, yi.a.TimeMaxWaiting = Object(Xa.a)(), yi.a.setupIntervalToFlushNotiReact(), yi.a.setupTimeoutToGoBackNormalCondition()
                }
                changeTimeFlushNotiReactWhenDisNetwork(e) {
                    if (e === Ki.a.CONNECTED) {
                        const e = Ki.b.getPreStateNetwork();
                        e !== Ki.a.CONNECTED && e !== Ki.a.NOT_SET && this.changeTimeFlushNotiReact(Object(Xa.b)())
                    }
                }
                changeTimeFlushNotiReactWhenStartApp() {
                    this.changeTimeFlushNotiReact(Object(Xa.e)())
                }
                changeTimeFlushNotiReact(e) {
                    yi.a.notiReactTimeoutId ? (yi.a.TimeFlushNotiReact !== e && (yi.a.TimeFlushNotiReact = e, yi.a.setupIntervalToFlushNotiReact()), yi.a.TimeMaxWaiting !== Object(Xa.a)() && (yi.a.TimeMaxWaiting = Object(Xa.a)(), yi.a.setupTimeoutToGoBackNormalCondition())) : this.setupTimer(e)
                }
            }) || Ja) || Ja) || Ja);
            var er, tr = s("K0f4"),
                sr = s("buT3"),
                ir = s("wudS");
            Object(O.h)()(er = Object(O.e)()(er = class {
                onAuthenticated(e) {
                    const {
                        userId: t
                    } = e.getSession();
                    if (t) {
                        const e = Object(ir.b)(t),
                            s = `${e}_${tr.m}`,
                            i = sr.a.getItem(s);
                        if (!(null !== i)) return;
                        const n = 97124,
                            a = "1" === i,
                            r = `${e}_${tr.g}`,
                            o = +(sr.a.getItem(r) || "-1"),
                            l = isNaN(o) ? -1 : o,
                            d = `${e}_${tr.i}`,
                            c = +(sr.a.getItem(d) || "-1"),
                            h = isNaN(c) ? -1 : c;
                        if (a) M.default.increaseSuccess(n, 0, l, [h]);
                        else {
                            const t = `${e}_${tr.c}`,
                                s = sr.a.getItem(t),
                                i = Number(s);
                            M.default.increaseFailed(n, 0, l, i, Date.now(), [h])
                        }
                        sr.a.removeItem(s), sr.a.removeItem(r), sr.a.removeItem(d)
                    }
                }
                onStart() {
                    const e = tr.l,
                        t = sr.a.getItem(e);
                    if (!(null !== t)) return;
                    const s = "1" === t,
                        i = tr.f,
                        n = +(sr.a.getItem(i) || "-1"),
                        a = isNaN(n) ? -1 : n,
                        r = tr.h,
                        o = +(sr.a.getItem(r) || "-1"),
                        l = isNaN(o) ? -1 : o;
                    if (s) M.default.increaseSuccess(97123, 0, a, [l]);
                    else {
                        const e = sr.a.getItem(tr.b),
                            t = Number(e);
                        M.default.increaseFailed(97123, 0, a, t, Date.now(), [l])
                    }
                    sr.a.removeItem(e), sr.a.removeItem(i), sr.a.removeItem(r)
                }
            }) || er);
            var nr, ar = s("l9L4"),
                rr = s("CDcE");
            Object(O.d)()(nr = Object(l.injectable)()(nr = Object(l.singleton)(ar.a)(nr = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 0)
            }(nr = Reflect.metadata("design:type", Function)(nr = Reflect.metadata("design:paramtypes", [void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory])(nr = class {
                constructor(e) {
                    this._isFirstLoginMap = new Map, this._firstLoginTimeMap = new Map, this._logger = void 0, this._logger = e.createZLogger("utils", ["first-login-checker"])
                }
                getFirstLoginTime(e) {
                    if (this.firstLoginTimeMap.has(e)) return this.firstLoginTimeMap.get(e) || this.getDefaultFirstLoginTime();
                    try {
                        const t = u.a.getInstance().getItemForCurrentUser(v.FirstLoginLocalStorageKeys.FIRST_LOGIN_TIME);
                        null != t && this.firstLoginTimeMap.set(e, parseInt(t))
                    } catch (t) {
                        this.logger.zsymb(21, 8183, 3e4, "getFirstLoginTime error {} - {}", e, Object(rr.f)(t, 2))
                    }
                    return this.firstLoginTimeMap.get(e) || this.getDefaultFirstLoginTime()
                }
                isFirstLogin(e) {
                    return !!this._isFirstLoginMap.get(e)
                }
                onApplicationReady(e) {
                    this.removeFirstLoginFlag()
                }
                setFirstLogin(e, t) {
                    this._isFirstLoginMap.set(e, t)
                }
                setFirstLoginTime(e, t) {
                    this.firstLoginTimeMap.set(e, t);
                    try {
                        u.a.getInstance().setItemForCurrentUser(v.FirstLoginLocalStorageKeys.FIRST_LOGIN_TIME, t && t.toString() || "")
                    } catch (s) {
                        this.logger.zsymb(21, 8183, 30001, "setFirstLoginTime error {} - {} - {}", e, t, Object(rr.f)(s, 2))
                    }
                }
                removeFirstLoginFlag() {
                    const e = tt.default.getUidMe(),
                        t = u.a.getInstance();
                    t.getItem(v.FirstLoginLocalStorageKeys.IS_FIRST_LOGIN) === e && t.removeItem(v.FirstLoginLocalStorageKeys.IS_FIRST_LOGIN)
                }
                getDefaultFirstLoginTime() {
                    return Js.a.getTimeNow()
                }
                get firstLoginTimeMap() {
                    return this._firstLoginTimeMap
                }
                get logger() {
                    return this._logger
                }
            }) || nr) || nr) || nr) || nr) || nr);
            const or = Object(l.define)("transfer-data-suggestion-loader");
            var lr = s("cgeJ"),
                dr = s("XVri"),
                cr = s("bAqL");
            var hr = class {
                constructor(e) {
                    this._logger = void 0, this._moduleName = void 0, this._moduleName = e
                }
                log() {
                    this.Logger.zsymb(0, 8218, 3e4, this.moduleTagName, ...arguments)
                }
                logError(e, t) {
                    const s = null == t ? "" : this.stringifyDepthLevel(t);
                    this.Logger.zsymb(18, 8218, 30001, this.moduleTagName, e, s)
                }
                stringifyDepthLevel(e) {
                    return Object(cr.g)(e, Object(cr.c)())
                }
                get Logger() {
                    return this._logger || (this._logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("msg-sync", [dr.a])), this._logger
                }
                get moduleTagName() {
                    return this._moduleName + " - "
                }
            };
            var ur, gr = class {
                constructor(e) {
                    this.moduleName = e, this._logger = void 0, this._logger = new hr(this.moduleName)
                }
                get Logger() {
                    return this._logger
                }
            };

            function mr(e) {
                try {
                    return JSON.stringify(e)
                } catch (t) {
                    return ""
                }
            }

            function pr(e) {
                return JSON.parse(e)
            }
            Object(l.injectable)()(ur = Object(l.singleton)(or)(ur = Reflect.metadata("design:type", Function)(ur = Reflect.metadata("design:paramtypes", [])(ur = class extends gr {
                constructor() {
                    super(lr.d.LOADER), this._friendManager = void 0, this._groupManager = void 0
                }
                async loadLastCloseBannerDownloadPC() {
                    const e = this.getSecureLocalStorageDB();
                    if (!e) return this.Logger.logError("Load last close banner download pc failed cause invalid storage"), Promise.reject();
                    try {
                        const t = await e.getItemForCurrentUserAsync(lr.b);
                        return null != t ? pr(t) : (this.Logger.logError("Load last close banner download pc failed null"), null)
                    } catch (t) {
                        return this.Logger.logError("Load last close banner download pc failed", t), t
                    }
                }
                async loadListConversationsFromDB() {
                    const e = this.getSecureLocalStorageDB();
                    if (!e) return this.Logger.logError("Load list conversations from DB failed cause invalid storage"), Promise.reject([]);
                    try {
                        const t = await e.getItemForCurrentUserAsync(lr.c);
                        return null != t ? pr(t) : (this.Logger.logError("Load list conversations from DB failed null"), [])
                    } catch (t) {
                        return this.Logger.logError("Load list conversations from DB failed", t), []
                    }
                }
                async loadListFriends() {
                    const e = this.getFriendManagerModule();
                    if (e) try {
                        return await e.getFriends()
                    } catch (t) {
                        return this.Logger.logError("Load list friends failed", t), []
                    }
                    return this.Logger.log("Load list friends empty"), []
                }
                async loadListGroups() {
                    const e = this.getGroupManagerModule();
                    if (e) try {
                        return await e.getGroupsList()
                    } catch (t) {
                        return this.Logger.logError("Load list groups failed", t), []
                    }
                    return this.Logger.log("Load list groups empty"), []
                }
                async loadRegisteredData() {
                    const e = this.getSecureLocalStorageDB();
                    if (!e) return this.Logger.logError("Load registered data failed cause invalid storage"), Promise.reject();
                    try {
                        let t = e.getItemForCurrentUser(v.RegisterLocalStorageKeys.IS_REGISTERED_ON_THIS_DEVICE);
                        return null != t ? {
                            isRegisteredOnThisDevice: pr(t)
                        } : (this.Logger.log("Load registered data null"), null)
                    } catch (t) {
                        return this.Logger.logError("Load registered data failed", t), t
                    }
                }
                async loadSyncMessagesData() {
                    const e = this.getSecureLocalStorageDB();
                    if (!e) return this.Logger.logError("Load sync messages data failed cause invalid storage"), Promise.reject();
                    try {
                        const t = e.getItemForCurrentUser("sync_cross_settings");
                        return t ? pr(t) : (this.Logger.log("Load sync messages data null"), null)
                    } catch (t) {
                        return this.Logger.logError("Load sync messages data failed", t), t
                    }
                }
                async loadTransferMessagesData() {
                    const e = this.getSecureLocalStorageDB();
                    if (!e) return this.Logger.logError("Load transfer messages data failed cause invalid storage"), Promise.reject();
                    try {
                        const t = await e.getItemForCurrentUserAsync(lr.k);
                        return t ? pr(t) : (this.Logger.logError("Load transfer messages data failed null"), null)
                    } catch (t) {
                        return this.Logger.logError("Load transfer messages data failed", t), t
                    }
                }
                async setLastCloseBannerDownloadPC(e) {
                    const t = this.getSecureLocalStorageDB();
                    return t ? await t.setItemForCurrentUserAsync(lr.b, mr(e)) : Promise.reject("Invalid storage")
                }
                async setListConversationsFirstLoginToDB(e) {
                    const t = this.getSecureLocalStorageDB();
                    return t ? await t.setItemForCurrentUserAsync(lr.c, mr(e)) : Promise.reject("Invalid storage")
                }
                async updateTransferMessagesData(e) {
                    const t = {
                        lastTransferSuccessTime: e.lastTransferSuccessTime || Date.now()
                    };
                    try {
                        return await this.getSecureLocalStorageDB().setItemForCurrentUserAsync(lr.k, mr(t))
                    } catch (s) {
                        return s
                    }
                }
                getFriendManagerModule() {
                    var e;
                    this._friendManager || (this._friendManager = null === (e = s("UiPd")) || void 0 === e ? void 0 : e.default);
                    return this._friendManager
                }
                getGroupManagerModule() {
                    var e;
                    this._groupManager || (this._groupManager = null === (e = s("Gm1y")) || void 0 === e ? void 0 : e.default);
                    return this._groupManager
                }
                getSecureLocalStorageDB() {
                    return u.a.getInstance()
                }
            }) || ur) || ur) || ur);
            var fr = s("n09q"),
                vr = s("31cx"),
                br = s("a1r1"),
                Ir = s("BO4k");
            var yr, Cr = class extends gr {
                    constructor(e, t) {
                        super(dr.c.MANAGER), this._eventMap = new Map, this._fistLoginTime = void 0, this._listConversationsBeforeLogin = [], this._moduleLoader = void 0, this._moduleUIManager = void 0, this._moduleLoader = e, this._moduleUIManager = t, this.handleUpdateConfigs = this.handleUpdateConfigs.bind(this), this.isDisplayedBannerDownloadPCSuggestion = this.isDisplayedBannerDownloadPCSuggestion.bind(this), this.isDisplayedBubbleInfoEcard = this.isDisplayedBubbleInfoEcard.bind(this), this.isDisplayedCloseButtonBannerDownloadPC = this.isDisplayedCloseButtonBannerDownloadPC.bind(this), this.isDisplayedConversationFooter = this.isDisplayedConversationFooter.bind(this), this.isDisplayedGlobalSearchFooter = this.isDisplayedGlobalSearchFooter.bind(this), this.isDisplayedSearchInConversationFooter = this.isDisplayedSearchInConversationFooter.bind(this), this.isDisplayedMilestoneInPreviewMedia = this.isDisplayedMilestoneInPreviewMedia.bind(this), this.isDisplayedSuggestionInMediaList = this.isDisplayedSuggestionInMediaList.bind(this), this.isDisplayedTransferModal = this.isDisplayedTransferModal.bind(this), this.isValidForTransferMessages = this.isValidForTransferMessages.bind(this)
                    }
                    addEventListeners(e, t) {
                        this.eventMap.set(e, [...this.eventMap.get(e) || [], t])
                    }
                    callTransferMessages(e) {}
                    closeBannerDownloadPCSuggestion() {}
                    getConversationFooterRendererHeight() {
                        return this.isDisplayedConversationFooter() ? dr.b.CONVERSATION : 0
                    }
                    getFirstLoginTime() {
                        return this.firstLoginTime
                    }
                    getGlobalSearchFooterRendererHeight() {
                        return this.isDisplayedConversationFooter() ? dr.b.GLOBAL_SEARCH : 0
                    }
                    getLogger() {
                        return this.Logger
                    }
                    getUrlDownloadPC() {
                        return ""
                    }
                    hasConversationBeforeFirstLogin(e) {
                        return this._listConversationsBeforeLogin.includes(e)
                    }
                    hideTransferMessagesModal() {}
                    async initialize() {
                        this.firstLoginTime = l.ModuleContainer.resolve(br.a).getFirstLoginTime(this.getUserId()), this.handleUpdateConfigs(Ir.a()), this.registerSubscriptions(), await this.initializeListConversationsBeforeFirstLogin()
                    }
                    isDisplayedBannerDownloadPCSuggestion() {
                        return !!this.isEnabledFeature() && Ir.g()
                    }
                    isDisplayedBubbleInfoEcard(e) {
                        return !!this.isEnabledFeature() && (!!Ir.h() && this.hasConversationBeforeFirstLogin(e))
                    }
                    isDisplayedCloseButtonBannerDownloadPC() {
                        return !!this.isEnabledFeature() && Ir.k()
                    }
                    isDisplayedConversationFooter() {
                        return !!this.isEnabledFeature() && Ir.l()
                    }
                    isDisplayedCTADownloadPC() {
                        return !!this.isEnabledFeature() && Ir.i()
                    }
                    isDisplayedCTATransferMessages() {
                        return !!this.isEnabledFeature() && Ir.j()
                    }
                    isDisplayedGlobalSearchFooter() {
                        return !!this.isEnabledFeature() && Ir.m()
                    }
                    isDisplayedSearchInConversationFooter(e) {
                        return !!this.isEnabledFeature() && (!!Ir.p() && this.hasConversationBeforeFirstLogin(e))
                    }
                    isDisplayedMilestoneInPreviewMedia(e) {
                        return !!this.isEnabledFeature() && (!!Ir.o() && this.hasConversationBeforeFirstLogin(e))
                    }
                    isDisplayedSuggestionInMediaList(e) {
                        return !!this.isEnabledFeature() && (!!Ir.n() && this.hasConversationBeforeFirstLogin(e))
                    }
                    isDisplayedTransferModal() {
                        return !!this.isEnabledFeature() && Ir.q()
                    }
                    isEnabledFeature() {
                        return Ir.r()
                    }
                    isValidSupportDownloadPC() {
                        return !1
                    }
                    isValidForTransferMessages() {
                        return this.isEnabledFeature()
                    }
                    needTransferMessages() {}
                    removeEventListeners(e, t) {
                        const s = this.eventMap.get(e);
                        if (Array.isArray(s)) {
                            const e = s.findIndex((e => e === t)); - 1 !== e && s.splice(e, 1)
                        }
                    }
                    setFirstLoginTime(e) {
                        this.firstLoginTime = e
                    }
                    shouldTransferMessages() {
                        return !1
                    }
                    showTransferMessagesModal() {}
                    registerSubscriptions() {
                        He.$AppConfig.subscribe(this.handleUpdateConfigs)
                    }
                    isFirstLogin() {
                        return l.ModuleContainer.resolve(br.a).isFirstLogin(this.getUserId())
                    }
                    async initializeListConversationsBeforeFirstLogin() {
                        this._listConversationsBeforeLogin = await this.loadListConversationsBeforeFirstLogin()
                    }
                    handleUpdateConfigs(e) {
                        void 0 === e && (e = {});
                        const {
                            data_content: t
                        } = Ir.b(e), {
                            first_time_login_device: s
                        } = e;
                        t && this.UIManager.updateDataContent(Object(vr.a)(t)), null != s && (this.firstLoginTime = s)
                    }
                    async loadListConversations() {
                        const e = [],
                            t = await this.loaderModule.loadListFriends();
                        Array.isArray(t) && t.forEach((t => {
                            e.push(t.userId)
                        }));
                        const s = await this.loaderModule.loadListGroups();
                        return Array.isArray(s) && s.forEach((t => {
                            e.push(t.userId)
                        })), e
                    }
                    async loadListConversationsBeforeFirstLogin() {
                        let e;
                        if (this.isFirstLogin()) e = await this.loadListConversations(), this.loaderModule.setListConversationsFirstLoginToDB(e);
                        else {
                            const t = await this.loaderModule.loadListConversationsFromDB();
                            e = t, (t || []).length || (e = await this.loadListConversations(), this.loaderModule.setListConversationsFirstLoginToDB(e))
                        }
                        return e
                    }
                    notifyEvent(e) {
                        for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) s[i - 1] = arguments[i];
                        const n = this.eventMap.get(e);
                        Array.isArray(n) && n.forEach((e => Promise.resolve((() => e(...s)))))
                    }
                    get firstLoginTime() {
                        return this._fistLoginTime
                    }
                    set firstLoginTime(e) {
                        this._fistLoginTime = e
                    }
                    get eventMap() {
                        return this._eventMap
                    }
                    get loaderModule() {
                        return this._moduleLoader
                    }
                    get UIManager() {
                        return this._moduleUIManager
                    }
                    getUserId() {
                        const e = l.ModuleContainer.resolve(O.a),
                            {
                                userId: t
                            } = e.getSession() || {};
                        return t || ""
                    }
                },
                Sr = s("mgoj"),
                _r = s("JCvM");
            Object(l.injectable)()(yr = Object(O.d)()(yr = Object(l.singleton)(fr.a)(yr = function (e, t) {
                return Object(l.inject)(or)(e, void 0, 0)
            }(yr = function (e, t) {
                return Object(l.inject)(Sr.a)(e, void 0, 1)
            }(yr = Reflect.metadata("design:type", Function)(yr = Reflect.metadata("design:paramtypes", [Object, void 0 === _r.ITransferDataSuggestionUIManager ? Object : _r.ITransferDataSuggestionUIManager])(yr = class extends Cr {
                constructor(e, t) {
                    super(e, t), this._lastCloseBannerTimestamp = 0, this.handleBeforeUnload = this.handleBeforeUnload.bind(this)
                }
                closeBannerDownloadPCSuggestion() {
                    const e = Js.a.getTimeNow();
                    this.lastCloseBannerTimestamp = e, this.UIManager.closeBannerDownloadPCSuggestion(), this.loaderModule.setLastCloseBannerDownloadPC(e)
                }
                getUrlDownloadPC() {
                    return Object(Ir.f)()
                }
                async initialize() {
                    await super.initialize(), await this.loadLastCloseBannerTimestamp()
                }
                isDisplayedBannerDownloadPCSuggestion() {
                    if (!super.isDisplayedBannerDownloadPCSuggestion()) return !1;
                    if (!this.isValidSupportDownloadPC()) return !1;
                    const e = Object(Ir.e)();
                    return this.lastCloseBannerTimestamp + e <= Js.a.getTimeNow()
                }
                isValidSupportDownloadPC() {
                    const e = Object(cr.d)().toLowerCase();
                    return null != Object(Ir.d)().find((t => e.indexOf(t) > -1))
                }
                isValidForTransferMessages() {
                    return !1
                }
                onApplicationReady(e) {
                    this.isDisplayedBannerDownloadPCSuggestion() && cr.a.logAction(cr.a.BannerDownloadPC.DISPLAYED), this.isEnabledFeature() && cr.a.logAction(cr.a.Common.DISPLAYED_NOT_ENOUGH_DATA_MESSAGE)
                }
                handleBeforeUnload() {
                    this.logActionBeforeUnload()
                }
                async loadLastCloseBannerTimestamp() {
                    try {
                        const e = await this.loaderModule.loadLastCloseBannerDownloadPC();
                        e && (this.lastCloseBannerTimestamp = e)
                    } catch (e) {}
                }
                logActionBeforeUnload() {
                    const e = Object(cr.b)();
                    cr.a.logActionInfo(e, !0)
                }
                registerSubscriptions() {
                    super.registerSubscriptions(), l.ModuleContainer.resolve(O.a).addEventListenerOnce(O.b.BeforeUnload, this.handleBeforeUnload)
                }
                get lastCloseBannerTimestamp() {
                    return this._lastCloseBannerTimestamp
                }
                set lastCloseBannerTimestamp(e) {
                    this._lastCloseBannerTimestamp = e
                }
            }) || yr) || yr) || yr) || yr) || yr) || yr);
            var Er, Lr = class extends gr {
                constructor() {
                    super(dr.c.UI), this.key = _r.c, this.name = _r.c, this.dataState = Object(i.a)({}, dr.f), this.UIState = Object(i.a)({}, dr.g)
                }
                closeBannerDownloadPCSuggestion() {}
                hideTransferMessagesModal() {}
                init(e) {}
                initialize() {
                    const {
                        data_content: e
                    } = Object(Ir.b)(Object(Ir.a)());
                    this.handleUpdateContent(e)
                }
                getItem(e, t) {
                    return e.key === dr.e ? this.dataState : e.key === dr.h ? this.UIState : {}
                }
                getList(e, t) {
                    return []
                }
                turnOffDisplayingEntryPoints() {
                    this.handleUpdateRenderer({
                        isDisplayedEntryPoints: !1
                    })
                }
                onGetItemFailure(e, t) {}
                onGetListFailure(e, t) {}
                showTransferMessagesModal() {}
                updateDataContent(e) {
                    this.handleUpdateContent(e)
                }
                setDataState(e) {
                    const t = Object(sa.a)(this.dataState, e);
                    this.dataState !== t && (this.dataState = t, Object(je.g)(this.name, dr.e))
                }
                setUIState(e) {
                    const t = Object(sa.a)(this.UIState, e);
                    this.UIState !== t && (this.UIState = t, Object(je.g)(this.name, dr.h))
                }
                handleUpdateContent(e) {
                    this.setDataState((t => {
                        t.version = e.version, t.content = e.content
                    }))
                }
                handleUpdateRenderer(e) {
                    this.setUIState((t => {
                        for (const s in e) t[s] = e[s]
                    }))
                }
            };
            Object(ht.b)(_r.b)(Er = class extends Lr {
                closeBannerDownloadPCSuggestion() {
                    this.setUIState((e => {
                        e[lr.j.BANNER_DOWNLOAD].isDisplayed = !1
                    }))
                }
                getItem(e, t) {
                    const s = super.getItem(e, t);
                    if (!s) return;
                    let i = {};
                    if (e.key === lr.f) {
                        const {
                            content: e = {}
                        } = s;
                        for (const t in e) {
                            const s = e[t];
                            if (s)
                                for (const e in s) {
                                    var n;
                                    i[t] || (i[t] = {}), i[t][e] = null === (n = s[e]) || void 0 === n ? void 0 : n.web
                                }
                        }
                    } else i = s;
                    return i
                }
            });
            var wr = Object(l.define)("forward-message"),
                Mr = s("oAAg");
            Mr.Pool;
            var Tr, Fr, Or, Rr, Dr, Ar = Object(l.define)("forward-message-pool");
            Tr = Object(l.singleton)(wr), Fr = function (e, t) {
                return Object(l.inject)(Ar)(e, void 0, 0)
            }, Or = Reflect.metadata("design:type", Function), Rr = Reflect.metadata("design:paramtypes", [Object]), Object(l.injectable)(Dr = Tr(Dr = Fr(Dr = Or(Dr = Rr(Dr = class {
                constructor(e) {
                    this._pool = void 0, this.pool = e
                }
                forward(e, t) {
                    const s = this.buildTask();
                    this.pool.use(s)
                }
                buildTask() {
                    return async () => {}
                }
                get pool() {
                    return this._pool
                }
                set pool(e) {
                    this._pool = e
                }
            }) || Dr) || Dr) || Dr) || Dr);
            var jr = s("t5n0"),
                Pr = s("aQZC");
            var Nr, Br = new class {
                constructor() {
                    this.focusManager = void 0, this.focusStatus = void 0, this.focusService = void 0
                }
                get FSV() {
                    return this.focusService || (this.focusService = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.appStatus, [jt.b.focusDetectorManager])), this.focusService
                }
                get FM() {
                    return this.focusManager || (this.focusManager = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.appStatus, [jt.b.focusDetectorManager])), this.focusManager
                }
                get FSTT() {
                    return this.focusStatus || (this.focusStatus = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.appStatus, [jt.b.focusStatus])), this.focusStatus
                }
            };
            let Ur = Object(l.injectable)()(Nr = Object(O.e)()(Nr = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(Nr = Reflect.metadata("design:type", Function)(Nr = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a])(Nr = class extends k.b {
                constructor(e) {
                    super(), this.config = e, this.detectors = void 0, this.lostFocusHandler = void 0, this.reFocusHandler = void 0, this.lastFirer = void 0, this.enableLog = void 0, this.listenDetector = (e, t) => {
                        t && (this.detectors.set(e, t), this.lostFocusHandler.set(e, (() => {
                            this.onLostFocus(e)
                        })), this.reFocusHandler.set(e, (() => {
                            this.onRefocus(e)
                        })), t.idle(this.lostFocusHandler.get(e)), t.wakeup(this.reFocusHandler.get(e)))
                    }, this.disposeDetector = e => {
                        const t = this.detectors.get(e);
                        this.enableLog && Br.FM.zsymb(0, 9657, 30003, "disposeDetector", e, !!t), t && (t.removeIdle(this.lostFocusHandler.get(e)), t.removeWakeup(this.reFocusHandler.get(e)), t.ifvisible = null, t._window = null, t.removeAllIpc(), this.lostFocusHandler.delete(e), this.reFocusHandler.delete(e), this.detectors.delete(e))
                    }, this.onLostFocus = e => {
                        this.lastFirer && (clearTimeout(this.lastFirer), this.lastFirer = null), this.lastFirer = setTimeout((() => {
                            this.enableLog && Br.FM.zsymb(0, 9657, 30004, "onlostFocus", e);
                            let t = !0,
                                s = Number.MAX_SAFE_INTEGER,
                                i = "unknown";
                            this.detectors.forEach((e => {
                                if (e.isActive()) t = !1;
                                else {
                                    const t = e.getIdleInfo();
                                    t.idleFor < s && (s = t.idleFor, i = t.idleByTimeout ? "no-action-timeout" : "unknown")
                                }
                            })), t && this.dispatchEvent(new jr.a(jr.b.LostFocus, {
                                scope: "app",
                                reason: i
                            })), this.lastFirer = null
                        }), 200)
                    }, this.onRefocus = e => {
                        this.lastFirer && (clearTimeout(this.lastFirer), this.lastFirer = null), this.lastFirer = setTimeout((() => {
                            this.enableLog && Br.FM.zsymb(0, 9657, 30005, "onRefocus", e), this.dispatchEvent(new jr.a(jr.b.Focus, e)), this.lastFirer = null
                        }), 200)
                    }, this.detectors = new Map, this.lostFocusHandler = new Map, this.reFocusHandler = new Map, this.enableLog = !0
                }
                onAuthenticated(e) {
                    const {
                        userId: t
                    } = e.getSession();
                    this.enableLog && Br.FM.zsymb(0, 9657, 3e4, "onAuthenticated", t), this.init()
                }
                acquire(e, t, s, i) {
                    if (!e || e == bt.c) return Pr.b;
                    if (this.detectors.has(e)) return Br.FM.zsymb(0, 9657, 30001, "acquire exists", e), this.detectors.get(e);
                    this.enableLog && Br.FM.zsymb(0, 9657, 30002, "acquire new", e);
                    const n = new Pr.a(t, e, s, i);
                    return this.listenDetector(e, n), n
                }
                release(e) {
                    this.disposeDetector(e)
                }
                getAppIdleTime() {
                    let e = Number.MAX_SAFE_INTEGER;
                    return this.detectors.forEach((t => {
                        const s = t.getIdleInfo();
                        s.idleFor < e && (e = s.idleFor)
                    })), e
                }
                updateIdleTimeout(e) {
                    this.detectors.forEach((t => {
                        t.setIdleTimeout(e)
                    }))
                }
                isAppFocus() {
                    let e = !1;
                    return this.detectors.forEach((t => {
                        t.isActive() && (e = !0)
                    })), e
                }
                init() {
                    this.listenDetector(bt.c, Pr.b)
                }
            }) || Nr) || Nr) || Nr) || Nr) || Nr;
            const kr = Object(l.define)("lost-focus-service"),
                Gr = Object(l.define)("active-service");
            var zr, xr, Vr = s("cHDa");
            ! function (e) {
                e[e.Focus = 0] = "Focus", e[e.LostFocus = 1] = "LostFocus"
            }(xr || (xr = {}));
            let $r = Object(l.injectable)()(zr = Object(O.e)()(zr = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(zr = function (e, t) {
                return Object(l.inject)(kr)(e, void 0, 1)
            }(zr = Reflect.metadata("design:type", Function)(zr = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === kr ? Object : kr])(zr = class {
                constructor(e, t) {
                    this.config = e, this.service = t, this.enableLog = void 0, this.currentState = void 0, this.enableLog = !0, this.currentState = xr.LostFocus
                }
                onAuthenticated(e) {
                    const {
                        userId: t
                    } = e.getSession();
                    this.enableLog && Br.FSTT.zsymb(0, 9656, 3e4, "onAuthenticated", t), this.init()
                }
                init() {
                    const e = l.ModuleContainer.resolve(jr.c);
                    e.addEventListener(jr.b.LostFocus, (e => {
                        const {
                            scope: t,
                            reason: s
                        } = e.payload;
                        this.currentState == xr.Focus && "app" === t && (this.service.notiLostFocus(), this.config.get("online_configs.enable_focus_manager") && Vr.b.setAppStatus(Vr.a.BACKGROUND), this.currentState = xr.LostFocus)
                    })), e.addEventListener(jr.b.Focus, (e => {
                        this.currentState == xr.LostFocus && this.config.get("online_configs.enable_focus_manager") && Vr.b.setAppStatus(Vr.a.FOREGROUND), this.currentState = xr.Focus
                    }))
                }
            }) || zr) || zr) || zr) || zr) || zr) || zr;
            var Wr;
            let qr = Object(l.injectable)()(Wr = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(Wr = Reflect.metadata("design:type", Function)(Wr = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a])(Wr = class {
                constructor(e) {
                    this.config = e
                }
                notiLostFocus() {
                    this.config.get("online_configs.enable_lost_focus") ? qi.default.lostFocus().then($i.a).then((() => {
                        Br.FSV.zsymb(0, 8612, 30001, "send noti lost success")
                    })).catch((e => {
                        Br.FSV.zsymb(0, 8612, 30002, "send noti lost fail", JSON.stringify(e))
                    })) : Br.FSV.zsymb(0, 8612, 3e4, "call send noti lost but feat disable")
                }
            }) || Wr) || Wr) || Wr) || Wr;
            var Kr = s("a8HX"),
                Hr = s("LLK0");
            var Zr, Qr = s("G15u");
            let Jr = Object(l.injectable)()(Zr = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 0)
            }(Zr = function (e, t) {
                return Object(l.inject)(Gr)(e, void 0, 1)
            }(Zr = Reflect.metadata("design:type", Function)(Zr = Reflect.metadata("design:paramtypes", [void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory, void 0 === Gr ? Object : Gr])(Zr = class extends class {
                constructor() {
                    this.interpreter = void 0
                }
                create(e) {
                    this.interpreter = new Hr.a(this.createMachine(e), e)
                }
                get status() {
                    var e;
                    return (null === (e = this.interpreter) || void 0 === e ? void 0 : e.status) || Hr.b.NotStarted
                }
                start() {
                    var e;
                    null === (e = this.interpreter) || void 0 === e || e.start()
                }
                stop() {
                    var e;
                    null === (e = this.interpreter) || void 0 === e || e.stop()
                }
                send(e) {
                    return this.interpreter.send(e)
                }
                onChange(e) {
                    this.interpreter.onChange(e)
                }
                onTransition(e) {
                    this.interpreter.onTransition(e)
                }
                onStop(e) {
                    this.interpreter.onStop(e)
                }
                onDone(e) {
                    this.interpreter.onDone(e)
                }
            } {
                constructor(e, t) {
                    super(), this.loggerFactory = e, this.service = t
                }
                createMachine() {
                    return e = this.loggerFactory.createZLogger(jt.b.activeDeactive, [jt.b.stateMachine]), t = this.service, Object(Qr.a)({
                        strict: !0,
                        id: "active-deactive",
                        context: {},
                        initial: "unset",
                        states: {
                            unset: {
                                entry: () => e.zsymb(3, 9659, 3e4, "unset"),
                                on: {
                                    FOCUS: {
                                        actions: () => {
                                            e.zsymb(3, 9659, 30001, "start life cycle normal case!")
                                        },
                                        target: "foreground_active"
                                    },
                                    APP_UNLOCK: {
                                        actions: () => {
                                            e.zsymb(3, 9659, 30002, "start life cycle app auto lock case!")
                                        },
                                        target: "foreground_active"
                                    },
                                    LOST_FOCUS: {
                                        actions: () => {
                                            e.zsymb(3, 9659, 30003, "start life cycle lost focus case!")
                                        },
                                        target: "background_active"
                                    }
                                }
                            },
                            foreground_active: {
                                entry: s => {
                                    e.zsymb(3, 9659, 30004, "state: foreground_active"), t.startForegroundMode()
                                },
                                on: {
                                    IDLE: {
                                        actions: () => {},
                                        target: "background_deactive"
                                    },
                                    LOST_FOCUS: {
                                        actions: () => {},
                                        target: "background_active"
                                    },
                                    INAPP_INTERACT: {
                                        actions: () => {
                                            t.keepForegroundMode()
                                        }
                                    },
                                    OUTAPP_INTERACT: {
                                        actions: (e, s) => {
                                            t.activeInBackground(s.isOsEvt)
                                        }
                                    },
                                    APP_LOCK: {
                                        target: "background_deactive"
                                    },
                                    APP_UNLOCK: {
                                        actions: () => {
                                            t.startForegroundMode()
                                        }
                                    },
                                    LOG_OFF: {
                                        target: "background_deactive"
                                    },
                                    OUTAPP_IDLE: {
                                        target: "background_deactive"
                                    }
                                }
                            },
                            background_active: {
                                entry: s => {
                                    e.zsymb(3, 9659, 30005, "state: background_active"), t.startBackgroundMode()
                                },
                                on: {
                                    FOCUS: {
                                        target: "foreground_active"
                                    },
                                    OUTAPP_INTERACT: {
                                        actions: (e, s) => {
                                            t.activeInBackground(s.isOsEvt)
                                        }
                                    },
                                    OUTAPP_IDLE: {
                                        target: "background_deactive"
                                    },
                                    APP_LOCK: {
                                        target: "background_deactive"
                                    }
                                }
                            },
                            background_deactive: {
                                entry: (s, i) => {
                                    e.zsymb(3, 9659, 30006, "state: background_deactive", i.status), t.startDeactive(i.status)
                                },
                                on: {
                                    FOCUS: {
                                        actions: () => {},
                                        target: "foreground_active"
                                    },
                                    OUTAPP_INTERACT: {
                                        actions: (e, s) => {
                                            t.activeInBackground(s.isOsEvt)
                                        },
                                        target: "background_active"
                                    },
                                    APP_UNLOCK: {
                                        target: "foreground_active"
                                    }
                                }
                            }
                        },
                        on: {
                            RESET: {
                                target: "unset",
                                actions: () => {}
                            }
                        }
                    });
                    var e, t
                }
                isUnset() {
                    var e;
                    return "unset" === (null === (e = this.interpreter) || void 0 === e ? void 0 : e.state.value)
                }
                onceDeactive(e) {
                    var t;
                    if ("background_deactive" === (null === (t = this.interpreter) || void 0 === t ? void 0 : t.state.value)) e();
                    else {
                        let t = () => {
                            var s, i;
                            "background_deactive" === (null === (s = this.interpreter) || void 0 === s ? void 0 : s.state.value) && (null === (i = this.interpreter) || void 0 === i || i.off(t), e())
                        };
                        this.onChange(t)
                    }
                }
            }) || Zr) || Zr) || Zr) || Zr) || Zr;
            var Xr, Yr = s("4zJP");
            const eo = new Map([
                ["0", "LOCK_SCREEN"],
                ["1", "UNLOCK_SCREEN"],
                ["2", "LOG_ON"],
                ["3", "LOG_OFF"],
                ["4", "SLEEP"],
                ["5", "RESUME"]
            ]);
            let to = Object(l.injectable)()(Xr = Object(O.h)()(Xr = Object(O.g)()(Xr = Object(l.singleton)(Kr.a)(Xr = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(Xr = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 1)
            }(Xr = function (e, t) {
                return Object(l.inject)(Gr)(e, void 0, 2)
            }(Xr = Reflect.metadata("design:type", Function)(Xr = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory, void 0 === Gr ? Object : Gr])(Xr = class {
                constructor(e, t, s) {
                    this.config = e, this.service = s, this.logger = void 0, this.machine = void 0, this._ipc = void 0, this.authenticated = void 0, this.appLocked = void 0, this.isRunning = void 0, this.lastConfig = void 0, this.onAppLock = () => {
                        this.logger.zsymb(0, 9647, 30003, "app locked", this.authenticated), this.appLocked = !0, this.authenticated && this.machine.send({
                            type: "APP_LOCK",
                            status: 2
                        })
                    }, this.onAppUnLock = () => {
                        this.logger.zsymb(0, 9647, 30004, "app unlocked", this.authenticated), this.appLocked = !1, this.authenticated && this.machine.send({
                            type: "APP_UNLOCK",
                            status: 0
                        })
                    }, this.onConfigChanged = e => {
                        He.default.stagingAccount && (window._activeController = this), e && this.config.set("online_configs", e);
                        const t = this.isConfigsReallyChanged();
                        if (this.logger.zsymb(0, 9647, 30005, "onConfigChanged", t), !t) return;
                        this.lastConfig = this.config.get("online_configs");
                        const s = this.config.get("online_configs.idle_time");
                        l.ModuleContainer.resolve(jr.c).updateIdleTimeout(s / 1e3), this.service.onConfigUpdated(), this.isEnable() ? this.setup() : this.onDispose()
                    }, this.onLostFocus = async e => {
                        const {
                            scope: t,
                            reason: s
                        } = e.payload;
                        "app" === t && (this.logger.zsymb(0, 9647, 30006, "lost focus", s), "no-action-timeout" != s || await this.service.isUserHasAction(this.idleTime) ? this.machine.send({
                            type: "LOST_FOCUS"
                        }) : this.machine.send({
                            type: "IDLE",
                            status: 0
                        }))
                    }, this.onFocus = e => {
                        this.isUsingApp() && (this.logger.zsymb(0, 9647, 30007, "active-deactive focus"), this.machine.send({
                            type: "FOCUS"
                        }))
                    }, this.onActiveFromBackground = (e, t) => {
                        this.isUsingApp() && this.machine.send({
                            type: "OUTAPP_INTERACT",
                            isOsEvt: t
                        })
                    }, this.onDeactiveFromBackground = (e, t) => {
                        this.logger.zsymb(0, 9647, 30008, "onDeactiveFromBackground", t), this.isUsingApp() && this.machine.send({
                            type: "OUTAPP_IDLE",
                            status: t
                        })
                    }, this.machine = l.ModuleContainer.resolveToken(Jr), this.logger = t.createZLogger(jt.b.activeDeactive, [jt.b.controller]), this.config = e, this.service = s, this.authenticated = !1, this.appLocked = !1, this.isRunning = !1, this.lastConfig = {}, Et.q.listenEvent(Et.n, this.onConfigChanged);
                    try {
                        this.machine.create()
                    } catch (i) {
                        return void this.logger.zsymb(18, 9647, 3e4, (() => ["create error", {
                            error: i
                        }]))
                    }
                }
                get ipc() {
                    if (!this._ipc) {
                        const {
                            ipcRenderer: e
                        } = s("vbkW");
                        this._ipc = e
                    }
                    return this._ipc
                }
                createMachine() {}
                onStart() {
                    this.isEnable() || this.logger.zsymb(0, 9647, 30001, "feature is not enable")
                }
                setup() {
                    if (this.logger.zsymb(0, 9647, 30002, "setup", this.isRunning), this.clearBackgroundTracking(), this.isEnableBackgroundTrack() && this.setupBackgroundTracking(), this.isRunning) return;
                    this.isRunning = !0, this.machine.start();
                    const e = l.ModuleContainer.resolve(jr.c);
                    this.machine.isUnset() && (e.isAppFocus() ? this.machine.send({
                        type: "FOCUS"
                    }) : this.machine.send({
                        type: "LOST_FOCUS"
                    })), e.addEventListener(jr.b.LostFocus, this.onLostFocus), e.addEventListener(jr.b.Focus, this.onFocus), this.appLocked = Et.q.getAppLock(), Yr.b.on(Yr.a.APP_LOCKED, this.onAppLock), Yr.b.on(Yr.a.APP_UNLOCKED, this.onAppUnLock)
                }
                onAuthenticated() {
                    this.authenticated = !0, this.isEnable() && this.service.onLogin()
                }
                onDispose() {
                    if (!this.isRunning) return;
                    this.isRunning = !1, this.machine.stop();
                    const e = l.ModuleContainer.resolve(jr.c);
                    e.removeEventListener(jr.b.LostFocus, this.onLostFocus), e.removeEventListener(jr.b.Focus, this.onFocus), Yr.b.off(Yr.a.APP_LOCKED, this.onAppLock), Yr.b.off(Yr.a.APP_UNLOCKED, this.onAppUnLock), this.clearBackgroundTracking()
                }
                isConfigsReallyChanged() {
                    for (const e in this.config.get("online_configs"))
                        if (e && this.lastConfig[e] !== this.config.get(`online_configs.${e}`)) return !0;
                    return !1
                }
                setupBackgroundTracking() {}
                clearBackgroundTracking() {}
                onUserSendMessage() {
                    this.isEnable() && this.machine.send("INAPP_INTERACT")
                }
                onUserLogOff() {
                    return new Promise((e => {
                        this.isEnable() || e(!1), this.machine.onceDeactive((() => {
                            e(!0)
                        })), this.machine.send({
                            type: "LOG_OFF",
                            status: 3
                        }), this.onDispose(), setTimeout((() => {
                            e(!0)
                        }), 2e3)
                    }))
                }
                onOSEvent(e) {
                    if (!this.isEnable()) return;
                    const t = eo.get(e);
                    We.default.send(qe.GeneralActions.USER_ACTIVE_CHANGED, t), this.logger.zsymb(3, 9647, 30009, "handle event os ", t)
                }
                isUsingApp() {
                    const e = this.appLocked || Et.q.getWaitRestart();
                    return this.authenticated && !e
                }
                isEnable() {
                    return this.config.get("online_configs.enable_active_deactive_v2")
                }
                isEnableBackgroundTrack() {
                    return !1
                }
                isEnableFullBackgroundTrack() {
                    return !1
                }
                get pingInterval() {
                    return this.config.get("online_configs.update_action_interval")
                }
                get idleTime() {
                    return this.config.get("online_configs.idle_time")
                }
            }) || Xr) || Xr) || Xr) || Xr) || Xr) || Xr) || Xr) || Xr) || Xr;
            var so, io, no, ao, ro = s("yK2b");
            ! function (e) {
                e[e.ActiveBackground = 0] = "ActiveBackground", e[e.KeepActiveForeground = 1] = "KeepActiveForeground", e[e.FirstActiveForeground = 2] = "FirstActiveForeground", e[e.ToBackground = 3] = "ToBackground", e[e.KeepActiveBackground = 4] = "KeepActiveBackground"
            }(io || (io = {})),
            function (e) {
                e[e.Idle = 0] = "Idle", e[e.ComputerLock = 1] = "ComputerLock", e[e.AppLock = 2] = "AppLock", e[e.LogOff = 3] = "LogOff"
            }(no || (no = {})),
            function (e) {
                e[e.Foreground = 0] = "Foreground", e[e.BackgroundActive = 1] = "BackgroundActive", e[e.BackgroundDeactive = 2] = "BackgroundDeactive"
            }(ao || (ao = {}));
            const oo = {
                [ao.Foreground]: io.KeepActiveForeground,
                [ao.BackgroundActive]: io.KeepActiveBackground
            };
            let lo = Object(l.injectable)()(so = function (e, t) {
                return Object(l.inject)(d.a)(e, void 0, 0)
            }(so = function (e, t) {
                return Object(l.inject)(j.ZLoggerFactory)(e, void 0, 1)
            }(so = function (e, t) {
                return Object(l.inject)(jr.c)(e, void 0, 2)
            }(so = Reflect.metadata("design:type", Function)(so = Reflect.metadata("design:paramtypes", [void 0 === d.a ? Object : d.a, void 0 === j.ZLoggerFactory ? Object : j.ZLoggerFactory, void 0 === jr.c ? Object : jr.c])(so = class {
                constructor(e, t, s) {
                    this.config = e, this.focusManager = s, this.logger = void 0, this._ipc = void 0, this.pingTimer = void 0, this.deactiveTimer = void 0, this.status = void 0, this.configChanged = void 0, this.logger = t.createZLogger(jt.b.activeDeactive, [jt.b.service]), this.status = ao.Foreground, this.configChanged = !1
                }
                get ipc() {
                    if (!this._ipc) {
                        const {
                            ipcRenderer: e
                        } = s("vbkW");
                        this._ipc = e
                    }
                    return this._ipc
                }
                get pingInterval() {
                    return this.config.get("online_configs.update_action_interval")
                }
                get deactiveTimeout() {
                    return this.config.get("online_configs.idleTime")
                }
                get enableSendDeactiveOnBgIdle() {
                    return this.config.get("online_configs.enable_deact_on_bg_idle")
                }
                get enableSendDeactiveOnFgIdle() {
                    return this.config.get("online_configs.enable_deact_on_fg_idle")
                }
                get enSendActiveToKeepAlive() {
                    return this.config.get("online_configs.send_active_to_keep_live")
                }
                get enActiveUsingSocket() {
                    return this.config.get("online_configs.send_active_using_socket")
                }
                get enableBackgroundTracking() {
                    return this.config.get("online_configs.enable_background_tracking")
                }
                get enableFeature() {
                    return this.config.get("online_configs.enable_active_deactive_v2")
                }
                get enableFullBackgroundTrack() {
                    return !1
                }
                onLogin() {
                    this.sendActiveToServer(io.ActiveBackground)
                }
                startTrackIdle(e) {
                    void 0 === e && (e = !0), this.enableBackgroundTracking ? this.logger.zsymb(0, 9648, 30001, "startTrackIdle") : this.logger.zsymb(0, 9648, 3e4, "in startTrackIdle but flag off")
                }
                stopTrackIdle() {
                    this.logger.zsymb(0, 9648, 30002, "stopTrackIdle")
                }
                startForegroundMode() {
                    this.status = ao.Foreground, this.sendActiveToServer(io.FirstActiveForeground), this.clearPingTimer(), this.createPingTimer(), this.enableFullBackgroundTrack || this.stopTrackIdle()
                }
                keepForegroundMode() {
                    this.sendActiveToServer(io.KeepActiveForeground, {
                        additionText: "[Send Msg] "
                    })
                }
                startBackgroundMode() {
                    this.status = ao.BackgroundActive, this.clearPingTimer(), this.startTrackIdle()
                }
                activeInBackground(e) {
                    const t = e ? io.ActiveBackground : io.KeepActiveBackground;
                    this.pingTimer ? this.logger.zsymb(0, 9648, 30003, "user action bg but dont need ping because in ping interval") : this.sendActiveToServer(t)
                }
                startDeactive(e) {
                    let t = -1;
                    switch (e) {
                        case 0:
                            t = no.Idle;
                            break;
                        case 1:
                            t = no.ComputerLock;
                            break;
                        case 2:
                            t = no.AppLock;
                            break;
                        case 3:
                            t = no.LogOff
                    }
                    this.clearPingTimer(), -1 !== t && this.canSendDeactive(t) && this.sendDeactiveToServer(t), this.status === ao.Foreground && t == no.Idle && this.startTrackIdle(!1), t != no.ComputerLock && t != no.AppLock || this.stopTrackIdle(), this.status = ao.BackgroundDeactive
                }
                onConfigUpdated() {
                    this.configChanged = !0, this.enableFeature || this.clearPingTimer()
                }
                getStatus() {
                    return this.status
                }
                createPingTimer() {
                    !this.pingTimer && this.enableFeature && (this.logger.zsymb(0, 9648, 30004, "createPingTimer"), this.configChanged = !1, this.pingTimer = setInterval((() => {
                        const e = oo[this.status];
                        e ? this.sendPingActive(e) : this.logger.zsymb(0, 9648, 30005, "call ping invalid state!"), this.configChanged && (this.clearPingTimer(), this.createPingTimer())
                    }), this.pingInterval))
                }
                clearPingTimer() {
                    this.logger.zsymb(0, 9648, 30006, "clearPingTimer"), clearInterval(this.pingTimer), this.pingTimer = null
                }
                async isUserHasAction(e) {
                    return this.focusManager.getAppIdleTime() < e
                }
                canSendDeactive(e) {
                    return e !== no.Idle || (this.status === ao.Foreground && this.enableSendDeactiveOnFgIdle || this.status === ao.BackgroundActive && this.enableSendDeactiveOnBgIdle)
                }
                async sendPingActive(e) {
                    await this.isUserHasAction(this.pingInterval) ? this.sendActiveToServer(e) : this.logger.zsymb(3, 9648, 30007, "call ping but discard, because the user don't have action!")
                }
                sendActiveToServer(e, t) {
                    void 0 === t && (t = {
                        additionText: ""
                    });
                    const {
                        additionText: s
                    } = t;
                    if (!this.enActiveUsingSocket || ro.default.getMsgSrcType() !== v.MsgSources.SOCKET) return this.sendActiveViaHttp(e, s);
                    let i = null;
                    return i = this.enSendActiveToKeepAlive ? ys.default.pingActiveViaKeepAlive(e) : ys.default.pingActive(e), i.then((() => (this.logger.zsymb(3, 9648, 30008, "{}Call active app SUCCESS: socket - {}", s, e), !0))).catch((t => (this.logger.zsymb(21, 9648, 30009, "{}Call active fail: socket - {} - {}", s, e, JSON.stringify(t)), this.sendActiveViaHttp(e))))
                }
                sendActiveViaHttp(e, t) {
                    return void 0 === t && (t = ""), new Promise((s => {
                        qi.default.active(e).then($i.a).then((() => {
                            this.logger.zsymb(3, 9648, 30010, "{}Call active app SUCCESS: http - {}", t, e), s(!0)
                        })).catch((i => {
                            this.logger.zsymb(21, 9648, 30011, "{}Call active fail: http - {} - {}", t, e, JSON.stringify(i)), s(!1)
                        }))
                    }))
                }
                sendDeactiveToServer(e) {
                    return qi.default.deactiveV2().then($i.a).then((() => (this.logger.zsymb(3, 9648, 30012, "Call deactive app SUCCESS {}", e), !0))).catch((e => (this.logger.zsymb(21, 9648, 30013, "Call deactive fail: ", JSON.stringify(e)), !1)))
                }
            }) || so) || so) || so) || so) || so) || so;
            l.ModuleContainer.registerSingleton(kr, qr), l.ModuleContainer.registerSingleton(jr.c, Ur), l.ModuleContainer.registerSingleton(Gr, lo), l.ModuleContainer.resolve(jr.c), l.ModuleContainer.resolveToken($r), l.ModuleContainer.resolveToken(to);
            var co = s("Vp9m");
            let ho;
            ! function (e) {
                e.lockSendMsg = "lockSendMsg"
            }(ho || (ho = {}));
            s("MnxE");
            var uo;
            Object(ht.b)($s.b)(uo = Reflect.metadata("design:type", Function)(uo = Reflect.metadata("design:paramtypes", [])(uo = class {
                get Logger() {
                    return this._Logger || (this._Logger = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger(jt.b.onlyAdminChatSettings, [this.name])), this._Logger
                }
                constructor() {
                    this.type = void 0, this.name = void 0, this.key = void 0, this.settings = new Map, this.me = "", this._Logger = void 0, this.name = $s.a, this.key = $s.a, 1 === He.default.only_admin_chat_setting.enable_only_admin_chat_setting && this._addPublicGroupSettingEventListener()
                }
                _filterSettingKeys(e, t, s) {
                    let i = {
                        lockSendMsg: !1
                    };
                    for (let n in e) Object.keys(ho).includes(n) && n === ho.lockSendMsg && (i[ho.lockSendMsg] = !t && !s && Boolean(e[ho.lockSendMsg]));
                    return i
                }
                _onUpdateSettings(e, t, s, i) {
                    this.me || (this.me = tt.default.getUidMe());
                    const n = this.me === t,
                        a = this._filterSettingKeys(i, n, s);
                    return this.settings.set(e, a), Object(je.g)(this.name, e), a
                }
                showNoti(e) {
                    if ("TOAST" === e.type) co.ZToastManagerHolder.getZToastManagerByWindowId(e.windowId || bt.c).show(Object(i.a)({}, e.config))
                }
                verifySetting(e) {
                    const {
                        convId: t,
                        field: s,
                        showNoti: i
                    } = e, n = this.settings.get(t);
                    return n ? (i && i.triggerValue === n[s] && this.showNoti(i), n && n[s]) : null
                }
                onSettingsUpdate(e, t) {
                    let s = this.settings.get(e) || {
                        lockSendMsg: !1
                    };
                    for (let i in t) Object.keys(ho).includes(i) && (s[i] = t[i]);
                    this.settings.set(e, s), Object(je.g)(this.name, e)
                }
                _addPublicGroupSettingEventListener() {
                    Dt.default.subscribeEventGroup(v.EventGroup.CHANGE_OWNER, (e => {
                        const {
                            groupId: t
                        } = e;
                        t && this.onLoadGroupSetting(t)
                    })), Dt.default.subscribeEventGroup(v.EventGroup.ADD_ADMIN, (e => {
                        const {
                            groupId: t
                        } = e;
                        t && this.onLoadGroupSetting(t)
                    })), Dt.default.subscribeEventGroup(v.EventGroup.REMOVE_ADMIN, (e => {
                        const {
                            groupId: t
                        } = e;
                        t && this.onLoadGroupSetting(t)
                    })), Dt.default.subscribeEventGroup(v.EventGroup.GROUP_INFO_CHANGED, (e => {
                        if (null != e && e.length)
                            for (let t = 0; t < e.length; t++) this.onLoadGroupSetting(e[t])
                    })), us.default.subscribe(bt.a.CHILD_WINDOW_ALIVE, (e => {
                        null != e && e.windowId && this.onLoadSetting(e.windowId)
                    })), We.default.subscribe(((e, t) => {
                        switch (e) {
                            case qe.FetchActions.UPDATE_GROUP_SETTING: {
                                var s, i;
                                const e = null != t && null !== (s = t.data) && void 0 !== s && null !== (i = s.groupId) && void 0 !== i && i.startsWith("g") ? t.data.groupId : "g" + t.data.groupId;
                                e && this.onLoadGroupSetting(e);
                                break
                            }
                        }
                    }))
                }
                _checkGroupAdmin(e) {
                    var t;
                    return this.me || (this.me = tt.default.getUidMe()), (null == e || null === (t = e.topMember) || void 0 === t ? void 0 : t.filter((e => e.id === this.me && e.isAdmin)).length) > 0
                }
                onLoadGroupSetting(e) {
                    return new Promise(((t, s) => {
                        Dt.default.getFullInfoGroupById(e).then((s => {
                            if (!s) return this.Logger.zsymb(18, 8953, 3e4, "[GroupSetting]: Load GroupInfo from manager faily " + s + ", GroupId: " + e), t(null);
                            const i = s.setting,
                                n = s.creatorId,
                                a = this._checkGroupAdmin(s),
                                r = this._onUpdateSettings(e, n, a, i);
                            i && !i.hasOwnProperty("lockSendMsg") && this.Logger.zsymb(18, 8953, 30001, "[GroupSetting]: Dont have field lockSendMsg in setting data"), t(r)
                        })).catch((s => {
                            this.Logger.zsymb(18, 8953, 30002, "[GroupSetting]: Have error in loadiing GroupInfo from manager: " + JSON.stringify(s) + ", GroupId: " + e), t(null)
                        }))
                    }))
                }
                async onLoadSetting(e) {
                    return e.startsWith("g") ? 1 !== He.default.only_admin_chat_setting.enable_only_admin_chat_setting ? null : await this.onLoadGroupSetting(e) : null
                }
                init(e) {
                    throw new Error("Method not  .")
                }
                getCurrentItem(e) {
                    return this.settings.get(e)
                }
                getItem(e, t) {
                    return this.settings.get(e.key)
                }
                getList(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetItemFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                onGetListFailure(e, t) {
                    throw new Error("Method not implemented.")
                }
                getDefaultItem() {
                    throw new Error("Method not implemented.")
                }
                getDefaultList() {
                    throw new Error("Method not implemented.")
                }
            }) || uo) || uo);
            var go = s("+eUS"),
                mo = s("wH4e");
            const po = "render" !== __ZaBUNDLENAME__ && "WEB" !== __ZaBUNDLENAME__ && "shared-worker" !== __ZaBUNDLENAME__ && "main" !== __ZaBUNDLENAME__;
            setTimeout((async function () {
                if (po) return;
                const e = l.ModuleContainer.resolve(j.ZLoggerFactory).createZLogger("bootstrap", ["shared"]);
                e.zsymb(3, 8152, 3e4, "running application bootstrap");
                try {
                    const t = l.ModuleContainer.resolve(O.a);
                    await t.start();
                    let s = (() => {
                        switch (__ZaBUNDLENAME__) {
                            case "WEB":
                                return mo.RunMode.Browser;
                            case "render":
                                return mo.RunMode.Host;
                            case "shared-worker":
                                return mo.RunMode.Client;
                            case "main":
                                return mo.RunMode.Background;
                            default:
                                return mo.RunMode.Unknown
                        }
                    })();
                    Object(go.a)(s), s === mo.RunMode.Browser && function () {
                        const e = Object(m.a)();
                        g.a.includes(e) || l.ModuleContainer.resolve(se).setupWriters()
                    }(), "shared-worker" === __ZaBUNDLENAME__ && await t.init(), e.zsymb(3, 8152, 30001, "application bootstrap success")
                } catch (t) {
                    e.zsymb(0, 8152, 30002, (() => ["application bootstrap fail", {
                        reason: t
                    }]))
                }
            }), 0)
        },
        rhBN: function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("UK4g"),
                r = s("YEoC"),
                o = s("DI/x"),
                l = s("tHMN"),
                d = s("LzQZ");
            let c = n.ModuleContainer.injectable()(i = function (e, t) {
                return n.ModuleContainer.inject(l.b)(e, void 0, 0)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === l.b ? Object : l.b])(i = class {
                constructor(e) {
                    this.engine = e, this.currentId = 1, this.transactions = void 0, this.transactions = new Map
                }
                get(e) {
                    const t = this.transactions.get(e);
                    if (!t) throw new o.h("The transaction has already committed!");
                    return t
                }
                async beginTransaction(e, t, s) {
                    const i = this.currentId++,
                        n = new Error,
                        o = await this.engine.do({
                            type: r.d.BeginTransaction,
                            database: e,
                            table: t[0],
                            transaction: i,
                            priority: r.c.BLOCKING,
                            retry: a.i,
                            timing: {},
                            meta: {
                                step: -1,
                                timeout: a.k,
                                error: n
                            },
                            params: {
                                tables: t,
                                mode: s
                            },
                            trace: () => {}
                        });
                    return this.transactions.set(i, o), o
                }
                commitTransaction(e) {
                    const t = this.transactions.get(e);
                    return !t || t.closed ? (t && this.transactions.delete(e), Promise.resolve()) : new Promise(((s, i) => {
                        t.onClose((() => {
                            this.transactions.delete(e), t.error ? i(t.error) : s()
                        }))
                    }))
                }
                waitUntilIdle() {
                    if (0 === this.transactions.size) return Promise.resolve();
                    const e = Array.from(this.transactions.values());
                    return new Promise((t => {
                        e.forEach((s => {
                            s.onClose((() => {
                                e.every((e => e.closed)) && t()
                            }))
                        }))
                    }))
                }
            }) || i) || i) || i) || i;
            n.ModuleContainer.registerSingleton(d.a, c)
        },
        wKPd: function (e, t, s) {
            "use strict";
            var i, n = s("jDHv"),
                a = s("Mgpg"),
                r = s("YEoC"),
                o = s("x9oK"),
                l = s("0slR");
            let d = Object(n.injectable)()(i = function (e, t) {
                return Object(n.inject)(a.ZLoggerFactory)(e, void 0, 0)
            }(i = Reflect.metadata("design:type", Function)(i = Reflect.metadata("design:paramtypes", [void 0 === a.ZLoggerFactory ? Object : a.ZLoggerFactory])(i = class {
                constructor(e) {
                    this.configFactory = void 0, this.logger = void 0, this.logger = e.createZLogger("db", ["adapter-builder"])
                }
                install(e) {
                    this.configFactory = e
                }
                computeDatabaseConfig(e, t) {
                    return this.configFactory(e, t)
                }
                computeDatabaseName(e, t, s) {
                    var i;
                    const n = null !== (i = null == s ? void 0 : s.userId) && void 0 !== i ? i : "";
                    return e.computeDatabaseName(n, t)
                }
                computePartitionConfig(e, t, s) {
                    return e.getPartition(t, s)
                }
                computeTableConfig(e, t, s) {
                    const i = e.getTableConfig(t);
                    return i && (i.dbName = s), i
                }
                computePartitionKeyFromEntityValue(e, t) {
                    const s = e.partitionField;
                    if (void 0 !== s) return t[s]
                }
                computePartitionKeyFromEntityKey(e, t, s) {
                    void 0 === s && (s = "primary");
                    const i = e.partitionField;
                    if (void 0 !== i) return e.getIndex(s).getValue(t, i)
                }
                async computeDatabaseAdapter(e, t) {
                    const s = {
                        database: e,
                        version: t.version,
                        type: t.type
                    };
                    this.logger.zsymb(0, 8168, 3e4, (() => ["creating", s]));
                    const i = this.getAdapterFactoryToken(t.type),
                        a = n.ModuleContainer.resolve(i),
                        r = await a.createAdapter(e, t);
                    return this.logger.zsymb(0, 8168, 30001, (() => ["create success", s])), r
                }
                getAdapterFactoryToken(e) {
                    let t = o.b;
                    if (e === r.a.SQLite) t = o.c;
                    return t
                }
            }) || i) || i) || i) || i;
            n.ModuleContainer.registerSingleton(l.a, d)
        }
    }
]);
//# sourceMappingURL=../sourcemaps/lazy/web-startup.7367cabc8ac3dad7a7d5.js.map