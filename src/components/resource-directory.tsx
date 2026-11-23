'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Button } from '@ui-sdk/react/button';
import { Input, InputClear, InputGroup } from '@ui-sdk/react/input';
import { SegmentedControl, SegmentedControlItem } from '@ui-sdk/react/segmented-control';
import { useShortcut } from '@ui-sdk/react/shortcuts';
import { categories, filterResources, type Category, type Resource } from '../lib/resources';
import { ResourceList } from './resource-list';
import { featuredStudies, studyResourceId } from '../lib/featured';
import { InkText } from './atlas/ink-text';
import { InkDetail } from './atlas/ink-detail';
import { mountBrush } from './atlas/brush';
import { mountDesk } from './atlas/desk';
import { drawInkWash } from './atlas/ink-wash';

const repository = 'https://github.com/LioRael/awesome-ui-sdk';
const filters = [{ id: 'all', label: 'All resources' }, ...categories] as const;

function readFilters() {
  const params = new URLSearchParams(location.search);
  const category = filters.find((filter) => filter.id === params.get('category'))?.id ?? 'all';
  return { query: params.get('q') ?? '', category };
}

function ThemeButton() {
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('awesome-ui-sdk-theme', next);
    } catch {
      // Private browsing can disable storage; the current page still changes theme.
    }
  }

  return (
    <Button className="theme-button" aria-label="Toggle color theme" onClick={toggleTheme} title="Toggle light or dark theme">
      <svg data-theme-icon="light" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg data-theme-icon="dark" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />
      </svg>
    </Button>
  );
}

function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function FeaturedStudies({
  featured,
  onLocate,
}: {
  featured: ReturnType<typeof featuredStudies>;
  onLocate: (resource: Resource) => void;
}) {
  const [selection, setSelection] = useState<string>(featured[0].id);
  const current = featured.find(({ id }) => id === selection) ?? featured[0];
  const plate = useRef<HTMLDivElement>(null);
  const wash = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (wash.current && typeof ResizeObserver === 'function') drawInkWash(wash.current);
    if (plate.current) return mountDesk(plate.current);
  }, []);

  return (
    <div className="ink-stage">
      <canvas ref={wash} className="wash-field" width={512} height={312} aria-hidden="true" />
      <div className="plate" ref={plate} role="group" aria-label="Featured projects">
        {featured.map((study) => study.toy === 'knob' ? (
          <div className="knob-wrap" role="group" aria-label="audio/ui paper toy" key={study.id}>
            <div className="knob" role="slider" tabIndex={0} aria-label="Paper knob" aria-valuemin={0} aria-valuemax={100} aria-valuenow={25} aria-describedby="knob-hint">
              <span className="knob-pointer" aria-hidden="true" />
              <span className="knob-number" aria-hidden="true">25</span>
            </div>
            <Button className="toy-name knob-caption" aria-pressed={selection === study.id} aria-controls="figure-details" onClick={() => setSelection(study.id)}>
              <InkText>{study.name}</InkText>
            </Button>
            <span className="knob-hint" id="knob-hint">Drag left or right</span>
          </div>
        ) : (
          <Button className={`toy toy-${study.toy}`} key={study.id} aria-describedby="desk-hint" aria-pressed={selection === study.id} aria-controls="figure-details" onClick={() => setSelection(study.id)}>
            <span className="ink ink-study" aria-hidden="true" />
            <span className="toy-name"><InkText>{study.name}</InkText></span>
          </Button>
        ))}
      </div>
      <section className="annotation figure-note" id="figure-details" aria-labelledby="figure-title">
        <InkDetail kind="top-rule" />
        <div aria-live="polite">
          <h2 id="figure-title">{current.name}</h2>
          <p>{current.description}</p>
          <p className="integration-note">UI SDK: {current.integration}</p>
        </div>
        <nav aria-label="Featured project links">
          <a id="figure-index" href={`#resource-${current.id}`} onClick={(event) => {
            if (!isPlainClick(event)) return;
            event.preventDefault();
            onLocate(current.resource);
          }}><InkText>Find in registry</InkText></a>
          <a href={current.resource.url}><InkText>Open demo</InkText></a>
          {current.source && <a href={current.source.url}><InkText>UI SDK source</InkText></a>}
        </nav>
      </section>
    </div>
  );
}

export function ResourceDirectory({ resources }: { resources: Resource[] }) {
  const [selection, setSelection] = useState<{ query: string; category: Category | 'all' }>({ query: '', category: 'all' });
  const [located, setLocated] = useState<{ id: string; focus: boolean }>();
  const shell = useRef<HTMLDivElement>(null);
  const registry = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const visibleResources = filterResources(resources, selection.query, selection.category);
  const featured = featuredStudies(resources);

  useEffect(() => {
    function restoreLocation() {
      const next = readFilters();
      const id = location.hash.slice(1);
      const resource = resources.find(({ name }) => studyResourceId(name) === id);
      if (resource) {
        if (!filterResources([resource], next.query, 'all').length) next.query = '';
        if (next.category !== 'all') next.category = resource.category;
      }
      setSelection(next);
      setLocated(resource ? { id, focus: false } : undefined);
    }
    restoreLocation();
    window.addEventListener('popstate', restoreLocation);
    window.addEventListener('hashchange', restoreLocation);
    return () => {
      window.removeEventListener('popstate', restoreLocation);
      window.removeEventListener('hashchange', restoreLocation);
    };
  }, [resources]);

  useEffect(() => {
    if (shell.current && typeof window.matchMedia === 'function') return mountBrush(shell.current);
  }, []);

  useEffect(() => {
    if (!located) return;
    const row = document.getElementById(located.id);
    if (!row) return;
    row.scrollIntoView?.({ block: 'center', behavior: 'instant' });
    if (!located.focus) return;
    const title = row.querySelector<HTMLAnchorElement>('h4 a');
    title?.focus({ preventScroll: true });
    if (title) {
      const frame = requestAnimationFrame(() => title.dispatchEvent(new CustomEvent('atlas:mark', { bubbles: true, detail: title })));
      return () => cancelAnimationFrame(frame);
    }
  }, [located]);

  function focusSearch() {
    registry.current?.scrollIntoView?.({ block: 'start' });
    search.current?.focus({ preventScroll: true });
  }

  useShortcut('/', focusSearch);
  useShortcut('mod+k', focusSearch);

  function updateSelection(query: string, category: Category | 'all', targetId?: string) {
    setSelection({ query, category });
    setLocated(targetId ? { id: targetId, focus: true } : undefined);
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (category !== 'all') url.searchParams.set('category', category);
    else url.searchParams.delete('category');
    if (targetId) url.hash = targetId;
    else if (url.hash.startsWith('#resource-')) url.hash = '#directory';
    if (targetId && location.hash !== url.hash) history.pushState(null, '', url);
    else history.replaceState(null, '', url);
  }

  function locate(resource: Resource) {
    const id = studyResourceId(resource.name);
    if (!id) return;
    const query = filterResources([resource], selection.query, 'all').length ? selection.query : '';
    const category = selection.category === 'all' ? 'all' : resource.category;
    updateSelection(query, category, id);
  }

  return (
    <div ref={shell}>
      <a className="skip" href="#directory">Skip to registry</a>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="wordmark" href="./" aria-label="Awesome UI SDK home">awesome <span>/</span> ui sdk</a>
          <nav className="nav" aria-label="Main navigation">
            <a href="#directory"><InkText>Registry</InkText></a>
            <a className="ui-sdk-link" href="https://ui-sdk.dev/"><InkText>UI SDK</InkText></a>
            <a href={repository}><InkText>GitHub</InkText></a>
            <a className="submit" href={`${repository}/blob/main/CONTRIBUTING.md`}><InkText>Submit a resource</InkText></a>
            <ThemeButton />
          </nav>
        </div>
      </header>

      <main className="wrap sheet">
        <section className="cover" aria-labelledby="title">
          <div className="intro">
            <h1 className="ink-headline" id="title">
              <span className="headline-line"><InkText>Awesome</InkText></span>{' '}
              <span className="headline-line"><InkText>UI SDK</InkText></span>
            </h1>
            <p>Libraries, tools, and experiments built with Vercel’s UI SDK.</p>
            <div className="registry-entry">
              <a className="registry-search-link" href="#index-search" onClick={(event) => {
                if (!isPlainClick(event)) return;
                event.preventDefault();
                focusSearch();
              }}><InkText>Search the registry</InkText></a>
              <kbd aria-hidden="true">/</kbd>
            </div>
            {featured.length > 0 && <p id="desk-hint" className="desk-hint">Drag the sketches or turn the dial.</p>}
          </div>
          {featured.length > 0 && <FeaturedStudies featured={featured} onLocate={locate} />}
        </section>

        <section className="directory" id="directory" ref={registry} aria-labelledby="directory-title">
          <div className="index-guide">
            <h2 id="directory-title">Registry</h2>
            <div role="search" aria-label="Search the registry">
              <InputGroup className="index-search" aria-label="Search actions">
                <InkDetail kind="search" />
                <Input id="index-search" ref={search} type="search" aria-label="Search resources" aria-controls="resources" placeholder={`Search ${resources.length} resources`} value={selection.query} onValueChange={(value) => updateSelection(value, selection.category)} onKeyDown={(event) => { if (event.key === 'Escape') updateSelection('', selection.category); }} />
                <InputClear aria-label="Clear search" className="clear-search">Clear</InputClear>
              </InputGroup>
            </div>
            <SegmentedControl aria-label="Resource category" className="filters" value={selection.category} onValueChange={(value) => {
              const category = filters.find((filter) => filter.id === value);
              if (!category) return;
              if ((registry.current?.getBoundingClientRect().top ?? 0) < 0) registry.current?.scrollIntoView?.({ block: 'start' });
              updateSelection(selection.query, category.id);
            }}>
              {filters.map((filter) => (
                <SegmentedControlItem value={filter.id} key={filter.id}>
                  <InkDetail kind="tab" selected={selection.category === filter.id} />
                  <span className="filter-label"><InkText>{filter.id === 'official' ? 'Official docs' : filter.label}</InkText></span>{' '}
                  <span className="filter-count">{filter.id === 'all' ? resources.length : resources.filter((resource) => resource.category === filter.id).length}</span>
                </SegmentedControlItem>
              ))}
            </SegmentedControl>
          </div>

          <div className="index-book">
            <div className="index-book-head">
              <InkDetail kind="rule" />
              <strong>{selection.query.trim() ? `Results for “${selection.query.trim()}”` : filters.find((filter) => filter.id === selection.category)?.label}</strong>
              <span className="status" role="status" aria-live="polite">{visibleResources.length} {visibleResources.length === 1 ? 'resource' : 'resources'}</span>
            </div>
            <div id="resources" tabIndex={-1}>
              {visibleResources.length ? <ResourceList resources={visibleResources} located={located?.id} /> : (
                <div className="empty-state">
                  <h3>No matching resources.</h3>
                  <p>Try a different search or browse all categories.</p>
                  <Button onClick={() => { updateSelection('', 'all'); search.current?.focus(); }}>Reset filters</Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap site-footer">
        <InkDetail kind="top-rule" />
        <span>Awesome UI SDK · Independent community registry</span>
        <nav aria-label="Project links">
          <a href={repository}><InkText>GitHub</InkText></a>
          <a href={`${repository}/blob/main/CONTRIBUTING.md`}><InkText>Submit a resource</InkText></a>
        </nav>
      </footer>
    </div>
  );
}
