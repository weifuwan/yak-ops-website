import { ChevronDown, Database } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Connector = {
  name: string;
  category: string;
  href: string;
  image?: string;
};

const connectors: readonly Connector[] = [
  {
    name: 'MySQL',
    category: 'database',
    href: '/docs/connectors/database/mysql',
    image: '/images/integrations/MySQL.png',
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    href: '/docs/connectors/database/postgresql',
  },
  {
    name: 'Oracle',
    category: 'database',
    href: '/docs/connectors/database/oracle',
    image: '/images/integrations/Oracle.png',
  },
];

const categories = [
  {
    label: 'All Connectors',
    id: 'all',
  },
  {
    label: 'Databases',
    id: 'database',
  },
] as const;

function ConnectorLogo({ item }: { item: Connector }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
      <Database aria-hidden="true" className="absolute text-[#7da5df]" size={22} strokeWidth={1.8} />
      {item.image ? (
        <img
          alt=""
          aria-hidden="true"
          className="relative h-8 w-8 bg-white object-contain"
          height={32}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
          src={item.image}
          width={32}
        />
      ) : null}
    </span>
  );
}

export default function DocsConnectors() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const filteredConnectors =
    activeCategory === 'all' ? connectors : connectors.filter((item) => item.category === activeCategory);
  const currentCategory = categories.find((item) => item.id === activeCategory)?.label ?? 'All Connectors';

  const chooseCategory = (id: string) => {
    setActiveCategory(id);
    setMobileCategoriesOpen(false);
  };

  return (
    <section
      aria-labelledby="docs-connectors-title"
      id="connectors"
      className="mx-auto mt-24 w-full max-w-[1300px] scroll-mt-[160px] sm:mt-28"
    >
      <div className="text-center">
        <span className="mx-auto inline-flex items-center rounded-full bg-[#f0f9ff] px-5 py-2 text-[14px] font-medium text-[#0ba5ec]">
          Connectors
        </span>
        <h2
          className="m-0 mt-6 text-[clamp(30px,3.5vw,40px)] leading-[1.2] font-medium tracking-[-0.025em] text-[#181d27]"
          id="docs-connectors-title"
        >
          Connect to Your Data
        </h2>
        <p className="mx-auto mt-4 max-w-[800px] text-[16px] leading-[1.5] text-[#717680] sm:text-[18px]">
          Explore supported databases for JDBC reads, writes, and real-time CDC.
        </p>
      </div>

      <div className="mx-auto mt-[48px] max-w-[1300px] pb-16 sm:px-4 sm:pb-36">
        <div className="relative flex h-[660px] flex-col overflow-hidden rounded-xl border border-[#eaecf5] bg-[#fafafa] lg:flex-row lg:pr-10">
          <button
            aria-controls="docs-connectors-categories"
            aria-expanded={mobileCategoriesOpen}
            className="sticky top-0 z-10 flex min-h-16 w-full shrink-0 items-center justify-center gap-3 border-0 border-b border-solid border-[#d9daee] bg-white px-5 text-[16px] font-medium text-[#004cd3] lg:hidden"
            onClick={() => setMobileCategoriesOpen((open) => !open)}
            type="button"
          >
            {currentCategory}
            <ChevronDown
              aria-hidden="true"
              className={mobileCategoriesOpen ? 'rotate-180 transition-transform' : 'transition-transform'}
              size={17}
            />
          </button>

          <nav
            aria-label="Connector categories"
            className={
              (mobileCategoriesOpen ? 'flex' : 'hidden') +
              ' absolute top-16 right-0 left-0 z-20 max-h-[330px] flex-col overflow-y-auto border-b border-[#eaecf5] bg-white py-2 lg:static lg:flex lg:max-h-none lg:w-[220px] lg:shrink-0 lg:border-r lg:border-b-0 lg:bg-transparent lg:py-10'
            }
            id="docs-connectors-categories"
          >
            {categories.map((category) => (
              <button
                aria-current={activeCategory === category.id ? 'true' : undefined}
                className={
                  'block w-full shrink-0 cursor-pointer appearance-none border-0 border-r-2 border-solid bg-transparent px-[22px] py-3 text-left text-[16px] leading-6 transition-colors lg:text-right ' +
                  (activeCategory === category.id
                    ? 'border-r-[#004cd3] font-semibold text-[#004cd3]'
                    : 'border-r-transparent font-medium text-[#535862] hover:bg-[#f1f6ff] hover:text-[#004cd3]')
                }
                key={category.id}
                onClick={() => chooseCategory(category.id)}
                type="button"
              >
                {category.label}
              </button>
            ))}
          </nav>

          <div
            aria-label={currentCategory + ' gallery'}
            className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8"
            key={activeCategory}
          >
            <div className="grid content-start grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredConnectors.map((item) => (
                <Link
                  className="group flex min-h-[56px] min-w-0 items-center gap-3 rounded-xl bg-white px-4 py-2 text-left text-[14px] font-medium text-[#101828] no-underline shadow-[0_4px_12px_-1px_rgba(10,13,18,0.08)] transition-[background-color,color,box-shadow] duration-200 hover:bg-[#f0f8ff] hover:text-[#086cf5] hover:shadow-[0_6px_15px_-1px_rgba(10,13,18,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff] sm:text-[15px]"
                  to={item.href}
                  key={item.category + '-' + item.name}
                >
                  <ConnectorLogo item={item} />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                </Link>
              ))}
            </div>
            {filteredConnectors.length === 0 ? (
              <p className="py-12 text-center text-sm text-[#717680]">No connectors in this category.</p>
            ) : null}
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-[1200px] text-center text-[12px] leading-5 text-[#98a2b3]">
          Connector documentation reflects the integrations currently available in Yak Ops.
        </p>
      </div>
    </section>
  );
}
