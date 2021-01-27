import React from 'react';

export const TasksContext = React.createContext({
  tasks: [],
  setTasks: () => {}
});

export const DraggingContext = React.createContext(false);