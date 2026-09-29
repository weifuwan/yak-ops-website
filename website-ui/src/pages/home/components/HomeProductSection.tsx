import { Link } from "@umijs/max";

const PRODUCTS = [
  {
    eyebrow: "Connect",
    title: "Data Sources",
    description:
      "Manage MySQL, PostgreSQL, and Oracle connections with real connectivity checks and structured JDBC configuration.",
    href: "/product/data-sources",
  },
  {
    eyebrow: "Move",
    title: "Offline Sync",
    description:
      "Run MySQL batch synchronization into MySQL, PostgreSQL, or Oracle with APPEND, OVERWRITE, and UPSERT.",
    href: "/product/batch-sync",
  },
  {
    eyebrow: "Stream",
    title: "Realtime Sync",
    description:
      "Capture MySQL changes with CDC, continue from persisted offsets, and apply INSERT, UPDATE, and DELETE downstream.",
    href: "/product/realtime-sync",
  },
  {
    eyebrow: "Operate",
    title: "Operations Center",
    description:
      "Start, stop, inspect, and trace task instances from a dedicated runtime surface without mixing execution into definition editing.",
    href: "/docs",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 10h10M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HomeProductSection() {
  return (
    <section className="border-y border-solid border-[#E4E7EC] bg-[#F8FAFC]">
      <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(6rem,5rem+5vw,9rem)]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0B5CFF]">
              Product
            </p>
            <h2 className="m-0 mt-5 max-w-[15ch] text-[clamp(2.25rem,1.9rem+1.75vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#101828]">
              The core path for data operations.
            </h2>
          </div>
          <p className="m-0 max-w-[34rem] text-[16px] leading-7 text-[#667085]">
            Yak Ops v1.0.0 keeps the product surface focused: connect data, move it,
            stream changes, and operate the resulting tasks with confidence.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-[18px] border border-solid border-[#DDE3EA] bg-white lg:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <Link
              key={product.title}
              to={product.href}
              className={[
                "group relative min-h-[250px] p-[clamp(1.75rem,1.5rem+1.25vw,2.75rem)] text-[#101828] no-underline transition-colors duration-200 hover:bg-[#F6F9FF]",
                index % 2 === 0 ? "lg:border-r lg:border-solid lg:border-[#E4E7EC]" : "",
                index < 2 ? "border-b border-solid border-[#E4E7EC]" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#0B5CFF]">
                    {product.eyebrow}
                  </span>
                  <h3 className="m-0 mt-3 text-[25px] font-semibold tracking-[-0.02em]">
                    {product.title}
                  </h3>
                </div>
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-solid border-[#DDE3EA] text-[#475467] transition-all duration-200 group-hover:border-[#0B5CFF] group-hover:bg-[#0B5CFF] group-hover:text-white">
                  <ArrowIcon />
                </span>
              </div>

              <p className="m-0 mt-12 max-w-[34rem] text-[15px] leading-6 text-[#667085]">
                {product.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
