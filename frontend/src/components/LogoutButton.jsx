import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducer';

const LogoutButton = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(logout())} variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
