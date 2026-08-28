import type { DocsNavigation } from '@/services/docs';

type DocsSidebarProps = {
  navigation: DocsNavigation;
  activeSlug: string;
  onNavigate: (slug: string) => void;
};

export default function DocsSidebar({ navigation, activeSlug, onNavigate }: DocsSidebarProps) {
  return (
    <nav className="yak-docs-sidebar-nav" aria-label="文档导航">
      {navigation.sections.map((section) => (
        <section className="yak-docs-sidebar-section" key={section.title}>
          <div className="yak-docs-sidebar-section__title">{section.title}</div>
          <div className="yak-docs-sidebar-section__items">
            {section.items.map((item) => (
              <button
                className={[
                  'yak-docs-sidebar-item',
                  activeSlug === item.slug ? 'yak-docs-sidebar-item--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={item.slug}
                onClick={() => onNavigate(item.slug)}
                type="button"
              >
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </section>
      ))}
    </nav>
  );
}
