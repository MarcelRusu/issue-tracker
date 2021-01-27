import {useContext, useState} from 'react';

import Overlay from '../misc/Overlay'
import Card from '../misc/Card';
import Button from '../misc/Button';

import {TasksContext} from '../contexts';
import {reorder} from '../misc/utils';
import {COLUMNS} from './board/constants';

const NewTask = ({onClose}) => {
  const {setTasks} = useContext(TasksContext);
  const [{title, description, author}, setTask] = useState({
    title: '',
    description: '',
    author: ''
  });

  const onSave = () => {
    setTasks(oldTasks => ({
      ...oldTasks,
      [COLUMNS.TODO]: reorder(oldTasks[COLUMNS.TODO].concat({
        order: oldTasks[COLUMNS.TODO].length + 1,
        title,
        description,
        author,
        id: String(oldTasks[COLUMNS.TODO].length + 1)
      }), oldTasks[COLUMNS.TODO].length, 0)
    }));
    onClose();
  };

  return (
    <Overlay onClickOut={onClose}>
      <Card title="Create a new task..." onClose={onClose}>
        <input
          onChange={e => setTask(t => ({...t, title: e.target.value}))}
          value={title}
          placeholder="title" />
        <input
          onChange={e => setTask(t => ({...t, description: e.target.value}))}
          value={description}
          placeholder="description" />
        <input
          onChange={e => setTask(t => ({...t, author: e.target.value}))}
          value={author}
          placeholder="author" />
        <div className="flex justify-between">
          <Button type="danger" onClick={onClose}>
            Cancel  
          </Button>  
          <Button onClick={onSave}>
            Save
          </Button>
        </div>
      </Card>
    </Overlay>
  );
};

export default NewTask;