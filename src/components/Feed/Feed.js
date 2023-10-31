import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';
import './Feed.css';

const Feed = (props) => {
    const { categorySlug } = useParams();
    const { categories } = props;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let url = `http://localhost:3000/posts`;
        if (categorySlug) {
            const category = categories.find(category => category.slug === categorySlug);
            url += `?categoryId=${category?.id}`;
        }
        fetch(url)
            .then((response) => response.json())
            .then(posts => setPosts(posts));
    }, [categorySlug]);

    const styles = {
        post: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            height: '200px',
        },
    };

    return (
        <div className='feed'>
            {posts.map((post, index) => (
                <Post key={index} title={post.title} body={post.body} style={styles.post} />
            ))}
        </div>
    );
}

export default Feed;