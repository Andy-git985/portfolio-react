import { styled } from '@mui/material/styles';
import DrawerMenu from './DrawerMenu';

const MenuContainer = styled('ul')(() => ({
  display: 'flex',
  background: '#000',
  flexDirection: 'column',
  padding: '8px',
}));

const DesktopMenuContainer = styled(MenuContainer)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
}));
const MenuItem = styled('li')(() => ({
  padding: '4px',
}));

export const MenuDesktop = () => {
  return (
    <DesktopMenuContainer>
      <MenuItem>Home</MenuItem>
      <MenuItem>About</MenuItem>
      <MenuItem>Contact</MenuItem>
    </DesktopMenuContainer>
  );
};

const Bar = styled('div')(() => ({
  content: "''",
  width: '30px',
  border: '1px solid #00adb5',
  margin: '4px',
}));

const MenuMobileContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '.625rem',
}));

export const MenuMobile = () => {
  return (
    <>
      {/* extra div for now */}
      <MenuMobileContainer>
        <div>Name</div>
        <DrawerMenu />
      </MenuMobileContainer>
    </>
  );
};
