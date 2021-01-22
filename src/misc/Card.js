import React from 'react';

import './Card.scss';

export default ({title, children, className}) => (
  <div className={`card ${className}`}>
    <div className="header">
      <h3>{title}</h3>
    </div>
    {children}
  </div>
);