import React, { useEffect, useCallback, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../../app/store';

import {
    switchModalAuthVisibleStatus,
    switchModalRegistrVisibleStatus,
    switchModalTermsVisibleStatus
} from '../../app/slices/mainSlice';

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
    const [initOffsetPosition, setInitOffsetPosition] = useState<any>({
        offsetY: 0,
        offsetX: 0
    });

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
            dispatch(switchModalTermsVisibleStatus(false));
        }
    }, []);

    const keyHandler = useCallback((e: KeyboardEvent): void => {
        if (e.code === 'Escape') {
            dispatch(switchModalAuthVisibleStatus(false));
            dispatch(switchModalRegistrVisibleStatus(false));
            dispatch(switchModalTermsVisibleStatus(false));
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
        dispatch(switchModalAuthVisibleStatus(false));
        dispatch(switchModalRegistrVisibleStatus(false));
        dispatch(switchModalTermsVisibleStatus(false));
    };

    const modalDragStart = (e: any): void => {
        setTimeout(() => {
            modalRef.current.classList.add('hidden');
        }, 0);
        setInitOffsetPosition({
            offsetY: e.offsetY,
            offsetX: e.offsetY
        });
    };

    const modalDragEnd = useCallback((e: any): void => {
        modalRef.current.classList.remove('hidden');
        modalRef.current.style.top = `${e.pageY - initOffsetPosition.offsetY}px`;
        modalRef.current.style.left = `${e.pageX - initOffsetPosition.offsetX}px`;
    }, []);


    useEffect(() => {
        modalRef.current.addEventListener('dragstart', modalDragStart);
        modalRef.current.addEventListener('dragend', modalDragEnd);
        return () => {
            modalRef.current?.removeEventListener('dragstart', modalDragStart);
            modalRef.current?.removeEventListener('dragend', modalDragEnd);
        };
    }, [modalDragEnd]);
    // 
    return (
        <div
            ref={modalRef}
            className={visibleStatus ? 'modal' : 'modal hidden'}
            draggable="true"
            style={{ top: `${modalPosition.top}%`, left: `${modalPosition.left}%` }}
        >
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