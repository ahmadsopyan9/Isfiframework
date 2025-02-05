/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (u) { "object" === typeof module && module.exports ? (u["default"] = u, module.exports = u) : "function" === typeof define && define.amd ? define("highcharts/highcharts-more", ["highcharts"], function (y) { u(y); u.Highcharts = y; return u }) : u("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (u) {
    function y(a, q, e, m) { a.hasOwnProperty(q) || (a[q] = m.apply(null, e)) } u = u ? u._modules : {}; y(u, "parts-more/Pane.js", [u["parts/Globals.js"]], function (a) {
        function q(b, f) { this.init(b, f) } var e = a.CenteredSeriesMixin, m = a.extend,
            n = a.merge, b = a.splat; m(q.prototype, {
                coll: "pane", init: function (b, f) { this.chart = f; this.background = []; f.pane.push(this); this.setOptions(b) }, setOptions: function (b) { this.options = n(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, b) }, render: function () {
                    var a = this.options, f = this.options.background, d = this.chart.renderer; this.group || (this.group = d.g("pane-group").attr({ zIndex: a.zIndex || 0 }).add()); this.updateCenter(); if (f) for (f = b(f), a = Math.max(f.length, this.background.length || 0), d = 0; d < a; d++)f[d] &&
                        this.axis ? this.renderBackground(n(this.defaultBackgroundOptions, f[d]), d) : this.background[d] && (this.background[d] = this.background[d].destroy(), this.background.splice(d, 1))
                }, renderBackground: function (b, f) {
                    var d = "animate", a = { "class": "highcharts-pane " + (b.className || "") }; this.chart.styledMode || m(a, { fill: b.backgroundColor, stroke: b.borderColor, "stroke-width": b.borderWidth }); this.background[f] || (this.background[f] = this.chart.renderer.path().add(this.group), d = "attr"); this.background[f][d]({
                        d: this.axis.getPlotBandPath(b.from,
                            b.to, b)
                    }).attr(a)
                }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }, updateCenter: function (b) { this.center = (b || this.axis || {}).center = e.getCenter.call(this) }, update: function (b, a) {
                    n(!0, this.options, b); n(!0, this.chart.options.pane, b); this.setOptions(this.options);
                    this.render(); this.chart.axes.forEach(function (b) { b.pane === this && (b.pane = null, b.update({}, a)) }, this)
                }
            }); a.Pane = q
    }); y(u, "parts-more/RadialAxis.js", [u["parts/Globals.js"]], function (a) {
        var q = a.addEvent, e = a.Axis, m = a.extend, n = a.merge, b = a.noop, g = a.pick, f = a.pInt, d = a.Tick, v = a.wrap, t = a.correctFloat, x, c, k = e.prototype, p = d.prototype; x = { getOffset: b, redraw: function () { this.isDirty = !1 }, render: function () { this.isDirty = !1 }, setScale: b, setCategories: b, setTitle: b }; c = {
            defaultRadialGaugeOptions: {
                labels: {
                    align: "center", x: 0,
                    y: null
                }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2
            }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: { gridLineInterpolation: "circle", labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }, setOptions: function (c) {
                c =
                this.options = n(this.defaultOptions, this.defaultRadialOptions, c); c.plotBands || (c.plotBands = []); a.fireEvent(this, "afterSetOptions")
            }, getOffset: function () { k.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }, getLinePath: function (c, l) {
                c = this.center; var h = this.chart, r = g(l, c[2] / 2 - this.offset); this.isCircular || void 0 !== l ? (l = this.chart.renderer.symbols.arc(this.left + c[0], this.top + c[1], r, r, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }), l.xBounds = [this.left + c[0]], l.yBounds = [this.top +
                    c[1] - r]) : (l = this.postTranslate(this.angleRad, r), l = ["M", c[0] + h.plotLeft, c[1] + h.plotTop, "L", l.x, l.y]); return l
            }, setAxisTranslation: function () { k.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }, beforeSetTickPositions: function () {
                if (this.autoConnect = this.isCircular && void 0 === g(this.userMax, this.options.max) && t(this.endAngleRad -
                    this.startAngleRad) === t(2 * Math.PI)) this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0
            }, setAxisSize: function () { k.setAxisSize.call(this); this.isRadial && (this.pane.updateCenter(this), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * g(this.sector, 1) / 2) }, getPosition: function (c, l) { return this.postTranslate(this.isCircular ? this.translate(c) : this.angleRad, g(this.isCircular ? l : this.translate(c), this.center[2] / 2) - this.offset) },
            postTranslate: function (c, l) { var h = this.chart, r = this.center; c = this.startAngleRad + c; return { x: h.plotLeft + r[0] + Math.cos(c) * l, y: h.plotTop + r[1] + Math.sin(c) * l } }, getPlotBandPath: function (c, l, h) {
                var r = this.center, b = this.startAngleRad, w = r[2] / 2, k = [g(h.outerRadius, "100%"), h.innerRadius, g(h.thickness, 10)], p = Math.min(this.offset, 0), d = /%$/, a, t; a = this.isCircular; "polygon" === this.options.gridLineInterpolation ? k = this.getPlotLinePath({ value: c }).concat(this.getPlotLinePath({ value: l, reverse: !0 })) : (c = Math.max(c, this.min),
                    l = Math.min(l, this.max), a || (k[0] = this.translate(c), k[1] = this.translate(l)), k = k.map(function (h) { d.test(h) && (h = f(h, 10) * w / 100); return h }), "circle" !== h.shape && a ? (c = b + this.translate(c), l = b + this.translate(l)) : (c = -Math.PI / 2, l = 1.5 * Math.PI, t = !0), k[0] -= p, k[2] -= p, k = this.chart.renderer.symbols.arc(this.left + r[0], this.top + r[1], k[0], k[0], { start: Math.min(c, l), end: Math.max(c, l), innerR: g(k[1], k[0] - k[2]), open: t }), a && (a = (l + c) / 2, p = this.left + r[0] + r[2] / 2 * Math.cos(a), k.xBounds = a > -Math.PI / 2 && a < Math.PI / 2 ? [p, this.chart.plotWidth] :
                        [0, p], k.yBounds = [this.top + r[1] + r[2] / 2 * Math.sin(a)], k.yBounds[0] += a > -Math.PI && 0 > a || a > Math.PI ? -10 : 10)); return k
            }, getPlotLinePath: function (c) {
                var l = this, h = l.center, r = l.chart, b = c.value; c = c.reverse; var w = l.getPosition(b), k, p, a; l.isCircular ? a = ["M", h[0] + r.plotLeft, h[1] + r.plotTop, "L", w.x, w.y] : "circle" === l.options.gridLineInterpolation ? (b = l.translate(b), a = l.getLinePath(0, b)) : (r.xAxis.forEach(function (h) { h.pane === l.pane && (k = h) }), a = [], b = l.translate(b), h = k.tickPositions, k.autoConnect && (h = h.concat([h[0]])), c &&
                    (h = [].concat(h).reverse()), h.forEach(function (h, c) { p = k.getPosition(h, b); a.push(c ? "L" : "M", p.x, p.y) })); return a
            }, getTitlePosition: function () { var c = this.center, l = this.chart, h = this.options.title; return { x: l.plotLeft + c[0] + (h.x || 0), y: l.plotTop + c[1] - { high: .5, middle: .25, low: 0 }[h.align] * c[2] + (h.y || 0) } }
        }; q(e, "init", function (b) {
            var l = this, h = this.chart, r = h.angular, k = h.polar, w = this.isXAxis, p = r && w, a, d = h.options; b = b.userOptions.pane || 0; b = this.pane = h.pane && h.pane[b]; if (r) {
                if (m(this, p ? x : c), a = !w) this.defaultRadialOptions =
                    this.defaultRadialGaugeOptions
            } else k && (m(this, c), this.defaultRadialOptions = (a = w) ? this.defaultRadialXOptions : n(this.defaultYAxisOptions, this.defaultRadialYOptions)); r || k ? (this.isRadial = !0, h.inverted = !1, d.chart.zoomType = null, h.labelCollectors.push(function () { if (l.isRadial && l.tickPositions && !0 !== l.options.labels.allowOverlap) return l.tickPositions.map(function (h) { return l.ticks[h] && l.ticks[h].label }).filter(function (h) { return !!h }) })) : this.isRadial = !1; b && a && (b.axis = this); this.isCircular = a
        }); q(e, "afterInit",
            function () { var c = this.chart, l = this.options, h = this.pane, r = h && h.options; c.angular && this.isXAxis || !h || !c.angular && !c.polar || (this.angleRad = (l.angle || 0) * Math.PI / 180, this.startAngleRad = (r.startAngle - 90) * Math.PI / 180, this.endAngleRad = (g(r.endAngle, r.startAngle + 360) - 90) * Math.PI / 180, this.offset = l.offset || 0) }); q(e, "autoLabelAlign", function (c) { this.isRadial && (c.align = void 0, c.preventDefault()) }); q(d, "afterGetPosition", function (c) { this.axis.getPosition && m(c.pos, this.axis.getPosition(this.pos)) }); q(d, "afterGetLabelPosition",
                function (c) {
                    var l = this.axis, h = this.label, r = h.getBBox(), b = l.options.labels, k = b.y, w, p = 20, d = b.align, f = (l.translate(this.pos) + l.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360, t = Math.round(f), m = "end", v = 0 > t ? t + 360 : t, n = v, q = 0, x = 0, e = null === b.y ? .3 * -r.height : 0; if (l.isRadial) {
                        w = l.getPosition(this.pos, l.center[2] / 2 + a.relativeLength(g(b.distance, -25), l.center[2] / 2, -l.center[2] / 2)); "auto" === b.rotation ? h.attr({ rotation: f }) : null === k && (k = l.chart.renderer.fontMetrics(h.styles && h.styles.fontSize).b - r.height / 2); null === d && (l.isCircular ?
                            (r.width > l.len * l.tickInterval / (l.max - l.min) && (p = 0), d = f > p && f < 180 - p ? "left" : f > 180 + p && f < 360 - p ? "right" : "center") : d = "center", h.attr({ align: d })); if ("auto" === d && 2 === l.tickPositions.length && l.isCircular) {
                            90 < v && 180 > v ? v = 180 - v : 270 < v && 360 >= v && (v = 540 - v); 180 < n && 360 >= n && (n = 360 - n); if (l.pane.options.startAngle === t || l.pane.options.startAngle === t + 360 || l.pane.options.startAngle === t - 360) m = "start"; d = -90 <= t && 90 >= t || -360 <= t && -270 >= t || 270 <= t && 360 >= t ? "start" === m ? "right" : "left" : "start" === m ? "left" : "right"; 70 < n && 110 > n && (d = "center");
                                15 > v || 180 <= v && 195 > v ? q = .3 * r.height : 15 <= v && 35 >= v ? q = "start" === m ? 0 : .75 * r.height : 195 <= v && 215 >= v ? q = "start" === m ? .75 * r.height : 0 : 35 < v && 90 >= v ? q = "start" === m ? .25 * -r.height : r.height : 215 < v && 270 >= v && (q = "start" === m ? r.height : .25 * -r.height); 15 > n ? x = "start" === m ? .15 * -r.height : .15 * r.height : 165 < n && 180 >= n && (x = "start" === m ? .15 * r.height : .15 * -r.height); h.attr({ align: d }); h.translate(x, q + e)
                            } c.pos.x = w.x + b.x; c.pos.y = w.y + k
                    }
                }); v(p, "getMarkPath", function (c, l, h, b, k, p, a) {
                    var r = this.axis; r.isRadial ? (c = r.getPosition(this.pos, r.center[2] /
                        2 + b), l = ["M", l, h, "L", c.x, c.y]) : l = c.call(this, l, h, b, k, p, a); return l
                })
    }); y(u, "parts-more/AreaRangeSeries.js", [u["parts/Globals.js"]], function (a) {
        var q = a.pick, e = a.extend, m = a.isArray, n = a.defined, b = a.seriesType, g = a.seriesTypes, f = a.Series.prototype, d = a.Point.prototype; b("arearange", "area", {
            lineWidth: 1, threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' }, trackByArea: !0,
            dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }
        }, {
            pointArrayMap: ["low", "high"], toYData: function (b) { return [b.low, b.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (b) { var a = this.chart, d = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh); b.plotHighX = d.x - a.plotLeft; b.plotHigh = d.y - a.plotTop; b.plotLowX = b.plotX }, translate: function () {
                var b = this, a = b.yAxis, d = !!b.modifyValue; g.area.prototype.translate.apply(b); b.points.forEach(function (c) {
                    var k = c.low, p =
                        c.high, w = c.plotY; null === p || null === k ? (c.isNull = !0, c.plotY = null) : (c.plotLow = w, c.plotHigh = a.translate(d ? b.modifyValue(p, c) : p, 0, 1, 0, 1), d && (c.yBottom = c.plotHigh))
                }); this.chart.polar && this.points.forEach(function (c) { b.highToXY(c); c.tooltipPos = [(c.plotHighX + c.plotLowX) / 2, (c.plotHigh + c.plotLow) / 2] })
            }, getGraphPath: function (b) {
                var a = [], d = [], c, k = g.area.prototype.getGraphPath, p, w, l; l = this.options; var h = this.chart.polar && !1 !== l.connectEnds, r = l.connectNulls, A = l.step; b = b || this.points; for (c = b.length; c--;)p = b[c],
                    p.isNull || h || r || b[c + 1] && !b[c + 1].isNull || d.push({ plotX: p.plotX, plotY: p.plotY, doCurve: !1 }), w = { polarPlotY: p.polarPlotY, rectPlotX: p.rectPlotX, yBottom: p.yBottom, plotX: q(p.plotHighX, p.plotX), plotY: p.plotHigh, isNull: p.isNull }, d.push(w), a.push(w), p.isNull || h || r || b[c - 1] && !b[c - 1].isNull || d.push({ plotX: p.plotX, plotY: p.plotY, doCurve: !1 }); b = k.call(this, b); A && (!0 === A && (A = "left"), l.step = { left: "right", center: "center", right: "left" }[A]); a = k.call(this, a); d = k.call(this, d); l.step = A; l = [].concat(b, a); this.chart.polar ||
                        "M" !== d[0] || (d[0] = "L"); this.graphPath = l; this.areaPath = b.concat(d); l.isArea = !0; l.xMap = b.xMap; this.areaPath.xMap = b.xMap; return l
            }, drawDataLabels: function () {
                var b = this.points, a = b.length, d, c = [], k = this.options.dataLabels, p, w, l = this.chart.inverted, h, r; m(k) ? 1 < k.length ? (h = k[0], r = k[1]) : (h = k[0], r = { enabled: !1 }) : (h = e({}, k), h.x = k.xHigh, h.y = k.yHigh, r = e({}, k), r.x = k.xLow, r.y = k.yLow); if (h.enabled || this._hasPointLabels) {
                    for (d = a; d--;)if (p = b[d]) w = h.inside ? p.plotHigh < p.plotLow : p.plotHigh > p.plotLow, p.y = p.high, p._plotY =
                        p.plotY, p.plotY = p.plotHigh, c[d] = p.dataLabel, p.dataLabel = p.dataLabelUpper, p.below = w, l ? h.align || (h.align = w ? "right" : "left") : h.verticalAlign || (h.verticalAlign = w ? "top" : "bottom"); this.options.dataLabels = h; f.drawDataLabels && f.drawDataLabels.apply(this, arguments); for (d = a; d--;)if (p = b[d]) p.dataLabelUpper = p.dataLabel, p.dataLabel = c[d], delete p.dataLabels, p.y = p.low, p.plotY = p._plotY
                } if (r.enabled || this._hasPointLabels) {
                    for (d = a; d--;)if (p = b[d]) w = r.inside ? p.plotHigh < p.plotLow : p.plotHigh > p.plotLow, p.below = !w, l ? r.align ||
                        (r.align = w ? "left" : "right") : r.verticalAlign || (r.verticalAlign = w ? "bottom" : "top"); this.options.dataLabels = r; f.drawDataLabels && f.drawDataLabels.apply(this, arguments)
                } if (h.enabled) for (d = a; d--;)if (p = b[d]) p.dataLabels = [p.dataLabelUpper, p.dataLabel].filter(function (c) { return !!c }); this.options.dataLabels = k
            }, alignDataLabel: function () { g.column.prototype.alignDataLabel.apply(this, arguments) }, drawPoints: function () {
                var b = this.points.length, d, m; f.drawPoints.apply(this, arguments); for (m = 0; m < b;)d = this.points[m], d.origProps =
                    { plotY: d.plotY, plotX: d.plotX, isInside: d.isInside, negative: d.negative, zone: d.zone, y: d.y }, d.lowerGraphic = d.graphic, d.graphic = d.upperGraphic, d.plotY = d.plotHigh, n(d.plotHighX) && (d.plotX = d.plotHighX), d.y = d.high, d.negative = d.high < (this.options.threshold || 0), d.zone = this.zones.length && d.getZone(), this.chart.polar || (d.isInside = d.isTopInside = void 0 !== d.plotY && 0 <= d.plotY && d.plotY <= this.yAxis.len && 0 <= d.plotX && d.plotX <= this.xAxis.len), m++; f.drawPoints.apply(this, arguments); for (m = 0; m < b;)d = this.points[m], d.upperGraphic =
                        d.graphic, d.graphic = d.lowerGraphic, a.extend(d, d.origProps), delete d.origProps, m++
            }, setStackedPoints: a.noop
            }, {
                setState: function () {
                    var b = this.state, a = this.series, f = a.chart.polar; n(this.plotHigh) || (this.plotHigh = a.yAxis.toPixels(this.high, !0)); n(this.plotLow) || (this.plotLow = this.plotY = a.yAxis.toPixels(this.low, !0)); a.stateMarkerGraphic && (a.lowerStateMarkerGraphic = a.stateMarkerGraphic, a.stateMarkerGraphic = a.upperStateMarkerGraphic); this.graphic = this.upperGraphic; this.plotY = this.plotHigh; f && (this.plotX =
                        this.plotHighX); d.setState.apply(this, arguments); this.state = b; this.plotY = this.plotLow; this.graphic = this.lowerGraphic; f && (this.plotX = this.plotLowX); a.stateMarkerGraphic && (a.upperStateMarkerGraphic = a.stateMarkerGraphic, a.stateMarkerGraphic = a.lowerStateMarkerGraphic, a.lowerStateMarkerGraphic = void 0); d.setState.apply(this, arguments)
                }, haloPath: function () {
                    var b = this.series.chart.polar, a = []; this.plotY = this.plotLow; b && (this.plotX = this.plotLowX); this.isInside && (a = d.haloPath.apply(this, arguments)); this.plotY =
                        this.plotHigh; b && (this.plotX = this.plotHighX); this.isTopInside && (a = a.concat(d.haloPath.apply(this, arguments))); return a
                }, destroyElements: function () { ["lowerGraphic", "upperGraphic"].forEach(function (b) { this[b] && (this[b] = this[b].destroy()) }, this); this.graphic = null; return d.destroyElements.apply(this, arguments) }
            })
    }); y(u, "parts-more/AreaSplineRangeSeries.js", [u["parts/Globals.js"]], function (a) { var q = a.seriesType; q("areasplinerange", "arearange", null, { getPointSpline: a.seriesTypes.spline.prototype.getPointSpline }) });
    y(u, "parts-more/ColumnRangeSeries.js", [u["parts/Globals.js"]], function (a) {
        var q = a.defaultPlotOptions, e = a.merge, m = a.noop, n = a.pick, b = a.seriesType, g = a.seriesTypes.column.prototype; b("columnrange", "arearange", e(q.column, q.arearange, { pointRange: null, marker: null, states: { hover: { halo: !1 } } }), {
            translate: function () {
                var b = this, d = b.yAxis, a = b.xAxis, m = a.startAngleRad, q, c = b.chart, k = b.xAxis.isRadial, p = Math.max(c.chartWidth, c.chartHeight) + 999, w; g.translate.apply(b); b.points.forEach(function (l) {
                    var h = l.shapeArgs, r =
                        b.options.minPointLength, A, f; l.plotHigh = w = Math.min(Math.max(-p, d.translate(l.high, 0, 1, 0, 1)), p); l.plotLow = Math.min(Math.max(-p, l.plotY), p); f = w; A = n(l.rectPlotY, l.plotY) - w; Math.abs(A) < r ? (r -= A, A += r, f -= r / 2) : 0 > A && (A *= -1, f -= A); k ? (q = l.barX + m, l.shapeType = "path", l.shapeArgs = { d: b.polarArc(f + A, f, q, q + l.pointWidth) }) : (h.height = A, h.y = f, l.tooltipPos = c.inverted ? [d.len + d.pos - c.plotLeft - f - A / 2, a.len + a.pos - c.plotTop - h.x - h.width / 2, A] : [a.left - c.plotLeft + h.x + h.width / 2, d.pos - c.plotTop + f + A / 2, A])
                })
            }, directTouch: !0, trackerGroups: ["group",
                "dataLabelsGroup"], drawGraph: m, getSymbol: m, crispCol: function () { return g.crispCol.apply(this, arguments) }, drawPoints: function () { return g.drawPoints.apply(this, arguments) }, drawTracker: function () { return g.drawTracker.apply(this, arguments) }, getColumnMetrics: function () { return g.getColumnMetrics.apply(this, arguments) }, pointAttribs: function () { return g.pointAttribs.apply(this, arguments) }, animate: function () { return g.animate.apply(this, arguments) }, polarArc: function () { return g.polarArc.apply(this, arguments) },
            translate3dPoints: function () { return g.translate3dPoints.apply(this, arguments) }, translate3dShapes: function () { return g.translate3dShapes.apply(this, arguments) }
        }, { setState: g.pointClass.prototype.setState })
    }); y(u, "parts-more/ColumnPyramidSeries.js", [u["parts/Globals.js"]], function (a) {
        var q = a.pick, e = a.seriesType, m = a.seriesTypes.column.prototype; e("columnpyramid", "column", {}, {
            translate: function () {
                var a = this, b = a.chart, g = a.options, f = a.dense = 2 > a.closestPointRange * a.xAxis.transA, f = a.borderWidth = q(g.borderWidth,
                    f ? 0 : 1), d = a.yAxis, v = g.threshold, e = a.translatedThreshold = d.getThreshold(v), x = q(g.minPointLength, 5), c = a.getColumnMetrics(), k = c.width, p = a.barW = Math.max(k, 1 + 2 * f), w = a.pointXOffset = c.offset; b.inverted && (e -= .5); g.pointPadding && (p = Math.ceil(p)); m.translate.apply(a); a.points.forEach(function (c) {
                        var h = q(c.yBottom, e), r = 999 + Math.abs(h), l = Math.min(Math.max(-r, c.plotY), d.len + r), r = c.plotX + w, f = p / 2, m = Math.min(l, h), h = Math.max(l, h) - m, n, t, E, C, B, D; c.barX = r; c.pointWidth = k; c.tooltipPos = b.inverted ? [d.len + d.pos - b.plotLeft -
                            l, a.xAxis.len - r - f, h] : [r + f, l + d.pos - b.plotTop, h]; l = v + (c.total || c.y); "percent" === g.stacking && (l = v + (0 > c.y) ? -100 : 100); l = d.toPixels(l, !0); n = b.plotHeight - l - (b.plotHeight - e); t = f * (m - l) / n; E = f * (m + h - l) / n; n = r - t + f; t = r + t + f; C = r + E + f; E = r - E + f; B = m - x; D = m + h; 0 > c.y && (B = m, D = m + h + x); b.inverted && (C = b.plotWidth - m, n = l - (b.plotWidth - e), t = f * (l - C) / n, E = f * (l - (C - h)) / n, n = r + f + t, t = n - 2 * t, C = r - E + f, E = r + E + f, B = m, D = m + h - x, 0 > c.y && (D = m + h + x)); c.shapeType = "path"; c.shapeArgs = { x: n, y: B, width: t - n, height: h, d: ["M", n, B, "L", t, B, C, D, E, D, "Z"] }
                    })
            }
        })
    }); y(u, "parts-more/GaugeSeries.js",
        [u["parts/Globals.js"]], function (a) {
            var q = a.isNumber, e = a.merge, m = a.pick, n = a.pInt, b = a.Series, g = a.seriesType, f = a.TrackerMixin; g("gauge", "line", { dataLabels: { borderColor: "#cccccc", borderRadius: 3, borderWidth: 1, crop: !1, defer: !1, enabled: !0, verticalAlign: "top", y: 15, zIndex: 2 }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 }, {
                angular: !0, directTouch: !0, drawGraph: a.noop, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
                    var b = this.yAxis, a = this.options,
                    f = b.center; this.generatePoints(); this.points.forEach(function (d) {
                        var c = e(a.dial, d.dial), k = n(m(c.radius, 80)) * f[2] / 200, p = n(m(c.baseLength, 70)) * k / 100, w = n(m(c.rearLength, 10)) * k / 100, l = c.baseWidth || 3, h = c.topWidth || 1, r = a.overshoot, A = b.startAngleRad + b.translate(d.y, null, null, null, !0); q(r) ? (r = r / 180 * Math.PI, A = Math.max(b.startAngleRad - r, Math.min(b.endAngleRad + r, A))) : !1 === a.wrap && (A = Math.max(b.startAngleRad, Math.min(b.endAngleRad, A))); A = 180 * A / Math.PI; d.shapeType = "path"; d.shapeArgs = {
                            d: c.path || ["M", -w, -l / 2, "L",
                                p, -l / 2, k, -h / 2, k, h / 2, p, l / 2, -w, l / 2, "z"], translateX: f[0], translateY: f[1], rotation: A
                        }; d.plotX = f[0]; d.plotY = f[1]
                    })
                }, drawPoints: function () {
                    var b = this, a = b.chart, f = b.yAxis.center, n = b.pivot, c = b.options, k = c.pivot, p = a.renderer; b.points.forEach(function (d) {
                        var l = d.graphic, h = d.shapeArgs, r = h.d, k = e(c.dial, d.dial); l ? (l.animate(h), h.d = r) : d.graphic = p[d.shapeType](h).attr({ rotation: h.rotation, zIndex: 1 }).addClass("highcharts-dial").add(b.group); if (!a.styledMode) d.graphic[l ? "animate" : "attr"]({
                            stroke: k.borderColor || "none",
                            "stroke-width": k.borderWidth || 0, fill: k.backgroundColor || "#000000"
                        })
                    }); n ? n.animate({ translateX: f[0], translateY: f[1] }) : (b.pivot = p.circle(0, 0, m(k.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(f[0], f[1]).add(b.group), a.styledMode || b.pivot.attr({ "stroke-width": k.borderWidth || 0, stroke: k.borderColor || "#cccccc", fill: k.backgroundColor || "#000000" }))
                }, animate: function (b) {
                    var a = this; b || (a.points.forEach(function (b) {
                        var d = b.graphic; d && (d.attr({ rotation: 180 * a.yAxis.startAngleRad / Math.PI }),
                            d.animate({ rotation: b.shapeArgs.rotation }, a.options.animation))
                    }), a.animate = null)
                }, render: function () { this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); b.prototype.render.call(this); this.group.clip(this.chart.clipRect) }, setData: function (a, f) { b.prototype.setData.call(this, a, !1); this.processData(); this.generatePoints(); m(f, !0) && this.chart.redraw() }, hasData: function () { return !!this.points.length }, drawTracker: f && f.drawTrackerPoint
            }, {
                setState: function (b) {
                this.state =
                    b
                }
                })
        }); y(u, "parts-more/BoxPlotSeries.js", [u["parts/Globals.js"]], function (a) {
            var q = a.noop, e = a.pick, m = a.seriesType, n = a.seriesTypes; m("boxplot", "column", {
                threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e' }, whiskerLength: "50%", fillColor: "#ffffff",
                lineWidth: 1, medianWidth: 2, whiskerWidth: 2
            }, {
                pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (b) { return [b.low, b.q1, b.median, b.q3, b.high] }, pointValKey: "high", pointAttribs: function () { return {} }, drawDataLabels: q, translate: function () { var b = this.yAxis, a = this.pointArrayMap; n.column.prototype.translate.apply(this); this.points.forEach(function (f) { a.forEach(function (a) { null !== f[a] && (f[a + "Plot"] = b.translate(f[a], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
                    var b = this, a = b.options, f = b.chart, d = f.renderer,
                    m, n, q, c, k, p, w = 0, l, h, r, A, H = !1 !== b.doQuartiles, I, G = b.options.whiskerLength; b.points.forEach(function (g) {
                        var v = g.graphic, t = v ? "animate" : "attr", x = g.shapeArgs, K = {}, u = {}, L = {}, F = {}, z = g.color || b.color; void 0 !== g.plotY && (l = x.width, h = Math.floor(x.x), r = h + l, A = Math.round(l / 2), m = Math.floor(H ? g.q1Plot : g.lowPlot), n = Math.floor(H ? g.q3Plot : g.lowPlot), q = Math.floor(g.highPlot), c = Math.floor(g.lowPlot), v || (g.graphic = v = d.g("point").add(b.group), g.stem = d.path().addClass("highcharts-boxplot-stem").add(v), G && (g.whiskers = d.path().addClass("highcharts-boxplot-whisker").add(v)),
                            H && (g.box = d.path(void 0).addClass("highcharts-boxplot-box").add(v)), g.medianShape = d.path(void 0).addClass("highcharts-boxplot-median").add(v)), f.styledMode || (u.stroke = g.stemColor || a.stemColor || z, u["stroke-width"] = e(g.stemWidth, a.stemWidth, a.lineWidth), u.dashstyle = g.stemDashStyle || a.stemDashStyle, g.stem.attr(u), G && (L.stroke = g.whiskerColor || a.whiskerColor || z, L["stroke-width"] = e(g.whiskerWidth, a.whiskerWidth, a.lineWidth), g.whiskers.attr(L)), H && (K.fill = g.fillColor || a.fillColor || z, K.stroke = a.lineColor ||
                                z, K["stroke-width"] = a.lineWidth || 0, g.box.attr(K)), F.stroke = g.medianColor || a.medianColor || z, F["stroke-width"] = e(g.medianWidth, a.medianWidth, a.lineWidth), g.medianShape.attr(F)), p = g.stem.strokeWidth() % 2 / 2, w = h + A + p, g.stem[t]({ d: ["M", w, n, "L", w, q, "M", w, m, "L", w, c] }), H && (p = g.box.strokeWidth() % 2 / 2, m = Math.floor(m) + p, n = Math.floor(n) + p, h += p, r += p, g.box[t]({ d: ["M", h, n, "L", h, m, "L", r, m, "L", r, n, "L", h, n, "z"] })), G && (p = g.whiskers.strokeWidth() % 2 / 2, q += p, c += p, I = /%$/.test(G) ? A * parseFloat(G) / 100 : G / 2, g.whiskers[t]({
                                    d: ["M",
                                        w - I, q, "L", w + I, q, "M", w - I, c, "L", w + I, c]
                                })), k = Math.round(g.medianPlot), p = g.medianShape.strokeWidth() % 2 / 2, k += p, g.medianShape[t]({ d: ["M", h, k, "L", r, k] }))
                    })
                }, setStackedPoints: q
                })
        }); y(u, "parts-more/ErrorBarSeries.js", [u["parts/Globals.js"]], function (a) {
            var q = a.noop, e = a.seriesType, m = a.seriesTypes; e("errorbar", "boxplot", {
                color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' },
                whiskerWidth: null
            }, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: m.arearange ? function () { var a = this.pointValKey; m.arearange.prototype.drawDataLabels.call(this); this.data.forEach(function (b) { b.y = b[a] }) } : q, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || m.column.prototype.getColumnMetrics.call(this) } })
        }); y(u, "parts-more/WaterfallSeries.js", [u["parts/Globals.js"]], function (a) {
            var q =
                a.correctFloat, e = a.isNumber, m = a.pick, n = a.objectEach, b = a.arrayMin, g = a.arrayMax, f = a.addEvent, d = a.Axis, v = a.Chart, t = a.Point, x = a.Series, c = a.StackItem, k = a.seriesType, p = a.seriesTypes; f(d, "afterInit", function () { this.isXAxis || (this.waterfallStacks = { changed: !1 }) }); f(v, "beforeRedraw", function () { for (var c = this.axes, b = this.series, h = b.length; h--;)b[h].options.stacking && (c.forEach(function (c) { c.isXAxis || (c.waterfallStacks.changed = !0) }), h = 0) }); f(d, "afterRender", function () {
                    var c = this.options.stackLabels; c && c.enabled &&
                        this.waterfallStacks && this.renderWaterfallStackTotals()
                }); d.prototype.renderWaterfallStackTotals = function () { var b = this.waterfallStacks, a = this.stackTotalGroup, h = new c(this, this.options.stackLabels, !1, 0, void 0); this.dummyStackItem = h; n(b, function (b) { n(b, function (b) { h.total = b.stackTotal; b.label && (h.label = b.label); c.prototype.render.call(h, a); b.label = h.label; delete h.label }) }); h.total = null }; k("waterfall", "column", {
                    dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "Dot", borderColor: "#333333",
                    states: { hover: { lineWidthPlus: 0 } }
                }, {
                    pointValKey: "y", showLine: !0, generatePoints: function () { var c, b, h, a; p.column.prototype.generatePoints.apply(this); h = 0; for (b = this.points.length; h < b; h++)if (c = this.points[h], a = this.processedYData[h], c.isIntermediateSum || c.isSum) c.y = q(a) }, translate: function () {
                        var c = this.options, b = this.yAxis, h, a, d, k, f, g, n, q, e, v = m(c.minPointLength, 5), t = v / 2, x = c.threshold, u = c.stacking, F = b.waterfallStacks[this.stackKey], z; p.column.prototype.translate.apply(this); n = q = x; a = this.points; h = 0; for (c =
                            a.length; h < c; h++) {
                                d = a[h]; g = this.processedYData[h]; k = d.shapeArgs; e = [0, g]; z = d.y; if (u) {
                                    if (F && (e = F[h], "overlap" === u ? (f = e.stackState[e.stateIndex--], f = 0 <= z ? f : f - z, e.hasOwnProperty("absolutePos") && delete e.absolutePos, e.hasOwnProperty("absoluteNeg") && delete e.absoluteNeg) : (0 <= z ? (f = e.threshold + e.posTotal, e.posTotal -= z) : (f = e.threshold + e.negTotal, e.negTotal -= z, f -= z), !e.posTotal && e.hasOwnProperty("absolutePos") && (e.posTotal = e.absolutePos, delete e.absolutePos), !e.negTotal && e.hasOwnProperty("absoluteNeg") && (e.negTotal =
                                        e.absoluteNeg, delete e.absoluteNeg)), d.isSum || (e.connectorThreshold = e.threshold + e.stackTotal), b.reversed ? (g = 0 <= z ? f - z : f + z, z = f) : (g = f, z = f - z), d.below = g <= m(x, 0), k.y = b.translate(g, 0, 1, 0, 1), k.height = Math.abs(k.y - b.translate(z, 0, 1, 0, 1))), z = b.dummyStackItem) z.x = h, z.label = F[h].label, z.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[h], this.stackedYPos[h])
                                } else f = Math.max(n, n + z) + e[0], k.y = b.translate(f, 0, 1, 0, 1), d.isSum ? (k.y = b.translate(e[1], 0, 1, 0, 1), k.height = Math.min(b.translate(e[0], 0, 1, 0, 1), b.len) -
                                    k.y) : d.isIntermediateSum ? (0 <= z ? (g = e[1] + q, z = q) : (g = q, z = e[1] + q), b.reversed && (g ^= z, z ^= g, g ^= z), k.y = b.translate(g, 0, 1, 0, 1), k.height = Math.abs(k.y - Math.min(b.translate(z, 0, 1, 0, 1), b.len)), q += e[1]) : (k.height = 0 < g ? b.translate(n, 0, 1, 0, 1) - k.y : b.translate(n, 0, 1, 0, 1) - b.translate(n - g, 0, 1, 0, 1), n += g, d.below = n < m(x, 0)), 0 > k.height && (k.y += k.height, k.height *= -1); d.plotY = k.y = Math.round(k.y) - this.borderWidth % 2 / 2; k.height = Math.max(Math.round(k.height), .001); d.yBottom = k.y + k.height; k.height <= v && !d.isNull ? (k.height = v, k.y -= t, d.plotY =
                                        k.y, d.minPointLengthOffset = 0 > d.y ? -t : t) : (d.isNull && (k.width = 0), d.minPointLengthOffset = 0); k = d.plotY + (d.negative ? k.height : 0); this.chart.inverted ? d.tooltipPos[0] = b.len - k : d.tooltipPos[1] = k
                        }
                    }, processData: function (c) {
                        var b = this.options, h = this.yData, a = b.data, k, d = h.length, f = b.threshold || 0, p, m, w, g, n, e; for (e = m = p = w = g = 0; e < d; e++)n = h[e], k = a && a[e] ? a[e] : {}, "sum" === n || k.isSum ? h[e] = q(m) : "intermediateSum" === n || k.isIntermediateSum ? (h[e] = q(p), p = 0) : (m += n, p += n), w = Math.min(m, w), g = Math.max(m, g); x.prototype.processData.call(this,
                            c); b.stacking || (this.dataMin = w + f, this.dataMax = g)
                    }, toYData: function (c) { return c.isSum ? 0 === c.x ? null : "sum" : c.isIntermediateSum ? 0 === c.x ? null : "intermediateSum" : c.y }, pointAttribs: function (c, b) { var h = this.options.upColor; h && !c.options.color && (c.color = 0 < c.y ? h : null); c = p.column.prototype.pointAttribs.call(this, c, b); delete c.dashstyle; return c }, getGraphPath: function () { return ["M", 0, 0] }, getCrispPath: function () {
                        var c = this.data, b = this.yAxis, h = c.length, a = Math.round(this.graph.strokeWidth()) % 2 / 2, k = Math.round(this.borderWidth) %
                            2 / 2, d = this.xAxis.reversed, f = this.yAxis.reversed, p = this.options.stacking, m = [], g, n, e, q, v, t, x; for (t = 1; t < h; t++) { v = c[t].shapeArgs; n = c[t - 1]; q = c[t - 1].shapeArgs; g = b.waterfallStacks[this.stackKey]; e = 0 < n.y ? -q.height : 0; g && (g = g[t - 1], p ? (g = g.connectorThreshold, e = Math.round(b.translate(g, 0, 1, 0, 1) + (f ? e : 0)) - a) : e = q.y + n.minPointLengthOffset + k - a, x = ["M", q.x + (d ? 0 : q.width), e, "L", v.x + (d ? v.width : 0), e]); if (!p && 0 > n.y && !f || 0 < n.y && f) x[2] += q.height, x[5] += q.height; m = m.concat(x) } return m
                    }, drawGraph: function () {
                        x.prototype.drawGraph.call(this);
                        this.graph.attr({ d: this.getCrispPath() })
                    }, setStackedPoints: function () {
                        function c(c, b, h, a) { if (v) for (h; h < v; h++)g.stackState[h] += a; else g.stackState[0] = c, v = g.stackState.length; g.stackState.push(g.stackState[v - 1] + b) } var b = this.options, h = this.yAxis.waterfallStacks, a = b.threshold, k = a || 0, d = k, f = this.stackKey, p = this.xData, m = p.length, g, n, e, q, v, t, x, u, y; this.yAxis.usePercentage = !1; n = e = q = k; if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                        h[f] || (h[f] = {}); for (var f = h[f], J = 0; J < m; J++) {
                            t = p[J]; if (!f[t] ||
                                h.changed) f[t] = { negTotal: 0, posTotal: 0, stackTotal: 0, threshold: 0, stateIndex: 0, stackState: [], label: h.changed && f[t] ? f[t].label : void 0 }; g = f[t]; y = this.yData[J]; 0 <= y ? g.posTotal += y : g.negTotal += y; u = b.data[J]; t = g.absolutePos = g.posTotal; x = g.absoluteNeg = g.negTotal; g.stackTotal = t + x; v = g.stackState.length; u && u.isIntermediateSum ? (c(q, e, 0, q), q = e, e = a, k ^= d, d ^= k, k ^= d) : u && u.isSum ? (c(a, n, v), k = a) : (c(k, y, 0, n), u && (n += y, e += y)); g.stateIndex++; g.threshold = k; k += g.stackTotal
                        } h.changed = !1
                        }
                    }, getExtremes: function () {
                        var c = this.options.stacking,
                        a, h, k; c && (a = this.yAxis, a = a.waterfallStacks, h = this.stackedYNeg = [], k = this.stackedYPos = [], "overlap" === c ? n(a[this.stackKey], function (c) { h.push(b(c.stackState)); k.push(g(c.stackState)) }) : n(a[this.stackKey], function (c) { h.push(c.negTotal + c.threshold); k.push(c.posTotal + c.threshold) }), this.dataMin = b(h), this.dataMax = g(k))
                    }
                    }, {
                        getClassName: function () { var c = t.prototype.getClassName.call(this); this.isSum ? c += " highcharts-sum" : this.isIntermediateSum && (c += " highcharts-intermediate-sum"); return c }, isValid: function () {
                            return e(this.y,
                                !0) || this.isSum || this.isIntermediateSum
                        }
                    })
        }); y(u, "parts-more/PolygonSeries.js", [u["parts/Globals.js"]], function (a) {
            var q = a.Series, e = a.seriesType, m = a.seriesTypes; e("polygon", "scatter", { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 }, {
                type: "polygon", getGraphPath: function () { for (var a = q.prototype.getGraphPath.call(this), b = a.length + 1; b--;)(b === a.length || "M" === a[b]) && 0 < b && a.splice(b, 0, "z"); return this.areaPath = a }, drawGraph: function () {
                    this.options.fillColor =
                    this.color; m.area.prototype.drawGraph.call(this)
                }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawTracker: q.prototype.drawTracker, setStackedPoints: a.noop
            })
        }); y(u, "parts-more/BubbleLegend.js", [u["parts/Globals.js"]], function (a) {
            var q = a.Series, e = a.Legend, m = a.Chart, n = a.addEvent, b = a.wrap, g = a.color, f = a.isNumber, d = a.numberFormat, v = a.objectEach, t = a.merge, x = a.noop, c = a.pick, k = a.stableSort, p = a.setOptions, w = a.arrayMin, l = a.arrayMax; p({
                legend: {
                    bubbleLegend: {
                        borderColor: void 0, borderWidth: 2, className: void 0,
                        color: void 0, connectorClassName: void 0, connectorColor: void 0, connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: 10, color: void 0 }, x: 0, y: 0 }, maxSize: 60, minSize: 10, legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
                    }
                }
            }); a.BubbleLegend = function (c, b) { this.init(c, b) }; a.BubbleLegend.prototype = {
                init: function (c, b) {
                this.options =
                    c; this.visible = !0; this.chart = b.chart; this.legend = b
                }, setState: x, addToLegend: function (c) { c.splice(this.options.legendIndex, 0, this) }, drawLegendSymbol: function (b) {
                    var h = this.chart, a = this.options, d = c(b.options.itemDistance, 20), l, p = a.ranges; l = a.connectorDistance; this.fontMetrics = h.renderer.fontMetrics(a.labels.style.fontSize.toString() + "px"); p && p.length && f(p[0].value) ? (k(p, function (c, b) { return b.value - c.value }), this.ranges = p, this.setOptions(), this.render(), h = this.getMaxLabelSize(), p = this.ranges[0].radius,
                        b = 2 * p, l = l - p + h.width, l = 0 < l ? l : 0, this.maxLabel = h, this.movementX = "left" === a.labels.align ? l : 0, this.legendItemWidth = b + l + d, this.legendItemHeight = b + this.fontMetrics.h / 2) : b.options.bubbleLegend.autoRanges = !0
                }, setOptions: function () {
                    var b = this.ranges, a = this.options, k = this.chart.series[a.seriesIndex], d = this.legend.baseline, f = { "z-index": a.zIndex, "stroke-width": a.borderWidth }, l = { "z-index": a.zIndex, "stroke-width": a.connectorWidth }, p = this.getLabelStyles(), m = k.options.marker.fillOpacity, n = this.chart.styledMode; b.forEach(function (h,
                        r) { n || (f.stroke = c(h.borderColor, a.borderColor, k.color), f.fill = c(h.color, a.color, 1 !== m ? g(k.color).setOpacity(m).get("rgba") : k.color), l.stroke = c(h.connectorColor, a.connectorColor, k.color)); b[r].radius = this.getRangeRadius(h.value); b[r] = t(b[r], { center: b[0].radius - b[r].radius + d }); n || t(!0, b[r], { bubbleStyle: t(!1, f), connectorStyle: t(!1, l), labelStyle: p }) }, this)
                }, getLabelStyles: function () {
                    var b = this.options, a = {}, k = "left" === b.labels.align, d = this.legend.options.rtl; v(b.labels.style, function (c, b) {
                    "color" !== b &&
                        "fontSize" !== b && "z-index" !== b && (a[b] = c)
                    }); return t(!1, a, { "font-size": b.labels.style.fontSize, fill: c(b.labels.style.color, "#000000"), "z-index": b.zIndex, align: d || k ? "right" : "left" })
                }, getRangeRadius: function (c) { var b = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this, b.ranges[b.ranges.length - 1].value, b.ranges[0].value, b.minSize, b.maxSize, c) }, render: function () {
                    var c = this.chart.renderer, b = this.options.zThreshold; this.symbols || (this.symbols = {
                        connectors: [], bubbleItems: [],
                        labels: []
                    }); this.legendSymbol = c.g("bubble-legend"); this.legendItem = c.g("bubble-legend-item"); this.legendSymbol.translateX = 0; this.legendSymbol.translateY = 0; this.ranges.forEach(function (c) { c.value >= b && this.renderRange(c) }, this); this.legendSymbol.add(this.legendItem); this.legendItem.add(this.legendGroup); this.hideOverlappingLabels()
                }, renderRange: function (c) {
                    var b = this.options, a = b.labels, h = this.chart.renderer, k = this.symbols, d = k.labels, f = c.center, l = Math.abs(c.radius), p = b.connectorDistance, m = a.align, g =
                        a.style.fontSize, p = this.legend.options.rtl || "left" === m ? -p : p, a = b.connectorWidth, n = this.ranges[0].radius, e = f - l - b.borderWidth / 2 + a / 2, w, g = g / 2 - (this.fontMetrics.h - g) / 2, q = h.styledMode; "center" === m && (p = 0, b.connectorDistance = 0, c.labelStyle.align = "center"); m = e + b.labels.y; w = n + p + b.labels.x; k.bubbleItems.push(h.circle(n, f + ((e % 1 ? 1 : .5) - (a % 2 ? 0 : .5)), l).attr(q ? {} : c.bubbleStyle).addClass((q ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (b.className || "")).add(this.legendSymbol));
                    k.connectors.push(h.path(h.crispLine(["M", n, e, "L", n + p, e], b.connectorWidth)).attr(q ? {} : c.connectorStyle).addClass((q ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (b.connectorClassName || "")).add(this.legendSymbol)); c = h.text(this.formatLabel(c), w, m + g).attr(q ? {} : c.labelStyle).addClass("highcharts-bubble-legend-labels " + (b.labels.className || "")).add(this.legendSymbol); d.push(c); c.placed = !0; c.alignAttr = { x: w, y: m + g }
                }, getMaxLabelSize: function () {
                    var c, b; this.symbols.labels.forEach(function (a) {
                        b =
                        a.getBBox(!0); c = c ? b.width > c.width ? b : c : b
                    }); return c || {}
                }, formatLabel: function (c) { var b = this.options, h = b.labels.formatter; return (b = b.labels.format) ? a.format(b, c) : h ? h.call(c) : d(c.value, 1) }, hideOverlappingLabels: function () { var c = this.chart, b = this.symbols; !this.options.labels.allowOverlap && b && (c.hideOverlappingLabels(b.labels), b.labels.forEach(function (c, a) { c.newOpacity ? c.newOpacity !== c.oldOpacity && b.connectors[a].show() : b.connectors[a].hide() })) }, getRanges: function () {
                    var b = this.legend.bubbleLegend, a,
                    k = b.options.ranges, d, p = Number.MAX_VALUE, m = -Number.MAX_VALUE; b.chart.series.forEach(function (b) { b.isBubble && !b.ignoreSeries && (d = b.zData.filter(f), d.length && (p = c(b.options.zMin, Math.min(p, Math.max(w(d), !1 === b.options.displayNegative ? b.options.zThreshold : -Number.MAX_VALUE))), m = c(b.options.zMax, Math.max(m, l(d))))) }); a = p === m ? [{ value: m }] : [{ value: p }, { value: (p + m) / 2 }, { value: m, autoRanges: !0 }]; k.length && k[0].radius && a.reverse(); a.forEach(function (b, c) { k && k[c] && (a[c] = t(!1, k[c], b)) }); return a
                }, predictBubbleSizes: function () {
                    var b =
                        this.chart, c = this.fontMetrics, a = b.legend.options, k = "horizontal" === a.layout, d = k ? b.legend.lastLineHeight : 0, f = b.plotSizeX, p = b.plotSizeY, l = b.series[this.options.seriesIndex], b = Math.ceil(l.minPxSize), m = Math.ceil(l.maxPxSize), l = l.options.maxSize, g = Math.min(p, f); if (a.floating || !/%$/.test(l)) c = m; else if (l = parseFloat(l), c = (g + d - c.h / 2) * l / 100 / (l / 100 + 1), k && p - c >= f || !k && f - c >= p) c = m; return [b, Math.ceil(c)]
                }, updateRanges: function (b, c) { var a = this.legend.options.bubbleLegend; a.minSize = b; a.maxSize = c; a.ranges = this.getRanges() },
                correctSizes: function () { var b = this.legend, c = this.chart.series[this.options.seriesIndex]; 1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, c.maxPxSize), b.render()) }
            }; n(a.Legend, "afterGetAllItems", function (c) {
                var b = this.bubbleLegend, k = this.options, h = k.bubbleLegend, d = this.chart.getVisibleBubbleSeriesIndex(); b && b.ranges && b.ranges.length && (h.ranges.length && (h.autoRanges = !!h.ranges[0].autoRanges), this.destroyItem(b)); 0 <= d && k.enabled && h.enabled && (h.seriesIndex =
                    d, this.bubbleLegend = new a.BubbleLegend(h, this), this.bubbleLegend.addToLegend(c.allItems))
            }); m.prototype.getVisibleBubbleSeriesIndex = function () { for (var b = this.series, c = 0; c < b.length;) { if (b[c] && b[c].isBubble && b[c].visible && b[c].zData.length) return c; c++ } return -1 }; e.prototype.getLinesHeights = function () {
                var b = this.allItems, c = [], a, k = b.length, d, l = 0; for (d = 0; d < k; d++)if (b[d].legendItemHeight && (b[d].itemHeight = b[d].legendItemHeight), b[d] === b[k - 1] || b[d + 1] && b[d]._legendItemPos[1] !== b[d + 1]._legendItemPos[1]) {
                    c.push({ height: 0 });
                    a = c[c.length - 1]; for (l; l <= d; l++)b[l].itemHeight > a.height && (a.height = b[l].itemHeight); a.step = d
                } return c
            }; e.prototype.retranslateItems = function (b) { var c, a, k, d = this.options.rtl, h = 0; this.allItems.forEach(function (l, f) { c = l.legendGroup.translateX; a = l._legendItemPos[1]; if ((k = l.movementX) || d && l.ranges) k = d ? c - l.options.maxSize / 2 : c + k, l.legendGroup.attr({ translateX: k }); f > b[h].step && h++; l.legendGroup.attr({ translateY: Math.round(a + b[h].height / 2) }); l._legendItemPos[1] = a + b[h].height / 2 }) }; n(q, "legendItemClick", function () {
                var b =
                    this.chart, c = this.visible, a = this.chart.legend; a && a.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, b = 0 <= b.getVisibleBubbleSeriesIndex(), a.bubbleLegend.visible !== b && (a.update({ bubbleLegend: { enabled: b } }), a.bubbleLegend.visible = b), this.visible = c)
            }); b(m.prototype, "drawChartBox", function (b, c, a) {
                var k = this.legend, d = 0 <= this.getVisibleBubbleSeriesIndex(), h; k && k.options.enabled && k.bubbleLegend && k.options.bubbleLegend.autoRanges && d ? (h = k.bubbleLegend.options, d = k.bubbleLegend.predictBubbleSizes(), k.bubbleLegend.updateRanges(d[0],
                    d[1]), h.placed || (k.group.placed = !1, k.allItems.forEach(function (b) { b.legendGroup.translateY = null })), k.render(), this.getMargins(), this.axes.forEach(function (b) { b.render(); h.placed || (b.setScale(), b.updateNames(), v(b.ticks, function (b) { b.isNew = !0; b.isNewLabel = !0 })) }), h.placed = !0, this.getMargins(), b.call(this, c, a), k.bubbleLegend.correctSizes(), k.retranslateItems(k.getLinesHeights())) : (b.call(this, c, a), k && k.options.enabled && k.bubbleLegend && (k.render(), k.retranslateItems(k.getLinesHeights())))
            })
        }); y(u, "parts-more/BubbleSeries.js",
            [u["parts/Globals.js"]], function (a) {
                var q = a.arrayMax, e = a.arrayMin, m = a.Axis, n = a.color, b = a.isNumber, g = a.noop, f = a.pick, d = a.pInt, v = a.Point, t = a.Series, x = a.seriesType, c = a.seriesTypes; x("bubble", "scatter", {
                    dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" },
                    turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
                }, {
                    pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, isBubble: !0, pointAttribs: function (b, c) { var a = this.options.marker.fillOpacity; b = t.prototype.pointAttribs.call(this, b, c); 1 !== a && (b.fill = n(b.fill).setOpacity(a).get("rgba")); return b }, getRadii: function (b, c, a) {
                        var k, d = this.zData, f = a.minPxSize, p = a.maxPxSize, m = [], g; k = 0; for (a = d.length; k < a; k++)g = d[k], m.push(this.getRadius(b,
                            c, f, p, g)); this.radii = m
                    }, getRadius: function (c, a, d, l, h) { var k = this.options, f = "width" !== k.sizeBy, p = k.zThreshold, m = a - c; k.sizeByAbsoluteValue && null !== h && (h = Math.abs(h - p), m = Math.max(a - p, Math.abs(c - p)), c = 0); b(h) ? h < c ? d = d / 2 - 1 : (c = 0 < m ? (h - c) / m : .5, f && 0 <= c && (c = Math.sqrt(c)), d = Math.ceil(d + c * (l - d)) / 2) : d = null; return d }, animate: function (b) {
                    !b && this.points.length < this.options.animationLimit && (this.points.forEach(function (b) {
                        var c = b.graphic, a; c && c.width && (a = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({
                            x: b.plotX,
                            y: b.plotY, width: 1, height: 1
                        }), c.animate(a, this.options.animation))
                    }, this), this.animate = null)
                    }, hasData: function () { return !!this.processedXData.length }, translate: function () { var k, d = this.data, f, l, h = this.radii; c.scatter.prototype.translate.call(this); for (k = d.length; k--;)f = d[k], l = h ? h[k] : 0, b(l) && l >= this.minPxSize / 2 ? (f.marker = a.extend(f.marker, { radius: l, width: 2 * l, height: 2 * l }), f.dlBox = { x: f.plotX - l, y: f.plotY - l, width: 2 * l, height: 2 * l }) : f.shapeArgs = f.plotY = f.dlBox = void 0 }, alignDataLabel: c.column.prototype.alignDataLabel,
                        buildKDTree: g, applyZones: g
                    }, { haloPath: function (b) { return v.prototype.haloPath.call(this, 0 === b ? 0 : (this.marker ? this.marker.radius || 0 : 0) + b) }, ttBelow: !1 }); m.prototype.beforePadding = function () {
                        var c = this, p = this.len, m = this.chart, l = 0, h = p, g = this.isXAxis, n = g ? "xData" : "yData", v = this.min, t = {}, x = Math.min(m.plotWidth, m.plotHeight), u = Number.MAX_VALUE, y = -Number.MAX_VALUE, C = this.max - v, B = p / C, D = []; this.series.forEach(function (b) {
                            var k = b.options; !b.bubblePadding || !b.visible && m.options.chart.ignoreHiddenSeries || (c.allowZoomOutside =
                                !0, D.push(b), g && (["minSize", "maxSize"].forEach(function (b) { var c = k[b], a = /%$/.test(c), c = d(c); t[b] = a ? x * c / 100 : c }), b.minPxSize = t.minSize, b.maxPxSize = Math.max(t.maxSize, t.minSize), b = b.zData.filter(a.isNumber), b.length && (u = f(k.zMin, Math.min(u, Math.max(e(b), !1 === k.displayNegative ? k.zThreshold : -Number.MAX_VALUE))), y = f(k.zMax, Math.max(y, q(b))))))
                        }); D.forEach(function (a) {
                            var d = a[n], k = d.length, f; g && a.getRadii(u, y, a); if (0 < C) for (; k--;)b(d[k]) && c.dataMin <= d[k] && d[k] <= c.dataMax && (f = a.radii[k], l = Math.min((d[k] - v) *
                                B - f, l), h = Math.max((d[k] - v) * B + f, h))
                        }); D.length && 0 < C && !this.isLog && (h -= p, B *= (p + Math.max(0, l) - Math.min(h, p)) / p, [["min", "userMin", l], ["max", "userMax", h]].forEach(function (b) { void 0 === f(c.options[b[0]], c[b[1]]) && (c[b[0]] += b[2] / B) }))
                    }
            }); y(u, "modules/networkgraph/integrations.js", [u["parts/Globals.js"]], function (a) {
            a.networkgraphIntegrations = {
                verlet: {
                    attractiveForceFunction: function (a, e) { return (e - a) / a }, repulsiveForceFunction: function (a, e) { return (e - a) / a * (e > a ? 1 : 0) }, barycenter: function () {
                        var a = this.options.gravitationalConstant,
                        e = this.barycenter.xFactor, m = this.barycenter.yFactor, e = (e - (this.box.left + this.box.width) / 2) * a, m = (m - (this.box.top + this.box.height) / 2) * a; this.nodes.forEach(function (a) { a.fixedPosition || (a.plotX -= e / a.mass / a.degree, a.plotY -= m / a.mass / a.degree) })
                    }, repulsive: function (a, e, m) { e = e * this.diffTemperature / a.mass / a.degree; a.fixedPosition || (a.plotX += m.x * e, a.plotY += m.y * e) }, attractive: function (a, e, m) {
                        var n = a.getMass(), b = -m.x * e * this.diffTemperature; e = -m.y * e * this.diffTemperature; a.fromNode.fixedPosition || (a.fromNode.plotX -=
                            b * n.fromNode / a.fromNode.degree, a.fromNode.plotY -= e * n.fromNode / a.fromNode.degree); a.toNode.fixedPosition || (a.toNode.plotX += b * n.toNode / a.toNode.degree, a.toNode.plotY += e * n.toNode / a.toNode.degree)
                    }, integrate: function (a, e) {
                        var m = -a.options.friction, n = a.options.maxSpeed, b = (e.plotX + e.dispX - e.prevX) * m, m = (e.plotY + e.dispY - e.prevY) * m, g = Math.abs, f = g(b) / (b || 1), g = g(m) / (m || 1), b = f * Math.min(n, Math.abs(b)), m = g * Math.min(n, Math.abs(m)); e.prevX = e.plotX + e.dispX; e.prevY = e.plotY + e.dispY; e.plotX += b; e.plotY += m; e.temperature =
                            a.vectorLength({ x: b, y: m })
                    }, getK: function (a) { return Math.pow(a.box.width * a.box.height / a.nodes.length, .5) }
                }, euler: {
                    attractiveForceFunction: function (a, e) { return a * a / e }, repulsiveForceFunction: function (a, e) { return e * e / a }, barycenter: function () { var a = this.options.gravitationalConstant, e = this.barycenter.xFactor, m = this.barycenter.yFactor; this.nodes.forEach(function (n) { if (!n.fixedPosition) { var b = n.getDegree(), b = b * (1 + b / 2); n.dispX += (e - n.plotX) * a * b / n.degree; n.dispY += (m - n.plotY) * a * b / n.degree } }) }, repulsive: function (a,
                        e, m, n) { a.dispX += m.x / n * e / a.degree; a.dispY += m.y / n * e / a.degree }, attractive: function (a, e, m, n) { var b = a.getMass(), g = m.x / n * e; e *= m.y / n; a.fromNode.fixedPosition || (a.fromNode.dispX -= g * b.fromNode / a.fromNode.degree, a.fromNode.dispY -= e * b.fromNode / a.fromNode.degree); a.toNode.fixedPosition || (a.toNode.dispX += g * b.toNode / a.toNode.degree, a.toNode.dispY += e * b.toNode / a.toNode.degree) }, integrate: function (a, e) {
                            var m; e.dispX += e.dispX * a.options.friction; e.dispY += e.dispY * a.options.friction; m = e.temperature = a.vectorLength({
                                x: e.dispX,
                                y: e.dispY
                            }); 0 !== m && (e.plotX += e.dispX / m * Math.min(Math.abs(e.dispX), a.temperature), e.plotY += e.dispY / m * Math.min(Math.abs(e.dispY), a.temperature))
                        }, getK: function (a) { return Math.pow(a.box.width * a.box.height / a.nodes.length, .3) }
                }
            }
            }); y(u, "modules/networkgraph/QuadTree.js", [u["parts/Globals.js"]], function (a) {
                var q = a.QuadTreeNode = function (a) { this.box = a; this.boxSize = Math.min(a.width, a.height); this.nodes = []; this.body = this.isInternal = !1; this.isEmpty = !0 }; a.extend(q.prototype, {
                    insert: function (a, e) {
                        this.isInternal ?
                        this.nodes[this.getBoxPosition(a)].insert(a, e - 1) : (this.isEmpty = !1, this.body ? e ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, e - 1), this.body = !0), this.nodes[this.getBoxPosition(a)].insert(a, e - 1)) : this.nodes.push(a) : (this.isInternal = !1, this.body = a))
                    }, updateMassAndCenter: function () {
                        var a = 0, e = 0, b = 0; this.isInternal ? (this.nodes.forEach(function (g) { g.isEmpty || (a += g.mass, e += g.plotX * g.mass, b += g.plotY * g.mass) }), e /= a, b /= a) : this.body && (a = this.body.mass,
                            e = this.body.plotX, b = this.body.plotY); this.mass = a; this.plotX = e; this.plotY = b
                    }, divideBox: function () { var a = this.box.width / 2, e = this.box.height / 2; this.nodes[0] = new q({ left: this.box.left, top: this.box.top, width: a, height: e }); this.nodes[1] = new q({ left: this.box.left + a, top: this.box.top, width: a, height: e }); this.nodes[2] = new q({ left: this.box.left + a, top: this.box.top + e, width: a, height: e }); this.nodes[3] = new q({ left: this.box.left, top: this.box.top + e, width: a, height: e }) }, getBoxPosition: function (a) {
                        var m = a.plotY < this.box.top +
                            this.box.height / 2; return a.plotX < this.box.left + this.box.width / 2 ? m ? 0 : 3 : m ? 1 : 2
                    }
                }); var e = a.QuadTree = function (a, e, b, g) { this.box = { left: a, top: e, width: b, height: g }; this.maxDepth = 25; this.root = new q(this.box, "0"); this.root.isInternal = !0; this.root.isRoot = !0; this.root.divideBox() }; a.extend(e.prototype, {
                    insertNodes: function (a) { a.forEach(function (a) { this.root.insert(a, this.maxDepth) }, this) }, visitNodeRecursive: function (a, e, b, g, f) {
                        var d; a || (a = this.root); a === this.root && e && (d = e(a)); !1 !== d && (a.nodes.forEach(function (a) {
                            if (a.isInternal) {
                                e &&
                                (d = e(a)); if (!1 === d) return; this.visitNodeRecursive(a, e, b, g, f)
                            } else a.body && e && e(a.body); b && b(a)
                        }, this), a === this.root && b && b(a))
                    }, calculateMassAndCenter: function () { this.visitNodeRecursive(null, null, function (a) { a.updateMassAndCenter() }) }, render: function (a, e) { this.visitNodeRecursive(this.root, null, null, a, e) }, clear: function (a) { this.render(a, !0) }, renderBox: function (a, e, b) {
                    a.graphic || b ? b && (a.graphic && (a.graphic = a.graphic.destroy()), a.graphic2 && (a.graphic2 = a.graphic2.destroy()), a.label && (a.label = a.label.destroy())) :
                        (a.graphic = e.renderer.rect(a.box.left + e.plotLeft, a.box.top + e.plotTop, a.box.width, a.box.height).attr({ stroke: "rgba(100, 100, 100, 0.5)", "stroke-width": 2 }).add(), isNaN(a.plotX) || (a.graphic2 = e.renderer.circle(a.plotX, a.plotY, a.mass / 10).attr({ fill: "red", translateY: e.plotTop, translateX: e.plotLeft }).add()))
                    }
                })
            }); y(u, "modules/networkgraph/layouts.js", [u["parts/Globals.js"]], function (a) {
                var q = a.pick, e = a.defined, m = a.addEvent, n = a.Chart; a.layouts = { "reingold-fruchterman": function () { } }; a.extend(a.layouts["reingold-fruchterman"].prototype,
                    {
                        init: function (b) { this.options = b; this.nodes = []; this.links = []; this.series = []; this.box = { x: 0, y: 0, width: 0, height: 0 }; this.setInitialRendering(!0); this.integration = a.networkgraphIntegrations[b.integration]; this.attractiveForce = q(b.attractiveForce, this.integration.attractiveForceFunction); this.repulsiveForce = q(b.repulsiveForce, this.integration.repulsiveForceFunction); this.approximation = b.approximation }, start: function () {
                            var a = this.series, g = this.options; this.currentStep = 0; this.forces = a[0] && a[0].forces || [];
                            this.initialRendering && (this.initPositions(), a.forEach(function (a) { a.render() })); this.setK(); this.resetSimulation(g); g.enableSimulation && this.step()
                        }, step: function () {
                            var b = this, g = this.series, f = this.options; b.currentStep++; "barnes-hut" === b.approximation && (b.createQuadTree(), b.quadTree.calculateMassAndCenter()); b.forces.forEach(function (a) { b[a + "Forces"](b.temperature) }); b.applyLimits(b.temperature); b.temperature = b.coolDown(b.startTemperature, b.diffTemperature, b.currentStep); b.prevSystemTemperature =
                                b.systemTemperature; b.systemTemperature = b.getSystemTemperature(); f.enableSimulation && (g.forEach(function (a) { a.chart && a.render() }), b.maxIterations-- && isFinite(b.temperature) && !b.isStable() ? (b.simulation && a.win.cancelAnimationFrame(b.simulation), b.simulation = a.win.requestAnimationFrame(function () { b.step() })) : b.simulation = !1)
                        }, stop: function () { this.simulation && a.win.cancelAnimationFrame(this.simulation) }, setArea: function (a, g, f, d) { this.box = { left: a, top: g, width: f, height: d } }, setK: function () {
                        this.k = this.options.linkLength ||
                            this.integration.getK(this)
                        }, addNodes: function (a) { a.forEach(function (a) { -1 === this.nodes.indexOf(a) && this.nodes.push(a) }, this) }, removeNode: function (a) { a = this.nodes.indexOf(a); -1 !== a && this.nodes.splice(a, 1) }, removeLink: function (a) { a = this.links.indexOf(a); -1 !== a && this.links.splice(a, 1) }, addLinks: function (a) { a.forEach(function (a) { -1 === this.links.indexOf(a) && this.links.push(a) }, this) }, addSeries: function (a) { -1 === this.series.indexOf(a) && this.series.push(a) }, clear: function () {
                            this.nodes.length = 0; this.links.length =
                                0; this.series.length = 0; this.resetSimulation()
                        }, resetSimulation: function () { this.forcedStop = !1; this.systemTemperature = 0; this.setMaxIterations(); this.setTemperature(); this.setDiffTemperature() }, setMaxIterations: function (a) { this.maxIterations = q(a, this.options.maxIterations) }, setTemperature: function () { this.temperature = this.startTemperature = Math.sqrt(this.nodes.length) }, setDiffTemperature: function () { this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1) }, setInitialRendering: function (a) {
                        this.initialRendering =
                            a
                        }, createQuadTree: function () { this.quadTree = new a.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height); this.quadTree.insertNodes(this.nodes) }, initPositions: function () { var b = this.options.initialPositions; a.isFunction(b) ? (b.call(this), this.nodes.forEach(function (a) { e(a.prevX) || (a.prevX = a.plotX); e(a.prevY) || (a.prevY = a.plotY); a.dispX = 0; a.dispY = 0 })) : "circle" === b ? this.setCircularPositions() : this.setRandomPositions() }, setCircularPositions: function () {
                            function a(c) {
                                c.linksFrom.forEach(function (c) {
                                n[c.toNode.id] ||
                                    (n[c.toNode.id] = !0, m.push(c.toNode), a(c.toNode))
                                })
                            } var g = this.box, f = this.nodes, d = 2 * Math.PI / (f.length + 1), e = f.filter(function (a) { return 0 === a.linksTo.length }), m = [], n = {}, c = this.options.initialPositionRadius; e.forEach(function (c) { m.push(c); a(c) }); m.length ? f.forEach(function (a) { -1 === m.indexOf(a) && m.push(a) }) : m = f; m.forEach(function (a, b) { a.plotX = a.prevX = q(a.plotX, g.width / 2 + c * Math.cos(b * d)); a.plotY = a.prevY = q(a.plotY, g.height / 2 + c * Math.sin(b * d)); a.dispX = 0; a.dispY = 0 })
                        }, setRandomPositions: function () {
                            function a(a) {
                                a =
                                a * a / Math.PI; return a -= Math.floor(a)
                            } var g = this.box, f = this.nodes, d = f.length + 1; f.forEach(function (b, f) { b.plotX = b.prevX = q(b.plotX, g.width * a(f)); b.plotY = b.prevY = q(b.plotY, g.height * a(d + f)); b.dispX = 0; b.dispY = 0 })
                        }, force: function (a) { this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1)) }, barycenterForces: function () { this.getBarycenter(); this.force("barycenter") }, getBarycenter: function () {
                            var a = 0, g = 0, f = 0; this.nodes.forEach(function (b) { g += b.plotX * b.mass; f += b.plotY * b.mass; a += b.mass }); return this.barycenter =
                                { x: g, y: f, xFactor: g / a, yFactor: f / a }
                        }, barnesHutApproximation: function (a, g) { var b = this.getDistXY(a, g), d = this.vectorLength(b), e, m; a !== g && 0 !== d && (g.isInternal ? g.boxSize / d < this.options.theta && 0 !== d ? (m = this.repulsiveForce(d, this.k), this.force("repulsive", a, m * g.mass, b, d), e = !1) : e = !0 : (m = this.repulsiveForce(d, this.k), this.force("repulsive", a, m * g.mass, b, d))); return e }, repulsiveForces: function () {
                            var a = this; "barnes-hut" === a.approximation ? a.nodes.forEach(function (b) {
                                a.quadTree.visitNodeRecursive(null, function (f) {
                                    return a.barnesHutApproximation(b,
                                        f)
                                })
                            }) : a.nodes.forEach(function (b) { a.nodes.forEach(function (f) { var d, e, g; b === f || b.fixedPosition || (g = a.getDistXY(b, f), e = a.vectorLength(g), 0 !== e && (d = a.repulsiveForce(e, a.k), a.force("repulsive", b, d * f.mass, g, e))) }) })
                        }, attractiveForces: function () { var a = this, e, f, d; a.links.forEach(function (b) { b.fromNode && b.toNode && (e = a.getDistXY(b.fromNode, b.toNode), f = a.vectorLength(e), 0 !== f && (d = a.attractiveForce(f, a.k), a.force("attractive", b, d, e, f))) }) }, applyLimits: function () {
                            var a = this; a.nodes.forEach(function (b) {
                            b.fixedPosition ||
                                (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0)
                            })
                        }, applyLimitBox: function (a, e) { var b = a.marker && a.marker.radius || 0; a.plotX = Math.max(Math.min(a.plotX, e.width - b), e.left + b); a.plotY = Math.max(Math.min(a.plotY, e.height - b), e.top + b) }, coolDown: function (a, e, f) { return a - e * f }, isStable: function () { return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature }, getSystemTemperature: function () {
                            return this.nodes.reduce(function (a, e) { return a + e.temperature },
                                0)
                        }, vectorLength: function (a) { return Math.sqrt(a.x * a.x + a.y * a.y) }, getDistR: function (a, e) { a = this.getDistXY(a, e); return this.vectorLength(a) }, getDistXY: function (a, e) { var b = a.plotX - e.plotX; a = a.plotY - e.plotY; return { x: b, y: a, absX: Math.abs(b), absY: Math.abs(a) } }
                    }); m(n, "predraw", function () { this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function (a) { a.stop() }) }); m(n, "render", function () {
                        function b(a) {
                        a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.options.enableSimulation && (a.beforeStep &&
                            a.beforeStep(), a.step(), e = !1, f = !0)
                        } var e, f = !1; if (this.graphLayoutsLookup) { a.setAnimation(!1, this); for (this.graphLayoutsLookup.forEach(function (a) { a.start() }); !e;)e = !0, this.graphLayoutsLookup.forEach(b); f && this.series.forEach(function (a) { a && a.layout && a.render() }) }
                    })
            }); y(u, "modules/networkgraph/draggable-nodes.js", [u["parts/Globals.js"]], function (a) {
                var q = a.Chart, e = a.addEvent; a.dragNodesMixin = {
                    onMouseDown: function (a, e) {
                        e = this.chart.pointer.normalize(e); a.fixedPosition = {
                            chartX: e.chartX, chartY: e.chartY,
                            plotX: a.plotX, plotY: a.plotY
                        }; a.inDragMode = !0
                    }, onMouseMove: function (a, e) {
                        if (a.fixedPosition && a.inDragMode) {
                            var b = this.chart, g = b.pointer.normalize(e); e = a.fixedPosition.chartX - g.chartX; g = a.fixedPosition.chartY - g.chartY; if (5 < Math.abs(e) || 5 < Math.abs(g)) e = a.fixedPosition.plotX - e, g = a.fixedPosition.plotY - g, b.isInsidePlot(e, g) && (a.plotX = e, a.plotY = g, this.redrawHalo(a), this.layout.simulation ? this.layout.resetSimulation() : (this.layout.setInitialRendering(!1), this.layout.enableSimulation ? this.layout.start() : this.layout.setMaxIterations(1),
                                this.chart.redraw(), this.layout.setInitialRendering(!0)))
                        }
                    }, onMouseUp: function (a) { a.fixedPosition && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw(), a.inDragMode = !1, this.options.fixedDraggable || delete a.fixedPosition) }, redrawHalo: function (a) { a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) }) }
                }; e(q, "load", function () {
                    var a = this, n, b, g; a.container && (n = e(a.container, "mousedown", function (f) {
                        var d = a.hoverPoint; d && d.series && d.series.hasDraggableNodes && d.series.options.draggable &&
                            (d.series.onMouseDown(d, f), b = e(a.container, "mousemove", function (a) { return d && d.series && d.series.onMouseMove(d, a) }), g = e(a.container.ownerDocument, "mouseup", function (a) { b(); g(); return d && d.series && d.series.onMouseUp(d, a) }))
                    })); e(a, "destroy", function () { n() })
                })
            }); y(u, "parts-more/PackedBubbleSeries.js", [u["parts/Globals.js"]], function (a) {
                var q = a.seriesType, e = a.Series, m = a.Point, n = a.defined, b = a.pick, g = a.addEvent, f = a.Chart, d = a.Color, v = a.layouts["reingold-fruchterman"], t = a.seriesTypes.bubble.prototype.pointClass,
                x = a.dragNodesMixin; a.networkgraphIntegrations.packedbubble = {
                    repulsiveForceFunction: function (a, b, d, f) { return Math.min(a, (d.marker.radius + f.marker.radius) / 2) }, barycenter: function () { var a = this, b = a.options.gravitationalConstant, d = a.box, f = a.nodes, l, h; f.forEach(function (c) { a.options.splitSeries && !c.isParentNode ? (l = c.series.parentNode.plotX, h = c.series.parentNode.plotY) : (l = d.width / 2, h = d.height / 2); c.fixedPosition || (c.plotX -= (c.plotX - l) * b / (c.mass * Math.sqrt(f.length)), c.plotY -= (c.plotY - h) * b / (c.mass * Math.sqrt(f.length))) }) },
                    repulsive: function (a, b, d, f) { var c = b * this.diffTemperature / a.mass / a.degree; b = d.x * c; d = d.y * c; a.fixedPosition || (a.plotX += b, a.plotY += d); f.fixedPosition || (f.plotX -= b, f.plotY -= d) }, integrate: a.networkgraphIntegrations.verlet.integrate, getK: a.noop
                }; a.layouts.packedbubble = a.extendClass(v, {
                    beforeStep: function () { this.options.marker && this.series.forEach(function (a) { a && a.calculateParentRadius() }) }, setCircularPositions: function () {
                        var a = this, d = a.box, f = a.nodes, e = 2 * Math.PI / (f.length + 1), l, h, g = a.options.initialPositionRadius;
                        f.forEach(function (c, k) { a.options.splitSeries && !c.isParentNode ? (l = c.series.parentNode.plotX, h = c.series.parentNode.plotY) : (l = d.width / 2, h = d.height / 2); c.plotX = c.prevX = b(c.plotX, l + g * Math.cos(c.index || k * e)); c.plotY = c.prevY = b(c.plotY, h + g * Math.sin(c.index || k * e)); c.dispX = 0; c.dispY = 0 })
                    }, repulsiveForces: function () {
                        var a = this, b, d, f, l = a.options.bubblePadding; a.nodes.forEach(function (c) {
                        c.degree = c.mass; c.neighbours = 0; a.nodes.forEach(function (k) {
                            b = 0; c === k || c.fixedPosition || !a.options.seriesInteraction && c.series !==
                                k.series || (f = a.getDistXY(c, k), d = a.vectorLength(f) - (c.marker.radius + k.marker.radius + l), 0 > d && (c.degree += .01, c.neighbours++ , b = a.repulsiveForce(-d / Math.sqrt(c.neighbours), a.k, c, k)), a.force("repulsive", c, b * k.mass, f, k, d))
                        })
                        })
                    }, applyLimitBox: function (a) {
                        var c, b; this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit && (c = this.getDistXY(a, a.series.parentNode), b = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(c), 0 > b && b > -2 * a.marker.radius && (a.plotX -= .01 * c.x, a.plotY -= .01 * c.y)); v.prototype.applyLimitBox.apply(this,
                            arguments)
                    }, isStable: function () { return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature || 0 < this.systemTemperature && .02 > this.systemTemperature / this.nodes.length && this.enableSimulation }
                }); q("packedbubble", "bubble", {
                    minSize: "10%", maxSize: "50%", sizeBy: "area", zoneAxis: "y", tooltip: { pointFormat: "Value: {point.value}" }, draggable: !0, useSimulation: !0, dataLabels: {
                        formatter: function () { return this.point.value }, parentNodeFormatter: function () { return this.name }, parentNodeTextPath: { enabled: !0 },
                        padding: 0
                    }, layoutAlgorithm: { initialPositions: "circle", initialPositionRadius: 20, bubblePadding: 5, parentNodeLimit: !1, seriesInteraction: !0, dragBetweenSeries: !1, parentNodeOptions: { maxIterations: 400, gravitationalConstant: .03, maxSpeed: 50, initialPositionRadius: 100, seriesInteraction: !0, marker: { fillColor: null, fillOpacity: 1, lineWidth: 1, lineColor: null, symbol: "circle" } }, enableSimulation: !0, type: "packedbubble", integration: "packedbubble", maxIterations: 1E3, splitSeries: !1, maxSpeed: 5, gravitationalConstant: .01, friction: -.981 }
                },
                    {
                        hasDraggableNodes: !0, forces: ["barycenter", "repulsive"], pointArrayMap: ["value"], pointValKey: "value", isCartesian: !1, axisTypes: [], noSharedTooltip: !0, accumulateAllPoints: function (a) { var c = a.chart, b = [], d, f; for (d = 0; d < c.series.length; d++)if (a = c.series[d], a.visible || !c.options.chart.ignoreHiddenSeries) for (f = 0; f < a.yData.length; f++)b.push([null, null, a.yData[f], a.index, f, { id: f, marker: { radius: 0 } }]); return b }, init: function () {
                            e.prototype.init.apply(this, arguments); g(this, "updatedData", function () {
                                this.chart.series.forEach(function (a) {
                                a.type ===
                                    this.type && (a.isDirty = !0)
                                }, this)
                            }); return this
                        }, render: function () { var c = []; e.prototype.render.apply(this, arguments); this.options.dataLabels.allowOverlap || (this.data.forEach(function (b) { a.isArray(b.dataLabels) && b.dataLabels.forEach(function (a) { c.push(a) }) }), this.chart.hideOverlappingLabels(c)) }, setVisible: function () {
                            var a = this; e.prototype.setVisible.apply(a, arguments); a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeNode(a.parentNode),
                                a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addNodes(a.points) : a.points.forEach(function (b) { a.layout.removeNode(b) }))
                        }, drawDataLabels: function () {
                            var a = this.options.dataLabels.textPath, b = this.points; e.prototype.drawDataLabels.apply(this, arguments); this.parentNode && (this.parentNode.formatPrefix = "parentNode", this.points = [this.parentNode], this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath, e.prototype.drawDataLabels.apply(this, arguments),
                                this.points = b, this.options.dataLabels.textPath = a)
                        }, seriesBox: function () { var b = this.chart, d = Math.max, f = Math.min, e, l = [b.plotLeft, b.plotLeft + b.plotWidth, b.plotTop, b.plotTop + b.plotHeight]; this.data.forEach(function (a) { n(a.plotX) && n(a.plotY) && a.marker.radius && (e = a.marker.radius, l[0] = f(l[0], a.plotX - e), l[1] = d(l[1], a.plotX + e), l[2] = f(l[2], a.plotY - e), l[3] = d(l[3], a.plotY + e)) }); return a.isNumber(l.width / l.height) ? l : null }, calculateParentRadius: function () {
                            var a; a = this.seriesBox(); this.parentNodeRadius = Math.min(Math.max(Math.sqrt(2 *
                                this.parentNodeMass / Math.PI) + 20, 20), a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20); this.parentNode && (this.parentNode.marker.radius = this.parentNodeRadius)
                        }, drawGraph: function () {
                            if (this.layout && this.layout.options.splitSeries) {
                                var b = this.chart, k, f = this.layout.options.parentNodeOptions.marker, f = { fill: f.fillColor || d(this.color).brighten(.4).get(), opacity: f.fillOpacity, stroke: f.lineColor || this.color, "stroke-width": f.lineWidth }; k = this.visible ?
                                    "inherit" : "hidden"; this.parentNodesGroup || (this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", k, .1, b.seriesGroup), this.group.attr({ zIndex: 2 })); this.calculateParentRadius(); k = a.merge({ x: this.parentNode.plotX - this.parentNodeRadius, y: this.parentNode.plotY - this.parentNodeRadius, width: 2 * this.parentNodeRadius, height: 2 * this.parentNodeRadius }, f); this.graph ? this.graph.attr(k) : this.graph = this.parentNode.graphic = b.renderer.symbol(f.symbol).attr(k).add(this.parentNodesGroup)
                            }
                        }, createParentNodes: function () {
                            var a =
                                this, b = a.chart, d = a.parentNodeLayout, f, e = a.parentNode; a.parentNodeMass = 0; a.points.forEach(function (b) { a.parentNodeMass += Math.PI * Math.pow(b.marker.radius, 2) }); a.calculateParentRadius(); d.nodes.forEach(function (b) { b.seriesIndex === a.index && (f = !0) }); d.setArea(0, 0, b.plotWidth, b.plotHeight); f || (e || (e = (new t).init(this, { mass: a.parentNodeRadius / 2, marker: { radius: a.parentNodeRadius }, dataLabels: { inside: !1 }, dataLabelOnNull: !0, degree: a.parentNodeRadius, isParentNode: !0, seriesIndex: a.index })), a.parentNode && (e.plotX =
                                    a.parentNode.plotX, e.plotY = a.parentNode.plotY), a.parentNode = e, d.addSeries(a), d.addNodes([e]))
                        }, addSeriesLayout: function () { var b = this.options.layoutAlgorithm, d = this.chart.graphLayoutsStorage, f = this.chart.graphLayoutsLookup, e = a.merge(b, b.parentNodeOptions, { enableSimulation: this.layout.options.enableSimulation }), l; l = d[b.type + "-series"]; l || (d[b.type + "-series"] = l = new a.layouts[b.type], l.init(e), f.splice(l.index, 0, l)); this.parentNodeLayout = l; this.createParentNodes() }, addLayout: function () {
                            var b = this.options.layoutAlgorithm,
                            d = this.chart.graphLayoutsStorage, f = this.chart.graphLayoutsLookup, e = this.chart.options.chart, l; d || (this.chart.graphLayoutsStorage = d = {}, this.chart.graphLayoutsLookup = f = []); l = d[b.type]; l || (b.enableSimulation = n(e.forExport) ? !e.forExport : b.enableSimulation, d[b.type] = l = new a.layouts[b.type], l.init(b), f.splice(l.index, 0, l)); this.layout = l; this.points.forEach(function (a) { a.mass = 2; a.degree = 1; a.collisionNmb = 1 }); l.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight); l.addSeries(this); l.addNodes(this.points)
                        },
                        deferLayout: function () { var a = this.options.layoutAlgorithm; this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout()) }, translate: function () {
                            var b = this.chart, d = this.data, f = this.index, e, l, h, g, m = this.options.useSimulation; this.processedXData = this.xData; this.generatePoints(); n(b.allDataPoints) || (b.allDataPoints = this.accumulateAllPoints(this), this.getPointRadius()); m ? h = b.allDataPoints : (h = this.placeBubbles(b.allDataPoints), this.options.draggable = !1); for (g = 0; g < h.length; g++)h[g][3] === f && (e = d[h[g][4]],
                                l = h[g][2], m || (e.plotX = h[g][0] - b.plotLeft + b.diffX, e.plotY = h[g][1] - b.plotTop + b.diffY), e.marker = a.extend(e.marker, { radius: l, width: 2 * l, height: 2 * l })); m && this.deferLayout()
                        }, checkOverlap: function (a, b) { var c = a[0] - b[0], d = a[1] - b[1]; return -.001 > Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2]) }, positionBubble: function (a, b, d) {
                            var c = Math.sqrt, f = Math.asin, e = Math.acos, k = Math.pow, g = Math.abs, c = c(k(a[0] - b[0], 2) + k(a[1] - b[1], 2)), e = e((k(c, 2) + k(d[2] + b[2], 2) - k(d[2] + a[2], 2)) / (2 * (d[2] + b[2]) * c)), f = f(g(a[0] - b[0]) / c); a = (0 > a[1] - b[1] ? 0 :
                                Math.PI) + e + f * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1); return [b[0] + (b[2] + d[2]) * Math.sin(a), b[1] - (b[2] + d[2]) * Math.cos(a), d[2], d[3], d[4]]
                        }, placeBubbles: function (a) {
                            var b = this.checkOverlap, c = this.positionBubble, d = [], f = 1, e = 0, g = 0, m; m = []; var n; a = a.sort(function (a, b) { return b[2] - a[2] }); if (a.length) {
                                d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]); if (1 < a.length) for (d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), n = 2; n < a.length; n++)a[n][2] = a[n][2] || 1, m = c(d[f][e], d[f - 1][g], a[n]), b(m, d[f][0]) ? (d.push([]), g = 0, d[f + 1].push(c(d[f][e],
                                    d[f][0], a[n])), f++ , e = 0) : 1 < f && d[f - 1][g + 1] && b(m, d[f - 1][g + 1]) ? (g++ , d[f].push(c(d[f][e], d[f - 1][g], a[n])), e++) : (e++ , d[f].push(m)); this.chart.stages = d; this.chart.rawPositions = [].concat.apply([], d); this.resizeRadius(); m = this.chart.rawPositions
                            } return m
                        }, resizeRadius: function () {
                            var a = this.chart, b = a.rawPositions, d = Math.min, f = Math.max, e = a.plotLeft, h = a.plotTop, g = a.plotHeight, m = a.plotWidth, n, t, v, q, x, u; n = v = Number.POSITIVE_INFINITY; t = q = Number.NEGATIVE_INFINITY; for (u = 0; u < b.length; u++)x = b[u][2], n = d(n, b[u][0] - x),
                                t = f(t, b[u][0] + x), v = d(v, b[u][1] - x), q = f(q, b[u][1] + x); u = [t - n, q - v]; d = d.apply([], [(m - e) / u[0], (g - h) / u[1]]); if (1e-10 < Math.abs(d - 1)) { for (u = 0; u < b.length; u++)b[u][2] *= d; this.placeBubbles(b) } else a.diffY = g / 2 + h - v - (q - v) / 2, a.diffX = m / 2 + e - n - (t - n) / 2
                        }, calculateZExtremes: function () { var c = this.options.zMin, d = this.options.zMax, f = Infinity, e = -Infinity; if (c && d) return [c, d]; this.chart.series.forEach(function (b) { b.yData.forEach(function (b) { a.defined(b) && (b > e && (e = b), b < f && (f = b)) }) }); c = b(c, f); d = b(d, e); return [c, d] }, getPointRadius: function () {
                            var a =
                                this, b = a.chart, d = a.options, f = d.useSimulation, e = Math.min(b.plotWidth, b.plotHeight), h = {}, g = [], m = b.allDataPoints, n, t, v, q, x;["minSize", "maxSize"].forEach(function (a) { var b = parseInt(d[a], 10), c = /%$/.test(d[a]); h[a] = c ? e * b / 100 : b * Math.sqrt(m.length) }); b.minRadius = n = h.minSize / Math.sqrt(m.length); b.maxRadius = t = h.maxSize / Math.sqrt(m.length); x = f ? a.calculateZExtremes() : [n, t]; (m || []).forEach(function (b, c) { v = f ? Math.max(Math.min(b[2], x[1]), x[0]) : b[2]; q = a.getRadius(x[0], x[1], n, t, v); 0 === q && (q = null); m[c][2] = q; g.push(q) });
                            a.radii = g
                        }, redrawHalo: x.redrawHalo, onMouseDown: x.onMouseDown, onMouseMove: x.onMouseMove, onMouseUp: function (b) { if (b.fixedPosition && !b.removed) { var c, d, f = this.layout, e = this.parentNodeLayout; e && f.options.dragBetweenSeries && e.nodes.forEach(function (e) { b && b.marker && e !== b.series.parentNode && (c = f.getDistXY(b, e), d = f.vectorLength(c) - e.marker.radius - b.marker.radius, 0 > d && (e.series.addPoint(a.merge(b.options, { plotX: b.plotX, plotY: b.plotY }), !1), f.removeNode(b), b.remove())) }); x.onMouseUp.apply(this, arguments) } },
                        destroy: function () { this.parentNode && (this.parentNodeLayout.removeNode(this.parentNode), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy())); a.Series.prototype.destroy.apply(this, arguments) }, alignDataLabel: a.Series.prototype.alignDataLabel
                    }, { destroy: function () { this.series.layout && this.series.layout.removeNode(this); return m.prototype.destroy.apply(this, arguments) } }); g(f, "beforeRedraw", function () { this.allDataPoints && delete this.allDataPoints })
            }); y(u, "parts-more/Polar.js",
                [u["parts/Globals.js"]], function (a) {
                    var q = a.pick, e = a.Series, m = a.seriesTypes, n = a.wrap, b = e.prototype, g = a.Pointer.prototype; b.searchPointByAngle = function (a) { var b = this.chart, f = this.xAxis.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - f[0] - b.plotLeft, a.chartY - f[1] - b.plotTop) }) }; b.getConnectors = function (a, b, e, g) {
                        var d, c, f, m, n, l, h, t; c = g ? 1 : 0; d = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0; b = 0 > d - 1 ? a.length - (1 + c) : d - 1; c = d + 1 > a.length - 1 ? c : d + 1; f = a[b]; c = a[c]; m = f.plotX; f = f.plotY; n =
                            c.plotX; l = c.plotY; c = a[d].plotX; d = a[d].plotY; m = (1.5 * c + m) / 2.5; f = (1.5 * d + f) / 2.5; n = (1.5 * c + n) / 2.5; h = (1.5 * d + l) / 2.5; l = Math.sqrt(Math.pow(m - c, 2) + Math.pow(f - d, 2)); t = Math.sqrt(Math.pow(n - c, 2) + Math.pow(h - d, 2)); m = Math.atan2(f - d, m - c); h = Math.PI / 2 + (m + Math.atan2(h - d, n - c)) / 2; Math.abs(m - h) > Math.PI / 2 && (h -= Math.PI); m = c + Math.cos(h) * l; f = d + Math.sin(h) * l; n = c + Math.cos(Math.PI + h) * t; h = d + Math.sin(Math.PI + h) * t; c = { rightContX: n, rightContY: h, leftContX: m, leftContY: f, plotX: c, plotY: d }; e && (c.prevPointCont = this.getConnectors(a, b, !1, g));
                        return c
                    }; b.toXY = function (a) { var b, f = this.chart, e = a.plotX; b = a.plotY; a.rectPlotX = e; a.rectPlotY = b; b = this.xAxis.postTranslate(a.plotX, this.yAxis.len - b); a.plotX = a.polarPlotX = b.x - f.plotLeft; a.plotY = a.polarPlotY = b.y - f.plotTop; this.kdByAngle ? (f = (e / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > f && (f += 360), a.clientX = f) : a.clientX = a.plotX }; m.spline && (n(m.spline.prototype, "getPointSpline", function (a, b, e, g) {
                        this.chart.polar ? g ? (a = this.getConnectors(b, g, !0, this.connectEnds), a = ["C", a.prevPointCont.rightContX,
                            a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", e.plotX, e.plotY] : a = a.call(this, b, e, g); return a
                    }), m.areasplinerange && (m.areasplinerange.prototype.getPointSpline = m.spline.prototype.getPointSpline)); a.addEvent(e, "afterTranslate", function () {
                        var b = this.chart, d, e; if (b.polar) {
                            (this.kdByAngle = b.tooltip && b.tooltip.shared) ? this.searchPoint = this.searchPointByAngle : this.options.findNearestPointBy = "xy"; if (!this.preventPostTranslate) for (d = this.points, e = d.length; e--;)this.toXY(d[e]),
                                !b.hasParallelCoordinates && !this.yAxis.reversed && d[e].y < this.yAxis.min && (d[e].isNull = !0); this.hasClipCircleSetter || (this.hasClipCircleSetter = !!a.addEvent(this, "afterRender", function () { var d; b.polar && (d = this.yAxis.center, this.group.clip(b.renderer.clipCircle(d[0], d[1], d[2] / 2)), this.setClip = a.noop) }))
                        }
                    }, { order: 2 }); n(b, "getGraphPath", function (a, b) {
                        var d = this, e, f, c; if (this.chart.polar) {
                            b = b || this.points; for (e = 0; e < b.length; e++)if (!b[e].isNull) { f = e; break } !1 !== this.options.connectEnds && void 0 !== f && (this.connectEnds =
                                !0, b.splice(b.length, 0, b[f]), c = !0); b.forEach(function (a) { void 0 === a.polarPlotY && d.toXY(a) })
                        } e = a.apply(this, [].slice.call(arguments, 1)); c && b.pop(); return e
                    }); e = function (a, b) {
                        var d = this.chart, e = this.options.animation, f = this.group, c = this.markerGroup, k = this.xAxis.center, g = d.plotLeft, m = d.plotTop; d.polar ? d.renderer.isSVG && (!0 === e && (e = {}), b ? (a = { translateX: k[0] + g, translateY: k[1] + m, scaleX: .001, scaleY: .001 }, f.attr(a), c && c.attr(a)) : (a = { translateX: g, translateY: m, scaleX: 1, scaleY: 1 }, f.animate(a, e), c && c.animate(a,
                            e), this.animate = null)) : a.call(this, b)
                    }; n(b, "animate", e); m.column && (m = m.column.prototype, m.polarArc = function (a, b, e, g) { var d = this.xAxis.center, c = this.yAxis.len; return this.chart.renderer.symbols.arc(d[0], d[1], c - b, null, { start: e, end: g, innerR: c - q(a, c) }) }, n(m, "animate", e), n(m, "translate", function (a) {
                        var b = this.xAxis, e = b.startAngleRad, f, g, c; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) for (f = this.points, c = f.length; c--;)g = f[c], a = g.barX + e, g.shapeType = "path", g.shapeArgs = {
                            d: this.polarArc(g.yBottom,
                                g.plotY, a, a + g.pointWidth)
                        }, this.toXY(g), g.tooltipPos = [g.plotX, g.plotY], g.ttBelow = g.plotY > b.center[1]
                    }), n(m, "alignDataLabel", function (a, d, e, g, m, c) { this.chart.polar ? (a = d.rectPlotX / Math.PI * 180, null === g.align && (g.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === g.verticalAlign && (g.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), b.alignDataLabel.call(this, d, e, g, m, c)) : a.call(this, d, e, g, m, c) })); n(g, "getCoordinates", function (a, b) {
                        var d = this.chart, e = { xAxis: [], yAxis: [] }; d.polar ?
                            d.axes.forEach(function (a) { var c = a.isXAxis, f = a.center, g = b.chartX - f[0] - d.plotLeft, f = b.chartY - f[1] - d.plotTop; e[c ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(c ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) }) }) : e = a.call(this, b); return e
                    }); a.SVGRenderer.prototype.clipCircle = function (b, d, e) { var f = a.uniqueKey(), g = this.createElement("clipPath").attr({ id: f }).add(this.defs); b = this.circle(b, d, e).add(g); b.id = f; b.clipPath = g; return b }; a.addEvent(a.Chart, "getAxes", function () {
                    this.pane ||
                        (this.pane = []); a.splat(this.options.pane).forEach(function (b) { new a.Pane(b, this) }, this)
                    }); a.addEvent(a.Chart, "afterDrawChartBox", function () { this.pane.forEach(function (a) { a.render() }) }); n(a.Chart.prototype, "get", function (b, d) { return a.find(this.pane, function (a) { return a.options.id === d }) || b.call(this, d) })
                }); y(u, "masters/highcharts-more.src.js", [], function () { })
});
//# sourceMappingURL=highcharts-more.js.map