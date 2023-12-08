import React, {
    useState
} from 'react';

import Modal from '../../shared/Modal/Modal';
import AnecdoteForm from '../AnecdoteForm/AnecdoteForm';

import './OpenAnecdoteForm.scss';

const OpenAnecdoteForm = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleModal = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            <button onClick={toggleModal}>Добавить свой</button>
            <Modal isOpen={isOpen} toggleModal={toggleModal}>
                <AnecdoteForm onSubmit={toggleModal} />
            </Modal>
        </>
    );
}

export default OpenAnecdoteForm;