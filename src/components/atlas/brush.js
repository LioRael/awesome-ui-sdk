export function mountBrush(root) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const labels = '.ink-headline,.registry-search-link,.toy-name,.filter-label,.nav a,.annotation a,.resource h4 a,.resource .links a,.site-footer a';
  let active;
  let hovered;
  let frame = 0;
  const strokes = new WeakMap();

  function brushTarget(element) {
    if (!(element instanceof Element)) return null;
    return element.closest(labels) ||
      element.closest('.filters button')?.querySelector('.filter-label') ||
      element.closest('.toy')?.querySelector('.toy-name');
  }
  function hoverRegion(target) {
    return target?.closest('.filters button,.toy') || target;
  }
  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (!active) return;
    for (const {target,canvas} of active.segments) {
      target.removeAttribute('data-brushing');
      target.removeAttribute('data-marking');
      target.style.removeProperty('--brush-front');
      canvas.remove();
    }
    active = undefined;
  }
  function prepareSegment(target,offset) {
    const text = target.querySelector(':scope > .brush-lettering');
    if (!text) return;
    const canvas = target.querySelector(':scope > .brush-impression') || document.createElement('canvas');
    canvas.className = 'brush-impression';
    canvas.setAttribute('aria-hidden','true');
    if (!canvas.isConnected) {
      canvas.hidden = true;
      target.prepend(canvas);
      }
    const context = canvas.getContext('2d');
    if (!context) return;
    target.style.setProperty('--brush-uncovered',getComputedStyle(text).color);
    target.style.setProperty('--brush-front','0px');
    return {target,text,canvas,context,style:brushStyle(target,text),offset};
  }
  function start(target) {
    if (active?.target === target) return;
    reset();
    const parts = target.matches('.ink-headline') ? target.querySelectorAll('.headline-line') : [target];
    const segments = [];
    let offset = 0;
    for (const part of parts) {
      const segment = prepareSegment(part,offset);
      if (!segment) return;
      segments.push(segment);
      offset += segment.style.duration;
    }
    active = {target,segments,startTime:performance.now()};
    frame = requestAnimationFrame(draw);
  }
  function brushStyle(target, text) {
    const headline = target.matches('.headline-line');
    const loaded = headline || target.matches('.toy-name,.resource h4 a');
    const uses = (strokes.get(target) || 0) + 1;
    strokes.set(target,uses);
    let identity = 15667;
    for (const char of text.textContent) identity = (Math.imul(identity,31) + char.codePointAt(0)) >>> 0;
    const variant = (identity % 3 + uses - 1) % 3;
    const key = (identity ^ Math.imul(uses,2654435761)) >>> 0;
    const random = seeded(key);
    return {
      key, loaded, variant, headline,
      knee:.35 + random()*.33, lean:(random()-.5)*.17,
      lift:.13+random()*.19, skew:.7+random()*.55,
      duration:headline ? 285 + random()*60 : (loaded ? 355 : 245) + random()*98,
    };
  }
  function seeded(key) {
    return () => ((key = (Math.imul(key,1664525) + 1013904223) >>> 0) / 4294967296);
  }
  function makeStamp(style, {width,height,left,textWidth,textHeight,dpr}) {
    const stamp = document.createElement('canvas');
    stamp.width = Math.round(width*dpr);
    stamp.height = Math.round(height*dpr);
    const pen = stamp.getContext('2d');
    pen.scale(dpr,dpr);
    const random = seeded(style.key);
    const primaryAxis = style.loaded ? height*.49 : height-8;
    const pressureWidth = style.loaded ? textHeight*(style.headline ? .45 : .52) : 2.1;
    const edges = Math.ceil(width / 2) + 1;
    const profile = [
      { entry:.74, press:.24, nudge:-.48, lift:1.32, exit:-.55 },
      { entry:.43, press:.64, nudge:.34, lift:.78, exit:.42 },
      { entry:.94, press:.15, nudge:.60, lift:1.02, exit:-.12 },
    ][style.variant];
    const ridge = Array.from({length:edges},()=>random()-.5);
    const high = Array.from({length:edges},()=>random()-.5);
    const low = Array.from({length:edges},()=>random()-.5);
    const bend = (t) => {
      if (style.variant===0) return Math.sin(t*Math.PI*1.61)*.08 - t*.06;
      if (style.variant===1) return Math.sin(t*Math.PI*2-.66)*.048 + t*.065;
      return Math.sin(t*Math.PI*.93-.16)*-.068 + t*.026;
    };
    function strokeAt(x) {
      const t = x/width;
      const up = Math.min(1,x/(left*profile.entry));
      const tailStart = left+textWidth+1;
      const lift = Math.max(0,Math.min(1,(x-tailStart)/(width-tailStart)));
      const rounded = Math.sqrt(1-Math.pow(lift,1.4));
      const body = Math.sin(Math.PI*t)*(style.variant===0?.17:.07) + Math.exp(-Math.pow((t-style.knee)/.22,2))*.13;
      const press = (.92+body)*(profile.press+up*(1-profile.press))*Math.pow(rounded,profile.lift+style.lift);
      const displacement = style.loaded ? textHeight*(style.headline?.55:1) : 9;
      const center = primaryAxis + displacement*(bend(t)+style.lean*(t-.5)*.42) + pressureWidth*((1-up)*profile.nudge + lift*profile.exit);
      return { center, press, lift };
    }
    function outline(spread, salt) {
      const path = new Path2D();
      for (let i=0;i<edges;i++) {
        const x=i/(edges-1)*width;
        const {center,press,lift}=strokeAt(x);
        const radius=pressureWidth*press;
        const y=center-radius + (high[i]*1.85+ridge[i]*.85)*(1-lift*.84)-spread*(1-lift);
        if (i===0) path.moveTo(x,y);
        else path.lineTo(x,y);
      }
      for (let i=edges-1;i>=0;i--) {
        const x=i/(edges-1)*width;
        const {center,press,lift}=strokeAt(x);
        const radius=pressureWidth*press;
        const y=center+radius*(style.variant===2?1.09:.98)+(low[i]*2.1+ridge[i]*.66)*salt*(1-lift*.84)+spread*(1-lift);
        path.lineTo(x,y);
      }
      path.closePath();
      return path;
    }

    pen.fillStyle='rgba(40,48,44,.09)';
    pen.fill(outline(3.2,1.4));
    pen.fillStyle='rgba(34,45,39,.15)';
    pen.fill(outline(1.8,1.15));
    const body=outline(.08,1);
    const ink=pen.createLinearGradient(0,primaryAxis-pressureWidth,width,primaryAxis+pressureWidth);
    ink.addColorStop(0,style.variant===0?'#343b32':'#252e28');
    ink.addColorStop(style.knee,'#26312a');
    ink.addColorStop(.79,'#323c33');
    ink.addColorStop(1,'#566053');
    pen.fillStyle=ink;
    pen.fill(body);

    // Paper grain stays inside the mark, including where the loaded brush lifts.
    pen.lineCap='round';
    const tail = left+textWidth-1;
    pen.save();
    pen.clip(body);
    for (let i=0;i<Math.min(320,width*(style.loaded?.65:.38));i++) {
      const x=random()*width, at=strokeAt(x);
      const y=at.center+(random()-.5)*at.press*pressureWidth*2.05;
      const dry=Math.max(0,(x-tail+left*.5)/Math.max(left,width-tail));
      const alpha=.029+random()*.08+dry*.17;
      const length=.55+random()*(1.9+dry*1.1);
      pen.beginPath();
      pen.moveTo(x,y);
      pen.lineTo(x+length,y+style.lean*length*.5);
      pen.lineWidth=.26+random()*.62;
      pen.strokeStyle='rgba(248,244,230,'+alpha+')';
      pen.stroke();
    }
    pen.restore();
    return stamp;
  }
  function draw(now) {
    frame = 0;
    if (!active) return;
    const elapsed = Math.max(0,now-active.startTime);
    let pending = false;
    for (const segment of active.segments) {
      if (!reduceMotion.matches && elapsed < segment.offset) {
        pending = true;
        continue;
      }
      const time = reduceMotion.matches ? 1 : Math.min(1,(elapsed-segment.offset)/segment.style.duration);
      if (!paintSegment(segment,time)) { reset(); return; }
      if (time < 1) pending = true;
    }
    if (pending) frame = requestAnimationFrame(draw);
  }
  function paintSegment(segment,time) {
    const {target,text,canvas,context,style} = segment;
    const rect = text.getBoundingClientRect(), container = target.getBoundingClientRect();
    if (!target.isConnected || !rect.width || !rect.height) return false;
    const textWidth=rect.width, textHeight=rect.height;
    const left=style.headline?Math.min(16,Math.max(10,Math.ceil(textHeight*.13))):style.loaded?Math.max(10,Math.ceil(textHeight*.21)):5;
    const right=style.headline?[29,23,25][style.variant]:style.loaded?Math.max([13,9,11][style.variant],Math.ceil(textHeight*.29)):8;
    const top=style.loaded?Math.max(7,Math.ceil(textHeight*.16)):5;
    const width=Math.ceil(textWidth+left+right),height=Math.ceil(textHeight+top*2+4);
    const dpr=Math.min(devicePixelRatio || 1,2);
    const signature=[width,height,textWidth,textHeight,dpr].join(':');
    if (segment.complete && segment.signature===signature) return true;
    if (segment.signature!==signature) {
      canvas.width=Math.round(width*dpr);
      canvas.height=Math.round(height*dpr);
      canvas.style.width=width+'px';
      canvas.style.height=height+'px';
      segment.stamp=makeStamp(style,{width,height,left,textWidth,textHeight,dpr});
      segment.signature=signature;
    }
    canvas.style.left=(rect.left-container.left-left)+'px';
    canvas.style.top=(rect.top-container.top-top)+'px';
    // Slow down as the bristles leave the sheet. The color follows the thick part of the tip.
    const travel=1-Math.pow(1-time,style.variant===1?1.32:1.81);
    const reach=width*travel;
    const slant=style.skew*(style.loaded?Math.min(11,textHeight*.25):1.2);
    const inkFront=time===1?textWidth+9:Math.max(0,reach-left-slant*.3-.8);
    context.setTransform(dpr,0,0,dpr,0,0);
    context.clearRect(0,0,width,height);
    context.save();
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(reach+slant*.7,0);
    context.quadraticCurveTo(reach-slant*.45,height*.55,reach-slant*.06,height);
    context.lineTo(0,height);
    context.closePath();
    if (time<1) context.clip();
    context.drawImage(segment.stamp,0,0,width,height);
    context.restore();
    canvas.hidden=false;
    target.dataset.marking=style.loaded?'wide':'fine';
    if (style.loaded) {
      target.dataset.brushing='';
      target.style.setProperty('--brush-front',inkFront+'px');
    }
    segment.complete = time === 1;
    return true;
  }
  const events = new AbortController();
  const listen = (source,type,callback) => source.addEventListener(type,callback,{signal:events.signal});
  listen(window,'resize',() => {
    if (active && !frame) frame = requestAnimationFrame(draw);
  });
  listen(root,'pointerover',event => {
    if (event.pointerType === 'touch' || root.querySelector('[data-dragging]')) return;
    const target = brushTarget(event.target);
    if (!target) return;
    hovered = target;
    start(target);
  });
  listen(root,'pointerout',event => {
    const target = brushTarget(event.target);
    const region = hoverRegion(target);
    if (!region || region.contains(event.relatedTarget)) return;
    if (hovered === target) hovered = undefined;
    if (active?.target === target) {
      const focused = document.activeElement;
      if (focused?.matches(':focus-visible') && brushTarget(focused) === target) return;
      reset();
    }
  });
  listen(root,'focusin',event => {
    if (!event.target.matches(':focus-visible')) return;
    const target = brushTarget(event.target);
    if (target) start(target);
  });
  listen(root,'focusout',event => {
    if (active?.target === brushTarget(event.target) && active.target !== hovered) reset();
  });
  listen(root,'pointerdown',reset);
  listen(root,'atlas:mark',event => start(event.detail));

  return () => {
    events.abort();
    reset();
  };
}
