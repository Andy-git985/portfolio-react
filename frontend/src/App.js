import { useState, useEffect } from 'react';
import { useResource } from './hooks';

import Menu from './components/Menu';
import Images from './components/Images';
import UploadForm from './components/UploadForm';
// import postService from './services/posts';

const App = () => {
  const [posts, postService] = useResource('/api/posts');

  const addPost = (postObject) => {
    // old code here
    // try {
    //   const returnedPost = await postService.createNew(postObject);
    //   setPosts(posts.concat(returnedPost));
    // } catch (error) {
    //   console.error(error);
    // }
    postService.create(postObject);
  };

  return (
    <>
      <div className="menu">
        <Menu />
        <UploadForm createPost={addPost} />
      </div>
      <Images posts={posts} />
    </>
  );
};

export default App;
