import React, {useState, useEffect} from 'react';

import Page from './misc/Page';
import Button from './misc/Button';

import Board from './components/board';
import UserLink from './components/UserLink';
import NewTask from './components/NewTask';

import {COLUMNS} from './components/board/constants';
import {TasksContext} from './contexts';

const App = () => {
  const [tasks, setTasks] = useState({
    [COLUMNS.TODO]: [],
    [COLUMNS.DOING]: [],
    [COLUMNS.DONE]: []
  });
  useEffect(() => {
    const initStories = Array.from({length: 7}).map((_, i) => ({
      order: i,
      title: `Item #${i + 1}`,
      id: `${i + 1}`,
      description: 'Has to finish this issue tracker',
      author: 'Marcel Rusu'
    }));
    setTasks(oldStories => ({...oldStories, [COLUMNS.TODO]: initStories}));
  }, []);

  const [showNewTask, setShowNewTask] = useState(false);

  return (
    <TasksContext.Provider value={{tasks, setTasks}}>
      <Page>
        <header className="flex justify-between align-middle">
          <div className="flex flex-col">
            <UserLink user={'Marcel Rusu'} />
            <Button onClick={() => setShowNewTask(true)}>New</Button>
            {showNewTask &&
              <NewTask onClose={() => setShowNewTask(false)} />
            }
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
