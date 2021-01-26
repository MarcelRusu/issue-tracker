import React from 'react';
import './Card.scss';

const Card = React.forwardRef(({title, children, onClose, className, ...props}, ref) => (
  <div {...props} ref={ref} className={`card ${className}`}>
    <div className="header flex justify-between">
      <h3>{title}</h3>
      <a
        href="#"
        className="text-red-50"
        onClick={e => {
          e.stopPropagation();
          onClose && onClose(e);
        }}
      >
        x
      </a>
    </div>
    {children}
  </div>
));

export default Card;