import React, { memo } from 'react';

const Button = ({ handleOnClick, style, children }) => {
  return (
    <button
      type="button"
      className={
        style ? style : 'px-4 py-2 rounded-md text-white bg-main text-semibold'
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
