import { motion, useReducedMotion } from "framer-motion";

import { HOME_EASE } from "../constants";

type Integration = {
  name: string;
  category: string;
  image?: string;
  imageAlt?: string;
};

const INTEGRATIONS: Integration[] = [
  {
    name: "Link-Up",
    category: "Offline sync",
    image: "/images/integrations/link-up.png",
    imageAlt: "Link-Up",
  },
  {
    name: "Flink CDC",
    category: "Realtime sync",
    image: "/images/integrations/flink-cdc.png",
    imageAlt: "Flink CDC",
  },
  {
    name: "JDBC",
    category: "Datasource",
    image: "/images/integrations/jdbc.png",
    imageAlt: "JDBC",
  },
  {
    name: "Doris",
    category: "Datasource",
    image: "/images/integrations/doris.png",
    imageAlt: "Doris",
  },
  {
    name: "MinIO",
    category: "Storage",
    image: "/images/integrations/minio.png",
    imageAlt: "MinIO",
  },
  {
    name: "HDFS",
    category: "Storage",
    image: "/images/integrations/hdfs.png",
    imageAlt: "HDFS",
  },
  {
    name: "SQL · Python · Shell · Java",
    category: "Task runtimes",
    image: "/images/integrations/task-runtimes.png",
    imageAlt: "SQL Python Shell Java",
  },
  {
    name: "DingTalk",
    category: "Alerts",
    image: "/images/integrations/dingtalk.png",
    imageAlt: "DingTalk",
  },
];

function IntegrationImage({
  image,
  alt,
}: {
  image?: string;
  alt: string;
}) {
  if (!image) {
    return (
      <div
        aria-hidden="true"
        className="
          h-[72px]
          w-full
          max-w-[160px]
          rounded-xl
          bg-[#E7E4DB]
        "
      />
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      className="
        h-[72px]
        w-full
        max-w-[160px]
        object-contain
        object-left
      "
    />
  );
}

export default function HomeDataStackSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-t border-solid border-[#E3E0D7] bg-[#FAF9F5]">
      <div
        className="
          mx-auto
          w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)]
          max-w-[90rem]
          py-[clamp(7rem,6.142857rem+4.285714vw,10rem)]
        "
      >
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-12
            lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.72fr)]
            lg:gap-[clamp(4rem,2.857143rem+5.714286vw,8rem)]
          "
        >
          {/* Integration wall */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              ease: HOME_EASE,
            }}
            className="
              rounded-[clamp(1.5rem,1.071429rem+2.142857vw,3rem)]
              bg-[#F0EEE6]
              px-[clamp(1.5rem,0.928571rem+2.857143vw,3.5rem)]
              py-[clamp(2.5rem,1.928571rem+2.857143vw,4.5rem)]
            "
          >
            <div
              className="
                grid
                grid-cols-2
                gap-x-8
                gap-y-[clamp(2.75rem,2.178571rem+2.857143vw,4.75rem)]
                sm:grid-cols-3
                lg:grid-cols-4
              "
            >
              {INTEGRATIONS.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.35,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.5,
                    delay:
                      shouldReduceMotion
                        ? 0
                        : (index % 4) * 0.055,
                    ease: HOME_EASE,
                  }}
                  className="group min-w-0"
                >
                  <div className="flex min-h-[132px] flex-col justify-center">
                    <div
                      className="
                        flex
                        min-h-[72px]
                        items-center
                      "
                    >
                      <IntegrationImage
                        image={integration.image}
                        alt={
                          integration.imageAlt ??
                          integration.name
                        }
                      />
                    </div>
{/* 
                    <p
                      className="
                        mb-0
                        mt-5
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-[#8A877F]
                        [font-family:'Yak_Sans',Arial,sans-serif]
                      "
                    >
                      {integration.category}
                    </p>

                    <h3
                      className="
                        m-0
                        mt-1.5
                        text-[clamp(1rem,0.93rem+0.25vw,1.18rem)]
                        font-medium
                        leading-[1.25]
                        text-[#353431]
                        [font-family:'Yak_Sans',Arial,sans-serif]
                      "
                    >
                      {integration.name}
                    </h3> */}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    x: 18,
                  }
            }
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.45,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: HOME_EASE,
            }}
            className="max-w-[31rem] lg:max-w-none"
          >
            <h2
              className="
                m-0
                text-[clamp(2.25rem,1.946429rem+1.517857vw,3.3125rem)]
                font-medium
                leading-[1.04]
                tracking-[-0.025em]
                text-[#181817]
                [font-family:'Yak_Serif',Georgia,sans-serif]
              "
            >
              Works with your data stack
            </h2>

            <p
              className="
                mb-0
                mt-6
                text-[clamp(1rem,0.964286rem+0.178571vw,1.125rem)]
                leading-[1.62]
                text-[#66645F]
                [font-family:'Yak_Sans',Arial,sans-serif]
              "
            >
              Keep the infrastructure you already use. Yak Ops
              connects engines, storage, task runtimes, and
              alerting through one operating context.
            </p>

            <a
              href="https://github.com/weifuwan/yak-ops"
              target="_blank"
              rel="noreferrer"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-solid
                border-[#D1CFC5]
                px-4
                py-2.5
                text-[14px]
                font-medium
                text-[#353431]
                no-underline
                transition-colors
                duration-200
                hover:border-[#A9A69D]
                hover:bg-[#F0EEE6]
                hover:text-[#181817]
                [font-family:'Yak_Sans',Arial,sans-serif]
              "
            >
              Explore on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}