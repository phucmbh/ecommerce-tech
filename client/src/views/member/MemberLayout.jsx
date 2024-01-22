import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import path from 'utils/path.util';

const MemberLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.users);
  if (!isLoggedIn || !user)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div>
      <div>Member</div>
      <Outlet />
    </div>
  );
};

export default MemberLayout;
