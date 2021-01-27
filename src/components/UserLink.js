import {useEffect, useState, useContext} from 'react';
import {usePopper} from 'react-popper';

import {DraggingContext} from './board';
import Card from '../misc/Card';

const UserLink = ({user}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const {styles, attributes} = usePopper(referenceElement, popperElement);
  const [showUser, setShowUser] = useState(false);
  const isDragging = useContext(DraggingContext)  
  useEffect(() => {
    if (isDragging) {
      setShowUser(false);
    }
  }, [isDragging]);

  return (
    <>
      <a
        ref={setReferenceElement}
        className="unset"
        onClick={e => {
          e.stopPropagation();
          setShowUser(v => !v);
        }}
        href="#marcel-rusu"
      >
        {user}
      </a>
      {showUser &&
        <Card
          {...attributes.popper}
          ref={setPopperElement}
          style={styles.popper}
          className="cursor-default"
          onClick={e => e.stopPropagation()}
          title={user}
          onClose={() => setShowUser(false)}
        >
          <p>
            <a href="#tickets">10</a> tickets on <a href="#other-board">5</a> other boards
          </p>
        </Card>
      }
    </>
  );
}

export default UserLink;