import {Droppable, Draggable} from 'react-beautiful-dnd';
import './Column.scss';

import Story from '../Story';
import {COLUMNS} from './constants';
import UserLink from '../UserLink';

const Column = ({columnType, tasks, onDelete}) => (
  <Droppable droppableId={COLUMNS[columnType]}>
    {provided => (
      <div className="mx-5 mb-1 w-1/3">
        <h1 className="text-center text-xl">
          {COLUMNS[columnType]}
        </h1>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="bg-gray-300 rounded overflow-scroll shadow-inner board-col"
        >
          {tasks.map(({title, content, author, id}, i) => (
            <Draggable key={id} draggableId={id} index={i}>
              {provided => (
                <Story
                  className="m-2"
                  onDelete={() => onDelete(id)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  task={{title, content, author}}
                >
                  <p>{content}</p>
                  <UserLink user={author}>
                    {author}
                  </UserLink>
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

export default Column;