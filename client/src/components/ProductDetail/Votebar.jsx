import { useEffect, useRef } from 'react';
import icons from '../../utils/icons.util';

const Votebar = ({ number, ratingCount = 0, ratingTotal }) => {
  const { BsStarFill } = icons;
  const percenRef = useRef();

  useEffect(() => {
    percenRef.current.style.cssText = `right: ${
      100 - Math.round((ratingCount * 100) / ratingTotal)
    }%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2  ">
      <div className="flex w-[10%] items-center justify-center gap-2 text-sm">
        <span className="font-semibold">{number}</span>
        <span>
          <BsStarFill color="orange" />
        </span>
      </div>
      <div className="w-[75%]">
        <div className="relative w-full bg-gray-200 h-2 rounded ">
          <div
            ref={percenRef}
            className="absolute inset-0 bg-main rounded"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-center">
        <span className="text-sm text-gray-500">{`${ratingCount} reviews`}</span>
      </div>
    </div>
  );
};
export default Votebar;
