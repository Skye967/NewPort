// Geometry and drawing for Contact's wind lines. A bundle follows one guide
// curve: a gentle wave entering from the left edge that winds into a curl at
// its far end. Every line in the bundle is the guide offset sideways, with its
// own start and end, so the bundle fans and thins out; only the lead line (no
// offset) runs on into the curl.

type Point = { x: number; y: number; th: number; f: number };
type Line = {
  o: number;
  s0: number;
  s1: number;
  w: number;
  lead: boolean;
  edge: boolean;
};
export type Bundle = {
  pts: Point[];
  lines: Line[];
  depth: number;
  delay: number;
  dur: number;
};

const STEP = 2;
const LINE_STAGGER = 110;
// Back to front: deeper bundles are darker.
const COLORS = ["#4a4a45", "#7d7d75", "#b5b5ab"];

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeOut = (x: number) => 1 - (1 - Math.min(1, Math.max(0, x))) ** 3;
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

// Seeded so every visitor gets the same composition at a given size.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function guide(
  rng: () => number,
  x: number,
  y: number,
  heading: number,
  len: number,
  curlDir: number,
) {
  // The curl has a set length, so long lines don't get oversized loops.
  const curlLen = Math.min(len * 0.32, 120 + rng() * 70);
  const n = Math.round(len / STEP);
  const curlAt = 1 - curlLen / len;
  const turns = 0.85 + rng() * 0.35;
  const kmax = (2 * Math.PI * turns * 2.2) / curlLen;
  // About two waves along any length, with a bend that shrinks as the line
  // grows, so long lines undulate instead of wandering off course.
  const swayA = (0.004 + rng() * 0.004) * Math.min(1, 350 / len);
  const swayF = 10 + rng() * 4;
  const phase = rng() * 6.28;
  const pts: Point[] = [];
  let th = heading;
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    pts.push({ x, y, th, f });
    const k =
      f < curlAt
        ? swayA * Math.sin(f * swayF + phase) - 0.006 * wrapAngle(th - heading)
        : curlDir * kmax * ((f - curlAt) / (1 - curlAt)) ** 1.2;
    th += k * STEP;
    x += Math.cos(th) * STEP;
    y += Math.sin(th) * STEP;
  }
  return { pts, curlAt };
}

function bundle(
  rng: () => number,
  y: number,
  heading: number,
  len: number,
  depth: number,
): Bundle {
  const curlDir = rng() < 0.5 ? -1 : 1;
  const { pts, curlAt } = guide(rng, -12, y, heading, len, curlDir);
  const count = 2 + ((rng() * 4) | 0);
  const gap = 6 + rng() * 5;
  const side = rng() < 0.5 ? -1 : 1;
  const wmax = (3 + rng() * 2) * (0.75 + depth * 0.15);
  const lines: Line[] = [
    { o: 0, s0: 0, s1: 1, w: wmax, lead: true, edge: true },
  ];
  for (let j = 1; j < count; j++) {
    // Mostly to one side of the lead line, with the odd one crossing over.
    const o = (rng() < 0.8 ? side : -side) * gap * (j - (rng() - 0.5) * 0.4);
    const s0 = rng() * 0.1;
    const s1 = curlAt * (0.55 + rng() * 0.4);
    if (s1 - s0 > 0.15) {
      const w = wmax * (0.6 + rng() * 0.35);
      lines.push({ o, s0, s1, w, lead: false, edge: s0 < 0.02 });
    }
  }
  return { pts, lines, depth, delay: rng() * 900, dur: 2200 + len * 2.2 };
}

// Rows run top to bottom, each entering just past the left edge. Lengths are
// spread evenly from a fifth of the width to all of it, then shuffled between
// rows, so the curls land all the way across.
export function compose(width: number, height: number, seed: number) {
  const rng = mulberry32(seed);
  const count = Math.max(9, Math.min(18, Math.round(height / 42)));
  const reach = Array.from(
    { length: count },
    (_, i) => 0.2 + (0.85 * (i + rng())) / count,
  );
  for (let i = reach.length - 1; i > 0; i--) {
    const j = (rng() * (i + 1)) | 0;
    [reach[i], reach[j]] = [reach[j], reach[i]];
  }
  const bundles: Bundle[] = [];
  for (let i = 0; i < count; i++) {
    const depth = rng() < 0.25 ? 0 : rng() < 0.5 ? 1 : 2;
    const y = height * (0.08 + (0.88 * (i + 0.5)) / count) + (rng() - 0.5) * 24;
    const heading = (rng() - 0.5) * 0.3;
    bundles.push(bundle(rng, y, heading, width * reach[i], depth));
  }
  return bundles.sort((a, b) => a.depth - b.depth);
}

// When the last line has finished drawing; the eased tail makes up the 1.15.
export function duration(bundles: Bundle[]) {
  return Math.max(
    ...bundles.map(
      (b) => b.delay + b.lines.length * LINE_STAGGER + b.dur * 1.15,
    ),
  );
}

// Width along a line, u from 0 to 1: lines entering at the edge start at
// weight, then thin to a fine point. The lead line keeps some weight into the
// curl so the spiral still reads.
function widthAt(line: Line, u: number) {
  if (line.edge) u = 0.35 + 0.65 * u;
  if (line.lead) {
    const body = Math.sin(Math.PI * Math.min(1, u * 0.62 + 0.04)) ** 0.9;
    return line.w * body * (1 - 0.6 * smooth(0.75, 1, u)) + 0.4;
  }
  return line.w * Math.sin(Math.PI * u) ** 0.8;
}

// Fills the line's outline up to `grow` of its length, so it draws on like a
// pen stroke.
function drawLine(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  line: Line,
  grow: number,
) {
  const last = pts.length - 1;
  const i0 = Math.round(line.s0 * last);
  const i1 = Math.round(line.s1 * last);
  const end = Math.round(i0 + (i1 - i0) * grow);
  if (end - i0 < 2) return;
  const left: number[] = [];
  const right: number[] = [];
  for (let i = i0; i <= end; i++) {
    const p = pts[i];
    const nx = -Math.sin(p.th);
    const ny = Math.cos(p.th);
    const cx = p.x + nx * line.o;
    const cy = p.y + ny * line.o;
    const hw = widthAt(line, (i - i0) / (i1 - i0)) / 2;
    left.push(cx + nx * hw, cy + ny * hw);
    right.push(cx - nx * hw, cy - ny * hw);
  }
  ctx.beginPath();
  ctx.moveTo(left[0], left[1]);
  for (let k = 2; k < left.length; k += 2) ctx.lineTo(left[k], left[k + 1]);
  for (let k = right.length - 2; k >= 0; k -= 2)
    ctx.lineTo(right[k], right[k + 1]);
  ctx.closePath();
  ctx.fill();
}

// Draws every bundle as it stands `time` ms in; Infinity draws the end state.
export function render(
  ctx: CanvasRenderingContext2D,
  bundles: Bundle[],
  time: number,
) {
  for (const b of bundles) {
    if (time - b.delay <= 0) continue;
    ctx.fillStyle = COLORS[b.depth];
    b.lines.forEach((line, j) => {
      const start = b.delay + j * LINE_STAGGER + line.s0 * b.dur * 0.3;
      const grow = easeOut((time - start) / (b.dur * 0.85));
      if (grow > 0) drawLine(ctx, b.pts, line, grow);
    });
  }
}
