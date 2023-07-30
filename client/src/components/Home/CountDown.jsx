import React, { memo } from 'react';

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[32%]  h-[60px] flex flex-col justify-center items-center  bg-[#F4F4F4] rounded-sm">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
