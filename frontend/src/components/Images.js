const Image = ({ image }) => {
  return (
    <div>
      <img src={image.image} alt="" />
    </div>
  );
};

const Images = ({ images }) => {
  return (
    <div className="images">
      {images
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((image) => (
          <Image key={image.id} image={image} />
        ))}
    </div>
  );
};

export default Images;
