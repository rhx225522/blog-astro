import { defineEcConfig } from 'astro-expressive-code';

export default defineEcConfig({
  // 亮色在前作为基础主题，暗色主题跟随站点 html[data-theme] 切换
  themes: ['github-light', 'github-dark'],
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
  styleOverrides: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: 'var(--line)',
    codeFontFamily: 'var(--font-mono)',
    codeFontSize: '0.875rem',
    codeLineHeight: '1.7',
    uiFontFamily: 'var(--font-sans)',
    uiFontSize: '0.8rem',
  },
});
