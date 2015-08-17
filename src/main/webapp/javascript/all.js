/**
 * Created by darlingtld on 2015/7/5 0005.
 */
/* Zepto v1.1.3 - zepto event ajax form ie - zeptojs.com/license */
var Zepto = function () {
    function L(t) {
        return null == t ? String(t) : j[T.call(t)] || "object"
    }

    function Z(t) {
        return "function" == L(t)
    }

    function $(t) {
        return null != t && t == t.window
    }

    function _(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
    }

    function D(t) {
        return "object" == L(t)
    }

    function R(t) {
        return D(t) && !$(t) && Object.getPrototypeOf(t) == Object.prototype
    }

    function M(t) {
        return "number" == typeof t.length
    }

    function k(t) {
        return s.call(t, function (t) {
            return null != t
        })
    }

    function z(t) {
        return t.length > 0 ? n.fn.concat.apply([], t) : t
    }

    function F(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }

    function q(t) {
        return t in f ? f[t] : f[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }

    function H(t, e) {
        return "number" != typeof e || c[F(t)] ? e : e + "px"
    }

    function I(t) {
        var e, n;
        return u[t] || (e = a.createElement(t), a.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), u[t] = n), u[t]
    }

    function V(t) {
        return "children"in t ? o.call(t.children) : n.map(t.childNodes, function (t) {
            return 1 == t.nodeType ? t : void 0
        })
    }

    function U(n, i, r) {
        for (e in i)r && (R(i[e]) || A(i[e])) ? (R(i[e]) && !R(n[e]) && (n[e] = {}), A(i[e]) && !A(n[e]) && (n[e] = []), U(n[e], i[e], r)) : i[e] !== t && (n[e] = i[e])
    }

    function B(t, e) {
        return null == e ? n(t) : n(t).filter(e)
    }

    function J(t, e, n, i) {
        return Z(e) ? e.call(t, n, i) : e
    }

    function X(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
    }

    function W(e, n) {
        var i = e.className, r = i && i.baseVal !== t;
        return n === t ? r ? i.baseVal : i : void(r ? i.baseVal = n : e.className = n)
    }

    function Y(t) {
        var e;
        try {
            return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? n.parseJSON(t) : t : e) : t
        } catch (i) {
            return t
        }
    }

    function G(t, e) {
        e(t);
        for (var n in t.childNodes)G(t.childNodes[n], e)
    }

    var t, e, n, i, C, N, r = [], o = r.slice, s = r.filter, a = window.document, u = {}, f = {}, c = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    }, l = /^\s*<(\w+|!)[^>]*>/, h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, d = /^(?:body|html)$/i, m = /([A-Z])/g, g = ["val", "css", "html", "text", "data", "width", "height", "offset"], v = ["after", "prepend", "before", "append"], y = a.createElement("table"), x = a.createElement("tr"), b = {
        tr: a.createElement("tbody"),
        tbody: y,
        thead: y,
        tfoot: y,
        td: x,
        th: x,
        "*": a.createElement("div")
    }, w = /complete|loaded|interactive/, E = /^[\w-]*$/, j = {}, T = j.toString, S = {}, O = a.createElement("div"), P = {
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    }, A = Array.isArray || function (t) {
            return t instanceof Array
        };
    return S.matches = function (t, e) {
        if (!e || !t || 1 !== t.nodeType)return !1;
        var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n)return n.call(t, e);
        var i, r = t.parentNode, o = !r;
        return o && (r = O).appendChild(t), i = ~S.qsa(r, e).indexOf(t), o && O.removeChild(t), i
    }, C = function (t) {
        return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : ""
        })
    }, N = function (t) {
        return s.call(t, function (e, n) {
            return t.indexOf(e) == n
        })
    }, S.fragment = function (e, i, r) {
        var s, u, f;
        return h.test(e) && (s = n(a.createElement(RegExp.$1))), s || (e.replace && (e = e.replace(p, "<$1></$2>")), i === t && (i = l.test(e) && RegExp.$1), i in b || (i = "*"), f = b[i], f.innerHTML = "" + e, s = n.each(o.call(f.childNodes), function () {
            f.removeChild(this)
        })), R(r) && (u = n(s), n.each(r, function (t, e) {
            g.indexOf(t) > -1 ? u[t](e) : u.attr(t, e)
        })), s
    }, S.Z = function (t, e) {
        return t = t || [], t.__proto__ = n.fn, t.selector = e || "", t
    }, S.isZ = function (t) {
        return t instanceof S.Z
    }, S.init = function (e, i) {
        var r;
        if (!e)return S.Z();
        if ("string" == typeof e)if (e = e.trim(), "<" == e[0] && l.test(e))r = S.fragment(e, RegExp.$1, i), e = null; else {
            if (i !== t)return n(i).find(e);
            r = S.qsa(a, e)
        } else {
            if (Z(e))return n(a).ready(e);
            if (S.isZ(e))return e;
            if (A(e))r = k(e); else if (D(e))r = [e], e = null; else if (l.test(e))r = S.fragment(e.trim(), RegExp.$1, i), e = null; else {
                if (i !== t)return n(i).find(e);
                r = S.qsa(a, e)
            }
        }
        return S.Z(r, e)
    }, n = function (t, e) {
        return S.init(t, e)
    }, n.extend = function (t) {
        var e, n = o.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function (n) {
            U(t, n, e)
        }), t
    }, S.qsa = function (t, e) {
        var n, i = "#" == e[0], r = !i && "." == e[0], s = i || r ? e.slice(1) : e, a = E.test(s);
        return _(t) && a && i ? (n = t.getElementById(s)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : o.call(a && !i ? r ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e))
    }, n.contains = function (t, e) {
        return t !== e && t.contains(e)
    }, n.type = L, n.isFunction = Z, n.isWindow = $, n.isArray = A, n.isPlainObject = R, n.isEmptyObject = function (t) {
        var e;
        for (e in t)return !1;
        return !0
    }, n.inArray = function (t, e, n) {
        return r.indexOf.call(e, t, n)
    }, n.camelCase = C, n.trim = function (t) {
        return null == t ? "" : String.prototype.trim.call(t)
    }, n.uuid = 0, n.support = {}, n.expr = {}, n.map = function (t, e) {
        var n, r, o, i = [];
        if (M(t))for (r = 0; r < t.length; r++)n = e(t[r], r), null != n && i.push(n); else for (o in t)n = e(t[o], o), null != n && i.push(n);
        return z(i)
    }, n.each = function (t, e) {
        var n, i;
        if (M(t)) {
            for (n = 0; n < t.length; n++)if (e.call(t[n], n, t[n]) === !1)return t
        } else for (i in t)if (e.call(t[i], i, t[i]) === !1)return t;
        return t
    }, n.grep = function (t, e) {
        return s.call(t, e)
    }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
        j["[object " + e + "]"] = e.toLowerCase()
    }), n.fn = {
        forEach: r.forEach,
        reduce: r.reduce,
        push: r.push,
        sort: r.sort,
        indexOf: r.indexOf,
        concat: r.concat,
        map: function (t) {
            return n(n.map(this, function (e, n) {
                return t.call(e, n, e)
            }))
        },
        slice: function () {
            return n(o.apply(this, arguments))
        },
        ready: function (t) {
            return w.test(a.readyState) && a.body ? t(n) : a.addEventListener("DOMContentLoaded", function () {
                t(n)
            }, !1), this
        },
        get: function (e) {
            return e === t ? o.call(this) : this[e >= 0 ? e : e + this.length]
        },
        toArray: function () {
            return this.get()
        },
        size: function () {
            return this.length
        },
        remove: function () {
            return this.each(function () {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function (t) {
            return r.every.call(this, function (e, n) {
                return t.call(e, n, e) !== !1
            }), this
        },
        filter: function (t) {
            return Z(t) ? this.not(this.not(t)) : n(s.call(this, function (e) {
                return S.matches(e, t)
            }))
        },
        add: function (t, e) {
            return n(N(this.concat(n(t, e))))
        },
        is: function (t) {
            return this.length > 0 && S.matches(this[0], t)
        },
        not: function (e) {
            var i = [];
            if (Z(e) && e.call !== t)this.each(function (t) {
                e.call(this, t) || i.push(this)
            }); else {
                var r = "string" == typeof e ? this.filter(e) : M(e) && Z(e.item) ? o.call(e) : n(e);
                this.forEach(function (t) {
                    r.indexOf(t) < 0 && i.push(t)
                })
            }
            return n(i)
        },
        has: function (t) {
            return this.filter(function () {
                return D(t) ? n.contains(this, t) : n(this).find(t).size()
            })
        },
        eq: function (t) {
            return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function () {
            var t = this[0];
            return t && !D(t) ? t : n(t)
        },
        last: function () {
            var t = this[this.length - 1];
            return t && !D(t) ? t : n(t)
        },
        find: function (t) {
            var e, i = this;
            return e = "object" == typeof t ? n(t).filter(function () {
                var t = this;
                return r.some.call(i, function (e) {
                    return n.contains(e, t)
                })
            }) : 1 == this.length ? n(S.qsa(this[0], t)) : this.map(function () {
                return S.qsa(this, t)
            })
        },
        closest: function (t, e) {
            var i = this[0], r = !1;
            for ("object" == typeof t && (r = n(t)); i && !(r ? r.indexOf(i) >= 0 : S.matches(i, t));)i = i !== e && !_(i) && i.parentNode;
            return n(i)
        },
        parents: function (t) {
            for (var e = [], i = this; i.length > 0;)i = n.map(i, function (t) {
                return (t = t.parentNode) && !_(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return B(e, t)
        },
        parent: function (t) {
            return B(N(this.pluck("parentNode")), t)
        },
        children: function (t) {
            return B(this.map(function () {
                return V(this)
            }), t)
        },
        contents: function () {
            return this.map(function () {
                return o.call(this.childNodes)
            })
        },
        siblings: function (t) {
            return B(this.map(function (t, e) {
                return s.call(V(e.parentNode), function (t) {
                    return t !== e
                })
            }), t)
        },
        empty: function () {
            return this.each(function () {
                this.innerHTML = ""
            })
        },
        pluck: function (t) {
            return n.map(this, function (e) {
                return e[t]
            })
        },
        show: function () {
            return this.each(function () {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = I(this.nodeName))
            })
        },
        replaceWith: function (t) {
            return this.before(t).remove()
        },
        wrap: function (t) {
            var e = Z(t);
            if (this[0] && !e)var i = n(t).get(0), r = i.parentNode || this.length > 1;
            return this.each(function (o) {
                n(this).wrapAll(e ? t.call(this, o) : r ? i.cloneNode(!0) : i)
            })
        },
        wrapAll: function (t) {
            if (this[0]) {
                n(this[0]).before(t = n(t));
                for (var e; (e = t.children()).length;)t = e.first();
                n(t).append(this)
            }
            return this
        },
        wrapInner: function (t) {
            var e = Z(t);
            return this.each(function (i) {
                var r = n(this), o = r.contents(), s = e ? t.call(this, i) : t;
                o.length ? o.wrapAll(s) : r.append(s)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                n(this).replaceWith(n(this).children())
            }), this
        },
        clone: function () {
            return this.map(function () {
                return this.cloneNode(!0)
            })
        },
        hide: function () {
            return this.css("display", "none")
        },
        toggle: function (e) {
            return this.each(function () {
                var i = n(this);
                (e === t ? "none" == i.css("display") : e) ? i.show() : i.hide()
            })
        },
        prev: function (t) {
            return n(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function (t) {
            return n(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function (t) {
            return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function (e) {
                var i = this.innerHTML;
                n(this).empty().append(J(this, t, e, i))
            })
        },
        text: function (e) {
            return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function () {
                this.textContent = e === t ? "" : "" + e
            })
        },
        attr: function (n, i) {
            var r;
            return "string" == typeof n && i === t ? 0 == this.length || 1 !== this[0].nodeType ? t : "value" == n && "INPUT" == this[0].nodeName ? this.val() : !(r = this[0].getAttribute(n)) && n in this[0] ? this[0][n] : r : this.each(function (t) {
                if (1 === this.nodeType)if (D(n))for (e in n)X(this, e, n[e]); else X(this, n, J(this, i, t, this.getAttribute(n)))
            })
        },
        removeAttr: function (t) {
            return this.each(function () {
                1 === this.nodeType && X(this, t)
            })
        },
        prop: function (e, n) {
            return e = P[e] || e, n === t ? this[0] && this[0][e] : this.each(function (t) {
                this[e] = J(this, n, t, this[e])
            })
        },
        data: function (e, n) {
            var i = this.attr("data-" + e.replace(m, "-$1").toLowerCase(), n);
            return null !== i ? Y(i) : t
        },
        val: function (t) {
            return 0 === arguments.length ? this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
                return this.selected
            }).pluck("value") : this[0].value) : this.each(function (e) {
                this.value = J(this, t, e, this.value)
            })
        },
        offset: function (t) {
            if (t)return this.each(function (e) {
                var i = n(this), r = J(this, t, e, i.offset()), o = i.offsetParent().offset(), s = {
                    top: r.top - o.top,
                    left: r.left - o.left
                };
                "static" == i.css("position") && (s.position = "relative"), i.css(s)
            });
            if (0 == this.length)return null;
            var e = this[0].getBoundingClientRect();
            return {
                left: e.left + window.pageXOffset,
                top: e.top + window.pageYOffset,
                width: Math.round(e.width),
                height: Math.round(e.height)
            }
        },
        css: function (t, i) {
            if (arguments.length < 2) {
                var r = this[0], o = getComputedStyle(r, "");
                if (!r)return;
                if ("string" == typeof t)return r.style[C(t)] || o.getPropertyValue(t);
                if (A(t)) {
                    var s = {};
                    return n.each(A(t) ? t : [t], function (t, e) {
                        s[e] = r.style[C(e)] || o.getPropertyValue(e)
                    }), s
                }
            }
            var a = "";
            if ("string" == L(t))i || 0 === i ? a = F(t) + ":" + H(t, i) : this.each(function () {
                this.style.removeProperty(F(t))
            }); else for (e in t)t[e] || 0 === t[e] ? a += F(e) + ":" + H(e, t[e]) + ";" : this.each(function () {
                this.style.removeProperty(F(e))
            });
            return this.each(function () {
                this.style.cssText += ";" + a
            })
        },
        index: function (t) {
            return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function (t) {
            return t ? r.some.call(this, function (t) {
                return this.test(W(t))
            }, q(t)) : !1
        },
        addClass: function (t) {
            return t ? this.each(function (e) {
                i = [];
                var r = W(this), o = J(this, t, e, r);
                o.split(/\s+/g).forEach(function (t) {
                    n(this).hasClass(t) || i.push(t)
                }, this), i.length && W(this, r + (r ? " " : "") + i.join(" "))
            }) : this
        },
        removeClass: function (e) {
            return this.each(function (n) {
                return e === t ? W(this, "") : (i = W(this), J(this, e, n, i).split(/\s+/g).forEach(function (t) {
                    i = i.replace(q(t), " ")
                }), void W(this, i.trim()))
            })
        },
        toggleClass: function (e, i) {
            return e ? this.each(function (r) {
                var o = n(this), s = J(this, e, r, W(this));
                s.split(/\s+/g).forEach(function (e) {
                    (i === t ? !o.hasClass(e) : i) ? o.addClass(e) : o.removeClass(e)
                })
            }) : this
        },
        scrollTop: function (e) {
            if (this.length) {
                var n = "scrollTop"in this[0];
                return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
                    this.scrollTop = e
                } : function () {
                    this.scrollTo(this.scrollX, e)
                })
            }
        },
        scrollLeft: function (e) {
            if (this.length) {
                var n = "scrollLeft"in this[0];
                return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
                    this.scrollLeft = e
                } : function () {
                    this.scrollTo(e, this.scrollY)
                })
            }
        },
        position: function () {
            if (this.length) {
                var t = this[0], e = this.offsetParent(), i = this.offset(), r = d.test(e[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : e.offset();
                return i.top -= parseFloat(n(t).css("margin-top")) || 0, i.left -= parseFloat(n(t).css("margin-left")) || 0, r.top += parseFloat(n(e[0]).css("border-top-width")) || 0, r.left += parseFloat(n(e[0]).css("border-left-width")) || 0, {
                    top: i.top - r.top,
                    left: i.left - r.left
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var t = this.offsetParent || a.body; t && !d.test(t.nodeName) && "static" == n(t).css("position");)t = t.offsetParent;
                return t
            })
        }
    }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (e) {
        var i = e.replace(/./, function (t) {
            return t[0].toUpperCase()
        });
        n.fn[e] = function (r) {
            var o, s = this[0];
            return r === t ? $(s) ? s["inner" + i] : _(s) ? s.documentElement["scroll" + i] : (o = this.offset()) && o[e] : this.each(function (t) {
                s = n(this), s.css(e, J(this, r, t, s[e]()))
            })
        }
    }), v.forEach(function (t, e) {
        var i = e % 2;
        n.fn[t] = function () {
            var t, o, r = n.map(arguments, function (e) {
                return t = L(e), "object" == t || "array" == t || null == e ? e : S.fragment(e)
            }), s = this.length > 1;
            return r.length < 1 ? this : this.each(function (t, a) {
                o = i ? a : a.parentNode, a = 0 == e ? a.nextSibling : 1 == e ? a.firstChild : 2 == e ? a : null, r.forEach(function (t) {
                    if (s)t = t.cloneNode(!0); else if (!o)return n(t).remove();
                    G(o.insertBefore(t, a), function (t) {
                        null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                    })
                })
            })
        }, n.fn[i ? t + "To" : "insert" + (e ? "Before" : "After")] = function (e) {
            return n(e)[t](this), this
        }
    }), S.Z.prototype = n.fn, S.uniq = N, S.deserializeValue = Y, n.zepto = S, n
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function (t) {
    function l(t) {
        return t._zid || (t._zid = e++)
    }

    function h(t, e, n, i) {
        if (e = p(e), e.ns)var r = d(e.ns);
        return (s[l(t)] || []).filter(function (t) {
            return !(!t || e.e && t.e != e.e || e.ns && !r.test(t.ns) || n && l(t.fn) !== l(n) || i && t.sel != i)
        })
    }

    function p(t) {
        var e = ("" + t).split(".");
        return {e: e[0], ns: e.slice(1).sort().join(" ")}
    }

    function d(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }

    function m(t, e) {
        return t.del && !u && t.e in f || !!e
    }

    function g(t) {
        return c[t] || u && f[t] || t
    }

    function v(e, i, r, o, a, u, f) {
        var h = l(e), d = s[h] || (s[h] = []);
        i.split(/\s/).forEach(function (i) {
            if ("ready" == i)return t(document).ready(r);
            var s = p(i);
            s.fn = r, s.sel = a, s.e in c && (r = function (e) {
                var n = e.relatedTarget;
                return !n || n !== this && !t.contains(this, n) ? s.fn.apply(this, arguments) : void 0
            }), s.del = u;
            var l = u || r;
            s.proxy = function (t) {
                if (t = j(t), !t.isImmediatePropagationStopped()) {
                    t.data = o;
                    var i = l.apply(e, t._args == n ? [t] : [t].concat(t._args));
                    return i === !1 && (t.preventDefault(), t.stopPropagation()), i
                }
            }, s.i = d.length, d.push(s), "addEventListener"in e && e.addEventListener(g(s.e), s.proxy, m(s, f))
        })
    }

    function y(t, e, n, i, r) {
        var o = l(t);
        (e || "").split(/\s/).forEach(function (e) {
            h(t, e, n, i).forEach(function (e) {
                delete s[o][e.i], "removeEventListener"in t && t.removeEventListener(g(e.e), e.proxy, m(e, r))
            })
        })
    }

    function j(e, i) {
        return (i || !e.isDefaultPrevented) && (i || (i = e), t.each(E, function (t, n) {
            var r = i[t];
            e[t] = function () {
                return this[n] = x, r && r.apply(i, arguments)
            }, e[n] = b
        }), (i.defaultPrevented !== n ? i.defaultPrevented : "returnValue"in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = x)), e
    }

    function T(t) {
        var e, i = {originalEvent: t};
        for (e in t)w.test(e) || t[e] === n || (i[e] = t[e]);
        return j(i, t)
    }

    var n, e = 1, i = Array.prototype.slice, r = t.isFunction, o = function (t) {
        return "string" == typeof t
    }, s = {}, a = {}, u = "onfocusin"in window, f = {focus: "focusin", blur: "focusout"}, c = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", t.event = {
        add: v,
        remove: y
    }, t.proxy = function (e, n) {
        if (r(e)) {
            var i = function () {
                return e.apply(n, arguments)
            };
            return i._zid = l(e), i
        }
        if (o(n))return t.proxy(e[n], e);
        throw new TypeError("expected function")
    }, t.fn.bind = function (t, e, n) {
        return this.on(t, e, n)
    }, t.fn.unbind = function (t, e) {
        return this.off(t, e)
    }, t.fn.one = function (t, e, n, i) {
        return this.on(t, e, n, i, 1)
    };
    var x = function () {
        return !0
    }, b = function () {
        return !1
    }, w = /^([A-Z]|returnValue$|layer[XY]$)/, E = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function (t, e, n) {
        return this.on(e, t, n)
    }, t.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n)
    }, t.fn.live = function (e, n) {
        return t(document.body).delegate(this.selector, e, n), this
    }, t.fn.die = function (e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
    }, t.fn.on = function (e, s, a, u, f) {
        var c, l, h = this;
        return e && !o(e) ? (t.each(e, function (t, e) {
            h.on(t, s, a, e, f)
        }), h) : (o(s) || r(u) || u === !1 || (u = a, a = s, s = n), (r(a) || a === !1) && (u = a, a = n), u === !1 && (u = b), h.each(function (n, r) {
            f && (c = function (t) {
                return y(r, t.type, u), u.apply(this, arguments)
            }), s && (l = function (e) {
                var n, o = t(e.target).closest(s, r).get(0);
                return o && o !== r ? (n = t.extend(T(e), {
                    currentTarget: o,
                    liveFired: r
                }), (c || u).apply(o, [n].concat(i.call(arguments, 1)))) : void 0
            }), v(r, e, u, a, s, l || c)
        }))
    }, t.fn.off = function (e, i, s) {
        var a = this;
        return e && !o(e) ? (t.each(e, function (t, e) {
            a.off(t, i, e)
        }), a) : (o(i) || r(s) || s === !1 || (s = i, i = n), s === !1 && (s = b), a.each(function () {
            y(this, e, s, i)
        }))
    }, t.fn.trigger = function (e, n) {
        return e = o(e) || t.isPlainObject(e) ? t.Event(e) : j(e), e._args = n, this.each(function () {
            "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
    }, t.fn.triggerHandler = function (e, n) {
        var i, r;
        return this.each(function (s, a) {
            i = T(o(e) ? t.Event(e) : e), i._args = n, i.target = a, t.each(h(a, e.type || e), function (t, e) {
                return r = e.proxy(i), i.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), r
    }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.trigger(e)
        }
    }), ["focus", "blur"].forEach(function (e) {
        t.fn[e] = function (t) {
            return t ? this.bind(e, t) : this.each(function () {
                try {
                    this[e]()
                } catch (t) {
                }
            }), this
        }
    }), t.Event = function (t, e) {
        o(t) || (e = t, t = e.type);
        var n = document.createEvent(a[t] || "Events"), i = !0;
        if (e)for (var r in e)"bubbles" == r ? i = !!e[r] : n[r] = e[r];
        return n.initEvent(t, i, !0), j(n)
    }
}(Zepto), function (t) {
    function l(e, n, i) {
        var r = t.Event(n);
        return t(e).trigger(r, i), !r.isDefaultPrevented()
    }

    function h(t, e, i, r) {
        return t.global ? l(e || n, i, r) : void 0
    }

    function p(e) {
        e.global && 0 === t.active++ && h(e, null, "ajaxStart")
    }

    function d(e) {
        e.global && !--t.active && h(e, null, "ajaxStop")
    }

    function m(t, e) {
        var n = e.context;
        return e.beforeSend.call(n, t, e) === !1 || h(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void h(e, n, "ajaxSend", [t, e])
    }

    function g(t, e, n, i) {
        var r = n.context, o = "success";
        n.success.call(r, t, o, e), i && i.resolveWith(r, [t, o, e]), h(n, r, "ajaxSuccess", [e, n, t]), y(o, e, n)
    }

    function v(t, e, n, i, r) {
        var o = i.context;
        i.error.call(o, n, e, t), r && r.rejectWith(o, [n, e, t]), h(i, o, "ajaxError", [n, i, t || e]), y(e, n, i)
    }

    function y(t, e, n) {
        var i = n.context;
        n.complete.call(i, e, t), h(n, i, "ajaxComplete", [e, n]), d(n)
    }

    function x() {
    }

    function b(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == f ? "html" : t == u ? "json" : s.test(t) ? "script" : a.test(t) && "xml") || "text"
    }

    function w(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }

    function E(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = w(e.url, e.data), e.data = void 0)
    }

    function j(e, n, i, r) {
        return t.isFunction(n) && (r = i, i = n, n = void 0), t.isFunction(i) || (r = i, i = void 0), {
            url: e,
            data: n,
            success: i,
            dataType: r
        }
    }

    function S(e, n, i, r) {
        var o, s = t.isArray(n), a = t.isPlainObject(n);
        t.each(n, function (n, u) {
            o = t.type(u), r && (n = i ? r : r + "[" + (a || "object" == o || "array" == o ? n : "") + "]"), !r && s ? e.add(u.name, u.value) : "array" == o || !i && "object" == o ? S(e, u, i, n) : e.add(n, u)
        })
    }

    var i, r, e = 0, n = window.document, o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, s = /^(?:text|application)\/javascript/i, a = /^(?:text|application)\/xml/i, u = "application/json", f = "text/html", c = /^\s*$/;
    t.active = 0, t.ajaxJSONP = function (i, r) {
        if (!("type"in i))return t.ajax(i);
        var f, h, o = i.jsonpCallback, s = (t.isFunction(o) ? o() : o) || "jsonp" + ++e, a = n.createElement("script"), u = window[s], c = function (e) {
            t(a).triggerHandler("error", e || "abort")
        }, l = {abort: c};
        return r && r.promise(l), t(a).on("load error", function (e, n) {
            clearTimeout(h), t(a).off().remove(), "error" != e.type && f ? g(f[0], l, i, r) : v(null, n || "error", l, i, r), window[s] = u, f && t.isFunction(u) && u(f[0]), u = f = void 0
        }), m(l, i) === !1 ? (c("abort"), l) : (window[s] = function () {
            f = arguments
        }, a.src = i.url.replace(/\?(.+)=\?/, "?$1=" + s), n.head.appendChild(a), i.timeout > 0 && (h = setTimeout(function () {
            c("timeout")
        }, i.timeout)), l)
    }, t.ajaxSettings = {
        type: "GET",
        beforeSend: x,
        success: x,
        error: x,
        complete: x,
        context: null,
        global: !0,
        xhr: function () {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: u,
            xml: "application/xml, text/xml",
            html: f,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, t.ajax = function (e) {
        var n = t.extend({}, e || {}), o = t.Deferred && t.Deferred();
        for (i in t.ajaxSettings)void 0 === n[i] && (n[i] = t.ajaxSettings[i]);
        p(n), n.crossDomain || (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host), n.url || (n.url = window.location.toString()), E(n), n.cache === !1 && (n.url = w(n.url, "_=" + Date.now()));
        var s = n.dataType, a = /\?.+=\?/.test(n.url);
        if ("jsonp" == s || a)return a || (n.url = w(n.url, n.jsonp ? n.jsonp + "=?" : n.jsonp === !1 ? "" : "callback=?")), t.ajaxJSONP(n, o);
        var j, u = n.accepts[s], f = {}, l = function (t, e) {
            f[t.toLowerCase()] = [t, e]
        }, h = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol, d = n.xhr(), y = d.setRequestHeader;
        if (o && o.promise(d), n.crossDomain || l("X-Requested-With", "XMLHttpRequest"), l("Accept", u || "*/*"), (u = n.mimeType || u) && (u.indexOf(",") > -1 && (u = u.split(",", 2)[0]), d.overrideMimeType && d.overrideMimeType(u)), (n.contentType || n.contentType !== !1 && n.data && "GET" != n.type.toUpperCase()) && l("Content-Type", n.contentType || "application/x-www-form-urlencoded"), n.headers)for (r in n.headers)l(r, n.headers[r]);
        if (d.setRequestHeader = l, d.onreadystatechange = function () {
                if (4 == d.readyState) {
                    d.onreadystatechange = x, clearTimeout(j);
                    var e, i = !1;
                    if (d.status >= 200 && d.status < 300 || 304 == d.status || 0 == d.status && "file:" == h) {
                        s = s || b(n.mimeType || d.getResponseHeader("content-type")), e = d.responseText;
                        try {
                            "script" == s ? (1, eval)(e) : "xml" == s ? e = d.responseXML : "json" == s && (e = c.test(e) ? null : t.parseJSON(e))
                        } catch (r) {
                            i = r
                        }
                        i ? v(i, "parsererror", d, n, o) : g(e, d, n, o)
                    } else v(d.statusText || null, d.status ? "error" : "abort", d, n, o)
                }
            }, m(d, n) === !1)return d.abort(), v(null, "abort", d, n, o), d;
        if (n.xhrFields)for (r in n.xhrFields)d[r] = n.xhrFields[r];
        var T = "async"in n ? n.async : !0;
        d.open(n.type, n.url, T, n.username, n.password);
        for (r in f)y.apply(d, f[r]);
        return n.timeout > 0 && (j = setTimeout(function () {
            d.onreadystatechange = x, d.abort(), v(null, "timeout", d, n, o)
        }, n.timeout)), d.send(n.data ? n.data : null), d
    }, t.get = function () {
        return t.ajax(j.apply(null, arguments))
    }, t.post = function () {
        var e = j.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = j.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, i) {
        if (!this.length)return this;
        var a, r = this, s = e.split(/\s/), u = j(e, n, i), f = u.success;
        return s.length > 1 && (u.url = s[0], a = s[1]), u.success = function (e) {
            r.html(a ? t("<div>").html(e.replace(o, "")).find(a) : e), f && f.apply(r, arguments)
        }, t.ajax(u), this
    };
    var T = encodeURIComponent;
    t.param = function (t, e) {
        var n = [];
        return n.add = function (t, e) {
            this.push(T(t) + "=" + T(e))
        }, S(n, t, e), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function (t) {
    t.fn.serializeArray = function () {
        var n, e = [];
        return t([].slice.call(this.get(0).elements)).each(function () {
            n = t(this);
            var i = n.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && e.push({
                name: n.attr("name"),
                value: n.val()
            })
        }), e
    }, t.fn.serialize = function () {
        var t = [];
        return this.serializeArray().forEach(function (e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
    }, t.fn.submit = function (e) {
        if (e)this.bind("submit", e); else if (this.length) {
            var n = t.Event("submit");
            this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function (t) {
    "__proto__"in{} || t.extend(t.zepto, {
        Z: function (e, n) {
            return e = e || [], t.extend(e, t.fn), e.selector = n || "", e.__Z = !0, e
        }, isZ: function (e) {
            return "array" === t.type(e) && "__Z"in e
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (e) {
        var n = getComputedStyle;
        window.getComputedStyle = function (t) {
            try {
                return n(t)
            } catch (e) {
                return null
            }
        }
    }
}(Zepto);
(function () {
    var n = this, t = n._, r = {}, e = Array.prototype, u = Object.prototype, i = Function.prototype, a = e.push, o = e.slice, c = e.concat, l = u.toString, f = u.hasOwnProperty, s = e.forEach, p = e.map, h = e.reduce, v = e.reduceRight, g = e.filter, d = e.every, m = e.some, y = e.indexOf, b = e.lastIndexOf, x = Array.isArray, w = Object.keys, _ = i.bind, j = function (n) {
        return n instanceof j ? n : this instanceof j ? void(this._wrapped = n) : new j(n)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = j), exports._ = j) : n._ = j, j.VERSION = "1.6.0";
    var A = j.each = j.forEach = function (n, t, e) {
        if (null == n)return n;
        if (s && n.forEach === s)n.forEach(t, e); else if (n.length === +n.length) {
            for (var u = 0, i = n.length; i > u; u++)if (t.call(e, n[u], u, n) === r)return
        } else for (var a = j.keys(n), u = 0, i = a.length; i > u; u++)if (t.call(e, n[a[u]], a[u], n) === r)return;
        return n
    };
    j.map = j.collect = function (n, t, r) {
        var e = [];
        return null == n ? e : p && n.map === p ? n.map(t, r) : (A(n, function (n, u, i) {
            e.push(t.call(r, n, u, i))
        }), e)
    };
    var O = "Reduce of empty array with no initial value";
    j.reduce = j.foldl = j.inject = function (n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), h && n.reduce === h)return e && (t = j.bind(t, e)), u ? n.reduce(t, r) : n.reduce(t);
        if (A(n, function (n, i, a) {
                u ? r = t.call(e, r, n, i, a) : (r = n, u = !0)
            }), !u)throw new TypeError(O);
        return r
    }, j.reduceRight = j.foldr = function (n, t, r, e) {
        var u = arguments.length > 2;
        if (null == n && (n = []), v && n.reduceRight === v)return e && (t = j.bind(t, e)), u ? n.reduceRight(t, r) : n.reduceRight(t);
        var i = n.length;
        if (i !== +i) {
            var a = j.keys(n);
            i = a.length
        }
        if (A(n, function (o, c, l) {
                c = a ? a[--i] : --i, u ? r = t.call(e, r, n[c], c, l) : (r = n[c], u = !0)
            }), !u)throw new TypeError(O);
        return r
    }, j.find = j.detect = function (n, t, r) {
        var e;
        return k(n, function (n, u, i) {
            return t.call(r, n, u, i) ? (e = n, !0) : void 0
        }), e
    }, j.filter = j.select = function (n, t, r) {
        var e = [];
        return null == n ? e : g && n.filter === g ? n.filter(t, r) : (A(n, function (n, u, i) {
            t.call(r, n, u, i) && e.push(n)
        }), e)
    }, j.reject = function (n, t, r) {
        return j.filter(n, function (n, e, u) {
            return !t.call(r, n, e, u)
        }, r)
    }, j.every = j.all = function (n, t, e) {
        t || (t = j.identity);
        var u = !0;
        return null == n ? u : d && n.every === d ? n.every(t, e) : (A(n, function (n, i, a) {
            return (u = u && t.call(e, n, i, a)) ? void 0 : r
        }), !!u)
    };
    var k = j.some = j.any = function (n, t, e) {
        t || (t = j.identity);
        var u = !1;
        return null == n ? u : m && n.some === m ? n.some(t, e) : (A(n, function (n, i, a) {
            return u || (u = t.call(e, n, i, a)) ? r : void 0
        }), !!u)
    };
    j.contains = j.include = function (n, t) {
        return null == n ? !1 : y && n.indexOf === y ? n.indexOf(t) != -1 : k(n, function (n) {
            return n === t
        })
    }, j.invoke = function (n, t) {
        var r = o.call(arguments, 2), e = j.isFunction(t);
        return j.map(n, function (n) {
            return (e ? t : n[t]).apply(n, r)
        })
    }, j.pluck = function (n, t) {
        return j.map(n, j.property(t))
    }, j.where = function (n, t) {
        return j.filter(n, j.matches(t))
    }, j.findWhere = function (n, t) {
        return j.find(n, j.matches(t))
    }, j.max = function (n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)return Math.max.apply(Math, n);
        var e = -1 / 0, u = -1 / 0;
        return A(n, function (n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            o > u && (e = n, u = o)
        }), e
    }, j.min = function (n, t, r) {
        if (!t && j.isArray(n) && n[0] === +n[0] && n.length < 65535)return Math.min.apply(Math, n);
        var e = 1 / 0, u = 1 / 0;
        return A(n, function (n, i, a) {
            var o = t ? t.call(r, n, i, a) : n;
            u > o && (e = n, u = o)
        }), e
    }, j.shuffle = function (n) {
        var t, r = 0, e = [];
        return A(n, function (n) {
            t = j.random(r++), e[r - 1] = e[t], e[t] = n
        }), e
    }, j.sample = function (n, t, r) {
        return null == t || r ? (n.length !== +n.length && (n = j.values(n)), n[j.random(n.length - 1)]) : j.shuffle(n).slice(0, Math.max(0, t))
    };
    var E = function (n) {
        return null == n ? j.identity : j.isFunction(n) ? n : j.property(n)
    };
    j.sortBy = function (n, t, r) {
        return t = E(t), j.pluck(j.map(n, function (n, e, u) {
            return {value: n, index: e, criteria: t.call(r, n, e, u)}
        }).sort(function (n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)return 1;
                if (e > r || e === void 0)return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = E(r), A(t, function (i, a) {
                var o = r.call(e, i, a, t);
                n(u, o, i)
            }), u
        }
    };
    j.groupBy = F(function (n, t, r) {
        j.has(n, t) ? n[t].push(r) : n[t] = [r]
    }), j.indexBy = F(function (n, t, r) {
        n[t] = r
    }), j.countBy = F(function (n, t) {
        j.has(n, t) ? n[t]++ : n[t] = 1
    }), j.sortedIndex = function (n, t, r, e) {
        r = E(r);
        for (var u = r.call(e, t), i = 0, a = n.length; a > i;) {
            var o = i + a >>> 1;
            r.call(e, n[o]) < u ? i = o + 1 : a = o
        }
        return i
    }, j.toArray = function (n) {
        return n ? j.isArray(n) ? o.call(n) : n.length === +n.length ? j.map(n, j.identity) : j.values(n) : []
    }, j.size = function (n) {
        return null == n ? 0 : n.length === +n.length ? n.length : j.keys(n).length
    }, j.first = j.head = j.take = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : o.call(n, 0, t)
    }, j.initial = function (n, t, r) {
        return o.call(n, 0, n.length - (null == t || r ? 1 : t))
    }, j.last = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : o.call(n, Math.max(n.length - t, 0))
    }, j.rest = j.tail = j.drop = function (n, t, r) {
        return o.call(n, null == t || r ? 1 : t)
    }, j.compact = function (n) {
        return j.filter(n, j.identity)
    };
    var M = function (n, t, r) {
        return t && j.every(n, j.isArray) ? c.apply(r, n) : (A(n, function (n) {
            j.isArray(n) || j.isArguments(n) ? t ? a.apply(r, n) : M(n, t, r) : r.push(n)
        }), r)
    };
    j.flatten = function (n, t) {
        return M(n, t, [])
    }, j.without = function (n) {
        return j.difference(n, o.call(arguments, 1))
    }, j.partition = function (n, t) {
        var r = [], e = [];
        return A(n, function (n) {
            (t(n) ? r : e).push(n)
        }), [r, e]
    }, j.uniq = j.unique = function (n, t, r, e) {
        j.isFunction(t) && (e = r, r = t, t = !1);
        var u = r ? j.map(n, r, e) : n, i = [], a = [];
        return A(u, function (r, e) {
            (t ? e && a[a.length - 1] === r : j.contains(a, r)) || (a.push(r), i.push(n[e]))
        }), i
    }, j.union = function () {
        return j.uniq(j.flatten(arguments, !0))
    }, j.intersection = function (n) {
        var t = o.call(arguments, 1);
        return j.filter(j.uniq(n), function (n) {
            return j.every(t, function (t) {
                return j.contains(t, n)
            })
        })
    }, j.difference = function (n) {
        var t = c.apply(e, o.call(arguments, 1));
        return j.filter(n, function (n) {
            return !j.contains(t, n)
        })
    }, j.zip = function () {
        for (var n = j.max(j.pluck(arguments, "length").concat(0)), t = new Array(n), r = 0; n > r; r++)t[r] = j.pluck(arguments, "" + r);
        return t
    }, j.object = function (n, t) {
        if (null == n)return {};
        for (var r = {}, e = 0, u = n.length; u > e; e++)t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, j.indexOf = function (n, t, r) {
        if (null == n)return -1;
        var e = 0, u = n.length;
        if (r) {
            if ("number" != typeof r)return e = j.sortedIndex(n, t), n[e] === t ? e : -1;
            e = 0 > r ? Math.max(0, u + r) : r
        }
        if (y && n.indexOf === y)return n.indexOf(t, r);
        for (; u > e; e++)if (n[e] === t)return e;
        return -1
    }, j.lastIndexOf = function (n, t, r) {
        if (null == n)return -1;
        var e = null != r;
        if (b && n.lastIndexOf === b)return e ? n.lastIndexOf(t, r) : n.lastIndexOf(t);
        for (var u = e ? r : n.length; u--;)if (n[u] === t)return u;
        return -1
    }, j.range = function (n, t, r) {
        arguments.length <= 1 && (t = n || 0, n = 0), r = arguments[2] || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = 0, i = new Array(e); e > u;)i[u++] = n, n += r;
        return i
    };
    var R = function () {
    };
    j.bind = function (n, t) {
        var r, e;
        if (_ && n.bind === _)return _.apply(n, o.call(arguments, 1));
        if (!j.isFunction(n))throw new TypeError;
        return r = o.call(arguments, 2), e = function () {
            if (!(this instanceof e))return n.apply(t, r.concat(o.call(arguments)));
            R.prototype = n.prototype;
            var u = new R;
            R.prototype = null;
            var i = n.apply(u, r.concat(o.call(arguments)));
            return Object(i) === i ? i : u
        }
    }, j.partial = function (n) {
        var t = o.call(arguments, 1);
        return function () {
            for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++)e[u] === j && (e[u] = arguments[r++]);
            for (; r < arguments.length;)e.push(arguments[r++]);
            return n.apply(this, e)
        }
    }, j.bindAll = function (n) {
        var t = o.call(arguments, 1);
        if (0 === t.length)throw new Error("bindAll must be passed function names");
        return A(t, function (t) {
            n[t] = j.bind(n[t], n)
        }), n
    }, j.memoize = function (n, t) {
        var r = {};
        return t || (t = j.identity), function () {
            var e = t.apply(this, arguments);
            return j.has(r, e) ? r[e] : r[e] = n.apply(this, arguments)
        }
    }, j.delay = function (n, t) {
        var r = o.call(arguments, 2);
        return setTimeout(function () {
            return n.apply(null, r)
        }, t)
    }, j.defer = function (n) {
        return j.delay.apply(j, [n, 1].concat(o.call(arguments, 1)))
    }, j.throttle = function (n, t, r) {
        var e, u, i, a = null, o = 0;
        r || (r = {});
        var c = function () {
            o = r.leading === !1 ? 0 : j.now(), a = null, i = n.apply(e, u), e = u = null
        };
        return function () {
            var l = j.now();
            o || r.leading !== !1 || (o = l);
            var f = t - (l - o);
            return e = this, u = arguments, 0 >= f ? (clearTimeout(a), a = null, o = l, i = n.apply(e, u), e = u = null) : a || r.trailing === !1 || (a = setTimeout(c, f)), i
        }
    }, j.debounce = function (n, t, r) {
        var e, u, i, a, o, c = function () {
            var l = j.now() - a;
            t > l ? e = setTimeout(c, t - l) : (e = null, r || (o = n.apply(i, u), i = u = null))
        };
        return function () {
            i = this, u = arguments, a = j.now();
            var l = r && !e;
            return e || (e = setTimeout(c, t)), l && (o = n.apply(i, u), i = u = null), o
        }
    }, j.once = function (n) {
        var t, r = !1;
        return function () {
            return r ? t : (r = !0, t = n.apply(this, arguments), n = null, t)
        }
    }, j.wrap = function (n, t) {
        return j.partial(t, n)
    }, j.compose = function () {
        var n = arguments;
        return function () {
            for (var t = arguments, r = n.length - 1; r >= 0; r--)t = [n[r].apply(this, t)];
            return t[0]
        }
    }, j.after = function (n, t) {
        return function () {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, j.keys = function (n) {
        if (!j.isObject(n))return [];
        if (w)return w(n);
        var t = [];
        for (var r in n)j.has(n, r) && t.push(r);
        return t
    }, j.values = function (n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)e[u] = n[t[u]];
        return e
    }, j.pairs = function (n) {
        for (var t = j.keys(n), r = t.length, e = new Array(r), u = 0; r > u; u++)e[u] = [t[u], n[t[u]]];
        return e
    }, j.invert = function (n) {
        for (var t = {}, r = j.keys(n), e = 0, u = r.length; u > e; e++)t[n[r[e]]] = r[e];
        return t
    }, j.functions = j.methods = function (n) {
        var t = [];
        for (var r in n)j.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, j.extend = function (n) {
        return A(o.call(arguments, 1), function (t) {
            if (t)for (var r in t)n[r] = t[r]
        }), n
    }, j.pick = function (n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        return A(r, function (r) {
            r in n && (t[r] = n[r])
        }), t
    }, j.omit = function (n) {
        var t = {}, r = c.apply(e, o.call(arguments, 1));
        for (var u in n)j.contains(r, u) || (t[u] = n[u]);
        return t
    }, j.defaults = function (n) {
        return A(o.call(arguments, 1), function (t) {
            if (t)for (var r in t)n[r] === void 0 && (n[r] = t[r])
        }), n
    }, j.clone = function (n) {
        return j.isObject(n) ? j.isArray(n) ? n.slice() : j.extend({}, n) : n
    }, j.tap = function (n, t) {
        return t(n), n
    };
    var S = function (n, t, r, e) {
        if (n === t)return 0 !== n || 1 / n == 1 / t;
        if (null == n || null == t)return n === t;
        n instanceof j && (n = n._wrapped), t instanceof j && (t = t._wrapped);
        var u = l.call(n);
        if (u != l.call(t))return !1;
        switch (u) {
            case"[object String]":
                return n == String(t);
            case"[object Number]":
                return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
            case"[object Date]":
            case"[object Boolean]":
                return +n == +t;
            case"[object RegExp]":
                return n.source == t.source && n.global == t.global && n.multiline == t.multiline && n.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof n || "object" != typeof t)return !1;
        for (var i = r.length; i--;)if (r[i] == n)return e[i] == t;
        var a = n.constructor, o = t.constructor;
        if (a !== o && !(j.isFunction(a) && a instanceof a && j.isFunction(o) && o instanceof o) && "constructor"in n && "constructor"in t)return !1;
        r.push(n), e.push(t);
        var c = 0, f = !0;
        if ("[object Array]" == u) {
            if (c = n.length, f = c == t.length)for (; c-- && (f = S(n[c], t[c], r, e)););
        } else {
            for (var s in n)if (j.has(n, s) && (c++, !(f = j.has(t, s) && S(n[s], t[s], r, e))))break;
            if (f) {
                for (s in t)if (j.has(t, s) && !c--)break;
                f = !c
            }
        }
        return r.pop(), e.pop(), f
    };
    j.isEqual = function (n, t) {
        return S(n, t, [], [])
    }, j.isEmpty = function (n) {
        if (null == n)return !0;
        if (j.isArray(n) || j.isString(n))return 0 === n.length;
        for (var t in n)if (j.has(n, t))return !1;
        return !0
    }, j.isElement = function (n) {
        return !(!n || 1 !== n.nodeType)
    }, j.isArray = x || function (n) {
            return "[object Array]" == l.call(n)
        }, j.isObject = function (n) {
        return n === Object(n)
    }, A(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (n) {
        j["is" + n] = function (t) {
            return l.call(t) == "[object " + n + "]"
        }
    }), j.isArguments(arguments) || (j.isArguments = function (n) {
        return !(!n || !j.has(n, "callee"))
    }), "function" != typeof/./ && (j.isFunction = function (n) {
        return "function" == typeof n
    }), j.isFinite = function (n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, j.isNaN = function (n) {
        return j.isNumber(n) && n != +n
    }, j.isBoolean = function (n) {
        return n === !0 || n === !1 || "[object Boolean]" == l.call(n)
    }, j.isNull = function (n) {
        return null === n
    }, j.isUndefined = function (n) {
        return n === void 0
    }, j.has = function (n, t) {
        return f.call(n, t)
    }, j.noConflict = function () {
        return n._ = t, this
    }, j.identity = function (n) {
        return n
    }, j.constant = function (n) {
        return function () {
            return n
        }
    }, j.property = function (n) {
        return function (t) {
            return t[n]
        }
    }, j.matches = function (n) {
        return function (t) {
            if (t === n)return !0;
            for (var r in n)if (n[r] !== t[r])return !1;
            return !0
        }
    }, j.times = function (n, t, r) {
        for (var e = Array(Math.max(0, n)), u = 0; n > u; u++)e[u] = t.call(r, u);
        return e
    }, j.random = function (n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, j.now = Date.now || function () {
            return (new Date).getTime()
        };
    var T = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"}};
    T.unescape = j.invert(T.escape);
    var I = {
        escape: new RegExp("[" + j.keys(T.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + j.keys(T.unescape).join("|") + ")", "g")
    };
    j.each(["escape", "unescape"], function (n) {
        j[n] = function (t) {
            return null == t ? "" : ("" + t).replace(I[n], function (t) {
                return T[n][t]
            })
        }
    }), j.result = function (n, t) {
        if (null == n)return void 0;
        var r = n[t];
        return j.isFunction(r) ? r.call(n) : r
    }, j.mixin = function (n) {
        A(j.functions(n), function (t) {
            var r = j[t] = n[t];
            j.prototype[t] = function () {
                var n = [this._wrapped];
                return a.apply(n, arguments), z.call(this, r.apply(j, n))
            }
        })
    };
    var N = 0;
    j.uniqueId = function (n) {
        var t = ++N + "";
        return n ? n + t : t
    }, j.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var q = /(.)^/, B = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        " ": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, D = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    j.template = function (n, t, r) {
        var e;
        r = j.defaults({}, r, j.templateSettings);
        var u = new RegExp([(r.escape || q).source, (r.interpolate || q).source, (r.evaluate || q).source].join("|") + "|$", "g"), i = 0, a = "__p+='";
        n.replace(u, function (t, r, e, u, o) {
            return a += n.slice(i, o).replace(D, function (n) {
                return "\\" + B[n]
            }), r && (a += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'"), e && (a += "'+\n((__t=(" + e + "))==null?'':__t)+\n'"), u && (a += "';\n" + u + "\n__p+='"), i = o + t.length, t
        }), a += "';\n", r.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            e = new Function(r.variable || "obj", "_", a)
        } catch (o) {
            throw o.source = a, o
        }
        if (t)return e(t, j);
        var c = function (n) {
            return e.call(this, n, j)
        };
        return c.source = "function(" + (r.variable || "obj") + "){\n" + a + "}", c
    }, j.chain = function (n) {
        return j(n).chain()
    };
    var z = function (n) {
        return this._chain ? j(n).chain() : n
    };
    j.mixin(j), A(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
        var t = e[n];
        j.prototype[n] = function () {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" != n && "splice" != n || 0 !== r.length || delete r[0], z.call(this, r)
        }
    }), A(["concat", "join", "slice"], function (n) {
        var t = e[n];
        j.prototype[n] = function () {
            return z.call(this, t.apply(this._wrapped, arguments))
        }
    }), j.extend(j.prototype, {
        chain: function () {
            return this._chain = !0, this
        }, value: function () {
            return this._wrapped
        }
    }), "function" == typeof define && define.amd && define("underscore", [], function () {
        return j
    })
}).call(this);
(function () {
    //global variable
    window.USERKEY = "userInfo";
    window.COL = "collection";
    window.$itemCount = $(".js-item-count");
    window.$itemTotal = $(".js-item-total");
    window.statusMapping = {
        "0": {"info": "已取消"},
        "1": {"info": "待确认"},
        "2": {"info": "商家已确认"},
        "3": {"info": "后台确认"},
        "10": {"info": "待采购中"},
        "11": {"info": "采购中"},
        "12": {"info": "已采购"},
        "20": {"info": "待分拣"},
        "21": {"info": "分拣中"},
        "22": {"info": "已分拣"},
        "30": {"info": "待配送"},
        "31": {"info": "配送中"},
        "32": {"info": "已送达"},
        "40": {"info": "待支付"},
        "41": {"info": "已支付"},
        "50": {"info": "完成"}
    };

    window.dayMapping = {
        "0": "星期日",
        "1": "星期一",
        "2": "星期二",
        "3": "星期三",
        "4": "星期四",
        "5": "星期五",
        "6": "星期六"
    };
    //localStorage.clear();
    function detectAndClearLS(){
        if(localStorage.ysmcPagecount){
            localStorage.ysmcPagecount = Number(localStorage.ysmcPagecount) + 1;
        }
        else{
            localStorage.clear();
            localStorage.ysmcPagecount = 1;
        }
    }

    detectAndClearLS();


    $refresh = $(".js-refresh");
    if ($refresh) {
        $refresh.click(function () {
            window.location.href = window.location.href + "#" + GenerateGuid();
        });
    }

    function Guid() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    function GenerateGuid() {
        return Guid() + Guid() + Guid() + Guid() + Guid() + Guid() + Guid() + Guid();
    }

    window.clearCache = function () {
        delete localStorage[window.COL];
        if (localStorage[window.USERKEY]) {
            delete localStorage[window.USERKEY];
        }
        var _key = _.find(_.keys(localStorage), function (key) {
            return /^\d+$/.test(key);
        });
        if (_key) {
            var obj = JSON.parse(localStorage[_key]);
            if (!obj.hasOwnProperty("is_favorite")) {
                localStorage.clear();
            }
        }
    }
    window.bindCheckItem=function(th,bl) {
        var $status=th.parent().find('.js-sale_status');
        if($status.attr("sale_status").trim()=="0") {
            if (bl) {
                var msg = "请您在每天" + $status.attr("start_sale_time").trim() + "~" + $status.attr("end_sale_time").trim() + "之间下单购买";
                alert(msg);
            }
            return false;
        }
        return true;
    }

    //related the plus and minus action
    PlusMinus = {
        detailHTMLTemple: function (item, hasFavorite, needDelete) {
            //initial data
            var primary_key = item["id"];

            var count = localStorage[primary_key] ? JSON.parse(localStorage[primary_key])["count"] : 0;
            //levelBlock
            var levelBlock = "";
            item["sell_brand"] = item["sell_brand"] || "";
            item["level"] = item["level"] || "";
            if (item["sell_brand"].trim() !== "" && item["level"].trim() !== "") {
                levelBlock = item["sell_brand"].trim() + " | " + item["level"].trim();
            } else {
                levelBlock = item["sell_brand"].trim() === "" ? item["level"] : item["sell_brand"];
            }
            if (levelBlock !== "") {
                levelBlock = "(<span class='js-level'>" + levelBlock + "</span>)";
            }
            //favorite
            var favoriteBlock = "";
            if (hasFavorite) {
                item['is_favorite']  = item['is_favorite']  || 0 ;
                if (+item['is_favorite'] > 0) {
                    favoriteBlock = "<span class='ml5 font16 js-favorite favorite'>★</span>";
                } else {
                    favoriteBlock = "<span class='ml5 font16 js-favorite unfavorite'>☆</span>";
                }
            }

            //限购
            var promoteBlock = "";
            item['promote_type'] = item['promote_type'] || 0;
            if (+item['promote_type'] > 0) {
                //3种限购类型之一 无论哪种类型我们都加上限购图标
                promoteBlock = '<span class="item-promote">限购</span>';
            }
            //否则不做任何处理

            //subject
            var subjectBlock = "";
            if (item["subject"] && item["subject"].trim() !== "") {
                subjectBlock = "<span class='js-subject' style='color:#666;'>" + item["subject"].trim() + "</span><br />";
            }
            //price, final priceref
            var finalPrice = item['commodity_total_price'] ? item['commodity_total_price'] : item["price"];
            var priceRef = "";
            var chosenRef = "";
            var prePrice = "";

            if ((item['price_unit'] != item["unit"] && item['price_unit']) || +item['standard_item_num'] > 1) {
                var echoHTML = "";
                if (+item['standard_item_num'] > 1) {
                    echoHTML = '(<span class="js-input-echo">' + count + '</span>袋)';
                }
                priceRef = "<br/><span class='js-price-ref'>(<span class='price'>" + item["price"] + "</span>元/" + item['price_unit'] + ")</span>";
                chosenRef = '<div class="ml10 price" style="height:12px;line-height:12px;font-size:12px;">' +
                    '<input type="hidden" class="js-standard-item-num" value="' + item["standard_item_num"] + '">' +
                    '已选' + echoHTML + '<span class="js-chosen-count">' + count * parseInt(item["standard_item_num"]) + '</span>' + item["unit"] + '</div> ';
                //冬瓜模型
                if (item['price_unit'] != item["unit"] && finalPrice != item["price"]) {
                    prePrice = "<span class='price'>约</span> ";
                }
            }
            //formatRef
            var soldUnitRef = item["format"].length ?  item["format"].substring(0, 1) : "" ;
            var formatRef = '<span class="js-format">' + item["format"] + '</span>';
            if (item['standard_item_num'] && item['standard_item_num'] > 1) {
                var _metaPrice = item["price"];
                priceRef = "<br/><span class='js-price-ref'>(<span class='price'>" + _metaPrice + "</span>元/" + item['price_unit'] + ")</span>";
                //打包售卖模型
                formatRef = '<span class="js-format">袋(' + item["format"] + ')</span>';
                soldUnitRef = "袋";
            }

            var soldRef = '';
            //var soldRef = '<div style="height:12px;line-height:12px;font-size:12px;color:#666;">' +
            //    '已售' + item["sold_count"] + soldUnitRef + '</div> ';
            //图片
            var pictureBlock = '',
                pictureSrc = '',
                pictureSrcOriginal = '';
            if (item['pic']) {
                pictureSrc = 'http://img.yunshanmeicai.com/' + item['pic'] + '_thumb.png';
                pictureSrcOriginal = 'http://img.yunshanmeicai.com/' + item['pic'] + '.png';
                pictureBlock = '<div class="ml10 product-img-wrapper"><img  class="product-img" data-src="' + pictureSrc + '" data-srcOriginal="' + pictureSrcOriginal + '"></div>';

            }


            var td1Mask = '<div style="position:absolute;top:0;left:0;background-color:#000;color:#fff;opacity:0.4;text-align:center;-webkit-backface-visibility: hidden;" class="hide js-td1-mask"></div>';

            var sale_status=" ";
            if(item.hasOwnProperty("sale_status"))
                sale_status=item["sale_status"];
            var start_sale_time=" ";
            if(item.hasOwnProperty("start_sale_time"))
                start_sale_time=item["start_sale_time"];
            var end_sale_time=" ";
            if(item.hasOwnProperty("end_sale_time"))
                end_sale_time=item["end_sale_time"];
            //td2
            var modifyCountHTML = ' ' +
                '<a class="js-minus cp font20" style="color:#86a744;font-weight:bold;border: 1px solid;">－</a>' +
                '<input type="tel" class="js-count tc" pattern="\d*" style="width:36px;line-height:18px;" value=' + count + ' /> ' +
                '<input type="hidden" class="js-primary-key" value="' + primary_key + '">' +
                '<input type="hidden" class="js-sale_status" sale_status="'+sale_status+'" start_sale_time="'+start_sale_time+'" end_sale_time="'+end_sale_time+'"/>'+
                ' <a class="js-plus cp font20" style="color:#21b387;font-weight:bold;border: 1px solid;">＋</a>';

            var _td_w = "43%";
            var td3HTML = "";
            if (needDelete) {
                td3HTML = "<td style='width:15%;' class='v-m'><a href='javascript:void(0);' class='js-delete-row'>删除</a></td>";
                _td_w = "35%";
            }

            if (item["outOfDate"]) {
                modifyCountHTML = "<span class='price'>商品已下架</span>";
            }
            var td2HTML = pictureBlock +
                '<div style="height:40px;line-height:40px;font-size:16px;">' + modifyCountHTML + '</div>' +
                chosenRef;

            if (!hasFavorite) {
                modifyCountHTML = '<input type="hidden" class="js-primary-key" value="' + primary_key + '">';
                var isContained = _.contains((localStorage[window.COL] || "").split(","), primary_key);
                if (isContained) {
                    modifyCountHTML += '<a class="js-add-favorite cp favorite" style="padding:5px;border: 1px solid;">★ 取消</a>';
                } else {
                    modifyCountHTML += '<a class="js-add-favorite cp unfavorite" style="padding:5px;border: 1px solid;">☆ 收藏</a>';
                }
                td2HTML = modifyCountHTML;
            }

            // ☆ ★
            var tmplHTML =
                '<tr>' +
                '  <td style="padding-left:15px;position:relative;">' +
                '  ' + '<span class="js-c-name">' + item["name"] + '</span>' + levelBlock + favoriteBlock + promoteBlock + '<br />' +
                (item["alias"] ? '<span class="js-alias">' + item["alias"] + '</span><br>' : '') +
                subjectBlock +

                td1Mask +
                ' ' + prePrice + '<span class="js-price price">' + finalPrice + '</span>元/' + formatRef + priceRef + soldRef +
                '  </td>' +
                '  <td class="v-m" style="width:' + _td_w + ';text-align:center;">' +
                td2HTML +
                '  </td>' +
                td3HTML +
                '</tr>';
            return tmplHTML;
        },

        bindPlusMinusEvent: function (tr, options) {


            $tr = $(tr);
            var countChangeCallBack = options["countChangeCallBack"] || function () {
                };
            $tr.find(".js-minus").click(function () {
                if (!bindCheckItem($(this),true)) return;

                var $tr = $(this).closest("tr");
                var $td = $(this).parent().parent();
                var $count = $td.find(".js-count");
                var val = window.parseInt($count.val());
                newVal = val > 0 ? (val - 1) : 0;
                $count.val(newVal);
                PlusMinus.storeData($td.parent());
                countChangeCallBack();
                var $chosenCount = $tr.find(".js-chosen-count");
                if ($chosenCount.length > 0 && parseInt($chosenCount.text().trim()) > 0) {
                    alert("您" + $chosenCount.closest("div").text() + $tr.find(".js-c-name").text());
                }
            });

            $tr.find(".js-plus").click(function () {
                if (!bindCheckItem($(this),true)) return;

                var $tr = $(this).closest("tr");
                var $td = $(this).parent().parent();
                var $count = $td.find(".js-count");
                var val = window.parseInt($count.val());
                newVal = val < -1 ? 0 : (val + 1);
                $count.val(newVal);
                PlusMinus.storeData($td.parent());
                countChangeCallBack();
                var $chosenCount = $tr.find(".js-chosen-count");
                if ($chosenCount.length > 0 && parseInt($chosenCount.text().trim()) > 0) {
                    alert("您" + $chosenCount.closest("div").text() + $tr.find(".js-c-name").text());
                }
            });

            $tr.find(".js-count").keypress(function (e) {
                var key = e.keyCode;
                key = String.fromCharCode(key);
                var regex = /[0-9]/;
                if (!regex.test(key)) {
                    e.returnValue = false;
                    if (e.preventDefault) e.preventDefault();
                }
            }).click(function () {
                if (!bindCheckItem($(this),true)) {
                    $(this).blur();
                    return;
                }

                this.setSelectionRange(0, this.value.length);
            }).change(function () {
                var $tr = $(this).closest("tr");
                var val = $(this).val().toString().trim();
                if (!/^[0-9]+$/.test(val)) {
                    $(this).val(parseInt(val));
                    alert('请输入整数!');
                    return false;
                }
                PlusMinus.storeData($tr);
                countChangeCallBack();
            }).focus(function () {
                var val = $(this).val().toString().trim();
                if (val === "0") {
                    $(this).val("");
                }
            }).blur(function () {
                var $tr = $(this).closest("tr");
                var val = $(this).val().toString().trim();
                if (val === "") {
                    $(this).val("0");
                } else if (parseInt(val) > 999) {
                    $(this).val("0");
                    $(this).change();
                    alert("数量不能超过999！");
                }
                if (!bindCheckItem($(this),false)) {
                    return;
                }
                var $chosenCount = $tr.find(".js-chosen-count");
                if ($chosenCount.length > 0 && parseInt($chosenCount.text().trim()) > 0) {
                    alert("您" + $chosenCount.closest("div").text() + $tr.find(".js-c-name").text());
                }
            });



            $tr.find(".js-delete-row").click(function () {
                var choose = confirm("确定要删除吗?");
                if (choose) {
                    var key = $(this).closest("tr").find(".js-primary-key").val();
                    localStorage.removeItem(key);
                    $(this).closest("tr").remove();
                    $itemCount.html(PlusMinus.totalCount());
                    $itemTotal.html(PlusMinus.totalPrice());
                    countChangeCallBack();
                }
            });
        },

        bindAddFavoriteEvent: function (tr, options) {
            $tr = $(tr);
            $favorite = $tr.find(".js-add-favorite");
            var $fcount = $(document).find(".js-favorite-count");
            $favorite.click(function () {
                $this = $(this);
                var isAdd = $this.hasClass("unfavorite");
                var cid = $this.closest('tr').find(".js-primary-key").val().trim();
                var cids = (localStorage[window.COL] || "").split(",");
                if (isAdd) {
                    $this.removeClass("unfavorite").addClass("favorite").text('★ 取消');
                    localStorage[window.COL] = (localStorage[window.COL] || "") + "," + cid;
                } else {
                    $this.removeClass("favorite").addClass("unfavorite").text('☆ 收藏');
                    localStorage[window.COL] = _.without(cids, cid).join(",");
                }
                var _uniq_ids = _.chain(localStorage[window.COL].split(",")).without('').uniq().value();
                localStorage[window.COL] = _uniq_ids.join(',');
                $fcount.text(_uniq_ids.length);
            });
        },

        bindToggleFavorite: function ($list, hasFavorite, isPreview) {
            if (!hasFavorite) return;
            var self = this;
            _.each($list.find("tr td:nth-child(1)"), function (td) {
                var $td = $(td);
                $td.click(function () {
                    $this = $(this);
                    var c_id = $this.parent().find(".js-primary-key").val();
                    var $favorite = $this.find(".js-favorite");
                    var action = $favorite.hasClass("favorite") > 0 ? "cancel" : "add";
                    var data = {
                        c_id: c_id
                    };
                    var $mask = $this.find(".js-td1-mask");
                    if (!$mask.hasClass('hide')) {
                        $mask.addClass('hide');
                        return;
                    }
                    if (action == 'cancel') {
                        $mask.removeClass("hide").css({
                            "width": $this.width(),
                            "height": $this.height(),
                            "line-height": $this.height() + "px"
                        }).text("正在取消收藏...");
                    } else {
                        $mask.removeClass("hide").css({
                            "width": $this.width(),
                            "height": $this.height(),
                            "line-height": $this.height() + "px"
                        }).text("正在收藏...");
                    }
                    var postUrl = '/userCollection/' + action;
                    if (isPreview) {
                        postUrl = '/preview/favorite';
                    }
                    $.post(postUrl, data, function (result) {
                        if (result.success) {
                            if (action == "cancel") {
                                $favorite.removeClass("favorite").addClass('unfavorite').text('☆');
                                self.modifyLocalDataFavorite(window.data, c_id, 0);
                            } else {
                                $favorite.removeClass("unfavorite").addClass('favorite').text('★');
                                self.modifyLocalDataFavorite(window.data, c_id, 1);
                            }
                            $mask.addClass('hide');
                        }
                    }, 'json');


                });
            });
        } ,

        modifyLocalDataFavorite: function (data, id, val) {
            var class1 = $('.js-menu-bar li.active').text();
            var class2 = $('.js-category li.active').text();
            if (class1 && class2 && data[class1.trim()][class2.trim()]) {
                var item = _.find(data[class1.trim()][class2.trim()], function (obj) {
                    return obj.id.toString() == id.toString();
                });
                item['is_favorite'] = val;

                if (class2.trim() == "我的收藏") {
                    var original = _.find(data[item.class1][item.class2], function (obj) {
                        return obj.id.toString() == id.toString();
                    });
                    original['is_favorite'] = val;
                }
                //yinkw------收藏后在我的收藏不显示-----20150530----
                var favObj = data[item.class1]["我的收藏"];
                if(!favObj && val==1){
                    //之前没有搜藏过该分类,第一次收藏时，刷新页面
                    window.location.reload();
                }else if(favObj){
                    if(val==0){
                        var fav = _.find(favObj, function (obj) {
                            return obj.id.toString() == id.toString();
                        });
                        fav['is_favorite'] = val;
                        favObj.splice(favObj.indexOf(fav),1);
                    }else{
                        favObj.unshift(item);
                    }
                }
                //---------end------------------------------


            }
        },

        storeData: function ($tr) {
            var _count = $tr.find(".js-count").val().trim();
            var _price = $tr.find(".js-price").text().trim();
            var primary_key = $tr.find(".js-primary-key").val().trim();
            var _alias = '';
            var _c_name=$tr.find(".js-c-name").text().trim();
            var _level="";
            if($tr.find(".js-level").text()){
                _level=$tr.find(".js-level").text().trim();
            }
            if ($tr.find(".js-alias").text()) {
                _alias = $tr.find(".js-alias").text().trim();
            }

            if (_count > 0) {
                localStorage[primary_key] = JSON.stringify({
                    alias: _alias,
                    id: primary_key,
                    count: _count,
                    price: _price,
                    is_favorite: 1,
                    c_name:_c_name,
                    level:_level
                });
            } else {
                delete localStorage[primary_key];
            }

            if ($tr.find(".js-standard-item-num").size() > 0) {
                var s_num = parseInt($tr.find(".js-standard-item-num").val());
                $tr.find(".js-chosen-count").text(s_num * _count);
            }
            var $echoSpan = $tr.find(".js-input-echo");
            if ($echoSpan.length > 0) {
                $echoSpan.text(_count);
            }

            $itemCount.html(PlusMinus.totalCount());
            $itemTotal.html(PlusMinus.totalPrice());
        },

        totalPrice: function () {
            var result = 0;
            for (var key in localStorage) {
                if (key != USERKEY && key != COL && /^\d+$/i.test(key)) {
                    obj = JSON.parse(localStorage[key]);
                    var _price = obj.price;
                    if (obj.commodity_total_price && obj.price && obj.commodity_total_price != obj.price) {
                        _price = obj.commodity_total_price;
                    }
                    result += (parseFloat(obj.count) * parseFloat(_price));
                }
            }
            return Math.round(result * 100) / 100;
        },

        totalCount: function () {
            var result = 0;
            for (var key in localStorage) {
                if (key != USERKEY && key != COL && /^\d+$/i.test(key)) {
                    result++;
                }
            }
            return result;
        } ,
        //lazyload of product images
        lazyLoadProductImg: function (container, notLazy) {
            var $container = container,
                $imgs = $container.find('.product-img'),
                containnerTop = $container.offset().top,
                containnerBottom = containnerTop + $container.height();


            //initial
            function lazyLoad() {

                $imgs.each(function (index, element) {
                    var imgTop = $(this).offset().top,
                        $that = $(this);
                    //lazyload
                    if (!notLazy) {
                        if (imgTop < containnerBottom) {
                            $that.attr('src', $that.attr('data-src')).removeClass('product-img');
                        }
                    }
                    //否则直接加载
                    else {
                        $that.attr('src', $that.attr('data-src')).removeClass('product-img');
                    }


                });
            }

            //click to popup the original picture
            $imgs.on('click', function () {
                var height = $(window).height();
                var loadUlr = "/assets/image/common/product-image-loader.gif";
                var wrapper = $('<div class="popup-pic-wrapper" style="width:100%; text-align:center; position:absolute; top:0; left:0; z-index:99; background:url(' + loadUlr + ') center center no-repeat rgba(204,204,204,.8);  height:' + height + 'px;"><span style="display:inline-block; height:100%; vertical-align: middle;"></span><img src="' + $(this).attr('data-srcOriginal') + '" style="max-width:100%; max-height:100%; vertical-align: middle;"></div>');
                wrapper.appendTo('body');
                wrapper.on('click', function () {
                    $(this).remove();
                })
            })

            lazyLoad();
            $container.on('scroll', function () {
                lazyLoad();
            })


        },
        searchItem: function (val, $container) {

            var html = "";
            var level1 = _.values(window.data);
            _.each(level1, function (level1Col) {
                var items = _.flatten(_.values(level1Col));
                _.each(items, function (item) {
                    var _context = item["alias"] + item["name"] + item["own_brand"] + item["sell_brand"] + item["subject"];
                    if (_context.indexOf(val) >= 0) {
                        html += PlusMinus.detailHTMLTemple(item, true, false);
                    }
                });
            });

            $container.html(html);

            PlusMinus.lazyLoadProductImg($('#searchListBlock'), true);
        } ,

        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        },

        touchScroll: function (id) {
            if (this.isTouchDevice()) { //if touch events exist...
                var el = document.getElementById(id);
                var scrollStartPos = 0;

                document.getElementById(id).addEventListener("touchstart", function (event) {
                    scrollStartPos = this.scrollTop + event.touches[0].pageY;
                }, false);

                document.getElementById(id).addEventListener("touchmove", function (event) {
                    this.scrollTop = scrollStartPos - event.touches[0].pageY;
                }, false);
            }
        },
        touchScrollY : function(id){
            if (this.isTouchDevice()) { //if touch events exist...
                var el = document.getElementById(id);
                var scrollStartPos = 0;

                document.getElementById(id).addEventListener("touchstart", function (event) {
                    scrollStartPos = this.scrollLeft + event.touches[0].pageX;
                }, false);

                document.getElementById(id).addEventListener("touchmove", function (event) {
                    this.scrollLeft = scrollStartPos - event.touches[0].pageX;
                }, false);
            }
        },

        propertyExist: function (property) {
            if (property in document.body.style) {
                return true;
            }
            else {
                return false;
            }
        },

        isLowerAndriod3: function () {
            var ua = navigator.userAgent;
            if (ua.indexOf("Android") >= 0) {
                var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
                if (androidversion < 3.0) {
                    return true;
                }
            }
            return false;
        }
    };
})();


