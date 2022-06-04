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
    <div className={isActive ? 'theme active' : 'theme'} onClick={themeHandler}>
      <span className="theme__indicator"></span>
    </div>
  );
};

export default Theme;