import heroImage from "@/assets/ChatGPT_图像_2026年9月29日_12_45_30.png";

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
