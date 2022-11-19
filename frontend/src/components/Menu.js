import { Link } from 'react-router-dom';
import DrawerMenu from './DrawerMenu';

const Menu = () => {
  return (
    <>
      <div>
        <Link to="/" className="flex-menu">
          <div>
            <h1>Name</h1>
          </div>
          <div className="menu-btn">
            <DrawerMenu />
          </div>
        </Link>
      </div>
      <div className="options">
        <Link to="/projects/editorial">
          <div>editorial</div>
        </Link>
        <Link to="/projects/advertising">
          <div>advertising</div>
        </Link>
        <div>video</div>
        <div>photo diary</div>
        <div>contact</div>
      </div>
    </>
  );
};

export default Menu;
