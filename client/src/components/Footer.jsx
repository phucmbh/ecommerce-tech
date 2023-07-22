import React, { memo } from 'react';
import icons from '../utils/icons.util';

const {
  RiPhoneFill,
  MdEmail,
  FaMapMarkerAlt,
  FaFacebookF,
  BsTwitter,
  BsGoogle,
  FaLinkedinIn,
  FaFlickr,
} = icons;
const Footer = () => {
  return (
    <div className="w-full bg-[#191919] h-[400px] flex flex-col items-center justify-between text-white">
      <div className="w-main flex mt-[50px]">
        <div className="flex-2 flex flex-col gap-2 ">
          <h3 className="font-medium border-l-2 border-main text-[15px] pl-[15px] mb-[20px]">
            ABOUT US
          </h3>
          <div className="flex items-center gap-1 ">
            <FaMapMarkerAlt />

            <span>Address: </span>
            <span className="opacity-70">
              474 Ontario St Toronto, ON M4X 1M7 Canada
            </span>
          </div>
          <div className="flex items-center gap-1 ">
            <RiPhoneFill />
            <span>Phone: </span>
            <span className="opacity-70">(+1234)56789xxx</span>
          </div>
          <div className="flex items-center gap-1 ">
            <MdEmail />
            <span>Mail: </span>
            <span className="opacity-70">tadathemes@gmail.com</span>
          </div>

          <div className=" flex gap-2 mt-4">
            <div className="w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded">
              <FaFacebookF />
            </div>
            <div className="w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded">
              <BsTwitter />
            </div>
            <div className="w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded">
              <BsGoogle />
            </div>
            <div className="w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded">
              <FaLinkedinIn />
            </div>
            <div className="w-[40px] h-[40px] bg-[#303030] flex items-center justify-center rounded">
              <FaFlickr />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-medium border-l-2 border-main text-[15px] pl-[15px] mb-[20px]">
            INFORMATION
          </h3>
          <span className="opacity-70">Typography</span>
          <span className="opacity-70">Gallery</span>
          <span className="opacity-70">Store Location</span>
          <span className="opacity-70">{`Today's`} Deals</span>
          <span className="opacity-70">Contact</span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="font-medium border-l-2 border-main text-[15px] pl-[15px] mb-[20px]">
            WHO WE ARE
          </h3>
          <span className="opacity-70">Help</span>
          <span className="opacity-70">Free Shipping</span>
          <span className="opacity-70">FAQs</span>
          <span className="opacity-70">Return & Exchange</span>
          <span className="opacity-70">Testimonials</span>
        </div>
        <div className="flex-1 ">
          <h3 className="font-medium border-l-2 border-main text-[15px] pl-[15px] mb-[20px]">
            #DIGITALWORLDSTORE
          </h3>
        </div>
      </div>
      <div className="w-full bg-black h-[70px] flex justify-center">
        <div className="w-main flex  items-center">
          <div className="opacity-70">
            © 2023, Digital World 2 Powered by Shopify
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
