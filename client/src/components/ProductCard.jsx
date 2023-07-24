import React from 'react';
import { formatMoney, renderStarFromNumber } from '../utils/helper';
const ProductCard = ({ title, price, thumb, totalRatings }) => {
  return (
    <div className="w-1/3  p-[10px]">
      <div className="flex-auto border flex ">
        <img src={thumb} alt="" className="w-[90px] object-contain p-4" />

        <div className="flex flex-col my-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1 capitalize">{title}</span>
          <span className="flex gap-1 h-4">
            {renderStarFromNumber(totalRatings, 14)}
          </span>
          <span>{`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
