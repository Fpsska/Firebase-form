import { useLayoutEffect, useState } from 'react';

// /. imports

const isOChasDarkTheme = window?.matchMedia(
    '(prefers-color-scheme: dark)'
).matches;
const defaultTheme = isOChasDarkTheme ? 'minimalism' : 'default';

const defineInitThemeValue = (): string => {
    return localStorage.getItem('app-theme') || defaultTheme;
};

export function useTheme() {
    const [theme, setTheme] = useState<string>(() => defineInitThemeValue());

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
