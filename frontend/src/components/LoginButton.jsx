import Google from '../img/google.png';
import styled from 'styled-components';

const Button = styled.div`
  width: 50px;
  padding: 15px;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  background-color: black;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const LoginButton = () => {
  const google = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };
  return (
    <Button onClick={google}>
      <Icon src={Google} alt="" />
    </Button>
  );
};

export default LoginButton;
