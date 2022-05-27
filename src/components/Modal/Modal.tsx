import React, { useEffect, useCallback, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../../app/store';

import { coordinatesTypes } from '../../Types/modalSliceTypes';

import { useDefineModal } from '../../hooks/defineModal';

import logo from '../../assets/images/react-logo_icon.svg';

import './modal.scss';

// /. imports

interface ModalPropsTypes {
    name: string,
    title: string,
    children: any,
    status: boolean,
}

// /. interfaces

const Modal: React.FC<ModalPropsTypes> = (props) => {

    const { isAuthorisationPage } = useSelector((state: RootState) => state.mainSlice);
    const { modalPositions } = useSelector((state: RootState) => state.modalSlice);
    const [modalPosition, setModalPosition] = useState<coordinatesTypes>(modalPositions.modalAuthPosition);
    const [visibleStatus, setVisibleStatus] = useState<boolean>(false);
    const [initOffsetPosition, setInitOffsetPosition] = useState<{ offsetY: number, offsetX: number }>({
        offsetY: 0,
        offsetX: 0
    });

    const modalRef = useRef<HTMLDivElement>(null!);
    const { handleModalName } = useDefineModal();

    const {
        name,
        title,
        children,
        status
    } = props;

    useEffect(() => {  // set current status-prop like visibleStatus initial value
        setVisibleStatus(status);
    }, [status]);

    useEffect(() => { // set current handled modal of modalPositions state
        isAuthorisationPage
            ? setModalPosition(modalPositions.modalAuthPosition)
            : setModalPosition(modalPositions.modalRegistrPosition);
    }, [isAuthorisationPage, modalPositions]);

    const areaHandler = useCallback((e: any): void => {
        const validModalArea = e.target === modalRef.current || modalRef.current.contains(e.target);
        const validElements = e.target.className === 'button' || e.target.className === 'button__icon' || e.target.className === 'button__text';

        if (!validModalArea && !validElements) {
            handleModalName(name);
            setVisibleStatus(false);
        }
    }, [name]);

    const keyHandler = useCallback((e: KeyboardEvent): void => {
        if (visibleStatus && e.code === 'Escape') {
            handleModalName(name);
            setVisibleStatus(false);
        }
    }, [name, visibleStatus]);

    useEffect(() => {
        document.addEventListener('click', areaHandler, true);
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('click', areaHandler, true);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [areaHandler, keyHandler]);

    const modalButtonHandler = (): void => {
        handleModalName(name);
        setVisibleStatus(false);
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
            id={name}
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