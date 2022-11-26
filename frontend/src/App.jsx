import { initializePosts } from './reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import postService from './services/posts';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializePosts());
  }, [dispatch]);
  const images = useSelector(({ posts }) => {
    return posts;
  });

  return (
    <div>
      {images.map((image) => {
        return (
          <div key={image.id}>
            <img src={image.image} alt={image.title}></img>
          </div>
        );
      })}
    </div>
  );
};

export default App;
