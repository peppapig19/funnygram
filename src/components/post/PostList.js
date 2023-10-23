import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="post-list">
        {posts.map((post, index) => (
          <Post key={index} title={post.title} text={post.text} />
        ))}
      </div>
    );
  }
}

export default PostList;