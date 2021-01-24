import React from 'react';
import './Card.scss';

const Card = React.forwardRef(({title, children, onClose, className, ...props}, ref) => (
  <div {...props} ref={ref} className={`card ${className}`}>
    <div className="header flex justify-between">
      <h3>{title}</h3>
      <a href="#" onClick={onClose} className="text-red-50">x</a>
    </div>
    {children}
  </div>
));

export default Card;