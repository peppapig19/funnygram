import {
    useRef,
    useEffect,
    useCallback
} from 'react';

import { PostType } from '../components/shared/Post/PostType';
import { HistoryActions } from '../components/pages/History/HistoryRecordType';

import useHistory from './useHistory';

const useFavorites = () => {
    const favs = useRef<PostType[]>([]);

    const { addHistoryRecord } = useHistory();

    useEffect(() => {
        const localFavs = localStorage.getItem('favs');
        if (localFavs) {
            favs.current = JSON.parse(localFavs);
        }
    }, []);

    const getFavsByGenre = useCallback((genreId: string) => {
        if (genreId !== 'all') {
            return favs.current.filter(fav => fav.genre === genreId);
        } else {
            return favs.current;
        }
    }, []);

    const storeFavs = () => {
        localStorage.setItem('favs', JSON.stringify(favs.current));
    };

    const togglePostFav = useCallback((post: PostType) => {
        post.isFavorite = !post.isFavorite;
        if (post.isFavorite) {
            favs.current.unshift(post);
            addHistoryRecord(HistoryActions.addToFavs, post);
        } else {
            favs.current = favs.current.filter(fav => fav.guid !== post.guid);
            addHistoryRecord(HistoryActions.removeFromFavs, post);
        }
        storeFavs();
    }, [addHistoryRecord]);

    return { getFavs: getFavsByGenre, togglePostFav } as const;
};

export default useFavorites;