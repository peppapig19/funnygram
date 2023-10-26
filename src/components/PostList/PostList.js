import React, { Component } from 'react';
import Post from '../Post/Post';
import './PostList.css';

class PostList extends Component {
  render() {
    const { posts, postStyle } = this.props;
    return (
      <div className="post-list">
        {posts.map((post, index) => (
          <Post key={index} title={post.title} text={post.text} style={postStyle} />
        ))}
      </div>
    );
  }
}

export default PostList;