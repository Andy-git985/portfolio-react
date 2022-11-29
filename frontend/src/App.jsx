import { initializePosts } from './reducers/postReducer';
import { getUser } from './reducers/userReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import { theme } from './styles/styles';
import { ThemeProvider } from '@mui/material';
import Edit from './pages/Edit';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializePosts());
    // dispatch(getUser());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

export default App;
