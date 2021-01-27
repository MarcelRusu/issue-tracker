import {useEffect, useState, useContext} from 'react';
import {usePopper} from 'react-popper';

import {DraggingContext} from '../contexts';
import Card from '../misc/Card';
import Overlay from '../misc/Overlay';
import {noProp} from '../misc/utils';

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
        onClick={noProp(() => setShowUser(v => !v))}
        href="#marcel-rusu"
      >
        {user}
      </a>
      {showUser &&
        <Overlay
          invisible={true}
          onClickOut={noProp(() => setShowUser(false))}
        >
          <Card
            {...attributes.popper}
            ref={setPopperElement}
            style={styles.popper}
            onClick={noProp()}
            className="cursor-default w-max"
            title={user}
            onClose={() => setShowUser(false)}
          >
            <p>
              <a href="#tickets">10</a> tickets on <a href="#other-board">5</a> other boards
            </p>
          </Card>
        </Overlay>
      }
    </>
  );
};

export default UserLink;