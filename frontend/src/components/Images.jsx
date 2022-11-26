import { Link } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';

const Image = ({ image }) => {
  return (
    <div>
      <Link to={`/${image.id}`}>
        {' '}
        <img src={image.image} alt={image.title} loading="lazy" />
      </Link>
    </div>
  );
};

const Images = ({ images, removeImage }) => {
  const handleClick = (id) => {
    removeImage(id);
  };

  return (
    <>
      {images.length > 1 ? (
        <ImageList className="images masonry" variant="masonry" gap={8}>
          {images.map((image) => (
            <ImageListItem key={image.id}>
              <Image image={image} />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <div className="images">
          {images.map((image) => (
            <div key={image.id}>
              <Image image={image} />
              <button onClick={() => handleClick(image.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </>

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
