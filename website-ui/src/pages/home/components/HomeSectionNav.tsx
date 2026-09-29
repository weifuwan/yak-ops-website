const SECTION_NAV_ITEMS = [
  "产品价值",
  "产品概览",
  "核心能力",
  "拓展阅读",
  "应用场景",
  "客户案例",
  "相关推荐",
  "常见问题",
] as const;

export default function HomeSectionNav() {
  return (
    <div className="bg-white">
      <nav
        aria-label="Homepage sections"
        className="mx-auto hidden justify-center px-6 py-6 md:flex"
      >
        <div className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2 py-2 backdrop-blur-xl">
          {SECTION_NAV_ITEMS.map((label) => (
            <button
              key={label}
              type="button"
              className="cursor-pointer rounded-full border-0 bg-transparent px-4 py-1.5 text-[14px] font-medium text-[#242424] transition-colors duration-200 hover:bg-white/70 hover:text-[#111827] focus-visible:bg-white/80 focus-visible:outline-none"
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
