import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PostType } from '../Post/Post';
import PostList from '../PostList/PostList';
import Data, {Post} from '../../context/Data';
import useFavorites from '../../hooks/useFavorites';
import Loader from '../Loader/Loader';

type TabsContentProps = {}

const data = new Data();

export const TabsContent = ({}:TabsContentProps) => {
    const { categorySlug } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [posts, setPosts] = useState<PostType[]>([]);
    const { favs, togglePostFav } = useFavorites();

    useEffect(() => {
        if (categorySlug) {
            setIsLoading(true);
            data.loadingPosts(categorySlug).then(res => {
                const posts: Post[] = res;
                const postTypes: PostType[] = posts.map(p => {
                    const isFavorite = favs.indexOf(p.id)>=0;    
                    return {...p, isFavorite:isFavorite}
                })
                setPosts(categorySlug == 'favorsJokes' ? postTypes.filter(p=>p.isFavorite) : postTypes);
                setIsLoading(false);
            });
        }
    }, [categorySlug]);

    if (isLoading) {
        return <Loader isAbsoluteCenter={true} />;
    }

    return (
        <PostList posts={posts} togglePostFav={togglePostFav} />
    );
}