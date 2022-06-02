import { useLayoutEffect, useState } from 'react';

// /. imports

interface propTypes {
    currentTheme: string,
}

// /. interfaces

export function useTheme(props: propTypes) {

    const {
        currentTheme
    } = props;

    const [theme, setTheme] = useState<string>(currentTheme);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}


