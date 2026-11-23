import type { Resource } from './resources';

export const studies = [
  { id: 'clickwheel', name: 'Clickwheel', toy: 'player', description: 'Browse tracks with a circular control.', integration: 'click-wheel and player primitives' },
  { id: 'perpetual', name: 'Perpetual', toy: 'watch', description: 'Turn the crown to set the time.', integration: 'watch and crown primitives' },
  { id: 'audio-ui', name: 'audio/ui', toy: 'knob', description: 'Knobs, faders, and pads for browser instruments.', integration: 'knob, fader, and pad primitives' },
] as const;

export function studyResourceId(name: string) {
  const study = studies.find((item) => item.name === name);
  return study ? `resource-${study.id}` : undefined;
}

export function featuredStudies(resources: Resource[]) {
  return studies.flatMap((study) => {
    const resource = resources.find(({ name }) => name === study.name);
    if (!resource) return [];
    const source = resource.links.find(({ label }) => label === 'UI SDK integration')
      ?? resource.links.find(({ label }) => label.startsWith('Source'));
    return [{ ...study, resource, source }];
  });
}
