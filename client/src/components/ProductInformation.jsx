import React, { useState } from 'react';
import { memo } from 'react';
import { productInformation } from '../utils/contants.util';

const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInformation?.map((el) => (
          <span
            key={el.id}
            className={`py-2 px-4 cursor-pointer ${
              activeTab === el.id
                ? 'bg-white border border-b-0'
                : 'bg-slate-100'
            }`}
            onClick={() => setActiveTab(el.id)}
          >
            {el.title}
          </span>
        ))}
      </div>
      <div className="h-[200px] border p-4">
        {productInformation.some((el) => el.id === activeTab) &&
          productInformation.find((el) => el.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
