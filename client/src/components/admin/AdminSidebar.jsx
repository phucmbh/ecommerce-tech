import clsx from 'clsx';
import React, { Fragment, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { adminSidebar } from 'utils/contants.util';
import icons from 'utils/icons.util';
const { RiArrowDownSLine, FiMinus } = icons;
const activeStyle = 'px-4 py-2 flex items-center gap-2 bg-gray-300';
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-gray-200';

const AdminSidebar = () => {
  const { MdAdminPanelSettings } = icons;
  const [actived, setActived] = useState([]);
  console.log(actived);
  const handdleShowTabs = (tabId) => {
    if (actived?.some((e) => e === tabId))
      setActived((prev) => prev.filter((item) => item !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };
  return (
    <div className="h-full  bg-slate-100">
      <div className="flex flex-row justify-center items-center gap-2 font-semibold text-2xl p-4">
        <MdAdminPanelSettings />
        <small>Admin Workspace</small>
      </div>
      <div>
        {adminSidebar.map((e) => (
          <Fragment key={e.id}>
            {e.type === 'SINGLE' && (
              <NavLink
                to={e.path}
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
                }
              >
                <span>{e.icon}</span>
                <span>{e.text}</span>
              </NavLink>
            )}
            {e.type === 'PARENT' && (
              <div onClick={() => handdleShowTabs(e.id)}>
                <div className="flex items-center gap-2 px-4 py-2 cursor-pointer  hover:bg-gray-200">
                  <div className="flex items-center gap-2">
                    <span>{e.icon}</span>
                    <span>{e.text}</span>
                  </div>
                  {actived?.some((id) => id === e.id) ? (
                    <FiMinus />
                  ) : (
                    <RiArrowDownSLine />
                  )}
                </div>

                {actived?.some((tabId) => tabId === e.id) && (
                  <div className="flex flex-col">
                    {e.submenu.map((item) => (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle,
                            'pl-8'
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
