import { useSelector } from 'react-redux';
import { useMatch, Routes, Route, Link } from 'react-router-dom';
import { useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ImagesDesktop, ImagesMobile } from '../components/Images';
import { MenuDesktop, MenuMobile } from '../components/Menu';
import Image from '../components/Image';

const padding = {
  padding: '.5em',
};

const HomeDesktop = ({ images, image, user }) => {
  return (
    <Grid container columns={10}>
      <Grid item mobile={10} tablet={3}>
        <MenuDesktop user={user} />
      </Grid>
      <Grid item mobile={10} tablet={7} style={padding}>
        <Routes>
          <Route
            path="/"
            element={<ImagesDesktop user={user} images={images} />}
          />
          <Route
            path="/type/:type"
            element={<ImagesDesktop user={user} images={images} />}
          />
          <Route path="/:id" element={<Image user={user} image={image} />} />
        </Routes>
      </Grid>
    </Grid>
  );
};
const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

const HomeMobile = ({ images, image, user }) => {
  return (
    <HomeMobileContainer>
      {/* Menu component */}
      <MenuMobile user={user} />
      <Routes>
        <Route
          path="/"
          element={<ImagesMobile user={user} images={images} />}
        />
        <Route
          path="/project/:project"
          element={<ImagesMobile user={user} images={images} />}
        />
        <Route path="/:id" element={<Image user={user} image={image} />} />
      </Routes>
    </HomeMobileContainer>
  );
};

const Home = ({ user }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  const posts = useSelector(({ posts }) => posts);
  const typeMatch = useMatch('/type/:type');
  const images = typeMatch
    ? posts.filter((p) => p.type === typeMatch.params.type)
    : posts;
  const match = useMatch('/:id');
  const image = match ? posts.find((i) => i.id === match.params.id) : null;

  return (
    <>
      {!matches && <HomeDesktop user={user} images={images} image={image} />}
      {matches && <HomeMobile user={user} images={images} image={image} />}
    </>
  );
};

export default Home;
