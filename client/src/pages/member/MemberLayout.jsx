import React from 'react';
import { useSelector } from 'react-redux';

const MemberLayout = () => {
  const { isLoggedIn, user } = useSelector((state) => state.users);
  return <div>MemberLayout</div>;
};

export default MemberLayout;
