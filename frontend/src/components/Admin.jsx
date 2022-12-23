import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import UploadForm from './UploadForm';

const Admin = () => {
  return (
    <>
      <LogoutButton />
      <UploadForm />
      <Link to="/edit" state={{ edit: 'all' }}>
        <div>Edit</div>
      </Link>
    </>
  );
};

export default Admin;
