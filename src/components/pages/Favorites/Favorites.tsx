import React, {
    useState,
    useEffect
} from 'react';

import PostList from '../../components/PostList/PostList';

import { useNavContext } from '../../../context/NavContext';
import { PostType } from '../../shared/Post/PostType';

import useFavorites from '../../../hooks/useFavorites';
import useScrollRestoration from '../../../hooks/useScrollRestoration';

import './Favorites.scss';
import Message from '../../shared/Message/Message';

const Favorites = () => {
    const { selectedGenreId } = useNavContext();

    const [posts, setPosts] = useState<PostType[]>([]);

    const { getFavs, togglePostFav } = useFavorites();
    const scroller = useScrollRestoration();

    useEffect(() => {
        setPosts(getFavs(selectedGenreId));
    }, [selectedGenreId, getFavs]);

    const removeFromFavs = (post: PostType) => {
        togglePostFav(post);
        setPosts(getFavs(selectedGenreId));
    };

    return (
        <div className='favorites'>
            {!posts.length && <Message text='Избранного пока нет.' />}
            <PostList posts={posts} scroller={scroller.current} togglePostFav={removeFromFavs} />
        </div>
    );
}

export default Favorites;