import React, { useState, useEffect } from 'react';

import { useTheme } from '../../hooks/useTheme';

import './theme.scss';

// /. imports

const Theme: React.FC = () => {

  const [isActive, setActiveStatus] = useState<boolean>(false);
  const { theme, setTheme } = useTheme({ currentTheme: 'default' });

  useEffect(() => {
    isActive ? setTheme('minimalism') : setTheme('default')
  }, [isActive])

  return (
    <div className={isActive ? 'theme active' : 'theme'} onClick={() => setActiveStatus(!isActive)}>
      <span className="theme__indicator"></span>
    </div>
  );
};

export default Theme;