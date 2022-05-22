import React, { useEffect, useCallback, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../../app/store';

import { switchModalAuthVisibleStatus, switchModalRegistrVisibleStatus } from '../../app/slices/mainSlice';

import logo from '../../assets/images/react-logo_icon.svg';


import './modal.scss';

// /. imports

interface ModalPropsTypes {
    title: string,
    children: any,
    visibleStatus: boolean,
}

// /. interfaces

const Modal: React.FC<ModalPropsTypes> = (props) => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null!);

    const {
        title,
        children,
        visibleStatus
    } = props;

    const areaHandler = useCallback((e: any): void => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            dispatch(switchModalAuthVisibleStatus(false));
            dispatch(switchModalRegistrVisibleStatus(false));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', areaHandler, true);
        return () => {
            document.removeEventListener('click', areaHandler, true);
        };
    }, [areaHandler]);

    const modalButtonHandler = (): void => {
        isAuthorisationPage ? dispatch(switchModalAuthVisibleStatus(false)) : dispatch(switchModalRegistrVisibleStatus(false));
    };
    // 
    return (
        <div className={visibleStatus ? 'modal' : 'modal hidden'} ref={modalRef}>
            <div className="modal__wrapper">
                <h2 className="modal__title">{title}</h2>
                <hr />
                <div className="modal__body">
                    {children}
                </div>
                <button className="modal__button" onClick={modalButtonHandler}>
                    <IoMdClose size={24} />
                </button>
                <img className="modal__image" src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default Modal;