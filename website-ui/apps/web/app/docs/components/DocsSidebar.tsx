import type { DocsNavigation } from '@/service/docs';

type DocsSidebarProps = {
  navigation: DocsNavigation;
  activeSlug: string;
  onNavigate: (slug: string) => void;
};

const itemClassName = (active: boolean) =>
  active
    ? 'flex w-full items-start rounded-xl border-0 bg-[#e7e5df] px-4 py-2 text-left text-[13px] font-semibold leading-5 text-[#20201e]'
    : 'flex w-full items-start rounded-xl border-0 bg-transparent px-4 py-2 text-left text-[13px] font-medium leading-5 text-[#55544f] hover:bg-black/[0.035] hover:text-[#20201e]';

export default function DocsSidebar({ navigation, activeSlug, onNavigate }: DocsSidebarProps) {
  return (
    <nav aria-label="Documentation navigation" className="pb-10">
      {navigation.sections.map((section, sectionIndex) => (
        <section className={sectionIndex === 0 ? '' : 'mt-7'} key={section.title}>
          <div className="mb-2.5 px-4 text-[13px] font-semibold leading-5 text-[#20201e]">{section.title}</div>
          <div className="space-y-0.5">
            {section.items.map((item) => (
              <button
                aria-current={activeSlug === item.slug ? 'page' : undefined}
                className={itemClassName(activeSlug === item.slug)}
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
