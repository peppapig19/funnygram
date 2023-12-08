import React from 'react';

import Message from '../../shared/Message/Message';
import PostList from '../../components/PostList/PostList';
import FeedButtons from '../../components/FeedButtons/FeedButtons';

import useInternetCheck from '../../../hooks/useInternetCheck';
import usePosts from '../../../hooks/usePosts';
import useFavorites from '../../../hooks/useFavorites';
import useScrollRestoration from '../../../hooks/useScrollRestoration';

import './Feed.scss';

const Feed = () => {
    const isOnline = useInternetCheck();
    const { posts, hasMorePosts, isLoading, loadMore } = usePosts();
    const { togglePostFav } = useFavorites();
    const scroller = useScrollRestoration();

    return (
        <div className='feed'>
            {!isOnline && <Message text='Отсутствует подключение к интернету.' />}
            {!posts.length && !isLoading && <Message text='Посты не найдены.' />}
            <PostList posts={posts} scroller={scroller.current} isLoading={isLoading}
                togglePostFav={togglePostFav} />
            <FeedButtons isOnline={isOnline} hasMorePosts={hasMorePosts} isLoading={isLoading} loadMore={loadMore} />
        </div>
    );
}

export default Feed;