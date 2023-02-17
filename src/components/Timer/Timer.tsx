import React, { useState, useEffect } from 'react';

import './timer.scss';

// /. imports

const Timer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isTimesActivated, setTimerActivated] = useState<boolean>(true);

    // /. hooks

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => prev + 10);
        }, 10);
        return () => clearInterval(timer);
    }, [isTimesActivated]);

    // /. effects

    return (
        <div className="timer">
            <span className="timer__number">
                {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="timer__number">
                {('0' + Math.floor((time / 1000) % 60)).slice(-2)}:
            </span>
            <span className="timer__number">
                {('0' + ((time / 10) % 100)).slice(-2)}
            </span>
        </div>
    );
};

export default Timer;
