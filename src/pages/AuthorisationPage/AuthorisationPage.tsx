import React from 'react';

import { useAppSelector } from 'app/hooks';

import SectionMark from 'components/ui/SectionMark/SectionMark';
import Modal from 'components/layout/Modal/Modal';
import AuthForm from 'components/layout/Form/AuthForm';

// /. imports

const AuthorisationPage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { modalStatuses, modalPositions } = useAppSelector(
        state => state.modalSlice
    );

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
                            position={modalPositions.modalAuthPosition}
                            wrapperRef={wrapperRef}
                        >
                            <p className="modal__text">
                                Sorry, this method is temporarily unavailable
                                <br />
                                <br />
                                Stasy privet ;)
                            </p>
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
