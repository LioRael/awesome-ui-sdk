import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createAgent } from '@ui-sdk/react/agent';
import { expect, test } from 'vitest';
import { ResourceDirectory } from '../src/components/resource-directory';
import { resources } from '../src/lib/resource-content';
import { renderToString } from 'react-dom/server';

const agent = createAgent();
const count = (category: string) => resources.filter((resource) => resource.category === category).length;

test('search, category selection, clearing, and empty-state reset change the rendered collection', async () => {
  const user = userEvent.setup();
  render(<ResourceDirectory resources={resources} />);
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
  await user.click(screen.getByRole('radio', { name: /^Tools / }));
  expect(screen.getAllByRole('listitem')).toHaveLength(count('tools'));
  await user.type(screen.getByRole('searchbox'), 'lenso');
  expect(screen.getByText('No matching resources.')).toBeTruthy();
  expect(location.search).toBe('?category=tools&q=lenso');
  await user.click(screen.getByRole('button', { name: 'Clear search' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(count('tools'));
  expect(document.activeElement).toBe(screen.getByRole('searchbox'));
  await user.type(screen.getByRole('searchbox'), 'not-a-resource');
  await user.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
  expect(location.search).toBe('');
});

test('a shared URL restores filters and keyboard arrows change category', async () => {
  history.replaceState(null, '', '/?category=adapters&q=angular');
  const user = userEvent.setup();
  render(<ResourceDirectory resources={resources} />);
  expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('angular');
  expect(screen.getByRole('heading', { name: 'Framework adapters' })).toBeTruthy();
  expect(screen.getByRole('heading', { name: 'ngx-ui-sdk' })).toBeTruthy();
  expect(screen.queryByRole('heading', { name: 'ember-ui-sdk' })).toBeNull();
  const adapters = screen.getByRole('radio', { name: /^Adapters / });
  expect(adapters.getAttribute('aria-checked')).toBe('true');
  adapters.focus();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('radio', { name: /^Tools / }).getAttribute('aria-checked')).toBe('true');
  await user.keyboard('{ArrowLeft}');
  expect(adapters.getAttribute('aria-checked')).toBe('true');
  await user.click(screen.getByRole('searchbox'));
  await user.keyboard('{Escape}');
  expect(screen.getAllByRole('listitem')).toHaveLength(count('adapters'));
  expect(location.search).toBe('?category=adapters');
});

test('theme changes are visible and persist, and the search shortcut focuses the search field', async () => {
  const user = userEvent.setup();
  render(<ResourceDirectory resources={resources} />);
  await user.click(screen.getByRole('button', { name: 'Toggle color theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('awesome-ui-sdk-theme')).toBe('dark');
  await user.click(screen.getByRole('button', { name: 'Toggle color theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  await user.keyboard('/');
  expect(document.activeElement).toBe(screen.getByRole('searchbox'));
});

test('the agent can find named controls and search, select a category, change the theme, and reset', async () => {
  render(<ResourceDirectory resources={resources} />);
  const snapshot = agent.snapshot().filter((entry) => !entry.offPage && entry.component !== 'more');
  for (const entry of snapshot) expect(entry.label).toBeTruthy();
  expect(snapshot.map((entry) => entry.label)).toEqual(expect.arrayContaining(['Search resources', 'Resource category', 'Toggle color theme']));

  let result;
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Search resources', action: 'setValue', args: ['lenso'] }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('lenso');
  expect(screen.getAllByRole('listitem')).toHaveLength(1);

  const category = snapshot.find((entry) => entry.label === 'Resource category')!;
  expect(category.items).toBeTruthy();
  const tools = category.items!.find((item) => item.label.startsWith('Tools '))!;
  expect(tools).toBeTruthy();
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Resource category', action: 'setValue', args: [tools.value] }, { ref: 'Toggle color theme', action: 'press' }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(screen.getByText('No matching resources.')).toBeTruthy();
  await waitFor(() => expect(agent.snapshot().some((entry) => entry.label === 'Reset filters')).toBe(true));
  await act(async () => {
    result = await agent.act({ steps: [{ ref: 'Reset filters', action: 'press' }] });
  });
  expect(result).toMatchObject({ ok: true });
  expect(screen.getAllByRole('listitem')).toHaveLength(resources.length);
});

test('server HTML includes every curated resource without browser initialization', () => {
  history.replaceState(null, '', '/?q=missing-resource&category=tools');
  const html = renderToString(<ResourceDirectory resources={resources} />);
  const document = new DOMParser().parseFromString(html, 'text/html');
  expect(document.querySelectorAll('.resource-row')).toHaveLength(resources.length);
  for (const resource of resources) {
    expect([...document.querySelectorAll('.resource-info a')].some((link) => link.getAttribute('href') === resource.url && link.textContent === resource.name)).toBe(true);
    expect(document.body.textContent).toContain(resource.description);
  }
  expect(document.querySelector('input[type="search"]')?.getAttribute('value')).toBe('');
});

test('the hero opens the single Registry search and a featured project can reveal a filtered-out entry', async () => {
  const user = userEvent.setup();
  render(<ResourceDirectory resources={resources} />);
  expect(screen.getAllByRole('searchbox')).toHaveLength(1);
  const search = screen.getByRole('searchbox');
  await user.click(screen.getByRole('link', { name: 'Search the registry' }));
  expect(document.activeElement).toBe(search);

  await user.click(screen.getByRole('radio', { name: /^Tools / }));
  await user.type(search, 'inspector');
  await user.click(screen.getByRole('button', { name: 'Perpetual' }));
  await user.click(screen.getByRole('link', { name: 'Find in registry' }));

  expect(location.hash).toBe('#resource-perpetual');
  expect(location.search).toBe('?category=showcases');
  expect((search as HTMLInputElement).value).toBe('');
  const title = screen.getByRole('heading', { name: 'Perpetual', level: 4 });
  expect(title.closest('.resource')?.hasAttribute('data-located')).toBe(true);
  expect(document.activeElement).toBe(title.querySelector('a'));
});
