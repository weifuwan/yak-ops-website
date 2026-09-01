import MarketingHeader from './components/MarketingHeader';

export default function HomePage() {
  return (
    <div
      className="
        relative
        z-[1]
        visible
        transform-none
        border-b
        border-[#e8e6dc]
        bg-[#faf9f5]
        opacity-100
      "
    >
      <MarketingHeader />
    </div>
  );
}