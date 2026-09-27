/* SAHNE 1 — BAHÇE (0–10 s)  x ve x + 3 kenarlı bir bahçeye çit.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  /** a table: header items, rows of cells; row i appears at t0 + i*dt; hot column glows */
  function table(ctx, T, head, rowsIn, t, t0, dt, a, s, hotCol, hotOn) {
    if (a <= 0) return;
    const f = F(), hk = seg(t, t0 - 0.6, t0 - 0.2) * a;
    head.forEach((h, j) => f.expr(ctx, typeof h === 'string' ? [h] : h, T.x + T.cols[j], T.y0, s * 0.72, { alpha: hk, halo: true, color: j === hotCol ? A.amber : undefined }));
    if (hk > 0) Ink.path(ctx, [[T.x + T.cols[0] - 130, T.y0 + 32], [T.x + T.cols[T.cols.length - 1] + 130, T.y0 + 32]], { w: 3, alpha: hk, seed: 9000, taper: [0, 0] });
    rowsIn.forEach((r, i) => {
      const k = seg(t, t0 + i * dt, t0 + i * dt + 0.4) * a; if (k <= 0) return;
      r.forEach((c, j) => f.expr(ctx, typeof c === 'string' ? [c] : c, T.x + T.cols[j], T.y0 + (i + 1) * T.dy + 10, s * 0.82, { alpha: k, halo: true, color: j === hotCol && hotOn ? A.amber : undefined }));
    });
  }
  /** rows of working at P; each [t0, t1, i, items, hot, tick, cross] */
  function rows(ctx, P, list, t, s, W) {
    const f = F();
    list.forEach(([t0, t1, i, items, hot, tick, cross]) => {
      const k = win(t, t0, t1); if (k <= 0) return;
      const y = P.y0 + i * P.dy;
      f.expr(ctx, items, P.x, y, s * 0.86, { alpha: k, halo: true, color: hot ? A.amber : undefined, w: W });
      if (tick) f.tick(ctx, P.x + tick, y - 6, seg(t, t0 + 0.4, t0 + 1.0), k);
      if (cross) f.crossInk(ctx, P.x + cross, y, 18, seg(t, t0 + 0.4, t0 + 1.2), k);
    });
  }

  /** one algebra tile: 'x' is a long bar, '1' a unit square */
  function tile(ctx, T, kind, x, y, a, hot, seed) {
    if (a <= 0) return;
    const w = kind === 'x' ? T.xw : T.u, h = T.u;
    ctx.fillStyle = kind === 'x' ? amber((hot ? 0.75 : 0.5) * a) : `rgba(${LI.INK_RGB},${0.12 * a})`;
    ctx.fillRect(x, y - h / 2, w, h);
    Ink.path(ctx, [[x, y - h / 2], [x + w, y - h / 2], [x + w, y + h / 2], [x, y + h / 2], [x, y - h / 2]], { w: 3, alpha: a, seed, taper: [0, 0] });
    if (kind === 'x') F().T(ctx, 'x', x + w / 2, y, { size: T.u * 0.8, alpha: a });
  }
  /** left x of each tile in a row of groups (groups get wider gaps), centred at cx */
  function layout(T, groups, cx) {
    const out = []; let w = 0;
    groups.forEach((g, gi) => { g.forEach((k, i) => { out.push([k, w]); w += (k === 'x' ? T.xw : T.u) + (i < g.length - 1 ? T.g : 0); }); if (gi < groups.length - 1) w += T.g * 5; });
    return out.map(([k, x]) => [k, cx - w / 2 + x]);
  }
  const ORIG = [['x', '1', '1', '1'], ['x'], ['x', '1', '1', '1'], ['x']];
  const GROUP = [['x', 'x', 'x', 'x'], ['1', '1', '1', '1', '1', '1']];

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Dikdörtgen bir bahçenin çevresine çit çekilecek'],
      [10.6, 27.8, 'Toplama: çevreyi cebirsel ifadeyle yazalım'],
      [28.4, 45.8, 'Bir rasyonel sayıyla çarpma'],
      [46.4, 63.8, 'Çıkarma'],
      [64.4, 79.8, 'Hangi ifadeler denk?'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, T = L.TL, P = L.PN, D = L.GD, V = env.V, WW = V ? 900 : 1000;
    // 0–10: the garden
    const g1 = win(t, 4.6, 10.2) * a;
    if (g1 > 0) {
      const x0 = D.x - D.w / 2, x1 = D.x + D.w / 2, y0 = D.y - D.h / 2, y1 = D.y + D.h / 2;
      ctx.fillStyle = `rgba(${LI.INK_RGB},${0.06 * g1})`; ctx.fillRect(x0, y0, D.w, D.h);
      Ink.path(ctx, [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]], { w: 5, p: seg(t, 4.8, 6.2), alpha: g1, seed: 9300, taper: [0, 0], color: LI.AMBER_RGB });
      const k = seg(t, 6.2, 6.6) * g1;
      f.T(ctx, 'x + 3', D.x, y0 - 30, { size: s * 0.8, alpha: k });
      f.T(ctx, 'x + 3', D.x, y1 + 34, { size: s * 0.8, alpha: k });
      f.T(ctx, 'x', x0 - 30, D.y, { size: s * 0.8, alpha: k });
      f.T(ctx, 'x', x1 + 30, D.y, { size: s * 0.8, alpha: k });
      f.T(ctx, 'çit: ? m', D.x, D.y, { size: s * 0.8, alpha: g1 * seg(t, 8.8, 9.2), color: A.amber });
    }
    // 10–28: the perimeter, tiles regroup
    rows(ctx, P, [[11.4, 27.8, 0, ['Çevre = (x + 3) + x + (x + 3) + x']]], t, s, WW);
    const t2 = win(t, 12.6, 27.8) * a;
    if (t2 > 0) {
      const A0 = layout(T, ORIG, T.x), B0 = layout(T, GROUP, T.x), m = inOut(seg(t, 16.0, 18.0));
      const xi = [0, 4, 5, 9], oi = [1, 2, 3, 6, 7, 8];
      xi.forEach((o, j) => tile(ctx, T, 'x', lerp(A0[o][1], B0[j][1], m), T.y, t2 * seg(t, 12.6 + o * 0.12, 13.0 + o * 0.12), m > 0.99, 9310 + j));
      oi.forEach((o, j) => tile(ctx, T, '1', lerp(A0[o][1], B0[4 + j][1], m), T.y, t2 * seg(t, 12.6 + o * 0.12, 13.0 + o * 0.12), false, 9320 + j));
    }
    rows(ctx, { x: P.x, y0: T.y + (V ? 90 : 100), dy: P.dy }, [[18.4, 27.8, 0, ['= x + x + x + x + 3 + 3 = 4x + 6'], true]], t, s, WW);
    // 28–37: two gardens
    const t3 = win(t, 28.8, 36.8) * a;
    if (t3 > 0) {
      [-1, 1].forEach((r, ri) => layout(T, GROUP, T.x).forEach(([k, x], i) => tile(ctx, T, k, x, T.y + r * (T.u * 0.8), t3 * seg(t, 29.2 + ri * 0.8, 29.6 + ri * 0.8), false, 9340 + ri * 20 + i)));
    }
    rows(ctx, P, [[29.4, 36.8, 0, ['2 · (4x + 6) = 2 · 4x + 2 · 6 = 8x + 12']], [37.2, 45.8, 0, [fr(1, 2), ' · (4x + 6) = ', fr(1, 2), ' · 4x + ', fr(1, 2), ' · 6 = 2x + 3']]], t, s, WW);
    rows(ctx, { x: P.x, y0: T.y + (V ? 110 : 120), dy: P.dy }, [[32.4, 36.8, 0, ['x = 5 için: 2 · 26 = 52 ve 8 · 5 + 12 = 52'], true, V ? 400 : 400], [40.0, 45.8, 0, ['Yarım çit: 2x + 3'], true]], t, s, WW);
    // 37–46: half
    const t4 = win(t, 37.4, 45.8) * a;
    if (t4 > 0) layout(T, GROUP, T.x).forEach(([k, x], i) => { const keep = (i < 2) || (i >= 4 && i < 7); tile(ctx, T, k, x, T.y, t4 * (keep ? 1 : 1 - 0.8 * seg(t, 38.6, 39.4)), keep && t > 38.6, 9380 + i); });
    // 46–64: subtraction
    rows(ctx, P, [[47.4, 63.8, 0, ['Kapı için 1,5 m boşluk: 4x + 6 − 1,5 = 4x + 4,5']], [50.4, 63.8, 1, ['Ece’nin çiti 6x + 2 m, Can’ınki 4x + 6 m. Fark?']],
      [52.6, 63.8, 2, ['(6x + 2) − (4x + 6) = 6x + 2 − 4x − 6']], [55.0, 63.8, 3, ['= 2x − 4'], true]], t, s, WW);
    // 64–80: which forms are equivalent?
    const t5 = win(t, 65.0, 79.8) * a;
    table(ctx, L.TB, ['x', '(x+3)+x+(x+3)+x', '4x + 6', '2 · (2x + 3)', '10x'], [['1', '10', '10', '10', '10'], ['2', '14', '14', '14', '20'], ['3', '18', '18', '18', '30']], t, 65.6, 1.2, t5, s * 0.9, 4, t > 69.4);
    if (t5 > 0 && t > 69.8) { const B = L.TB; f.crossInk(ctx, B.x + B.cols[4] + 60, B.y0 + 2 * B.dy + 10, 16, seg(t, 69.8, 70.6), t5); }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Kısa kenar x m, uzun kenar x + 3 m'], [11.4, 27.8, 'Dört kenarı topla: x çubukları ve birim kareler'],
      [29.4, 36.8, 'Aynı bahçeden iki tane: çit 2 katı'], [37.4, 45.8, 'Yarısı kadar çit: 1/2 ile çarp'], [47.4, 63.8, 'Çıkarma: kapı boşluğu ve iki çitin farkı'],
      [65.4, 79.8, 'x yerine sayılar koyarak karşılaştır']]);
    exprs(ctx, t, at(W, 1), [[16.4, 27.8, 'Değişme ve birleşme: x’leri bir araya, sayıları bir araya topla'], [31.0, 36.8, 'Dağılma: 2 hem 4x’i hem 6’yı çarpar'],
      [39.4, 45.8, '1/2 · 4x = 2x, 1/2 · 6 = 3'], [53.0, 63.8, 'Parantezin önündeki eksi, içindeki her terimin işaretini değiştirir'],
      [69.4, 79.8, '10x, x = 1’de tuttu ama x = 2’de tutmadı']]);
    exprs(ctx, t, at(W, 2), [[8.8, 10.2, 'Çit için kaç metre tel gerekir?', true], [21.0, 27.8, 'Çevre = 4x + 6', true],
      [33.8, 36.8, '2 · (4x + 6) ile 8x + 12 denk ifadeler', true], [41.6, 45.8, 'Denk ifadeler her x için aynı sonucu verir', true],
      [57.4, 63.8, 'İşaretlere dikkat: 6x − 4x = 2x, 2 − 6 = −4', true],
      [75.0, 79.8, 'Tek örnek yetmez: 4x + 6 ile 10x denk değil', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Benzer terimleri topla: 4x + 6', 80.6], ['Dağılma: 2 · (4x + 6) = 8x + 12', 81.6], ['Eksi, parantezdeki her terime dağılır', 82.6], ['Denk ifadeler her x için aynı değeri verir!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A garden', nameTr: 'Bahçe', concept: 'x and x + 3', conceptTr: 'x ve x + 3', render });
})(window.LI = window.LI || {});
