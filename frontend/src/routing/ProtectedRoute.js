import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const ProtectedRoute = () => {
  const loggedIn = useSelector(({ user }) => user.loggedIn);
  if (!loggedIn) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <Button variant="contained">
          <NavLink to="/">Home</NavLink>
        </Button>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
