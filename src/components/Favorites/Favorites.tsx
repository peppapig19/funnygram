import React, { useState, useEffect } from 'react';
import { PostType } from '../Post/Post';
import PostList from '../PostList/PostList';
import Data from '../../context/Data';
import useFavorites from '../../hooks/useFavorites';

interface FavoritesProps {
    data: Data;
}

const Favorites: React.FC<FavoritesProps> = (props) => {
    const { data } = props;
    const { favs, togglePostFav } = useFavorites();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const posts = data.posts.filter(post => favs.includes(post.id))
                .map(post => ({
                    ...post,
                    isFavorite: true
                } as PostType));
            setPosts(posts);
            setIsLoading(false);
        }, 1000);
    }, [data.posts, favs]);

    return (
        <PostList posts={posts} togglePostFav={togglePostFav} />
    );
}

export default Favorites;