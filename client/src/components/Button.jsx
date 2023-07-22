import React, { memo } from 'react';

const Button = ({ name, handleOnClick, style, iconBefore, iconAfter }) => {
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
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default memo(Button);
