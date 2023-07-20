import React from 'react';
import { Banner, Sidebar } from '../../components';
import BestSeller from '../../components/BestSeller';

function Home() {
  return (
    <div className="w-main flex">
      <div className=" flex flex-col gap-5 w-[20%] flex-auto">
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className=" flex flex-col gap-5 w-[80%] flex-auto pl-5">
        <Banner />
        <BestSeller />
        <div className="w-full h-[1000px]"></div>
      </div>
    </div>
  );
}

export default Home;
