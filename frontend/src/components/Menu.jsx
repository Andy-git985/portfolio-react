import { Link, NavLink } from 'react-router-dom';
import { Container } from '@mui/material/';
import { styled } from '@mui/material/styles';
import DrawerMenu from './DrawerMenu';
import LoginButton from './LoginButton';
import Admin from './Admin';

const MenuDesktopContainer = styled('div')(() => ({
  // width: 'calc(100vw - 70%)',
  // width: '30%',
  // height: '100vh',
  // outline: '1px solid blue',
  // flexShrink: '0',
  position: 'sticky',
  top: '1rem',
  backgroundColor: 'yellow',
}));

const MenuFixedContent = styled('div')(() => ({
  // position: 'fixed',
  // width: 'calc(100vw - 85%)',
  // width: '100%',
  // padding: '15px',
  // top: '0',
  // left: '0',
}));

const activeStyle = {
  color: 'Red',
};

export const MenuDesktop = ({ user }) => {
  return (
    <MenuDesktopContainer>
      <MenuFixedContent>
        <Link to="/">
          <div>Name</div>
        </Link>
        <NavLink
          to="/type/editorial"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Editorial</div>
        </NavLink>
        <NavLink
          to="/type/advertising"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Advertising</div>
        </NavLink>
        <div>Contact</div>
        {user.loggedIn ? <Admin /> : <LoginButton />}
      </MenuFixedContent>
    </MenuDesktopContainer>
  );
};

const MenuMobileContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '.625rem',
}));

export const MenuMobile = ({ user }) => {
  return (
    <Container>
      {/* extra div for now */}
      <MenuMobileContainer>
        <Link to="/">
          <div>Name</div>
        </Link>
        <DrawerMenu />
      </MenuMobileContainer>
      {user.loggedIn ? <Admin /> : <LoginButton />}
    </Container>
  );
};
