import React, { useState } from 'react';

import Page from './misc/Page';
import Board from './components/board';
import Button from './misc/Button';
import UserLink from './components/UserLink';
import {COLUMNS} from './components/board/constants';

export const TasksContext = React.createContext({
  tasks: [],
  setTasks: () => {}
});

const App = () => {
  const [tasks, setTasks] = useState({
    [COLUMNS.TODO]: [],
    [COLUMNS.DOING]: [],
    [COLUMNS.DONE]: []
  });
  return (
    <TasksContext.Provider value={{tasks, setTasks}}>
      <Page>
        <header className="flex justify-between align-middle">
          <div className="flex flex-col">
            <UserLink user={'Marcel Rusu'} />
            <Button>New</Button>
          </div>
          <div className="flex flex-col">
            <h1 className="text-5xl text-center">
              eFocus
            </h1>
            <div className="muted">
              The best issue tracker on the web!
            </div>
          </div>
          <Button className="justify-right">
            Sign Out
          </Button>
        </header>
        <hr className="my-5"/>
        <Board />
      </Page>
    </TasksContext.Provider>
  );
}

export default App;
