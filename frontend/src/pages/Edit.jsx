import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom';
import { useResource } from '../hooks';

import Menu from '../components/Menu';
// import Images from '../components/Images';
// import UploadForm from '../components/UploadForm';
import DragImages from '../components/DragImages';
import { useState } from 'react';

const Edit = ({ user }) => {
  const [posts, postService] = useResource('/api/posts');
  const [order, setOrder] = useState(posts);
  // const navigate = useNavigate();

  const editLink = 'edit';
  const projectMatch = useMatch('/edit/:project');
  // const postMatch = useMatch('/:id');

  const images = projectMatch
    ? posts.filter((p) => p.project === projectMatch.params.project)
    : posts;

  // const image = postMatch
  //   ? posts.filter((p) => p.id === postMatch.params.id)
  //   : posts;

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(order);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrder(items);
  };

  return (
    <div className="flex">
      <div className="menu">
        <Menu link={editLink} user={user} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <DragImages images={images} handleOnDragEnd={handleOnDragEnd} />
          }
        />
        {/* <Route path="/:project" element={<Images images={images} />} /> */}
      </Routes>
    </div>
  );
};

export default Edit;
