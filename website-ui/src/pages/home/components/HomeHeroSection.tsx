import heroImage from "@/assets/homepage-hero-data-core.png";

export default function HomeHeroSection() {
  return (
    <section className="h-[320px] w-full overflow-hidden bg-[#EDF4FF] sm:h-[380px] lg:h-[488px]">
      <img
        src={heroImage}
        alt="Yak Ops data operations hero"
        className="block h-full w-full select-none object-cover object-[72%_65%]"
        draggable={false}
      />
    </section>
  );
}
