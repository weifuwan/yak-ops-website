import { BookOpen, Youtube } from 'lucide-react';
import { useState } from 'react';

type ExploreLink = {
  title: string;
  description: string;
  href: string;
  iconUrl: string;
  icon: typeof BookOpen;
};

const exploreLinks: readonly ExploreLink[] = [
  {
    title: 'Blogs',
    description: 'Get to know more about what’s new in data cataloging.',
    href: 'https://www.getcollate.io/blog',
    iconUrl:
      'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/blog.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=a419c5c44dbd6c6501be6a8c73681927',
    icon: BookOpen,
  },
  {
    title: 'Videos',
    description: 'Explore data analytics with quick and interesting lessons.',
    href: 'https://www.youtube.com/@CollateData',
    iconUrl:
      'https://mintcdn.com/collatedocs/q9W0TCgsCU2-B-iR/public/images/homepage-icons/youtube.svg?fit=max&auto=format&n=q9W0TCgsCU2-B-iR&q=85&s=68f22d62b4c58537bedf12a18cc6b7d6',
    icon: Youtube,
  },
];

function ExploreIcon({ item }: { item: ExploreLink }) {
  const [failed, setFailed] = useState(false);
  const FallbackIcon = item.icon;

  if (failed) {
    return (
      <FallbackIcon
        aria-hidden="true"
        className={item.title === 'Videos' ? 'shrink-0 text-[#ff0033]' : 'shrink-0 text-[#12b76a]'}
        size={20}
        strokeWidth={1.9}
      />
    );
  }

  return (
    <img
      alt=""
      aria-hidden="true"
      className="block h-5 w-5 shrink-0 object-contain"
      height={20}
      loading="lazy"
      onError={() => setFailed(true)}
      src={item.iconUrl}
      width={20}
    />
  );
}

/** External Collate learning resources linked by the documentation reference. */
export default function DocsExploreMore() {
  return (
    <section
      aria-labelledby="docs-explore-more-title"
      className="mx-auto w-full max-w-[1300px] px-5 py-9 text-left sm:px-10 lg:px-20"
    >
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3 lg:gap-6">
        <div>
          <h2
            className="m-0 text-[24px] leading-[1.3] font-semibold tracking-[-0.02em] text-[#252b37]"
            id="docs-explore-more-title"
          >
            Explore More
          </h2>
          <p className="m-0 mt-1 text-[18px] leading-[1.5] text-[#717680]">Learn more about Collate</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          {exploreLinks.map((item) => (
            <a
              className="group block min-w-0 rounded-xl bg-[#f4f9ff] px-5 py-3 text-[#535862] no-underline shadow-[0_4px_12px_-8px_rgba(0,38,84,0.24)] transition-[background-color,color,box-shadow] duration-300 hover:bg-[#eaf3ff] hover:shadow-[0_5px_15px_-7px_rgba(0,38,84,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677ff]"
              href={item.href}
              key={item.title}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="flex items-center gap-2.5 text-[18px] font-medium leading-7 text-[#252b37] group-hover:text-[#086cf5]">
                <ExploreIcon item={item} />
                {item.title}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] font-normal text-[#535862]">
                {item.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
