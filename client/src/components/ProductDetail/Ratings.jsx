import { memo, useCallback, useState } from 'react';
import Button from '../Button';
import Votebar from './Votebar';
import { renderStarFromNumber } from '../../utils/helper';
import Modal from './Modal';
import VoteOption from './VoteOption';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import path from '../../utils/path.util';
import Swal from 'sweetalert2';
import Comment from './Comment';

const Ratings = ({ product, children, handleRateNow }) => {
  

  return (
    <div>
      <div className="flex border rounded-3xl">
        <div className="flex-4  flex flex-col items-center justify-center gap-2">
          <span className="font-semibold text-2xl">{`${product?.totalRatings}/5`}</span>
          <span className="flex gap-3">
            {renderStarFromNumber(product?.totalRatings, 20)}
          </span>
          <div className="flex gap-2 items-center text-lg">
            <span className="font-semibold">{product?.ratings.length}</span>
            <span className="text-gray-500">reviewers and commentors</span>
          </div>
        </div>

        <div className="flex-6 border-l flex flex-col gap-2 p-4">
          {Array.from(Array(5).keys())
            .reverse()
            .map((el) => (
              <Votebar
                key={el}
                number={el + 1}
                ratingCount={
                  product?.ratings.filter((r) => r.star === el + 1).length
                }
                ratingTotal={product?.ratings.length}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-5">
        <span>How would you rate this product?</span>

        <Button
          handleOnClick={handleRateNow}
          style={'px-4 py-2 rounded-md text-white bg-main text-bold w-[200px]'}
        >
          Rate now
        </Button>

        {children}
      </div>
    </div>
  );
};
export default memo(Ratings);
