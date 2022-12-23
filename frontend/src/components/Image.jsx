import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminButtons from './AdminButtons';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageContainer = styled(Container)(() => ({
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  minHeight: '100vh',
}));
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
const Image = ({ image, user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <ImageContainer key={image.id}>
      <ImageDiv>
        <img src={image.image} alt={image.title}></img>
        <CustomIconButton onClick={handleClick}>
          <CloseIcon />
        </CustomIconButton>
        {user.loggedIn && <AdminButtons image={image} id={image.id} />}
      </ImageDiv>
    </ImageContainer>
  );
};
export default Image;
