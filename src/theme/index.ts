import { useStorage } from '@vueuse/core';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export const currentTheme = useStorage<Theme>('theme', Theme.LIGHT);

document.querySelector('html')?.setAttribute('class', currentTheme.value);

export const changeTheme = (theme: Theme) => {
  document.querySelector('html')?.setAttribute('class', theme);
  currentTheme.value = theme;
};
