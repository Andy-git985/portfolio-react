import React, { useState } from 'react';
// import './App.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const DragImages = ({ images, handleOnDragEnd }) => {
  // const [characters, updateCharacters] = useState(finalSpaceCharacters);
  // function handleOnDragEnd(result) {
  //   if (!result.destination) return;
  //   const items = Array.from(characters);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateCharacters(items);
  // }

  return (
    <div className="images App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
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
                            <img src={image} alt={`${title} Thumb`} />
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
    </div>
  );
};

export default DragImages;
