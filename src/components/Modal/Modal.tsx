import React, { useEffect, useCallback, useRef, useState } from 'react';

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

    const { isAuthorisationPage, modalAuthPosition, modalRegistrPosition } = useSelector((state: RootState) => state.mainSlice);
    const [modalPosition, setModalPosition] = useState<any>(modalAuthPosition);

    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null!);

    const {
        title,
        children,
        visibleStatus
    } = props;

    const areaHandler = useCallback((e: any): void => {
        const validModalArea = e.target === modalRef.current || modalRef.current.contains(e.target);
        const validElements = e.target.className === 'button';

        if (!validModalArea && !validElements) {
            dispatch(switchModalAuthVisibleStatus(false));
            dispatch(switchModalRegistrVisibleStatus(false));
        }
    }, []);

    const keyHandler = useCallback((e: KeyboardEvent): void => {
        if (e.code === 'Escape') {
            dispatch(switchModalAuthVisibleStatus(false));
            dispatch(switchModalRegistrVisibleStatus(false));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', areaHandler, true);
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('click', areaHandler, true);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [areaHandler, keyHandler]);

    useEffect(() => {
        isAuthorisationPage ? setModalPosition(modalAuthPosition) : setModalPosition(modalRegistrPosition);
    }, [isAuthorisationPage, modalAuthPosition, modalRegistrPosition]);

    const modalButtonHandler = (): void => {
        isAuthorisationPage ? dispatch(switchModalAuthVisibleStatus(false)) : dispatch(switchModalRegistrVisibleStatus(false));
    };
    // 
    return (
        <div
            ref={modalRef}
            className={visibleStatus ? 'modal' : 'modal hidden'}
            style={{ top: `${modalPosition.top}%`, left: `${modalPosition.left}%` }}>
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