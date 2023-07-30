import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { categoryActions } from '../../_store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          key={el._id}
          to={el.slug}
          className={({ isActive }) =>
            isActive
              ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sml flex hover:text-main'
              : 'px-5 pt-[15px] pb-[14px] text-sml flex hover:text-main'
          }
        >
          <img src={el.icon} alt={el.title} className="w-5" />
          <span>{el.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
