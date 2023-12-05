import React, { ReactNode } from 'react';

import './Modal.scss';

interface ModalProps {
    children: ReactNode;
    toggleModal: () => void;
}

const Modal = (props: ModalProps) => {
    const { children, toggleModal } = props;

    return (
        <div className='modal-overlay' onClick={toggleModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='modal-close' onClick={toggleModal}>
                    <i className='fa fa-xmark fa-xl'></i>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;