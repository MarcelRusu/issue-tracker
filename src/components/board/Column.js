import {Droppable, Draggable} from 'react-beautiful-dnd';
import './Column.scss';

import Story from '../Story';
import {COLUMNS} from './constants';


const BoardColumn = ({columnType, cards, onCardDelete}) => (
  <Droppable droppableId={columnType}>
    {provided => (
      <div className="mx-5 mb-1 w-1/3 h-full">
        <h1 contentEditable className="text-center text-xl">
          {COLUMNS[columnType]}
        </h1>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-300 rounded overflow-scroll shadow-inner board-col"
        >
          {cards.map(({title, content, id}, i) => (
            <Draggable key={id} draggableId={id} index={i}>
              {provided => (
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

export default BoardColumn;