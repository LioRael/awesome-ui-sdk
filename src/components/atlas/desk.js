import { bindDrag, dragThreshold } from '@ui-sdk/core';

export function mountDesk(desk) {
  const events = new AbortController();
  const stopDrags = [];
  const listen = (target, type, callback, capture) => target.addEventListener(type, callback, { signal: events.signal, capture });
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  for (const toy of desk.querySelectorAll('.toy-player,.toy-watch')) {
    let left = 0;
    let top = 0;
    let stop;
    let suppressClick = false;
    stopDrags.push(() => stop?.());
    function move(x, y) {
      const limit = desk.clientWidth * .16;
      left = clamp(x, -limit, limit);
      top = clamp(y, -limit, limit);
      toy.style.setProperty('--x', left + 'px');
      toy.style.setProperty('--y', top + 'px');
    }
    listen(toy,'pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      stop?.();
      suppressClick = false;
      const origin = { x: event.clientX, y: event.clientY, left, top };
      stop = bindDrag(toy, event, {
        threshold: dragThreshold,
        cancelOnEscape: true,
        onStart() {
          suppressClick = true;
          toy.dataset.dragging = '';
        },
        onMove({ x, y }) {
          move(origin.left + x - origin.x, origin.top + y - origin.y);
        },
        onEnd(_event, canceled) {
          delete toy.dataset.dragging;
          if (canceled) move(origin.left, origin.top);
          stop = undefined;
        },
      });
    });
    listen(toy,'click', event => {
      if (!suppressClick || event.detail === 0) return;
      suppressClick = false;
      event.stopImmediatePropagation();
    }, true);
    listen(toy,'keydown', event => {
      const step = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[event.key];
      if (!step) return;
      event.preventDefault();
      move(left + step[0], top + step[1]);
    });
  }

  const knob = desk.querySelector('.knob');
  if (!knob) return () => { events.abort(); stopDrags.forEach((stop) => stop()); };
  const label = knob.querySelector('.knob-number');
  const caption = desk.querySelector('.knob-caption');
  let value = 25;
  let stopKnob;
  stopDrags.push(() => stopKnob?.());
  function turn(next) {
    value = clamp(Math.round(next), 0, 100);
    knob.setAttribute('aria-valuenow', String(value));
    knob.style.setProperty('--angle', (-135 + value * 2.7) + 'deg');
    label.textContent = String(value);
  }
  turn(value);
  listen(knob,'pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    stopKnob?.();
    knob.focus({ preventScroll: true });
    caption.click();
    const initial = value, start = event.clientX;
    stopKnob = bindDrag(knob, event, {
      threshold: dragThreshold,
      cancelOnEscape: true,
      onStart() { knob.dataset.dragging = ''; },
      onMove({ x }) { turn(initial + (x - start) * .65); },
      onEnd(_event, canceled) {
        delete knob.dataset.dragging;
        if (canceled) turn(initial);
        stopKnob = undefined;
      },
    });
  });
  listen(knob,'keydown', event => {
    const next = {
      ArrowDown: value - 5, ArrowLeft: value - 5, ArrowRight: value + 5, ArrowUp: value + 5,
      Home: 0, End: 100,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    caption.click();
    turn(next);
  });

  return () => { events.abort(); stopDrags.forEach((stop) => stop()); };
}
