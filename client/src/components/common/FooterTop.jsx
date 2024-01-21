import React, { memo } from 'react';
import icons from 'utils/icons.util';

const { MdEmail } = icons;
const FooterTop = () => {
  return (
    <div className="w-full bg-main h-[100px] flex justify-center text-white">
      <div className="w-main flex justify-between items-center">
        <div className="flex flex-col flex-1 ">
          <span className="text-[20px] font-semibold">
            SIGN UP TO NEWSLETTER
          </span>
          <span className="text-[14px] text-gray-100">
            Subscribe now and receive weekly newsletter
          </span>
        </div>
        <div className="flex-1 flex items-center ">
          <input
            type="text"
            className="p-3  rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-gray-200 placeholder:opacity-50 pr-0"
            placeholder="Email address"
          />
          <div className="bg-[#F04646] rounded-r-full h-[48px] w-[48px] flex justify-center items-center">
            <MdEmail size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FooterTop);
