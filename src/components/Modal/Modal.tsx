import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IoMdClose } from 'react-icons/io';

import { RootState } from '../../app/store';

import { switchModalVisibleStatus } from '../../app/slices/mainSlice';

import logo from '../../assets/images/react-logo_icon.svg';

import './modal.scss';

// /. imports

interface ModalPropsTypes {
    children: any
}

// /. interfaces

const Modal: React.FC<ModalPropsTypes> = (props) => {

    const { isModalVisible } = useSelector((state: RootState) => state.mainSlice);
    const dispatch = useDispatch();

    const {
        children
    } = props;

    return (
        <div className={isModalVisible ? 'modal' : 'modal hidden'}>
            <div className="modal__wrapper">
                <h2 className="modal__title">This is modal</h2>
                <hr />
                <div className="modal__body">
                    {children}
                </div>
                <button className="modal__button" onClick={() => dispatch(switchModalVisibleStatus(!isModalVisible))}>
                    <IoMdClose size={24} />
                </button>
                <img className="modal__image" src={logo} alt="logo" />
            </div>
        </div>
    );
};

export default Modal;