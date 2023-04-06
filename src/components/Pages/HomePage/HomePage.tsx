import React from 'react';

import { Navigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import {
    deleteCurrentUser,
    switchUserAuthoriseStatus
} from '../../../app/slices/userSlice';

import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../../app/slices/modalSlice';

import { generateElPosition } from '../../../helpers/generateElPosition';

import Modal from '../../Modal/Modal';
import Timer from '../../Timer/Timer';

import './homePage.scss';

// /. imports

const HomePage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { currentEmail, lastSignInTime, isUserAuthorise } = useAppSelector(
        state => state.userSlice
    );

    const { modalStatuses, modalPositions, modalSize } = useAppSelector(
        state => state.modalSlice
    );

    const dispatch = useAppDispatch();

    // /. hooks

    const logOutHandler = (): void => {
        dispatch(
            switchModalVisibleStatus({
                name: 'exit-modal',
                status: true
            })
        );

        const { elTopPos, elLeftPos } = generateElPosition(
            modalSize.width,
            modalSize.height
        );
        dispatch(
            setNewModalPosition({
                name: 'exit-modal',
                coordinates: { top: elTopPos, left: elLeftPos }
            })
        );
    };

    const acceptHandler = (): void => {
        dispatch(deleteCurrentUser());

        dispatch(switchUserAuthoriseStatus(false));
        localStorage.setItem('isUserAuthStatus', JSON.stringify(false));

        dispatch(
            switchModalVisibleStatus({ name: 'exit-modal', status: false })
        );
    };

    const cancelHandler = (): void => {
        dispatch(
            switchModalVisibleStatus({ name: 'exit-modal', status: false })
        );
    };

    // /. functions

    return isUserAuthorise ? (
        <div className="home">
            <div className="home__wrapper">
                <ul className="home__user-data user-data">
                    <li className="user-data__template">
                        lastSignInTime:{' '}
                        <span className="user-data__info">
                            {lastSignInTime}
                        </span>
                    </li>
                    <li className="user-data__template user-data__template_timer">
                        <span>currentSessionTime:</span> <Timer />
                    </li>
                    <li className="user-data__template">
                        email:{' '}
                        <span className="user-data__info">{currentEmail}</span>
                    </li>
                </ul>
                <button
                    className="home__button"
                    onClick={logOutHandler}
                >
                    Log out from {currentEmail}
                </button>
                <>
                    {modalStatuses.isModalExitVisible && (
                        <Modal
                            name={'exit-modal'}
                            title={'Exit modal!'}
                            status={modalStatuses.isModalExitVisible}
                            position={modalPositions.modalExitPosition}
                            wrapperRef={wrapperRef}
                        >
                            <>
                                <p className="modal__text">
                                    Are you sure to want exit?
                                </p>
                                <div className="modal__controls">
                                    <button
                                        className="modal__button modal__button--accept"
                                        onClick={acceptHandler}
                                    >
                                        Ok
                                    </button>
                                    <button
                                        className="modal__button modal__button--cancel"
                                        onClick={cancelHandler}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        </Modal>
                    )}
                </>
            </div>
        </div>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    );
};

export default HomePage;
