import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

export type DocsFilterOption = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: DocsFilterOption[];
  onChange: (value: string) => void;
};

export default function DocsFilterSelect({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    const frame = window.requestAnimationFrame(() => {
      const selectedOption = listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      selectedOption?.focus();
    });
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.cancelAnimationFrame(frame);
    };
  }, [open]);

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }

    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const entries = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
    const current = entries.findIndex((entry) => entry === document.activeElement);
    let next = current;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = entries.length - 1;
    if (event.key === 'ArrowDown') next = (current + 1) % entries.length;
    if (event.key === 'ArrowUp') next = (current - 1 + entries.length) % entries.length;
    entries[next]?.focus();
  };

  return (
    <div ref={containerRef} className="relative flex min-w-0 flex-col gap-2 text-[12px] font-medium text-[#475467]">
      <span id={id + '-label'}>{label}</span>
      <button
        aria-controls={id + '-options'}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label + ': ' + (selected?.label ?? '')}
        className={[
          'flex h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border bg-white px-3 text-left text-[13px] font-normal transition-[border-color,box-shadow] duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F6FED]/15',
          open
            ? 'border-[#2F6FED] text-[#344054] shadow-[0_0_0_2px_rgba(47,111,237,0.10)]'
            : 'border-[#DFE7F5] text-[#475467] hover:border-[#A9C7FC]',
        ].join(' ')}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        ref={triggerRef}
        type="button"
      >
        <span className="min-w-0 truncate">{selected?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={'shrink-0 transition-transform duration-150 ' + (open ? 'rotate-180 text-[#2F6FED]' : 'text-[#667085]')}
          size={15}
        />
      </button>
      {open ? (
        <div
          aria-labelledby={id + '-label'}
          className="absolute top-[calc(100%+6px)] right-0 left-0 z-50 max-h-[280px] overflow-y-auto rounded-md border border-[#DFE7F5] bg-white p-1.5 shadow-[0_8px_24px_rgba(16,24,40,0.12)]"
          id={id + '-options'}
          onKeyDown={onListKeyDown}
          ref={listRef}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                aria-selected={isSelected}
                className={[
                  'block w-full cursor-pointer rounded border-0 px-3 py-2.5 text-left text-[13px] transition-colors duration-100',
                  'focus-visible:outline-none focus-visible:bg-[#F1F5FD]',
                  isSelected
                    ? 'bg-[#F3F6FC] font-semibold text-[#2F6FED]'
                    : 'bg-white font-normal text-[#475467] hover:bg-[#F6F8FC] hover:text-[#2F6FED]',
                ].join(' ')}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                role="option"
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
