import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { pid } = useParams();
  console.log(pid);
  return <div>DetailProduct</div>;
};

export default ProductDetail
