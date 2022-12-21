import { useDispatch, useSelector } from 'react-redux';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updatePostOrder } from '../reducers/postReducer';
import { Container } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { styled } from '@mui/material/styles';

const OutlineContainer = styled(Container)(() => ({
  width: 'calc(100vw - 30%)',
  outline: '1px solid blue',
}));

const ImagesDraggable = ({ posts, images }) => {
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (posts !== images) {
      items.reverse();
      const indexArr = images
        .map((i) => posts.findIndex((p) => p.id === i.id))
        .reverse();
      let updatedPosts = [];
      for (let i = 0; i < posts.length; i++) {
        if (i === indexArr.at(-1)) {
          updatedPosts.push(items.at(-1));
          items.pop();
          indexArr.pop();
        } else {
          updatedPosts.push(posts[i]);
        }
      }
      dispatch(updatePostOrder(updatedPosts));
    } else {
      // console.log('items', items);
      dispatch(updatePostOrder(items));
    }
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
                          <DragIndicatorIcon />
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

export default ImagesDraggable;
