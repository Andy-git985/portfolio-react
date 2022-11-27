import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';

const ImagesContainer = styled('div')(() => ({
  width: '65%',
  flexShrink: '0',
  marginInline: 'auto',
  padding: '1.5em',
}));

const Images = () => {
  const images = useSelector(({ posts }) => {
    return posts;
  });
  return (
    <ImagesContainer>
      {images.map((image) => {
        return (
          <div key={image.id}>
            <img src={image.image} alt={image.title}></img>
          </div>
        );
      })}
    </ImagesContainer>
  );
};

export default Images;
