import React, { createContext, useState, useEffect, ReactNode } from 'react';

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: (): void => {},
});

export type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('qrexel_theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('qrexel_theme', newTheme);
  };

  useEffect(() => {
    localStorage.setItem('qrexel_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document
      .getElementById('root')
      ?.classList.toggle('bg-slate-900', theme === 'dark');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
