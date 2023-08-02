import React, { Children, useEffect, useState } from 'react';
import { memo, useCallback } from 'react';
import { productInformation } from '../../utils/contants.util';
import Ratings from './Ratings';
import { useDispatch } from 'react-redux';

const ProductInformation = ({ children }) => {
  const [activeTab, setActiveTab] = useState(5);

  return (
    <div className="w-main m-auto mt-10">
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
        <div
          className={`py-2 px-4 cursor-pointer ${
            activeTab === 5 ? 'bg-white border border-b-0' : 'bg-slate-100'
          }`}
          onClick={() => setActiveTab(5)}
        >
          CUSTOM REVIEWS
        </div>
      </div>
      <div className=" border p-10">
        {productInformation.find((el) => el.id === activeTab)?.content}

        {activeTab === 5 && <>{children}</>}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
