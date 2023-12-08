import {
    useRef,
    useEffect,
    useCallback
} from 'react';

import { PostType } from '../components/shared/Post/PostType';
import { Joke } from '../context/ApiService';

import { useNavContext } from '../context/NavContext';

import useFavorites from './useFavorites';
import useUserPosts from './useUserPosts';

const useCache = () => {
    const { selectedGenreId } = useNavContext();

    const cache = useRef<PostType[]>([]);
    const favs = useRef<PostType[]>([]);

    const { getFavs } = useFavorites();
    const { userPosts } = useUserPosts();

    useEffect(() => {
        favs.current = getFavs(selectedGenreId);
        cache.current = [...new Set([
            ...userPosts.current,
            ...favs.current
        ])];
    }, [selectedGenreId, userPosts, getFavs]);

    const convertJokeWithCache = useCallback((joke: Joke) => {
        return {
            ...joke,
            isFavorite: favs.current.some(fav => fav.guid === joke.guid)
        };
    }, []);

    return { cache, convertJokeWithCache } as const;
}

export default useCache;