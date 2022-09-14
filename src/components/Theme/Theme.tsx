import React, { useState, useEffect } from 'react';

import { useTheme } from '../../hooks/useTheme';

import './theme.scss';

// /. imports

const Theme: React.FC = () => {

  const { theme, setTheme } = useTheme();
  const [isActive, setActiveStatus] = useState<boolean>(theme === 'default' ? false : true);

  useEffect(() => {
    isActive ? setTheme('minimalism') : setTheme('default');
  }, [isActive]);

  const themeHandler = (): void => {
    setActiveStatus(!isActive);
  };

  return (
    <button className={isActive ? 'theme active' : 'theme'} onClick={themeHandler} aria-label="change theme color">
      <span className="theme__indicator"></span>
    </button>
  );
};

export default Theme;