/* Shared layout + Nokta helpers for "Çit Ne Kadar?". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          CX: { x: 0, y: -780, s: 42, w: 980 },
          G: { s: 40 }, GD: { x: 0, y: -560, w: 360, h: 210 }, TL: { x: 0, y: -560, xw: 96, u: 26, g: 8 }, PN: { x: 0, y0: -700, dy: 70 }, TB: { x: 0, y0: -700, dy: 62, cols: [-400, -200, 0, 200, 390] }, EX: { y: -600 }, NL: { x0: -400, x1: 400, y: -380 },
          W: { x: 0, y: [-190, -105, -20], s: 42, w: 980 },
          SUM: { x: 0, y: [-240, -150, -60, 40], s: 42, w: 980 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          CX: { x: 60, y: -445, s: 48, w: 1300 },
          G: { s: 44 }, GD: { x: 180, y: -210, w: 420, h: 240 }, TL: { x: 160, y: -190, xw: 120, u: 32, g: 10 }, PN: { x: 160, y0: -330, dy: 80 }, TB: { x: 160, y0: -350, dy: 62, cols: [-420, -170, 60, 270, 470] }, EX: { y: -290 }, NL: { x0: -220, x1: 640, y: -60 },
          W: { x: 110, y: [128, 196, 262], s: 46, w: 1250 },
          SUM: { x: 110, y: [10, 90, 170, 250], s: 48, w: 1250 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
