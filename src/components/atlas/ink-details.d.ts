export type InkKind = 'search' | 'rule' | 'top-rule' | 'tab' | 'shelf' | 'tool' | 'play';
export function mountInkDetail(canvas: HTMLCanvasElement, kind: InkKind, selected: boolean): (() => void) | undefined;
