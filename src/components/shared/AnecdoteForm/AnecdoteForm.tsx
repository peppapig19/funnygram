import React, {
    useState,
    useEffect
} from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../widgets/Loader/Loader';

import Data, { Category } from '../../../context/Data';

import './AnecdoteForm.scss';

const data = new Data();

const AnecdoteForm = () => {
    const { categorySlug } = useParams<string>();

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        data.loadCategoriesAsync().then(res => {
            setCategories(res);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <h2 className='anecdote-form-header'>Добавить анекдот</h2>
            {isLoading ? <Loader /> :
                <form className='anecdote-form'>
                    <input name='title' placeholder='Заголовок' />
                    <textarea name='body' rows={10} />
                    <select className='category-select' value={categorySlug}>
                        <option key='create_default' value=''>Категория</option>
                        {categories.map(category =>
                            <option key={'create_' + category.slug} value={category.slug}>{category.name}</option>
                        )}
                    </select>
                    <button>Добавить</button>
                </form>
            }
        </>
    );
}

export default AnecdoteForm;