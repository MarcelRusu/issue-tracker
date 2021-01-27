import React, {useState} from 'react';

import Card from '../misc/Card';
import Button from '../misc/Button';
import Overlay from '../misc/Overlay';
import UserLink from './UserLink';

const DeleteModal = ({onExit, onDelete}) => (
  <Card title='Delete?' className="shadow" onClose={onExit}>
    <p className="text-center">
      Are you sure want to delete?
    </p>
    <span className="flex justify-end footer">
      <Button onClick={onExit}>No</Button>
      <Button type='danger' onClick={onDelete}>
        Yes
      </Button>
    </span>
  </Card>
);

const DetailsModal = ({task, onExit}) => {
  return (
    <Card title={task.title} className="shadow" onClose={onExit}>
      <p>
        <h5>Description:</h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="flex">
        <h5>Assigned:</h5>
        <UserLink user={task.author} />
      </p>
    </Card>
  );
};

const Story = React.forwardRef(({children, onDelete, task, ...props}, ref) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {showDelete &&
        <Overlay onClickOut={() => setShowDelete(false)}>
          <DeleteModal onExit={() => setShowDelete(false)} onDelete={onDelete} />
        </Overlay>
      }
      {showDetails &&
        <Overlay onClickOut={() => setShowDetails(false)}>
          <DetailsModal task={task} onExit={() => setShowDetails(false)} />
        </Overlay>
      }
      <Card
        {...props}
        title={task.title}
        ref={ref}
        onClick={() => setShowDetails(true)}
        onClose={() => setShowDelete(true)}b
      >
        {children}
      </Card>
    </>
  );
});

export default Story;