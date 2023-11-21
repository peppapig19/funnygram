import {
    useState,
    useEffect
} from 'react';

import { PostType } from '../components/Post/Post';

const useFavorites = () => {
    const [favs, setFavs] = useState<PostType[]>([]);

    useEffect(() => {
        const favs = localStorage.getItem('favs');
        if (favs) {
            setFavs(JSON.parse(favs));
        }
    }, []);

    const saveFavs = (favs: PostType[]) => {
        localStorage.setItem('favs', JSON.stringify(favs));
    };

    useEffect(() => {
        saveFavs(favs);
    }, [favs]);

    const getUpdatedFavs = (post: PostType) => {
        if (post.isFavorite) {
            return [...favs, post];
        } else {
            return favs.filter(fav => fav.id !== post.id);
        }
    };

    const togglePostFav = (post: PostType) => {
        post.isFavorite = !post.isFavorite;
        setFavs(getUpdatedFavs(post));
    };

    return { favs, togglePostFav } as const;
};

export default useFavorites;