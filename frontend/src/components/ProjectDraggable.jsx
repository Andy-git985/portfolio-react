import { useDispatch } from 'react-redux';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Container } from '@mui/material';
import { updatePostOrder } from '../reducers/postReducer';

import { styled } from '@mui/material/styles';
const OutlineContainer = styled(Container)(() => ({
  width: 'calc(100vw - 30%)',
  outline: '1px solid blue',
}));

const ProjectDraggable = ({ posts, project }) => {
  const dispatch = useDispatch();
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(posts);
    const startIndex = project.start;

    const [reorderedItem] = items.splice(result.source.index + startIndex, 1);
    items.splice(result.destination.index + startIndex, 0, reorderedItem);
    dispatch(updatePostOrder(items));
    // }
  }

  return (
    <OutlineContainer>
      <header>
        <h1>{project.project}</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {project.values.map(({ id, title, image }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            <img src={image} alt={`${image} Thumb`} />
                          </div>
                          <p>{title}</p>
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

export default ProjectDraggable;
