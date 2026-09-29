import type { KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { HOME_EASE } from '../../constants';
import type { HomeUseCaseDefinition, HomeUseCaseId } from './types';

interface HomeUseCasesTabsProps {
  activeId: HomeUseCaseId;
  useCases: HomeUseCaseDefinition[];
  onChange: (id: HomeUseCaseId) => void;
}

export default function HomeUseCasesTabs({ activeId, useCases, onChange }: HomeUseCasesTabsProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const nextIndex = (currentIndex + direction + useCases.length) % useCases.length;
    const nextUseCase = useCases[nextIndex];

    onChange(nextUseCase.id);
    window.requestAnimationFrame(() => {
      document.getElementById(`home-use-case-tab-${nextUseCase.id}`)?.focus();
    });
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, ease: HOME_EASE }}
      className="overflow-x-auto pb-2 lg:col-start-2 lg:col-end-12"
    >
      <div
        role="tablist"
        aria-label="Yak Ops use cases"
        className="flex w-max items-center rounded-2xl bg-[#F5F4ED] p-1"
      >
        {useCases.map((item, index) => {
          const active = item.id === activeId;
          const Icon = item.Icon;

          return (
            <button
              key={item.id}
              id={`home-use-case-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`home-use-case-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`flex h-10 shrink-0 appearance-none items-center justify-center gap-2 rounded-xl border-0 py-2 pl-3 pr-4 text-[12px] font-normal transition-[background-color,color] duration-200 [font-family:'Yak_Sans',Arial,sans-serif] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C96442] ${
                active ? 'bg-white text-[#141413]' : 'bg-transparent text-[#5E5D59] hover:bg-white hover:text-[#141413]'
              }`}
            >
              <Icon />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
