import type { Button as BaseButtonNS } from '@base-ui/react/button';
import { Button as BaseButton } from '@base-ui/react/button';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../cn';
import './index.css';

export type YakButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
export type YakButtonSize = 'small' | 'middle' | 'large';

export type YakButtonProps = Omit<BaseButtonNS.Props, 'children' | 'className' | 'disabled' | 'render' | 'type'> & {
  block?: boolean;
  children?: ReactNode;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  effect?: 'default' | 'glass';
  href?: string;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: ReactNode;
  iconOnly?: boolean;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  rel?: string;
  size?: YakButtonSize;
  target?: string;
  type?: YakButtonType;
};

export default function YakButton({
  block = false,
  children,
  className,
  danger = false,
  disabled = false,
  effect = 'default',
  href,
  htmlType = 'button',
  icon,
  iconOnly = false,
  iconPosition = 'start',
  loading = false,
  rel,
  size = 'middle',
  target,
  type = 'default',
  ...props
}: YakButtonProps) {
  const resolvedType = danger ? (type === 'primary' ? 'danger-primary' : 'danger') : type;
  const iconNode = loading ? <span aria-hidden="true" className="yak-button__spinner" /> : icon;

  return (
    <BaseButton
      {...props}
      render={href ? <a href={href} rel={rel} target={target} /> : undefined}
      type={href ? undefined : htmlType}
      disabled={disabled || loading}
      focusableWhenDisabled={loading}
      aria-busy={loading || undefined}
      className={cn(
        'yak-button',
        `yak-button--${resolvedType}`,
        `yak-button--${size}`,
        iconOnly && 'yak-button--icon-only',
        block && 'yak-button--block',
        effect === 'glass' && 'yak-button--glass',
        className,
      )}
    >
      {iconNode && iconPosition === 'start' ? <span className="yak-button__icon">{iconNode}</span> : null}
      {children}
      {iconNode && iconPosition === 'end' ? <span className="yak-button__icon">{iconNode}</span> : null}
    </BaseButton>
  );
}
