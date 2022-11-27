import { initializePosts } from './reducers/postReducer';
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
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Edit />
    </ThemeProvider>
  );
};

export default App;
