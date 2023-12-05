import React, { RefObject } from 'react';

import Post from '../Post/Post';

import { PostType } from '../Post/PostData';

import useScrollRestoration from '../../../hooks/useScrollRestoration';

import './PostList.scss';

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