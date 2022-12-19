import { useDispatch } from 'react-redux';
import '../index.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { updatePostOrder } from '../reducers/postReducer';

import { styled } from '@mui/material/styles';
const OutlineContainer = styled(Container)(() => ({
  width: 'calc(100vw - 30%)',
  outline: '1px solid blue',
}));

const ProjectsDraggable = ({ projects }) => {
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // const items = Array.from(images);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // if (posts !== images) {
    //   items.reverse();
    //   const indexArr = images
    //     .map((i) => posts.findIndex((p) => p.id === i.id))
    //     .reverse();
    //   let updatedPosts = [];
    //   for (let i = 0; i < posts.length; i++) {
    //     if (i === indexArr.at(-1)) {
    //       updatedPosts.push(items.at(-1));
    //       items.pop();
    //       indexArr.pop();
    //     } else {
    //       updatedPosts.push(posts[i]);
    //     }
    //   }
    //   dispatch(updatePostOrder(updatedPosts));
    // } else {
    //   dispatch(updatePostOrder(items));
    // }
    console.log('testing');
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
                {projects.map((e, index) => {
                  return (
                    <Draggable key={index} draggableId={index} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="characters-thumb">
                            <img src={e[0].image} alt={`${e[0].image} Thumb`} />
                            <div>{index}</div>
                          </div>
                          <p>{e[0].project}</p>
                          <button onClick={() => console.log('hello')}>
                            Click Me
                          </button>
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

export default ProjectsDraggable;
