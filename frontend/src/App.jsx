import { initializePosts } from './reducers/postReducer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
