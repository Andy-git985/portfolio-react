import Google from '../img/google.png';
import { styled } from '@mui/material/styles';
import userServices from '../services/user';

const Icon = styled('img')(() => ({
  width: '20px',
  height: '20px',
}));

const Button = styled('div')(() => ({
  width: '20px',
  padding: '10px',
  borderRadius: '50px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  backgroundColor: 'black',
}));

const LoginButton = () => {
  const google = async () => {
    const url = await userServices.getLoginUrl();
    console.log(url);
    window.open(url, '_self');
  };

  return (
    <Button onClick={google}>
      <Icon src={Google} alt="" />
    </Button>
  );
};

export default LoginButton;
