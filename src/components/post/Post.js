import React from 'react';
import './Post.css';

const Post = (props) => {
    const { title, body, style } = props;
    return (
        <div className='post' style={style}>
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    )
}

export default Post;