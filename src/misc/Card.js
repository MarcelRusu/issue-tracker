import React from 'react';

import './Card.scss';

export default React.forwardRef(({title, children, className, ...props}, ref) => (
  <div {...props} ref={ref} className={`card ${className}`}>
    <div className="header">
      <h3>{title}</h3>
    </div>
    {children}
  </div>
));