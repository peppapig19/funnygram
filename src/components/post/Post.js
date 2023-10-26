import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  render() {
    const { title, text, style } = this.props;
    return (
      <div className="post" style={style}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    );
  }
}

export default Post;