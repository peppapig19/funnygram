import React, { RefObject } from 'react';

import Post, { PostType } from '../Post/Post';

import './PostList.scss';
import useScrollRestoration from '../../hooks/useScrollRestoration';

interface PostListProps {
    posts: PostType[];
    scrollRef: RefObject<HTMLDivElement>;
    togglePostFav: (_post: PostType) => void;
}

const PostList = (props: PostListProps) => {
    const { posts, scrollRef, togglePostFav } = props;
    const saveScroll = useScrollRestoration();

    return (
        <div className='post-list'>
            {posts.map(post => (
                <Post key={'post_' + post.id} post={post}
                    scrollRef={scrollRef} onVisibilityChange={saveScroll}
                    togglePostFav={togglePostFav} />
            ))}
        </div>
    );
}

export default PostList;