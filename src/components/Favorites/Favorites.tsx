import React, { useState, useEffect } from 'react';
import PostList from '../PostList/PostList';
import useFavorites from '../../hooks/useFavorites';

const Favorites: React.FC = () => {
    const { favs, togglePostFav } = useFavorites();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            favs.forEach(fav => {
                fav.isFavorite = true;
            });
            setIsLoading(false);
        }, 1000);
    }, [favs]);

    return (
        <PostList posts={favs} isLoading={isLoading} togglePostFav={togglePostFav} />
    );
}

export default Favorites;