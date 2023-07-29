import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/ProductDetail.css';
import { apiGetProduct } from '../../apis';
import Slider from 'react-slick';
import { renderStarFromNumber } from '../../utils/helper';
import { formatMoney, formatPrice } from './../../utils/helper';
import {
  Button,
  ProductExtraInfo,
  ProductInformation,
  SelectQuantity,
} from '../../components';
import {
  productExtraInformation,
  productInformation,
} from '../../utils/contants.util';

const ProductDetail = () => {
  const { pid, title } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fectProduct = async () => {
      const response = await apiGetProduct(pid);
      setProduct(response.product);
    };

    fectProduct();
  }, [pid]);

  const handleInputQuantity = useCallback(
    (e) => {
      const number = e.target.validity.valid ? e.target.value : quantity;
      setQuantity(number);
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (action) => {
      if (action === 'minus') {
        if (+quantity < 2) return setQuantity(1);
        setQuantity((prev) => +prev - 1);
      }
      if (action === 'plus') setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    slide: 'img',
    centerPadding: '10px',

    // autoplay: true,
    // autoplaySpeed: 3000,
  };

  return (
    <section>
      <div className="h-[80px] bg-gray-100 flex justify-center">
        <div className="w-main flex items-center">Breadcrumbs</div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="w-2/5">
          <div className="w-full ">
            <img
              src={product?.images[0]}
              alt=""
              className="w-[458px] h-[458px] object-cover m-auto"
            />
          </div>

          <div className="w-full mt-4">
            {product && (
              <Slider className="product-detail-slider w-full" {...settings}>
                {product?.images?.map((el, index) => (
                  <div key={index} className="px-[5px]">
                    <img
                      key={index}
                      src={el}
                      alt=""
                      className=" h-[143px] w-full "
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
        <div className="w-2/5  flex justify-center">
          <div className="w-[410px] border">
            <div className="flex items-center justify-between">
              <h2 className="text-[30px] font-semibold">
                {formatMoney(formatPrice(product?.price))} VND
              </h2>
              <div>{product?.sold} sold</div>
            </div>
            <div className="flex items-center gap-2 my-3">
              <span className="flex gap-1">
                {renderStarFromNumber(product?.totalRatings)}
              </span>
              <span className="font-light">5 reviews</span>
            </div>
            <div className="h-[300px] border">Description Technology</div>
            <div className="flex gap-2 items-center mb-4">
              <span>Quantity</span>
              <span>
                <SelectQuantity
                  quantity={quantity}
                  handleInputQuantity={handleInputQuantity}
                  handleChangeQuantity={handleChangeQuantity}
                />
              </span>
            </div>
            <div>
              <Button
                style={
                  'px-4 py-2 rounded-md text-white bg-main text-semibold w-full'
                }
              >
                ADD TO CARD
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/5 ">
          {productExtraInformation?.map((el) => (
            <ProductExtraInfo
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>

      <div className="w-main m-auto mt-10">
        <ProductInformation />
      </div>
      <div className="h-[500px]"></div>
    </section>
  );
};

export default ProductDetail;
