import { useDispatch, useSelector } from 'react-redux';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { updatePostOrder } from '../reducers/postReducer';
import { Container } from '@mui/material';

import { styled } from '@mui/material/styles';
const OutlineContainer = styled(Container)(() => ({
  width: 'calc(100vw - 30%)',
  outline: '1px solid blue',
}));

const ImagesDraggable = ({ posts, images }) => {
  console.log(images);
  const dispatch = useDispatch();
  // const images = useSelector(({ posts }) => {
  //   return posts;
  // });
  // const postOrder = posts;
  // console.log('posts', posts);
  // console.log('images', images);
  // console.log(posts !== images);
  // const imagesIndexArr = images.map((i) =>
  //   posts.findIndex((p) => p.id === i.id)
  // );
  // console.log(imagesIndexArr);
  // if posts !== images
  // posts map if i = index.arr, item[0] pop else e

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // console.log('items order', items);

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
      // console.log('updated', updatedPosts);
      dispatch(updatePostOrder(updatedPosts));
    } else {
      // console.log('items', items);
      dispatch(updatePostOrder(items));
    }

    // updateCharacters(items);
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
