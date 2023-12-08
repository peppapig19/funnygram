import React, {
    useState,
    useEffect
} from 'react';

import Post from '../../shared/Post/Post';
import Loader from '../../shared/Loader/Loader';

import { PostType } from '../../shared/Post/PostType';
import ScrollRestoration from '../../../context/ScrollRestoration';

import './PostList.scss';

interface PostListProps {
    posts: PostType[];
    scroller?: ScrollRestoration;
    isLoading?: boolean;
    togglePostFav?: (post: PostType) => void;
}

const PostList = (props: PostListProps) => {
    const { posts, scroller, isLoading, togglePostFav } = props;

    const [isRescrolling, setIsRescrolling] = useState<boolean>(true);

    useEffect(() => {
        if (scroller && !isLoading && isRescrolling) {
            scroller.rescroll();
            setIsRescrolling(false);
        }
    }, [scroller, isLoading, isRescrolling]);

    return (
        <>
            <div className='post-list'>
                {posts.map((post, index) => (
                    <Post key={'post_' + post.guid} post={post} index={index}
                        isRescrolling={isRescrolling} scroller={scroller}
                        togglePostFav={togglePostFav} />
                ))}
            </div>
            {isLoading && <Loader />}
        </>
    );
}

export default PostList;