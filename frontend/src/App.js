import { Routes, Route, useMatch } from 'react-router-dom';
import { useResource } from './hooks';

import Menu from './components/Menu';
import Images from './components/Images';
import UploadForm from './components/UploadForm';

const App = () => {
  const [posts, postService] = useResource('/api/posts');

  const addPost = (postObject) => {
    postService.create(postObject);
  };

  const match = useMatch('/:project');

  const images = match
    ? posts.filter((p) => p.project === match.params.project)
    : posts;

  return (
    <>
      <div className="menu">
        <Menu />
        <UploadForm createPost={addPost} />
      </div>
      <Routes>
        <Route path="/" element={<Images images={images} />} />
        <Route path="/:project" element={<Images images={images} />} />
      </Routes>
    </>
  );
};

export default App;
