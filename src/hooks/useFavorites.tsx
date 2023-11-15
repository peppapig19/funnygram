import { useState, useEffect } from 'react';
import { PostType } from '../components/Post/Post';

const useFavorites = () => {
    const [favs, setFavs] = useState<number[]>(JSON.parse(localStorage.getItem('favs') || '[]'));

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favs));
    }, [favs]);

    const togglePostFav = (post: PostType) => {
        if (favs.find(fav => fav === post.id)) {
            setFavs(favs.filter(fav => fav !== post.id));
        } else {
            setFavs([...favs, post.id]);
        }
    };

    return { favs, togglePostFav };
};

export default useFavorites;