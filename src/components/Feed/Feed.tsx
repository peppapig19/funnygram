import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostType } from '../Post/Post';
import PostList from '../PostList/PostList';
import Data from '../../context/Data';
import useFavorites from '../../hooks/useFavorites';

interface FeedProps {
    data: Data;
}

const Feed: React.FC<FeedProps> = (props) => {
    const { data } = props;
    const { categorySlug } = useParams<string>();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { favs, togglePostFav } = useFavorites();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            let posts;
            if (categorySlug) {
                const category = data.getCategoryBySlug(categorySlug);
                if (category) {
                    posts = data.getPostsByCategory(category);
                }
            } else {
                posts = data.posts;
            }
            posts = posts?.map(post => ({
                ...post,
                isFavorite: favs.findIndex(fav => fav.id === post.id) !== -1,
            })) || [];
            setPosts(posts);
            setIsLoading(false);
        }, 1000);
    }, [categorySlug, data, favs]);

    return (
        <PostList posts={posts} isLoading={isLoading} togglePostFav={togglePostFav} />
    );
}

export default Feed;