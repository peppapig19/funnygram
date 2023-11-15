import React from 'react';
import './Post.scss';

export interface PostType {
    id: number;
    categoryId: number;
    title: string;
    body: string;
    isFavorite: boolean;
}

interface PostProps {
    post: PostType;
    togglePostFav: (_post: PostType) => void;
}

const Post: React.FC<PostProps> = (props) => {
    const { post, togglePostFav } = props;
    const starClass = post.isFavorite ? 'star-active fa-solid fa-star' : 'star fa-regular fa-star';

    const handleStarClick = () => {
        togglePostFav(post);
    };

    return (
        <div className='post'>
            <div className='post-content'>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            <div className='post-fav' onClick={handleStarClick}><i className={starClass} /></div>
        </div>
    );
}

export default Post;