import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import AdminButtons from './AdminButtons';

const ImageContainer = styled(Container)(() => ({
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  minHeight: '100vh',
}));
const ImageDiv = styled('div')(() => ({
  maxWidth: '500px',
}));
const Image = ({ image, user }) => {
  return (
    <ImageContainer key={image.id}>
      <ImageDiv>
        <img src={image.image} alt={image.title}></img>
        {user.loggedIn && <AdminButtons id={image.id} />}
      </ImageDiv>
    </ImageContainer>
  );
};
export default Image;
