"use client";
import brandLogo from "@/assets/img/logo2.png";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import DataFlowVisualBasketball from "./DataFlowVisualBasketball";
import DataFlowVisualFootball from "./DataFlowVisualFootball";

const SWITCH_INTERVAL = 7000;

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type VisualType = "basketball" | "football";

export default function HomePage() {
  const [visual, setVisual] = useState<VisualType>("basketball");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisual((current) =>
        current === "basketball" ? "football" : "basketball",
      );
    }, SWITCH_INTERVAL);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-[calc(100vh-84px)] overflow-hidden bg-[#faf9f5] text-[#181817] [font-family:var(--yak-font-marketing)]">
      <section
        className="
          mx-auto
          grid
          min-h-[calc(100vh-84px)]
          w-[calc(100%-clamp(2rem,1.428571rem+2.857143vw,4rem)*2)]
          max-w-[90rem]
          grid-cols-1
          items-center
          gap-8
          py-12
          lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]
          lg:gap-6
          lg:py-0
        "
      >
        {/* Hero Content */}
        <div
          data-animate-hero-heading=""
          className="hero_home_heading_wrap text-[#141413]"
        >
          <div
            className="
              mb-3
              flex
              min-w-full
              max-w-[16ch]
              flex-col
              items-start
              justify-center
              text-left
              [font-family:'Yak_Serif',Georgia,sans-serif]
            "
          >
            <h1 className="mb-0 leading-[62px]">
              <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
                Run&nbsp;
              </span>

              <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
                your
              </span>

              <br />

              <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
                data&nbsp;
              </span>

              <span className="text-[clamp(2.25rem,1.75rem+2.5vw,4rem)]">
                operations
              </span>
            </h1>
          </div>

          <div
            className="
              min-w-full
              max-w-[24ch]
              text-left
              text-[clamp(1.1875rem,1.169643rem+0.089286vw,1.25rem)]
              leading-[1.6]
              tracking-normal
              text-[#5e5d59]
              [font-family:'Yak_Sans',Arial,sans-serif]
            "
          >
            <p>Build, move, govern, and operate data with confidence.</p>
          </div>
        </div>

        {/* Visual */}
        <div className="flex min-h-[420px] items-center justify-center pb-4 lg:min-h-0 lg:pb-0">
          <div className="relative flex w-full items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={visual}
                className="flex w-full items-center justify-center"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: 12,
                        scale: 0.985,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: -8,
                        scale: 0.99,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.65,
                  ease: EASE,
                }}
              >
                {visual === "basketball" ? (
                  <DataFlowVisualBasketball />
                ) : (
                  <DataFlowVisualFootball />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section style={{ background: "#F0EEE6" }}>
        <div
          style={{
            background: "#D1CFC5",
            height: 1,
          }}
        />

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
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.35,
            ease: EASE,
          }}
          className="
        mt-8
        flex
        flex-col
        items-center
        justify-center
        gap-3
        text-[13px]
        text-[#343330]
        [font-family:'Yak_Sans',Arial,sans-serif]
        sm:flex-row
      "
        >
          <span className="mr-1 whitespace-nowrap">
            Download the desktop app:
          </span>

          <motion.a
            target="_blank"
            rel="noreferrer"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.48,
              ease: EASE,
            }}
            className="
          inline-flex
          h-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#D1CFC5]
          bg-[#E5E3DA]
          px-5
          font-medium
          text-[#343330]
          transition-[background-color,border-color,transform]
          duration-200
          hover:-translate-y-px
          hover:border-[#BDBAB0]
          hover:bg-[#DCDAD1]
        "
          >
            macOS
          </motion.a>

          <motion.a
            target="_blank"
            rel="noreferrer"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.58,
              ease: EASE,
            }}
            className="
          inline-flex
          h-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#D1CFC5]
          bg-[#E5E3DA]
          px-5
          font-medium
          text-[#343330]
          transition-[background-color,border-color,transform]
          duration-200
          hover:-translate-y-px
          hover:border-[#BDBAB0]
          hover:bg-[#DCDAD1]
        "
          >
            Windows
          </motion.a>

          <motion.a
            target="_blank"
            rel="noreferrer"
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0 : 0.68,
              ease: EASE,
            }}
            className="
          inline-flex
          h-9
          items-center
          justify-center
          rounded-lg
          border
          border-[#D1CFC5]
          bg-[#E5E3DA]
          px-5
          font-medium
          text-[#343330]
          transition-[background-color,border-color,transform]
          duration-200
          hover:-translate-y-px
          hover:border-[#BDBAB0]
          hover:bg-[#DCDAD1]
        "
          >
            Windows (arm64)
          </motion.a>
        </motion.div>
        <div style={{ width: "100%", height: 128 }} />
        <div className="relative overflow-hidden ">
          {/* Divider */}
          

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
            {/* Left: feature list */}
            <div className="flex flex-col">
              {[
                {
                  title: "Build workflows visually",
                  description:
                    "Connect sources, transformations, and destinations into clear, maintainable data workflows.",
                  icon: (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <circle
                        cx="5"
                        cy="5"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="15"
                        cy="5"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="10"
                        cy="15"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />

                      <path
                        d="M6.8 6.2L9 12.8M13.2 6.2L11 12.8M7 5H13"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Operate with confidence",
                  description:
                    "Schedule jobs, monitor executions, inspect logs, and keep every data operation visible.",
                  icon: (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 16.5H17"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />

                      <rect
                        x="4"
                        y="10"
                        width="2.5"
                        height="5"
                        rx="0.7"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />

                      <rect
                        x="8.75"
                        y="5"
                        width="2.5"
                        height="10"
                        rx="0.7"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />

                      <rect
                        x="13.5"
                        y="7.5"
                        width="2.5"
                        height="7.5"
                        rx="0.7"
                        stroke="currentColor"
                        strokeWidth="1.1"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Turn data into services",
                  description:
                    "Expose trusted data through APIs with authentication, rate limits, governance, and auditability.",
                  icon: (
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="14"
                        height="12"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />

                      <path
                        d="M6 8L8 10L6 12"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M11 12H14"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.5,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.65,
                    delay: shouldReduceMotion ? 0 : index * 0.12,
                    ease: EASE,
                  }}
                  className="
            border-t
            border-[#D1CFC5]
            py-8
            first:mt-0
          "
                >
                  <div className="flex items-center gap-3 text-[#181817]">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center text-[#5E5D59]">
                      {item.icon}
                    </div>

                    <h3
                      className="
                text-[clamp(1.125rem,1rem+0.4vw,1.35rem)]
                font-medium
                leading-[1.25]
                [font-family:'Yak_Serif',Georgia,sans-serif]
              "
                    >
                      {item.title}
                    </h3>
                  </div>

                  <p
                    className="
              mt-4
              max-w-[31ch]
              text-[15px]
              leading-[1.6]
              text-[#5E5D59]
              [font-family:'Yak_Sans',Arial,sans-serif]
            "
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right: Yak Ops mind map */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.985,
                    }
              }
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.7,
                ease: EASE,
              }}
              className="
        relative
        min-h-[520px]
        w-full
        sm:min-h-[640px]
        lg:min-h-[720px]
      "
            >
              {(() => {
                const center = {
                  x: 460,
                  y: 370,
                };

                const groups = [
                  {
                    title: "Workflow orchestration",
                    x: 210,
                    y: 215,
                    nodes: [
                      { label: "Scheduling", x: 122, y: 80 },
                      { label: "DAGs", x: 52, y: 195 },
                      { label: "Dependencies", x: 175, y: 335 },
                      { label: "Retries", x: 345, y: 130 },
                      { label: "Parameters", x: 330, y: 265 },
                    ],
                  },
                  {
                    title: "Data integration",
                    x: 660,
                    y: 175,
                    nodes: [
                      { label: "Connectors", x: 650, y: 48 },
                      { label: "Batch sync", x: 815, y: 110 },
                      { label: "CDC", x: 845, y: 235 },
                      { label: "Transforms", x: 715, y: 305 },
                      { label: "Destinations", x: 565, y: 280 },
                    ],
                  },
                  {
                    title: "Data quality",
                    x: 735,
                    y: 430,
                    nodes: [
                      { label: "Validation", x: 870, y: 350 },
                      { label: "Rules", x: 870, y: 485 },
                      { label: "Alerts", x: 750, y: 560 },
                      { label: "Profiling", x: 625, y: 510 },
                      { label: "Reports", x: 620, y: 395 },
                    ],
                  },
                  {
                    title: "Data services",
                    x: 565,
                    y: 620,
                    nodes: [
                      { label: "APIs", x: 720, y: 665 },
                      { label: "Authentication", x: 600, y: 725 },
                      { label: "Rate limits", x: 445, y: 720 },
                      { label: "Blacklists", x: 425, y: 610 },
                      { label: "Access control", x: 555, y: 545 },
                    ],
                  },
                  {
                    title: "Operations",
                    x: 215,
                    y: 570,
                    nodes: [
                      { label: "Monitoring", x: 80, y: 480 },
                      { label: "Logs", x: 55, y: 620 },
                      { label: "Audit", x: 165, y: 710 },
                      { label: "Notifications", x: 335, y: 675 },
                      { label: "Metrics", x: 345, y: 530 },
                    ],
                  },
                ];

                return (
                  <svg
                    viewBox="0 0 920 760"
                    preserveAspectRatio="xMidYMid meet"
                    className="
              absolute
              inset-0
              h-full
              w-full
              overflow-visible
            "
                    aria-label="Yak Ops capabilities map"
                  >
                    {/* center -> category lines */}
                    {groups.map((group, groupIndex) => (
                      <motion.line
                        key={`main-line-${group.title}`}
                        x1={center.x}
                        y1={center.y}
                        x2={group.x}
                        y2={group.y}
                        stroke="#D1CFC5"
                        strokeWidth="1"
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                pathLength: 0,
                                opacity: 0,
                              }
                        }
                        whileInView={{
                          pathLength: 1,
                          opacity: 0.62,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.8,
                          delay: shouldReduceMotion
                            ? 0
                            : 0.15 + groupIndex * 0.1,
                          ease: EASE,
                        }}
                      />
                    ))}

                    {/* category -> node lines */}
                    {groups.flatMap((group, groupIndex) =>
                      group.nodes.map((node, nodeIndex) => (
                        <motion.line
                          key={`${group.title}-${node.label}-line`}
                          x1={group.x}
                          y1={group.y}
                          x2={node.x}
                          y2={node.y}
                          stroke="#DEDCD1"
                          strokeWidth="1"
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  pathLength: 0,
                                  opacity: 0,
                                }
                          }
                          whileInView={{
                            pathLength: 1,
                            opacity: 0.72,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.6,
                            delay: shouldReduceMotion
                              ? 0
                              : 0.65 + groupIndex * 0.1 + nodeIndex * 0.045,
                            ease: EASE,
                          }}
                        />
                      )),
                    )}

                    {/* category nodes */}
                    {groups.map((group, groupIndex) => (
                      <motion.g
                        key={group.title}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                scale: 0.9,
                              }
                        }
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.55,
                          delay: shouldReduceMotion
                            ? 0
                            : 0.25 + groupIndex * 0.1,
                          ease: EASE,
                        }}
                        style={{
                          transformOrigin: `${group.x}px ${group.y}px`,
                        }}
                      >
                        <circle
                          cx={group.x}
                          cy={group.y}
                          r="53"
                          fill="#F5F4ED"
                          opacity="0.96"
                        />

                        <text
                          x={group.x}
                          y={group.y + 4}
                          textAnchor="middle"
                          fill="#181817"
                          fontSize="14"
                          fontWeight="500"
                          style={{
                            fontFamily: "'Yak_Serif', Georgia, serif",
                          }}
                        >
                          {group.title}
                        </text>
                      </motion.g>
                    ))}

                    {/* leaf nodes */}
                    {groups.flatMap((group, groupIndex) =>
                      group.nodes.map((node, nodeIndex) => (
                        <motion.g
                          key={`${group.title}-${node.label}`}
                          initial={
                            shouldReduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 6,
                                }
                          }
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                            amount: 0.2,
                          }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.45,
                            delay: shouldReduceMotion
                              ? 0
                              : 0.8 + groupIndex * 0.1 + nodeIndex * 0.045,
                            ease: EASE,
                          }}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="28"
                            fill="#F5F4ED"
                            opacity="0.95"
                          />

                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill="#5E5D59"
                            fontSize="11.5"
                            fontWeight="400"
                            style={{
                              fontFamily: "'Yak_Sans', Arial, sans-serif",
                            }}
                          >
                            {node.label}
                          </text>
                        </motion.g>
                      )),
                    )}

                    {/* center masking area */}
                    <circle
                      cx={center.x}
                      cy={center.y}
                      r="112"
                      fill="#F5F4ED"
                      opacity="0.96"
                    />

                    {/* center logo */}
                    <motion.g
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              scale: 0.92,
                            }
                      }
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.65,
                        ease: EASE,
                      }}
                      style={{
                        transformOrigin: `${center.x}px ${center.y}px`,
                      }}
                    >
                      {/* Yak mark */}
                      <img src={brandLogo} />
                    </motion.g>
                  </svg>
                );
              })()}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
