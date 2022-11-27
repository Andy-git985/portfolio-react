import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Images from '../components/Images';
import UploadForm from '../components/UploadForm';

const MenuDesktopContainer = styled('div')(() => ({
  width: 'calc(100vw - 75%)',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const HomeDesktop = () => {
  return (
    <div className="flex">
      {/* Menu component */}
      <MenuDesktopContainer>
        <div className="menu">
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
            eligendi deserunt, ducimus esse ullam autem sequi.
          </div>
          <UploadForm />
        </div>
      </MenuDesktopContainer>
      <Images />
    </div>
  );
};

const HomeMobile = () => {
  return (
    <HomeMobileContainer>
      {/* Menu Container */}
      <div>
        {/* Menu no needed for fixed */}
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
      <Images />
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
