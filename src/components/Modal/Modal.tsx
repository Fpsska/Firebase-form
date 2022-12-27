import React, { useEffect, useCallback, useRef, useState } from 'react';

import { IoMdClose } from 'react-icons/io';

import { useAppSelector } from '../../app/hooks';

import { coordinatesTypes } from '../../Types/modalSliceTypes';

import { useDefineModalStatus } from '../../hooks/useDefineModalStatus';

import logo from '../../assets/images/react-logo_icon.svg';

import './modal.scss';

// /. imports

interface ModalPropsTypes {
    name: string;
    title: string;
    children: any;
    status: boolean;
}

// /. interfaces

const Modal: React.FC<ModalPropsTypes> = props => {
    const { name, title, children, status } = props;

    const { modalPositions } = useAppSelector(state => state.modalSlice);

    const [position, setPosition] = useState<coordinatesTypes>(
        modalPositions.modalAuthPosition
    );
    const [isVisible, setVisibleStatus] = useState<boolean>(false);
    const [initOffsetPosition, setInitOffsetPosition] = useState<{
        offsetY: number;
        offsetX: number;
    }>({
        offsetY: 0,
        offsetX: 0
    });

    const modalRef = useRef<HTMLDivElement>(null!);

    const { handleModalCase } = useDefineModalStatus();

    // /. hooks

    const closeModal = (): void => {
        handleModalCase(name);
        setVisibleStatus(false);
    };

    // /. functions

    useEffect(() => {
        // set current status-prop like visibleStatus initial value
        setVisibleStatus(status);
    }, [status]);

    useEffect(() => {
        // set current handled modal of modalPositions state
        switch (name) {
            case 'auth-modal':
                setPosition(modalPositions.modalAuthPosition);
                break;
            case 'registr-modal':
                setPosition(modalPositions.modalRegistrPosition);
                break;
            case 'terms-modal':
                setPosition(modalPositions.modalTermsPosition);
                break;
            case 'exit-modal':
                setPosition(modalPositions.modalExitPosition);
                break;
        }
    }, [modalPositions, name]);

    useEffect(() => {
        const modalDragStart = (e: any): void => {
            setTimeout(() => {
                modalRef.current.classList.add('hidden');
            }, 0);
            setInitOffsetPosition({
                offsetY: e.offsetY,
                offsetX: e.offsetY
            });
        };

        const modalDragEnd = (e: any): void => {
            modalRef.current.classList.remove('hidden');
            modalRef.current.style.top = `${
                e.pageY - initOffsetPosition.offsetY
            }px`;
            modalRef.current.style.left = `${
                e.pageX - initOffsetPosition.offsetX
            }px`;
        };

        const areaHandler = (e: any): void => {
            if (
                isVisible &&
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                handleModalCase(name);
                setVisibleStatus(false);
            }
            // refEl.current HTML-el !== null/undefined && refEl.current.contains(e.target) === false =>
            // => valid HTML-el is exist
        };

        const keyHandler = (e: KeyboardEvent): void => {
            if (isVisible && e.code === 'Escape') {
                handleModalCase(name);
                setVisibleStatus(false);
            }
        };

        modalRef.current?.addEventListener('dragstart', modalDragStart);
        modalRef.current?.addEventListener('dragend', modalDragEnd);
        document.addEventListener('click', areaHandler, true);
        document.addEventListener('keydown', keyHandler);
        return () => {
            modalRef.current?.removeEventListener('dragstart', modalDragStart);
            modalRef.current?.removeEventListener('dragend', modalDragEnd);
            document.removeEventListener('click', areaHandler, true);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [isVisible, name]);

    // /. effects

    return (
        <div
            ref={modalRef}
            id={name}
            className={isVisible ? 'modal' : 'modal hidden'}
            draggable="true"
            style={{ top: `${position.top}%`, left: `${position.left}%` }}
            role="alert"
        >
            <div className="modal__wrapper">
                <h2 className="modal__title">{title}</h2>
                <hr />
                <div className="modal__body">{children}</div>
                <button
                    className="modal__button modal__button--close"
                    onClick={closeModal}
                    aria-label="close burger menu"
                >
                    <IoMdClose size={24} />
                </button>
                <img
                    className="modal__image"
                    src={logo}
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default Modal;
