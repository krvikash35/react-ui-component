import { useContext } from 'react';
import { ThemeContext } from './theme-provider';

export function useTheme() {
  const theme = useContext(ThemeContext);

  return { theme };
}
