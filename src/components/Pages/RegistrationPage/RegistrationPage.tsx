import React from 'react';

import { useAppSelector } from '../../../app/hooks';

import SectionMark from '../../SectionMark/SectionMark';
import RegisteredForm from '../../Form/RegisteredForm';
import Modal from '../../Modal/Modal';

// /. imports

const RegistrationPage: React.FC<{ wrapperRef: any }> = ({ wrapperRef }) => {
    const { modalStatuses, modalPositions } = useAppSelector(
        state => state.modalSlice
    );

    // /. hooks

    return (
        <div className="registration">
            <div className="registration__wrapper">
                <SectionMark />
                <RegisteredForm />
                <>
                    {modalStatuses.isModalRegistrVisible && (
                        <Modal
                            name={'registr-modal'}
                            title={'Rigistration modal!'}
                            status={modalStatuses.isModalRegistrVisible}
                            position={modalPositions.modalRegistrPosition}
                            wrapperRef={wrapperRef}
                        >
                            <p className="modal__text">
                                Technical works..In progess..
                                <br />
                                <br />
                                Naaaasteeen&apos;kaa, zdravstvuuuj :3
                            </p>
                        </Modal>
                    )}
                </>
                {/* /. registration modal */}
                <>
                    {modalStatuses.isModalTermsVisible && (
                        <Modal
                            name={'terms-modal'}
                            title={'Terms modal!'}
                            status={modalStatuses.isModalTermsVisible}
                            position={modalPositions.modalTermsPosition}
                            wrapperRef={wrapperRef}
                        >
                            <div className="modal__scroll-content">
                                <p className="modal__text modal__text_scroll">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Rerum, laboriosam quod
                                    dolorem ab quisquam ipsam aliquid tempora
                                    quia aliquam at consequatur saepe iusto
                                    perferendis magni inventore, id, quam non
                                    fugit. Dsit amet consectetur adipisicing
                                    elit. Rerum, laboriosam quod dolorem ab
                                    quisquam ipsam aliquid tempora quia aliquam
                                    at consequatur saepe iusto perferendis magni
                                    inventore, id, quam non fugit.Lorem ipsum
                                    dolor sit amet consectetur adipisicing elit.
                                    Rerum, laboriosam quod dolorem ab quisquam
                                    ipsam aliquid tempora quia aliquam at
                                    consequatur saepe iusto perferendis magni
                                    inventore, id, quam non fugit. Dsit amet
                                    consectetur adipisicing elit. Rerum,
                                    laboriosam quod dolorem ab quisquam ipsam
                                    aliquid tempora quia aliquam at consequatur
                                    saepe iusto perferendis magni inventore, id,
                                    quam non fugit.
                                </p>
                            </div>
                        </Modal>
                    )}
                </>
                {/* /. terms modal */}
            </div>
        </div>
    );
};

export default RegistrationPage;
