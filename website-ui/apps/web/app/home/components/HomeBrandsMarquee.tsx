const brands = [
  { name: 'Ambry Genetics', image: 'ambry-genetics.webp' },
  { name: 'Mercedes-Benz', image: 'mercedes.webp' },
  { name: 'Samsung', image: 'samsung.webp' },
  { name: 'Mango', image: 'mango.webp' },
  { name: 'Santander', image: 'santander.webp' },
  { name: 'Airbus', image: 'airbus.webp' },
  { name: 'Carrefour', image: 'carrefour.webp' },
  { name: 'OpenAI', image: 'openai.webp' },
  { name: 'S&P Global', image: 'sp-global.webp' },
  { name: 'Experian', image: 'experian.webp' },
  { name: 'Scout24', image: 'scout24.webp' },
  { name: 'Expedia', image: 'expedia.webp' },
  { name: 'Yelp', image: 'yelp.webp' },
] as const;

export default function HomeBrandsMarquee() {
  return (
    <section aria-label="Trusted by leading companies" className="w-full overflow-hidden bg-white py-4">
      {/* Exactly two identical tracks ensure the -50% translation loops seamlessly. */}
      <div className="flex w-max motion-safe:animate-[brand-marquee-scroll_41.6s_linear_infinite] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul aria-hidden={copy === 1} className="m-0 flex shrink-0 list-none p-0" key={copy}>
            {brands.map((brand) => (
              <li className="flex h-16 w-40 shrink-0 items-center justify-center" key={brand.name}>
                <img
                  alt={copy === 0 ? brand.name : ''}
                  className="block h-16 w-40 object-contain"
                  decoding="async"
                  height="64"
                  loading={copy === 0 ? 'eager' : 'lazy'}
                  src={`https://www.getcollate.io/images/brand/${brand.image}`}
                  width="160"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
