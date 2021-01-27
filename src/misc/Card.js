import React from 'react';
import './Card.scss';

import {noProp} from './utils';

const Card = React.forwardRef(({title, children, onClose, className, ...props}, ref) => (
  <div {...props} ref={ref} className={`card ${className}`}>
    <div className="header flex justify-between">
      <h3>{title}</h3>
      <a
        href="#"
        className="text-red-50"
        onClick={noProp(onClose)}
      >
        x
      </a>
    </div>
    {children}
  </div>
));

export default Card;