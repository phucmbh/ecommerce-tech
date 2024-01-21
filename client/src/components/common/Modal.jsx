import React from 'react';

const Modal = ({ children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 bg-black/20`}
    >
      {children}
    </div>
  );
};

export default Modal;
