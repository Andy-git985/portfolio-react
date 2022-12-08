import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

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

export const ImagesDesktop = () => {
  const images = useSelector(({ filter, posts }) => {
    if (filter === null) {
      return posts;
    }
    return posts.filter((p) => p.project === filter);
  });
  return (
    <CustomImageList variant="masonry" cols={3} gap={8}>
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

export const ImagesTablet = () => {
  const images = useSelector(({ filter, posts }) => {
    if (filter === null) {
      return posts;
    }
    return posts.filter((p) => p.project === filter);
  });
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

export const ImagesMobile = () => {
  const images = useSelector(({ filter, posts }) => {
    if (filter === null) {
      return posts;
    }
    return posts.filter((p) => p.project === filter);
  });
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
