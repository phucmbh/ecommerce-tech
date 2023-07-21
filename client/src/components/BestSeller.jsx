import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../apis';
import Slider from 'react-slick';
import '../assets/styles/BestSeller.css';
import Product from './Product';


const tabs = [
  { id: 1, name: 'best sellers' },
  { id: 2, name: 'new arrivals' },
  { id: 3, name: 'tablet' },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,

  // autoplay: true,
  // autoplaySpeed: 3000,
};

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activedTab, setActivedTab] = useState(1);
  const [listProducts, setListProducts] = useState(null);
  const [isNew, setIsNew] = useState(true);


  const fectchProducts = async () => {
    await Promise.all([
      apiGetProducts({ sort: '-sold' }),
      apiGetProducts({ sort: '-createdAt' }),
    ])
      .then(([listBestSellers, listNewProducts]) => {
        setBestSellers(listBestSellers?.products);
        setNewProducts(listNewProducts?.products);
        setListProducts(listBestSellers?.products);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    
    fectchProducts();
  }, []);

  useEffect(() => {
    if (activedTab === 1) {
      setListProducts(bestSellers);
      setIsNew(true);
    }
    if (activedTab === 2) {
      setListProducts(newProducts);
      setIsNew(false);
    }
  }, [activedTab]);

  return (
    <div>
      <div>
        <div className="flex text-[20px] gap-8 pb-4 border-b-2 border-main">
          {tabs.map((el) => (
            <span
              key={el.id}
              className={`capitalize font-semibold border-r cursor-pointer ${
                activedTab === el.id ? 'text-gray-900' : 'text-gray-400'
              }`}
              onClick={() => setActivedTab(el.id)}
            >
              {el.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {listProducts?.map((p) => (
            <Product key={p._id} productData={p} isNew={isNew} />
          ))}
        </Slider>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className="flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className="flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default BestSeller;
