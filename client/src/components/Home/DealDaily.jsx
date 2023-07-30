import React, { useEffect, useState, memo } from 'react';
import icons from '../../utils/icons.util';
import { apiGetProducts } from '../../apis';
import { formatMoney, renderStarFromNumber } from '../../utils/helper';

import { useCountdown } from '../../hook/useCountdown';
import CountDown from './CountDown';

const { BsStarFill, BiMenu } = icons;

const TWO_DAYS_IN_MS = 1 * 24 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();
const dateTimeAfterTwoDays = NOW_IN_MS + 5000;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [days, hours, minutes, seconds] = useCountdown(dateTimeAfterTwoDays);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({ limit: 1, totalRatings: 5 });
    if (response?.success) setDealdaily(response.products[0]);
  };

  useEffect(() => {
    fetchDealDaily();
  }, []);

  if (days + hours + minutes + seconds <= 0) {
    // fetchDealDaily();
  }

  return (
    <div className="border w-full flex-auto">
      <div className="p-4">
        <div className="flex  items-center justify-between">
          <span className="flex-2 ">
            <BsStarFill color="#DD1111" size={20} />
          </span>
          <span className="flex-4 font-bold text-[20px] text-center">
            DEAL DAILY
          </span>
          <span className="flex-2 "></span>
        </div>

        <div className="w-full flex flex-col items-center pt-8 gap-4">
          <img
            src={dealdaily?.thumb || 'https://bom.so/bQTAZK'}
            alt=""
            className="w-full object-cover h-[300px]"
          />
          <span className="line-clamp-1">{dealdaily?.title}</span>
          <span className="flex gap-1 h-4">
            {renderStarFromNumber(dealdaily?.totalRatings, 25)}
          </span>
          <span>{`${dealdaily && formatMoney(dealdaily?.price)} VND`}</span>
        </div>

        <div className="px-4 mt-8">
          <div className="w-full flex justify-between items-center ">
            <CountDown unit={'HOURS'} number={hours} />
            <CountDown unit={'MINUTES'} number={minutes} />
            <CountDown unit={'SECONDS'} number={seconds} />
          </div>

          <button className="w-full flex gap-2 justify-center items-center font-medium mt-5 bg-main text-white hover:bg-black py-2">
            <BiMenu />
            <span>Options</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(DealDaily);
