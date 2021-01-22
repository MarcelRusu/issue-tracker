import React from 'react';

import './Card.scss';

export default ({title, children}) => (
  <div className="card">
    <div className="header">
      <h3>{title}</h3>
    </div>
    {children}
  </div>
);