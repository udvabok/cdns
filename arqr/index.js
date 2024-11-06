(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) n(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const r of l.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function n(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = s(i);
    fetch(i.href, l);
  }
})();
const k = (e, t) => e === t,
  M = { equals: k };
let Y = K;
const S = 1,
  R = 2,
  G = { owned: null, cleanups: null, context: null, owner: null };
var h = null;
let U = null,
  z = null,
  a = null,
  d = null,
  b = null,
  _ = 0;
function ee(e, t) {
  const s = a,
    n = h,
    i = e.length === 0,
    l = t === void 0 ? n : t,
    r = i
      ? G
      : {
          owned: null,
          cleanups: null,
          context: l ? l.context : null,
          owner: l,
        },
    o = i ? e : () => e(() => O(() => T(r)));
  (h = r), (a = null);
  try {
    return L(o, !0);
  } finally {
    (a = s), (h = n);
  }
}
function te(e, t) {
  t = t ? Object.assign({}, M, t) : M;
  const s = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    n = (i) => (typeof i == "function" && (i = i(s.value)), H(s, i));
  return [ie.bind(s), n];
}
function q(e, t, s) {
  const n = X(e, t, !1, S);
  $(n);
}
function se(e, t, s) {
  Y = re;
  const n = X(e, t, !1, S);
  (n.user = !0), b ? b.push(n) : $(n);
}
function O(e) {
  if (a === null) return e();
  const t = a;
  a = null;
  try {
    return e();
  } finally {
    a = t;
  }
}
function W(e) {
  se(() => O(e));
}
function ne(e) {
  return (
    h === null ||
      (h.cleanups === null ? (h.cleanups = [e]) : h.cleanups.push(e)),
    e
  );
}
function ie() {
  if (this.sources && this.state)
    if (this.state === S) $(this);
    else {
      const e = d;
      (d = null), L(() => P(this), !1), (d = e);
    }
  if (a) {
    const e = this.observers ? this.observers.length : 0;
    a.sources
      ? (a.sources.push(this), a.sourceSlots.push(e))
      : ((a.sources = [this]), (a.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(a),
          this.observerSlots.push(a.sources.length - 1))
        : ((this.observers = [a]),
          (this.observerSlots = [a.sources.length - 1]));
  }
  return this.value;
}
function H(e, t, s) {
  let n = e.value;
  return (
    (!e.comparator || !e.comparator(n, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        L(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const l = e.observers[i],
              r = U && U.running;
            r && U.disposed.has(l),
              (r ? !l.tState : !l.state) &&
                (l.pure ? d.push(l) : b.push(l), l.observers && Q(l)),
              r || (l.state = S);
          }
          if (d.length > 1e6) throw ((d = []), new Error());
        }, !1)),
    t
  );
}
function $(e) {
  if (!e.fn) return;
  T(e);
  const t = _;
  oe(e, e.value, t);
}
function oe(e, t, s) {
  let n;
  const i = h,
    l = a;
  a = h = e;
  try {
    n = e.fn(t);
  } catch (r) {
    return (
      e.pure &&
        ((e.state = S), e.owned && e.owned.forEach(T), (e.owned = null)),
      (e.updatedAt = s + 1),
      J(r)
    );
  } finally {
    (a = l), (h = i);
  }
  (!e.updatedAt || e.updatedAt <= s) &&
    (e.updatedAt != null && "observers" in e ? H(e, n) : (e.value = n),
    (e.updatedAt = s));
}
function X(e, t, s, n = S, i) {
  const l = {
    fn: e,
    state: n,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: h,
    context: h ? h.context : null,
    pure: s,
  };
  return (
    h === null || (h !== G && (h.owned ? h.owned.push(l) : (h.owned = [l]))), l
  );
}
function B(e) {
  if (e.state === 0) return;
  if (e.state === R) return P(e);
  if (e.suspense && O(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < _); )
    e.state && t.push(e);
  for (let s = t.length - 1; s >= 0; s--)
    if (((e = t[s]), e.state === S)) $(e);
    else if (e.state === R) {
      const n = d;
      (d = null), L(() => P(e, t[0]), !1), (d = n);
    }
}
function L(e, t) {
  if (d) return e();
  let s = !1;
  t || (d = []), b ? (s = !0) : (b = []), _++;
  try {
    const n = e();
    return le(s), n;
  } catch (n) {
    s || (b = null), (d = null), J(n);
  }
}
function le(e) {
  if ((d && (K(d), (d = null)), e)) return;
  const t = b;
  (b = null), t.length && L(() => Y(t), !1);
}
function K(e) {
  for (let t = 0; t < e.length; t++) B(e[t]);
}
function re(e) {
  let t,
    s = 0;
  for (t = 0; t < e.length; t++) {
    const n = e[t];
    n.user ? (e[s++] = n) : B(n);
  }
  for (t = 0; t < s; t++) B(e[t]);
}
function P(e, t) {
  e.state = 0;
  for (let s = 0; s < e.sources.length; s += 1) {
    const n = e.sources[s];
    if (n.sources) {
      const i = n.state;
      i === S
        ? n !== t && (!n.updatedAt || n.updatedAt < _) && B(n)
        : i === R && P(n, t);
    }
  }
}
function Q(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const s = e.observers[t];
    s.state ||
      ((s.state = R), s.pure ? d.push(s) : b.push(s), s.observers && Q(s));
  }
}
function T(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const s = e.sources.pop(),
        n = e.sourceSlots.pop(),
        i = s.observers;
      if (i && i.length) {
        const l = i.pop(),
          r = s.observerSlots.pop();
        n < i.length &&
          ((l.sourceSlots[r] = n), (i[n] = l), (s.observerSlots[n] = r));
      }
    }
  if (e.tOwned) {
    for (t = e.tOwned.length - 1; t >= 0; t--) T(e.tOwned[t]);
    delete e.tOwned;
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) T(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function fe(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function J(e, t = h) {
  throw fe(e);
}
function ue(e, t) {
  return O(() => e(t || {}));
}
function ce(e, t, s) {
  let n = s.length,
    i = t.length,
    l = n,
    r = 0,
    o = 0,
    f = t[i - 1].nextSibling,
    c = null;
  for (; r < i || o < l; ) {
    if (t[r] === s[o]) {
      r++, o++;
      continue;
    }
    for (; t[i - 1] === s[l - 1]; ) i--, l--;
    if (i === r) {
      const u = l < n ? (o ? s[o - 1].nextSibling : s[l - o]) : f;
      for (; o < l; ) e.insertBefore(s[o++], u);
    } else if (l === o)
      for (; r < i; ) (!c || !c.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === s[l - 1] && s[o] === t[i - 1]) {
      const u = t[--i].nextSibling;
      e.insertBefore(s[o++], t[r++].nextSibling),
        e.insertBefore(s[--l], u),
        (t[i] = s[l]);
    } else {
      if (!c) {
        c = new Map();
        let m = o;
        for (; m < l; ) c.set(s[m], m++);
      }
      const u = c.get(t[r]);
      if (u != null)
        if (o < u && u < l) {
          let m = r,
            v = 1,
            g;
          for (
            ;
            ++m < i && m < l && !((g = c.get(t[m])) == null || g !== u + v);

          )
            v++;
          if (v > u - o) {
            const p = t[r];
            for (; o < u; ) e.insertBefore(s[o++], p);
          } else e.replaceChild(s[o++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
function ae(e, t, s, n = {}) {
  let i;
  return (
    ee((l) => {
      (i = l),
        t === document ? e() : N(t, e(), t.firstChild ? null : void 0, s);
    }, n.owner),
    () => {
      i(), (t.textContent = "");
    }
  );
}
function Z(e, t, s) {
  let n;
  const i = () => {
      const r = document.createElement("template");
      return (r.innerHTML = e), r.content.firstChild;
    },
    l = () => (n || (n = i())).cloneNode(!0);
  return (l.cloneNode = l), l;
}
function j(e, t, s) {
  return O(() => e(t, s));
}
function N(e, t, s, n) {
  if ((s !== void 0 && !n && (n = []), typeof t != "function"))
    return F(e, t, n, s);
  q((i) => F(e, t(), i, s), n);
}
function F(e, t, s, n, i) {
  for (; typeof s == "function"; ) s = s();
  if (t === s) return s;
  const l = typeof t,
    r = n !== void 0;
  if (
    ((e = (r && s[0] && s[0].parentNode) || e),
    l === "string" || l === "number")
  ) {
    if (l === "number" && ((t = t.toString()), t === s)) return s;
    if (r) {
      let o = s[0];
      o && o.nodeType === 3
        ? o.data !== t && (o.data = t)
        : (o = document.createTextNode(t)),
        (s = E(e, s, n, o));
    } else
      s !== "" && typeof s == "string"
        ? (s = e.firstChild.data = t)
        : (s = e.textContent = t);
  } else if (t == null || l === "boolean") s = E(e, s, n);
  else {
    if (l === "function")
      return (
        q(() => {
          let o = t();
          for (; typeof o == "function"; ) o = o();
          s = F(e, o, s, n);
        }),
        () => s
      );
    if (Array.isArray(t)) {
      const o = [],
        f = s && Array.isArray(s);
      if (I(o, t, s, i)) return q(() => (s = F(e, o, s, n, !0))), () => s;
      if (o.length === 0) {
        if (((s = E(e, s, n)), r)) return s;
      } else
        f ? (s.length === 0 ? V(e, o, n) : ce(e, s, o)) : (s && E(e), V(e, o));
      s = o;
    } else if (t.nodeType) {
      if (Array.isArray(s)) {
        if (r) return (s = E(e, s, n, t));
        E(e, s, null, t);
      } else
        s == null || s === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      s = t;
    }
  }
  return s;
}
function I(e, t, s, n) {
  let i = !1;
  for (let l = 0, r = t.length; l < r; l++) {
    let o = t[l],
      f = s && s[e.length],
      c;
    if (!(o == null || o === !0 || o === !1))
      if ((c = typeof o) == "object" && o.nodeType) e.push(o);
      else if (Array.isArray(o)) i = I(e, o, f) || i;
      else if (c === "function")
        if (n) {
          for (; typeof o == "function"; ) o = o();
          i = I(e, Array.isArray(o) ? o : [o], Array.isArray(f) ? f : [f]) || i;
        } else e.push(o), (i = !0);
      else {
        const u = String(o);
        f && f.nodeType === 3 && f.data === u
          ? e.push(f)
          : e.push(document.createTextNode(u));
      }
  }
  return i;
}
function V(e, t, s = null) {
  for (let n = 0, i = t.length; n < i; n++) e.insertBefore(t[n], s);
}
function E(e, t, s, n) {
  if (s === void 0) return (e.textContent = "");
  const i = n || document.createTextNode("");
  if (t.length) {
    let l = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const o = t[r];
      if (i !== o) {
        const f = o.parentNode === e;
        !l && !r
          ? f
            ? e.replaceChild(i, o)
            : e.insertBefore(i, s)
          : f && o.remove();
      } else l = !0;
    }
  } else e.insertBefore(i, s);
  return [i];
}
var he = Z(
    "<div class=scanner><video autoplay muted playsinline></video><canvas></canvas><div><h4>Detected Codes:</h4><ul>"
  ),
  de = Z("<li> : ");
const D = new Worker(
    new URL("/gh/udvabok/cdns/arqr/barcodeWorker-Cs3c6Y-B.js", import.meta.url),
    { type: "module" }
  ),
  pe = () => {
    const [e, t] = te([]);
    let s = null,
      n = null;
    const i = async (o) => {
        if (!s || !n) return;
        const f = n.getContext("2d", { willReadFrequently: !0 });
        if (!f) return;
        const c = 0,
          u = 0;
        o.forEach((m) => {
          const { position: v } = m;
          if (v) {
            const {
                topLeft: g,
                topRight: p,
                bottomLeft: C,
                bottomRight: A,
              } = v,
              y = 1,
              w = 1,
              x = 5;
            (f.fillStyle = "rgba(255, 0, 0, 0.3)"),
              f.beginPath(),
              f.moveTo(g.x * y + c + x, g.y * w + u),
              f.lineTo(p.x * y + c - x, p.y * w + u),
              f.quadraticCurveTo(
                p.x * y + c,
                p.y * w + u,
                p.x * y + c,
                p.y * w + u + x
              ),
              f.lineTo(A.x * y + c, A.y * w + u - x),
              f.quadraticCurveTo(
                A.x * y + c,
                A.y * w + u,
                A.x * y + c - x,
                A.y * w + u
              ),
              f.lineTo(C.x * y + c + x, C.y * w + u),
              f.quadraticCurveTo(
                C.x * y + c,
                C.y * w + u,
                C.x * y + c,
                C.y * w + u - x
              ),
              f.closePath(),
              f.fill(),
              f.save(),
              (f.lineWidth = 4),
              (f.strokeStyle = "rgba(50, 212, 21, 0.7)"),
              (f.shadowColor = "rgba(21, 255, 0, 0.5)"),
              (f.shadowBlur = 30),
              f.beginPath(),
              f.moveTo(g.x * y + c + x, g.y * w + u),
              f.lineTo(p.x * y + c - x, p.y * w + u),
              f.closePath(),
              f.stroke(),
              f.restore();
          }
        });
      },
      l = async () => {
        if (!s || !n) {
          requestAnimationFrame(l), console.log("!videoRef || !canvasRef");
          return;
        }
        const o = n.getContext("2d");
        if (!o) return;
        o.drawImage(s, 0, 0, n.width, n.height);
        const f = o.getImageData(0, 0, n.width, n.height);
        i(e()), D.postMessage({ imageData: f });
      };
    W(() => {
      D.onmessage = (o) => {
        t(o.data.results), i(o.data.results), requestAnimationFrame(l);
      };
    });
    const r = async () => {
      try {
        const o = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        s &&
          ((s.srcObject = o),
          s.play(),
          (s.onloadedmetadata = () => {
            (n.width = s.videoWidth), (n.height = s.videoHeight), l();
          }));
      } catch (o) {
        console.error("Error accessing webcam:", o);
      }
    };
    return (
      W(() => {
        r();
      }),
      ne(() => {
        D.terminate();
      }),
      (() => {
        var o = he(),
          f = o.firstChild,
          c = f.nextSibling,
          u = c.nextSibling,
          m = u.firstChild,
          v = m.nextSibling;
        return (
          j((g) => (s = g), f),
          f.style.setProperty("display", "none"),
          j((g) => (n = g), c),
          N(v, () =>
            e().map((g) =>
              (() => {
                var p = de(),
                  C = p.firstChild;
                return N(p, () => g.format, C), N(p, () => g.text, null), p;
              })()
            )
          ),
          o
        );
      })()
    );
  },
  ge = document.getElementById("root");
ae(() => ue(pe, {}), ge);
