import { useSelector } from 'react-redux';
import { useMatch, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ImagesDesktop, ImagesMobile } from '../components/Images';
import { MenuDesktop, MenuMobile } from '../components/Menu';
import Image from '../components/Image';

const HomeDesktopContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

const HomeDesktop = () => {
  const posts = useSelector(({ posts }) => posts);
  const projectMatch = useMatch('/project/:project');
  const images = projectMatch
    ? posts.filter((p) => p.project === projectMatch.params.project)
    : posts;
  const match = useMatch('/:id');
  const image = match ? posts.find((i) => i.id === match.params.id) : null;
  return (
    <HomeDesktopContainer>
      {/* Menu component */}
      <MenuDesktop />
      <Routes>
        <Route path="/" element={<ImagesDesktop images={images} />} />
        <Route
          path="/project/:project"
          element={<ImagesDesktop images={images} />}
        />
        <Route path="/:id" element={<Image image={image} />} />
      </Routes>
    </HomeDesktopContainer>
  );
};

const HomeMobile = () => {
  return (
    <HomeMobileContainer>
      {/* Menu component */}
      <MenuMobile />
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
