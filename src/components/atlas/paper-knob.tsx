'use client';

import { bindDrag, createChange, css, definePrimitive, dragThreshold } from '@ui-sdk/core';
import { createParts } from '@ui-sdk/react/primitive';

const min = 0;
const max = 100;
const step = 5;
const keys = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Home', 'End'] as const;
type KnobOptions = { onUse?: () => void };
type KnobChange = 'drag' | 'drag-cancel' | 'step-key' | 'imperative';

const paperKnob = definePrimitive({
  name: 'paper-knob',
  options: { onUse: 'callback' },
  state: (_options: KnobOptions) => ({ value: 25, dragging: false }),
  api: (context) => {
    const change = createChange(context);
    let stop: (() => void) | undefined;
    context.onDestroy(() => stop?.());

    function setValue(value: number, reason: KnobChange, event?: Event) {
      if (typeof value !== 'number' || !Number.isFinite(value)) return false;
      return change('value', Math.min(max, Math.max(min, Math.round(value))), { reason, event });
    }

    return {
      setValue(value: number) {
        const applied = setValue(value, 'imperative');
        if (applied) context.options().onUse?.();
        return applied;
      },
      pointerdown(event: PointerEvent, element: HTMLElement) {
        if (!event.isPrimary || event.button !== 0) return;
        stop?.();
        context.store.set({ dragging: false });
        element.focus({ preventScroll: true });
        context.options().onUse?.();
        const initial = context.store.get().value;
        const start = event.clientX;
        stop = bindDrag(element, event, {
          threshold: dragThreshold,
          cancelOnEscape: true,
          onStart: () => { context.store.set({ dragging: true }); },
          onMove: ({ x, event }) => { setValue(initial + (x - start) * .65, 'drag', event); },
          onEnd: (event, canceled) => {
            stop = undefined;
            context.store.set({ dragging: false });
            if (canceled) setValue(initial, 'drag-cancel', event);
          },
        });
      },
      keydown(event: KeyboardEvent) {
        const { value } = context.store.get();
        switch (event.key) {
          case 'ArrowDown': case 'ArrowLeft': setValue(value - step, 'step-key', event); break;
          case 'ArrowUp': case 'ArrowRight': setValue(value + step, 'step-key', event); break;
          case 'Home': setValue(min, 'step-key', event); break;
          case 'End': setValue(max, 'step-key', event); break;
          default: return;
        }
        event.preventDefault();
        context.options().onUse?.();
      },
    };
  },
  slots: (slot) => ({
    root: slot<{}, { value: number }>({
      role: 'slider',
      focus: 'tab-stop',
      keys: [...keys],
      attrs: ({ value, dragging }) => ({
        tabindex: '0',
        'aria-valuemin': String(min),
        'aria-valuemax': String(max),
        'aria-valuenow': String(value),
        'data-dragging': dragging ? '' : undefined,
        style: css({ '--angle': `${-135 + value * 2.7}deg` }),
      }),
      state: ({ value }) => ({ value }),
      on: {
        pointerdown: (event, { api, el }) => { if (el) api.pointerdown(event, el); },
        keydown: (event, { api }) => api.keydown(event),
      },
    }),
  }),
  agent: { actions: ['setValue'] },
});

const { Root: PaperKnobRoot } = createParts(paperKnob, { root: 'div' });

export function PaperKnob({ onUse }: KnobOptions) {
  return (
    <PaperKnobRoot className="knob" aria-label="Paper knob" aria-describedby="knob-hint" onUse={onUse}>
      {({ value }) => (
        <>
          <span className="knob-pointer" aria-hidden="true" />
          <span className="knob-number" aria-hidden="true">{value}</span>
        </>
      )}
    </PaperKnobRoot>
  );
}
