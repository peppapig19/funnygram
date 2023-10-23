import React, { Component } from 'react';

class Post extends Component {
  render() {
    const { title, text } = this.props;
    return (
      <div className="post">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    );
  }
}

export default Post;