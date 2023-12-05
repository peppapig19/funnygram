import {
    useState,
    useRef,
    useCallback,
    useEffect
} from 'react';
import { useParams } from 'react-router-dom';

import Data from '../context/Data';
import { PostType } from '../components/shared/Post/PostData';

import useFavorites from './useFavorites';

const data = new Data();
const PAGE_ITEMS_COUNT = 3;

const usePosts = () => {
    const { categorySlug } = useParams<string>();

    const [posts, setPosts] = useState<PostType[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const cache = useRef<PostType[]>([]);
    const favs = useRef<PostType[]>([]);
    const offset = useRef<number>(0);
    const isCacheOnly = useRef<boolean>(false);

    const { getFavs } = useFavorites();

    const updatePosts = useCallback((morePosts: PostType[]) => {
        if (offset.current === 0) {
            setPosts(morePosts);
        } else {
            setPosts(prevPosts => [
                ...prevPosts,
                ...morePosts
            ]);
        }
        offset.current += morePosts.length;
        setIsLoading(false);
    }, []);

    const loadPostsAsync = useCallback(async () => {
        const res = await data.loadPostsAsync(
            categorySlug,
            offset.current,
            PAGE_ITEMS_COUNT
        );
        const morePosts = res.map(post => {
            const isFavorite = favs.current.some(fav => fav.id === post.id);
            return {
                ...post,
                isFavorite: isFavorite
            };
        });
        if (morePosts.length < PAGE_ITEMS_COUNT) {
            setHasMorePosts(false);
        } else {
            setHasMorePosts(true);
        }
        updatePosts(morePosts);
    }, [categorySlug, updatePosts]);

    const loadMore = useCallback(() => {
        if (isCacheOnly.current) {
            const displayedPosts = cache.current.slice(0, offset.current + PAGE_ITEMS_COUNT);
            setPosts(displayedPosts);
            offset.current = displayedPosts.length;
            if (displayedPosts.length === cache.current.length) {
                setHasMorePosts(false);
            } else {
                setHasMorePosts(true);
            }
        } else {
            setIsLoading(true);
            loadPostsAsync();
        }
    }, [loadPostsAsync]);

    const getCache = useCallback(() => {
        if (categorySlug === 'favorites') {
            favs.current = getFavs();
            cache.current = favs.current;
        } else {
            const category = categorySlug ? data.getCategoryBySlug(categorySlug) : null;
            favs.current = category ? getFavs(category) : getFavs();
            cache.current = [...new Set([
                ...favs.current,
                //array2
            ])];
        }
    }, [categorySlug, getFavs]);

    const init = useCallback(() => {
        offset.current = 0;
        isCacheOnly.current = !navigator.onLine || categorySlug === 'favorites';
        getCache();
        const displayedPosts = cache.current.slice(0, PAGE_ITEMS_COUNT);
        setPosts(displayedPosts);
        if (isCacheOnly.current) {
            offset.current = displayedPosts.length;
        } else {
            loadMore();
        }
    }, [categorySlug, getCache, loadMore]);

    useEffect(() => {
        init();
    }, [init]);

    return { posts, hasMorePosts, isLoading, loadMore };
}

export default usePosts;