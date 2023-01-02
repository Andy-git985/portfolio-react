import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import AdminButtons from './AdminButtons';
import { Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageDiv = styled('div')(() => ({
  maxWidth: '750px',
  position: 'relative',
}));

const CustomIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  left: '7.25%',
  top: '1.25%',
  color: 'black',
  backgroundColor: 'grey',
}));

const CustomContainer = styled(Container)(() => ({
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  minHeight: '100vh',
}));

const Image = ({ image, user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Carousel
      autoPlay={false}
      indicators={false}
      next={(next, active) =>
        console.log(`we left ${active}, and are now at ${next}`)
      }
      prev={(prev, active) =>
        console.log(`we left ${active}, and are now at ${prev}`)
      }
    >
      {image.map((i) => {
        return (
          <CustomContainer key={i.id}>
            <ImageDiv>
              <img src={i.image} alt={i.title}></img>
              <CustomIconButton onClick={handleClick}>
                <CloseIcon />
              </CustomIconButton>
              {user.loggedIn && <AdminButtons image={i} id={i.id} />}
            </ImageDiv>
          </CustomContainer>
        );
      })}
    </Carousel>
  );
};
export default Image;
