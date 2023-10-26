import React, { Component } from 'react';
import PostList from './components/PostList/PostList';

class App extends Component {
  constructor(props) {
    super(props);
    this.postsData = [
      { title: 'Post 1', text: 'This is the first post.' },
      { title: 'Post 2', text: 'This is the second post.' },
      { title: 'Post 3', text: 'This is the third post.' },
    ];
    this.styles = {
      post: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        height: '200px'
      }
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Анекдоты</h1>
        <PostList posts={this.postsData} postStyle={this.styles.post} />
      </div>
    );
  }
}

export default App;