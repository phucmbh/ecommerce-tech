import React from 'react';
import { navigation } from './../utils/contants.util';
import { NavLink } from 'react-router-dom';
const notActiveStyle = 'pr-12 hover:text-main';
const activeStyle = 'pr-12 hover:text-main text-main';

const Navigation = () => {
  return (
    <div className="border-y w-main h-[48px] py-2 text-sm flex items-center">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive ? activeStyle : notActiveStyle
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
