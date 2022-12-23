import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../reducers/userReducer';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <Button onClick={handleClick} variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
