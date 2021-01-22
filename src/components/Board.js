import React, {useEffect, useState} from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Card from '../misc/Card';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Col = React.forwardRef(({children, ...props}, ref) => (
  <div {...props} ref={ref} className="mx-5 mb-1 bg-gray-300 rounded w-1/3 h-full overflow-scroll py-2" style={{boxShadow: 'inset #00000040 0px 1px 3px 1px'}}>
    {children}
  </div>
));

const COLUMNS = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
};

const BoardCol = ({columnType, cards}) => (
  <Droppable droppableId={columnType}>
    {(provided, snapshot) => (
      <Col
        {...provided.droppableProps}
        ref={provided.innerRef}
        // style={getListStyle(snapshot.isDraggingOver)}
      >
        {cards.map(({title, content, id}, i) => (
          <Draggable key={id} draggableId={id} index={i}>
            {(provided, snapshot) => (
              <Card
                className="m-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                // style={getItemStyle(
                //   snapshot.isDragging,
                //   provided.draggableProps.style
                // )}
                title={title}
              >
                <p>{content}</p>
              </Card>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </Col>
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
          cards={cards[COLUMNS.TODO]}
          columnType={COLUMNS.TODO}
        />
        <BoardCol
          cards={cards[COLUMNS.DOING]}
          columnType={COLUMNS.DOING}
        />
        <BoardCol
          cards={cards[COLUMNS.DONE]}
          columnType={COLUMNS.DONE}
        />
      </DragDropContext>
    </div>
  );
};