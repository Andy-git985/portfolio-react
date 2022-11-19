import { Drawer, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const data = [
  {
    name: 'EDITORIAL',
    route: '/projects/editorial',
  },
  { name: 'ADVERTISING', route: '/projects/advertising' },
];

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const Menu = styled.div`
    background-color: yellow;
    padding: 1em;
  `;

  const getList = () => (
    <Menu onClick={() => setOpen(false)}>
      {data.map((item, index) => (
        <ListItem key={index}>
          <Link to={item.route}>
            <ListItemText primary={item.name} />
          </Link>
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
