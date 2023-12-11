import React, {
    useMemo
} from 'react';

import Loader from '../../shared/Loader/Loader';

import { useNavContext } from '../../../context/NavContext';
import { startOptions } from './GenreMenuData';

import useGenres from '../../../hooks/useGenres';

import './GenreMenu.scss';

const GenreMenu = () => {
    const { selectedGenreId, selectGenre } = useNavContext();

    const { genres, isLoading } = useGenres();

    const genreOptions = useMemo(() => {
        return [...startOptions, ...genres]
    }, [genres]);

    return (
        <div className='genre-menu'>
            <h2 className='menu-header'>Жанры</h2>
            <ul className='menu-options'>
                {genreOptions.map(genre => (
                    <li key={'genre_' + genre.guid}>
                        <div className={'menu-option ' + (genre.guid === selectedGenreId ? 'active' : '')}
                            onClick={() => selectGenre(genre.guid)}>
                            {genre.name.toLowerCase()}
                        </div>
                    </li>
                ))}
            </ul>
            {isLoading && <Loader />}
        </div>
    );
};

export default GenreMenu;