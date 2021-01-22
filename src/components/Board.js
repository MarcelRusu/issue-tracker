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

export default () => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    const initCards = Array.from({length: 7}).map((_, i) => ({
      order: i,
      col: COLUMNS.TODO,
      title: `Item #${i + 1}`,
      content: 'Has to finish this issue tracker'
    }));
    setCards(initCards);
  }, []);
  
  const onDragEnd = result => {
    if (!result.destination) return;    
    setCards(reorder(cards, result.source.index, result.destination.index));
  };
  return (
    <div className="flex h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (  
            <Col
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {cards.map(({title, content}, i) => (
                <Draggable key={i+''} draggableId={i+''} index={i}>
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
        <Col/>
        <Col/>
      </DragDropContext>
    </div>
  );
};