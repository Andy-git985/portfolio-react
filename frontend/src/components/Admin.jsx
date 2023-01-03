import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Modal } from '@mui/material/';
import LogoutButton from './LogoutButton';
import UploadForm from './UploadForm';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   maxWidth: 750,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };
const Admin = () => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <>
      <LogoutButton />
      {/* <Button onClick={handleOpen} variant="contained">
        Upload Form
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadForm />
        </Box>
      </Modal> */}
      <UploadForm />
      <Link to="/edit" state={{ edit: 'all' }}>
        <div>Edit</div>
      </Link>
    </>
  );
};

export default Admin;
