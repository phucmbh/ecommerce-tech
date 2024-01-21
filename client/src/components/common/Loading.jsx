import React, { memo } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return <HashLoader color="red" />;
};

export default memo(Loading);
