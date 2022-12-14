import { useSelector } from 'react-redux';
import { useMatch, Routes, Route, Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { ImagesDesktop, ImagesMobile } from '../components/Images';
import { MenuDesktop, MenuMobile } from '../components/Menu';
import Image from '../components/Image';
import { Grid } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import data from '../data';

// const style = {
//   position: 'sticky',
//   top: '1rem',
// };
// const HomeDesktopContainer = styled('div')(() => ({
//   display: 'flex',
//   justifyContent: 'space-between',
// }));

// const HomeMobileContainer = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '1.25rem',
// }));
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
            path="/project/:project"
            element={<ImagesDesktop user={user} images={images} />}
          />
          <Route path="/:id" element={<Image user={user} image={image} />} />
        </Routes>
      </Grid>
    </Grid>
  );
};
// const HomeDesktop = ({ images, image, user }) => {
//   return (
//     <HomeDesktopContainer>
//       {/* Menu component */}
//       <MenuDesktop user={user} />
//       <Routes>
//         <Route
//           path="/"
//           element={<ImagesDesktop user={user} images={images} />}
//         />
//         <Route
//           path="/project/:project"
//           element={<ImagesDesktop user={user} images={images} />}
//         />
//         <Route path="/:id" element={<Image user={user} image={image} />} />
//       </Routes>
//     </HomeDesktopContainer>
//   );
// };

// const HomeMobile = ({ images, image, user }) => {
//   return (
//     <HomeMobileContainer>
//       {/* Menu component */}
//       <MenuMobile user={user} />
//       <Routes>
//         <Route path="/" element={<ImagesMobile images={images} />} />
//         <Route
//           path="/project/:project"
//           element={<ImagesMobile images={images} />}
//         />
//         <Route path="/:id" element={<Image user={user} image={image} />} />
//       </Routes>
//     </HomeMobileContainer>
//   );
// };

const Home = ({ user }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  const posts = useSelector(({ posts }) => posts);
  const projectMatch = useMatch('/project/:project');
  const images = projectMatch
    ? posts.filter((p) => p.project === projectMatch.params.project)
    : posts;
  const match = useMatch('/:id');
  const image = match ? posts.find((i) => i.id === match.params.id) : null;

  return (
    // <div>
    //   {!matches && <HomeDesktop user={user} images={images} image={image} />}
    //   {matches && <HomeMobile user={user} images={images} image={image} />}
    // </div>
    <HomeDesktop user={user} images={images} image={image} />
  );
};

export default Home;
