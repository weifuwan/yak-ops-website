type DocsSidebarProps = {
  onNavigate: () => void;
};

export default function DocsSidebar({ onNavigate }: DocsSidebarProps) {
  return (
    <nav aria-label="Documentation navigation" className="pb-10">
      <div className="mb-3 px-3 text-[13px] font-semibold leading-5 text-[#27272A]">Getting Started</div>
      <button
        aria-current="page"
        className="flex w-full cursor-pointer items-start rounded-[10px] border-0 bg-[#E4E4E7] px-3 py-2 text-left text-[13px] font-medium leading-5 text-[#18181B]"
        onClick={onNavigate}
        type="button"
      >
        Docker Compose
      </button>
    </nav>
  );
}
