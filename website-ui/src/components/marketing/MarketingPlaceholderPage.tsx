interface MarketingPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function MarketingPlaceholderPage({
  eyebrow,
  title,
  description = '页面建设中。',
}: MarketingPlaceholderPageProps) {
  return (
    <main className="min-h-[calc(100vh-84px)] bg-[#faf9f5] text-[#1f1f1d]">
      <div className="mx-auto w-full max-w-[90rem] px-8 py-24 sm:px-10 lg:px-16 lg:py-32">
        <p className="m-0 text-[12px] font-semibold tracking-[0.16em] text-[#77746d]">
          {eyebrow}
        </p>
        <h1 className="mt-5 text-[44px] font-normal leading-[1.05] tracking-[-0.035em] sm:text-[56px]">
          {title}
        </h1>
        <p className="mt-5 text-[16px] leading-7 text-[#6f6f6b]">{description}</p>
      </div>
    </main>
  );
}
