import type { ThemeConfig } from 'antd';
import type { CSSProperties } from 'react';

/**
 * Yak Ops brand
 *
 * Warm terracotta / burnt orange.
 * Works well with the marketing palette:
 * #FAF9F5 / #F0EEE6 / #181817
 */
export const BRAND_COLOR = '#C96442';

/**
 * Hover should feel slightly brighter,
 * rather than becoming transparent.
 */
export const BRAND_COLOR_HOVER = '#D47454';

/**
 * Active / pressed state.
 */
export const BRAND_COLOR_ACTIVE = '#A95235';

/**
 * Light surfaces.
 */
export const BRAND_COLOR_SOFT = 'rgba(201, 100, 66, 0.07)';

export const BRAND_COLOR_SOFT_HOVER = 'rgba(201, 100, 66, 0.11)';

/**
 * Borders / focus.
 */
export const BRAND_COLOR_BORDER = 'rgba(201, 100, 66, 0.32)';

export const BRAND_COLOR_OUTLINE = 'rgba(201, 100, 66, 0.18)';

export const BRAND_CSS_VARIABLES = {
  '--yak-brand-color': BRAND_COLOR,
  '--yak-brand-color-hover': BRAND_COLOR_HOVER,
  '--yak-brand-color-active': BRAND_COLOR_ACTIVE,
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
