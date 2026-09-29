import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { isValidElement, type ReactNode } from 'react';

import { cn } from '../cn';
import './index.css';

export interface YakTabItem {
  children?: ReactNode;
  disabled?: boolean;
  forceRender?: boolean;
  key: string;
  label: ReactNode;
}

export type YakTabExtraContent =
  | ReactNode
  | {
      left?: ReactNode;
      right?: ReactNode;
    };

export interface YakTabProps {
  activeKey?: string;
  animated?: boolean | { inkBar?: boolean; tabPane?: boolean };
  centered?: boolean;
  className?: string;
  defaultActiveKey?: string;
  destroyInactiveTabPane?: boolean;
  items?: YakTabItem[];
  onChange?: (activeKey: string) => void;
  size?: 'small' | 'middle' | 'large';
  tabBarExtraContent?: YakTabExtraContent;
  tabBarGutter?: number;
}

const splitExtraContent = (extra: YakTabExtraContent | undefined) => {
  if (
    extra &&
    typeof extra === 'object' &&
    !Array.isArray(extra) &&
    !isValidElement(extra) &&
    ('left' in extra || 'right' in extra)
  ) {
    return extra as { left?: ReactNode; right?: ReactNode };
  }

  return { right: extra as ReactNode };
};

/**
 * Website tabs backed by Base UI.
 *
 * The compatibility props intentionally mirror the subset of AntD Tabs that
 * the website already uses, while keeping Base UI ownership inside Yak UI.
 */
export default function YakTab({
  activeKey,
  centered = false,
  className,
  defaultActiveKey,
  items = [],
  onChange,
  size = 'middle',
  tabBarExtraContent,
  tabBarGutter,
}: YakTabProps) {
  const extra = splitExtraContent(tabBarExtraContent);

  return (
    <BaseTabs.Root
      className={cn('yak-tabs', `yak-tabs--${size}`, centered && 'yak-tabs--centered', className)}
      value={activeKey}
      defaultValue={defaultActiveKey ?? items[0]?.key}
      onValueChange={(value) => onChange?.(String(value))}
    >
      <div className="yak-tabs__nav">
        {extra.left ? <div className="yak-tabs__extra yak-tabs__extra--left">{extra.left}</div> : null}
        <BaseTabs.List
          className="yak-tabs__list"
          style={tabBarGutter === undefined ? undefined : { gap: tabBarGutter }}
        >
          {items.map((item) => (
            <BaseTabs.Tab className="yak-tabs__tab" disabled={item.disabled} key={item.key} value={item.key}>
              {item.label}
            </BaseTabs.Tab>
          ))}
        </BaseTabs.List>
        {extra.right ? <div className="yak-tabs__extra yak-tabs__extra--right">{extra.right}</div> : null}
      </div>

      {items.map((item) => (
        <BaseTabs.Panel className="yak-tabs__panel" key={item.key} value={item.key}>
          {item.children}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
