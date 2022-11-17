import { ImageList, ImageListItem } from '@mui/material';

const Image = ({ image }) => {
  return (
    <div>
      <img src={image.image} alt={image.title} loading="lazy" />
    </div>
  );
};

const Images = ({ images }) => {
  return (
    <ImageList variant="masonry" gap={8} className="images">
      {images
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((image) => (
          <ImageListItem key={image.id}>
            <Image image={image} />
          </ImageListItem>
        ))}
    </ImageList>

    // original html
    // <div className="images">
    //   {images
    //     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    //     .map((image) => (
    //       <Image key={image.id} image={image} />
    //     ))}
    // </div>
  );
};

export default Images;
