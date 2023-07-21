import React from 'react';
import {
  Banner,
  FeaturedProducts,
  BestSeller,
  DealDaily,
  NewArrivals,
  Sidebar,
  HotCollections,
} from '../../components';

function Home() {
  return (
    <>
      <div className="w-main flex">
        <div className=" flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          {/* <DealDaily /> */}
        </div>
        <div className=" flex flex-col gap-5 w-[75%] flex-auto pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>

      <FeaturedProducts />
      <NewArrivals />
      <HotCollections />

      <div className="w-full h-[1000px]"></div>
    </>
  );
}

export default Home;
