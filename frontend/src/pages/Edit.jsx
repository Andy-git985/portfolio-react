import { useSelector } from 'react-redux';
import { useMatch, Link, NavLink, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ImagesDraggable from '../components/ImagesDraggable';
import ProjectsDraggable from '../components/ProjectsDraggable';
import ProjectDraggable from '../components/ProjectDraggable';
import DrawerMenu from '../components/DrawerMenu';
import LogoutButton from '../components/LogoutButton';
import { groupByProj } from '../utils';

const MenuDesktopContainer = styled('div')(() => ({
  width: 'calc(100vw - 70%)',
  height: '100vh',
  outline: '1px solid blue',
  flexShrink: '0',
}));

const MenuFixedContent = styled('div')(() => ({
  position: 'fixed',
  width: 'calc(100vw - 85%)',
  padding: '15px',
  top: '0',
  left: '0',
}));

const activeStyle = {
  color: 'Red',
};

export const MenuDesktop = ({ user }) => {
  return (
    <MenuDesktopContainer>
      <MenuFixedContent>
        <Link to="/">
          <div>Name</div>
        </Link>
        <NavLink
          to="/edit/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>All</div>
        </NavLink>
        <NavLink
          to="/edit/type/editorial"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Editorial</div>
        </NavLink>
        <NavLink
          to="/edit/type/advertising"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Advertising</div>
        </NavLink>
        <NavLink
          to="/edit/projects"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Projects</div>
        </NavLink>
        <div>Contact</div>
        {user.loggedIn && <LogoutButton />}
      </MenuFixedContent>
    </MenuDesktopContainer>
  );
};

const MenuMobileContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '.625rem',
}));

export const MenuMobile = ({ user }) => {
  return (
    <div>
      {/* extra div for now */}
      <MenuMobileContainer>
        <Link to="/edit/">
          <div>Name</div>
        </Link>
        <DrawerMenu />
      </MenuMobileContainer>
      {user.loggedIn && <LogoutButton />}
    </div>
  );
};

const HomeDesktopContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const HomeMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

const HomeDesktop = ({ images, posts, user, projects, project }) => {
  return (
    <HomeDesktopContainer>
      {/* Menu component */}
      <MenuDesktop user={user} />
      <Routes>
        <Route
          path="/"
          element={<ImagesDraggable posts={posts} images={images} />}
        />
        <Route
          path="/type/:type"
          element={<ImagesDraggable posts={posts} images={images} />}
        />
        <Route
          path="/projects"
          element={<ProjectsDraggable posts={posts} projects={projects} />}
        />
        <Route
          path="/projects/:index"
          element={<ProjectDraggable posts={posts} project={project} />}
        />
      </Routes>
    </HomeDesktopContainer>
  );
};

const HomeMobile = ({ images, posts, user }) => {
  return (
    <HomeMobileContainer>
      {/* Menu component */}
      <MenuMobile user={user} />
      <Routes>
        <Route
          path="/"
          element={<ImagesDraggable posts={posts} images={images} />}
        />
        <Route
          path="/type/:type"
          element={<ImagesDraggable posts={posts} images={images} />}
        />
      </Routes>
    </HomeMobileContainer>
  );
};

const Edit = ({ user }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('tablet'));

  const posts = useSelector(({ posts }) => posts);
  // console.log(posts);
  const typeMatch = useMatch('/edit/type/:type');
  const images = typeMatch
    ? posts.filter((p) => p.type === typeMatch.params.type)
    : posts;
  // project testing
  const projects = groupByProj(posts);
  const projectMatch = useMatch('/edit/projects/:id');
  // console.log('projectMatch', projectMatch);
  const project = projectMatch && projects[projectMatch.params.id];

  return (
    <div>
      {!matches && (
        <HomeDesktop
          user={user}
          posts={posts}
          images={images}
          projects={projects}
          project={project}
        />
      )}
      {matches && <HomeMobile user={user} posts={posts} images={images} />}
    </div>
  );
};

export default Edit;
