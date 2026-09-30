type DocsHeaderProps = {
  onOpenNavigation: () => void;
};

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
      <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

export default function DocsHeader({ onOpenNavigation }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F5F5] text-[#18181B]">
      <div className="mx-auto flex h-16 max-w-[80rem] items-center px-5 lg:px-8">
        <button
          aria-label="Open documentation navigation"
          className="mr-3 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 text-[#71717A] transition-colors hover:bg-black/[0.04] lg:hidden"
          onClick={onOpenNavigation}
          type="button"
        >
          <MenuIcon />
        </button>

        <span className="text-[15px] font-semibold">Getting Started</span>
      </div>

      <div className="h-px w-full bg-[#E4E4E7]" />
    </header>
  );
}
