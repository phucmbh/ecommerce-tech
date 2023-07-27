import React, { memo } from 'react';
icons
import icons from '../utils/icons.util';

const { FiMinus, FiPlus } = icons

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className='flex'>
      <span
        onClick={() => handleChangeQuantity('minus')}
        className=" p-2 border-r border-black cursor-pointer"
      >
        <FiMinus />
      </span>
      <input
        type="text"
        className=" py-2 outline-none w-[50px] text-center"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        onClick={() => handleChangeQuantity('plus')}
        className="text p-2 border-l border-black cursor-pointer"
      >
        <FiPlus />
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
