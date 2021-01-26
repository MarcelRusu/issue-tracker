import {useEffect, useRef, useState, useContext} from 'react';
import {usePopper} from 'react-popper';

import {DraggingContext} from './board';
import Card from '../misc/Card';

const UserLink = ({user}) => {
  const refElement = useRef(null), popperElement = useRef(null);
  const {styles, attributes} = usePopper(refElement.current, popperElement.current);
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
        ref={refElement}
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
          ref={popperElement}
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