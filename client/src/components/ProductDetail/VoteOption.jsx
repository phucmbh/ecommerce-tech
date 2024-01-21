import { memo, useState, useCallback } from 'react';
import Button from '../common/Button';
import { vote } from '../../utils/contants.util';
import icons from '../../utils/icons.util';
import { apiRating } from '../../apis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../_store';

const { BsStarFill } = icons;

const VoteOption = ({ product, setProduct }) => {
  const [star, setStar] = useState(5);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { modalRating } = useSelector((state) => state.products);

  const handleSendReview = async () => {
    const response = await apiRating({ pid: product._id, star, comment });

    dispatch(productActions.showModalRating({ modalRating: false }));
    if (response.success) {
      toast.success('Comment successfully', { autoClose: 1000 });

      setProduct(response.product);
      return;
    }

    toast.error('Comment failed');
  };

  return (
    <div className="bg-white w-[500px] flex flex-col items-center  justify-center gap-5">
      <img
        src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
        alt=""
        className="w-[100px] h-[100px] object-cover"
      />
      <h2 className="font-semibold text-2xl text-center">{`Review and comment about ${product?.title}`}</h2>

      <textarea
        className="form w-full p-3 border-2 rounded"
        placeholder={'Please share some product reviews'}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="w-full p-3 border-2 rounded flex flex-col gap-3">
        <span className="text-lg font-bold opacity-70">
          How do you like this product?
        </span>
        <div className="flex justify-around">
          {vote.map((el) => (
            <div
              key={el.id}
              className="flex flex-col justify- items-center text-gray-500"
              onClick={() => setStar(el.id)}
            >
              {el.id <= star ? (
                <BsStarFill color="orange" />
              ) : (
                <BsStarFill color="gray" />
              )}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        style={'px-4 py-2 rounded-md text-white bg-main text-semibold w-full'}
        handleOnClick={handleSendReview}
      >
        Send review
      </Button>
    </div>
  );
};
export default memo(VoteOption);
