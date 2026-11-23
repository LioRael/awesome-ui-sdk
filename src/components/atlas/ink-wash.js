export function drawInkWash(canvas) {
  const paint = canvas.getContext('2d');
  if (paint) {
    const width = canvas.width, height = canvas.height;
    const image = paint.createImageData(width, height);
    const hash = (x, y) => {
      let seed = Math.imul(x ^ 19349, 374761393) + Math.imul(y, 668265263);
      seed = Math.imul(seed ^ (seed >>> 13), 1274126177);
      return ((seed ^ (seed >>> 16)) >>> 0) / 4294967296;
    };
    function noise(x, y) {
      const left = Math.floor(x), top = Math.floor(y);
      const dx = x - left, dy = y - top;
      const u = dx * dx * (3 - 2 * dx), v = dy * dy * (3 - 2 * dy);
      const a = hash(left, top) * (1 - u) + hash(left + 1, top) * u;
      const b = hash(left, top + 1) * (1 - u) + hash(left + 1, top + 1) * u;
      return a * (1 - v) + b * v;
    }
    const smooth = (lo, hi, value) => {
      const t = Math.max(0, Math.min(1, (value - lo) / (hi - lo)));
      return t * t * (3 - 2 * t);
    };
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const u = x / width, v = y / height;
        const slow = noise(u * 7.1, v * 7.7);
        const middle = noise(u * 22, v * 32);
        const grain = hash(x, y);
        const waved = v + (slow - .5) * .16 + (middle - .5) * .05;
        const ribbon = .64 - (u - .52) * .29 + Math.sin(u * 7) * .105;
        const spread = .21 + .07 * Math.sin(u * 4);
        const body = 1 - Math.abs(waved - ribbon) / spread + (middle - .5) * .23;
        const edges = smooth(.035,.22,u) * (1 - smooth(.81,.99,u));
        const wet = smooth(.01,.92,body);
        const edge = Math.exp(-Math.pow((body - .16) / .12, 2));
        const pool = smooth(.55,.79,slow + middle * .19);
        const dry = Math.pow(noise(u * 17,v * 132), 2) * pool;
        const i = (y * width + x) * 4;
        image.data[i] = 34;
        image.data[i + 1] = 39;
        image.data[i + 2] = 38;
        image.data[i + 3] = Math.round(edges * (wet * (13 + 26 * pool + 25 * dry) + edge * (5 + 12 * middle)) * (.71 + grain * .55));
      }
    }
    paint.putImageData(image, 0, 0);
  }
}
