import React, { memo } from 'react';
import logo from '/images/logo.png';
import icons from '../utils/icons.util';
import { Link } from 'react-router-dom';
import path from '../utils/path.util';

const { RiPhoneFill, MdEmail, BsFillCartFill, FaUserCircle } = icons;
const Header = () => {
  return (
    <div className=" w-main h-[110px] py-[35px] flex justify-between">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className=" flex text-[13px]">
        <div className="border-r flex flex-col items-center px-6 ">
          <span className="flex gap-4 items-center">
            <span>
              <RiPhoneFill color="red" />
            </span>
            <span className="font-semibold"> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="border-r flex flex-col items-center px-6">
          <span className="flex gap-4 items-center">
            <span>
              <MdEmail color="red" />
            </span>
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="border-r flex items-center justify-center gap-2 px-6">
          <BsFillCartFill />
          <span>0 item</span>
        </div>
        <div className="border-r flex items-center justify-center px-6">
          <FaUserCircle />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
