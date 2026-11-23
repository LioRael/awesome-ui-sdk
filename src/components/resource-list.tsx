import { categories, type Resource } from '../lib/resources';
import { studyResourceId } from '../lib/featured';
import { InkText } from './atlas/ink-text';
import { InkDetail } from './atlas/ink-detail';

const illustrations = { libraries: 'shelf', tools: 'tool', showcases: 'play' } as const;

export function ResourceList({ resources, located }: { resources: Resource[]; located?: string }) {
  return categories.map((category) => {
    const entries = resources.filter((resource) => resource.category === category.id);
    if (!entries.length) return null;
    const illustration = category.id in illustrations ? illustrations[category.id as keyof typeof illustrations] : undefined;

    return (
      <section className="group resource-section" key={category.id} aria-labelledby={`heading-${category.id}`}>
        <h3 id={`heading-${category.id}`} className={illustration ? 'group-title chapter-heading' : 'group-title'}>
          {illustration && <InkDetail kind={illustration} />}
          {category.heading}
        </h3>
        <ol className="resource-list">
          {entries.map((resource) => {
            const id = studyResourceId(resource.name);
            const isRepository = resource.url.startsWith('https://github.com/');
            return (
              <li className="resource resource-row" id={id} key={resource.url} data-located={id && id === located ? '' : undefined}>
                <div className="resource-info">
                  <h4><a href={resource.url}><InkText>{resource.name}</InkText></a></h4>
                  <p>{resource.description}</p>
                </div>
                <div className="links resource-links">
                  <a href={resource.url} aria-label={`${isRepository ? 'Repository' : 'Website'} for ${resource.name}`}>
                    <InkText>{isRepository ? 'Repository' : 'Website'}</InkText>
                  </a>
                  {resource.links.slice(0, 1).map((link) => (
                    <a key={link.url} href={link.url} aria-label={`${resource.name}: ${link.label}`}>
                      <InkText>{link.label.startsWith('Source') ? 'Source' : link.label === 'Integration details' ? 'Details' : link.label}</InkText>
                    </a>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    );
  });
}
