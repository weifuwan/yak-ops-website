import heroImage from "@/assets/ChatGPT_图像_2026年9月29日_12_45_30.png";

export default function HomeHeroSection() {
  return (
    <section className="w-full overflow-hidden bg-[#EDF4FF]">
      <img
        src={heroImage}
        alt="Yak Ops data operations hero"
        className="block h-auto w-full select-none object-cover"
        draggable={false}
      />
    </section>
  );
}
