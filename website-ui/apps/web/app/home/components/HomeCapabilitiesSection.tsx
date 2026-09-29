import DesktopDownloadLinks from './DesktopDownloadLinks';
import HomeFeatureList from './HomeFeatureList';
import WorkflowCodeVisual from './WorkflowCodeVisual';

export default function HomeCapabilitiesSection() {
  return (
    <section style={{ background: '#F0EEE6' }}>
      <div style={{ background: '#D1CFC5', height: 1 }} />

      <div className="relative overflow-hidden">
        <div className="mx-auto w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)] max-w-[90rem] py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]">
          <div className="flex flex-col items-center text-center">
            <h2 className="m-0 text-[clamp(2.5rem,2.035714rem+2.321429vw,4.125rem)] font-medium leading-[1.04]  text-[#181817] [font-family:'Yak_Serif',Georgia,sans-serif]">
              Core capabilities
            </h2>
            <p className="mb-0 mt-5 max-w-[40rem] text-[clamp(1.05rem,0.985714rem+0.321429vw,1.275rem)] leading-[1.5] text-[#66645F] [font-family:'Yak_Sans',Arial,sans-serif]">
              Everything you need to build, move, trust, and serve data in one place.
            </p>
          </div>

          <div className="mt-[clamp(5rem,4.428571rem+2.857143vw,7rem)]">
            <HomeFeatureList />
          </div>
        </div>
      </div>
    </section>
  );
}
