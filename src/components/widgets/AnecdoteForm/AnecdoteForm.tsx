import React, {
    useState,
    ChangeEvent,
    MouseEvent
} from 'react';

import Loader from '../../shared/Loader/Loader';
import FormSelect from '../../shared/FormSelect/FormSelect';
import Message from '../../shared/Message/Message';

import { useNavContext } from '../../../context/NavContext';
import AnecdoteFormData from './AnecdoteFormData';
import FormSelectOptionType from '../../shared/FormSelect/FormSelectOptionType';

import useGenres from '../../../hooks/useGenres';
import useUserPosts from '../../../hooks/useUserPosts';

import './AnecdoteForm.scss';

interface AnecdoteFormProps {
    onSubmit: () => void;
}

const AnecdoteForm = (props: AnecdoteFormProps) => {
    const { onSubmit } = props;

    const { selectedGenreId } = useNavContext();

    const [formData, setFormData] = useState<AnecdoteFormData>({
        title: '',
        text: '',
        genre: selectedGenreId,
    });
    const [message, setMessage] = useState<string>('');

    const { genres, isLoading } = useGenres();
    const { createUserPost } = useUserPosts();

    const genreOptions: FormSelectOptionType[] = genres.map(genre => ({
        value: genre.guid,
        text: genre.name
    }));

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onGenreSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedGenreId = e.target.value;
        setFormData(prev => ({
            ...prev,
            genre: selectedGenreId
        }));
    };

    const submit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.text || !formData.genre) {
            setMessage('Пожалуйста, заполните все поля.');
            return;
        }
        createUserPost({
            ...formData,
            guid: new Date().toString(),
            isFavorite: false
        });
        onSubmit();
    };

    return (
        <>
            <h2 className='anecdote-form-header'>Добавить анекдот</h2>
            {isLoading ? <Loader /> :
                <form className='anecdote-form'>
                    <input name='title' placeholder='Заголовок' onChange={onInputChange} />
                    <textarea name='text' rows={10} onChange={onInputChange} />
                    <FormSelect options={genreOptions}
                        selectedValue={formData.genre} defaultOptionText='Жанр' keygen='form_genre_'
                        onSelect={onGenreSelect} />
                    <button onClick={submit}>Добавить</button>
                    <Message text={message} />
                </form>
            }
        </>
    );
}

export default AnecdoteForm;