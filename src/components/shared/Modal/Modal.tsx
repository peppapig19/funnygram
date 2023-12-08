import React, {
    ReactNode
} from 'react';

import './Modal.scss';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    toggleModal: () => void;
}

const Modal = (props: ModalProps) => {
    const { children, isOpen, toggleModal } = props;

    if (!isOpen) {
        return null;
    }

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