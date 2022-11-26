import { useDispatch, useSelector } from 'react-redux';
import { removePost } from '../reducers/postReducer';
import { Link } from 'react-router-dom';
import { ImageList, ImageListItem } from '@mui/material';
import postService from '../services/posts';
import LoginButton from './LoginButton';

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

const Images = () => {
  const dispatch = useDispatch();

  const images = useSelector(({ posts }) => {
    return posts;
  });
  console.log(images);
  const handleClick = (id) => {
    dispatch(removePost(id));
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
