import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../../assets/styles/BestSeller.css';
import Product from '../common/Product';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../_store';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,

  // autoplay: true,
  // autoplaySpeed: 3000,
};

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(productActions.getProducts());
  }, []);

  return (
    <div className="my-8  w-full">
      <div>
        <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
          <span className="capitalize font-semibold">New Arrivals</span>
        </div>
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings} className="custom-slider">
          {products?.map((p) => (
            <Product key={p._id} productData={p} isNew={true} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewArrivals;
