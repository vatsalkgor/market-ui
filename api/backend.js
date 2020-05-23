!(function (e) {
  var r = {};
  function t(n) {
    if (r[n]) return r[n].exports;
    var o = (r[n] = { i: n, l: !1, exports: {} });
    return e[n].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = e),
    (t.c = r),
    (t.d = function (e, r, n) {
      t.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: n });
    }),
    (t.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (t.t = function (e, r) {
      if ((1 & r && (e = t(e)), 8 & r)) return e;
      if (4 & r && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (t.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & r && "string" != typeof e)
      )
        for (var o in e)
          t.d(
            n,
            o,
            function (r) {
              return e[r];
            }.bind(null, o)
          );
      return n;
    }),
    (t.n = function (e) {
      var r =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(r, "a", r), r;
    }),
    (t.o = function (e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (t.p = ""),
    t((t.s = 2));
})([
  function (e, r) {
    e.exports = require("express");
  },
  function (e, r, t) {
    const n = t(8);
    e.exports = new n("customeronly1.database", { verbose: console.log });
  },
  function (e, r, t) {
    const n = t(0),
      o = t(3),
      s = n(),
      u = t(4),
      i = t(5),
      c = t(6);
    s.use(
      u({
        secret: "keyboard cat",
        resave: !1,
        saveUninitialized: !1,
        cookie: { maxAge: 36e5 },
      })
    ),
      s.use(o()),
      s.use(i.urlencoded({ extended: !1 })),
      s.use(i.json()),
      s.use("/", c),
      s.listen(4567, () => {
        console.log("server started");
      });
  },
  function (e, r) {
    e.exports = require("cors");
  },
  function (e, r) {
    e.exports = require("express-session");
  },
  function (e, r) {
    e.exports = require("body-parser");
  },
  function (e, r, t) {
    const n = t(0).Router(),
      o = t(7),
      s = t(1);
    n.post("/", (e, r, t) => {
      if (e.session.username)
        return r.json({ status: 2, msg: "already logged in" });
      t();
    }),
      n.post("/", (e, r) => {
        const t = s
          .prepare("select username from login where username=? and password=?")
          .get(e.body.username, e.body.password);
        return (
          console.log(t),
          t
            ? ((e.session.username = t.username),
              r.json({ status: 1, msg: "correct" }))
            : r.json({ status: 0, msg: "incorrect" })
        );
      }),
      n.use(o),
      (e.exports = n);
  },
  function (e, r, t) {
    const n = t(0).Router();
    t(1);
    n.post("/create/party/add", (e, r) => {
      r.json({ msg: "hi" });
    }),
      (e.exports = n);
  },
  function (e, r) {
    e.exports = require("better-sqlite3");
  },
]);
