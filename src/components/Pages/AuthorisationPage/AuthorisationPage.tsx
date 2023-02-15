import React from 'react';

import { useAppSelector } from '../../../app/hooks';

import SectionMark from '../../SectionMark/SectionMark';
import Modal from '../../Modal/Modal';
import AuthForm from '../../Form/AuthForm';

// /. imports

const AuthorisationPage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { modalStatuses } = useAppSelector(state => state.modalSlice);

    // /. hooks

    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <>
                    {modalStatuses.isModalAuthVisible && (
                        <Modal
                            name={'auth-modal'}
                            title={'Authorisation modal!'}
                            status={modalStatuses.isModalAuthVisible}
                            wrapperRef={wrapperRef}
                        >
                            <>
                                Sorry, this method is temporarily unavailable
                                <br />
                                <br />
                                Stasy privet ;)
                            </>
                        </Modal>
                    )}
                </>
                <SectionMark />
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthorisationPage;
