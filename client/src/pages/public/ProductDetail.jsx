import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/styles/ProductDetail.css';
import { apiGetProduct } from '../../apis';



import {
  Comment,
  ProductInformation,
  ProductLayout,
  ProductRelated,
  Ratings,
  VoteOption,
} from '../../components/ProductDetail';

import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/ProductDetail/Modal';
import Swal from 'sweetalert2';
import path from '../../utils/path.util';
import { productActions } from '../../_store';

const ProductDetail = () => {
  const { pid, title } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.users);

  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const dispatch = useDispatch();
  const { modalRating } = useSelector((state) => state.products);

  useEffect(() => {
    const fectProduct = async () => {
      const response = await apiGetProduct(pid);
      setProduct(response?.product);
      setCurrentImage(response?.product?.thumb);
    };

    fectProduct();
    window.scrollTo(0, 0);
  }, [pid]);

  const handleRateNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: 'Login to rate',
        showCancelButton: true,
        confirmButtonText: 'Go login',
        title: 'Oops!',
      }).then((result) => {
        if (result.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(productActions.showModalRating({ modalRating: true }));
    }
  };

  return (
    <section>
      <div className="h-[80px] bg-gray-100 flex justify-center">
        <div className="w-main flex items-center">Breadcrumbs</div>
      </div>
      <ProductLayout
        product={product}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />

      <ProductInformation>
        <Ratings product={product} handleRateNow={handleRateNow}>
          <Modal>
            <VoteOption product={product} setProduct={setProduct} />
          </Modal>
          {product?.ratings?.map((el, index) => (
            <Comment
              key={index}
              avatar={el.postedBy.avatar}
              star={el.star}
              name={`${el.postedBy.firstName} ${el.postedBy.lastName}`}
              updatedAt={el.updatedAt}
              comment={el.comment}
            />
          ))}
        </Ratings>
      </ProductInformation>

      <ProductRelated />
    </section>
  );
};

export default ProductDetail;
