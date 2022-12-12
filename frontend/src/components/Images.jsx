import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Masonry from '@mui/lab/Masonry';
import { ImageList, ImageListItem } from '@mui/material';

const CustomImageList = styled(ImageList)(() => ({
  width: 'calc(100vw - 30%)',
  flexShrink: '0',
  marginInline: 'auto',
}));

const CustomImageListItem = styled(ImageListItem)(() => ({
  padding: '10px',
}));
// const ImagesDesktopContainer = styled('div')(() => ({
//   width: '65%',
//   flexShrink: '0',
//   marginInline: 'auto',
//   padding: '1.5em',
// }));

export const ImagesDesktop = ({ images }) => {
  return (
    <Masonry variant="masonry" columns={3} spacing={2}>
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

export const ImagesTablet = ({ images }) => {
  return (
    <CustomImageList variant="masonry" cols={2} gap={8}>
      {images.map((image) => {
        return (
          <CustomImageListItem key={image.id}>
            <img src={image.image} alt={image.title}></img>
          </CustomImageListItem>
        );
      })}
    </CustomImageList>
  );
};

export const ImagesMobile = ({ images }) => {
  return (
    <div>
      {images.map((image) => {
        return (
          <div key={image.id}>
            <img src={image.image} alt={image.title}></img>
          </div>
        );
      })}
    </div>
  );
};
