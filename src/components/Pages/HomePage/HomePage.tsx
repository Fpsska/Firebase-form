import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Navigate } from 'react-router';

import { RootState } from '../../../app/store';

import {
    deleteCurrentUser,
    switchUserAuthoriseStatus
} from '../../../app/slices/userSlice';
import {
    switchAuthorisationPageStatus,
    switchHomePageStatus
} from '../../../app/slices/mainSlice';
import {
    switchModalVisibleStatus,
    setNewModalPosition
} from '../../../app/slices/modalSlice';

import Modal from '../../Modal/Modal';

import './homePage.scss';

// /. imports  

const HomePage: React.FC = () => {

    const { currentEmail, isUserAuthorise, lastSignInTime } = useSelector((state: RootState) => state.userSlice);
    const { modalStatus } = useSelector((state: RootState) => state.modalSlice);
    const dispatch = useDispatch();

    const logOutHandler = (): void => {
        dispatch(switchModalVisibleStatus({ name: 'exit-modal', status: !modalStatus.isModalExitVisible }));
        dispatch(setNewModalPosition(
            {
                name: 'exit-modal',
                coordinates: { top: 15, left: 20 }
            }
        ));
    };

    const acceptHandler = (): void => {
        dispatch(deleteCurrentUser());
        dispatch(switchAuthorisationPageStatus(true));
        dispatch(switchUserAuthoriseStatus(false));
        dispatch(switchHomePageStatus(false));
    };

    const candelHandler = (): void => {
        dispatch(switchModalVisibleStatus({ name: 'exit-modal', status: false }));
    };
    // 
    return isUserAuthorise ? (
        <div className="home">
            <div className="home__wrapper">
                <ul className="home__user-data user-data">
                    <li className="user-data__template">lastSignInTime: <span className="user-data__info">{lastSignInTime}</span></li>
                    <li className="user-data__template">email: <span className="user-data__info">{currentEmail}</span></li>
                </ul>
                <button className="home__button" onClick={logOutHandler}>Log out from {currentEmail}</button>
                <Modal
                    name={'exit-modal'}
                    title={'Exit modal!'}
                    status={modalStatus.isModalExitVisible}
                >
                    <p className="modal__text">Are you sure to want exit?</p>
                    <div className="modal__controls">
                        <button className="modal__button modal__button--accept" onClick={acceptHandler}>Ok</button>
                        <button className="modal__button modal__button--cancel" onClick={candelHandler}>Cancel</button>
                    </div>
                </Modal>
            </div>
        </div>
    ) : (
        <Navigate to="/Authorisation-Form" />
    );
};

export default HomePage;

