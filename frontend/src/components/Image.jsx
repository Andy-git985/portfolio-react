const Image = ({ image }) => {
  return (
    <div key={image.id}>
      <h1>{image.title}</h1>
      <img src={image.image} alt={image.title}></img>
    </div>
  );
};
export default Image;
