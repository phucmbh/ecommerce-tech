import React, { useState } from 'react';
import { formatMoney, renderStarFromNumber } from 'utils/helper';
import newImage from 'assets/images/new.png';
import trendingImage from 'assets/images/trending.png';
import { SelectOption } from '..';
import icons from 'utils/icons.util';
import { Link } from 'react-router-dom';
import path from 'utils/path.util';

const { BiMenu, AiFillEye, AiFillHeart } = icons;

function Product({ productData, isNew }) {
  const [isShowOption, setIsShowOption] = useState(false);

  return (
    <div className="w-full text-base px-[10px]  ">
      <Link
        to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.slug}`}
        className="w-full  p-[15px] border flex flex-col items-center"
        onMouseEnter={(e) => setIsShowOption(true)}
        onMouseLeave={(e) => setIsShowOption(false)}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<BiMenu />} />
              <SelectOption icon={<AiFillHeart />} />
            </div>
          )}

          <div className="flex justify-center">
            <img
              src={productData?.thumb || 'https://bom.so/bQTAZK'}
              alt=""
              className="w-[274px] h-[274px] object-cover"
            />
          </div>
          <img
            src={isNew ? newImage : trendingImage}
            alt=""
            className="absolute top-0 right-0 w-[70px] h-[25px] object-cover"
          />
        </div>
        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="line-clamp-1">{productData?.title}</span>
          <span className="flex gap-1 h-4">
            {renderStarFromNumber(productData?.totalRatings)}
          </span>
          <span>{`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
}

export default Product;
