import { useState, useEffect } from 'react';
import { PostType } from '../components/Post/Post';

const useFavorites = () => {
    const [favs, setFavs] = useState<number[]>([]);

    useEffect(()=>{
        const favs = localStorage.getItem('favs');
        if (favs) {
            setFavs(JSON.parse(favs))
        }
    }, [])

    const saveFavs = (idFavs: number[]) => {
        localStorage.setItem('favs', JSON.stringify(favs));
    }

    useEffect(() => {
        saveFavs(favs);
    }, [favs]);

    const togglePostFav = (post: PostType) => {
        let newFavs = null;
        
        if (favs.find(fav => fav === post.id)) {
            newFavs = favs.filter(fav => fav !== post.id);
        } else {
            newFavs = [...favs, post.id];
        }
        
        setFavs(newFavs);
    };

    return { favs, togglePostFav } as const;
};

export default useFavorites;