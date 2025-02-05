(function(a) {
    a.fn.dnCalendar = function(n) {
        var l = a(this);
        var b = {};
        var d = new Date();
        var i = null;
        var f = new Date();
        var e = function(q, s) {
            var r = new Date(q, s - 1, 1);
            var o = new Date(q, s, 0);
            var p = r.getDay() + o.getDate();
            return Math.ceil(p / 7)
        };
        var h = function() {
            var Z = d.getMonth();
            var ag = d.getDate();
            var T = d.getFullYear();
            var J = b.monthNames[Z];
            if (b.monthUseShortName == true) {
                J = b.monthNamesShort[Z]
            }
            var X = a("<div id='dncalendar-header' class='dncalendar-header'></div>");
            X.append("<h2>" + J + " " + T + "</h2>");
            var v = false;
            var r = null;
            if (typeof b.minDate !== "undefined") {
                var aj = b.minDate.split("-");
                r = new Date(aj[0], aj[1] - 1, aj[2]);
                if (r.getFullYear() >= T) {
                    if (r.getMonth() >= Z) {
                        v = true
                    }
                }
            }
            var M = false;
            var A = null;
            if (typeof b.maxDate !== "undefined") {
                var F = b.maxDate.split("-");
                A = new Date(F[0], F[1] - 1, F[2]);
                if (A.getFullYear() <= T) {
                    if (A.getMonth() <= Z) {
                        M = true
                    }
                }
            }
            var Q = a("<div id='dncalendar-links' class='dncalendar-links'></div>");
            var W = a("<div id='dncalendar-prev-month' class='dncalendar-prev-month'></div>");
            var B = a("<div id='dncalendar-next-month' class='dncalendar-next-month'></div>");
            if (v) {
                W.addClass("dncalendar-inactive");
                W.removeAttr("id")
            }
            if (M) {
                B.addClass("dncalendar-inactive");
                B.removeAttr("id")
            }
            Q.append(W);
            Q.append(B);
            X.append(Q);
            var C = a("<div id='dncalendar-body' class='dncalendar-body'></div>");
            var P = a("<table></table>");
            var N = b.dayNames;
            if (b.dayUseShortName == true) {
                N = b.dayNamesShort
            }
            var q = a("<thead></thead>");
            var p = a("<tr></tr>");
            var af = N.length;
            for (var ad = 0; ad < af; ad++) {
                p.append("<td " + ((ad == 0 || ad == af - 1) ? 'class="holidays"' : "") + ">" + N[ad] + "</td>")
            }
            q.append(p);
            var u = a("<tbody></tbody>");
            var x = e(T, Z + 1);
            var E = 7;
            var t = 1;
            var o = new Date(T, Z, 1);
            var ah = new Date(T, Z + 1, 0);
            var O = new Date(T, Z, 0);
            var R = O.getDate() - o.getDay() + 1;
            var s = new Date(T, Z + 1, 1);
            var Y = s.getDate();
            var K = 0;
            if (r != null) {
                K = r.getDate()
            }
            var S = 0;
            if (A != null) {
                S = A.getDate()
            }
            var z = "today";
            var ac = " ";
            if (typeof b.dataTitles !== "undefined") {
                if (typeof b.dataTitles.defaultDate !== "undefined") {
                    ac = b.dataTitles.defaultDate
                }
                if (typeof b.dataTitles.today !== "undefined") {
                    z = b.dataTitles.today
                }
            }
            for (var ad = 0; ad < x; ad++) {
                var V = a("<tr></tr>");
                for (var ab = 0; ab < E; ab++) {
                    if ((ad != 0 && ad != x - 1) || (ad == 0 && ab >= o.getDay()) || (ad == x - 1 && ab <= ah.getDay())) {
                        var w = "";
                        var H = "";
                        if (f.getFullYear() == T && f.getMonth() == Z && f.getDate() == t) {
                            w = " today-date ";
                            H = "data-title='" + z + "'"
                        }
                        if (i != null && i.getFullYear() == T && i.getMonth() == Z && i.getDate() == t) {
                            w = " default-date ";
                            H = "data-title='" + ac + "'"
                        }
                        
                        if (ab == 0 || ab == E - 1) {
                            w += " holiday "
                        }
                        if (typeof b.notes !== "undefined") {
                            if (k(new Date(T, Z, t))) {
                                w += " note "
                            }
                        }
                        var U = "<td id='calendarClick' class='" + w + " calendarClick' data-date='" + t + "' data-month='" + (Z + 1) + "' data-year='" + T + "'><div class='entry' " + H + ">" + t + "</div></td>";
                        if (r != null) {
                            if (r.getFullYear() >= T) {
                                if (r.getMonth() >= Z && t < K) {
                                    U = "<td class='" + w + "' data-date='" + t + "' data-month='" + (Z + 1) + "' data-year='" + T + "'><div class='entry' " + H + ">" + t + "</div></td>"
                                }
                            }
                        }
                        if (A != null) {
                            if (A.getFullYear() <= T) {
                                if (A.getMonth() <= Z && t > S) {
                                    U = "<td class='" + w + "' data-date='" + t + "' data-month='" + (Z + 1) + "' data-year='" + T + "'><div class='entry' " + H + ">" + t + "</div></td>"
                                }
                            }
                        }
                        V.append(U);
                        t++
                    } else {
                        if (ad == 0) {
                            var w = "";
                            var H = "";
                            if (f.getFullYear() == O.getFullYear() && f.getMonth() == O.getMonth() && f.getDate() == R) {
                                w = " today-date ";
                                H = "data-title='" + z + "'"
                            }
                            if (i != null && i.getFullYear() == O.getFullYear() && i.getMonth() == O.getMonth() && i.getDate() == R) {
                                w = " default-date ";
                                H = "data-title='" + ac + "'"
                            }

                            if (ab == 0 || ab == E - 1) {
                                w += " holiday "
                            }
                            if (typeof b.notes !== "undefined") {
                                if (k(new Date(O.getFullYear(), O.getMonth(), R))) {
                                    w += " note "
                                }
                            }
                            var U = "<td id='calendarClick' class='" + w + "' data-date='" + R + "' data-month='" + (O.getMonth() + 1) + "' data-year='" + O.getFullYear() + "'><div class='entry' " + H + ">" + R + "</div></td>";
                            if (r != null) {
                                if (r.getFullYear() >= O.getFullYear()) {
                                    if (r.getMonth() > O.getMonth()) {
                                        U = "<td class='" + w + "' data-date='" + R + "' data-month='" + (O.getMonth() + 1) + "' data-year='" + O.getFullYear() + "'><div class='entry' " + H + ">" + R + "</div></td>"
                                    }
                                }
                            }
                            V.append(U);
                            R++
                        }
                        if (ad == x - 1) {
                            var w = "";
                            var H = "";
                            if (f.getFullYear() == s.getFullYear() && f.getMonth() == s.getMonth() && f.getDate() == Y) {
                                w = " today-date ";
                                H = "data-title='" + z + "'"
                            }
                            if (i != null && i.getFullYear() == s.getFullYear() && i.getMonth() == s.getMonth() && i.getDate() == Y) {
                                w = " default-date ";
                                H = "data-title='" + ac + "'"
                            }
                            if (ab == 0 || ab == E - 1) {
                                // ---------------------------------------------
                                w += " holiday "
                            }
                            if (typeof b.notes !== "undefined") {
                                if (k(new Date(s.getFullYear(), s.getMonth(), Y))) {
                                    w += " note "
                                }
                            }
                            var U = "<td id='calendarClick' class='" + w + "' data-date='" + Y + "' data-month='" + (s.getMonth() + 1) + "' data-year='" + s.getFullYear() + "'><div class='entry' " + H + ">" + Y + "</div></td>";
                            if (A != null) {
                                if (A.getFullYear() <= s.getFullYear()) {
                                    if (A.getMonth() <= s.getMonth()) {
                                        if (A.getMonth() < s.getMonth()) {
                                            U = "<td class='" + w + "' data-date='" + Y + "' data-month='" + (s.getMonth() + 1) + "' data-year='" + s.getFullYear() + "'><div class='entry' " + H + ">" + Y + "</div></td>"
                                        } else {
                                            if (S < Y) {
                                                U = "<td class='" + w + "' data-date='" + Y + "' data-month='" + (s.getMonth() + 1) + "' data-year='" + s.getFullYear() + "'><div class='entry' " + H + ">" + Y + "</div></td>"
                                            }
                                        }
                                    }
                                }
                            }
                            V.append(U);
                            Y++
                        }
                    }
                }
                u.append(V)
            }
            var ai = "";
            if (b.showNotes) {
                var aa = m();
                var L = aa.length;
                if (L > 0) {
                    ai = a("<ul class='dncalendar-note-list'></ul>");
                    for (var ad = 0; ad < L; ad++) {
                        var ae = aa[ad].date;
                        var G = aa[ad].notes;
                        var D = G.length;
                        var I = "";
                        I += "<li class='date'>";
                        I += "<span>" + ae + "</span> ";
                        if (D > 0) {
                            I += " : ";
                            for (var ab = 0; ab < D; ab++) {
                                I += G[ab];
                                if (D <= ab) {
                                    I += ", "
                                }
                            }
                        }
                        I += "</li>";
                        ai.append(I)
                    }
                }
            }
            P.append(q);
            P.append(u);
            C.append(P);
            l.html("");
            l.append(X);
            l.append(C);
            l.append(ai)
        };
        var k = function(p) {
            var s = b.notes.length;
            for (var r = 0; r < s; r++) {
                var q = b.notes[r].date.split("-");
                var o = new Date(q[0], q[1] - 1, q[2]);
                if (o.getFullYear() == p.getFullYear() && o.getMonth() == p.getMonth() && o.getDate() == p.getDate()) {
                    return true
                }
            }
            return false
        };
        var m = function() {
            var p = [];
            var t = b.notes.length;
            for (var s = 0; s < t; s++) {
                var r = b.notes[s].date.split("-");
                var o = new Date(r[0], r[1] - 1, r[2]);
                if (o.getFullYear() == d.getFullYear() && o.getMonth() == d.getMonth()) {
                    var q = {};
                    q.date = o.getDate();
                    q.notes = b.notes[s].note;
                    p.push(q)
                }
            }
            return p
        };
        var g = function() {
            var o = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            var p = o.getDate();
            var r = o.getMonth();
            var q = o.getFullYear();
            d = new Date(q, r, p);
            h()
        };
        var c = function() {
            var q = new Date(d.getFullYear(), d.getMonth() - 1, 1);
            var o = q.getDate();
            var r = q.getMonth();
            var p = q.getFullYear();
            d = new Date(p, r, o);
            h()
        };
        var j = function() {
            a("body").on("click", "#calendarClick", function() {
                var o = a(this).data("date");
                var p = a(this).data("month");
                var q = a(this).data("year");
                b.dayClick(new Date(q, p - 1, o), l)
            });
            a("body").on("click", "#dncalendar-prev-month", function() {
                c()
            });
            a("body").on("click", "#dncalendar-next-month", function() {
                g()
            })
        };
        return {
            build: function() {
                b = a.extend({
                    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Dec"],
                    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    dayUseShortName: false,
                    monthUseShortName: false,
                    showNotes: false
                }, n);
                if (typeof b.defaultDate !== "undefined") {
                    var o = b.defaultDate.split("-");
                    d = new Date(o[0], o[1] - 1, o[2]);
                    i = d
                }
                h();
                j()
            },
            update: function(p) {
                console.log("options", p);
                b = a.extend(b, p);
                if (typeof b.defaultDate !== "undefined") {
                    var o = b.defaultDate.split("-");
                    d = new Date(o[0], o[1] - 1, o[2]);
                    i = d
                }
                h()
            }
        }
    }
}(jQuery));