import React, { useState, useEffect } from 'react';

import { useTheme } from 'hooks/useTheme';

import './theme.scss';

// /. imports

const ThemeButton: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isActive, setActiveStatus] = useState<boolean>(
        theme === 'default' ? false : true
    );

    // /. hooks

    const themeHandler = (): void => {
        setActiveStatus(!isActive);
    };

    // /. functions

    useEffect(() => {
        isActive ? setTheme('minimalism') : setTheme('default');
    }, [isActive]);

    // /. effects

    return (
        <button
            className={isActive ? 'theme active' : 'theme'}
            type="button"
            aria-label={
                isActive
                    ? 'change theme to default'
                    : 'change theme to minimalism'
            }
            onClick={themeHandler}
        >
            <span className="theme__indicator"></span>
        </button>
    );
};

export default ThemeButton;
