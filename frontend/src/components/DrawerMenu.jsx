import { Drawer, ListItem, ListItemText, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const data = [
  {
    name: 'EDITORIAL',
    route: '/project/editorial',
  },
  { name: 'ADVERTISING', route: '/project/advertising' },
];

const Menu = styled('div')(() => ({
  backgroundColor: 'yellow',
  padding: '1em',
}));

const activeStyle = {
  color: 'Red',
};

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const getList = () => (
    <Menu onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem key={index}>
          <NavLink
            to={item.route}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <ListItemText primary={item.name} />
          </NavLink>
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
