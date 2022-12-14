import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Preview = ({ images, removePreview }) => {
  const flex = {
    width: 'calc(100vw - 95%)',
    display: 'Flex',
    flexWrap: 'Wrap',
    gap: '5px',
  };

  const container = {
    position: 'relative',
    outline: '1px solid red',
    overflowY: 'unset',
    width: '100px',
    // backgroundColor: 'Red',
    // zIndex: '2',
  };

  const button = {
    position: 'absolute',
    left: '95%',
    top: '-9%',
  };

  // const overlay = {
  //   width: '100px',
  //   backgroundColor: 'Red',
  //   zIndex: '2',
  // };

  const handleClick = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    removePreview(updatedImages);
  };

  return (
    <>
      <h5>Preview</h5>
      <div style={flex}>
        {images.map((image, i) => (
          <div key={`image-preview-${i}`} style={container}>
            <img src={image.preview} alt="preview" />
            <IconButton style={button} onClick={() => handleClick(i)}>
              <CloseIcon />
            </IconButton>
            {/* <div style={overlay}></div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Preview;
