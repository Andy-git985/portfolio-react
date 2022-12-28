import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import { Container, ImageList, ImageListItem } from '@mui/material';

const CustomContainer = styled(Container)(() => ({
  marginTop: '1rem',
}));

export const ImagesDesktop = ({ images, user }) => {
  return (
    <Masonry
      variant="masonry"
      columns={{ mobile: 1, tablet: 1, laptop: 2, desktop: 3 }}
      spacing={1}
    >
      {images.map((image) => {
        return (
          <div key={image.id}>
            {user.loggedIn ? (
              <Link to={`/${image.id}`}>
                <img src={image.image} alt={image.title}></img>
              </Link>
            ) : (
              <img src={image.image} alt={image.title}></img>
            )}
          </div>
        );
      })}
    </Masonry>
  );
};

export const ImagesMobile = ({ images, user }) => {
  return (
    <div>
      {images.map((image) => {
        return (
          <CustomContainer key={image.id}>
            {user.loggedIn ? (
              <Link to={`/${image.id}`}>
                <img src={image.image} alt={image.title}></img>
              </Link>
            ) : (
              <img src={image.image} alt={image.title}></img>
            )}
          </CustomContainer>
        );
      })}
    </div>
  );
};
