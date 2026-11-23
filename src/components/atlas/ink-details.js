function inkDetail(ctx, width, height, kind, selected) {
  let state = 743 + kind.length * 1057 + Math.round(width);
  const random = () => ((state = (Math.imul(1664525, state) + 1013904223) | 0) >>> 0) / 4294967296;
  const ink = '41,43,41';
  function line(x1, y1, x2, y2, weight = .45, rough = 1) {
    const count = Math.max(2, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / 9));
    const phase = random() * 6;
    for (let i = 0; i < count; i++) {
      const a = i / count, b = (i + 1) / count;
      if (random() < .025) continue;
      const drift = a => (Math.sin(a * 17 + phase) + .42 * Math.cos(a * 55 - phase)) * rough;
      ctx.beginPath();
      ctx.moveTo(x1 + (x2 - x1) * a + drift(a) * .5, y1 + (y2 - y1) * a + drift(a));
      ctx.lineTo(x1 + (x2 - x1) * b + drift(b) * .5, y1 + (y2 - y1) * b + drift(b));
      ctx.strokeStyle = 'rgba(' + ink + ',' + (weight * (.42 + random() * .55)) + ')';
      ctx.lineWidth = .45 + Math.sin(a * Math.PI) * .5 + random() * .65;
      ctx.lineCap = 'round';
      ctx.stroke();
      if (weight > .53 && i % 2 === 0) {
        ctx.strokeStyle = 'rgba(' + ink + ',.055)';
        ctx.lineWidth += 1.9;
        ctx.stroke();
      }
    }
  }
  const w = width - 2, h = height - 2;
  if (kind === 'rule' || kind === 'top-rule') {
    const y = kind === 'rule' ? h - 2 : 2;
    line(1,y,w,y + .4,.66,.68);
    line(3,y + 1.2,w - 4,y + .45,.29,.49);
  } else if (kind === 'tab' && selected) {
    const end = Math.min(112,w - 36);
    line(4,h - 4,end,h - 5,.93,.34);
  } else if (kind === 'search') {
    line(3,h - 1,w - 2,h - 2,.55,.37);
  } else if (kind === 'shelf') {
    for (const [x, y] of [[3,7],[9,4],[15,6]]) {
      line(x,y,x+4,y+.5,.8,.24);
      line(x+4,y+.5,x+4,19,.69,.24);
      line(x+4,19,x,19,.7,.22);
      line(x,19,x,y,.75,.23);
    }
    line(1,20,22,20,.59,.3);
  } else if (kind === 'tool') {
    const points = [[4,17,15,5],[7,20,18,8],[15,5,18,8],[4,17,2,23],[7,20,2,23],[12,8,15,11]];
    for (const segment of points) line(...segment,.81,.28);
  } else if (kind === 'play') {
    for (const segment of [[3,4,21,5],[21,5,20,20],[20,20,3,20],[3,20,3,4],[9,8,9,16],[9,8,16,12],[16,12,9,16]]) {
      line(...segment,.81,.27);
    }
  }
}

export function mountInkDetail(canvas, kind, selected) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  function draw() {
    const width = canvas.clientWidth, height = canvas.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(devicePixelRatio || 1,1.5);
    canvas.width = Math.round(width*scale);
    canvas.height = Math.round(height*scale);
    ctx.setTransform(scale,0,0,scale,0,0);
    inkDetail(ctx,width,height,kind,selected);
  }
  draw();
  if (typeof ResizeObserver !== 'function') return;
  const observer = new ResizeObserver(draw);
  observer.observe(canvas);
  return () => observer.disconnect();
}
