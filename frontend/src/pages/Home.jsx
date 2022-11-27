import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ImagesDesktop, ImagesMobile } from '../components/Images';
import UploadForm from '../components/UploadForm';

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

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const HomeDesktop = () => {
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
          <UploadForm />
        </div>
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
