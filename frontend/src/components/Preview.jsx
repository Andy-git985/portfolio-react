import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Preview = ({ images, removePreview }) => {
  const flex = {
    display: 'Flex',
    flexWrap: 'Wrap',
    gap: '5px',
    width: '100%',
    outline: '1px solid red',
  };
  const grid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: '5px',
    padding: '.5em',
    outline: '1px solid red',
  };

  const child = {
    position: 'relative',
    // outline: '1px solid red',
    // overflowY: 'unset',
    width: '100px',
    // backgroundColor: 'Red',
    // zIndex: '2',
    flex: '0 1 auto',
  };

  const button = {
    position: 'absolute',
    left: '1.25%',
    top: '1.25%',
    color: 'black',
    backgroundColor: 'rgba(255,255,255,0.5)',
  };

  // const overlay = {
  //   width: '100px',
  //   backgroundColor: 'Red',
  //   zIndex: '2',
  // };

  const parent = {
    outline: '1px solid red',
    // width: '100%',
    backgroundColor: 'blue',
  };

  const handleClick = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    removePreview(updatedImages);
  };

  return (
    <div style={parent}>
      <h5>Preview</h5>
      <div style={flex}>
        {images.map((image, i) => (
          <div key={`image-preview-${i}`} style={child}>
            <img src={image.preview} alt="preview" />
            <IconButton style={button} onClick={() => handleClick(i)}>
              <CloseIcon sx={{ fontSize: 15 }} />
            </IconButton>
            {/* <div style={overlay}></div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preview;
