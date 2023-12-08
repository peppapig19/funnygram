import React from 'react';

import OpenAnecdoteForm from '../../widgets/OpenAnecdoteForm/OpenAnecdoteForm';

import './FeedButtons.scss';

interface FeedButtonsProps {
    isOnline: boolean,
    hasMorePosts: boolean,
    isLoading: boolean,
    loadMore: () => void
}

const FeedButtons = (props: FeedButtonsProps) => {
    const { isOnline, hasMorePosts, isLoading, loadMore } = props;

    if (!isOnline || isLoading) {
        return false;
    }

    return (
        <div className='feed-buttons'>
            <OpenAnecdoteForm />
            {hasMorePosts && <button onClick={() => loadMore()}>Читать дальше</button>}
        </div>
    );
}

export default FeedButtons;