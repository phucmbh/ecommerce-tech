import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetProduct } from '../../apis';

const ProductDetail = () => {
  const { pid, title } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fectProduct = async () => {
      const response = await apiGetProduct(pid);
      setProduct(response.product);
    };

    fectProduct();
  }, [pid]);

  console.log(product);
  return (
    <section>
      <div className="h-[80px] bg-gray-100 flex justify-center">
        <div className="w-main flex items-center">{title}</div>
      </div>
    </section>
  );
};

export default ProductDetail;
