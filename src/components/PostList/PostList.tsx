import React, { useEffect } from 'react';
import Loader from '../Loader/Loader';
import Post, { PostType } from '../Post/Post';
import { useScrollRestoration } from '../../hooks/useScrollRestoration';
import './PostList.scss';

interface PostListProps {
    posts: PostType[];
    togglePostFav: (_post: PostType) => void;
}

const PostList: React.FC<PostListProps> = (props) => {
    const { posts, togglePostFav } = props;
    const reScroll = useScrollRestoration();

    useEffect(() => {
        reScroll();
    }, [reScroll]);

    return (
        <div className='post-list'>
            {posts.map((post, index) => (
                <Post key={index} post={post} togglePostFav={togglePostFav} />
            ))}
        </div>

    );
}

export default PostList;