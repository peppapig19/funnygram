import React from 'react';

import { Genre } from '../../../context/ApiService';
import { useNavContext } from '../../../context/NavContext';

import './GenreMenuOption.scss';

interface GenreOptionProps {
    genre: Genre;
}

const GenreMenuOption = (props: GenreOptionProps) => {
    const { genre } = props;

    const { selectedGenreId, selectGenre } = useNavContext();

    const onClick = () => {
        selectGenre(genre.guid);
    };

    return (
        <div className={'genre-option ' + (genre.guid === selectedGenreId ? 'active' : '')} onClick={onClick}>
            {genre.name.toLowerCase()}
        </div>
    );
}

export default GenreMenuOption;