import React, {useState} from 'react';

import Card from '../misc/Card';
import Button from '../misc/Button';

const Overlay = ({show, children, onClickOut}) => (
  <>
    <div
      onClick={onClickOut}
      className="absolute z-0 w-screen h-screen bg-gray-500 opacity-30 left-0 top-0"
    />
    <div className={`absolute w-1/5 z-10 top-1/5 ${!show && 'hidden'}`} style={{left: '40%'}}>
      {children}
    </div>
  </>
);

export default React.forwardRef(({children, onDelete, ...props}, ref) => {
  const [showModal, setModal] = useState(false);
  return (
    <>
      {showModal &&
        <Overlay show={showModal} onClickOut={() => setModal(false)}>
          <Card title='Delete?' className="shadow" onClose={() => setModal(false)}>
            <p className="text-center">
              Are you sure want to delete?
            </p>
            <span className="flex justify-end footer">
              <Button onClick={() => setModal(false)}>No</Button>
              <Button type='danger' onClick={onDelete}>
                Yes
              </Button>
            </span>
          </Card>  
        </Overlay>  
      }
      <Card
        {...props}
        ref={ref}
        onClose={() => setModal(true)}
      >
        {children}
      </Card>
    </>
  );
});