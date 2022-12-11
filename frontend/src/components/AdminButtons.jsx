import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removePost } from '../reducers/postReducer';
const AdminButtons = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(removePost(id));
    navigate('/');
  };
  return (
    <div>
      <Button variant="contained">Update</Button>
      <Button variant="contained" onClick={handleClick}>
        Delete
      </Button>
    </div>
  );
};
export default AdminButtons;
