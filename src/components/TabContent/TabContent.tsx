import React, {
    useState,
    useEffect,
    RefObject
} from 'react';
import { useParams } from 'react-router-dom';

import { PostType } from '../Post/Post';
import PostList from '../PostList/PostList';
import Loader from '../Loader/Loader';
import Data from '../../context/Data';
import useFavorites from '../../hooks/useFavorites';

import './TabContent.scss';

const data = new Data();

interface TabContentProps {
    scrollRef: RefObject<HTMLDivElement>;
}

const TabContent = (props: TabContentProps) => {
    const { scrollRef } = props;
    const { categorySlug } = useParams<string>();
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { favs, togglePostFav } = useFavorites();

    useEffect(() => {
        if (categorySlug === 'favorites') {
            setPosts(favs);
        } else {
            setIsLoading(true);
            data.loadPostsAsync(categorySlug).then(res => {
                const posts = res.map(post => {
                    const isFavorite = favs.some(fav => fav.id === post.id);
                    return { ...post, isFavorite: isFavorite }
                });
                setPosts(posts);
                setIsLoading(false);
            });
        }
    }, [categorySlug, favs]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <PostList posts={posts} scrollRef={scrollRef} togglePostFav={togglePostFav} />
    );
}

export default TabContent;