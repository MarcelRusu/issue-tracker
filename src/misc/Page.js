import React from 'react';

export default ({children}) => (
  <div className="bg-black w-screen h-screen">
    <div className='mx-20 p-5 bg-white h-full'>
      {children}
    </div>
  </div>
);