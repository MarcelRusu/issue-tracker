import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Story from './Story';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const COLUMNS = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
};

const PRETTY_COLUMN_NAMES = {
  TODO: 'Todo',
  DOING: 'Doing',
  DONE: 'Done'
};

const BoardCol = ({columnType, cards, onCardDelete}) => (
  <Droppable droppableId={columnType}>
    {provided => (
      <div className="mx-5 mb-1 w-1/3 h-full">
        <h1 className="text-center text-xl">
          {PRETTY_COLUMN_NAMES[columnType]}
        </h1>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-300 rounded overflow-scroll shadow-inner"
          style={{height: '98%'}}
        >
          {cards.map(({title, content, id}, i) => (
            <Draggable key={id} draggableId={id} index={i}>
              {(provided, snapshot) => (
                <Story
                  className="m-2"
                  onDelete={() => onCardDelete(id)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  title={title}
                >
                  <p>{content}</p>
                </Story>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export default () => {
  const [cards, setCards] = useState({
    [COLUMNS.TODO]: [],
    [COLUMNS.DOING]: [],
    [COLUMNS.DONE]: []
  });
  useEffect(() => {
    const initCards = Array.from({length: 7}).map((_, i) => ({
      order: i,
      title: `Item #${i + 1}`,
      id: `Item #${i + 1}`,
      content: 'Has to finish this issue tracker'
    }));
    setCards(oldCards => ({...oldCards, [COLUMNS.TODO]: initCards}));
  }, []);

  const handleCardDelete = col => id => {
    setCards(oldCards => ({
      ...oldCards,
      [col]: oldCards[col].filter(c => c.id !== id)
    }));
  }; 
  
  const onDragEnd = result => {
    if (!result.destination) return;
    const col = result.destination.droppableId;
    const oldCol = result.source.droppableId;
    let newCards = {...cards}; // TODO: this should be deep
    if (oldCol === col) {
      newCards[col] = reorder(cards[col], result.source.index, result.destination.index);
    } else {
      const newColCards = cards[col].concat(cards[oldCol][result.source.index]);  
      newCards[col] = reorder(newColCards, newColCards.length - 1, result.destination.index);
      newCards[oldCol].splice(result.source.index, 1);
    }
    setCards(newCards);
  };
  return (
    <div className="flex h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <BoardCol
          onCardDelete={handleCardDelete(COLUMNS.TODO)}
          cards={cards[COLUMNS.TODO]}
          columnType={COLUMNS.TODO}
        />
        <BoardCol
          onCardDelete={handleCardDelete(COLUMNS.DOING)}
          cards={cards[COLUMNS.DOING]}
          columnType={COLUMNS.DOING}
        />
        <BoardCol
          onCardDelete={handleCardDelete(COLUMNS.DONE)}
          cards={cards[COLUMNS.DONE]}
          columnType={COLUMNS.DONE}
        />
      </DragDropContext>
    </div>
  );
};