import { useState, useEffect } from 'react';
import { PostType } from '../components/Post/Post';

const useFavorites = () => {
    const [favs, setFavs] = useState<PostType[]>(JSON.parse(localStorage.getItem('favs') || '[]'));

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favs));
    }, [favs]);

    const togglePostFav = (post: PostType) => {
        if (favs.includes(post)) {
            setFavs(favs.filter(fav => fav.id !== post.id));
        } else {
            setFavs([...favs, post]);
        }
    };

    return { favs, togglePostFav };
};

export default useFavorites;