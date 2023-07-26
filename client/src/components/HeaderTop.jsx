import React, { memo, useEffect } from 'react';
import icons from '../utils/icons.util';
import { Link } from 'react-router-dom';
import path from '../utils/path.util';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_store';

const {
  FaRegMoneyBillAlt,
  FaFacebookF,
  BsTwitter,
  AiFillInstagram,
  BsGoogle,
  AiOutlineLogout,
} = icons;

const HeaderTop = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.users);
  useEffect(() => {
    if (isLoggedIn) dispatch(userActions.getCurrentUser());
  }, [isLoggedIn, dispatch]);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div
      className="h-10 w-full bg-main flex justify-center items-center
    "
    >
      <div className="w-main text-xs font-semibold text-gray-100 flex justify-between">
        <div className="flex gap-2">
          <span className="border-r-1">
            ORDER ONLINE OR CALL US (+1800) 000 8808
          </span>
          <div className="flex gap-2 items-center">
            <span>VND</span>
            <FaRegMoneyBillAlt />
          </div>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span>{`Welcome, ${user?.firstName} ${user?.lastName}`}</span>
            <span
              className="hover:text-slate-800 cursor-pointer"
              onClick={handleLogout}
            >
              <AiOutlineLogout size={20} />
            </span>
          </div>
        ) : (
          <div className="flex gap-2  items-center">
            <Link to={`/${path.LOGIN}`} className="hover:text-slate-800">
              Sign In or Create Account
            </Link>
            <FaFacebookF className="hover:text-slate-800" />
            <BsTwitter className="hover:text-slate-800" />
            <AiFillInstagram className="hover:text-slate-800" />
            <BsGoogle className="hover:text-slate-800" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(HeaderTop);
