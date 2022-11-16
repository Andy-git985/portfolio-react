import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <>
      <div>
        <Link to="/">
          <h1>Name</h1>
        </Link>
      </div>
      <div className="options">
        <Link to="/editorial">
          <div>editorial</div>
        </Link>
        <Link to="/advertising">
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
