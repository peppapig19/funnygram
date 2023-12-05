import {
    useRef,
    useEffect,
    useCallback
} from 'react';

import { PostType } from '../components/shared/Post/PostData';
import { Category } from '../context/Data';

const useFavorites = () => {
    const favs = useRef<PostType[]>([]);

    useEffect(() => {
        const localFavs = localStorage.getItem('favs');
        if (localFavs) {
            favs.current = JSON.parse(localFavs);
        }
    }, []);

    const getUpdatedFavs = (post: PostType) => {
        if (post.isFavorite) {
            return [
                ...favs.current,
                post
            ];
        } else {
            return favs.current.filter(fav => fav.id !== post.id);
        }
    };

    const saveFavs = () => {
        localStorage.setItem('favs', JSON.stringify(favs.current));
    };

    const togglePostFav = useCallback((post: PostType) => {
        post.isFavorite = !post.isFavorite;
        favs.current = getUpdatedFavs(post);
        saveFavs();
    }, []);

    const getFavsByCategory = useCallback((category?: Category) => {
        if (category) {
            return favs.current.filter(fav => fav.categoryId === category.id);
        } else {
            return favs.current;
        }
    }, []);

    return { getFavs: getFavsByCategory, togglePostFav } as const;
};

export default useFavorites;