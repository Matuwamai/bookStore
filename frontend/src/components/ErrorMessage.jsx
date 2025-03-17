import React, { useState } from 'react';

const ErrorMessage = ({message}) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
      <div className='bg-red-100 p-4 relative rounded-lg border-l-4 border-red-500 my-2'>
        <span
          className='absolute text-xl top-0 right-0 p-2 cursor-pointer'
          onClick={handleClose}>
          &times;
        </span>
        <p className='text-sm text-red-400 font-semibold'>{message}</p>
      </div>
    );
};

export default ErrorMessage;