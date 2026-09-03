import DesktopDownloadLinks from "./DesktopDownloadLinks";
import HomeFeatureList from "./HomeFeatureList";
import YakCapabilitiesMap from "./YakCapabilitiesMap";

export default function HomeCapabilitiesSection() {
  return (
    <section style={{ background: "#F0EEE6" }}>
      <div style={{ background: "#D1CFC5", height: 1 }} />

      <div style={{ width: "100%", height: 128 }} />

      <div
        className="
          mb-3
          flex
          min-w-full
          max-w-[16ch]
          flex-col
          items-center
          justify-center
          text-left
          [font-family:'Yak_Serif',Georgia,sans-serif]
        "
      >
        <h1 className="mb-0 leading-[62px]">
          <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
            Where data gets to work.
          </span>
        </h1>
      </div>

      <DesktopDownloadLinks />

      <div style={{ width: "100%", height: 128 }} />

      <div className="relative overflow-hidden">
        <div
          className="
            mx-auto
            grid
            w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)]
            max-w-[90rem]
            grid-cols-1
            gap-12
            py-20
            lg:min-h-[760px]
            lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.55fr)]
            lg:items-center
            lg:gap-16
            lg:py-16
          "
        >
          <HomeFeatureList />
          <YakCapabilitiesMap />
        </div>
      </div>
    </section>
  );
}
