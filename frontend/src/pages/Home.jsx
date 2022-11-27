import Images from '../components/Images';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
// import { MenuDesktop, MenuMobile } from './menu';

const MenuContainer = styled('div')(() => ({
  width: '30%',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const Home = () => {
  return (
    <div className="flex">
      {/* Menu component */}
      <MenuContainer>
        <div className="menu">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
          nobis aperiam? Excepturi, quos incidunt voluptatem illo dolore nobis
          eligendi deserunt, ducimus esse ullam autem sequi.
        </div>
      </MenuContainer>
      <Images />
    </div>
  );
};

export default Home;
