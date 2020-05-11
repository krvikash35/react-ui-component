import React from 'react';
import { themes } from './themes';

export const ThemeContext = React.createContext(themes.light);

export const ThemeProvider: React.FC<{}> = function ThemeProvider(props) {
  return (
    <ThemeContext.Provider value={themes.light}>
      {props.children}
    </ThemeContext.Provider>
  );
};
