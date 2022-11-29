import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ImagesDesktop, ImagesMobile } from '../components/Images';
import LoginButton from '../components/LoginButton';
import UploadForm from '../components/UploadForm';
import { MenuMobile } from '../components/Menu';

const HomeDesktopContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

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

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

const HomeDesktop = () => {
  const user = useSelector(({ users }) => {
    return users;
  });
  console.log('user', user);
  return (
    <HomeDesktopContainer>
      {/* Menu component */}
      <MenuDesktopContainer>
        <MenuFixedContent>
          <div>Name</div>
          <div>Editorial</div>
          <div>Advertising</div>
          <div>Contact</div>
          <LoginButton />
          {user && <UploadForm />}
          <div>{user.displayName}</div>
        </MenuFixedContent>
      </MenuDesktopContainer>
      <ImagesDesktop />
    </HomeDesktopContainer>
  );
};

const HomeMobile = () => {
  return (
    <HomeMobileContainer>
      {/* Menu Container */}
      <div>
        {/* Menu not needed for fixed */}
        <MenuMobile />
        <LoginButton />
        <UploadForm />
      </div>
      <ImagesMobile />
    </HomeMobileContainer>
  );
};

const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));
  return (
    <div>
      {!matches && <HomeDesktop />}
      {matches && <HomeMobile />}
    </div>
  );
};

export default Home;
