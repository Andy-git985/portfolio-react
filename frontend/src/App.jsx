import { initializePosts } from './reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Images from './components/Images';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializePosts());
  }, [dispatch]);

  return (
    <div>
      <Images />
    </div>
  );
};

export default App;
