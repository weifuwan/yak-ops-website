import brandLogo from "@/assets/img/logo2.png";
import {
  MARKETING_HEADER_ACTIONS,
  MARKETING_NAV_ITEMS,
  type MarketingMegaNavItem,
} from "@/config/marketingNavigation";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useState } from "react";
import "./index.less";

interface MarketingLinkProps {
  href: string;
  external?: boolean;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}

interface NavDropdownProps {
  item: MarketingMegaNavItem;
  openMenu: string | null;
  setOpenMenu: (key: string | null) => void;
}

const MENU_WIDTH_BY_COLUMNS: Record<number, string> = {
  1: "w-[24rem]",
  2: "w-[38rem]",
  3: "w-[50rem]",
  4: "w-[56rem]",
};

const MENU_GRID_BY_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

function MarketingLink({
  href,
  external = false,
  className,
  children,
  onClick,
}: MarketingLinkProps) {
  if (external) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        rel="noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} onClick={onClick} to={href}>
      {children}
    </Link>
  );
}

function ChevronDown({ open = false }: { open?: boolean }) {
  return (
    <span
      className={`
        aspect-square
        w-4
        flex-none
        text-[#667085]
        transition-transform
        duration-[750ms]
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${open ? "rotate-180" : "rotate-0"}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="none"
        className="block h-full w-full"
        aria-hidden="true"
      >
        <path
          d="M14.128 7.16482C14.3126 6.95983 14.6298 6.94336 14.835 7.12771C15.0402 7.31242 15.0567 7.62952 14.8721 7.83477L10.372 12.835L10.2939 12.9053C10.2093 12.9667 10.1063 13 9.99995 13C9.85833 12.9999 9.72264 12.9402 9.62788 12.835L5.12778 7.83477L5.0682 7.75273C4.95072 7.55225 4.98544 7.28926 5.16489 7.12771C5.34445 6.96617 5.60969 6.95939 5.79674 7.09744L5.87193 7.16482L9.99995 11.7519L14.128 7.16482Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4 flex-none"
      aria-hidden="true"
    >
      <path
        d="M9.5 3C9.77614 3 10 3.22386 10 3.5C10 3.77614 9.77614 4 9.5 4H4.5C4.22386 4 4 4.22386 4 4.5V15.5C4 15.7761 4.22386 16 4.5 16H15.5C15.7761 16 16 15.7761 16 15.5V10.5C16 10.2239 16.2239 10 16.5 10C16.7761 10 17 10.2239 17 10.5V15.5C17 16.3284 16.3284 17 15.5 17H4.5C3.67157 17 3 16.3284 3 15.5V4.5C3 3.67157 3.67157 3 4.5 3H9.5ZM16.5 3C16.7761 3 17 3.22386 17 3.5V7.5C17 7.77614 16.7761 8 16.5 8C16.2239 8 16 7.77614 16 7.5V4.70703L11.8535 8.85352C11.6583 9.04878 11.3417 9.04878 11.1465 8.85352C10.9512 8.65825 10.9512 8.34175 11.1465 8.14648L15.293 4H12.5C12.2239 4 12 3.77614 12 3.5C12 3.22386 12.2239 3 12.5 3H16.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BrandLogo() {
  return (
    <Link
      aria-label="Home page"
      to="/"
      className="
        relative
        z-[2]
        flex
        w-[7.5rem]
        max-w-full
        flex-none
        items-center
        justify-start
        rounded-md
        outline-none
        outline-offset-4
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-[#B8C7DD]
      "
    >
      <img
        src={brandLogo}
        alt="Yak Ops"
        className="block h-auto w-full select-none object-contain"
        draggable={false}
      />
    </Link>
  );
}

function MegaMenu({
  item,
  closeMenu,
}: {
  item: MarketingMegaNavItem;
  closeMenu: () => void;
}) {
  const [hoveredLinkKey, setHoveredLinkKey] = useState<string | null>(null);

  const columnCount = Math.min(
    Math.max(item.columns.length, 1),
    4,
  );

  const gridClass =
    MENU_GRID_BY_COLUMNS[columnCount] ?? "grid-cols-1";

  return (
    <div
      role="menu"
      className={`
        grid
        w-full
        ${gridClass}
        overflow-hidden
        rounded-[12.5px]
        bg-white
        px-7
        py-5
        text-[#344054]
        shadow-[0_1px_2px_rgba(17,17,16,0.08),0_14px_40px_rgba(17,17,16,0.14)]
      `}
    >
      {item.columns.map((column, columnIndex) => (
        <div
          className="min-w-0 px-6 first:pl-0 last:pr-0"
          key={column.title}
          style={
            columnIndex === 0
              ? undefined
              : {
                  borderLeft: "1px solid #E4E7EC",
                }
          }
        >
          <div
            className="
              mb-4
              text-[12px]
              font-normal
              leading-5
              tracking-[0.01em]
              text-[#98A2B3]
            "
          >
            {column.title}
          </div>

          <ul
            className="m-0 list-none p-0"
            onMouseLeave={() => setHoveredLinkKey(null)}
          >
            {column.items.map((link) => {
              const linkKey = `${column.title}-${link.label}`;

              const isDimmed =
                hoveredLinkKey !== null &&
                hoveredLinkKey !== linkKey;

              return (
                <li
                  key={linkKey}
                  onMouseEnter={() =>
                    setHoveredLinkKey(linkKey)
                  }
                >
                  <MarketingLink
                    className={`
                      -mx-3
                      flex
                      min-h-10
                      items-center
                      justify-between
                      gap-3
                      rounded-[4px]
                      px-3
                      py-1.5
                      no-underline

                      transition-[background-color,color]
                      duration-[220ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]

                      hover:!bg-[#F5F7FA]
                      hover:!text-[#344054]

                      focus-visible:!bg-[#F5F7FA]
                      focus-visible:!text-[#344054]
                      focus-visible:outline-none

                      motion-reduce:transition-none

                      ${
                        isDimmed
                          ? "!text-[#98A2B3]"
                          : "!text-[#344054]"
                      }
                    `}
                    external={link.external}
                    href={link.href}
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>

                    {link.external && (
                      <ExternalLinkIcon />
                    )}
                  </MarketingLink>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function NavDropdown({
  item,
  openMenu,
  setOpenMenu,
}: NavDropdownProps) {
  const open = openMenu === item.key;

  const columnCount = Math.min(
    Math.max(item.columns.length, 1),
    4,
  );

  const widthClass =
    MENU_WIDTH_BY_COLUMNS[columnCount] ?? "w-[42rem]";

  return (
    <li className="flex items-center">
      <div
        className="relative z-[900] inline-block text-left"
        onMouseEnter={() => setOpenMenu(item.key)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          className={`
            relative
            z-[2]
            flex
            cursor-pointer
            select-none
            items-center
            gap-1
            whitespace-nowrap
            rounded-[7px]
            border-0
            bg-transparent
            px-3
            py-2
            text-[15px]
            leading-5
            text-[#344054]
            outline-none

            transition-[background-color,color]
            duration-200

            hover:bg-[#F5F7FA]
            hover:text-[#101828]

            focus-visible:bg-[#F5F7FA]
            focus-visible:text-[#101828]

            ${
              open
                ? "bg-[#F5F7FA] text-[#101828]"
                : ""
            }
          `}
          onClick={() =>
            setOpenMenu(open ? null : item.key)
          }
        >
          <span>{item.label}</span>
          <ChevronDown open={open} />
        </button>

        <div
          className={`
            absolute
            top-full
            left-1/2
            z-[1000]
            -translate-x-1/2
            pt-2
            ${widthClass}
            ${
              open
                ? "pointer-events-auto"
                : "pointer-events-none"
            }
          `}
        >
          <div
            aria-hidden={!open}
            className={`
              grid
              transition-[grid-template-rows,opacity]
              duration-[750ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]

              ${
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }
            `}
          >
            <div className="min-h-0 overflow-hidden">
              <MegaMenu
                item={item}
                closeMenu={() => setOpenMenu(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

const NAV_LINK_CLASS_NAME = `
  flex
  items-center
  gap-1
  whitespace-nowrap

  rounded-[7px]

  px-3
  py-2

  text-[15px]
  leading-5
  text-[#344054]

  no-underline

  transition-[background-color,color]
  duration-200

  hover:bg-[#F5F7FA]
  hover:!text-[#101828]

  focus-visible:bg-[#F5F7FA]
  focus-visible:!text-[#101828]
  focus-visible:outline-none
`;

const GET_STARTED_LINK_CLASS_NAME = `
  inline-flex
  h-[40px]
  items-center
  justify-center
  whitespace-nowrap

  rounded-[9px]

  border
  border-solid
  border-[#0B5CFF]

  bg-[#0B5CFF]

  px-4

  text-[15px]
  font-semibold
  leading-none
  text-white

  no-underline

  transition-[background-color,border-color]
  duration-200
  ease-out

  hover:border-[#004CE6]
  hover:bg-[#004CE6]
  hover:!text-white

  focus-visible:border-[#004CE6]
  focus-visible:bg-[#004CE6]
  focus-visible:!text-white
  focus-visible:outline-none
`;

export default function MarketingHeader() {
  const [openMenu, setOpenMenu] =
    useState<string | null>(null);

  return (
    <div
      className="
        mx-auto
        flex
        h-[60px]
        w-[calc(100%-clamp(2rem,calc(1.428571rem+2.857143vw),4rem)*2)]
        max-w-[90rem]
        items-center
        gap-6
        [container:threshold-large/inline-size]
      "
      style={{
        fontFamily: "var(--yak-font-marketing)",
      }}
    >
      <BrandLogo />

      <nav
        className="ml-auto flex h-full items-center"
        aria-label="Primary navigation"
      >
        <ul
          className="
            m-0
            flex
            h-full
            list-none
            items-center
            justify-center
            gap-0
            p-0
          "
        >
          {MARKETING_NAV_ITEMS.map((item) =>
            item.kind === "mega" ? (
              <NavDropdown
                item={item}
                key={item.key}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ) : (
              <li
                className="flex items-center"
                key={item.key}
              >
                <MarketingLink
                  className={NAV_LINK_CLASS_NAME}
                  external={item.external}
                  href={item.href}
                >
                  <span>{item.label}</span>

                  {item.external && (
                    <ExternalLinkIcon />
                  )}
                </MarketingLink>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="flex flex-none items-center gap-2">
        <MarketingLink
          href={MARKETING_HEADER_ACTIONS.startUsing}
          className={`${GET_STARTED_LINK_CLASS_NAME} yak-get-started-link`}
        >
          Get Started
        </MarketingLink>
      </div>
    </div>
  );
}