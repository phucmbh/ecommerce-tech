import AdminSideBar from 'components/admin/AdminSideBar';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'utils/path.util';

const AdminLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.users);

  if (!isLoggedIn || !user || user.role != 'admin')
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="w-[327px] top-0 bottom-0 flex-none fixed min-h-screen">
        <AdminSideBar />
      </div>
      <div className="w-[327px]"></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
