import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ImagesDraggable from '../components/ImagesDraggable';
import UploadForm from '../components/UploadForm';
import postServices from '../services/posts';

const HomeDesktopContainer = styled('div')(() => ({
  display: 'flex',
  // justifyContent: 'space-between',
}));

const MenuDesktopContainer = styled('div')(() => ({
  width: 'calc(100vw - 70%)',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const HomeDesktop = () => {
  const userToken = useSelector(({ user }) => user.userToken);
  if (userToken) {
    postServices.setToken(userToken);
  }

  return (
    <HomeDesktopContainer>
      {/* Menu component */}
      <MenuDesktopContainer>
        <div className="menu">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
            eligendi deserunt, ducimus esse ullam autem sequi.
          </div>
          {userToken && (
            <Link to="/">
              <div>Home</div>
            </Link>
          )}
        </div>
      </MenuDesktopContainer>
      <ImagesDraggable />
    </HomeDesktopContainer>
  );
};

const HomeMobile = () => {
  return (
    <HomeMobileContainer>
      {/* Menu Container */}
      <div>
        {/* Menu not needed for fixed */}
        <div>
          {/* Menu Links */}
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
            eligendi deserunt, ducimus esse ullam autem sequi.
          </div>
          <UploadForm />
        </div>
      </div>
      <ImagesDraggable />
    </HomeMobileContainer>
  );
};

const Edit = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));
  return (
    <div>
      {!matches && <HomeDesktop />}
      {matches && <HomeMobile />}
    </div>
  );
};

export default Edit;
