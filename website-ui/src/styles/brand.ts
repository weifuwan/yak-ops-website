import type { ThemeConfig } from 'antd';
import type { CSSProperties } from 'react';

export const BRAND_COLOR = 'rgba(254,44,85,1)';
export const BRAND_COLOR_HOVER = 'rgba(254,44,85,0.88)';
export const BRAND_COLOR_ACTIVE = BRAND_COLOR;
export const BRAND_COLOR_SOFT = 'rgba(254,44,85,0.06)';
export const BRAND_COLOR_SOFT_HOVER = 'rgba(254,44,85,0.1)';
export const BRAND_COLOR_BORDER = 'rgba(254,44,85,0.35)';
export const BRAND_COLOR_OUTLINE = 'rgba(254,44,85,0.16)';

export const BRAND_CSS_VARIABLES = {
  '--yak-brand-color': BRAND_COLOR,
  '--yak-brand-color-hover': BRAND_COLOR_HOVER,
  '--yak-brand-color-soft': BRAND_COLOR_SOFT,
  '--yak-brand-color-soft-hover': BRAND_COLOR_SOFT_HOVER,
  '--yak-brand-color-border': BRAND_COLOR_BORDER,
  '--yak-brand-color-outline': BRAND_COLOR_OUTLINE,
} as CSSProperties;

export const BRAND_THEME: ThemeConfig = {
  token: {
    colorPrimary: BRAND_COLOR,
    colorPrimaryHover: BRAND_COLOR_HOVER,
    colorPrimaryActive: BRAND_COLOR_ACTIVE,
    colorPrimaryBg: BRAND_COLOR_SOFT,
    colorPrimaryBgHover: BRAND_COLOR_SOFT_HOVER,
    colorPrimaryBorder: BRAND_COLOR_BORDER,
    controlOutline: BRAND_COLOR_OUTLINE,
  },
};
