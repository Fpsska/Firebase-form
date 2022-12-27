import { useLayoutEffect, useState } from 'react';

// /. imports

const isOChasDarkTheme = window?.matchMedia(
    '(prefers-color-scheme: dark)'
).matches;
const defaultTheme = isOChasDarkTheme ? 'minimalism' : 'default';

export function useTheme() {
    const [theme, setTheme] = useState<any>(
        localStorage.getItem('app-theme') || defaultTheme
    );

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
