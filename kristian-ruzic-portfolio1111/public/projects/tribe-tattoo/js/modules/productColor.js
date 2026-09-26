/**
 * productColor.js
 * Client-side "recolors" a product photo (tee/hoodie/tote mockup) to a
 * chosen swatch color, entirely in the browser via <canvas> — there is
 * only one photographed color per product, so a different color is
 * synthesized rather than swapped in from a second photo.
 *
 * How it works (per image, computed once and cached):
 *  1. Separate "garment" pixels from the neutral studio backdrop using
 *     two per-pixel signals: darkness (a black/charcoal garment is much
 *     darker than the backdrop ever gets) and saturation (a colored
 *     garment, e.g. the natural canvas tote, has real hue/chroma the
 *     grey backdrop never has, even where the two are similarly light).
 *  2. Within the garment, find the printed logo ink by looking for
 *     pixels whose lightness departs strongly from the garment's own
 *     typical (median) tone — the ink is a small minority of the
 *     garment's pixels, so the median is robust to it either way:
 *     light ink on a dark garment (tee/hoodie) or dark ink on a light
 *     one (tote) are both found the same way.
 *  3. Record the garment fabric's lightness range (2nd–98th percentile,
 *     ink excluded) so shading/folds can be preserved when recoloring.
 *
 * To recolor to a target swatch: fabric pixels keep their relative
 * lightness (folds/shadows/highlights) but are remapped into a
 * lightness band around the target color, with hue/saturation replaced
 * by the target's — the classic "colorize" technique. Ink pixels are
 * NOT colorized to the target hue — instead they're pushed to whichever
 * side keeps them legible: light ink on a dark target, dark ink on a
 * light one, exactly like a real print would be re-run for a new
 * garment color.
 *
 * Results are cached per (image src, color name) so repeated clicks are
 * instant after the first computation.
 */

const maskCache = new Map(); // src -> { data, mask, inkMask, width, height, lmin, lmax }
const resultCache = new Map(); // `${src}::${color}` -> data URL

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function smoothstep(x, edge0, edge1) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Returns a boolean (0/1) Uint8Array marking every pixel that is truly
 * part of the neutral studio backdrop, found by flood-filling inward
 * from the image border through pixels that score `rawMask < 0.5`
 * ("not confidently garment" by darkness/saturation).
 *
 * This is exact rather than radius-based: in these product photos the
 * backdrop always touches all four edges of the frame and the garment
 * never does, so any "not confidently garment" pixel that ISN'T
 * reachable from the border by walking through other such pixels must
 * be enclosed by garment on every side — e.g. a white-ink letter
 * printed on a black tee, which scores rawMask=0 (it's neither dark
 * nor saturated) but sits surrounded by dark fabric, not open
 * background. Flood-filling finds the true backdrop regardless of the
 * garment's silhouette (concave spots like a neckline or underarm stay
 * background, since real background there is still connected to the
 * border) with no fixed search radius, and so no risk of leaking a
 * dilated band of "maybe ink" out past the garment's actual edge.
 */
function floodFillBackground(rawMask, width, height) {
  const pixelCount = width * height;
  const passable = new Uint8Array(pixelCount);
  for (let i = 0; i < pixelCount; i++) passable[i] = rawMask[i] < 0.5 ? 1 : 0;

  const visited = new Uint8Array(pixelCount);
  const stack = [];
  const pushIfPassable = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const idx = y * width + x;
    if (!passable[idx] || visited[idx]) return;
    visited[idx] = 1;
    stack.push(idx);
  };

  for (let x = 0; x < width; x++) {
    pushIfPassable(x, 0);
    pushIfPassable(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfPassable(0, y);
    pushIfPassable(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    const x = idx % width;
    const y = (idx / width) | 0;
    pushIfPassable(x - 1, y);
    pushIfPassable(x + 1, y);
    pushIfPassable(x, y - 1);
    pushIfPassable(x, y + 1);
  }

  return visited;
}

function computeMasks(data, width, height) {
  const DARK_HIGH = 0.36; // at/below this lightness: fully "garment" by darkness
  const DARK_LOW = 0.5; // at/above this lightness: not garment by darkness
  const SAT_LOW = 0.05; // at/below this saturation: not garment by color
  const SAT_HIGH = 0.13; // at/above this saturation: fully "garment" by color
  // Lightness gap from the garment's typical tone, past which a pixel
  // is confidently ink rather than fabric. This has to sit above the
  // swing a photographed fold or seam can produce on its own — e.g. the
  // canvas tote's handle has a genuine shadow crease that gets noticeably
  // darker than the fabric's typical tone purely from studio lighting,
  // with nothing printed there at all — while still sitting well below
  // how far a real printed logo departs from that tone (measured at
  // ~0.7-0.9 across these product photos, against a worst-case ~0.55-0.57
  // for ordinary fabric shading), so the two don't get confused.
  const DEVIATION_LOW = 0.6;
  const DEVIATION_HIGH = 0.7;

  const pixelCount = width * height;
  const lArr = new Float32Array(pixelCount);
  const rawMask = new Float32Array(pixelCount); // garment-vs-background only, ink not yet separated
  const rawSamples = [];

  for (let i = 0; i < pixelCount; i++) {
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const [, s, l] = rgbToHsl(r, g, b);
    lArr[i] = l;

    const dark = 1 - smoothstep(l, DARK_HIGH, DARK_LOW);
    const colorful = smoothstep(s, SAT_LOW, SAT_HIGH);
    const m = Math.max(dark, colorful);
    rawMask[i] = m;
    if (m > 0.5) rawSamples.push(l);
  }

  // The printed logo is a small minority of the garment's pixels, so
  // the median lightness of the garment-vs-background mask is set by
  // the fabric itself — a robust "typical tone" even though rawMask
  // doesn't yet know fabric from ink.
  rawSamples.sort((a, b) => a - b);
  const fabricModeL = rawSamples.length ? rawSamples[Math.floor(rawSamples.length / 2)] : 0.2;

  // Neither "dark" nor "colorful" isn't the same as "background": a
  // bright white-ink print on a dark garment scores rawMask=0, and so
  // does a soft studio highlight on a light garment (the tote's handle
  // curve and base gusset are only mildly saturated where the light
  // catches them) — both would be wrongly left untouched (not
  // recolored at all) if we only handled confidently-"dark or
  // colorful" pixels. What actually distinguishes them from real
  // background is enclosure: real background is reachable from the
  // photo's frame by walking through other backdrop pixels, while a
  // print or a highlight sits surrounded by garment on every side. So
  // every enclosed pixel — regardless of its own darkness/saturation —
  // is claimed in full, as fabric or as ink, decided purely by how far
  // its lightness departs from the garment's own typical tone.
  const isBackground = floodFillBackground(rawMask, width, height);

  const mask = new Float32Array(pixelCount);
  const inkMask = new Float32Array(pixelCount);
  const lightSamples = [];

  for (let i = 0; i < pixelCount; i++) {
    if (isBackground[i]) continue; // true backdrop, never touched

    const deviation = Math.abs(lArr[i] - fabricModeL);
    const inkT = smoothstep(deviation, DEVIATION_LOW, DEVIATION_HIGH);
    inkMask[i] = inkT;
    const fabricM = 1 - inkT;
    mask[i] = fabricM;
    if (fabricM > 0.5) lightSamples.push(lArr[i]);
  }

  return { mask, inkMask, lightSamples };
}

async function getMaskAndStats(src) {
  if (maskCache.has(src)) return maskCache.get(src);

  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const { mask, inkMask, lightSamples } = computeMasks(data, width, height);

  lightSamples.sort((a, b) => a - b);
  const pct = (p) => lightSamples[Math.max(0, Math.min(lightSamples.length - 1, Math.floor(lightSamples.length * p)))] ?? 0.2;
  const lmin = lightSamples.length ? pct(0.02) : 0.05;
  const lmax = lightSamples.length ? pct(0.98) : 0.45;

  const stats = { data, mask, inkMask, width, height, lmin, lmax: Math.max(lmax, lmin + 0.05) };
  maskCache.set(src, stats);
  return stats;
}

/**
 * Returns a data: URL of `src` recolored toward `colorHex`, cached after
 * the first computation for a given (src, colorName) pair.
 */
export async function getRecoloredImage(src, colorName, colorHex) {
  const cacheKey = `${src}::${colorName}`;
  if (resultCache.has(cacheKey)) return resultCache.get(cacheKey);

  const { data, mask, inkMask, width, height, lmin, lmax } = await getMaskAndStats(src);
  const [tr, tg, tb] = hexToRgb(colorHex);
  const [th, ts, targetBaseL] = rgbToHsl(tr, tg, tb);

  // Band the recolored fabric lightness around the target's own
  // lightness so a dark swatch stays dark and a light swatch stays
  // light, while still keeping some of the original shading contrast.
  const spread = Math.min(0.16, Math.max(0.06, (lmax - lmin) * 0.6));
  const targetLMin = Math.max(0.04, targetBaseL - spread);
  const targetLMax = Math.min(0.97, Math.max(targetLMin + 0.05, targetBaseL + spread * 0.6));

  // Keep the printed logo legible against whatever color was picked:
  // light ink on a dark garment, dark ink on a light one — flipped
  // relative to the CHOSEN color, not however the ink was originally
  // photographed (the tote's print is dark-on-cream as shot, the
  // tee/hoodie's is white-on-black; either can need to flip).
  const targetIsLight = targetBaseL > 0.55;
  const inkL = targetIsLight ? 0.13 : 0.94;
  const inkS = ts * 0.2; // mostly neutral ink, just a faint tint of the garment hue
  const [inkR, inkG, inkB] = hslToRgb(th, inkS, inkL);

  const out = new Uint8ClampedArray(data); // copy — never mutate the cached original
  const pixelCount = width * height;

  for (let i = 0; i < pixelCount; i++) {
    const m = mask[i];
    const im = inkMask[i];
    if (m <= 0 && im <= 0) continue;
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];

    let nr = r;
    let ng = g;
    let nb = b;
    if (m > 0) {
      const [, , l] = rgbToHsl(r, g, b);
      const lnorm = lmax > lmin ? Math.max(0, Math.min(1, (l - lmin) / (lmax - lmin))) : 0.5;
      const newL = targetLMin + lnorm * (targetLMax - targetLMin);
      [nr, ng, nb] = hslToRgb(th, ts, newL);
    }

    out[o] = r + (nr - r) * m + (inkR - r) * im;
    out[o + 1] = g + (ng - g) * m + (inkG - g) * im;
    out[o + 2] = b + (nb - b) * m + (inkB - b) * im;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.putImageData(new ImageData(out, width, height), 0, 0);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  resultCache.set(cacheKey, dataUrl);
  return dataUrl;
}
