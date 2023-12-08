import React from 'react';

import Message from '../../shared/Message/Message';
import PostList from '../../components/PostList/PostList';

import { PostType } from '../../shared/Post/PostType';

import useHistory from '../../../hooks/useHistory';

import './History.scss';

const History = () => {
    const { historyRecords } = useHistory();

    const posts: PostType[] = historyRecords.map(record => ({
        ...record.post,
        hint: `${record.dateTime.toLocaleString()} ${record.action}`
    }));

    return (
        <div className='history'>
            {!posts.length && <Message text='Истории пока нет.' />}
            <PostList posts={posts} />
        </div>
    );
}

export default History;