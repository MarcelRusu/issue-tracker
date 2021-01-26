import React, {useEffect, useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";

import {COLUMNS} from './constants';
import Column from './Column';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Board = () => {
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
        {Object.keys(COLUMNS).map(col => (
          <Column
            key={col}
            onCardDelete={handleCardDelete(COLUMNS[col])}
            cards={cards[COLUMNS[col]]}
            columnType={col}
          />
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;