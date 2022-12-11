import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import DrawerMenu from './DrawerMenu';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import UploadForm from '../components/UploadForm';
import { filterPosts } from '../reducers/filterReducer';
import postServices from '../services/posts';

const MenuDesktopContainer = styled('div')(() => ({
  width: 'calc(100vw - 70%)',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const MenuFixedContent = styled('div')(() => ({
  position: 'fixed',
  width: 'calc(100vw - 85%)',
  padding: '15px',
  top: '0',
  left: '0',
}));

export const MenuDesktop = () => {
  const user = useSelector(({ user }) => user);
  if (user.loggedIn) {
    postServices.setToken(user.userToken);
  }
  const dispatch = useDispatch();
  const setFilter = (filter) => {
    dispatch(filterPosts(filter));
  };
  return (
    <MenuDesktopContainer>
      <MenuFixedContent>
        <Link to="/">
          <div>Name</div>
        </Link>
        <Link to="/project/editorial">
          <div>Editorial</div>
        </Link>
        <Link to="/project/advertising">
          <div>Advertising</div>
        </Link>
        <div>Contact</div>
        {user.loggedIn ? <LogoutButton /> : <LoginButton />}
        {user.loggedIn && <UploadForm />}
        {user.loggedIn && (
          <Link to="/edit">
            <div>Edit</div>
          </Link>
        )}
      </MenuFixedContent>
    </MenuDesktopContainer>
  );
};

const MenuMobileContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '.625rem',
}));

export const MenuMobile = () => {
  const user = useSelector(({ user }) => user);
  if (user.loggedIn) {
    postServices.setToken(user.userToken);
  }
  return (
    <div>
      {/* extra div for now */}
      <MenuMobileContainer>
        <div>Name</div>
        <DrawerMenu />
      </MenuMobileContainer>
      {user.loggedIn ? <LogoutButton /> : <LoginButton />}
      {user.loggedIn && <UploadForm />}
      {user.loggedIn && (
        <Link to="/edit">
          <div>Edit</div>
        </Link>
      )}
    </div>
  );
};
