import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { updatePostOrder } from '../reducers/postReducer';
import { styled } from '@mui/material/styles';

const OutlineContainer = styled(Container)(() => ({
  // width: 'calc(100vw - 30%)',
  outline: '1px solid blue',
}));

const ProjectsDraggable = ({ posts, projects }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    console.log(location);
    console.log(location.state.edit);
  }, [location]);

  console.log(projects);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(posts);
    const startIndex = projects[result.source.index].start;
    const numOfValues = projects[result.source.index].values.length;
    const endIndex = projects[result.destination.index].start;
    const reorderedProjects = items.splice(startIndex, numOfValues);
    items.splice(endIndex, 0, ...reorderedProjects);
    dispatch(updatePostOrder(items));
  }

  return (
    <OutlineContainer>
      <header>
        <h1>Edit All Projects Order</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {projects.map(({ id, title, values }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DragIndicatorIcon />
                          <div className="characters-thumb">
                            <img
                              src={values[0].image}
                              alt={`${values[0].image} Thumb`}
                            />
                          </div>
                          <p>{values[0].title}</p>
                          <Link
                            to={`/edit/projects/${index}`}
                            state={{ edit: 'single project' }}
                          >
                            <Button variant="contained" endIcon={<EditIcon />}>
                              Edit
                            </Button>
                          </Link>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </OutlineContainer>
  );
};

export default ProjectsDraggable;
