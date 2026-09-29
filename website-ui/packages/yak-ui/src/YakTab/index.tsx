import { Tabs, type TabsProps } from 'antd';
import './index.css';

export type YakTabProps = TabsProps;

/**
 * Yak Ops unified tabs.
 *
 * Mirrors the shared Yak Ops tab API and visual language while defaulting to
 * non-animated switching for the website experience.
 */
export default function YakTab({ className, animated = false, ...props }: YakTabProps) {
  return (
    <Tabs
      {...props}
      animated={animated}
      className={['yak-tabs', className].filter(Boolean).join(' ')}
    />
  );
}
