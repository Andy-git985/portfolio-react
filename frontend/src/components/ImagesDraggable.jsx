import { useDispatch, useSelector } from 'react-redux';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updatePostOrder } from '../reducers/postReducer';

import { styled } from '@mui/material/styles';
const OutlineContainer = styled('div')(() => ({
  outline: '1px solid blue',
}));

const ImagesDraggable = () => {
  const dispatch = useDispatch();
  const images = useSelector(({ posts }) => {
    return posts;
  });

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    // updateCharacters(items);
    dispatch(updatePostOrder(items));
  }

  return (
    <OutlineContainer>
      <header>
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="images">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map(({ id, title, image }, index) => {
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
                            <div>{id}</div>
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
      <p>
        Images from{' '}
        <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
          Final Space Wiki
        </a>
      </p>
    </OutlineContainer>
  );
};

export default ImagesDraggable;
