import React, { useEffect, useCallback, useRef, useState } from 'react';

import { IoMdClose } from 'react-icons/io';

import { useAppDispatch } from '../../app/hooks';

import {
    switchModalVisibleStatus,
    setModalSize
} from '../../app/slices/modalSlice';

import { coordinatesTypes } from '../../Types/modalSliceTypes';

import logo from '../../assets/images/react-logo_icon.svg';

import './modal.scss';

// /. imports

interface propTypes {
    name: string;
    title: string;
    children: string | JSX.Element;
    status: boolean;
    position: coordinatesTypes;
    wrapperRef: any;
}

// /. interfaces

const Modal: React.FC<propTypes> = props => {
    const { name, title, children, status, position, wrapperRef } = props;

    const [isClicked, setClikedStatus] = useState<boolean>(false);

    const [isVisible, setVisibleStatus] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null!);

    const dispatch = useAppDispatch();

    const coords = useRef<{ [key: string]: number }>({
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0
    });

    // /. hooks

    const closeModal = useCallback((): void => {
        dispatch(
            switchModalVisibleStatus({
                name,
                status: false
            })
        );
    }, [name]);

    // /. functions

    useEffect(() => {
        // get random position of modal
        if (!modalRef.current) return;

        modalRef.current.style.top = `${position.top}px`;
        modalRef.current.style.left = `${position.left}px`;
    }, [position]);

    useEffect(() => {
        // logic of dragging modal
        if (!modalRef.current || !wrapperRef) return;

        const modal = modalRef.current;
        const wrapper = wrapperRef.current;

        const onModalMouseDown = (e: MouseEvent): void => {
            setClikedStatus(true);
            coords.current.startX = e.clientX;
            coords.current.startY = e.clientY;
        };

        const onModalMouseUp = (): void => {
            setClikedStatus(false);
            coords.current.lastX = modal.offsetLeft;
            coords.current.lastY = modal.offsetTop;
        };

        const onWrapperMouseMove = (e: MouseEvent): void => {
            if (!isClicked) return;

            const nextX =
                e.clientX - coords.current.startX + coords.current.lastX;

            const nextY =
                e.clientY - coords.current.startY + coords.current.lastY;

            modal.style.top = `${nextY}px`;
            modal.style.left = `${nextX}px`;
        };

        modal.addEventListener('mousedown', onModalMouseDown);
        modal.addEventListener('mouseup', onModalMouseUp);
        wrapper.addEventListener('mousemove', onWrapperMouseMove);

        return () => {
            modal.removeEventListener('mousedown', onModalMouseDown);
            modal.addEventListener('mouseup', onModalMouseUp);
            wrapper.removeEventListener('mousemove', onWrapperMouseMove);
        };
    }, [wrapperRef, isClicked]);

    useEffect(() => {
        // update isVisible status by every changes of status-prop
        setVisibleStatus(status);
    }, [status]);

    useEffect(() => {
        // handle of hiding modal HTML-el
        const areaHandler = (e: any): void => {
            const isValidCondition =
                isVisible &&
                modalRef.current &&
                !modalRef.current.contains(e.target);

            if (isValidCondition) {
                setVisibleStatus(false);
                closeModal();
            }
        };

        const keyHandler = (e: KeyboardEvent): void => {
            if (isVisible && e.code === 'Escape') {
                setVisibleStatus(false);
                closeModal();
            }
        };

        document.addEventListener('click', areaHandler, true);
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('click', areaHandler, true);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [isVisible, name, closeModal]);

    useEffect(() => {
        // set new modalSize value
        if (isVisible) {
            const { width, height } = modalRef.current.getBoundingClientRect();
            dispatch(setModalSize({ width, height }));
        }
    }, [isVisible]);

    // /. effects

    return (
        <div
            ref={modalRef}
            role="alert"
            className={!isClicked ? 'modal' : 'modal hidden'}
            // style={{
            //     left: `${position.left}px`,
            //     top: `${position.top}px`
            // }}
        >
            <div className="modal__wrapper">
                <h2 className="modal__title">{title}</h2>
                <hr />
                <div className="modal__body">{children}</div>
                <button
                    className="modal__button modal__button--close"
                    onClick={closeModal}
                    aria-label={`${isVisible ? 'close' : 'open'} modal`}
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
