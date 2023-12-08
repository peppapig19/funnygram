import {
    useState,
    useRef,
    useCallback,
    useEffect
} from 'react';

import { PostType } from '../components/shared/Post/PostType';
import ApiService from '../context/ApiService';

import { useNavContext } from '../context/NavContext';

import useCache from './useCache';
import useUserPosts from './useUserPosts';
import useScrollRestoration from './useScrollRestoration';

const PAGE_ITEMS_COUNT = 3;

const usePosts = () => {
    const { selectedGenreId } = useNavContext();

    const [posts, setPosts] = useState<PostType[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const offset = useRef<number>(0);
    const isCacheOnly = useRef<boolean>(false);

    const { cache, convertJokeWithCache } = useCache();
    const { hasMoreUserPosts, getPartUserPosts } = useUserPosts();
    const scroller = useScrollRestoration();

    const fetchPosts = useCallback((count: number) => {
        setIsLoading(true);
        const genre = selectedGenreId === 'all' ? undefined : selectedGenreId;
        ApiService.getPartJokesByGenreAsync(offset.current, count, genre)
            .then(res => {
                const morePosts = res.map(post => convertJokeWithCache(post));
                setHasMorePosts(morePosts.length >= count);
                setPosts(prev => [...prev, ...morePosts]);
                offset.current += morePosts.length;
                setIsLoading(false);
            });
    }, [selectedGenreId, convertJokeWithCache]);

    const loadUserPosts = useCallback((count: number) => {
        const morePosts = getPartUserPosts(count);
        setPosts(prev => [...prev, ...morePosts]);
        if (morePosts.length < count) {
            fetchPosts(count - morePosts.length);
        }
    }, [getPartUserPosts, fetchPosts]);

    const loadMore = useCallback((count?: number) => {
        if (isCacheOnly.current) {
            setPosts(cache.current);
            setHasMorePosts(false);
        } else {
            if (hasMoreUserPosts.current) {
                loadUserPosts(count ?? PAGE_ITEMS_COUNT);
            } else {
                fetchPosts(count ?? PAGE_ITEMS_COUNT);
            }
        }
    }, [cache, hasMoreUserPosts, loadUserPosts, fetchPosts]);

    useEffect(() => {
        isCacheOnly.current = !navigator.onLine;
        offset.current = 0;
        const count = scroller.current?.getScrollIndex();
        if (count && +count !== 0) {
            let pages = +count / PAGE_ITEMS_COUNT;
            if (+count % PAGE_ITEMS_COUNT !== 0) {
                pages++;
            }
            loadMore(Math.round(pages) * PAGE_ITEMS_COUNT);
        } else {
            loadMore(PAGE_ITEMS_COUNT);
        }
    }, [scroller, loadMore]);

    return { posts, hasMorePosts, isLoading, loadMore };
}

export default usePosts;