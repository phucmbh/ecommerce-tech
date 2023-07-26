import React from 'react';
import {
  Banner,
  FeaturedProducts,
  BestSeller,
  DealDaily,
  NewArrivals,
  Sidebar,
  HotCollections,
  BlogPosts,
} from '../../components';

function Home() {
  return (
    <div className="w-full flex flex-col items-center mt-[10px]">
      <div className="w-main flex">
        <div className=" flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className=" flex flex-col gap-5 w-[75%] flex-auto pl-5">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="w-main flex flex-col">
        <FeaturedProducts />
        <NewArrivals />
        <HotCollections />
        <BlogPosts />
      </div>
    </div>
  );
}

export default Home;
