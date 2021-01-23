import React, {useState} from 'react';

import Card from '../misc/Card';

const Overlay = ({show, children, onClickOut}) => (
  <>
    <div onClick={onClickOut} className="absolute z-0 w-screen h-screen bg-gray-500 opacity-30 left-0 top-0" />
    <div className={`absolute w-1/3 z-10 top-1/5 left-1/3 ${!show && 'hidden'}`}>
      {children}
    </div>
  </>
);

export default React.forwardRef(({children, ...props}, ref) => {
  const [showModal, setModal] = useState(false);
  return (
    <>
      {showModal &&
        <Overlay show={showModal} onClickOut={() => setModal(false)}>
          <Card title='Delete?' className="shadow" onClose={() => setModal(false)}>
            Are you sure want to delete? 
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