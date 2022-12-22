import { useSelector } from 'react-redux';
import { useMatch, Link, NavLink, Routes, Route } from 'react-router-dom';
import { useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import ImagesDraggable from '../components/ImagesDraggable';
import ProjectsDraggable from '../components/ProjectsDraggable';
import ProjectDraggable from '../components/ProjectDraggable';
import DrawerMenu from '../components/DrawerMenu';
import LogoutButton from '../components/LogoutButton';
import { groupByProj } from '../utils';

const MenuDesktopContainer = styled('div')(() => ({
  // width: 'calc(100vw - 70%)',
  // height: '100vh',
  // outline: '1px solid blue',
  // flexShrink: '0',
  position: 'sticky',
  top: '1rem',
  backgroundColor: 'yellow',
}));

const MenuFixedContent = styled('div')(() => ({
  // position: 'fixed',
  // width: 'calc(100vw - 85%)',
  // padding: '15px',
  // top: '0',
  // left: '0',
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
          state={{ edit: 'all' }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>All</div>
        </NavLink>
        <NavLink
          to="/edit/type/editorial"
          state={{ edit: 'editorial' }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Editorial</div>
        </NavLink>
        <NavLink
          to="/edit/type/advertising"
          state={{ edit: 'advertising' }}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <div>Advertising</div>
        </NavLink>
        <NavLink
          to="/edit/projects"
          state={{ edit: 'all projects' }}
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

const EditDesktopContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const EditMobileContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

const padding = {
  padding: '.5em',
};

const EditDesktop = ({ images, posts, user, projects, project }) => {
  return (
    <Grid container columns={10}>
      <Grid item mobile={10} tablet={3}>
        <MenuDesktop user={user} />
      </Grid>
      <Grid item mobile={10} tablet={7} style={padding}>
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
            element={<ImagesDraggable posts={posts} images={project} />}
          />
        </Routes>
      </Grid>
    </Grid>
    //     <EditDesktopContainer>
    //   {/* Menu component */}
    //   <MenuDesktop user={user} />
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={<ImagesDraggable posts={posts} images={images} />}
    //     />
    //     <Route
    //       path="/type/:type"
    //       element={<ImagesDraggable posts={posts} images={images} />}
    //     />
    //     <Route
    //       path="/projects"
    //       element={<ProjectsDraggable posts={posts} projects={projects} />}
    //     />
    //     <Route
    //       path="/projects/:index"
    //       element={<ProjectDraggable posts={posts} project={project} />}
    //     />
    //   </Routes>
    // </EditDesktopContainer>
  );
};

const EditMobile = ({ images, posts, user }) => {
  return (
    <EditMobileContainer>
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
    </EditMobileContainer>
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
        <EditDesktop
          user={user}
          posts={posts}
          images={images}
          projects={projects}
          project={project}
        />
      )}
      {matches && <EditMobile user={user} posts={posts} images={images} />}
    </div>
  );
};

export default Edit;
