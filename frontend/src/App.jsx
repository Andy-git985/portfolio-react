import { initializePosts } from './reducers/postReducer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import { theme } from './styles/styles';
import { ThemeProvider } from '@mui/material';
import Edit from './pages/Edit';
import ProtectedRoute from './routing/ProtectedRoute';
import postServices from './services/posts';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializePosts());
  }, [dispatch]);

  const user = useSelector(({ user }) => user);
  if (user.loggedIn) {
    postServices.setToken(user.userToken);
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={<Home user={user} />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/edit" element={<Edit />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
