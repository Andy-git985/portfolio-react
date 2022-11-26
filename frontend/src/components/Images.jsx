import { useSelector } from 'react-redux';
const Images = () => {
  const images = useSelector(({ posts }) => {
    return posts;
  });
  return (
    <div className="images">
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

export default Images;
