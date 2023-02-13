import React from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
    switchCookieBannerVisibleStatus,
    switchCookieAcceptedStatus
} from '../../app/slices/cookieSlice';

import './banner.scss';

// /. imports

const Banner: React.FC = () => {
    const { isCookieBannerVisible } = useAppSelector(
        state => state.cookieSlice
    );

    const dispatch = useAppDispatch();

    // /. hooks

    const onAcceptBtnClick = (): void => {
        dispatch(switchCookieBannerVisibleStatus(false));
        dispatch(switchCookieAcceptedStatus(true));
    };

    // /. functions

    return (
        <div className={isCookieBannerVisible ? 'banner' : 'banner hide'}>
            <div className="banner__wrapper">
                <h2 className="banner__title">This site uses cookies</h2>
                <p className="banner__description">
                    Some of them are essential to enhance you the best browser
                    experience.{' '}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn more
                    </a>
                </p>
                <button
                    className="banner__button-accept"
                    onClick={onAcceptBtnClick}
                >
                    got it
                </button>
                <button
                    className="banner__button-close"
                    aria-label="hide cookie notice"
                    onClick={() =>
                        dispatch(switchCookieBannerVisibleStatus(false))
                    }
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 6L6 18"
                            stroke=""
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M6 6L18 18"
                            stroke=""
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Banner;
