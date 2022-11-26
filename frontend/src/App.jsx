import { initializePosts } from './reducers/postReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializePosts());
  }, [dispatch]);

  return (
    <div>
      <Home />
    </div>
  );
};

export default App;
