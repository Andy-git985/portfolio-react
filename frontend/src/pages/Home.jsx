import { Routes, Route, useMatch, useNavigate } from 'react-router-dom';
import { useResource } from '../hooks';

import Menu from '../components/Menu';
import Images from '../components/Images';
import UploadForm from '../components/UploadForm';

const Home = ({ user }) => {
  const [posts, postService] = useResource('/api/posts');
  const navigate = useNavigate();

  const addPost = (postObject) => {
    postService.create(postObject);
  };

  const removePost = (id) => {
    postService.remove(id);
    navigate('/');
  };

  const projectMatch = useMatch('/projects/:project');
  const postMatch = useMatch('/:id');

  const images = projectMatch
    ? posts.filter((p) => p.project === projectMatch.params.project)
    : posts;

  const image = postMatch
    ? posts.filter((p) => p.id === postMatch.params.id)
    : posts;

  return (
    <div className="flex">
      <div className="menu">
        <Menu user={user} />
        {user && <UploadForm createPost={addPost} />}
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Images images={images} />} />
          <Route
            path="/:id"
            element={<Images images={image} removeImage={removePost} />}
          />
          <Route
            path="/projects/:project"
            element={<Images images={images} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
