import React, {useContext, useState} from 'react';
import {DragDropContext} from "react-beautiful-dnd";

import {COLUMNS} from './constants';
import Column from './Column';
import {TasksContext, DraggingContext} from '../../contexts';

import {reorder} from '../../misc/utils'


const Board = () => {  
  const {tasks, setTasks} = useContext(TasksContext);
  const [isDragging, setDragging] = useState(false);

  const handleStoryDelete = col => id => {
    setTasks(oldStory => ({
      ...oldStory,
      [col]: oldStory[col].filter(c => c.id !== id)
    }));
  }; 
  
  const onDragEnd = result => {
    setDragging(false);
    if (!result.destination) return;
    const col = result.destination.droppableId;
    const oldCol = result.source.droppableId;
    let newTasks = {...tasks}; // TODO: this should be deep
    if (oldCol === col) {
      newTasks[col] = reorder(tasks[col], result.source.index, result.destination.index);
    } else {
      const newColStories = tasks[col].concat(tasks[oldCol][result.source.index]);  
      newTasks[col] = reorder(newColStories, newColStories.length - 1, result.destination.index);
      newTasks[oldCol].splice(result.source.index, 1);
    }
    setTasks(newTasks);
  };

  return (
    <DraggingContext.Provider value={isDragging}>
      <div className="flex" style={{height: '83%'}}>
        <DragDropContext onDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
          {Object.keys(COLUMNS).map(col => (
            <Column
              key={col}
              onDelete={handleStoryDelete(COLUMNS[col])}
              tasks={tasks[COLUMNS[col]]}
              columnType={col}
            />
          ))}
        </DragDropContext>
      </div>
    </DraggingContext.Provider>
  );
};

export default Board;