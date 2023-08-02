import { FaGalacticSenate } from 'react-icons/fa';
import icons from '../../utils/icons.util';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '../../_store';

const { MdOutlineClose } = icons;
const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const { modalRating } = useSelector((state) => state.products);

  return (
    <div
      onClick={() =>
        dispatch(productActions.showModalRating({ modalRating: false }))
      }
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50  ${
        modalRating ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      {/* Modal */}
      <div
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() =>
            dispatch(productActions.showModalRating({ modalRating: false }))
          }
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <MdOutlineClose size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);
