const Preview = ({ images }) => {
  const flex = {
    width: 'calc(100vw - 95%)',
    display: 'Flex',
    flexWrap: 'Wrap',
    gap: '2px',
  };
  const style = {
    width: '100px',
  };
  return (
    <>
      <h5>Preview</h5>
      <div style={flex}>
        {images.map((image, i) => (
          <div key={`image-preview-${i}`}>
            <img src={image} alt="preview" style={style} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Preview;
