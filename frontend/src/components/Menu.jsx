import { Link } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';
import LoginButton from './LoginButton';
import styled from 'styled-components';

const Logout = styled.div`
  cursor: pointer;
`;

const Menu = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:3001/auth/logout', '_self');
  };
  return (
    <>
      <div className="flex-menu">
        <Link to="/">
          <div>
            <h1>Name</h1>
          </div>
        </Link>
        <div className="menu-btn">
          <DrawerMenu />
        </div>
      </div>
      <div className="options">
        <Link to="/projects/editorial">
          <div>editorial</div>
        </Link>
        <Link to="/projects/advertising">
          <div>advertising</div>
        </Link>
        <div>video</div>
        <div>photo diary</div>
        <div>contact</div>
        {user ? <Logout onClick={logout}>Logout</Logout> : <LoginButton />}
      </div>
    </>
  );
};

export default Menu;
