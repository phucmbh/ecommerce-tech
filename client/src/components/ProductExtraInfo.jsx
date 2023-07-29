import React from 'react';
import { memo } from 'react';

const ProductExtraInfo = ({ title, icon, sub }) => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center  mb-4 border p-2 gap-3">
        <span className="w-[38px] h-[38px] rounded-full bg-slate-600 flex items-center justify-center text-white text-lg">
          {icon}
        </span>
        <div className="flex flex-col">
          <span>{title}</span>
          <span className="text-sm opacity-50">{sub}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfo);
