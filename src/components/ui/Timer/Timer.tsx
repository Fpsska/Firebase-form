import React, { useState, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { setSessionTime } from 'app/slices/userSlice';

import './timer.scss';

// /. imports

const Timer: React.FC = () => {
    const { sessionTime } = useAppSelector(state => state.userSlice);

    const [timerSeconds, setTimerSeconds] = useState<string>('00');
    const [timerMinutes, setTimerMinutes] = useState<string>('00');
    const [timerHours, setTimerHours] = useState<string>('00');
    const [timerDays, setTimerDays] = useState<string>('00');

    const [isTimesActivated, setTimerActivated] = useState<boolean>(true);

    const dispatch = useAppDispatch();

    // /. hooks

    useEffect(() => {
        // session timer logic
        let timerUp: null | any = null;
        if (isTimesActivated) {
            timerUp = setInterval((): void => {
                // setInitTime(prev => prev + 10);
                dispatch(setSessionTime(sessionTime + 10));
                // increase the time value
                const days = (
                    '0' + Math.floor((sessionTime / (1000 * 60 * 60 * 24)) % 60)
                ).slice(-2);

                const hours = (
                    '0' + Math.floor((sessionTime / (1000 * 60 * 60)) % 24)
                ).slice(-2);

                const minutes = (
                    '0' + Math.floor((sessionTime / (1000 * 60)) % 60)
                ).slice(-2);

                const seconds = (
                    '0' + Math.floor((sessionTime / 1000) % 60)
                ).slice(-2);

                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }, 10);
        } else {
            clearInterval(timerUp);
        }

        return () => clearInterval(timerUp);
    }, [isTimesActivated, sessionTime]);

    useEffect(() => {
        // saving current time values in local storage
        localStorage.setItem('currentSessionTime', JSON.stringify(sessionTime));
    }, [sessionTime]);

    // /. effects

    return (
        <div className="timer">
            <span className="timer__number">{timerDays}:</span>
            {/* /. days */}
            <span className="timer__number">{timerHours}:</span>
            {/* /. hours */}
            <span className="timer__number">{timerMinutes}:</span>
            {/* /. minutes */}
            <span className="timer__number">{timerSeconds}</span>
            {/* /. seconds */}
        </div>
    );
};

export default Timer;
