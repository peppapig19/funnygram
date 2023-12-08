import React, {
    useMemo
} from 'react';

import Loader from '../../shared/Loader/Loader';
import GenreMenuOption from '../../shared/GenreMenuOption/GenreMenuOption';

import { startOptions } from './GenreMenuData';

import useGenres from '../../../hooks/useGenres';

import './GenreMenu.scss';

const GenreMenu = () => {
    const { genres, isLoading } = useGenres();

    const genreOptions = useMemo(() => {
        return [...startOptions, ...genres]
    }, [genres]);

    return (
        <div className='genre-menu'>
            <h2 className='menu-header'>Жанры</h2>
            {isLoading ? (
                <Loader />
            ) : (
                <ul className='menu-options'>
                    {genreOptions.map(genre => (
                        <li key={'genre_' + genre.guid}>
                            <GenreMenuOption genre={genre} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GenreMenu;