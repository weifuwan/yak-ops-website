import { UseCaseResultSurface } from "./shared";
import type { HomeUseCaseDefinition } from "./types";

function ServicesIcon() {
  return (
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
        strokeWidth="1.1"
      />
      <path
        d="M6 8L8 10L6 12M11 12H14"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="3"
        width="7"
        height="9"
        rx="1.4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M4 5H3.8C3.14 5 2.6 5.54 2.6 6.2V12.2C2.6 12.86 3.14 13.4 3.8 13.4H8.6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path
        d="M4.5 6L8 9.5L11.5 6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface ServiceMetaProps {
  value: string;
  label: string;
}

function ServiceMeta({ value, label }: ServiceMetaProps) {
  return (
    <div
      className="
        min-w-0
        rounded-[9px]
        border
        border-[#E7E2DB]
        bg-[#FDFCF9]
        px-3
        py-2.5
      "
    >
      <div className="truncate text-[11px] font-medium tracking-[-0.015em] text-[#24231F]">
        {value}
      </div>

      <div className="mt-0.5 truncate text-[8px] text-[#8C8982]">
        {label}
      </div>
    </div>
  );
}

export default function ServicesUseCase() {
  return (
    <UseCaseResultSurface>
      <div className="flex h-full items-center justify-center p-5">
        <div
          className="
            w-full
            rounded-[16px]
            border
            border-[#E5E0D8]
            bg-[#FBFAF7]
            p-4
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-0.5">
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-[#1B1A18]">
                Customers API
              </div>

              <div className="mt-0.5 text-[9px] text-[#85817A]">
                Retrieve customer details by ID
              </div>
            </div>

            <div
              className="
                flex
                shrink-0
                items-center
                gap-1.5
                rounded-full
                border
                border-[#E3DED6]
                px-2.5
                py-1
                text-[8px]
                text-[#6F6B65]
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#317A57]" />
              Production
            </div>
          </div>

          {/* Endpoint */}
          <div
            className="
              mt-4
              flex
              h-10
              items-center
              overflow-hidden
              rounded-[9px]
              border
              border-[#E6E0D9]
              bg-[#FFFDFB]
            "
          >
            <div
              className="
                flex
                h-full
                w-[54px]
                shrink-0
                items-center
                justify-center
                bg-[#F3E7DF]
                text-[9px]
                font-semibold
                text-[#24221F]
              "
            >
              GET
            </div>

            <code
              className="
                min-w-0
                flex-1
                truncate
                px-3
                text-[9px]
                text-[#34322E]
                [font-family:'Yak_Mono',monospace]
              "
            >
              /api/v1/customers/:id
            </code>

            <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center text-[#89857E]">
              <CopyIcon />
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <ServiceMeta value="API key" label="Authentication" />
            <ServiceMeta value="600/min" label="Rate limit" />
            <ServiceMeta value="Enabled" label="Audit" />
          </div>

          {/* Response */}
          <div
            className="
              mt-3
              rounded-[10px]
              border
              border-[#E6E0D9]
              bg-[#FFFDFB]
              p-2.5
            "
          >
            <div className="flex items-center justify-between px-0.5 pb-2">
              <div className="text-[9px] font-medium text-[#393631]">
                Response preview
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-1
                  rounded-[6px]
                  border
                  border-[#E3DED6]
                  px-2
                  py-1
                  text-[8px]
                  text-[#57534E]
                "
              >
                JSON
                <ChevronDownIcon />
              </div>
            </div>

            <div
              className="
                relative
                overflow-hidden
                rounded-[8px]
                bg-[#181817]
                px-3
                py-3
                [font-family:'Yak_Mono',monospace]
              "
            >
              {/* very subtle dotted texture */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  right-0
                  w-[45%]
                  opacity-[0.035]
                  [background-image:radial-gradient(#fff_0.6px,transparent_0.6px)]
                  [background-size:6px_6px]
                "
              />

              <div className="relative">
                <div className="flex items-center gap-2 text-[8px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#65A97E]" />

                  <span className="text-[#73B78D]">
                    200 OK
                  </span>

                  <span className="text-[#666861]">
                    ·
                  </span>

                  <span className="text-[#A09E97]">
                    42 ms
                  </span>
                </div>

                <div className="mt-2.5 text-[8px] leading-[1.7] text-[#E8E6DC]">
                  <div>{"{"}</div>

                  <div className="pl-3">
                    <span className="text-[#D9946E]">
                      &quot;customer_id&quot;
                    </span>
                    <span className="text-[#AAA79F]">: </span>
                    <span className="text-[#A7C77B]">
                      &quot;C-1048&quot;
                    </span>
                    <span className="text-[#AAA79F]">,</span>
                  </div>

                  <div className="pl-3">
                    <span className="text-[#D9946E]">
                      &quot;segment&quot;
                    </span>
                    <span className="text-[#AAA79F]">: </span>
                    <span className="text-[#A7C77B]">
                      &quot;active&quot;
                    </span>
                  </div>

                  <div>{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UseCaseResultSurface>
  );
}

export const servicesUseCase: HomeUseCaseDefinition = {
  id: "services",
  label: "Services",
  prompt:
    "Publish the customer profile dataset as GET /api/v1/customers/:id. Require an API key, limit traffic to 600 requests per minute, and enable audit logging.",
  stageColor: "#EBC9B7",
  Icon: ServicesIcon,
  Result: ServicesUseCase,
};