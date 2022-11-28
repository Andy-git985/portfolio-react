import { Drawer, ListItem, ListItemText, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const data = [
  {
    name: 'EDITORIAL',
    route: '/projects/editorial',
  },
  { name: 'ADVERTISING', route: '/projects/advertising' },
];

const Menu = styled('div')(() => ({
  backgroundColor: 'yellow',
  padding: '1em',
}));

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <Menu onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem key={index}>
          {/* <Link to={item.route}> */}
          <ListItemText primary={item.name} />
          {/* </Link> */}
        </ListItem>
      ))}
    </Menu>
  );
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Click me</Button>
      <Drawer open={open} anchor={'top'} onClose={() => setOpen(false)}>
        {getList()}
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
