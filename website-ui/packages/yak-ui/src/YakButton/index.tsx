import { Button, type ButtonProps } from 'antd';
import './index.css';

export type YakButtonProps = ButtonProps & {
  iconOnly?: boolean;
  effect?: 'default' | 'glass';
};

export default function YakButton({ className, iconOnly = false, effect = 'default', ...props }: YakButtonProps) {
  return (
    <Button
      {...props}
      className={[
        'yak-button',
        iconOnly ? 'yak-button--icon-only' : '',
        effect === 'glass' ? 'yak-button--glass' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
