import Images from '../components/Images';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const MenuDesktopContainer = styled('div')(() => ({
  width: '30%',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const MobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const HomeDesktop = () => {
  return (
    <div className="flex">
      {/* Menu component */}
      <MenuDesktopContainer>
        <div className="menu">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
          eligendi deserunt, ducimus esse ullam autem sequi.
        </div>
      </MenuDesktopContainer>
      <Images />
    </div>
  );
};

const HomeMobile = () => {
  return (
    <MobileContainer>
      <div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
          eligendi deserunt, ducimus esse ullam autem sequi.
        </div>
      </div>
      <Images />
    </MobileContainer>
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
