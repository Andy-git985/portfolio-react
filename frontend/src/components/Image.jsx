import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import AdminButtons from './AdminButtons';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageDiv = styled('div')(() => ({
  maxWidth: '750px',
  position: 'relative',
}));
const CustomIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  left: '1.25%',
  top: '1.25%',
  color: 'black',
  backgroundColor: 'grey',
}));

const style = {
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  minHeight: '100vh',
};

const Image = ({ image, user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Carousel autoPlay={false} indicators={false}>
      {image.map((i) => {
        return (
          <div key={i.id} style={style}>
            <ImageDiv>
              <img src={i.image} alt={i.title}></img>
              <CustomIconButton onClick={handleClick}>
                <CloseIcon />
              </CustomIconButton>
              {user.loggedIn && <AdminButtons image={i} id={i.id} />}
            </ImageDiv>
          </div>
        );
      })}
    </Carousel>
  );
};
export default Image;
