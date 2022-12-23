import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import { Container, ImageList, ImageListItem } from '@mui/material';

const CustomImageList = styled(ImageList)(() => ({
  // width: 'calc(100vw - 30%)',
  width: '70%',
  flexShrink: '0',
  marginInline: 'auto',
}));

// const CustomImageListItem = styled('div')(() => ({
//   padding: '10px',
// }));
const CustomImageListItem = styled(ImageListItem)(() => ({
  padding: '10px',
}));
// const ImagesDesktopContainer = styled('div')(() => ({
//   width: '65%',
//   flexShrink: '0',
//   marginInline: 'auto',
//   padding: '1.5em',
// }));

const CustomContainer = styled(Container)(() => ({
  paddingTop: '10px',
}));
export const ImagesDesktop = ({ images, user }) => {
  return (
    // <CustomContainer>
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
    // </CustomContainer>

    // <CustomImageList variant="masonry" cols={3} gap={8}>
    //   {images.map((image) => {
    //     return (
    //       <CustomImageListItem key={image.id}>
    //         <Link to={`/${image.id}`}>
    //           <img src={image.image} alt={image.title}></img>
    //         </Link>
    //       </CustomImageListItem>
    //     );
    //   })}
    // </CustomImageList>
  );
};

export const ImagesTablet = ({ images, user }) => {
  return (
    <CustomContainer>
      <Masonry variant="masonry" columns={2} spacing={1}>
        {images.map((image) => {
          return (
            <div key={image.id}>
              <Link to={`/${image.id}`}>
                <img src={image.image} alt={image.title}></img>
              </Link>
            </div>
          );
        })}
      </Masonry>
    </CustomContainer>
    // <CustomImageList variant="masonry" cols={2} gap={8}>
    //   {images.map((image) => {
    //     return (
    //       <CustomImageListItem key={image.id}>
    //         <img src={image.image} alt={image.title}></img>
    //       </CustomImageListItem>
    //     );
    //   })}
    // </CustomImageList>
  );
};

export const ImagesMobile = ({ images, user }) => {
  return (
    <div>
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
    </div>
  );
};
